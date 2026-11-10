(() => {
  function isArticleUrl(url) {
    try {
      const { hostname, pathname } = new URL(url);
      return hostname === "api.tt.com" && pathname.startsWith("/v2/articles/");
    } catch {
      return false;
    }
  }

  // Walk the JSON and remove matching array items in place.
  function stripExclusiveBreak(value) {
    if (Array.isArray(value)) {
      for (let i = value.length - 1; i >= 0; i--) {
        if (value[i]?.type === "exclusive-break") {
          value.splice(i, 1);
        } else {
          stripExclusiveBreak(value[i]);
        }
      }
    } else if (value && typeof value === "object") {
      for (const child of Object.values(value)) {
        stripExclusiveBreak(child);
      }
    }
    return value;
  }

  function rewriteText(text) {
    try {
      return JSON.stringify(stripExclusiveBreak(JSON.parse(text)));
    } catch {
      return text;
    }
  }

  // Fetch: clean the body when the page reads it as JSON or text.
  const originalJson = Response.prototype.json;
  Response.prototype.json = async function () {
    const data = await originalJson.call(this);
    return isArticleUrl(this.url) ? stripExclusiveBreak(data) : data;
  };

  const originalText = Response.prototype.text;
  Response.prototype.text = async function () {
    const text = await originalText.call(this);
    return isArticleUrl(this.url) ? rewriteText(text) : text;
  };

  // XHR: read the native value first to preserve normal browser behavior.
  for (const name of ["response", "responseText"]) {
    const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, name);

    Object.defineProperty(XMLHttpRequest.prototype, name, {
      ...descriptor,
      get() {
        const value = descriptor.get.call(this);
        if (this.readyState !== XMLHttpRequest.DONE || !isArticleUrl(this.responseURL)) {
          return value;
        }
        if (this.responseType === "json") {
          return stripExclusiveBreak(value);
        }
        if (this.responseType === "" || this.responseType === "text") {
          return rewriteText(value);
        }
        return value;
      },
    });
  }
})();


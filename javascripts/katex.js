(function () {
  var options = {
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "\\(", right: "\\)", display: false},
      {left: "\\[", right: "\\]", display: true}
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    ignoredClasses: ["katex"],
    throwOnError: false
  };

  function renderMath() {
    if (typeof renderMathInElement === "function") {
      renderMathInElement(document.body, options);
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(renderMath);
  } else {
    document.addEventListener("DOMContentLoaded", renderMath);
  }
})();

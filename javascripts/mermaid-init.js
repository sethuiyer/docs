function initializeMermaid() {
  if (typeof mermaid === "undefined") {
    return;
  }

  var isDark = document.body.getAttribute("data-md-color-scheme") === "slate";

  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? "dark" : "default",
    securityLevel: "loose",
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true
    }
  });

  document.querySelectorAll("pre.mermaid").forEach(function (block) {
    if (block.dataset.mermaidPrepared === "true") {
      return;
    }

    var source = block.querySelector("code")
      ? block.querySelector("code").textContent
      : block.textContent;
    var diagram = document.createElement("div");

    diagram.className = "mermaid";
    diagram.textContent = source.trim();
    diagram.dataset.mermaidPrepared = "true";
    block.replaceWith(diagram);
  });

  mermaid.run({
    querySelector: ".mermaid:not([data-processed])"
  });
}

if (typeof document$ !== "undefined") {
  document$.subscribe(initializeMermaid);
} else {
  document.addEventListener("DOMContentLoaded", initializeMermaid);
}

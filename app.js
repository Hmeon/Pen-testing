(() => {
  const toggleViewerButton = document.getElementById("toggle-viewer-btn");
  const viewerWrap = document.getElementById("paper-viewer-wrap");
  const setScrollState = () => {
    document.body.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  setScrollState();
  window.addEventListener("scroll", setScrollState, { passive: true });

  if (!toggleViewerButton || !viewerWrap) {
    return;
  }

  toggleViewerButton.addEventListener("click", () => {
    const isExpanded = document.body.classList.toggle("viewer-expanded");
    toggleViewerButton.setAttribute("aria-pressed", isExpanded ? "true" : "false");
    toggleViewerButton.textContent = isExpanded ? "미리보기 축소" : "미리보기 확대";

    if (isExpanded) {
      viewerWrap.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      window.scrollBy({
        top: -24,
        left: 0,
        behavior: "smooth"
      });
    }
  });

  document.querySelectorAll(".site-nav a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      document.body.classList.remove("viewer-expanded");
      toggleViewerButton.setAttribute("aria-pressed", "false");
      toggleViewerButton.textContent = "미리보기 확대";
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("viewer-expanded")) {
      document.body.classList.remove("viewer-expanded");
      toggleViewerButton.setAttribute("aria-pressed", "false");
      toggleViewerButton.textContent = "미리보기 확대";
      viewerWrap.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
})();

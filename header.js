// Simple header include loader — fetches header.html and injects it
(function () {
  async function loadHeader() {
    try {
      const resp = await fetch("header.html");
      if (!resp.ok) return;
      const html = await resp.text();
      document.querySelectorAll("#site-header-placeholder").forEach((el) => {
        el.innerHTML = html;
      });
      // highlight active link
      const path = location.pathname.split("/").pop() || "index.html";
      const links = document.querySelectorAll(".site-nav a");
      links.forEach((a) => {
        const href = a.getAttribute("href");
        if (!href) return;
        if (href === path || (href === "index.html" && path === "")) {
          a.classList.add("active");
        }
      });
    } catch (err) {
      console.warn("Header load failed", err);
    }
  }

  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", loadHeader);
  } else {
    loadHeader();
  }
})();

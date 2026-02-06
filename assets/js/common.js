document.addEventListener("DOMContentLoaded", () => {
  function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
  }
  function closeMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.add("hidden");
  }

  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;

  window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
      nav.classList.add("bg-slate-900/95");
      nav.classList.remove("bg-slate-900/80");
    } else {
      nav.classList.remove("bg-slate-900/95");
      nav.classList.add("bg-slate-900/80");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  lucide.createIcons();
});
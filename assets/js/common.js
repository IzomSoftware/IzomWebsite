document.addEventListener("DOMContentLoaded", () => {
  function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
  }

  function closeMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.add("hidden");
  }

  function updateText(elementId, text) {
    const elements = document.querySelectorAll(`[id="${elementId}"]`);
    
    elements.forEach((el) => {
      el.classList.add("opacity-0", "transition-opacity", "duration-1000");
      
      setTimeout(() => {
        el.innerText = text;
        el.classList.remove("opacity-0");
      }, 200);
    });
  }

  function animateCounter(elementId, targetValue, duration = 2000) {
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = (t) => t * (2 - t);

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const counterElement = document.getElementById(elementId);
      if (counterElement) {
        counterElement.textContent = Math.round(
          targetValue * easeOutQuad(frame / totalFrames),
        );
      }
      if (frame >= totalFrames) {
        clearInterval(counter);
        const finalElement = document.getElementById(elementId);
        if (finalElement) finalElement.textContent = targetValue;
      }
    }, frameDuration);
  }

  async function loadJsonGrid(url, containerId, cardTemplate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      const response = await fetch(url);
      const data = await response.json();

      container.innerHTML = data.map(cardTemplate).join("");
      lucide.createIcons();
    } catch (error) {
      console.error(`Error loading data for ${containerId}:`, error);
    }
  }

  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.updateText = updateText;
  window.animateCounter = animateCounter;
  window.loadJsonGrid = loadJsonGrid;

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
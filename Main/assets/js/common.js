const mobileMenu = document.getElementById("mobileMenu");
const menuButton = document.querySelector('button[aria-controls="mobileMenu"]');
const nav = document.querySelector("nav");
const solutions = ["Software", "Systems", "Technologies", "Networks"];

function toggleMobileMenu() {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.toggle("hidden");
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
  menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeMobileMenu() {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.classList.add("hidden");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuButton.setAttribute("aria-expanded", "false");
}

function updateText(elementId, text) {
    document.querySelectorAll(`#${elementId}`).forEach((el) => {
    el.classList.add("gradient-text", "opacity-0", "transition-opacity", "duration-1000");
    
    setTimeout(() => {
      el.innerText = text;
      el.classList.remove("opacity-0");
    }, 1000);
  });
}

function animateCounter(elementId, targetValue, duration = 2000) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  const easeOutQuad = (t) => t * (2 - t);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    element.textContent = Math.round(
      targetValue * easeOutQuad(frame / totalFrames),
    );

    if (frame >= totalFrames) {
      clearInterval(counter);
      element.textContent = targetValue;
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

document.addEventListener("DOMContentLoaded", () => {
  globalThis.toggleMobileMenu = toggleMobileMenu;
  globalThis.closeMobileMenu = closeMobileMenu;
  globalThis.updateText = updateText;
  globalThis.animateCounter = animateCounter;
  globalThis.loadJsonGrid = loadJsonGrid;

  window.addEventListener("scroll", () => {
    if (!nav) return;
    const isScrolled = window.scrollY > 50;
    nav.classList.toggle("bg-slate-900/95", isScrolled);
    nav.classList.toggle("bg-slate-900/80", !isScrolled);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  let solutionIndex = 0;

  setInterval(() => {
    solutionIndex = (solutionIndex + 1) % solutions.length;

    const nextSolution = solutions[solutionIndex];

    globalThis.updateText("solutions", nextSolution);
  }, 3000);
  lucide.createIcons();
});

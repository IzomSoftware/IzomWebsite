lucide.createIcons();
function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("hidden");
}
function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.add("hidden");
}
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
let repos;
fetch("https://api.github.com/orgs/SyNdicateFoundation/repos")
  .then((response) => response.json())
  .then((data) => {
    repos = data.length;
  });
const frameDuration = 1000 / 60;
const totalFrames = Math.round(2000 / frameDuration);
const easeOutQuad = (t) => t * (2 - t);

let frame = 0;
const counter = setInterval(() => {
  frame++;
  document.getElementById("repo-counter").textContent = Math.round(
    repos * easeOutQuad(frame / totalFrames),
  );

  if (frame === totalFrames) {
    clearInterval(counter);
  }
}, frameDuration);
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

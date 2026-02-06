document.addEventListener("DOMContentLoaded", () => {
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
    const counterElement = document.getElementById("repo-counter");
    if (counterElement) {
        counterElement.textContent = Math.round(
        repos * easeOutQuad(frame / totalFrames)
      );
    }

    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
});
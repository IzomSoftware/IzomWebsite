async function initRepoCounter() {
  try {
    const response = await fetch("https://api.github.com/orgs/IzomSoftware/repos");
    const data = await response.json();
    globalThis.animateCounter("repo-counter", data.length);
  } catch (error) {
    console.log("Could not fetch repo count", error);
    document.getElementById("repo-counter").textContent = "20+";
  }
}

const initSystemCounter = () => globalThis.animateCounter("system-counter", 2);

document.addEventListener("DOMContentLoaded", () => {
  initRepoCounter();
  initSystemCounter();
});
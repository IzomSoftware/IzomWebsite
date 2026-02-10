const solutions = ["Software", "Systems", "Technologies", "Networks"];

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

  let stateIndex = 0;
  let solutionIndex = 0;

  setInterval(() => {
    stateIndex = (stateIndex + 1) % states.length;
    solutionIndex = (solutionIndex + 1) % solutions.length;

    const nextState = states[stateIndex];
    const nextSolution = solutions[solutionIndex];

    globalThis.updateText("state", nextState);
    globalThis.updateText("state-2", nextState);
    globalThis.updateText("solutions", nextSolution);
    globalThis.updateText("solutions-2", nextSolution);
  }, 1300);
});
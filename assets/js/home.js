document.addEventListener("DOMContentLoaded", () => {
  async function initRepoCounter() {
    try {
      const response = await fetch(
        "https://api.github.com/orgs/IzomSoftware/repos",
      );
      const data = await response.json();
      const repos = data.length;
      window.animateCounter("repo-counter", repos);
    } catch (error) {
      console.log("Could not fetch repo count", error);
      document.getElementById("repo-counter").textContent = "20+";
    }
  }

  function initSystemCounter() {
    window.animateCounter("system-counter", 2);
  }

  initRepoCounter();
  initSystemCounter();

  const states = ["Public", "Private"];
  const solutions = ["Software", "Systems", "Technologies"];

  let stateIndex = 0;
  let solutionIndex = 0;

  function cycleText() {
    const nextState = states[(stateIndex + 1) % states.length];
    const nextSolution =
      solutions[(solutionIndex + 1) % solutions.length];
    window.updateText("state", nextState);
    window.updateText("state-2", nextState);
    window.updateText("solutions", nextSolution);
    window.updateText("solutions-2", nextSolution);
    stateIndex = (stateIndex + 1) % states.length;
    solutionIndex = (solutionIndex + 1) % solutions.length;
  }

  setInterval(cycleText, 1300);
});
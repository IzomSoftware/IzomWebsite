const jobs = ["Engineers", "Designers", "Problem-Solvers"];

document.addEventListener("DOMContentLoaded", () => {
    let jobsIndex = 0;

    setInterval(() => {
        jobsIndex = (jobsIndex + 1) % jobs.length;

        const nextJob = jobs[jobsIndex];

        globalThis.updateText("jobs", nextJob);
  }, 3000);
});
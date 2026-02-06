document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("colleagues-grid");

  try {
    const response = await fetch("/assets/json/colleagues.json");
    const colleagues = await response.json();

    colleagues.forEach((colleague) => {
      const card = document.createElement("div");
      
      card.className = "glass card-hover rounded-2xl p-6 flex flex-col h-full";
      card.innerHTML = `
          <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center ${colleague.color}">
                  <img src="${colleague.pic}" class="w-6 h-6"></img>
              </div>
              <div>
                  <h3 class="text-xl font-bold text-white leading-tight">${colleague.name}</h3>
                  <p class="text-sm text-slate-400">${colleague.desc}</p>
              </div>
          </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading colleagues:", error);
  }
});
document.addEventListener("DOMContentLoaded", () => {
  window.loadJsonGrid("/assets/json/members.json", "members-grid", (member) => {
    return `
    <div class="glass card-hover rounded-2xl p-6 flex flex-col h-full">
        <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden ${member.color}">
                <img src="${member.pic}" class="w-full h-full object-cover rounded-full" />
            </div>
            <div>
                <h3 class="text-xl font-bold text-white leading-tight">${member.name}</h3>
                <p class="text-sm text-slate-400">${member.role}</p>
            </div>
        </div>
        <p class="text-slate-400 text-sm mb-6 flex-grow">
            ${member.bio}
        </p>
        <div class="flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/50 pt-4 mt-auto">
            <div class="flex items-center space-x-2">
                <img src="/assets/izom.jpeg" class="w-3 h-3"></img>
                <span>Izom.Net Team</span>
            </div>
            <a href="${member.github}" target="_blank" rel="noopener noreferrer" 
                class="relative z-10 inline-flex items-center justify-center p-1 text-slate-400 hover:text-white transition-colors">
                <i data-lucide="github" class="w-4 h-4"></i>
            </a>
        </div>
    </div>
    `;
  });
});
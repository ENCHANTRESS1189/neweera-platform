document.addEventListener("DOMContentLoaded", () => {
  const enterMarketplaceBtn = document.getElementById("enterMarketplaceBtn");
  const marketplace = document.getElementById("marketplace");
  const consoleSection = document.getElementById("console");
  const consoleTitle = document.getElementById("consoleTitle");
  const consoleOutput = document.getElementById("consoleOutput");
  const consoleInput = document.getElementById("consoleInput");
  const sendCommandBtn = document.getElementById("sendCommandBtn");

  let activeAI = null;

  enterMarketplaceBtn.addEventListener("click", () => {
    marketplace.classList.remove("hidden");
    window.scrollTo({ top: marketplace.offsetTop, behavior: "smooth" });
  });

  document.querySelectorAll(".subscribe-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const aiCard = e.target.closest(".ai-card");
      const aiName = aiCard.querySelector("h2").innerText;

      activeAI = aiName;

      consoleTitle.innerText = `${aiName} • Console`;
      consoleSection.classList.remove("hidden");
      consoleOutput.innerHTML = `<p><strong>${aiName} is online.</strong></p>`;
    });
  });

  sendCommandBtn.addEventListener("click", () => {
    if (!activeAI) return;

    const text = consoleInput.value.trim();
    if (!text) return;

    append("You", text);
    consoleInput.value = "";

    append(activeAI, `Placeholder response to: "${text}"`);
  });

  function append(sender, text) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${sender}:</strong> ${text}`;
    consoleOutput.appendChild(p);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }
});


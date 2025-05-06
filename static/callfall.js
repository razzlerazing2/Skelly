let qp;

try {
  qp = window.top.location.pathname === "/home";
} catch {
  try {
    qp = window.parent.location.pathname === "/home";
  } catch {
    qp = false;
  }
}
function showLoader() {
  const loader = document.getElementById("loader");
  
  // Start fading it out
  loader.style.opacity = "0";

  // After the transition ends (0.3s later), hide it completely
  setTimeout(() => {
    loader.style.display = "none";
  }, 3000); // 300ms matches your CSS transition
}

// Update the time every 10ms
function updateTime() {
  const timeElement = document.getElementById("time");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateTime, 10);

// Update battery status
async function updateBattery() {
  const battery = await navigator.getBattery();
  const level = Math.floor(battery.level * 100);
  document.getElementById("battery-percentage").textContent = `${level}%`;
  document.getElementById("battery-fill").style.width = `${level}%`;
}

updateBattery();
// Toggle sidebar visibility and blur effect
    function toggleSidebar() {
      const sidebar = document.getElementById("sidebar");
      const hamburger = document.querySelector(".hamburger");
      const content = document.querySelector(".content"); // Select the content section

      sidebar.classList.toggle("closed");
      hamburger.classList.toggle("open");

      // Toggle blur on content when sidebar is open
      content.classList.toggle("blur", !sidebar.classList.contains("closed"));
    }
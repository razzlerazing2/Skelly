let qp;

try {
  qp = window.top.location.pathname === "/apps";
} catch {
  try {
    qp = window.parent.location.pathname === "/apps";
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
  }, 1000); // 300ms matches your CSS transition
}

// Update the time every 10ms
function updateTime() {
  const timeElement = document.getElementById("time");
  const now = new Date();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 becomes 12

  timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateTime, 10);

// Update battery status
async function updateBattery() {
  const battery = await navigator.getBattery();
  const level = Math.floor(battery.level * 100);
  const fill = document.getElementById("battery-fill");

  document.getElementById("battery-percentage").textContent = `${level}%`;
  fill.style.width = `${level}%`;

  // Set color based on battery level
  if (level < 20) {
    fill.style.backgroundColor = "red";
  } else if (level < 50) {
    fill.style.backgroundColor = "yellow";
  } else {
    fill.style.backgroundColor = "green";
  }
}

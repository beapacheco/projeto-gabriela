const countdownElement = document.getElementById("countdown");

const targetDate = new Date("Jul 31, 2025 00:00:00").getTime();

const interval = setInterval(function () {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(interval);
    countdownElement.innerHTML = "Chegou o dia de ver minha pitiquinha!";
  }
}, 1000);



function updateClock() {
    let portugalTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Lisbon" });
    let brazilTime = new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });

    document.getElementById('clock-portugal').innerHTML = formatTime(portugalTime);
    document.getElementById('clock-brasil').innerHTML = formatTime(brazilTime);
}

function formatTime(timeString) {
    let time = new Date(timeString);
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();
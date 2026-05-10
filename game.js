const needle = document.getElementById('needle');
const rpmDisplay = document.getElementById('rpmDisplay');
const revButton = document.getElementById('revButton');
const engineSound = document.getElementById('engineSound');

let rpm = 0;
const maxRPM = 8000; // Max RPM
const revIncrement = 500; // RPM increase per click

// Start engine sound
engineSound.play();

revButton.addEventListener('click', () => {
  rpm = Math.min(rpm + revIncrement, maxRPM);
  updateDisplay();
});

function updateDisplay() {
  // Update RPM display
  rpmDisplay.textContent = `RPM: ${rpm}`;

  // Map RPM to needle angle (-90 to +90 degrees)
  const angle = (rpm / maxRPM) * 180 - 90;
  needle.style.transform = `rotate(${angle}deg)`;

  // Change engine sound pitch & speed
  engineSound.playbackRate = 0.5 + (rpm / maxRPM) * 1.5; // 0.5x to 2.0x
}

// RPM decay
setInterval(() => {
  if (rpm > 0) {
    rpm -= 50;
    if (rpm < 0) rpm = 0;
    updateDisplay();
  }
}, 100);

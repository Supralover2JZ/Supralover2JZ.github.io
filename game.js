document.addEventListener('DOMContentLoaded', () => {
  const needle = document.getElementById('needle');
  const rpmDisplay = document.getElementById('rpmDisplay');
  const engineSound = document.getElementById('engineSound');

  let rpm = 0;
  const maxRPM = 8000; // Max RPM
  const revIncrement = 500; // RPM increase per press

  // Start engine sound on user interaction (e.g., first spacebar press)
  // We'll handle this below

  // Function to update display
  function updateDisplay() {
    rpmDisplay.textContent = `RPM: ${rpm}`;
    const angle = (rpm / maxRPM) * 180 - 90; // Map RPM to angle
    document.getElementById('needle').style.transform = `rotate(${angle}deg)`;
    // Adjust pitch and speed
    engineSound.playbackRate = 0.5 + (rpm / maxRPM) * 1.5;
  }

  // Function to rev engine
  function revEngine() {
    if (rpm < maxRPM) {
      rpm = Math.min(rpm + revIncrement, maxRPM);
      updateDisplay();
    }
  }

  // Handle spacebar press
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      // Start the engine sound if not already playing
      if (engineSound.paused) {
        engineSound.play();
      }
      revEngine();
    }
  });

  // RPM decay
  setInterval(() => {
    if (rpm > 0) {
      rpm -= 50;
      if (rpm < 0) rpm = 0;
      updateDisplay();
    }
  }, 100);
});

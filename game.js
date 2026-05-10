let rpm = 1000;
let throttle = false;

const rpmText = document.getElementById("rpm");

const engine = new Audio("engine.mp3");
engine.loop = true;
engine.volume = 0.5;

// preload helps on GitHub Pages
engine.preload = "auto";

let started = false;

// must be user gesture (browser rule)
document.addEventListener("click", () => {
  if (!started) {
    engine.play()
      .then(() => {
        started = true;
        console.log("Audio started");
      })
      .catch(err => console.log("Audio blocked:", err));
  }
});

// controls
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "w") throttle = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() === "w") throttle = false;
});

function update() {

  if (throttle) rpm += 120;
  else rpm -= 80;

  if (rpm < 900) rpm = 900;
  if (rpm > 8000) rpm = 8000;

  // IMPORTANT: clamp playback rate (prevents silence bugs)
  let rate = rpm / 3000;
  engine.playbackRate = Math.max(0.8, Math.min(rate, 2));

  rpmText.textContent = Math.floor(rpm);

  requestAnimationFrame(update);
}

update();

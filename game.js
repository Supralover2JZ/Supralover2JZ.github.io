let rpm = 1000;
let throttle = false;

const rpmText = document.getElementById("rpm");

// load sound
const engine = new Audio("engine.mp3");
engine.loop = true;
engine.volume = 0.5;

// IMPORTANT: unlock audio
document.addEventListener("click", () => {
  engine.play();
}, { once: true });

// controls
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "w") throttle = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() === "w") throttle = false;
});

// loop
function update() {

  if (throttle) {
    rpm += 120;
  } else {
    rpm -= 80;
  }

  if (rpm < 900) rpm = 900;
  if (rpm > 8000) rpm = 8000;

  // sound reacts to RPM
  engine.playbackRate = rpm / 3000;

  rpmText.textContent = Math.floor(rpm);

  requestAnimationFrame(update);
}

update();

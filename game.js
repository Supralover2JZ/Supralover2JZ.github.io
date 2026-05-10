let rpm = 1000;
let throttle = false;

const rpmText = document.getElementById("rpm");

const engine = new Audio("engine.mp3");
engine.loop = true;
engine.volume = 0.5;

// unlock sound (browser rule)
document.addEventListener("click", () => {
  engine.play();
}, { once: true });

// controls
document.addEventListener("keydown", (e) => {
  if (e.key === "w") throttle = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w") throttle = false;
});

// loop
function update() {

  if (throttle) rpm += 100;
  else rpm -= 60;

  if (rpm < 900) rpm = 900;
  if (rpm > 8000) rpm = 8000;

  engine.playbackRate = rpm / 3000;

  rpmText.textContent = Math.floor(rpm);

  requestAnimationFrame(update);
}

update();

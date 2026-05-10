let rpm = 1000;
let gear = 1;
let throttle = false;

const rpmText = document.getElementById("rpm");
const gearText = document.getElementById("gear");

document.addEventListener("keydown", (e) => {
  if (e.key === "w") throttle = true;

  if (e.key === "d") {
    gear++;
    if (gear > 6) gear = 6;
  }

  if (e.key === "s") {
    gear--;
    if (gear < 1) gear = 1;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w") throttle = false;
});

function update() {

  if (throttle) {
    rpm += 50 * gear;
  } else {
    rpm -= 30;
  }

  // idle rpm
  if (rpm < 900) rpm = 900;

  // rev limiter
  if (rpm > 9000) rpm = 9000;

  rpmText.textContent = Math.floor(rpm);
  gearText.textContent = gear;

  requestAnimationFrame(update);
}

update();

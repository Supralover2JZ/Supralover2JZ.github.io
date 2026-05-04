const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let level = 1;

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

let bullets = [];
let apples = [];

// player
const player = {
  x: 280,
  y: 370,
  w: 40,
  h: 10
};

// shoot
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    bullets.push({
      x: player.x + 18,
      y: player.y,
      size: 6,
      speed: 6
    });
  }

  if (e.key === "ArrowLeft") player.x -= 20;
  if (e.key === "ArrowRight") player.x += 20;
});

// spawn apples
function spawnApple() {
  apples.push({
    x: Math.random() * 560,
    y: 0,
    size: 40,
    speed: 1 + level * 0.4
  });
}

// collision
function hit(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

// loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.y -= b.speed;

    ctx.fillStyle = "yellow";
    ctx.fillRect(b.x, b.y, b.size, b.size);

    if (b.y < 0) bullets.splice(i, 1);
  }

  // apples
  for (let i = apples.length - 1; i >= 0; i--) {
    let a = apples[i];
    a.y += a.speed;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(a.x + 20, a.y + 20, 20, 0, Math.PI * 2);
    ctx.fill();

    // bullet collision
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (hit(bullets[j], a)) {
        apples.splice(i, 1);
        bullets.splice(j, 1);

        score++;
        scoreText.textContent = score;

        if (score % 5 === 0) {
          level++;
          levelText.textContent = level;
        }
        break;
      }
    }

    // game over
    if (a.y > 400) {
      alert("Game Over! Score: " + score);
      location.reload();
    }
  }

  requestAnimationFrame(update);
}

// spawn loop (safe scaling)
setInterval(() => {
  spawnApple();
}, Math.max(600, 1400 - level * 100));

update();

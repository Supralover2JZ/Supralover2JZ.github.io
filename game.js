const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let bullets = [];
let apples = [];
let score = 0;
let level = 1;

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

// player (bottom shooter)
const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 30,
  width: 40,
  height: 10
};

// spawn apples
function spawnApple() {
  apples.push({
    x: Math.random() * (canvas.width - 40),
    y: 0,
    size: 40, // BIGGER hitbox (important 👀)
    speed: 1 + level * 0.5
  });
}

// shoot
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    bullets.push({
      x: player.x + player.width / 2,
      y: player.y,
      size: 5,
      speed: 5
    });
  }

  if (e.key === "ArrowLeft") player.x -= 20;
  if (e.key === "ArrowRight") player.x += 20;
});

// collision check
function hit(b, a) {
  return (
    b.x < a.x + a.size &&
    b.x + b.size > a.x &&
    b.y < a.y + a.size &&
    b.y + b.size > a.y
  );
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // bullets
  bullets.forEach((b, bi) => {
    b.y -= b.speed;
    ctx.fillStyle = "yellow";
    ctx.fillRect(b.x, b.y, b.size, b.size);

    if (b.y < 0) bullets.splice(bi, 1);
  });

  // apples
  apples.forEach((a, ai) => {
    a.y += a.speed;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(a.x + a.size/2, a.y + a.size/2, a.size/2, 0, Math.PI * 2);
    ctx.fill();

    // check collision
    bullets.forEach((b, bi) => {
      if (hit(b, a)) {
        apples.splice(ai, 1);
        bullets.splice(bi, 1);
        score++;
        scoreText.textContent = score;

        // level up every 5 points
        if (score % 5 === 0) {
          level++;
          levelText.textContent = level;
        }
      }
    });

    // game over if apple reaches bottom
    if (a.y > canvas.height) {
      alert("Game Over! Score: " + score);
      document.location.reload();
    }
  });

  requestAnimationFrame(update);
}

// spawn loop (gets faster with level)
setInterval(() => {
  spawnApple();
}, 1500 - level * 100);

update();

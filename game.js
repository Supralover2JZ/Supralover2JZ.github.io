const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let level = 1;

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

let keys = [];
let bullets = [];
let apples = [];

// player
const player = {
  x: 280,
  y: 370,
  w: 40,
  h: 10
};

// smooth movement
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// shoot
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    bullets.push({
      x: player.x + 18,
      y: player.y,
      w: 6,
      h: 6,
      speed: 6
    });
  }
});

// spawn apples
function spawnApple() {
  apples.push({
    x: Math.random() * 560,
    y: 0,
    size: 40,
    speed: 1 + level * 0.5
  });
}

// collision
function hit(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

// game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // movement (smooth)
  if (keys["ArrowLeft"]) player.x -= 4;
  if (keys["ArrowRight"]) player.x += 4;

  // bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;

  // draw player
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.y -= b.speed;

    ctx.fillStyle = "yellow";
    ctx.fillRect(b.x, b.y, b.w, b.h);

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

    // bullet hit
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (hit(bullets[j], {
        x: a.x,
        y: a.y,
        w: 40,
        h: 40
      })) {
        apples.splice(i, 1);
        bullets.splice(j, 1);

        score += 5;
        scoreText.textContent = score;

        if (score % 25 === 0) {
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

// spawn speed increases with level but stays safe
setInterval(() => {
  spawnApple();
}, Math.max(500, 1400 - level * 80));

update();

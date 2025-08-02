const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let cherryImg = new Image();
cherryImg.src = "images/cherry.png";

let cherrySlicedImg = new Image();
cherrySlicedImg.src = "images/cherry_sliced.png";

let knifeImg = new Image();
knifeImg.src = "images/knife.png";

let cherries = [];
let mouse = { x: 0, y: 0 };
let score = 0;
let maxCherries = 6;

function createCherry() {
  const cherry = {
    x: Math.random() * (canvas.width - 150),
    y: Math.random() * (canvas.height - 150),
    width: 120, // made bigger
    height: 120,
    vx: (Math.random() * 1.5 + 0.5), // slower horizontal
    vy: (Math.random() * 1.2 + 0.3), // slower vertical
    sliced: false
  };
  cherries.push(cherry);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cherries.forEach(cherry => {
    if (!cherry.sliced) {
      cherry.x += cherry.vx;
      cherry.y += cherry.vy;

      if (cherry.x + cherry.width > canvas.width || cherry.x < 0) cherry.vx *= -1;
      if (cherry.y + cherry.height > canvas.height || cherry.y < 0) cherry.vy *= -1;
    }

    ctx.drawImage(
      cherry.sliced ? cherrySlicedImg : cherryImg,
      cherry.x,
      cherry.y,
      cherry.width,
      cherry.height
    );
  });

  // Draw knife (also made bigger)
  ctx.drawImage(knifeImg, mouse.x - 50, mouse.y - 50, 100, 100);

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("click", () => {
  cherries.forEach(cherry => {
    if (
      !cherry.sliced &&
      mouse.x >= cherry.x &&
      mouse.x <= cherry.x + cherry.width &&
      mouse.y >= cherry.y &&
      mouse.y <= cherry.y + cherry.height
    ) {
      cherry.sliced = true;
      score++;
      document.getElementById("score").textContent = "Score: " + score;
    }
  });
});

function startGame() {
  cherries = [];
  score = 0;
  document.getElementById("score").textContent = "Score: 0";
  for (let i = 0; i < maxCherries; i++) {
    createCherry();
  }
  draw();
}

function startOver() {
  startGame();
}

window.onload = () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "flex";
    startGame();
  }, 2000);
};

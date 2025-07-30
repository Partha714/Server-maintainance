// const targetDate = new Date('August 1, 2025 00:00:00').getTime();
const targetDate = new Date('July 30, 2025 00:00:00').getTime();
const timerEl = document.getElementById("timer");
const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    clearInterval(interval);
    // sound.play();
    timerEl.textContent = "Redirecting…";
    setTimeout(() => {
      window.location.href = "https://optometristpportfolio.netlify.app";
    }, 3000);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerEl.textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;

function initParticles() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  particlesArray = [];
  const numParticles = 1000;

  for (let i = 0; i < numParticles; i++) {
    particlesArray.push(new Particle());
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  initParticles();
});

initParticles();
animate();

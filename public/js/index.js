const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

navLinks.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    item.classList.add("active");
  });
});

document.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll(".nav__link");
  let scrollPosition = document.documentElement.scrollTop;

  const headerHeight =
    document.getElementsByClassName("header-container")[0].offsetHeight;

  navLinks.forEach((item) => {
    const sectionId = item.getAttribute("href");
    const section = document.querySelector(sectionId);

    if (
      section.offsetTop - headerHeight <= scrollPosition &&
      section.offsetTop + section.offsetHeight - headerHeight > scrollPosition
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }

    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    if (scrollPosition > 300) {
      scrollToTopBtn.style.display = "block";
      scrollToTopBtn.addEventListener("click", scrollToTop);
    } else {
      scrollToTopBtn.style.display = "none";
      scrollToTopBtn.removeEventListener("click", scrollToTop);
    }
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = getRandomColor();

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // ctx.strokeStyle = this.color;
      // ctx.lineWidth = 4;
      ctx.fill();
      ctx.fillStyle = this.color;
      // ctx.stroke();
    };

    this.update = function () {
      if (this.x > innerWidth - this.radius || this.x < 0 + radius) {
        this.dx = -this.dx;
      }

      if (this.y > innerHeight - this.radius || this.y < 0 + radius) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      // Interactivity
      if (
        mouse.x - this.x < 50 &&
        mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 &&
        mouse.y - this.y > -50
      ) {
        if (this.radius < 50) this.radius += 1;
      } else {
        if (this.radius > this.minRadius) this.radius -= 1;
      }
      this.draw();
    };
  }
}

let circleArr = [];

function init() {
  circleArr = [];

  for (let i = 0; i < 150; i++) {
    const radius = Math.random() * 3 + 1;
    circleArr.push(
      new Circle(
        radius + Math.random() * (window.innerWidth - 2 * radius), // Random x position within canvas width
        radius + Math.random() * (window.innerHeight - 2 * radius),
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        radius
      )
    );
  }
}

init();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArr.length; i++) {
    circleArr[i].update();
  }
}

animate();

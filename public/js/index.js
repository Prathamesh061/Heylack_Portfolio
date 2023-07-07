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
  });
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const navItems = document.querySelectorAll(".nav__item");

navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("selected");
    });

    item.classList.add("selected");
  });
});

document.addEventListener("scroll", function () {
  var navbarItems = document
    .getElementsByClassName("navbar")[0]
    .getElementsByTagName("a");
  var scrollPosition = document.documentElement.scrollTop;

  for (var i = 0; i < navbarItems.length; i++) {
    var currentLink = navbarItems[i];
    var sectionId = currentLink.getAttribute("href");
    var section = document.querySelector(sectionId);

    if (
      section.offsetTop <= scrollPosition &&
      section.offsetTop + section.offsetHeight > scrollPosition
    ) {
      currentLink.classList.add("active");
    } else {
      currentLink.classList.remove("active");
    }
  }
});

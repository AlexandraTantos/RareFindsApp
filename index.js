const toggleNavBtn = document.querySelector(".toggle-nav");
const navLinks = document.querySelector(".nav-links");

toggleNavBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

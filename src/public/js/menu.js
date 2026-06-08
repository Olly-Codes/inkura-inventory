const menu = document.querySelector("#hamburger");
const mobileNav = document.querySelector("#mobileNav");
const mobileOverlay = document.querySelector("#menuOverlay");
const closeBtn = document.querySelector("#closeBtn");

const closeMenu = () => {
    mobileNav.classList.remove("active");
    mobileOverlay.classList.remove("active");
}

menu.addEventListener("click", () => {
    mobileNav.classList.add("active");
    mobileOverlay.classList.add("active");
});

closeBtn.addEventListener("click", closeMenu);
mobileOverlay.addEventListener("click", closeMenu);
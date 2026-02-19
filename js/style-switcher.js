// STYLE SWITCHER TOGGLE
const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
const styleSwitcher = document.querySelector(".style-switcher");

if (styleSwitcherToggle) {
    styleSwitcherToggle.addEventListener("click", () => {
        styleSwitcher.classList.toggle("open");
    });
}

// Hide style switcher on scroll
window.addEventListener("scroll", () => {
    if (styleSwitcher && styleSwitcher.classList.contains("open")) {
        styleSwitcher.classList.remove("open");
    }
});

// THEME COLORS 
const alternateStyles = document.querySelectorAll(".alternate-style");

// Set active theme color

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if (color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled", "true");
        }
    });
}

// DARK/LIGHT MODE TOGGLE
const dayNight = document.querySelector(".day-night");

if (dayNight) {
    // Toggle dark/light mode on click
    dayNight.addEventListener("click", () => {
        dayNight.querySelector("i").classList.toggle("fa-sun");
        dayNight.querySelector("i").classList.toggle("fa-moon");
        document.body.classList.toggle("dark");
    });

    // Set initial icon based on current mode
    window.addEventListener("load", () => {
        if (document.body.classList.contains("dark")) {
            dayNight.querySelector("i").classList.add("fa-sun");
        } else {
            dayNight.querySelector("i").classList.add("fa-moon");
        }
    });
}
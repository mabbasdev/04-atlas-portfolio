// TYPING ANIMATION
var typed = new Typed(".typing", {
    strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// SIDEBAR & NAVIGATION
const nav = document.querySelector(".nav");
const navList = document.querySelectorAll("li");
const totalNavList = navList.length;
const allSections = document.querySelectorAll(".section");
const totalSection = allSections.length;

const navToggler = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");
const navLinks = document.querySelectorAll(".nav li a");
const overlay = document.getElementById("overlay");
const body = document.body;

/**
 * Navigation link click handling
 * Removes active states, shows corresponding section, handles mobile sidebar
 */
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        removeBackSection();

        // Add back-section class to previous active section
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }

        this.classList.add("active");
        showSection(this);

        // Close sidebar on mobile after navigation
        if (window.innerWidth < 1200) {
            closeSidebar();
        }
    });
}

/**
 * Removes back-section class from all sections
 */
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSections[i].classList.remove("back-section");
    }
}

// Adds back-section class to specified section

function addBackSection(num) {
    allSections[num].classList.add("back-section");
}

// Shows the target section and hides others

function showSection(element) {
    // Hide all sections
    for (let i = 0; i < totalSection; i++) {
        allSections[i].classList.remove("active");
    }

    // Show target section
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

// Updates navigation active state based on current section
function updateNav(element) {
    for (let i = 0; i < totalSection; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

/**
 * Handle "Hire Me" button click
 * Navigates to contact section and updates active states
 */
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});

// MOBILE SIDEBAR CONTROLS

/**
 * Close mobile sidebar
 */
function closeSidebar() {
    aside.classList.remove("open");
    navToggler.classList.remove("open");
    overlay.classList.remove("active");
    body.classList.remove("sidebar-open");
}

/**
 * Open mobile sidebar
 */
function openSidebar() {
    aside.classList.add("open");
    navToggler.classList.add("open");
    overlay.classList.add("active");
    body.classList.add("sidebar-open");
}

// Toggle sidebar on hamburger click
if (navToggler) {
    navToggler.addEventListener("click", function (e) {
        e.stopPropagation();
        if (aside.classList.contains("open")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

// Close sidebar when clicking overlay
if (overlay) {
    overlay.addEventListener("click", closeSidebar);
}

// Close sidebar when resizing to desktop view
window.addEventListener("resize", function () {
    if (window.innerWidth > 1199) {
        closeSidebar();
    }
});

// Prevent clicks inside sidebar from closing it
aside.addEventListener("click", function (e) {
    e.stopPropagation();
});

// RIPPLE EFFECT 
navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        ripple.classList.add("ripple-effect");

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.setProperty("--x", x + "px");
        ripple.style.setProperty("--y", y + "px");

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 500);
    });
});

// INITIALIZATION 
// Ensure only one section is active on page load
const activeSection = document.querySelector(".section.active");
if (activeSection) {
    allSections.forEach((section) => {
        if (section !== activeSection) {
            section.classList.remove("active");
        }
    });
} else if (allSections.length > 0) {
    // If no active section, activate the first one (Home)
    allSections[0].classList.add("active");
}
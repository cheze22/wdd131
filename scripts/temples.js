
// HAMBURGER MENU TOGGLE

const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    // Toggle the 'open' class
    menu.classList.toggle("open");
    
    // Change hamburger icon to X when open
    if (menu.classList.contains("open")) {
        hamburger.textContent = "✕";
        hamburger.setAttribute("aria-label", "Close Menu");
    } else {
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Toggle Menu");
    }
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("open");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Toggle Menu");
    }
});


// FOOTER DYNAMIC YEAR AND LAST MODIFIED

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


// OPTIONAL: SMOOTH SCROLL FOR NAVIGATION
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        // Close mobile menu after clicking
        if (window.innerWidth < 768) {
            menu.classList.remove("open");
            hamburger.textContent = "☰";
        }
    });
});
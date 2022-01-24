// Navigation Bar Example
// Cole Benyshek - December 2021

// Define variables
const btnToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

// Add .show-links class to button when nav-toggle pressed
btnToggle.addEventListener("click", () => {
    let classes = links.classList;
    classes.toggle("show-links");
}, false);
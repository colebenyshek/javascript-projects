// Modal Window Example
// Cole Benyshek - Decmber 2021


// Selectors
let modalButton = document.querySelector(".modal-btn");
let closeButton = document.querySelector(".close-btn");
let modalOverlay = document.querySelector(".modal-overlay");

// Functions
const openModal = function () {
    if (!modalOverlay.classList.contains("open-modal")) {
        modalOverlay.classList.add("open-modal");
    }
};

const closeModal = function () {
    if (modalOverlay.classList.contains("open-modal")) {
        modalOverlay.classList.remove("open-modal");
    }
};

// Event Listeners
modalButton.addEventListener("click", openModal, false);
closeButton.addEventListener("click", closeModal, false);
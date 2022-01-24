// Person class
class Person {
    constructor (id, name, job, img, desc) {
        this.id = id;
        this.name = name;
        this.job = job;
        this.img = img;
        this.desc = desc;
    }
}

// DOM selection items
let author = document.querySelector(".author");
let job = document.querySelector(".job");
let info = document.querySelector(".info");
let image = document.querySelector("#person");
let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");
let randBtn = document.querySelector(".random-btn");


// Create Users
let person1 = new Person (
    1, 
    "Leonard Rhymes", 
    "Front-End Developer", 
    "./images/random-person-1.jpg", 
    "Climb leg rub face on everything give attitude nap all day for under the bed. Chase mice attack feet but rub face on everything hopped up on goofballs. Ship that went to sea Billy Willy."
    );
let person2 = new Person (
    2, 
    "Michael Wong", 
    "UX Designer", 
    "./images/random-person-2.jpg", 
    "European minnow priapumfish mosshead warbonnet shrimpfish bigscale. Cutlassfish porbeagle shark ricefish walking catfish glassfish Black swallower. Ipanema silly goldish fingers."
    );
let person3 = new Person (
    3, 
    "Alice Peng", 
    "Program Manager", 
    "./images/random-person-3.jpg", 
    "Boromir's destroy perils Bilbo Baggins regain seems! Wider Treebeard quietly faced hesitate fire-breathing value? Fisherman thinks Gollum's stove call shake taken?"
    );
let person4 = new Person (
    4, 
    "Trevor Adleman", 
    "Intern", 
    "./images/random-person-4.jpg", 
    "Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar."
    );

var users = [person1, person2, person3, person4];
var currentUser = 0;

// Functions
const loadInit = function () {
    const item = users[currentUser];
    image.src = item.img;
    author.innerHTML = item.name;
    job.innerHTML = item.job;
    info.innerHTML = item.desc;
};

const updateInfo = function (user) {
    const item = users[user];
    image.src = item.img;
    author.innerHTML = item.name;
    job.innerHTML = item.job;
    info.innerHTML = item.desc;
};

// Add Event Listeners (load, buttons)

window.addEventListener("DOMContentLoaded", loadInit, false);

prevBtn.addEventListener("click", () => {
    currentUser--;
    if (currentUser < 0) {
        currentUser = users.length-1;
    }
    updateInfo(currentUser);
}, false);

nextBtn.addEventListener("click", () => {
    currentUser++;
    if (currentUser > users.length-1) {
        currentUser = 0;
    }
    updateInfo(currentUser);
}, false);

randBtn.addEventListener("click", () => {
    let rng = Math.floor(Math.random() * 4);
    while (rng == currentUser) {
        rng = Math.floor(Math.random() * 4);
    }
    currentUser = rng;
    updateInfo(currentUser);
}, false);

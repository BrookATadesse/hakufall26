// main.js

const poem = document.querySelector(".poem");
const words = document.querySelectorAll(".poem span");

let fallen = false;

// Whole numbers between min and max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pulls every word toward the center of the screen (the black hole),
// spinning and stretching it like it's being sucked in.
function fallIn() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    poem.classList.remove("escaping");
    poem.classList.add("falling");

    words.forEach(function (word, i) {
        const box = word.getBoundingClientRect();
        const wordX = box.left + box.width / 2;
        const wordY = box.top + box.height / 2;

        // How far this word has to travel to reach the center
        const moveX = centerX - wordX;
        const moveY = centerY - wordY;

        const spin = randomInt(360, 1080) * (Math.random() > 0.5 ? 1 : -1);

        // Words further away start falling a little later
        word.style.transitionDelay = `${i * 0.08}s`;
        word.style.transform =
            `translate(${moveX}px, ${moveY}px) rotate(${spin}deg) scale(0.05, 0.6)`;
    });
}

// Releases the words so they fly back to where they started
function escape() {
    poem.classList.remove("falling");
    poem.classList.add("escaping");

    words.forEach(function (word, i) {
        word.style.transitionDelay = `${(words.length - i) * 0.05}s`;
        word.style.transform = "none";
    });
}

document.addEventListener("click", function () {
    if (fallen) {
        escape();
    } else {
        fallIn();
    }
    fallen = !fallen;
});

// While the words are in place, they lean slightly toward the black hole
// as the mouse moves, like they feel its gravity.
document.addEventListener("mousemove", function (event) {
    if (fallen) return;

    const pullX = (window.innerWidth / 2 - event.clientX) / 60;
    const pullY = (window.innerHeight / 2 - event.clientY) / 60;

    words.forEach(function (word) {
        word.style.transitionDelay = "0s";
        word.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });
});

// Sounds
const kick = document.querySelector("#kick");
const snare = document.querySelector("#snare");
const crash = document.querySelector("#crash");
const tom1 = document.querySelector("#tom1");
const tom2 = document.querySelector("#tom2");
const tom3 = document.querySelector("#tom3");
const tom4 = document.querySelector("#tom4");

// Buttons
const kickButton = document.querySelector("#w");
const snareButton = document.querySelector("#a");
const crashButton = document.querySelector("#s");
const tom1Button = document.querySelector("#d");
const tom2Button = document.querySelector("#j");
const tom3Button = document.querySelector("#k");
const tom4Button = document.querySelector("#l");

// Kick
let kickPlay = function (e) {
    // kick.currentTime = 0;
    kick.play();
};
kickButton.addEventListener("click", kickPlay, false);

// Snare
let snarePlay = function (e) {
    // snare.currentTime = 0;
    snare.play();
};
snareButton.addEventListener("click", snarePlay, false);

// Crash
let crashPlay = function (e) {
    // crash.currentTime = 0;
    crash.play();
};
crashButton.addEventListener("click", crashPlay, false);

// Tom1
let tom1Play = function (e) {
    // tom1.currentTime = 0;
    tom1.play();
};
tom1Button.addEventListener("click", tom1Play, false);

// Tom2
let tom2Play = function (e) {
    // tom2.currentTime = 0;
    tom2.play();
};
tom2Button.addEventListener("click", tom2Play, false);

// Tom3
let tom3Play = function (e) {
    // tom3.currentTime = 0;
    tom3.play();
};
tom3Button.addEventListener("click", tom3Play, false);

// Tom4
let tom4Play = function (e) {
    // tom4.currentTime = 0;
    tom4.play();
};
tom4Button.addEventListener("click", tom4Play, false);

// Add event listener on keydown: play sound and add shadow
document.addEventListener(
    "keydown",
    (event) => {
    if (event.code === "KeyW") {
        kickPlay();
        kickButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    if (event.code === "KeyA") {
        snarePlay();
        clapButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    if (event.code === "KeyS") {
        crashPlay();
        hihatButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    if (event.code === "KeyD") {
        tom1Play();
        snareButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    if (event.code === "KeyJ") {
        tom2Play();
        congaButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    if (event.code === "KeyK") {
        tom3Play();
        congaButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    if (event.code === "KeyL") {
        tom4Play();
        congaButton.style.boxShadow = "0 0 14px rgb(255, 255, 255)";
    }
    },
    false
);

// Remove shadow on button release
document.addEventListener(
    "keyup",
    (event) => {
    if (event.code === "KeyW") {
        kickPlay();
        kickButton.style.boxShadow = "";
    }
    if (event.code === "KeyA") {
        snarePlay();
        snareButton.style.boxShadow = "";
    }
    if (event.code === "KeyS") {
        crashPlay();
        crashButton.style.boxShadow = "";
    }
    if (event.code === "KeyD") {
        tom1Play();
        tom1Button.style.boxShadow = "";
    }
    if (event.code === "KeyJ") {
        tom2Play();
        tom2Button.style.boxShadow = "";
    }
    if (event.code === "KeyK") {
        tom3Play();
        tom3Button.style.boxShadow = "";
    }
    if (event.code === "KeyL") {
        tom4Play();
        tom4Button.style.boxShadow = "";
    }
    },
    false
);

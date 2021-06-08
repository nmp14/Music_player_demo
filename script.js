const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#music-cover");

// Song titles
const songs = ["Bios", "In_My_Remains", "All_Around_Me"];
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.textContent = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpeg`;
    console.log("dwad");
};
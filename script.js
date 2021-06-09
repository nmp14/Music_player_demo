const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#music-cover");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");
const volumeRange = document.getElementById("volume-range");
const muteBtn = document.getElementById("mute-btn");

// Song titles
const songs = ["Bios", "In_My_Remains", "All_Around_Me"];
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song) {
    title.textContent = song;
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/${song}.jpeg`;

    // Set text of durationEl to the minutes and seconds of song. MM:SS
    audio.addEventListener("canplay", () => {
        const duration = audio.duration;
        const minutes = parseInt(duration / 60);
        const seconds = parseInt(duration % 60);
        durationEl.textContent = `${minutes}:${seconds}`;
    });
};

function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
};

function pauseSong() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

    audio.pause();
};

function prevSong() {
    songIndex--;

    if (songIndex < 0) songIndex = songs.length - 1;

    loadSong(songs[songIndex]);
    playSong();
};

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) songIndex = 0;

    loadSong(songs[songIndex]);
    playSong();
};

// Updates the width of the progress bar and time text
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const minutes = parseInt(currentTime / 60);
    let seconds = parseInt(currentTime % 60);

    if (seconds < 10) seconds = `0${seconds}`;

    currentTimeEl.textContent = `${minutes}:${seconds}`;
};

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
};

function changeVolume(e) {
    audio.volume = (e.target.value / 100);
};

function mute(e) {
    e.preventDefault();

    if (!audio.muted) {
        audio.muted = true;
        muteBtn.textContent = "Unmute";
    } else {
        audio.muted = false;
        muteBtn.textContent = "Mute";
    }
};

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change songs
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Update progress bar
audio.addEventListener("timeupdate", updateProgress);

// Get time in song on click
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", nextSong);

// Change volume or mute
volumeRange.addEventListener("input", changeVolume);
muteBtn.addEventListener("click", mute);
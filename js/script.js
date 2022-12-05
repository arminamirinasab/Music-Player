﻿// Musics
let Musics = [
  {
    name: "Mashroote",
    author: "Mirza Koochak Khan",
    src: "./media/jangali.mp3",
    cover: "./covers/jangali.jfif",
  },
  {
    name: "Mardomak",
    author: "Pishro",
    src: "./media/mardomak.mp3",
    cover: "./covers/mardomak.jpg",
  },
  {
    name: "Qabil",
    author: "Pishro",
    src: "./media/qabil.mp3",
    cover: "./covers/qabil.jpg",
  },
  {
    name: "Rock A Chock",
    author: "Pishro Feat Hidden",
    src: "./media/frequency.mp3",
    cover: "./covers/frequency.jfif",
  },
  {
    name: "Divooneh 2",
    author: "Pishro",
    src: "./media/divooneh.mp3",
    cover: "./covers/divooneh.jpg",
  }
];

let MusicIndex = 0;

// Variables
const musicElem = document.getElementById("musicElem"),
  cover = document.getElementById("cover"),
  songName = document.getElementById("name"),
  author = document.getElementById("author"),
  infoTime = document.getElementById("infoTime"),
  play = document.getElementById("play"),
  currentTime = document.getElementById("currentTime"),
  back = document.getElementById("back"),
  prev = document.getElementById("prev"),
  next = document.getElementById("next"),
  forward = document.getElementById("forward"),
  tracker = document.getElementById("tracker");

// Functions
function checkMusic() {
  musicElem.src = Musics[MusicIndex].src;
  cover.src = Musics[MusicIndex].cover;
  songName.innerHTML = Musics[MusicIndex].name;
  author.innerHTML = Musics[MusicIndex].author;
  calculateTime();
}

function calculateTime() {
  setTimeout(function () {
    let songTime = Math.floor(musicElem.duration);
    let sMinute = Math.floor(songTime / 60);
    let sSecond = songTime - sMinute * 60;
    if (sSecond < 10) {
      sSecond = "0" + sSecond;
    }
    infoTime.innerHTML = `${sMinute}:${sSecond}`;
  }, 100);
}

// Change With Range
tracker.addEventListener("change", function (e) {
  const rate = Math.floor(musicElem.duration) / 100;
  musicElem.currentTime = e.target.value * rate;
});

// Real Time Remaining
setInterval(function () {
  let songCurrent = Math.floor(musicElem.currentTime);
  let cMinute = Math.floor(songCurrent / 60);
  let cSecond = songCurrent - cMinute * 60;
  if (cSecond < 10) {
    cSecond = "0" + cSecond;
  }
  currentTime.innerHTML = `${cMinute}:${cSecond}`;

  const rate = Math.floor(musicElem.duration) / 100;
  tracker.value = songCurrent / rate;
}, 500);

let isPlay = false;

function playMusic() {
  if (isPlay) {
    play.children[0].classList.replace("mdi-pause", "mdi-play");
    musicElem.pause();
    isPlay = false;
  } else {
    play.children[0].classList.replace("mdi-play", "mdi-pause");
    musicElem.play();
    isPlay = true;
  }
}

checkMusic();

// Set Event
play.addEventListener("click", playMusic);

// Forward 10 Second
forward.addEventListener("click", function () {
  musicElem.currentTime += 10;
});

// Back 10 Second
back.addEventListener("click", function () {
  musicElem.currentTime -= 10;
});

// Next Song

function nextSong() {
  if (MusicIndex < Musics.length - 1) {
    MusicIndex++;
    checkMusic();
    play.children[0].classList.replace("mdi-play", "mdi-pause");
    musicElem.play();
    isPlay = true;
  }
}
next.addEventListener("click", nextSong);

// Previous Song
function prevSong() {
  if (MusicIndex > 0) {
    MusicIndex--;
    checkMusic();
    play.children[0].classList.replace("mdi-play", "mdi-pause");
    musicElem.play();
    isPlay = true;
  }
}
prev.addEventListener("click", prevSong);

// Keyboard Events
document.addEventListener("keyup", function (e) {
  if (e.keyCode === 32) playMusic();
  if (e.keyCode === 37) musicElem.currentTime -= 10;
  if (e.keyCode === 38) nextSong();
  if (e.keyCode === 39) musicElem.currentTime += 10;
  if (e.keyCode === 40) prevSong();
});

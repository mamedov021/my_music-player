let music_name = document.getElementById("music_name");
let singer = document.getElementById("singer");
let loader = document.querySelector(".loader");
let animation = document.querySelector(".animation");
let stroke = document.querySelectorAll(".stroke");

const play_btn = document.getElementById("play_btn");
let next_btn = document.getElementById("next_btn");
let prev_btn = document.getElementById("prev_btn");

let playing_music = document.getElementById("playing_music");

let cur_music = document.querySelectorAll(".cur_music");
let total_music = document.querySelectorAll(".total_music");
let stock = document.getElementById("stock");

let sound = document.getElementById("volume");

let interval;

let musicList = [
  {
    name: "Valse",
    singer: "NickelBack",
    song: "music/EvgenyGrinko-Valse.mp3",
    img: "/image/2.jpg",
  },
  {
    name: "For away",
    singer: "NickelBack",
    song: "music/far_away.mp3",
    img: "/image/1.jpg",
  },
  {
    name: "On My Way",
    singer: "Mophty",
    song: "music/on_my_way.mp3",
    img: "/image/3.jpg",
  },
];

let track_index = 0;
let isPlaying = false;
let updateTimer;

sound.addEventListener("input", function () {
  playing_music.volume = sound.value / 100;
});
function loadTrack(track_index) {
  clearInterval(updateTimer);
  playing_music.src = musicList[track_index].song;
  playing_music.load();
  singer.textContent = musicList[track_index].singer;
  music_name.textContent = musicList[track_index].name;
  updateTimer = setInterval(seekUpdate, 100);
  document.body.style.backgroundImage =
    "url(" + musicList[track_index].img + ")";
  resetValue();
  seekUpdate();
}

function Update_stock() {
  playing_music.currentTime = stock.value;
}

function seekUpdate() {
  if (Number(playing_music.duration)) {
    let stockPosition = playing_music.currentTime;
    stock.value = stockPosition;

    let currentMinutes = Math.floor(playing_music.currentTime / 60);
    let currentSeconds = Math.floor(playing_music.currentTime % 60);
    let durationMinutes = Math.floor(playing_music.duration / 60);
    let durationSeconds = Math.floor(playing_music.duration % 60);

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    cur_music[0].textContent = currentMinutes + ":" + currentSeconds;
    total_music[0].textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index);
function resetValue() {
  cur_music.textContent = "00:00";
  total_music.textContent = "00:00";
  stock.value = 0;
}
playing_music.onloadedmetadata = function () {
  stock.max = playing_music.duration;
  stock.value = playing_music.currentTime;
};

play_btn.addEventListener("click", function () {
  if (play_btn.classList.contains("fa-pause")) {
    play_btn.classList.remove("fa-pause");
    play_btn.classList.add("fa-play");
    playing_music.pause();
    animation.style.display = "none";
    stopChangeColor()
    
} else {
    play_btn.classList.remove("fa-play");
    play_btn.classList.add("fa-pause");
    playing_music.play();
    animation.style.display = "block";
    startChangeColor();
  }
});
prev_btn.addEventListener("click", function () {
  if (track_index > 0) {
    track_index--;
  } else {
    track_index = musicList.length - 1;
  }
  playing_music.play();
  loadTrack(track_index);
});
next_btn.addEventListener("click", function () {
  if (track_index == musicList.length - 1) {
    track_index = 0;
  } else {
    track_index++;
  }
  loadTrack(track_index);
  playing_music.play();
});

function color() {
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
}
function startChangeColor() {
  interval = setInterval(() => {
    stroke.forEach((element) => {
      console.log(element);
      element.style.backgroundColor = color();
    });
  }, 1000);
}

function stopChangeColor() {
    clearInterval(interval);
}



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
    id: 6,
    name: "Bad Boy",
    singer: "Marwa Loud",
    song: "music/Bad Boy  Marwa Loud.mp3",
    img: "/image/bad.jpg",
  },
  {
    id: 0,
    name: "Valse",
    singer: "Butin  Roy ",
    song: "music/EvgenyGrinko-Valse.mp3",
    img: "/image/2.jpg",
  },
  {
    id: 1,
    name: "For away",
    singer: "NickelBack",
    song: "music/far_away.mp3",
    img: "/image/1.jpg",
  },
  {
    id: 2,
    name: "On My Way",
    singer: "Mophty",
    song: "music/on_my_way.mp3",
    img: "/image/3.jpg",
  },
  {
    id: 3,
    name: " Tuesday",
    singer: " Burak Yeter ",
    song: "music/Burak Yeter  Tuesday.mp3",
    img: "/image/6.jpg",
  },
  {
    id: 4,
    name: "Are You With Me Lyrics ",
    singer: "Lost Frequencies ",
    song: "music/Are You With Me.mp3",
    img: "/image/4.jpg",
  },
  {
    id: 5,
    name: "Without Me",
    singer: "Eminem ",
    song: "music/Eminem  Without Me .mp3",
    img: "/image/5.jpg",
  },

  {
    id: 7,
    name: "  Move On ft Jabbar",
    singer: " Deeperise",
    song: "music/Deeperise  Move On ft Jabbar.mp3",
    img: "/image/8.jpg",
  },
];

let track_index = 0;
let isPlaying = false;
let updateTimer;
let durationTime = 0;
let currentTime = 0;
let musicDuration = 0;
let currentDuration = 0;
let nowPlaying;
let isRpeat = false;
let isRandom = false;

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
  Update_stock();
}

function Update_stock() {
  playing_music.currentTime = stock.value;
  stock.style.setProperty("--thumb-rotate", `${(stock.value/100) * 2160}deg`)
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
let pausedTime = 0;
function my_pause() {
  // console.log("pause");

  play_btn.classList.remove("fa-pause");
  play_btn.classList.add("fa-play");
  playing_music.pause();
  playing_music.removeAttribute("autoplay");
  pausedTime = playing_music.currentTime;
  animation.style.display = "none";
  stopChangeColor();
}
let rotationInterval;
function my_play() {
  play_btn.classList.remove("fa-play");
  play_btn.classList.add("fa-pause");
  playing_music.play();
   playing_music.setAttribute("autoplay", true);
  animation.style.display = "block";
  startChangeColor(); 
  currentTime = pausedTime;
 rotationInterval = setInterval(updateRotation, 100); 
   
}

function updateRotation() {
  stock.style.setProperty("--thumb-rotate", `${(stock.value/100) * 2160}deg`);
}

play_btn.addEventListener("click", function () {
  if (play_btn.classList.contains("fa-pause")) {
    my_pause();
  } else {
    my_play();
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
  let red = Math.floor(Math.random() * 256) * 0.9;
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256) * 2;

  return `rgb(${red}, ${green}, ${blue})`;
}
function startChangeColor() {
  interval = setInterval(() => {
    stroke.forEach((element) => {
      element.style.backgroundColor = color();
    });
  }, 800);
}

function stopChangeColor() {
  console.log("crear interval");
  clearInterval(interval);
}

musicList.forEach((music) => {
  document.querySelectorAll(".ul").forEach((ul) => {
    ul.innerHTML += `
    <li class="li" data-key="${music.id}">
    <button class="fa-solid fa-play" id="playPauseBtn" data-key="${music.id}"> 
    </button>
      <div class="info">
        <h3 class="song" id="musicName" data-key="${music.id}">${music.name}</h3>
        <p class="artist" data-key="${music.id}">${music.singer}</p>
        <audio id="myAudio" src="${music.song}"></audio>
      </div>
      </li>
    `;
  });
});



let btns = document.querySelectorAll(".right_box button");
 let btn_PouseTime =0;
btns.forEach((btn) => {
 
  btn.addEventListener("click", function () {
    
    if (btn.classList.contains("fa-play")) {
      console.log("cliced");
    // stopChangeColor();
      btns.forEach((btn) => btn.classList.replace("fa-pause", "fa-play"));
      btn.classList.remove("fa-play");
      btn.classList.add("fa-pause");
      currentTime = btn_PouseTime;
      
      my_play();
      
    } else {
      btn.classList.remove("fa-pause");
      btn.classList.add("fa-play");
      btn_PouseTime = playing_music.currentTime;
      my_pause();
    }

    const musicId = btn.getAttribute("data-key");
    if (btn.classList.contains("fa-solid")) {
      const musicItem = musicList.find((music) => music.id == musicId);
      if (musicItem) {
        playing_music.src = musicItem.song;
        music_name.textContent = musicItem.name;
        singer.textContent = musicItem.singer;
        document.body.style.backgroundImage = `url(${musicItem.img})`;
      }
    }
  });
});

let random_btn = document.getElementById("random_btn");

random_btn.addEventListener("click", function randomMusic() {
  let randomIndex;

  while (true) {
    randomIndex = Math.floor(Math.random() * musicList.length);
    if (randomIndex !== track_index) {
      break;
    }
  }

  loadTrack(randomIndex);
  playing_music.play();
  random_btn.classList.toggle("active");
});

//  if(playing_music.currentTime == playing_music.durationTime){
//   track_index++;
//   }

let right_box = document.querySelector(".right_box");
let bars = document.getElementById("bars");


bars.addEventListener("click", function () {
  right_box.classList.toggle("showList");
  if(bars.classList.contains("fa-bars")){
    bars.classList.remove("fa-bars");
    bars.classList.add("fa-x");
  }
  else{
    bars.classList.remove("fa-x") ;
    bars.classList.add("fa-bars");
   

  }
});

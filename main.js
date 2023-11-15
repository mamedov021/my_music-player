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
    id: 6,
    name: "Bad Boy",
    singer: "Marwa Loud",
    song: "music/Bad Boy  Marwa Loud.mp3",
    img: "/image/bad.jpg",
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
 
let updateTimer;
let durationTime = 0;
let currentTime = 0;
let musicDuration = 0;
let currentDuration = 0;
let nowPlaying;
let isRepeat = true;
let isPlaying=true;
let isRandom = false;

sound.addEventListener("input", function () {
  playing_music.volume = sound.value / 100;
});

function loadTrack(track_index) {
 clearInterval(updateTimer);
  playing_music.src = musicList[track_index].song;
  play_btn.dataset.id = musicList[track_index].id;
  playing_music.load();
  singer.textContent = musicList[track_index].singer;
  music_name.textContent = musicList[track_index].name;

   updateTimer = setInterval(seekUpdate, 100);
  document.body.style.backgroundImage =
    "url(" + musicList[track_index].img + ")";
    resetValue();
   
   // seekUpdate();
   Update_stock();
   
}

function Update_stock() {
  playing_music.currentTime = stock.value;
  stock.style.setProperty("--thumb-rotate", `${(stock.value /500) * 2160}deg`);
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
  stock.style.setProperty("--thumb-rotate", `${(stock.value / 100) * 2160}deg`);
}

play_btn.addEventListener("click", function () {
   update_btn1(track_index);
  if (play_btn.classList.contains("fa-pause")) {
    my_pause();

    document
      .querySelector(`button[data-key="${track_index}"]`)
      .classList.replace("fa-pause", "fa-play");
  } else {
    my_play();
    document
      .querySelector(`button[data-key="${track_index}"]`)
      .classList.replace("fa-play", "fa-pause");
  }  
});
 
prev_btn.addEventListener("click", function () {
  if (track_index > 0) {
    track_index--;
  } else {
    track_index = musicList.length - 1; 
  }
  // playing_music.play();
  loadTrack(track_index); 
   update_btn1(track_index) ;
    playing_music.currentTime=0;
    
});
 


next_btn.addEventListener("click", function () {
  if (isRandom) {
    let randomIndex = Math.floor(Math.random() * musicList.length);

    if (track_index === randomIndex) {
      randomIndex = Math.floor(Math.random() * musicList.length);

      loadTrack(randomIndex); 
       track_index = randomIndex;
    }
    loadTrack(randomIndex);
   // playing_music(randomIndex)
    track_index = randomIndex;
    // playing_music.currentTime=0;


  }

  console.log(track_index);
  if (track_index == musicList.length - 1) {
    track_index = 0;
  } else {
    track_index++;
  }
  update_btn1(track_index); 
  loadTrack(track_index);
  playing_music.currentTime=0;
 
   
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
//let li = document.querySelector(".li");

 
function update_btn1(key) { 
  document.querySelectorAll("ul li").forEach((li)=> li.classList.remove("active"))
  document.querySelector(`li[data-key="${key}"]`).classList.add("active")

  btns.forEach((btn) =>{
    btn.classList.replace("fa-pause","fa-play")
    let playID = btn.getAttribute("data-key"); 
   

    if ( playID == track_index) {

        console.log(playID);
        console.log(track_index);
        if(play_btn.classList.contains("fa-pause")){
          btn.classList.replace("fa-play","fa-pause" )
        }
        
    }

  } );

}
 

 
let li = document.querySelector(".right_box .li");
function active(key) {
  
  document.querySelectorAll("ul li").forEach((li)=> li.classList.remove("active"))
  // btns.forEach((btn)=> )
  document.querySelector(`li[data-key="${key}"]`).classList.add("active")

  // btns.forEach((btn) => {
  //   if (btn.classList.contains("fa-pause")) {
  //     li.classList.add("active");
  //   } else {
  //     li.classList.remove("active");
  //   }
  // });
} 
 

 
 

 

btns.forEach( (btn) => {

  
  btn.addEventListener("click", function (e) {
    if (btn.classList.contains("fa-play")) {
      const dataKey = e.target.dataset.key
      active(dataKey)
      btns.forEach((btn) => btn.classList.replace("fa-pause", "fa-play"));
      
      
      btn.classList.remove("fa-play");
      btn.classList.add("fa-pause");
      my_play();
      
    } else {
      
      btn.classList.remove("fa-pause");
      btn.classList.add("fa-play");
      // btn_PouseTime = playing_music.currentTime;
      
      my_pause(); 

    }
    
    
    
  
    const musicId = btn.getAttribute("data-key");
    track_index = musicId; 
    id = musicId; 
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
let repeat_btn = document.getElementById("repeat_btn");

repeat_btn.addEventListener("click",()=>{
  repeat_btn.classList.toggle("active");
  playing_music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play()
  })
  })

  
  random_btn.addEventListener("click", (e) => {
    isRandom = !isRandom;
    isRandom 
      ? e.target.classList.add("active")
      : e.target.classList.remove("active");
  });
  
// random_btn.addEventListener("click", function randomMusic() {
//   let randomIndex;
   
 
//   while (true) {
//     randomIndex = Math.floor(Math.random() * musicList.length);
//     if (randomIndex !== track_index) {
//       break;
//     }
//   }

//   loadTrack(randomIndex);
//   playing_music.play();
//   random_btn.classList.toggle("active");
// });


// repeat_btn.addEventListener('click', toggleRepeat);
// function toggleRepeat() {
//   // isRepeat = !isRepeat;
//   repeat_btn.classList.toggle('active');
// }
 
//responsives
let right_box = document.querySelector(".right_box");
let bars = document.getElementById("bars");

bars.addEventListener("click", function () {
  right_box.classList.toggle("showList");
  if (bars.classList.contains("fa-bars")) {
    bars.classList.remove("fa-bars");
    bars.classList.add("fa-x");
  } else {
    bars.classList.remove("fa-x");
    bars.classList.add("fa-bars");
  }
});

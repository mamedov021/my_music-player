let music_name=document.querySelector("#music_name")
let singer = document.querySelector("#singer")


const play_btn = document.getElementById("play_btn");
let next_btn = document.getElementById("next_btn");
let prev_btn = document.getElementById("prev_btn");

let progress = document.getElementById("stock")
let  player_music =document.getElementById("player_music")

player_music.onloadedmetadata = function() {
    progress.max=player_music.duration;
    progress.value=player_music.currentTime;
}

play_btn.addEventListener("click", function() {
   if(play_btn.classList.contains("fa-pause")){
      player_music.pause();
      play_btn.classList.remove("fa-pause");
      play_btn.classList.add("fa-play");
   }
   else{
      player_music.play();
      play_btn.classList.remove("fa-play");
      play_btn.classList.add("fa-pause");
       
}
 });

 if(player_music.play()){
    setInterval(()=>{
     progress.value = player_music.currentTime;
    },500)
 }

  
let musicList =[
{
      
    name:"For away" ,
    artist: "NickelBack",
    song: 'music/far_away.mp3',
    img:"/image/1.jpg"
     
},
{
     
    name:"  " ,
    artist: "NickelBack",
    song: "music/EvgenyGrinko-Valse.mp3",
    img:"/image/2.jpg"
    
}
];

    
    let track_index = 1;
    let isPlaying = false;
     let updateTimer;
 
let curr_track = document.createElement('audio');
function loadTrack(track_index){
    clearInterval(updateTimer);
      
    player_music.src=musicList[track_index].song;
    player_music.load();

    updateTimer = setInterval(setUpdate, 1000);

    player_music.addEventListener('ended', next_btn);
  
}

loadTrack(track_index);


function setUpdate() {
    progress.value = player_music.currentTime;
}

   
 
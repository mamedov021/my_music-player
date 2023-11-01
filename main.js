let music_name=document.getElementById("music_name")
let singer = document.getElementById("singer")
let profile_img=document.getElementById("profile_img")


const play_btn = document.getElementById("play_btn");
let next_btn = document.getElementById("next_btn");
let prev_btn = document.getElementById("prev_btn");

 
let  player_music =document.getElementById("player_music")

let cur_music = document.querySelectorAll(".cur_music");
let total_music = document.querySelectorAll(".total_music");
let stock = document.getElementById("stock");


let musicList =[
    { 
        name:"Valse" ,
        singer: "NickelBack",
        song: "music/EvgenyGrinko-Valse.mp3",
        img:"/image/2.jpg"  
    },
    {
      
    name:"For away" ,
    singer: "NickelBack",
    song: 'music/far_away.mp3',
    img:"/image/1.jpg"
     
    },
    {
      
        name:"On My Way" ,
        singer: "Mophty",
        song: 'music/on_my_way.mp3',
        img:"/image/3.jpg"
         
        }

];


if(player_music.play()){
    setInterval(()=>{
        stock.value = player_music.currentTime;
    },500)
}

let track_index = 1;
let isPlaying = true;
let updateTimer;

function loadTrack(track_index){
    clearInterval(updateTimer); 
    
    player_music.src=musicList[track_index].song;
    player_music.load();
    
    profile_img.src=musicList[track_index].img;
    singer.textContent = musicList[track_index].singer;
    music_name.textContent=musicList[track_index].name;
    
    
    updateTimer = setInterval(setUpdate, 500); 
    player_music.addEventListener('ended', next_btn);
    
}

loadTrack(track_index);
function resetValue(){
    cur_music.textContent="00:00"
    total_music.textContent="00:00"
    stock.value=0;
}

function setUpdate() {
    stock.value = player_music.currentTime;
}



player_music.onloadedmetadata = function() {
    stock.max=player_music.duration;
    stock.value=player_music.currentTime;
}

play_btn.addEventListener("click", function() {
   if(play_btn.classList.contains("fa-pause")){
     
      play_btn.classList.remove("fa-pause");
      play_btn.classList.add("fa-play");
       player_music.pause();
      
   }
   else{
      
      play_btn.classList.remove("fa-play");
      play_btn.classList.add("fa-pause");
      player_music.play();
      
}
 })
 prev_btn.addEventListener("click", function() {
 
    if(track_index >0)
    {
        track_index--;
    }
    else{
        track_index= musicList.length - 1;
    }
    player_music.pause();

loadTrack(track_index);
     
});

next_btn.addEventListener("click", function() {
    if(track_index == musicList.length-1){
        track_index =0;
    }
    else{
        track_index++;
    }
    loadTrack(track_index);
        
})

function  Stock(){
    stock = cu
}
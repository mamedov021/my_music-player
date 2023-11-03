let music_name=document.getElementById("music_name")
let singer = document.getElementById("singer")
let profile_img=document.getElementById("profile_img")


const play_btn = document.getElementById("play_btn");
let next_btn = document.getElementById("next_btn");
let prev_btn = document.getElementById("prev_btn");

 
let  playing_music =document.getElementById("playing_music")

let cur_music = document.querySelectorAll(".cur_music");
let total_music = document.querySelectorAll(".total_music");
let stock = document.getElementById("stock");

let sound=document.getElementById("volume");



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



let track_index = 0;
let isPlaying = false;
let updateTimer;
 
sound.addEventListener("change", function(){
    playing_music.volume = sound.value / 100; 
   }) 
   
function loadTrack(track_index){
    clearInterval(updateTimer); 
    
    playing_music.src=musicList[track_index].song;
    playing_music.load();
    
    profile_img.src=musicList[track_index].img;
    singer.textContent = musicList[track_index].singer;
    music_name.textContent=musicList[track_index].name;
    
    seekUpdate();
    updateTimer = setInterval(seekUpdate,1000);
   // updateTimer = setInterval(setUpdate, 1000); 
    playing_music.addEventListener('ended', next_btn);
    random_bg_color()
    
}
 
 
function seekTo() {
     playing_music.currentTime  = playing_music.duration * (stock.value / 60);
    
}


 
function seekUpdate() {
    if (Number(playing_music.duration)) {
        let stockPosition = (playing_music.currentTime / playing_music.duration) * 100;
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

        // console.log(currentMinutes);
        // console.log(currentSeconds);

        cur_music[0].textContent = currentMinutes + ":" + currentSeconds;
        total_music[0].textContent = durationMinutes + ":" + durationSeconds;
    }
}



loadTrack(track_index);
function resetValue(){
    cur_music.textContent="00:00"
    total_music.textContent="00:00"
    stock.value=0;
} 
playing_music.onloadedmetadata = function() {
    stock.max=playing_music.duration;
    stock.value=playing_music.currentTime;
}

play_btn.addEventListener("click", function() {
   if(play_btn.classList.contains("fa-pause")){
     
      play_btn.classList.remove("fa-pause");
      play_btn.classList.add("fa-play");
       playing_music.pause();
      
   }
   else{
      
      play_btn.classList.remove("fa-play");
      play_btn.classList.add("fa-pause");
      playing_music.play();
      
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
    playing_music.pause();

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
 

 



function random_bg_color() {
     
   /* let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";*/
   document.body.style.backgroundImage = 'url(' + musicList[track_index].img + ')';

 
}

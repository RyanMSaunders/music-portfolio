
let now_playing = document.querySelector('.player__now-playing');
let track_name = document.querySelector('.player__track-name');
let playpause_btn = document.querySelector('.player__playpause-track');
let seek_slider = document.querySelector('.player__seek_slider');
let curr_time = document.querySelector('.player__current-time');
let total_duration = document.querySelector('.player__total-duration');
// let curr_track = document.createElement('audio');
let curr_track = document.getElementById("curr-track");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        name : 'Space Baby',
        artist : 'Ryan Maguire',
        music : 'https://ryanmsaunders.github.io/music-portfolio/music/Space-Baby.mp3'
    }
];





function loadTrack(track_index){
  console.log('Loading track at index:', track_index);

  clearInterval(updateTimer);
  console.log('curr_time', curr_time, 'total_duration', total_duration, 'seek_slider', seek_slider);
  reset();

  let track = music_list[track_index];
  console.log('Track to load:', track);
  console.log('track_name', track.name);
  

  curr_track.src = track.music;
  console.log('Audio source set to:', curr_track.src);

  // Try to load the track
  try {
      curr_track.load();
      console.log('Audio file loaded successfully');
  } catch (error) {
      console.log('Error loading the audio file:', error);
  }

  // Log track information
  track_name.textContent = track.name;
  console.log('Track name set to:', track_name.textContent);

  // Uncomment the next line if you want to display the artist name
  // track_artist.textContent = track.artist;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener('ended', nextTrack);
}

loadTrack(track_index);


function reset(){
    curr_time.textContent = "00:00";
    // total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
// function randomTrack(){
//     isRandom ? pauseRandom() : playRandom();
// }
// function playRandom(){
//     isRandom = true;
//     randomIcon.classList.add('randomActive');
// }
// function pauseRandom(){
//     isRandom = false;
//     randomIcon.classList.remove('randomActive');
// }
// function repeatTrack(){
//     let current_index = track_index;
//     loadTrack(current_index);
//     playTrack();
// }


function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}


function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        // total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

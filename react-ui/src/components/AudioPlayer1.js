import React, {useState, useEffect, useRef} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav';

import playButton from '../images/playButton.svg';
import pauseButton from '../images/pauseButton.png';
import fastForward from '../images/fastForward.png';
import loop from '../images/loop.png';
import random from '../images/random.png';
import VolumeKnobUi from './VolumeKnobUi';
import Tracklist from './Tracklist';

let vol = .5;




const AudioPlayer = ()=>{
  const media = document.querySelector('audio');
// const audioTacks = document.querySelector('audio').audioTracks;
const play = document.querySelector('.play');

const rwd = document.querySelector('.rewind');
const fwd = document.querySelector('.fast-forward');

const audioBottomPlayhead = document.querySelector('.audio__bottom__playhead');
const timerBar = document.querySelector('.audio__bottom__playhead__left');

const volumeKnob = document.querySelector('.knob')
const volumeLevel = document.querySelector('.vol-level')
const volumeSlider = document.querySelector('.slider-wrapper input')


const [timeState, setTimeState] = useState(":");

const [intervalFwdState, setIntervalFwdState] = useState();
const [intervalRwdState, setIntervalRwdState] = useState();

const [songNameState, setSongNameState] = useState("")


let intervalFwd;
let intervalRwd;

// ---------------Play/Pause-Button---------------
function playPauseMedia() {
  setTimeState("00:00")
  // updateTime();
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  if (intervalRwdState){
    clearInterval(intervalRwdState.intervalRwd);
  }
  if (intervalFwdState){
    clearInterval(intervalFwdState.intervalFwd);
  }
  
  if(media.paused) {
    play.src = pauseButton;
    media.play();
  } else {
    play.src = playButton;
    media.pause();
  }
}
// --------------------------------------------------
// ---------------Stop-Button---------------------------
function stopMedia() {
  media.pause();
  media.currentTime = 0;
  // play.setAttribute('data-icon','P');
  play.src = playButton;
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  if (intervalFwdState){
    clearInterval(intervalFwdState.intervalFwd);
  }
}
// -----------------------------------------------

// -------------------fast-forward-and-rewind----------------------
function mediaBackward() {
  
  clearInterval(intervalFwdState.intervalFwd);
  fwd.classList.remove('active');

  if(rwd.classList.contains('active')) {
    rwd.classList.remove('active');
    clearInterval(intervalRwdState.intervalRwd);
    media.play(); //
  } else {
    rwd.classList.add('active');
    media.pause();
    intervalRwd = setInterval(windBackward, 200);
    setIntervalRwdState({intervalRwd: intervalRwd})
  }
}

function mediaForward() {
  if (intervalRwdState){
    clearInterval(intervalRwdState.intervalRwd);
  }
  
  rwd.classList.remove('active');

  if(fwd.classList.contains('active')) {
    fwd.classList.remove('active');
    clearInterval(intervalFwdState.intervalFwd);
    media.play();
  } else {
    fwd.classList.add('active');
    media.pause();
    intervalFwd = setInterval(windForward, 200);
    setIntervalFwdState({intervalFwd: intervalFwd})
  }
}

function windBackward() {
  if(media.currentTime <= 3) {
    rwd.classList.remove('active');
    if (intervalRwdState){
      clearInterval(intervalRwdState.intervalRwd);
    }
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward() {
  if(media.currentTime >= media.duration - 4) {
    fwd.classList.remove('active');
    if (intervalFwdState){
      clearInterval(intervalFwdState.intervalFwd);
    }
    // stopMedia();
  } else {
    media.currentTime += 3;
  }
}

useEffect(()=>{
  setInterval(() => {
    
    if (media){
      let minutes = Math.floor(media.currentTime / 60);
      let seconds = Math.floor(media.currentTime - minutes * 60);
   
      let minuteValue;
      let secondValue;
    
      if (minutes < 10) {
        minuteValue = '0' + minutes;
      } else {
        minuteValue = minutes;
      }
    
      if (seconds < 10) {
        secondValue = '0' + seconds;
      } else {
        secondValue = seconds;
      }
    
      let mediaTime = minuteValue + ':' + secondValue;
      setTimeState(mediaTime)

      let barLength = audioBottomPlayhead.clientWidth * (media.currentTime/media.duration);
      timerBar.style.width = barLength + 'px';
    }
  }, 500);
}, [timeState])
// -------------------------------------------------
//-------------loop----------------------------
const [loopState, setLoopState] = useState(false)
function toggleLoop(){
  const nextState = !loopState;
  setLoopState(nextState);
}
//-------------------------------------------
//-------------random----------------------------
const [randomState, setRandomState] = useState("not-random")
function toggleRandom(){
  if (randomState == "not-random"){
    setRandomState("random-play");
  } else {
    setRandomState("not-random")
  }
}
//-------------------------------------------
// ---------------volume------------------------
const [volumeState, setVolumeState] = useState(0);

function changeVolume(){
  setVolumeState(volumeSlider.value);
  vol = (Number(volumeState) + 136) / 271;
  if (vol > 0.98) {
    vol = 1;
  }
  console.log(vol)
  media.volume = vol;
}
useEffect(()=> {
  if (volumeKnob){
    volumeKnob.style.transform= `rotate(${volumeState}deg)`;
  }
  if (volumeLevel){
    volumeLevel.style.transform= `rotate(${volumeState}deg)`;
  }
  
},[volumeState])
// ---------------------------------------------
//---------------Audio-Tracks-------------------
// audioTracks.onaddtrack = updateTrackCount;
// audioTracks.onremovetrack = updateTrackCount;

function updateTrackCount(event) {
  // let trackCount = audioTacks.length;
  // drawTrackCountIndicator(trackCount);
  // console.log(trackCount);
}

function setTrack(track, songName){

  media.setAttribute("src", track);
  playPauseMedia();
  let newSongName;
  if (songName.length > 20){
    newSongName = songName.slice(0,20) + "..."
  } else {
    newSongName = songName
  }
  setSongNameState(newSongName);
}
//----------------------------------------------
  return(
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"audio"} >
          <audio
            id={"audio"}
            // controls
            src={psychoTantricJuju}
            // autoPlay
            loop={loopState}
            >            
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <div id={"audio__top"} >
  <p id={"audio__top__song-name"}>{songNameState}</p>
          </div>
          <div  id={"audio__middle"}>
            <div className={"controls"}>
              <img className={"fast-forward"} src={fastForward} alt={""} onClick={mediaForward} ></img>
              <img className={"play"} src={playButton} alt={""} onClick={playPauseMedia} ></img>
              <div id={"volume-knob-c"}>
                <VolumeKnobUi/>
                <div class="slider-wrapper">
                  <input type={"range"} min={"-136"} max={"136"}
                  //  value={"7"} 
                  step={"1"}
                  onChange={changeVolume}
                  ></input>
                </div>
              </div>
              {/* <div id={"audio__volume"}></div> */}
              <div className={"stop"} onClick={stopMedia} ></div>
              <img className={"rewind"} src={fastForward} alt={""} onClick={mediaBackward} ></img>
            </div>
          </div>
          <div id={"audio__bottom-c"} > 
            <div id={"timer-loop-random-c"}>
              <img className={`random ${randomState}`} src={random} alt={""} onClick={toggleRandom}></img>
              <div className="timer">
                <span id={"audio__bottom__time__start"} >{timeState}</span>
              </div>
              <img  className={`loop ${loopState ? "looping" : "not-looping"}`} src={loop} alt={""} onClick={toggleLoop}></img>
            </div>
            <div id={"audio__bottom"} >
              <div className={"audio__bottom__playhead"} >
                <div className={"audio__bottom__playhead__left"} ></div>
              </div>
            </div>
          </div>
          
        </div>
        <Tracklist setTrack={setTrack}/>
      </div>
    </>
  )
}
export default AudioPlayer;
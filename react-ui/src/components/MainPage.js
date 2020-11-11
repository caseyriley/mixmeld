import React, {useState, useEffect, useRef} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav';
import playButton from '../images/playButton.svg';
import pauseButton from '../images/pauseButton.png';
import fastForward from '../images/fastForward.png';
import loop from '../images/loop.png';
import random from '../images/random.png';


const MainPage = () => {
const media = document.querySelector('audio');
const play = document.querySelector('.play');

const rwd = document.querySelector('.rewind');
const fwd = document.querySelector('.fast-forward');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.audio__bottom__playhead__left');

const [timeState, setTimeState] = useState(":");

const [intervalFwdState, setIntervalFwdState] = useState();
const [intervalRwdState, setIntervalRwdState] = useState();

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

      let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
      console.log(media.currentTime/media.duration)
      timerBar.style.width = barLength + 'px';
    }
  }, 500);
}, [timeState])
// -------------------------------------------------
//-------------loop----------------------------
const [loopState, setLoopState] = useState("not-looping")
function toggleLoop(){
  if (loopState == "not-looping"){
    setLoopState("looping");
  } else {
    setLoopState("not-looping")
  }
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

  return (
    <>
      <div id={"main-page"}>
        <h1 id={"main-page__title"} >Formless Audio Player</h1>
        <div id={"audio"} >
          <audio
            id={"audio"}
            // controls
            src={psychoTantricJuju}
            // autoPlay
            loop={false}
            >            
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <div id={"audio__top"} >
            <p id={"audio__top__song-name"}>Song Name</p>
          </div>
          <div  id={"audio__middle"}>
            <div className={"controls"}>
              <img className={"fast-forward"} src={fastForward} alt={""} onClick={mediaForward} ></img>
        
              <img className={"play"} src={playButton} alt={""} onClick={playPauseMedia} ></img>
            
              <div id={"audio__volume"}></div>
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
              <img  className={`loop ${loopState}`} src={loop} alt={""} onClick={toggleLoop}></img>
              
            </div>
            <div id={"audio__bottom"} >
              <div id={"audio__bottom__playhead"} >
                <div className={"audio__bottom__playhead__left"} ></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  )
}
export default MainPage;
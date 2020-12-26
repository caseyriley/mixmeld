import React, {useState, useEffect, useRef} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav';

import playButton from '../images/playButton.svg';
import pauseButton from '../images/pauseButton.png';
import fastForward from '../images/fastForward.png';
import loop from '../images/loop.png';
import random from '../images/random.png';
import VolumeKnobUi from './VolumeKnobUi';
import Tracklist from './Tracklist';
import TimeRemaining from './TimeRemaining';




let vol = .5;

const AudioPlayer2 = (props)=>{
  const media = useRef()
  const play = useRef()

  const rwd = useRef();
  const fwd = useRef();

  const audioBottomPlayhead = useRef();
  const timerBar = useRef();

  const volumeKnob =useRef();
  const volumeLevel =useRef();
  const volumeSlider =useRef();


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
    rwd.current.classList.remove('active');
    fwd.current.classList.remove('active');
    if (intervalRwdState){
      clearInterval(intervalRwdState.intervalRwd);
    }
    if (intervalFwdState){
      clearInterval(intervalFwdState.intervalFwd);
    }
    
    if(media.current.paused) {
      play.current.src = pauseButton;
      media.current.play();
    } else {
      play.current.src = playButton;
      media.current.pause();
    }
  }
// --------------------------------------------------
// ---------------Stop-Button---------------------------
  function stopMedia() {
    media.current.pause();
    media.current.currentTime = 0;
    play.current.src = playButton;
    rwd.current.classList.remove('active');
    fwd.current.classList.remove('active');
    clearInterval(intervalRwd);
    if (intervalFwdState){
      clearInterval(intervalFwdState.intervalFwd);
    }
  }
// -----------------------------------------------

// -------------------fast-forward-and-rewind----------------------
  function mediaBackward() {
    
    clearInterval(intervalFwdState.intervalFwd);
    fwd.current.classList.remove('active');

    if(rwd.current.classList.contains('active')) {
      rwd.current.classList.remove('active');
      clearInterval(intervalRwdState.intervalRwd);
      media.current.play(); //
    } else {
      rwd.current.classList.add('active');
      media.current.pause();
      intervalRwd = setInterval(windBackward, 200);
      setIntervalRwdState({intervalRwd: intervalRwd})
    }
  }

  function mediaForward() {
    if (intervalRwdState){
      clearInterval(intervalRwdState.intervalRwd);
    }
    
    rwd.current.classList.remove('active');

    if(fwd.current.classList.contains('active')) {
      fwd.current.classList.remove('active');
      clearInterval(intervalFwdState.intervalFwd);
      media.current.play();
    } else {
      fwd.current.classList.add('active');
      media.current.pause();
      intervalFwd = setInterval(windForward, 200);
      setIntervalFwdState({intervalFwd: intervalFwd})
    }
  }

  function windBackward() {
    if(media.current.currentTime <= 3) {
      rwd.current.classList.remove('active');
      if (intervalRwdState){
        clearInterval(intervalRwdState.intervalRwd);
      }
      stopMedia();
    } else {
      media.current.currentTime -= 3;
    }
  }

  function windForward() {
    if(media.currentTime >= media.duration - 4) {
      fwd.current.classList.remove('active');
      if (intervalFwdState){
        clearInterval(intervalFwdState.intervalFwd);
      }
    } else {
      media.current.currentTime += 3;
    }
  }

  useEffect(()=>{
    setInterval(() => {
      if (media){
        let minutes = Math.floor(media.current.currentTime / 60);
        let seconds = Math.floor(media.current.currentTime - minutes * 60);
    
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

        let barLength = audioBottomPlayhead.current.clientWidth * (media.current.currentTime/media.current.duration);
        timerBar.current.style.width = barLength + 'px';
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
    if (randomState === "not-random"){
      setRandomState("s-random-play");
    } else {
      setRandomState("not-random")
    }
  }
//-------------------------------------------
// ---------------volume------------------------
  const [volumeState, setVolumeState] = useState(0);

  function changeVolume(){
    setVolumeState(volumeSlider.current.value);
    vol = (Number(volumeState) + 136) / 271;
    if (vol > 0.98) {
      vol = 1;
    }
    console.log(vol)
    media.current.volume = vol;
  }

  useEffect(()=> {
    if (volumeKnob){
      volumeKnob.current.style.transform= `rotate(${volumeState}deg)`;
    }
    if (volumeLevel){
      volumeLevel.current.style.transform= `rotate(${volumeState}deg)`;
    }
    
  },[volumeState])
// ---------------------------------------------
//---------------Set-Track-Onclick------------------

  function setTrack(track, songName){

    media.current.setAttribute("src", track);
    playPauseMedia();

    let newSongName = songName.slice(34,-4)
    if (newSongName.length > 20){
      newSongName = newSongName.slice(0, 20) + "..."
    } 
    setSongNameState(newSongName);
  }
//-------------------------------------------------


  return(
    <>
      <div id={"s-main-page"}>
        <h1 id={"s-main-page__title"} >Formless Audio Player</h1>
        <div id={"s-audio"} >
          <audio
            id={"audio"}
            ref={media}
            // controls
            src={psychoTantricJuju}
            // autoPlay
            loop={loopState}
            >            
            Your browser does not support the
            <code>audio</code> element.
          </audio>
          <div id={"s-audio__top"} >
            <p id={"s-audio__top__song-name"}>{songNameState}</p>
          </div>
          <div  id={"s-audio__middle"}>
            <div className={"s-controls"}>
              <img className={"s-fast-forward"} ref={fwd} src={fastForward} alt={""} onClick={mediaForward} ></img>
              <img className={"s-play"} ref={play} src={playButton} alt={""} onClick={playPauseMedia} ></img>
              <div id={"volume-knob-c"}>
                <VolumeKnobUi volumeKnob={volumeKnob} volumeLevel={volumeLevel}/>
                <div class="s-slider-wrapper">
                  <input type={"range"} min={"-136"} max={"136"}
                  step={"1"}
                  ref={volumeSlider}
                  onChange={changeVolume}
                  ></input>
                </div>
              </div>
              <div className={"s-stop"} onClick={stopMedia} ></div>
              <img  className={"s-rewind"} ref={rwd} src={fastForward} alt={""} onClick={mediaBackward} ></img>
            </div>
          </div>
          <div id={"s-audio__bottom-c"} > 
            <div id={"s-timer-loop-random-c"}>
              <img className={`s-random ${randomState}`} src={random} alt={""} onClick={toggleRandom}></img>
              <div className="s-timer">
                <span id={"s-audio__bottom__time__start"} >{timeState}</span>
              </div>
              <img  className={`s-loop ${loopState ? "s-looping" : "not-looping"}`} src={loop} alt={""} onClick={toggleLoop}></img>
            </div>
            <div id={"s-audio__bottom"} >
              <div className={"s-audio__bottom__playhead"} ref={audioBottomPlayhead} >
                <div className={"s-audio__bottom__playhead__left"} ref={timerBar} ></div>
                <TimeRemaining media={media}/>
              </div>
            </div>
          </div>
          
        </div>
        <Tracklist setTrack={setTrack}/>
      </div>
    </>
  )
}
export default AudioPlayer2;
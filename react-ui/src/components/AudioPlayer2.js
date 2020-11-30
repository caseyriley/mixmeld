import React, {useState, useEffect, useRef} from 'react';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav';

import playButton from '../images/playButton.svg';
import pauseButton from '../images/pauseButton.png';
import fastForward from '../images/fastForward.png';
import loop from '../images/loop.png';
import random from '../images/random.png';
import VolumeKnobUi from './VolumeKnobUi';
import Tracklist2 from './Tracklist2';
import TimeRemaining from './TimeRemaining';
import VolumeUiSlider from './VolumeUiSlider';




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
  const volumeFader =useRef();


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
      setRandomState("pl2-random-play");
    } else {
      setRandomState("not-random")
    }
  }
//-------------------------------------------
// ---------------volume------------------------
  const [volumeState, setVolumeState] = useState(0);

  function changeVolume(){
    setVolumeState(volumeSlider.current.value);
    vol = (Number(volumeState)) / 100;
    if (vol > 0.98) {
      vol = 1;
    }
    if (vol < 0.04) {
      vol = 0;
    }
    console.log(vol)
    media.current.volume = vol;
  }

  useEffect(()=> {
    if (volumeFader){
      volumeFader.current.style.bottom= `${volumeState * .75}px`;
    }
    if (volumeLevel){
      volumeLevel.current.style.height= `${volumeState * .75}px`;
    }
    
  },[volumeState])
// ---------------------------------------------
//---------------Audio-Tracks-------------------

  function setTrack(track, songName){

    media.current.setAttribute("src", track);
    playPauseMedia();

    let newSongName = songName.slice(34,-4)
    if (newSongName.length > 20){
      newSongName = newSongName.slice(0, 20) + "..."
    } 
    setSongNameState(newSongName);
  }
//----------------------------------------------


  return(
    <>
      <div id={"pl2-main-page"}>
        <div id={"pl2-left-column"}>
          <div id={"pl2-search"}>
            <input id={"pl2-search__input"} type={"text"} placeholder={"search"} ></input>
          </div>
        </div>
        {/* <h1 id={"pl2-main-page__title"} >Formless Audio Player</h1> */}
        <div id={"pl2-audio-tracklist-c"}>
          <div id={"pl2-audio"} >
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
            {/* <div id={"pl2-audio__top"} >
              
            </div> */}
            <div  id={"pl2-audio__middle"}>
              <div className={"pl2-controls"}>
                <img className={`pl2-random ${randomState}`} src={random} alt={""} onClick={toggleRandom}></img>
                <img  className={"pl2-rewind"} ref={rwd} src={fastForward} alt={""} onClick={mediaBackward} ></img>
                <img className={"pl2-play"} ref={play} src={playButton} alt={""} onClick={playPauseMedia} ></img>
                <div className={"pl2-stop"} onClick={stopMedia} ></div>
                <img className={"pl2-fast-forward"} ref={fwd} src={fastForward} alt={""} onClick={mediaForward} ></img>
                <img  className={`pl2-loop ${loopState ? "pl2-looping" : "not-looping"}`} src={loop} alt={""} onClick={toggleLoop}></img>
                <div id={"pl2-audio__bottom"} >
                <p id={"pl2-audio__top__song-name"}>{songNameState}</p>
                <div className={"pl2-audio__bottom__playhead"} ref={audioBottomPlayhead} >
                  <div className={"pl2-audio__bottom__playhead__left"} ref={timerBar} ></div>
                    <div className="pl2-timer">
                      <span id={"pl2-audio__bottom__time__start"} >{timeState}</span>
                    </div>
                    <TimeRemaining media={media}/>
                  </div>
                </div>
                <VolumeUiSlider volumeLevel={volumeLevel} volumeFader={volumeFader} volumeSlider={volumeSlider} changeVolume={changeVolume}/>
                {/* <div id={"volume-knob-c"}>
                  <VolumeKnobUi volumeKnob={volumeKnob} volumeLevel={volumeLevel}/>
                  <div class="pl2-slider-wrapper">
                    <input type={"range"} min={"-136"} max={"136"}
                    step={"1"}
                    ref={volumeSlider}
                    onChange={changeVolume}
                    ></input>
                  </div>
                </div> */}
                
                
              </div>
            </div>
            {/* <div id={"pl2-audio__bottom-c"} > 
              <div id={"pl2-timer-loop-random-c"}>
                
                
                
              </div>
              
            </div> */}
          </div>
        
        <Tracklist2 setTrack={setTrack}/>
        </div>
      </div>
    </>
  )
}
export default AudioPlayer2;
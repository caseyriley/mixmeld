import React, {useState, useEffect, useRef, useMemo} from 'react';
import { API_URL } from '../config';
import UseTime from './UseTime';
import playButton from '../images/playButton.svg';
import pauseButton from '../images/pauseButton.png';
import fastForward from '../images/fastForward.png';
import loop from '../images/loop.png';
import random from '../images/random.png';
import Tracklist2 from './Tracklist2';
import TimeRemaining from './TimeRemaining';
import VolumeUiSlider from './VolumeUiSlider';
import formlessMusicIcon from "../images/formless-music-icon.png"

import UploadingNewImage from './UploadingNewImage';
import NewPlaylistModal from './NewPlaylistModal';
import Pl2LeftColumn from './Pl2LeftColumn';
import PlaylistSwitch from './PlaylistSwitch';
import TrackDisplay from './TrackDisplay';



let vol = .5;

const AudioPlayer2 = (props)=>{
  const media = useRef()
  const play = useRef()

  const rwd = useRef();
  const fwd = useRef();

  // const audioBottomPlayhead = useRef();
  const timerBar = useRef();


  const volumeLevel =useRef();
  const volumeSlider =useRef();
  const volumeFader =useRef();

  const playHeadSlider = useRef();

  const currentTrack = useRef([]);

  const playlistIdRef = useRef();

 
  // const [timeState, setTimeState] = useState(":");
  // const timeRef = useRef(":");

  // const [intervalFwdState, setIntervalFwdState] = useState();
  // const [intervalRwdState, setIntervalRwdState] = useState();

  const [songNameState, setSongNameState] = useState("")
  const [artistNameState, setArtistNameState] = useState("")
  const [trackArrayLengthState, setTrackArrayLengthState] = useState()


  // let intervalFwd;
  // let intervalRwd;
  console.log('AudioPlayer2 rendered')
  //---------Get-Current_User--------------
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {

    const getCurrentUser = async () => {
      const token = window.localStorage.getItem('auth_token')
      const response = await fetch(`${API_URL}/users/token`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${token}` },
      })
      if (!response.ok) {
        console.log("getCurrent user response failed in Uploading.js");
      } else {
        const json = await response.json();
        setCurrentUser(json);
       
      }
    }
    getCurrentUser();
    // console.log("user==AudioPlayer2=====>", currentUser.id)
  }, [])
// ----------------------------------------------
// -------------------Get-Users-First-Track---------

  const [firstTrack, setFirstTrack] = useState();

  useEffect(()=>{
    const token = window.localStorage.getItem('auth_token');

    const getUserFirstTrack = async () => {
      const response = await fetch(`${API_URL}/tracks/first/${currentUser.id}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorizaion": `Bearer ${token}` }
      })
      if (!response.ok) { console.log("error in getUserTracks") }
      else {
        const json = await response.json();
        console.log('jsoooon==========>', json)
        if (json === []){

        }
        setFirstTrack(json);
        currentTrack.current = json[0].id;
      }
    }
    getUserFirstTrack();
    media.current.volume = .5;

  },[currentUser])
  // -----------------------------------------------

// ---------------Play/Pause-Button---------------
  // const [firstTrack, setFirstTrack] = useState();
  // const firstTrack = useRef()
  const [isPlayingState, setIsPlayingState] = useState(1)

  function playPauseMedia() {

    if (!media.current.src){
      media.current.setAttribute("src", firstTrack[0].tracklocation)
    }
    
    rwd.current.classList.remove('active');
    fwd.current.classList.remove('active');
    // if (intervalRwdState){
    //   clearInterval(intervalRwdState.intervalRwd);
    // }
    // if (intervalFwdState){
    //   clearInterval(intervalFwdState.intervalFwd);
    // }
    
    if(media.current.paused) {
      play.current.src = pauseButton;
      media.current.play();
      setIsPlayingState(isPlayingState + 1)
    } else {
      play.current.src = playButton;
      media.current.pause();
    }
  }
// --------------------------------------------------
    // function startTimer(func){
    //   func()
    // }
// ---------------Stop-Button---------------------------
  function stopMedia() {
    media.current.pause();
    media.current.currentTime = 0;
    play.current.src = playButton;
    rwd.current.classList.remove('active');
    fwd.current.classList.remove('active');
    // clearInterval(intervalRwd);
    // if (intervalFwdState){
    //   clearInterval(intervalFwdState.intervalFwd);
    // }
  }
// -----------------------------------------------
// --------------Skip-Back------------------------
  function skipBack(){

    // console.log("timeState", media.current.currentTime);
    if (media.current.currentTime > 5) {
      if (media){
        media.current.currentTime = 0;
      }
    } else {
      const trackLi = document.getElementsByClassName(`audioId${currentTrack.current}`) //get Li element of current track regarless of sort choice
    let trackLiIdNumber = Number(trackLi[0].id.slice(3)) //get index of current track
    if (trackLiIdNumber === 0){
      trackLiIdNumber = 1
    }
    const newTrackLi = document.getElementById(`nti${trackLiIdNumber - 1}`) //get Li element of previous track regardless of sort choice
    const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
    setTrack(newTrackObj.tracklocation, newTrackObj.trackname, newTrackObj.trackartist, newTrackObj.audioId, newTrackObj.trackart); // start the next track
    }

  }
// ------------------------------------------------

// -------------------fast-forward-and-rewind----------------------
  // function mediaBackward() {
    
  //   clearInterval(intervalFwdState.intervalFwd);
  //   fwd.current.classList.remove('active');

  //   if(rwd.current.classList.contains('active')) {
  //     rwd.current.classList.remove('active');
  //     clearInterval(intervalRwdState.intervalRwd);
  //     media.current.play(); //
  //   } else {
  //     rwd.current.classList.add('active');
  //     media.current.pause();
  //     intervalRwd = setInterval(windBackward, 200);
  //     setIntervalRwdState({intervalRwd: intervalRwd})
  //   }
  // }

  // function mediaForward() {
  //   if (intervalRwdState){
  //     clearInterval(intervalRwdState.intervalRwd);
  //   }
    
  //   rwd.current.classList.remove('active');

  //   if(fwd.current.classList.contains('active')) {
  //     fwd.current.classList.remove('active');
  //     clearInterval(intervalFwdState.intervalFwd);
  //     media.current.play();
  //   } else {
  //     fwd.current.classList.add('active');
  //     media.current.pause();
  //     intervalFwd = setInterval(windForward, 200);
  //     setIntervalFwdState({intervalFwd: intervalFwd})
  //   }
  // }

  // function windBackward() {
  //   if(media.current.currentTime <= 3) {
  //     rwd.current.classList.remove('active');
  //     if (intervalRwdState){
  //       clearInterval(intervalRwdState.intervalRwd);
  //     }
  //     stopMedia();
  //   } else {
  //     media.current.currentTime -= 3;
  //   }
  // }

  // function windForward() {
  //   if(media.currentTime >= media.duration - 4) {
  //     fwd.current.classList.remove('active');
  //     if (intervalFwdState){
  //       clearInterval(intervalFwdState.intervalFwd);
  //     }
  //   } else {
  //     media.current.currentTime += 3;
  //   }
  // }
// -------------------------------------------------

  // const {start, timeState, timerBar} = UseTime(media, audioBottomPlayhead);

// -------Update-Time--------------------------------
  // useEffect(()=>{
  //   setInterval(() => {
  //     if (media){
  //       let minutes = Math.floor(media.current.currentTime / 60);
  //       let seconds = Math.floor(media.current.currentTime - minutes * 60);
    
  //       let minuteValue;
  //       let secondValue;
      
  //       if (minutes < 10) {
  //         minuteValue = '0' + minutes;
  //       } else {
  //         minuteValue = minutes;
  //       }
      
  //       if (seconds < 10) {
  //         secondValue = '0' + seconds;
  //       } else {
  //         secondValue = seconds;
  //       }
      
  //       let mediaTime = minuteValue + ':' + secondValue;
  //       // setTimeState(mediaTime)
  //       // timeRef.current = mediaTime
  //       let barLength = audioBottomPlayhead.current.clientWidth * (media.current.currentTime/media.current.duration);
  //       timerBar.current.style.width = barLength + 'px';
  //       // console.log(timeRef.current)
  //     }
  //   }, 500);
  // }, [])
// -------------------------------------------------
// -------------Move-Playhead-onClick---------------
  function movePlayheadOnClick(e){
    if (media){
      media.current.currentTime = parseFloat(media.current.duration * playHeadSlider.current.value);
    }
  }
// -------------------------------------------------

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
  const [volumeState, setVolumeState] = useState(50);

  function changeVolume(){
    setVolumeState(volumeSlider.current.value);
    vol = (Number(volumeState)) / 100;
    if (vol > 0.98) {
      vol = 1;
    }
    if (vol < 0.04) {
      vol = 0;
    }
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
 
  const [trackArtState, setTrackArtState] = useState();
  const [pl2TrackLocationState, setPl2TrackLocationState] = useState();

  function setTrack(track, songName, artistName, audioId, trackArt){

    media.current.setAttribute("src", track);
    playPauseMedia();

    let newSongName = songName.slice(0,)
    if (newSongName.length > 20){
      newSongName = newSongName.slice(0, 20) + "..."
    } 
    let newArtistName = artistName.slice(0,)
    if (newArtistName.length > 20){
      newArtistName = newArtistName.slice(0, 20) + "..."
    } 
    setSongNameState(newSongName);
    setArtistNameState(newArtistName);
    setTrackArtState(trackArt);
    setPl2TrackLocationState(track);
    
    currentTrack.current = audioId;
    
  }
//----------------------------------------------

function nextTrack() {
  const trackLi = document.getElementsByClassName(`audioId${currentTrack.current}`) //get Li element of current track regarless of sort choice
  let trackLiIdNumber = Number(trackLi[0].id.slice(3)) //get index of current track

  if (randomState === "pl2-random-play"){

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    const randomNum = getRandomInt(trackArrayLengthState -1);
    console.log("randomNum==================>", randomNum)
    const newTrackLi = document.getElementById(`nti${randomNum}`) //get Li element of next track regardless of sort choice
    const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
    // console.log("nnneeeeewwTrackObj====>", newTrackObj)
    setTrack(newTrackObj.tracklocation, newTrackObj.trackname, newTrackObj.trackartist, newTrackObj.audioId, newTrackObj.trackart); // start the next track
  } else {

    if (loopState && trackLiIdNumber >= trackArrayLengthState -1){
      trackLiIdNumber = -1;
    }
  
    if (!loopState && trackLiIdNumber >= trackArrayLengthState -1){
      trackLiIdNumber = -1;
      const newTrackLi = document.getElementById(`nti${trackLiIdNumber + 1}`) //get Li element of next track regardless of sort choice
      const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
      setTrack(newTrackObj.tracklocation, newTrackObj.trackname, newTrackObj.trackartist, newTrackObj.audioId, newTrackObj.trackart); // start the next track
      stopMedia()
    } else {
      const newTrackLi = document.getElementById(`nti${trackLiIdNumber + 1}`) //get Li element of next track regardless of sort choice
      const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
      // console.log("nnneeeeewwTrackObj====>", newTrackObj)
      setTrack(newTrackObj.tracklocation, newTrackObj.trackname, newTrackObj.trackartist, newTrackObj.audioId, newTrackObj.trackart); // start the next track
    }
  }

 
}
// --------------------------------
  const [trackEditState, setTrackEditState] = useState(false);  
  const [pl2TrackRefreshState, setPl2TrackRefreshState] = useState(1) 
  

// -----------PlaylistSwitch--functions-------------------
  const [playlistSwitchState, setPlaylistSwitchState] = useState("Tracklist2")

  function showPlaylist(playlistName, playlistId){
    setPlaylistSwitchState("Playlist2")
    playlistIdRef.current = {playlistId: playlistId, playlistName: playlistName};
  }
  function showTracklist(string){
    setPlaylistSwitchState("Tracklist2")
  }

  // ----------------------------------------------------
  // ----------Add-To-Playlist---------------------------
  const [addToPlaylistState, setAddToPlaylistState] = useState(false);
  function toggleAddToPlaylist(){
    setAddToPlaylistState(!addToPlaylistState)
  }
  // ----------------------------------------------------

 
  return(
    <>
      <div id={"pl2-main-page"}>
        <Pl2LeftColumn playlistIdRef={playlistIdRef} addToPlaylistState={addToPlaylistState} toggleAddToPlaylist={toggleAddToPlaylist} showTracklist={showTracklist} showPlaylist={showPlaylist} />
        <div id={"pl2-audio-tracklist-c"}>
          <div id={"pl2-audio"} >
            <audio
              id={"audio"}
              ref={media}
              // controls
              // autoPlay
              onEnded={nextTrack}
              // loop={loopState}
              >            
              Your browser does not support the
              <code>audio</code> element.
            </audio>
            <div  id={"pl2-audio__top"}>
              <div className={"pl2-audio__top__inner"}>
                <div id={"pl2-controls"}>
                  <img className={`pl2-random ${randomState}`} src={random} alt={""} onClick={toggleRandom}></img>
                  <img  className={"pl2-rewind"} ref={rwd} src={fastForward} alt={""} onClick={skipBack} ></img>
                  <img className={"pl2-play"} ref={play} src={playButton} alt={""} onClick={playPauseMedia} ></img>
                  <img className={"pl2-fast-forward"} onClick={nextTrack} ref={fwd} src={fastForward} alt={""}  ></img>
                  <img  className={`pl2-loop ${loopState ? "pl2-looping" : "not-looping"}`} src={loop} alt={""} onClick={toggleLoop}></img>
                </div>
                <TrackDisplay media={media} trackEditState={trackEditState} 
                currentUser={currentUser} pl2TrackRefreshState={pl2TrackRefreshState} 
                setPl2TrackRefreshState={setPl2TrackRefreshState} setTrackArtState={setTrackArtState} 
                setPl2TrackLocationState={setPl2TrackLocationState} pl2TrackLocationState={pl2TrackLocationState} 
                trackArtState={trackArtState} songNameState={songNameState} firstTrack={firstTrack} 
                artistNameState={artistNameState} playHeadSlider={playHeadSlider} 
                movePlayheadOnClick={movePlayheadOnClick} 
                isPlayingState={isPlayingState}/>
                {/* <div id={"pl2-track-display"}>
                  <div>{media.current ? `${Math.floor(media.current.currentTime / 60)}:${Math.floor(media.current.currentTime - Math.floor(media.current.currentTime / 60) * 60)}` : ""}</div>
                  
                  {trackEditState ? 
                  <> 
                    <UploadingNewImage currentUser={currentUser} pl2TrackRefreshState={pl2TrackRefreshState} setPl2TrackRefreshState={setPl2TrackRefreshState} setTrackArtState={setTrackArtState} setPl2TrackLocationState={setPl2TrackLocationState} pl2TrackLocationState={pl2TrackLocationState}/>
                  </>
                  : ""}
                  <img className={"track-art"} src={`${trackArtState ? trackArtState : formlessMusicIcon}`} alt={""}/>
                  <div id={"pl2-audio__bottom"} >
                    <p id={"pl2-audio__top__song-name"}>{songNameState ? songNameState : `${firstTrack ? firstTrack[0].trackname : ""}`}</p>
                    
                    <p id={"pl2-audio__top__song-artist"}>{artistNameState ? artistNameState : ``}</p>
                  
                    <div className={"pl2-audio__bottom__playhead"} ref={audioBottomPlayhead} >
                      <input id={"pl2-playhead-input"} ref={playHeadSlider} type={"range"} min={"0"} max={"1"} step={"0.01"} onChange={movePlayheadOnClick} ></input>
                      <div className={"pl2-audio__bottom__playhead__left"} ref={timerBar} ></div>
                      <div className="pl2-timer">
                        <span id={"pl2-audio__bottom__time__start"} >{"timeState"}</span>
                      </div>
                      <TimeRemaining media={media}/>
                    </div>
                  </div>
                </div> */}

                <VolumeUiSlider volumeLevel={volumeLevel} volumeFader={volumeFader} volumeSlider={volumeSlider} changeVolume={changeVolume}/>
              </div>
            </div>
          </div>
        <PlaylistSwitch trackArtState={trackArtState} setTrack={setTrack} playlistIdRef={playlistIdRef} currentUser={currentUser} playlistIdRef={playlistIdRef} addToPlaylistState={addToPlaylistState} playlistSwitchState={playlistSwitchState} pl2TrackRefreshState={pl2TrackRefreshState} trackEditState={trackEditState} setTrackEditState={setTrackEditState} setTrack={setTrack} setTrackArrayLengthState={setTrackArrayLengthState}/>
        {/* <Tracklist2 pl2TrackRefreshState={pl2TrackRefreshState} trackEditState={trackEditState} setTrackEditState={setTrackEditState} setTrack={setTrack} setTrackArrayLengthState={setTrackArrayLengthState}/> */}
        </div>
      </div>
    </>
  )
}
export default AudioPlayer2;
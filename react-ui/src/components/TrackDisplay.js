import React from 'react';
import TimeRemaining from './TimeRemaining';
import UploadingNewImage from './UploadingNewImage';
import formlessMusicIcon from '../images/formless-music-icon.png'

const TrackDisplay = (props) => {
  return (
    <>
      <div id={"pl2-track-display"}>
        {/* <div>{media.current ? `${Math.floor(media.current.currentTime / 60)}:${Math.floor(media.current.currentTime - Math.floor(media.current.currentTime / 60) * 60)}` : ""}</div> */}
                  
        {props.trackEditState ? 
        <> 
          <UploadingNewImage currentUser={props.currentUser} pl2TrackRefreshState={props.pl2TrackRefreshState} setPl2TrackRefreshState={props.setPl2TrackRefreshState} setTrackArtState={props.setTrackArtState} setPl2TrackLocationState={props.setPl2TrackLocationState} pl2TrackLocationState={props.pl2TrackLocationState}/>
        </>
        : ""}
        <img className={"track-art"} src={`${props.trackArtState ? props.trackArtState : formlessMusicIcon}`} alt={""}/>
        <div id={"pl2-audio__bottom"} >
          <p id={"pl2-audio__top__song-name"}>{props.songNameState ? props.songNameState : `${props.firstTrack ? props.firstTrack[0].trackname : ""}`}</p>
          {/* <p id={"pl2-audio__top__song-artist"}>{artistNameState ? artistNameState : `${firstTrack ? firstTrack[0].trackartist : ""}`}</p> */}
          <p id={"pl2-audio__top__song-artist"}>{props.artistNameState ? props.artistNameState : ``}</p>
        
          <div className={"pl2-audio__bottom__playhead"} ref={props.audioBottomPlayhead} >
            <input id={"pl2-playhead-input"} ref={props.playHeadSlider} type={"range"} min={"0"} max={"1"} step={"0.01"} onChange={props.movePlayheadOnClick} ></input>
            <div className={"pl2-audio__bottom__playhead__left"} ref={props.timerBar} ></div>
            <div className="pl2-timer">
              <span id={"pl2-audio__bottom__time__start"} >{"timeState"}</span>
            </div>
            <TimeRemaining media={props.media}/>
          </div>
        </div>
      </div>
    </>
  )
}
export default TrackDisplay;
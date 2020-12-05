import React from 'react';
import ReactDom from 'react-dom';
import { API_URL } from '../config';
import UploadingImage from './UploadingImage';

const UploadModal = (props) => {

  // ---------------Update-Track-Info--------------------

function updateTrackInfo(e) {
  // console.log("updatTrackInfo e", e.target.trackartist.value, e.target.trackname.value, e.target.trackgenre.value)
 
  const newTrack = async () => {

    const trackArtist = e.target.trackartist.value;
    const trackName = e.target.trackname.value;
    const trackGenre = e.target.trackgenre.value;
    const trackData = { trackartist: trackArtist, trackname: trackName, trackgenre: trackGenre, tracklocation: props.trackLocationState}
    console.log("trackData======>",trackData)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_info`, options)
    // setRefreshTrackState(refreshTrackState + 1)
  }
  newTrack();
}
// ------------------------------------------------------


  return ReactDom.createPortal(
  
                <div className={`${props.uploadModalState === "upload-modal" ? "upload-modal-background": "no-modal"}`} >
                  <div className={"upload-modal"}>
                    <span id={"upload-modal-title"}>Track Info</span>
                    <span id={"upload-modal-instructions"}>Enter your tracks info here and upload a image. You can always edit your tracks info later.</span>
                    <UploadingImage trackLocationState={props.trackLocationState}/>
                    <form id={"upload-modal__form"} onSubmit={e => {e.preventDefault(); updateTrackInfo(e)}}>
                    <label for={"upload-modal__form__track-artist"}>Artist</label>
                    <input 
                        name={"trackartist"}
                        type={"text"}
                        id={"upload-modal__form__track-artist"} 
                        maxLength={100} 
                        placeholder={""} 
                      />
                    <label for={"upload-modal__form__track-name"}>Track Name</label>
                    <input 
                        name={"trackname"}
                        type={"text"}
                        id={"upload-modal__form__track-name"} 
                        maxLength={100} 
                        placeholder={""} 
                      />
                    <label for={"upload-modal__form__genre-name"}>Genre Name</label>
                    <input 
                        name={"trackgenre"}
                        type={"text"}
                        id={"upload-modal__form__genre-name"} 
                        maxLength={200} 
                        placeholder={""} 
                    />
                    { props.trackLocationState ?
                      <input className={""} type={"submit"} />
                      : ""
                    }
                    </form>
                  </div>
                </div>
      , document.getElementById("upload-modal-portal")
  )
}
export default UploadModal;
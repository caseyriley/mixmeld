import React, { useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';
import lottie from 'lottie-web';
import deleteX from '../images/deleteX.png'
import LoadingRipples from '../images/LoadingRipples';
import uploadImage from "../images/uploadImage.png"


const UploadingNewImage = (props) => {

  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }


    const upload = (e) => {
      
      const updateTrackArt = async (artLocation) => {
        console.log("trackLocationState==================>", props.pl2TrackLocationState)
        const trackData = { trackart: artLocation, tracklocation: props.pl2TrackLocationState , user_id: props.currentUser.id}
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(trackData),
        }
        fetch(`${API_URL}/tracks/art`, options)
      }
    
      let location
      
      S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data)=>{
        location = data.location;
          updateTrackArt(location);
          props.setTrackArtState(location);
          props.setRefreshTrackState(props.refreshTrackState + 1)
      })

    }
        
  return (
    <>
      <div id={"uploading-new-image-c"}>
        {/* <span id={"uploading-image-c__span"}>Drop Track Art Here</span> */}
        <img id={"uploading-new-image-icon"} src={uploadImage} alt={""}/>
        <input id={"uploading-new-image-c__input"} type="file" onChange={upload} />
      </div>
    </>

  )
}
export default UploadingNewImage;
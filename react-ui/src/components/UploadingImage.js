import React, { useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';
import deleteX from '../images/deleteX.png'


const UploadingImage = (props) => {

  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }

  const [trackArtLocationState, setTrackArtLocationState] = useState();

    const upload = (e) => {
      
      const updateTrackArt = async (artLocation) => {
        console.log("trackLocationState==================>", props.trackLocationState)
        const trackData = { trackart: artLocation, tracklocation: props.trackLocationState}
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
          setTrackArtLocationState(location);
      })

    }
        
  return (
    <>{trackArtLocationState ? 
      <div id={"uploaded-image-c"} >
        <img id={"uploaded-image"} src={trackArtLocationState} alt={""}/>
        <div onClick={()=>{setTrackArtLocationState("")}}> 
          <img src={deleteX} alt={""}/> 
        </div>
      </div>
        : 
        <div id={"uploading-image-c"}>
          <span id={"uploading-image-c__span"}>Drop Track Art Here</span>
          <input id={"uploading-image-c__input"} type="file" onChange={upload} />
        </div>
      }
      
    </>

  )
}
export default UploadingImage;
import React, { useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';
import deleteX from '../images/deleteX.png'
import LoadingRipples from '../images/LoadingRipples';


const UploadingImage = (props) => {

  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }

  const [trackArtLocationState, setTrackArtLocationState] = useState();

  function removeSpecialChars(str) {
    const newStr = str.replace(/[^\w\s\\.\\*\\_\\(\\)!\\'-]/gi, '');
    const splitStr = newStr.split(/\.(?=[^.]+$)/)
    const randNewStr = splitStr[0] + Math.floor(Math.random() * 1000) + '.' + splitStr[1]  
    return randNewStr 
  }

  const upload = (e) => {

    const prevName = e.target.files[0]["name"]
    let newFile = e.target.files[0]

    Object.defineProperties(newFile, {
      name: {
        value: `${removeSpecialChars(prevName)}`,
        writable: true,
        configurable: true
      },
    });
      
  const updateTrackArt = async (artLocation) => {
    console.log("trackLocationState==================>", props.trackLocationState)
    const trackData = { trackart: artLocation, tracklocation: props.trackLocationState, user_id: props.currentUser.id}
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
    <>
      {(()=>{
        switch(props.trackLocationState ? "uploading-image" : "waiting") {
          case "uploading-image":
            return (
              <>
                {trackArtLocationState ? 
                  <div id={"uploaded-image-c"} >
                    <div id={"uploaded-image"} 
                    style={{backgroundImage:  "url(" + trackArtLocationState + ")"}} 
                    alt={""}></div>
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
          case "waiting":
            return (
              <div id={"waiting"}>
                <span>Uploading...</span>
                <LoadingRipples/>
              </div>
            )
          default: 
            return (
              <div></div>
              )
        }
      })()}
      
      
    </>

  )
}
export default UploadingImage;
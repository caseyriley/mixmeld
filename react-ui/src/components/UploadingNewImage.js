import React from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';
import uploadImage from "../images/uploadImage.png"


const UploadingNewImage = (props) => {

  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }

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
        const trackData = { trackart: artLocation, tracklocation: props.pl2TrackLocationState, user_id: props.currentUser.id}
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
          let prevState = props.refreshTrackState;
          props.setRefreshTrackState(prevState + 1)
          const newState = !props.trackEditState;
          props.setTrackEditState(newState);
      })
      .catch((err) => {
        alert(err)
      })

    }
        
  return (
    <>
      <div id={"uploading-new-image-c"}>
        <img id={"uploading-new-image-icon"} src={uploadImage} alt={""}/>
        <input id={"uploading-new-image-c__input"} type="file" onChange={upload} />
      </div>
    </>

  )
}
export default UploadingNewImage;
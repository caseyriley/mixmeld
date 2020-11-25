import React, { useEffect, useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';

const UploadingTrack = (props) => {
  

  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }

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
        console.log(json)
      }
    }
    getCurrentUser();
  }, [])

  const upload = (e) => {
    const trackName = e.target.value.slice(12,).slice(0,-4)
    const newTrack = async (uploadLocation) => {
      const trackData = { user_id: currentUser.id, trackname: trackName, tracklocation: uploadLocation}
      // console.log("trackData======>",trackData)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/post`, options)
    }
  

    let location;
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        // console.log("data.location========>",data.location)
        newTrack(data.location) 
        location = data.location
      })
      .then(()=>{
        console.log("data.location========>", location)
        // Create a non-dom allocated Audio element
        let au = document.createElement('audio');

        // Define the URL of the MP3 audio file
        au.src = location;

        // Once the metadata has been loaded, display the duration in the console
        au.addEventListener('loadedmetadata', function(){
            // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
            const duration = au.duration;

            // example 12.3234 seconds
            console.log("The duration of the song is of: " + duration + " seconds");
            // Alternatively, just display the integer value with
            // parseInt(duration)
            // 12 seconds
        },false);
      })
      // .then(() => window.location.reload())
      .catch((err) => {
        alert(err)
      })
       
    }



  return (
    <>
      <div id={"uploading-track-c"}>
        <span id={"uploading-track-c__span"}>Drop Tracks Here</span>
        <input id={"uploading-track"} type="file" onChange={upload} />
      </div>
    </>

  )
}
export default UploadingTrack;
import React, { useEffect, useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';
import useFormatTime from './useFormatTime';

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

  function formatTime(time){
    let start = 12;
    let end = 8;
    if (time < 3600){
      start = 14;
      end = 5;
    } 
    const formattedTime = `${new Date(time * 1000).toISOString().substr(start, end)}`
    return formattedTime;


  }

  const upload = (e) => {

    const trackName = e.target.value.slice(12,).slice(0,-4)
    const newTrack = async (uploadLocation, duration) => {
      const trackData = { user_id: currentUser.id, trackname: trackName, tracklocation: uploadLocation, tracktime: duration}
      console.log("trackData^^^^^^^^^^^^^^^^^^^^^^", trackData)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/post`, options)
    }
  
    let location;
    let duration;

    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {

// ---------------Get-TracK-Length-Variable---------------------
        location = data.location
        console.log("data.location========>", location)
        let au = document.createElement('audio');
        au.src = location;
        au.addEventListener('loadedmetadata', function(){
        duration = formatTime(au.duration);

        console.log("The duration of the song is of: ", duration);
        },false);
// -------------------------------------------------------------

        newTrack(data.location, duration) 
        
      })
//       .then(()=>{

// // ---------------Get-TracK-Length-Variable---------------------
//         console.log("data.location========>", location)
//         let au = document.createElement('audio');
//         au.src = location;
//         au.addEventListener('loadedmetadata', function(){
//             const duration = au.duration;

//             console.log("The duration of the song is of: " + duration + " seconds");
//         },false);
// // -------------------------------------------------------------

//       })
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
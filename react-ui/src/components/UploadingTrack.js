import React, { useEffect, useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';
const jsmediatags = require('jsmediatags');

const UploadingTrack = (props) => {

// ---------------get-mp3-meta-data---------------
function getMp3MetaData(){
  new Promise((resolve, reject) => {
    new jsmediatags.Reader('/path/to/song.mp3')
      .read({
        onSuccess: (tag) => {
          console.log('Success!');
          resolve(tag);
        },
        onError: (error) => {
          console.log('Error');
          reject(error);
        }
    });
  })
    .then(tagInfo => {
      console.log(tagInfo);
      // handle the onSuccess return
    })
    .catch(error => {
      // handle errors
    });
} 
// -----------------------------------------------
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
      }
    }
    getCurrentUser();
  }, [])

  async function formatTime(time){
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
    let formattedTime;
    const trackName = e.target.value.slice(12,).slice(0,-4)

    const newTrack = async (uploadLocation) => {
      const trackData = { user_id: currentUser.id, trackname: trackName, tracklocation: uploadLocation, tracktime: formattedTime}
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/post`, options)
    }
  
    let location
    
    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {

// ---------------Get-TracK-Length-Variable---------------------
        location = data.location;
        let au = document.createElement('audio');
        au.src = location;

        au.addEventListener('loadedmetadata', function(){
          async function inner(){
            formattedTime = await formatTime(au.duration)
            newTrack(location).then(()=>{
              getMp3MetaData(location);
              props.setRefreshTrackState(props.refreshTrackState + 1)
            })
          }
          inner()
        },false);
// -------------------------------------------------------------
      })
       
    }



  return (
    <>
      <div id={"s-uploading-track-c"}>
        <span id={"s-uploading-track-c__span"}>Drop Tracks Here</span>
        <input id={"s-uploading-track"} type="file" onChange={upload} />
      </div>
    </>

  )
}
export default UploadingTrack;
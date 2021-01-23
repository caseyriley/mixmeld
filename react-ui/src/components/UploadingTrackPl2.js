import React, { useEffect, useState } from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config';


const UploadingTrackPl2 = (props) => {
  

// ---------------get-mp3-meta-data---------------
// function getMp3MetaData(){
//   new jsmediatags.Reader("https://formless.s3.amazonaws.com/12 Pretty Bird (Freestyle) [feat. Common].mp3")
//   .setTagsToRead(["title", "artist"])
//   .read({
//     onSuccess: function(tag) {
//       console.log("ttttttttaaaaaaaaaaaggggggg",tag);
//     },
//     onError: function(error) {
//       console.log(':(', error.type, error.info);
//     }
//   });
// } 
// -----------------------------------------------
  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }
  console.log("config###########", config)

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
  

  function removeSpecialChars(str) {
    return str.replace(/[^\w\s\\.\\*\\_\\(\\)!\\'-]/gi, '') + Math.floor(Math.random() * 100);           
  }

  const upload = (e) => {
    console.log("e.target.value", e.target.value)
    console.log("e.target.files[0]", e.target.files[0])
    const prevName = e.target.files[0]["name"]
    let newFile = e.target.files[0]

    Object.defineProperties(newFile, {
      name: {
        value: `${removeSpecialChars(prevName)}`,
        writable: true,
        configurable: true
      },
    });

    console.log("newFile ===>", newFile)

    props.setUploadModalState("upload-modal");
    
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

        location = data.location;
        console.log("location of upoad UploadingJs", location)

        let au = document.createElement('audio');
        au.src = location;

        au.addEventListener('loadedmetadata', function(){
          async function inner(){
            formattedTime = await formatTime(au.duration)
            newTrack(location).then(()=>{
              props.setTrackLocationState(location)
              props.setRefreshTrackState(props.refreshTrackState + 1)
            })
          }
          inner()
          
        },false);

      })
       
    }

  return (
    <>
      <div id={"pl2-uploading-track-c"}>
        <span id={"pl2-uploading-track-c__span"}>Upload <span id={"pl2-uploading-track-c__span__inner"}>Track</span></span>
        <input id={"pl2-uploading-track"} type="file" onChange={upload} onKeypress={(event)=> ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 32 || (event.charCode >= 48 && event.charCode <= 57))}/>
      </div>
    </>

  )
}
export default UploadingTrackPl2;
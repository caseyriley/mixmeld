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
      console.log("trackData======>",trackData)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/post`, options)
    }
  


    S3FileUpload.uploadFile(e.target.files[0], config)
      .then((data) => {
        console.log("data.location========>",data.location)
        newTrack(data.location) 
      })
      // .then(() => window.location.reload())
      .catch((err) => {
        alert(err)
      })
       
  }
  return (
    <>
      <input className={"uploading-track"} type="file" onChange={upload} />
    </>

  )
}
export default UploadingTrack;
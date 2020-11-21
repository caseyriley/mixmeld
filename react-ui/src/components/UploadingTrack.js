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

  // const upload = (e) => {
  //   const newTrack = async (uploadLocation) => {
  //     // const trackData = { user_id: , trackname: , trackrating: props.imageModalState.description, user_id: id }
  //     const options = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //     }
  //     fetch(`${API_URL}/track?user_id=${currentUser.id}&href=${uploadLocation}`, options)

  //   }
  


  //   S3FileUpload.uploadFile(e.target.files[0], config)
  //     .then((data) => {
  //       console.log("data========================>",data)
  //       newTrack(data.location) 
  //     }).then(() => window.location.reload())
  //     .catch((err) => {
  //       alert(err)
  //     })
       
  // }
  return (
    <>
      {/* <input className={"uploading-track"} type="file" onChange={upload} /> */}
    </>

  )
}
export default UploadingTrack;
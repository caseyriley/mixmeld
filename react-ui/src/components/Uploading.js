import React, {useEffect, useState} from 'react';
import S3FileUpload from 'react-s3';
import { API_URL } from '../config'


const Uploading = () => {

  const config = {
    bucketName: process.env.REACT_APP_BUCKETNAME,
    region: 'us-west-2',
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
  }

  const upload = (e) => {
    // const changeBanner = async (uploadLocation) => {
    //   const options = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //   }
    //   fetch(`${API_URL}/users/banner?user_id=${user.id}&href=${uploadLocation}`, options)
    // }
    


    S3FileUpload.uploadFile(e.target.files[0], config)
    // .then((data) => {
    //   changeBanner(data.location)
    //   window.location.reload()
    // })
    .catch((err) => {
      alert(err)
    })
    
  }
  return (
    <> 
      <input className={"uploading"} type="file" onChange={upload} />
    </>

  )
}
export default Uploading;

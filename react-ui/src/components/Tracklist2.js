import React, {useEffect, useState} from 'react';

import { API_URL } from '../config';

import UploadingTrack from './UploadingTrack';
import pen from '../images/pen.png';
import deleteX from '../images/deleteX.png';
import UploadModal from './UploadModal';
import UploadingTrackPl2 from './UploadingTrackPl2';


const Tracklist2 = (props) => {

  // ----------Toggle-Track-Edit-----------
  // const [trackEditState, setTrackEditState] = useState(false);

  function toggleTrackEditState(){
    const newState = !props.trackEditState;
    props.setTrackEditState(newState);
  }
  // -------------------------------------- 
  //---------Get-Current_User--------------
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
// ----------------------------------------------
// -------------------Get-Users-First-Track---------


  useEffect(()=>{
    const token = window.localStorage.getItem('auth_token');

    const getUserFirstTrack = async () => {
      const response = await fetch(`${API_URL}/tracks/first/${currentUser.id}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorizaion": `Bearer ${token}` }
      })
      if (!response.ok) { console.log("error in getUserTracks") }
      else {
        const json = await response.json();
        props.firstTrack.current = json;
      }
    }
    getUserFirstTrack();

  },[])
  // -----------------------------------------------
// ---------------------Get-User-Tracks-pl2----------
  const [trackArrayState, setTrackArrayState] = useState([])
  const [refreshTrackState, setRefreshTrackState] = useState(1)
  const [organiseByState, setOrganiseByState] = useState("id")

  useEffect(() => {
    const token = window.localStorage.getItem('auth_token');

    if (organiseByState === "id") {

    const getUserTracks = async () => {
      const response = await fetch(`${API_URL}/tracks/user/${currentUser.id}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorizaion": `Bearer ${token}` }
      })
      if (!response.ok) { console.log("error in getUserTracks") }
      else {
        const json = await response.json();
        setTrackArrayState(json.reverse());
        props.setTrackArrayLengthState(json.length)
      }
    }
    getUserTracks();

    } else if (organiseByState === "trackartist") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackartist/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackrating") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackrating/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackname") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackname/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackgenre") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackgenre/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    } else if (organiseByState === "tracktime") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/tracktime/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    } else if (organiseByState === "date") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/date/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    } else if (organiseByState === "trackalbum") {

      const getUserTracks = async () => {
        const response = await fetch(`${API_URL}/tracks/user/trackalbum/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
          setTrackArrayState(json);
          props.setTrackArrayLengthState(json.length);
        }
      }
      getUserTracks();

    }
    
  }, [currentUser, refreshTrackState, props.pl2TrackRefreshState, organiseByState])
// -----------------------------------------------------
// ---------------Update-Track-Rating--------------------
function updateTrackRating(e) {
  const inputRating = e.target.firstChild.value;
  const trackId = e.target.name
  const newRating = async () => {
    const trackData = { id: trackId, rating: inputRating}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_rating`, options)
    setRefreshTrackState(refreshTrackState + 1)
    props.setTrackEditState(false)
  }
  newRating();

}
// -----------------------------------------------------
// ---------------Update-Track-Name--------------------
function updateTrackName(e) {
  const inputName = e.target.firstChild.value;
  const trackId = e.target.name
  const newTrackName = async () => {
    const trackData = { id: trackId, rating: inputName}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_name`, options)
    setRefreshTrackState(refreshTrackState + 1)
    props.setTrackEditState(false)
  }
  newTrackName();
}
// -----------------------------------------------------
// ---------------Update-Artist-Name--------------------

  function updateTrackArtistName(e) {

    const newName = e.target.firstChild.value;
    const key = e.target.name
    const newTrack = async () => {
      const trackData = { id: key, name: newName}
      console.log("trackData======>",trackData)
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/artist_name`, options)
      setRefreshTrackState(refreshTrackState + 1)
      props.setTrackEditState(false)
    }
    newTrack();
  }
// ------------------------------------------------------
// ---------------Update-Artist-Name--------------------

function updateTrackAlbumName(e) {

  const newName = e.target.firstChild.value;
  const key = e.target.name
  const newTrack = async () => {
    const trackData = { id: key, albumname: newName}
    console.log("trackData======>",trackData)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/album_name`, options)
    setRefreshTrackState(refreshTrackState + 1)
    props.setTrackEditState(false)
  }
  newTrack();
}
// ------------------------------------------------------
// ---------------Update-Track-Genre--------------------

function updateTrackGenre(e) {

  const newName = e.target.firstChild.value;
  const key = e.target.name
  const newTrack = async () => {
    const trackData = { id: key, genre: newName}
    console.log("trackData======>",trackData)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/genre`, options)
    setRefreshTrackState(refreshTrackState + 1)
    props.setTrackEditState(false)
  }
  newTrack();
}
// ------------------------------------------------------
// ---------------Delete-Track-------------------------
  function deleteTrack(trackId){
    const trackData = {id: trackId}
    const options = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(trackData)
    }
    fetch(`${API_URL}/tracks/delete`, options)
    setRefreshTrackState(refreshTrackState + 1)
    props.setTrackEditState(false)
  }
// ----------------------------------------------------
// ---------Convert-to-standard-time---------
function toStandardTime(militaryTime) {
  let first = militaryTime.slice(0,3);
  let last = militaryTime.slice(3);
  let amPm = " am"
  if (Number.parseInt(first) > 12){
    first = Number.parseInt(first) - 12;
    amPm = " pm";
  }
  return `${first}:` + last + amPm;
}
// -------------------------------------------
// --------------Upload-State------------------
  const [uploadModalState, setUploadModalState] = useState("no-modal");
  // const [uploadModalState, setUploadModalState] = useState("upload-modal"); 
  const [trackLocationState, setTrackLocationState] = useState();
//  ---------------------------------------------
  

  return(
    <>{uploadModalState === "upload-modal" ? <UploadModal refreshTrackState={refreshTrackState} setRefreshTrackState={setRefreshTrackState} uploadModalState={uploadModalState} setUploadModalState={setUploadModalState} setTrackLocationState={setTrackLocationState} trackLocationState={trackLocationState}/> : ""}
  
    <div id={"pl2-playlist-border"}>
      <div id={"pl2-playlist-c"} >
        <div id={"pl2-playlist-c__top-c"}>
          <div id={"pl2-playlist-c__top-c__rating"}><h2 onClick={()=>{setOrganiseByState("trackrating")}}>Rating</h2></div>
          <div id={"pl2-playlist-c__top-c__name"}  >
            <UploadingTrackPl2 refreshTrackState={refreshTrackState} setRefreshTrackState={setRefreshTrackState} setUploadModalState={setUploadModalState} setTrackLocationState={setTrackLocationState}/>
            <div id={"pl2-playlist-name-c"} >
              <h2 onClick={()=>{setOrganiseByState("trackname")}}>Name</h2>
            </div> 
            <img className={`pl2-tracklist-edit-pen ${props.trackEditState ? "pl2-pen--on":""}`} src={pen} alt={""} onClick={toggleTrackEditState} />
          </div>
          <div id={"pl2-playlist-c__top-c__artist-name"}><h2 onClick={()=>{setOrganiseByState("trackartist")}}>Artist</h2></div>
          <div id={"pl2-playlist-c__top-c__album-name"}><h2 onClick={()=>{setOrganiseByState("trackalbum")}}>Album</h2></div>
          <div id={"pl2-playlist-c__top-c__artist-duration"}><h2 onClick={()=>{setOrganiseByState("tracktime")}}>Time</h2></div>
          <div id={"pl2-playlist-c__top-c__genre-name"}><h2 onClick={()=>{setOrganiseByState("trackgenre")}}>Genre</h2></div>
          <div id={"pl2-playlist-c__top-c__date"}><h2 onClick={()=>{setOrganiseByState("date")}}>Date</h2></div>
        </div>
        <ul id={"pl2-track-ul"}>
        {trackArrayState ? trackArrayState.map((audio, index) => {
            return (
              <li name={index} className={"pl2-track-ul__li"} key={index} >
                <div id={`nti${index}`} className={`next-track-info audioId${audio.id}`}>{`{"tracklocation":"${audio.tracklocation}","trackname":"${audio.trackname}","audioId":"${audio.id}", "trackartist":"${audio.trackartist}", "trackart":"${audio.trackart}"}`}</div> 
                <div className={`pl2-track-ul__li__rating ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                {props.trackEditState ? 
                  <>
                    <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackRating(e)}}> 
                      <input 
                        type={"text"}
                        id={"pl2-track-genre-input"} 
                        maxLength={100} 
                        placeholder={audio.trackrating ? audio.trackrating : ""} 
                      />
                      <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                    </form> 
                  </> :
                  <span className={"pl2-track-artist-rating-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}}>{audio.trackrating ? audio.trackrating : ""} </span>
                  
                }
                </div>

                <div className={`pl2-track-ul__li__name ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                  {props.trackEditState ? 
                  <>
                    <form className={"pl2-tracklist-form"} name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackName(e)}}> 
                      <input 
                        type={"text"}
                        className={"pl2-track-input"} 
                        maxLength={100} 
                        placeholder={audio.trackname ? audio.trackname : ""} 
                        // value={audio.trackname ? audio.trackname : ""} 
                      />
                      <input className={"pl2-track-artist-name-submit"} type={"submit"}  />
                    </form>
                    <img name={audio.id} className={"pl2-deleteX"} src={deleteX} alt={""} onClick={e=>{deleteTrack(e.target.name)}}/>
                  </> :
                  <span className={"pl2-track-artist-name-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackname ? audio.trackname : ""} </span>

                  }
                  </div>

                <div className={`pl2-track-ul__li__artist ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                {props.trackEditState ? 
                  <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackArtistName(e)}}> 
                    <input 
                      type={"text"}
                      className={"pl2-track-input"} 
                      maxLength={100} 
                      placeholder={audio.trackartist ? audio.trackartist : ""} 
                    />
                    <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                  </form> :
                  <span className={"pl2-track-artist-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackartist ? audio.trackartist : ""} </span>
                }
                </div>

                <div className={`pl2-track-ul__li__album ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                {props.trackEditState ? 
                  <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackAlbumName(e)}}> 
                    <input 
                      type={"text"}
                      className={"pl2-track-input"} 
                      maxLength={100} 
                      placeholder={audio.trackalbum ? audio.trackalbum : ""} 
                    />
                    <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                  </form> :
                  <span className={"pl2-track-artist-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackalbum ? audio.trackalbum : ""} </span>
                }
                </div>

                <div className={`pl2-track-ul__li__duration ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}><span>{audio.tracktime ? audio.tracktime : ""}</span></div>

                <div className={`pl2-track-ul__li__genre ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                {props.trackEditState ? 
                  <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackGenre(e)}}> 
                    <input 
                      type={"text"}
                      className={"pl2-track-input"} 
                      maxLength={100} 
                      placeholder={audio.trackgenre ? audio.trackgenre: ""} 
                    />
                    <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                  </form> :
                  <span className={"pl2-track-genre-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackgenre ? audio.trackgenre: ""} </span>
                }
                </div>

                <div className={`pl2-track-ul__li__date ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                  <span className={"pl2-track-genre-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.created_date ? audio.created_date.slice(5, 16)+ " " + toStandardTime(audio.created_date.slice(16, 22)) : ""} </span>
                </div>

              </li>)  
          }): null}
        </ul>
      </div>
    </div>
    </>
  )
}
export default Tracklist2;

import React, {useEffect, useState} from 'react';

import { API_URL } from '../config';

import pen from '../images/pen.png';
import deleteX from '../images/deleteX.png';
import UploadModal from './UploadModal';
import UploadingTrackPl2 from './UploadingTrackPl2';
// import plusSign from '../images/plusSign.png';
import plusSign from '../images/plusSing2.png';
import TrackRatingModal from './TrackRatingModal';



const Tracklist2 = (props) => {
  // ----------Toggle-Track-Edit-----------
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
const getUserTracks = async (path) => {
  const token = window.localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/tracks/user/${path}/${currentUser.id}`, {
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

const getUserTracksReverse = async (path) => {
  const token = window.localStorage.getItem('auth_token');
  const response = await fetch(`${API_URL}/tracks/user/${path}/${currentUser.id}`, {
    method: "GET",
    mode: "cors",
    headers: { "Authorizaion": `Bearer ${token}` }
  })
  if (!response.ok) { console.log("error iiiiiin getUserTracks") }
  else {
    const json = await response.json();
    setTrackArrayState(json.reverse());
    props.setTrackArrayLengthState(json.length);
  }
}




  const [trackArrayState, setTrackArrayState] = useState([])
  // const [refreshTrackState, setRefreshTrackState] = useState(1)
  const [organiseByState, setOrganiseByState] = useState({1:"date", 2:"", 3:false})

  function organise(string){
    const prev = organiseByState[1];
    if (organiseByState[3] === true) {
      setOrganiseByState({1:string, 2:"", 3:false});
    } else {
      if (prev === string) {
        setOrganiseByState({1:string, 2:prev, 3:true})
      } else if (prev !== string){
        setOrganiseByState({1:string, 2:prev, 3:false})
      }
    }

  }

  useEffect(() => {

    if (organiseByState[1] === "id") {
      getUserTracks("date");

    } else if (organiseByState[1] === "trackartist") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("trackartist")
      } else {
        getUserTracks("trackartist");
      }

    } else if (organiseByState[1] === "trackrating") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("trackrating")
      } else {
        getUserTracks("trackrating");
      }

    } else if (organiseByState[1] === "trackname") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("trackname")
      } else {
        getUserTracks("trackname");
      }

    } else if (organiseByState[1] === "trackgenre") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("trackgenre")
      } else {
        getUserTracks("trackgenre");
      }

    } else if (organiseByState[1] === "tracktime") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("tracktime")
      } else {
        getUserTracks("tracktime");
      }

    } else if (organiseByState[1] === "date") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("date")
      } else {
        getUserTracks("date");
      }

    } else if (organiseByState[1] === "trackalbum") {
      if (organiseByState[1] === organiseByState[2]){
        getUserTracksReverse("trackalbum")
      } else {
        getUserTracks("trackalbum");
      }

    }
    
  }, [currentUser, props.refreshTrackState, organiseByState])
// ------------------------------------------------------
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
    setTrackRatingModalState(false)
    setTimeout(() => {
      props.setRefreshTrackState(props.refreshTrackState + 1)
    }, 100);
    
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
    props.setRefreshTrackState(props.refreshTrackState + 1)
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
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/tracks/artist_name`, options)
      props.setRefreshTrackState(props.refreshTrackState + 1)
      props.setTrackEditState(false)
    }
    newTrack();
  }
// ------------------------------------------------------
// ---------------Update-Album-Name--------------------

function updateTrackAlbumName(e) {

  const newName = e.target.firstChild.value;
  const key = e.target.name
  const newTrack = async () => {
    const trackData = { id: key, albumname: newName}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/album_name`, options)
    props.setRefreshTrackState(props.refreshTrackState + 1)
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
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/genre`, options)
    props.setRefreshTrackState(props.refreshTrackState + 1)
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
    props.setRefreshTrackState(props.refreshTrackState + 1)
    props.setTrackEditState(false)
  }
// ----------------------------------------------------
// --------------Add-To-Playlist-Function--------------
  
  function addToPlaylistFunc(trackId){
    const playlistAndTrackData = {track_id: `${trackId}`, playlist_id: `${props.playlistIdRef.current.playlistId}`}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playlistAndTrackData),
    }
    fetch(`${API_URL}/playlists/list/post`, options)
    props.setRefreshTrackState(props.refreshTrackState + 7);
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
// -----------set-Playlist-Id-Array--------------
  const [playlistIdState, setPlaylistIdState] = useState([]);

  useEffect(() => {
    const playlistIdArray = [];

    if (props.selectedPlaylistState) {
      props.selectedPlaylistState.forEach(track => {
        playlistIdArray.push(track.id)
      })
      setPlaylistIdState(playlistIdArray);
    }
    
  }, [props.selectedPlaylistState])
// ----------------------------------------------
  const [trackRatingModalState, setTrackRatingModalState] = useState(false);
  const [ratingAudioState, setRatingAudioState] = useState();
  function launchTrackRatingModal(audio){
    setTrackRatingModalState(true)
    setRatingAudioState(audio)
  }
  

  return(
    <>
    {props.uploadModalState === "upload-modal" ? <UploadModal currentUser={currentUser} refreshTrackState={props.refreshTrackState} setRefreshTrackState={props.setRefreshTrackState} uploadModalState={props.uploadModalState} setUploadModalState={props.setUploadModalState} setTrackLocationState={props.setTrackLocationState} trackLocationState={props.trackLocationState}/> : ""}
    { trackRatingModalState ? <TrackRatingModal updateTrackRating={updateTrackRating} ratingAudioState={ratingAudioState}  setTrackRatingModalState={setTrackRatingModalState}/> : null}
    <div id={"pl2-playlist-border"}>
      <div id={"pl2-playlist-c"} >
        <div id={"pl2-playlist-c__top-c"}>
          <div id={"pl2-playlist-c__top-c__rating"}><h2 onClick={()=>{organise("trackrating")}}>Rating</h2></div>
          <div id={"pl2-playlist-c__top-c__name"}  >
            <div id={"pl2-uploading-track-visibility"} className={`${props.addToPlaylistState ? "hidden" : "visible"}`} >
              <UploadingTrackPl2  refreshTrackState={props.refreshTrackState} setRefreshTrackState={props.setRefreshTrackState} setUploadModalState={props.setUploadModalState} setTrackLocationState={props.setTrackLocationState}/>
            </div>
            <div id={"pl2-playlist-name-c"} >
              <h2 onClick={()=>{organise("trackname")}}>Name</h2>
            </div> 
            <img className={`pl2-tracklist-edit-pen ${props.trackEditState ? "pl2-pen--on":""} ${props.addToPlaylistState ? "hidden" : "visible"}`} src={pen} alt={""} onClick={toggleTrackEditState} />
          </div>
          <div id={"pl2-playlist-c__top-c__artist-name"}><h2 onClick={()=>{organise("trackartist")}}>Artist</h2></div>
          <div id={"pl2-playlist-c__top-c__album-name"}><h2 onClick={()=>{organise("trackalbum")}}>Album</h2></div>
          <div id={"pl2-playlist-c__top-c__artist-duration"}><h2 onClick={()=>{organise("tracktime")}}>Time</h2></div>
          <div id={"pl2-playlist-c__top-c__genre-name"}><h2 onClick={()=>{organise("trackgenre")}}>Genre</h2></div>
          <div id={"pl2-playlist-c__top-c__date"}><h2 onClick={()=>{organise("date")}}>Date</h2></div>
        </div>
        <div id={"pl2-track-ul-c"}>
          <ul id={"pl2-track-ul"}>
          {trackArrayState ? trackArrayState.map((audio, index) => {
              return (
                <li name={index} className={"pl2-track-ul__li"} key={index} >
                  <div id={`nti${index}`} className={`next-track-info audioId${audio.id}`}>{`{"tracklocation":"${audio.tracklocation}","trackname":"${audio.trackname}","audioId":"${audio.id}", "trackartist":"${audio.trackartist}", "trackart":"${audio.trackart}"}`}</div> 
                  <div className={`pl2-track-ul__li__rating ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                    <div className={"pl2-track-artist-rating__div"} onClick={()=>{launchTrackRatingModal(audio)}}>
                      <span className={"pl2-track-artist-rating-span"} >{audio.trackrating ? audio.trackrating : ""}</span>
                    </div>
                  </div>

                  <div className={`pl2-track-ul__li__name ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                  {props.addToPlaylistState 
                  && !playlistIdState.includes(audio.id) 
                  ? 
                      <img name={audio.id} className={"plus-sign"} src={plusSign} alt={""} onClick={e=>{addToPlaylistFunc(e.target.name)}} />
                    : null}
                    {props.trackEditState ? 
                    <>
                      <form className={"pl2-tracklist-form"} name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackName(e)}}> 
                        <input 
                          type={"text"}
                          className={"pl2-track-input"} 
                          maxLength={100} 
                          placeholder={audio.trackname ? audio.trackname : ""} 
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
    </div>
    </>
  )
}
export default Tracklist2;

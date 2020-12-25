import React, {useState, useEffect, useMemo} from 'react';
import { API_URL } from '../config';
import NewPlaylistModal from './NewPlaylistModal';
import vintageMic from "../images/vintageMic.png"
import noteFloat from "../images/noteFloat.png"
import vinylRecord from "../images/vinylRecord.png"
import circlePlusHollow from "../images/circlePlusHollow.png"

const Pl2LeftColumn = (props) => {
   const [artistAlbumSongState, setArtistAlbumSongState] = useState("selected-song")
  // -----------------Playlist-Modal----------------------
  const [playlistModalState, setPlaylistModalState] = useState(false);
  function toggleModal(){
    setPlaylistModalState(!playlistModalState)
  }
  // -----------------------------------------------------
  console.log("pl2LeftColumn Rendered")
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
    console.log("user==Pl2LeftColumn=====>", currentUser.id)
  }, [])
// ----------------------------------------------
  //  // ----------------Get-Playlists------------------------
  //  const [playlistState, setPlaylistState] = useState();
   
 
  //  useEffect(() => {
   
  //    const getCurrentUserPlaylists = async () => {
  //      const token = window.localStorage.getItem('auth_token')
  //      const response = await fetch(`${API_URL}/playlists/${currentUser.id}`, {
  //        method: "GET",
  //        mode: "cors",
  //        headers: { "Authorization": `Bearer ${token}` },
  //      })
  //      if (!response.ok) {
  //        console.log("getCurrentUserPlaylists failed in Pl2LeftColumn.js");
  //      } else {
  //        const json = await response.json();
  //        setPlaylistState(json);
  //        console.log("getCurrentUserPlaylists json", json)
        
  //      }
  //    }
  //    getCurrentUserPlaylists();
  //  },[currentUser, props.refreshPlaylistState])
  //  // -----------------------------------------------------

   async function setPlaylistIdRef(id) {
    let name = "";
    if (props.playlistState.length > 0){
      async function inner(){
        for (let i = 0; i < props.playlistState.length; i ++ ) {
          let el = props.playlistState[i];
          if (el.id === id){
            name = el.playlist_name
          }
        }
        
    }
    inner();
    }
    
    props.playlistIdRef.current = {playlistId: id, playlistName: name};

    props.setRefreshTrackState(props.refreshTrackState + 7);
    
  }
  //  --------Memoize-Playlist-Radio-Buttons----------------------
  // const playlistRadios = useMemo(()=>{
  //   return (
  //     props.playlistState ?
  //     props.playlistState.map((playlist, index)=> {
  //       return(
  //         <div className={"playlist-radio-c"} onClick={()=>{setPlaylistIdRef(playlist.id)}}>
  //           <input type="radio" className={"playlist-radio"}  id={playlist.playlist_name} name="playlist-radio" value={playlist.playlist_name} checked />
  //           <label className={"playlist-radio-label"} htmlFor={playlist.playlist_name}>{playlist.playlist_name}</label>
  //         </div>
  //       )
  //   }): null
  //   )
  // }, [props.playlistState, props.refreshPlaylistState, props.playlistIdRef])

//  -------------------------------------------------------
  const [queryState, setQueryState] = useState();
  async function setQ(val) {
    const token = window.localStorage.getItem('auth_token')
    const params = JSON.stringify({id: currentUser.id, val: val})
    const response = await fetch(`${API_URL}/tracks/search/${params}`, {
      method: "GET",
      mode: "cors",
      headers: {"Authorization": `Bearer ${token}`},
    })
    if (!response.ok) {
      console.log("setQ failed in Pl2LeftColumn.js");
    } else {
      const json = await response.json();
      setQueryState(json);
    }
  }
  

  return (
    <>
      {playlistModalState ? <NewPlaylistModal toggleModal={toggleModal} currentUser={currentUser} setRefreshPlaylistState={props.setRefreshPlaylistState} refreshPlaylistState={props.refreshPlaylistState} /> : null}
        <div id={"pl2-left-column"}>
          <div id={"pl2-search"}>
            <input id={"pl2-search__input"} type={"text"} placeholder={"search"}
            onChange={(e) => setQ(e.target.value)}
            ></input>

            < div className={"searching"}>{queryState ? queryState.map((str)=> {
              return (<span>{`${str} `}</span>)
            }) : "nothing"}</div>
          </div>
            <div id={"pl2-left-column__scroll-outer"}>
              <div id={"pl2-left-column__scroll-inner"} >
              <div className={`${artistAlbumSongState === "selected-artist" ? "selected-artist" : ""} select-artist`} onClick={(()=>{setArtistAlbumSongState("selected-artist")})}>
                <img className={"selectIcon"} src={vintageMic} alt={""} />
                <span>Artist</span>
              </div>
              <div className={`${artistAlbumSongState === "selected-album" ? "selected-album" : ""} select-album`} onClick={(()=>{setArtistAlbumSongState("selected-album")})}>
                <img className={"selectIcon"} src={vinylRecord} alt={""} />
                <span>Album</span>
              </div>
              <div className={`${artistAlbumSongState === "selected-song" ? "selected-song" : ""} select-song`} onClick={(()=>{setArtistAlbumSongState("selected-song"); props.showTracklist() })}>
                <img className={"selectIcon"} src={noteFloat} alt={""}  />
                <span>Song</span>
              </div>
              <div className={`add-to-playlist ${props.addToPlaylistState ? "add-to-playlist--on" : ""}`} onClick={props.toggleAddToPlaylist}>
                <span>Add Track To</span> 
                <span>Playlist</span> 
                <div className={"left-playlist-add"} >
                </div>
              </div>
              <div className={`left-playlist ${props.addToPlaylistState ? "hidden" : "visible"}`}>
                <span>Playlist</span> 
                <div className={"left-playlist-add"} onClick={toggleModal} >
                  <img src={circlePlusHollow} alt={""} />
                </div>
              </div>
              <div className={`${props.addToPlaylistState ? "visible" : "hidden"}`}>
                { props.playlistState ?
                  props.playlistState.map((playlist, index)=> {
                    return(
                      <div className={`${props.playlistIdRef.current.playlistId === playlist.id ? "playlist-highlight" : "" } playlist-button-c`} onClick={()=>{setPlaylistIdRef(playlist.id)}}>
                        {/* <input type="button" className={"playlist-radio"}  id={playlist.playlist_name} name="playlist-radio" value={playlist.playlist_name} checked /> */}
                        <span >{playlist.playlist_name}</span>
                      </div>
                    )
                }): null}
              </div>
              <div className={`${props.addToPlaylistState ? "hidden" : "visible"}`}>
                {props.playlistState ? 
                  props.playlistState.map((playlist, index) => {
                    return (
                      <div key={index} className={"left-playlist-name"} onClick={()=>{props.showPlaylist(playlist.playlist_name, playlist.id)}} >
                        <span>{playlist.playlist_name}</span>
                      </div>
                    )
                  })
                : null}
              </div>
              <div id={"left-playlist-bottom-space"} ></div>
            </div>
          </div>
        </div>
    </>
  )
}
export default Pl2LeftColumn;
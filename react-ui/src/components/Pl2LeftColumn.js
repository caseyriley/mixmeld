import React, {useState, useEffect, useMemo} from 'react';
import { API_URL } from '../config';
import NewPlaylistModal from './NewPlaylistModal';
import vintageMic from "../images/vintageMic.png"
import noteFloat from "../images/noteFloat.png"
import vinylRecord from "../images/vinylRecord.png"
import circlePlusHollow from "../images/circlePlusHollow.png"

const Pl2LeftColumn = (props) => {
  //  const [artistAlbumSongState, setArtistAlbumSongState] = useState("selected-song")
  // -----------------Playlist-Modal----------------------
  const [playlistModalState, setPlaylistModalState] = useState(false);
  function toggleModal(){
    setPlaylistModalState(!playlistModalState)
  }
  // -----------------------------------------------------
  console.log("pl2LeftColumn Rendered")
  //---------Get-Current_User--------------
  // const [currentUser, setCurrentUser] = useState({});

  // useEffect(() => {

  //   const getCurrentUser = async () => {
  //     const token = window.localStorage.getItem('auth_token')
  //     const response = await fetch(`${API_URL}/users/token`, {
  //       method: "GET",
  //       mode: "cors",
  //       headers: { "Authorization": `Bearer ${token}` },
  //     })
  //     if (!response.ok) {
  //       console.log("getCurrent user response failed in Uploading.js");
  //     } else {
  //       const json = await response.json();
  //       setCurrentUser(json);
        
  //     }
  //   }
  //   getCurrentUser();
  //   console.log("user==Pl2LeftColumn=====>", currentUser.id)
  // }, [])
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

  async function setQ(val) {
    if (val.length > 0) {
      const token = window.localStorage.getItem('auth_token')
      const params = JSON.stringify({id: props.currentUser.id, val: val})
      const response = await fetch(`${API_URL}/tracks/search/${params}`, {
        method: "GET",
        mode: "cors",
        headers: {"Authorization": `Bearer ${token}`},
      })
      if (!response.ok) {
        console.log("setQ failed in Pl2LeftColumn.js");
      } else {
        const json = await response.json();
        props.setQueryState(json);
        props.setPlaylistSwitchState("SearchTracklist2")
      }
    } else {
      props.setQueryState("");
      props.setPlaylistSwitchState("Tracklist2")
    }
   
  }

  function selectFirstPlaylist(){
    const firstPlaylist = document.getElementsByClassName("playlist-button-c")
    console.log("firstPlaylist", firstPlaylist)
    console.log("firstPlaylist[0].name", firstPlaylist[0].getAttribute("name"))
    setPlaylistIdRef(Number(firstPlaylist[0].getAttribute("name")))
  }
  

  return (
    <>
      {playlistModalState ? <NewPlaylistModal toggleModal={toggleModal} currentUser={props.currentUser} setRefreshPlaylistState={props.setRefreshPlaylistState} refreshPlaylistState={props.refreshPlaylistState} /> : null}
        <div id={"pl2-left-column"}>
          <div id={"pl2-search"}>
            <input id={"pl2-search__input"} type={"text"} placeholder={"search"}
            onChange={(e) => setQ(e.target.value)}
            ></input>

          </div>
            <div id={"pl2-left-column__scroll-outer"}>
              <div id={"pl2-left-column__scroll-inner"} >
              <div className={`${props.artistAlbumSongState === "selected-artist" ? "selected-artist" : ""} select-artist`} onClick={(()=>{props.setArtistAlbumSongState("selected-artist"); props.showPl2ArtistPage()})}>
                <img className={"selectIcon"} src={vintageMic} alt={""} />
                <span>Artists</span>
              </div>
              <div className={`${props.artistAlbumSongState === "selected-album" ? "selected-album" : ""} select-album`} onClick={()=>{props.setArtistAlbumSongState("selected-album"); props.showPl2AlbumPage()}}>
                <img className={"selectIcon"} src={vinylRecord} alt={""} />
                <span>Albums</span>
              </div>
              <div className={`${props.artistAlbumSongState === "selected-song" ? "selected-song" : ""} select-song`} onClick={()=>{props.setArtistAlbumSongState("selected-song"); props.showTracklist() }}>
                <img className={"selectIcon"} src={noteFloat} alt={""}  />
                <span>Tracks</span>
              </div>
              <div className={`add-to-playlist ${props.addToPlaylistState ? "add-to-playlist--on" : ""}`} onClick={()=>{props.toggleAddToPlaylist(); selectFirstPlaylist()}}>
                <span>Add Tracks To</span> 
                <span>Playlist</span> 
                <div className={"left-playlist-add"} ></div>
              </div>
              <div className={`left-playlist ${props.addToPlaylistState ? "hidden" : "visible"}`}>
                <span>Playlist</span> 
                <div className={"left-playlist-add"} onClick={toggleModal} >
                  <img src={circlePlusHollow} alt={""} />
                </div>
              </div>
              <div className={`left-playlist-inst ${props.addToPlaylistState ? "visible" : "hidden"}`}>
                <span>select a playlist below then add tracks by clicking the  
                  <img class={"left-playlist-inst-add"} src={circlePlusHollow} alt={""} />
                  icon.
                </span> 
              </div>
              <div className={`${props.addToPlaylistState ? "visible" : "hidden"}`}>
                { props.playlistState ?
                  props.playlistState.map((playlist, index)=> {
                    return(
                      <div name={`${playlist.id}`} className={`${props.playlistIdRef.current.playlistId === playlist.id ? "playlist-highlight" : "" } playlist-button-c`} onClick={()=>{setPlaylistIdRef(playlist.id)}}>
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
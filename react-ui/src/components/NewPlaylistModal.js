import React from 'react';
import ReactDom from 'react-dom';
import { API_URL } from '../config';

const NewPlaylistModal = (props) => {

  function postNewPlaylist(e) {
   
    const newPlaylist = async () => {
  
      const playlist_name = e.target.playlist_name.value
     
      const trackData = { playlist_name: playlist_name, user_id: props.currentUser.id}
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trackData),
      }
      fetch(`${API_URL}/playlists/post`, options)
      props.toggleModal();
      let prevRefreshPlaylistState = props.refreshPlaylistState;
      props.setRefreshPlaylistState(prevRefreshPlaylistState + 5);
      
    }
    newPlaylist();
  }

  return ReactDom.createPortal(
    <>
    
    <div id={"new-playlist-modal-background"} onClick={props.toggleModal} ></div>
    <div id={"new-playlist-modal-c"} >  
      <span id={"new-playlist-modal-title"}>New Playlist</span>
      <form id={"new-playlist-form"} onSubmit={e => {e.preventDefault(); postNewPlaylist(e)}} >
        <label for={"new-playlist-form__name"} >Name</label>
        <input 
            name={"playlist_name"}
            type={"text"}
            id={"new-playlist-form__name"} 
            maxLength={100} 
            placeholder={""} 
            required
        />
        <input id={"new-playlist-submit"} type={"submit"}  />
      </form>                                            
    </div>
    
    </>
    , document.getElementById("new-playlist-modal-portal")
  )
}
export default NewPlaylistModal
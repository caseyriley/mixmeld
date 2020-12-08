import React from 'react';
import ReactDom from 'react-dom';

const NewPlaylistModal = (props) => {
  return ReactDom.createPortal(
    <div id={"new-playlist-modal-background"} onClick={props.toggleModal} >
    </div>
    , document.getElementById("new-playlist-modal-portal")
  )
}
export default NewPlaylistModal
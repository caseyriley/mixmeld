import React from 'react';
import Playlist2 from './Playlist2';
import Tracklist2 from './Tracklist2';

const PlaylistSwitch = (props)=>{
  
  return (
    <>
      {(()=>{
        switch(props.playlistSwitchState ? props.playlistSwitchState : "Tracklist2") {
          case "Tracklist2":
            return (
              <Tracklist2 playlistIdRef={props.playlistIdRef} addToPlaylistState={props.addToPlaylistState}  pl2TrackRefreshState={props.pl2TrackRefreshState} trackEditState={props.trackEditState} setTrackEditState={props.setTrackEditState} setTrack={props.setTrack} setTrackArrayLengthState={props.setTrackArrayLengthState}/>
            )
          case "Playlist2":
            return (
              <Playlist2 refreshPlaylistState={props.refreshPlaylistState} setRefreshPlaylistState={props.setRefreshPlaylistState} trackArtState={props.trackArtState} setTrack={props.setTrack} playlistIdRef={props.playlistIdRef} currentUser={props.currentUser} />
            )
          default: 
            return (
              <div></div>
              )
        }
      })()}
     
    </>
  )
}
export default PlaylistSwitch;
import React from 'react';
import Playlist2 from './Playlist2';
import SearchTracklist2 from './SearchTracklist2';
import Tracklist2 from './Tracklist2';

const PlaylistSwitch = (props)=>{
  
  return (
    <>
      {(()=>{
        switch(props.playlistSwitchState ? props.playlistSwitchState : "Tracklist2") {
          case "Tracklist2":
            return (
              <Tracklist2 refreshTrackState={props.refreshTrackState} setRefreshTrackState={props.setRefreshTrackState} 
              selectedPlaylistState={props.selectedPlaylistState} playlistState={props.playlistState} 
              playlistIdRef={props.playlistIdRef} addToPlaylistState={props.addToPlaylistState} 
              trackEditState={props.trackEditState} setTrackEditState={props.setTrackEditState} 
              setTrack={props.setTrack} setTrackArrayLengthState={props.setTrackArrayLengthState}/>
            )
          case "Playlist2":
            return (
              <Playlist2 selectedPlaylistState={props.selectedPlaylistState} 
              playlistState={props.playlistState} refreshPlaylistState={props.refreshPlaylistState} 
              setRefreshPlaylistState={props.setRefreshPlaylistState} trackArtState={props.trackArtState} setTrack={props.setTrack} playlistIdRef={props.playlistIdRef} currentUser={props.currentUser} />
            )
          case "SearchTracklist2":
            return (
              <SearchTracklist2 queryState={props.queryState}/>
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
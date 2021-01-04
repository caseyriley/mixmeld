import React from 'react';
import Pl2AlbumPage from './Pl2AlbumPage';
import Pl2ArtistsPage from './Pl2ArtistsPage';
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
              setTrack={props.setTrack} setTrackArrayLengthState={props.setTrackArrayLengthState}
              uploadModalState={props.uploadModalState} setUploadModalState={props.setUploadModalState} 
              trackLocationState={props.trackLocationState} 
              setTrackLocationState={props.setTrackLocationState}/>
            )
          case "Playlist2":
            return (
              <Playlist2 selectedPlaylistState={props.selectedPlaylistState} 
              playlistState={props.playlistState} refreshPlaylistState={props.refreshPlaylistState} 
              setRefreshPlaylistState={props.setRefreshPlaylistState} trackArtState={props.trackArtState} 
              setTrack={props.setTrack} playlistIdRef={props.playlistIdRef} currentUser={props.currentUser} 
              setTrackArrayLengthState={props.setTrackArrayLengthState}/>
            )
          case "SearchTracklist2":
            return (
              <div id={"pl2-search-position"}>
                <SearchTracklist2 queryState={props.queryState} setTrackViaSearch={props.setTrackViaSearch}
                scrollToThis={props.scrollToThis} scrollToThis2={props.scrollToThis2}
                scrollToThis3={props.scrollToThis3} 
                scrollToTargetAdjusted={props.scrollToTargetAdjusted}/>
                <Tracklist2 refreshTrackState={props.refreshTrackState} setRefreshTrackState={props.setRefreshTrackState} 
                selectedPlaylistState={props.selectedPlaylistState} playlistState={props.playlistState} 
                playlistIdRef={props.playlistIdRef} addToPlaylistState={props.addToPlaylistState} 
                trackEditState={props.trackEditState} setTrackEditState={props.setTrackEditState} 
                setTrack={props.setTrack} setTrackArrayLengthState={props.setTrackArrayLengthState}
                />
              </div>
            )
          case "Pl2AlbumPage":
            return (
              <Pl2AlbumPage currentUser={props.currentUser} setTrackArrayLengthState={props.setTrackArrayLengthState}
              setTrack={props.setTrack}/>
            )
          case "Pl2ArtistPage":
            return (
              <Pl2ArtistsPage setTrack={props.setTrack} currentUser={props.currentUser}
              setTrackArrayLengthState={props.setTrackArrayLengthState}/>
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
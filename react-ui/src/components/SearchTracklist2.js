import React from 'react';

const SearchTracklist2 = (props) => {

  return (
    <div id={"pl2-search-c"}>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Track Name</h1>
        </div>
        {props.queryState ? props.queryState[0].map(track => {
          return (
            <div>
              <span onClick={()=>{props.setTrackViaSearch(track.tracklocation, track.trackname, track.trackartist, track.id, track.trackart, "Tracklist2")}}>{track["trackname"]}</span>
            </div> 
          )     
        })
        : null}
      </div>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Artist Name</h1>
        </div>
        {props.queryState ? props.queryState[1].map(track => {
          return (
            <div>
              <span onClick={()=>{props.setTrackViaSearch(track.tracklocation, track.trackname, track.trackartist, track.id, track.trackart, "Pl2ArtistPage")}}>{track["trackartist"]}</span>
            </div> 
          )
         
        })
        
        : null}
      </div>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Album Name</h1>
        </div>
        {props.queryState ? props.queryState[2].map(track => {
          return (
            <div>
              <span onClick={()=>{props.setTrackViaSearch(track.tracklocation, track.trackname, track.trackartist, track.id, track.trackart, "Pl2AlbumPage")}}>{track["trackalbum"]}</span>
            </div> 
          )
         
        })
        
        : null}
      </div>
    </div>
  )
}
export default SearchTracklist2;
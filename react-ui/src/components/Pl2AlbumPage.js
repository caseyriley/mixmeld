import React, { useEffect, useState, useRef} from 'react';
import { API_URL } from '../config';

const Pl2AlbumPage = (props) => {

  const [albumArrayState, setAlbumArrayState] = useState([])
  const idCount = useRef(-1);

  useEffect(()=> {
    idCount.current = -1;
  })

  useEffect(()=>{
    if (props.currentUser){
      const token = window.localStorage.getItem('auth_token');

      const getUserTracksByAlbum = async () => {
        const response = await fetch(`${API_URL}/tracks/user/albums/${props.currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { "Authorizaion": `Bearer ${token}` }
        })
        if (!response.ok) { console.log("error in getUserTracks") }
        else {
          const json = await response.json();
            setAlbumArrayState(json); 
            const trackArraylength = document.getElementsByClassName('next-track-info').length
            props.setTrackArrayLengthState(trackArraylength);
        }
      }
      getUserTracksByAlbum();
    }
  },[props.currentUser])

return (
  <div id={"pl2-album-page-c"} className={"fade-in"}>
    
    <div id={"pl2-album-page-top"}>
      <h1>Albums</h1>
    </div>
    {albumArrayState ? albumArrayState.map((album, kii) => {
      return (
        <div ke={kii} className={"pl2-album-c"}>
          <img src={album[0].trackart} alt="" ></img>
          <div className={"pl2-album-info-c"}>
            {/* <h2>{album[0].trackalbum}</h2> */}
            <h2 className={"pl2-artist-info-c__top__h2"}>{album[0].trackalbum.length > 30 ? `${album[0].trackalbum.slice(0,30)}...` : album[0].trackalbum}</h2>
            <h2 className={"pl2-artist-info-c__top__h2-450"}>{album[0].trackalbum.length > 15 ? `${album[0].trackalbum.slice(0,15)}...` : album[0].trackalbum}</h2>
            <h3 class={"pl2-album-artist"}>By {album[0].trackartist}</h3>
          <div className={"pl2-album-info-c__scroll"}>
            <div className={"pl2-album-info-c__scroll__inner"}>
            { album.map((track, index) => {
                  return (
                  
                    <div key={index}>
                      <div id={`nti${idCount.current += 1 }`} className={`next-track-info audioId${track.id}`}>{`{"tracklocation":"${track.tracklocation}","trackname":"${track.trackname}","audioId":"${track.id}", "trackartist":"${track.trackartist}", "trackart":"${track.trackart}"}`}</div> 
                      <h3 class={"pl2-album-track"} onClick={()=>{props.setTrack(track.tracklocation, track.trackname, track.trackartist, track.id, track.trackart)}}>{track.trackname}</h3>
                    </div>
                  
                  )
            })}
            </div>
          </div>

          </div>
        </div>
       
        
      )
    })
    : ""}
    <div id={"pl2-album-page-c"} ></div>
  </div>
)

}
export default Pl2AlbumPage;
import React, {useEffect, useState, useRef, useMemo} from 'react';
import { API_URL } from '../config';
import formlessMusicIcon from '../images/formless-music-icon.png'

const Pl2ArtistsPage = (props) => {

  const [artistArrayState, setArtistArrayState] = useState([])
  const idCount = useRef(-1);


  useEffect(()=>{

    const token = window.localStorage.getItem('auth_token');

    const getUserTracksByArtist = async () => {
      const response = await fetch(`${API_URL}/tracks/user/artists/${props.currentUser.id}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorizaion": `Bearer ${token}` }
      })
      if (!response.ok) { console.log("error in getUserTracks") }
      else {
        const json = await response.json();
  
          setArtistArrayState(json); 

          const trackArraylength = document.getElementsByClassName('next-track-info').length
          props.setTrackArrayLengthState(trackArraylength);

        console.log("artists=====>",json)
      }
    }
    getUserTracksByArtist();

  },[props.currentUser])

  const artistPage = useMemo(()=>{
    return (
      <>
      {artistArrayState[0] ? Object.keys(artistArrayState[0]).map((k, ki)=> {
        return(
          <div key={ki} id={"pl2-artist-c-main"}>
            <div id={"pl2-artist-page-top"}>
              <h1>{k}</h1>
            </div>
            {artistArrayState[0][k].map((album, kii) => {
              return (
                <div className={"pl2-artist-c"} key={10000 + kii}>
                  <img src={artistArrayState[1][album][0]["trackart"]} alt="" ></img>
                  <div className={"pl2-artist-info-c"}>
                    <div className={"pl2-artist-info-c__top"}>
                      <h2>{album}</h2>
                    </div>
                    {/* <h3 class={"pl2-album-artist"}>By {k}</h3> */}
                    <div className={"pl2-artist-info-c__scroll"}>
                      <div className={"pl2-artist-info-c__scroll__inner"}>
                      {artistArrayState[1][album].map((track, index) => {
                        return (
                          <div key={100000 + index} class={"pl2-artist-track-c"}>
                            <div id={`nti${idCount.current += 1 }`} className={`next-track-info audioId${track.id}`}>{`{"tracklocation":"${track.tracklocation}","trackname":"${track.trackname}","audioId":"${track.id}", "trackartist":"${track.trackartist}", "trackart":"${track.trackart}"}`}</div> 
                            <h3 class={"pl2-artist-track"} onClick={()=>{props.setTrack(track.tracklocation, track.trackname, track.trackartist, track.id, track.trackart)}}>{track.trackname}</h3>
                          </div>
                        )
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      
      }):null}
    </>
    )
  },[artistArrayState])

  return (
    <>
    <div id={"pl2-artist-page-c"}>
      {artistPage}
    </div>
    </>
  )
}
export default Pl2ArtistsPage;
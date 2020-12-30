import React, {useEffect, useState, useRef, useMemo} from 'react';
import { API_URL } from '../config';

const Pl2ArtistsPage = (props) => {

  const [artistArrayState, setArtistArrayState] = useState([])
  const idCount = useRef(0);


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
          <div key={ki}>
            <div id={"pl2-album-page-top"}>
              <h1>{k}</h1>
            </div>
            {artistArrayState[0][k].map((album, kii) => {
              return (
                <div className={"pl2-album-c"} key={kii + 10000}>
                  <img src={artistArrayState[1][album][0]["trackart"]} alt="" ></img>
                  <div className={"pl2-album-info-c"}>
                    <h2>{album}</h2>
                    {/* <h3 class={"pl2-album-artist"}>By {k}</h3> */}
                    {artistArrayState[1][album].map((track, index) => {
                      return (
                        <div key={index + 100000}>
                          <div id={`nti${idCount.current += 1 }`} className={`next-track-info audioId${track.id}`}>{`{"tracklocation":"${track.tracklocation}","trackname":"${track.trackname}","audioId":"${track.id}", "trackartist":"${track.trackartist}", "trackart":"${track.trackart}"}`}</div> 
                          {console.log("nnnnnttttttiiii ", idCount.current)}
                          <h3 class={"pl2-album-track"} onClick={()=>{props.setTrack(track.tracklocation, track.trackname, track.trackartist, track.id, track.trackart)}}>{track.trackname}</h3>
                        </div>
                      )
                    })}
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
    <div id={"pl2-album-page-c"}>
      {artistPage}
    </div>

  )
}
export default Pl2ArtistsPage;
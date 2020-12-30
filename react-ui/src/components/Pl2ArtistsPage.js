import React, {useEffect, useState} from 'react';
import { API_URL } from '../config';

const Pl2ArtistsPage = (props) => {

  const [artistArrayState, setArtistArrayState] = useState([])

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

  return (
    <div id={"pl2-album-page-c"}>
     {artistArrayState[0] ? Object.keys(artistArrayState[0]).map((k)=> {
       return(
          <>
            <div id={"pl2-album-page-top"}>
              <h1>{k}</h1>
            </div>
            {artistArrayState[0][k].map(album => {
              return (
                <div className={"pl2-album-c"}>
                  <img src={artistArrayState[1][album][0]["trackart"]} alt="" ></img>
                  <div className={"pl2-album-info-c"}>
                    <h2>{album}</h2>
                    {/* <h3 class={"pl2-album-artist"}>By {k}</h3> */}
                    {artistArrayState[1][album].map(track => {
                      return (
                        <h3 class={"pl2-album-track"}>{track.trackname}</h3>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </>
       )
      
     }):null}
    </div>


      /* {artistArrayState ? artistArrayState.map(artist => {
        return (
          <>
            <div id={"pl2-album-page-top"}>
              <h1>{artist[0].trackartist}</h1>
            </div>
            <div className={"pl2-album-c"}>
              <img src={artist[0].trackart} alt="" ></img>
              <div className={"pl2-album-info-c"}>
                <h2>{artist[0].trackalbum}</h2>
                <h3 class={"pl2-album-artist"}>By {artist[0].trackartist}</h3>
                { artist.map(track => {
                    return (
                      <>
                        
                        <h3 class={"pl2-album-track"}>{track.trackname}</h3>
                      </>
                    )
                })}
              </div>
            </div>
          </>
          
        )
      })
      : ""} */

  
  )
}
export default Pl2ArtistsPage;
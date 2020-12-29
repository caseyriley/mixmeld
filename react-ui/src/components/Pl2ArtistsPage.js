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
        // const artists = [];
        // async function sortByArtist(){
        //   let prevAlbum = "";
        //   let artist = [];
        //   for (let i = 0; i < json.length; i ++){
        //     const track = json[i];
        //     if (track["trackartist"]){
        //       if (prevAlbum === "") {
        //         artist.push(track);
        //         prevAlbum = track["trackartist"];
        //         console.log("hit 1");
        //         if (i === json.length -1){
        //           artists.push(artist)
        //         }
        //       } else if (prevAlbum === track["trackartist"]) {
        //         artist.push(track);
        //         console.log("hit 2");
        //         if (i === json.length -1){
        //           artists.push(artist)
        //         }
        //       } else if (prevAlbum !== track["trackalbum"]) {
        //         artists.push(artist);
        //         artist = [];
        //         artist.push(track);
        //         prevAlbum = track["trackartist"];
        //         console.log("hit 3");
        //         if (i === json.length -1){
        //           artists.push(artist)
        //         }
        //       }
        //     } else {
        //       console.log("nooooo track artist", track);
        //     }
        //   }
          setArtistArrayState(json); 
        // }
        // await sortByArtist()
        console.log("artists=====>",json)
      }
    }
    getUserTracksByArtist();

  },[props.currentUser])

  return (
    <div id={"pl2-album-page-c"}>
     

      {artistArrayState ? artistArrayState.map(artist => {
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
      : ""}

    </div>
  )
}
export default Pl2ArtistsPage;
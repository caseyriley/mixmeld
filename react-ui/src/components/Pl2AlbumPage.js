import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
// props.currentUser

const Pl2AlbumPage = (props) => {

  const [albumArrayState, setAlbumArrayState] = useState([])

  useEffect(()=>{

    const token = window.localStorage.getItem('auth_token');

    const getUserTracksByAlbum = async () => {
      const response = await fetch(`${API_URL}/tracks/user/trackalbum/${props.currentUser.id}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorizaion": `Bearer ${token}` }
      })
      if (!response.ok) { console.log("error in getUserTracks") }
      else {
        const json = await response.json();
        // setAlbumArrayState(json);
        // console.log("getUserTracksByAlbum=====>>", json)
        const albums = [];
        async function sortByAlbum(){
          let prevAlbum = "";
          let album = [];
          for (let i = 0; i < json.length; i ++){
            const track = json[i];
            if (track["trackalbum"]){
              if (prevAlbum === "") {
                album.push(track);
                prevAlbum = track["trackalbum"];
                console.log("hit 1");
                if (i === json.length -1){
                  albums.push(album)
                }
              } else if (prevAlbum === track["trackalbum"]) {
                album.push(track);
                console.log("hit 2");
                if (i === json.length -1){
                  albums.push(album)
                }
              } else if (prevAlbum !== track["trackalbum"]) {
                albums.push(album);
                album = [];
                album.push(track);
                prevAlbum = track["trackalbum"];
                console.log("hit 3");
                if (i === json.length -1){
                  albums.push(album)
                }
              }
            } else {
              console.log("nooooo track album", track);
            }
          }
          setAlbumArrayState(albums); 
        }
        await sortByAlbum()
        console.log("albums=====>",albums)
      }
    }
    getUserTracksByAlbum();

  },[props.currentUser])

return (
  <div id={"pl2-album-page-c"}>
    <div id={"pl2-album-page-top"}>
      <h1>Albums</h1>
    </div>

    {albumArrayState ? albumArrayState.map(album => {
      return (
        <div className={"pl2-album-c"}>
          <img src={album[0].trackart} alt="" ></img>
          <div className={"pl2-album-info-c"}>
            <h2>{album[0].trackalbum}</h2>
            <h3 class={"pl2-album-artist"}>By {album[0].trackartist}</h3>
            { album.map(track => {
                return (
                  <>
                    
                    <h3 class={"pl2-album-track"}>{track.trackname}</h3>
                  </>
                )
            })}
          </div>
        </div>
       
        
      )
    })
    : ""}
    
    {/* {albumArrayState ? albumArrayState.map(track => {
      return (
      <div className={"pl2-album-c"} >
        {track.trackalbum ? 
        <> 
        <img src={track.trackart} alt="" ></img>
        <h3>{track.trackalbum}</h3>
        </>
        : null}
      </div>
      
      )
    })
    : null} */}

  </div>
)

}
export default Pl2AlbumPage;
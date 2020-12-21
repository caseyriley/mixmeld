import React, {useState, useEffect} from 'react';
import { API_URL } from '../config';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import plusSign from '../images/plusSign.png';
import deleteX from '../images/deleteX.png';

// const itemsFromBackend = [
//   {id: uuidv4(), content: 'First task'},
//   {id: uuidv4(), content: 'Second task'}
// ];


// const columnsStateFromBackend = 
//   { [uuidv4()]: {
//     name: 'Requested',
//     items: itemsFromBackend
//     },
    // [uuidv4()]: {
    //   name: 'To do',
    //   items: []
    // },
    // [uuidv4()]: {
    //   name: 'In progress',
    //   items: []
    // },
    // [uuidv4()]: {
    //   name: 'Done',
    //   items: []
    // }
  // };

  

const onDragEnd = (result, columnsState, setColumnsState) => {
  if (!result.destination) return;
  const {source, destination} = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columnsState[source.droppableId];
    const destColumn = columnsState[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumnsState({
      ...columnsState,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columnsState[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumnsState({
    ...columnsState,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  })
  }
  
};


const Playlist2 = (props) => {

  // ----------------Get-Playlists------------------------
  const [playlistState, setPlaylistState] = useState();
  const [refreshPlaylistState, setRefreshPlaylistState] = useState(1);

  useEffect(() => {
  
    const getSelectedPlaylist = async () => {
      const token = window.localStorage.getItem('auth_token')
      const response = await fetch(`${API_URL}/playlists_tracks/${props.playlistIdRef.current}`, {
        method: "GET",
        mode: "cors",
        headers: { "Authorization": `Bearer ${token}` },
      })
      if (!response.ok) {
        console.log("getSelectedPlaylist failed in Playlist2.js");
      } else {
        const json = await response.json();
        setPlaylistState(json);
        console.log("getSelectedPlaylist", json)
      
      }
    }
    getSelectedPlaylist();
  },[props.playlistIdRef, refreshPlaylistState])
  // -----------------------------------------------------
  // -------------------------------------
  
  // const itemsFromBackend = [
  //   {id: uuidv4(), content: 'First task'},
  //   {id: uuidv4(), content: 'Second task'}
  // ];

  const columnsStateFromBackend = 
  playlistState ?
  { [uuidv4()]: {
    name: 'Requested',
    items: playlistState
    },
    // [uuidv4()]: {
    //   name: 'To do',
    //   items: []
    // },
    // [uuidv4()]: {
    //   name: 'In progress',
    //   items: []
    // },
    // [uuidv4()]: {
    //   name: 'Done',
    //   items: []
    // }
  } : null;
  useEffect(() => {
    setColumnsState(columnsStateFromBackend);
  }, [playlistState])

  const [columnsState, setColumnsState] = useState(columnsStateFromBackend);

  // ---------------Update-Track-Rating--------------------
function updateTrackRating(e) {
  const inputRating = e.target.firstChild.value;
  const trackId = e.target.name
  const newRating = async () => {
    const trackData = { id: trackId, rating: inputRating}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_rating`, options)
    setRefreshPlaylistState(refreshPlaylistState + 1)
    props.setTrackEditState(false)
  }
  newRating();

}
// -----------------------------------------------------
// ---------------Update-Track-Name--------------------
function updateTrackName(e) {
  const inputName = e.target.firstChild.value;
  const trackId = e.target.name
  const newTrackName = async () => {
    const trackData = { id: trackId, rating: inputName}
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/track_name`, options)
    setRefreshPlaylistState(refreshPlaylistState + 1)
    props.setTrackEditState(false)
  }
  newTrackName();
}
// -----------------------------------------------------
// ---------------Delete-Track-------------------------
function deleteTrack(trackId){
  const trackData = {id: trackId}
  const options = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(trackData)
  }
  fetch(`${API_URL}/tracks/delete`, options)
  setRefreshPlaylistState(refreshPlaylistState + 1)
  props.setTrackEditState(false)
}
// ----------------------------------------------------
// ---------------Update-Artist-Name--------------------

function updateTrackArtistName(e) {

  const newName = e.target.firstChild.value;
  const key = e.target.name
  const newTrack = async () => {
    const trackData = { id: key, name: newName}
    console.log("trackData======>",trackData)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/tracks/artist_name`, options)
    setRefreshPlaylistState(refreshPlaylistState + 1)
    props.setTrackEditState(false)
  }
  newTrack();
}
// ------------------------------------------------------
// ---------------Update-Artist-Name--------------------

function updateTrackAlbumName(e) {

const newName = e.target.firstChild.value;
const key = e.target.name
const newTrack = async () => {
  const trackData = { id: key, albumname: newName}
  console.log("trackData======>",trackData)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
  }
  fetch(`${API_URL}/tracks/album_name`, options)
  setRefreshPlaylistState(refreshPlaylistState + 1)
  props.setTrackEditState(false)
}
newTrack();
}
// ------------------------------------------------------
// ---------------Update-Track-Genre--------------------

function updateTrackGenre(e) {

const newName = e.target.firstChild.value;
const key = e.target.name
const newTrack = async () => {
  const trackData = { id: key, genre: newName}
  console.log("trackData======>",trackData)
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trackData),
  }
  fetch(`${API_URL}/tracks/genre`, options)
  setRefreshPlaylistState(refreshPlaylistState + 1)
  props.setTrackEditState(false)
}
newTrack();
}
// ------------------------------------------------------
// ---------Convert-to-standard-time---------
function toStandardTime(militaryTime) {
  let first = militaryTime.slice(0,3);
  let last = militaryTime.slice(3);
  let amPm = " am"
  if (Number.parseInt(first) > 12){
    first = Number.parseInt(first) - 12;
    amPm = " pm";
  }
  return `${first}:` + last + amPm;
}
// -------------------------------------------

  return (
    <>
      <div id={"dnd"} >
        <DragDropContext onDragEnd={result => onDragEnd(result, columnsState, setColumnsState)}>
          {columnsState ? Object.entries(columnsState).map(([id, column]) => {
            return (
              <div className={"dnd-column"} >
                <h2  >{column.name}</h2>
                <div className={"dnd-column__content"} >
                  <Droppable droppableId={id} key={id} >
                    {(provided, snapshot) => {
                      return (
                        <div id={"dop-c"}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                            // padding: 4,
                            // width: 250,
                            // minHeight: 500
                          }}
                        >
                          {column.items ? column.items.map((audio, index) => {
                            return (
                              <Draggable key={audio.id} draggableId={`${audio.id}`} index={index} >
                                {(provided, snapshot) => {
                                  return (
                                    <>
                                    <ul class={"drag-c"}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        // padding: 16,
                                        margin: '0 0 8px 0',
                                        minHeight: '50px',
                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      <li name={index} className={"pl2-track-ul__li"} key={index} >
                                        <div id={`nti${index}`} className={`next-track-info audioId${audio.id}`}>{`{"tracklocation":"${audio.tracklocation}","trackname":"${audio.trackname}","audioId":"${audio.id}", "trackartist":"${audio.trackartist}", "trackart":"${audio.trackart}"}`}</div> 
                                        <div className={`pl2-track-ul__li__rating ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                                          {props.trackEditState ? 
                                            <>
                                              <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackRating(e)}}> 
                                                <input 
                                                  type={"text"}
                                                  // id={"pl2-track-genre-input"} 
                                                  id={`genre-${index}`} 
                                                  className={"pl2-track-genre-input"}
                                                  maxLength={100} 
                                                  placeholder={audio.trackrating ? audio.trackrating : ""} 
                                                />
                                                <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                                              </form> 
                                            </> :
                                            <span className={"pl2-track-artist-rating-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}}>{audio.trackrating ? audio.trackrating : ""} </span>
                                            
                                          }
                                        </div>

                                        <div className={`pl2-track-ul__li__name ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                                        {/* {props.addToPlaylistState ? 
                                            <img name={audio.id} className={"plus-sign"} src={plusSign} alt={""} onClick={e=>{addToPlaylistFunc(e.target.name)}} />
                                          : null} */}
                                          {props.trackEditState ? 
                                          <>
                                            <form className={"pl2-tracklist-form"} name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackName(e)}}> 
                                              <input 
                                                type={"text"}
                                                className={"pl2-track-input"} 
                                                maxLength={100} 
                                                placeholder={audio.trackname ? audio.trackname : ""} 
                                                // value={audio.trackname ? audio.trackname : ""} 
                                              />
                                              <input className={"pl2-track-artist-name-submit"} type={"submit"}  />
                                            </form>
                                            <img name={audio.id} className={"pl2-deleteX"} src={deleteX} alt={""} onClick={e=>{deleteTrack(e.target.name)}}/>
                                          </> :
                                          <span className={"pl2-track-artist-name-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackname ? audio.trackname : ""} </span>
                                          
                                          }
                                        
                                        </div>

                                        <div className={`pl2-track-ul__li__artist ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                                        {props.trackEditState ? 
                                          <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackArtistName(e)}}> 
                                            <input 
                                              type={"text"}
                                              className={"pl2-track-input"} 
                                              maxLength={100} 
                                              placeholder={audio.trackartist ? audio.trackartist : ""} 
                                            />
                                            <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                                          </form> :
                                          <span className={"pl2-track-artist-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackartist ? audio.trackartist : ""} </span>
                                        }
                                        </div>

                                        <div className={`pl2-track-ul__li__album ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
                                        {props.trackEditState ? 
                                          <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackAlbumName(e)}}> 
                                            <input 
                                              type={"text"}
                                              className={"pl2-track-input"} 
                                              maxLength={100} 
                                              placeholder={audio.trackalbum ? audio.trackalbum : ""} 
                                            />
                                            <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                                          </form> :
                                          <span className={"pl2-track-artist-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackalbum ? audio.trackalbum : ""} </span>
                                        }
                                        </div>

                                        <div className={`pl2-track-ul__li__duration ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}><span>{audio.tracktime ? audio.tracktime : ""}</span></div>

                                        <div className={`pl2-track-ul__li__genre ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                                        {props.trackEditState ? 
                                          <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackGenre(e)}}> 
                                            <input 
                                              type={"text"}
                                              className={"pl2-track-input"} 
                                              maxLength={100} 
                                              placeholder={audio.trackgenre ? audio.trackgenre: ""} 
                                            />
                                            <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                                          </form> :
                                          <span className={"pl2-track-genre-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackgenre ? audio.trackgenre: ""} </span>
                                        }
                                        </div>

                                        <div className={`pl2-track-ul__li__date ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                                          <span className={"pl2-track-genre-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.created_date ? audio.created_date.slice(5, 16)+ " " + toStandardTime(audio.created_date.slice(16, 22)) : ""} </span>
                                        </div>

                                      </li>
                                    </ul>
                                    </>
                                  )
                                }}
                              </Draggable>
                            )
                          }): null}
                          {provided.placeholder}
                        </div>
                      )
                    }}
                  </Droppable>
                </div>
              </div>
            )
          }): null}
        </DragDropContext>
      </div>
    </>
  )
}
export default Playlist2;
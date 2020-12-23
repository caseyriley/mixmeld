import React, {useState, useEffect} from 'react';
import { API_URL } from '../config';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

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




const Playlist2 = (props) => {

  const [refreshPlaylistState, setRefreshPlaylistState] = useState(1);

// -------------Update-Playlist-Order-----------------------
async function updatePlaylistOrder() {
  await new Promise(resolve => {
    setTimeout(resolve, 100)
  })
  const liList = document.getElementsByClassName('next-track-info');
  const array = [];

  const inner =  async () => {
    for (let i = 0; i < liList.length; i ++) {
      let track_id = JSON.parse(liList[i].innerHTML).audioId
      array.push(Number(track_id))
      console.log("array=============>",array)
    }
  }

  await inner();
  

  const updatePlaylist = async () => {
    const trackData = {id: props.playlistIdRef.current.playlistId, playlist_list: array}
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(trackData),
    }
    fetch(`${API_URL}/playlists/update`, options)
    
  }
  await updatePlaylist();
  // setTimeout(() => {
  //   setRefreshPlaylistState(refreshPlaylistState + 7);
  // }, 2000);
}
// ---------------------------------------------------------
  // ------------On-Drag-End----------------------------------
  
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
      updatePlaylistOrder();
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
    updatePlaylistOrder();
    }
    
  };
  // ----------------------------------------------------------

  const [trackEditState, setTrackEditState] = useState(true);

  // ----------------Get-Playlists------------------------
  const [playlistState, setPlaylistState] = useState();
  

  useEffect(() => {
  
    const getSelectedPlaylist = async () => {
      const token = window.localStorage.getItem('auth_token')
      console.log("props.playlistIdRef.current.playlistId", props.playlistIdRef.current.playlistId)
      const response = await fetch(`${API_URL}/playlists/list/${props.playlistIdRef.current.playlistId}`, {
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
    setRefreshPlaylistState(refreshPlaylistState + 5)
    setTrackEditState(false)
  }
  newRating();

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
  setTrackEditState(false)
}
// ----------------------------------------------------
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
  setTrackEditState(false)
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
              <div className={"dnd-column"} key={"187687"} >
                
                <div id={"playlist2-top"}>
                  <img  src={props.trackArtState ? props.trackArtState : column.items[0].trackart} alt={""}/>
                  <div id={"playlist2-top__info"}>
                    <h2  >{props.playlistIdRef.current.playlistName}</h2>
                  </div>
                  
                </div>
                <div className={"dnd-column__content"} >
                  <Droppable droppableId={id} key={id} >
                    {(provided, snapshot) => {
                      return (
                        <ul id={"dop-c"}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver ? 'rgba(147, 114, 255, 0.1)' : 'transparent',
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
                                    <li name={index} class={"pl2-playlist-ul__li"} key={index}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: 'none',
                                        // padding: 16,
                                        
                                        // minHeight: '50px',
                                        backgroundColor: snapshot.isDragging ? 'rgba(226, 175, 255, 0.1)' : 'transparent',
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {/* <li name={index} className={"pl2-playlist-ul__li"} key={index} > */}
                                      {/* <li name={index} className={"pl2-playlist-ul__li"} key={index} > */}
                                        <div id={"pl2-playlist2-box-shadow"}>
                                          <div id={`nti${index}`} className={`next-track-info audioId${audio.id}`}>{`{"tracklocation":"${audio.tracklocation}","trackname":"${audio.trackname}","audioId":"${audio.id}", "trackartist":"${audio.trackartist}", "trackart":"${audio.trackart}"}`}</div> 

                                          <img className={`pl2-playlist-ul__li__track-art ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} src={audio.trackart} alt={""}>

                                          </img>

                                          <div className={`pl2-playlist-ul__li__name ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >                                 
                                            <span className={"pl2-playlist-artist-name-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackname ? audio.trackname : ""} </span>                                                               
                                            <span className={"pl2-playlist-artist-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackartist ? audio.trackartist : ""} </span>                                       
                                          </div>

                                          <div className={`pl2-playlist-ul__li__album ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >                                       
                                            <span className={"pl2-playlist-album-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackalbum ? audio.trackalbum : ""} </span>                                     
                                          </div>

                                          <div className={`pl2-playlist-ul__li__duration ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                                            <span className={`pl2-playlist-duration-span`}>{audio.tracktime ? audio.tracktime : ""}</span>
                                          </div>

                                          <div className={`pl2-playlist-ul__li__genre ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>                                        
                                            <span className={"pl2-playlist-genre-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.trackgenre ? audio.trackgenre: ""} </span>                                       
                                          </div>

                                          <div className={`pl2-playlist-ul__li__date ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
                                            <span className={"pl2-playlist-date-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}} >{audio.created_date ? audio.created_date.slice(5, 16)+ " " + toStandardTime(audio.created_date.slice(16, 22)) : ""} </span>
                                          </div>

                                          <div className={`pl2-playlist-ul__li__rating ${index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>                                         
                                            {trackEditState ? 
                                              <>
                                                <form name={audio.id} onSubmit={e=> {e.preventDefault(); updateTrackRating(e)}}> 
                                                  <input 
                                                    type={"text"}
                                                    // id={"pl2-track-genre-input"} 
                                                    id={`genre-${index}`} 
                                                    className={"pl2-track-rating-input"}
                                                    maxLength={100} 
                                                    placeholder={audio.trackrating ? audio.trackrating : ""} 
                                                  />
                                                  <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                                                </form> 
                                              </> :
                                              <span className={"pl2-track-artist-rating-span"} onClick={()=>{props.setTrack(audio.tracklocation, audio.trackname, audio.trackartist, audio.id, audio.trackart)}}>{audio.trackrating ? audio.trackrating : ""} </span>
                                              
                                            }     
                                          </div>
                                        </div>
                                      </li>
                                    {/* </ul> */}
                                    </>
                                  )
                                }}
                              </Draggable>
                            )
                          }): null}
                          {provided.placeholder}
                        </ul>
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
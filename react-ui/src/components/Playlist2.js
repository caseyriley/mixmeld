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
                          {column.items ? column.items.map((item, index) => {
                            return (
                              <Draggable key={item.id} draggableId={`${item.id}`} index={index} >
                                {(provided, snapshot) => {
                                  return (
                                    <>
                                    <div class={"drag-c"}
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
                                      {item.trackname}
                                    </div>
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
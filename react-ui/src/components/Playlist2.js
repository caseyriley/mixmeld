import React, { useState, useEffect } from "react";
import { API_URL } from "../config";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import formlessMusicIcon from "../images/formless-music-icon.png";
import TrackRatingModal from "./TrackRatingModal";

const Playlist2 = (props) => {
  const [trackEditModalState, setTrackEditModalState] = useState({
    boolean: false,
    index: "",
  });
  function toggleTrackEditModal(index) {
    const nextState = !trackEditModalState.boolean;
    setTrackEditModalState({ boolean: nextState, index: index });
  }

  // -------------Update-Playlist-Order-----------------------
  async function updatePlaylistOrder() {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
    const liList = document.getElementsByClassName("next-track-info");
    const array = [];

    const inner = async () => {
      for (let i = 0; i < liList.length; i++) {
        let track_id = JSON.parse(liList[i].innerHTML).audioId;
        array.push(Number(track_id));
      }
    };

    await inner();

    const updatePlaylist = async () => {
      const trackData = {
        id: props.playlistIdRef.current.playlistId,
        playlist_list: array,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackData),
      };
      fetch(`${API_URL}/playlists/update`, options);
    };
    await updatePlaylist();
  }
  // ---------------------------------------------------------
  // ------------On-Drag-End----------------------------------

  const onDragEnd = (result, columnsState, setColumnsState) => {
    if (!result.destination) return;
    const { source, destination } = result;
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
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
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
          items: copiedItems,
        },
      });
      updatePlaylistOrder();
    }
  };
  // ----------------------------------------------------------

  // ---------DnD-Columns---------------------------
  const columnsStateFromBackend = props.selectedPlaylistState
    ? {
        [uuidv4()]: {
          name: "Requested",
          items: props.selectedPlaylistState,
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
      }
    : null;
  useEffect(() => {
    setColumnsState(columnsStateFromBackend);
  }, [props.selectedPlaylistState]);

  const [columnsState, setColumnsState] = useState(columnsStateFromBackend);
  // ------------------------------------------

  // ---------------Update-Track-Rating--------------------
  function updateTrackRating(e) {
    const inputRating = e.target.firstChild.value;
    const trackId = e.target.name;
    const newRating = async () => {
      const trackData = { id: trackId, rating: inputRating };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackData),
      };
      fetch(`${API_URL}/tracks/track_rating`, options);
      let prevState = props.refreshPlaylistState;
      props.setRefreshPlaylistState(prevState + 5);
      setTrackRatingModalState(false);
    };
    newRating();
  }
  // -----------------------------------------------------

  // ---------Convert-to-standard-time---------
  function toStandardTime(militaryTime) {
    let first = militaryTime.slice(0, 3);
    let last = militaryTime.slice(3);
    let amPm = " am";
    if (Number.parseInt(first) > 12) {
      first = Number.parseInt(first) - 12;
      amPm = " pm";
    }
    return `${first}:` + last + amPm;
  }
  // -------------------------------------------
  // -------------Delete-From-Playlist----------
  function deleteFromPlaylist(trackId) {
    const trackData = {
      track_id: trackId,
      playlist_id: props.playlistIdRef.current.playlistId,
    };
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackData),
    };
    fetch(`${API_URL}/playlists/delete`, options);
    let prevState = props.refreshPlaylistState;
    props.setRefreshPlaylistState(prevState + 1);
    setTrackEditModalState({ boolean: false, index: "" });
  }
  // -------------------------------------------
  const [totallPlaylistTime, setTotallPlaylistTime] = useState();
  useEffect(() => {
    async function formatTime(time) {
      let start = 12;
      let end = 8;
      if (time < 3600) {
        start = 14;
        end = 5;
      }
      const formattedTime = `${new Date(time * 1000)
        .toISOString()
        .substr(start, end)}`;
      return formattedTime;
    }

    let playlistTime = 0;
    if (props.selectedPlaylistState) {
      if (props.selectedPlaylistState.length > 0) {
        async function addTrackTime() {
          for (let i = 0; i < props.selectedPlaylistState.length; i++) {
            const trackTime = props.selectedPlaylistState[i].tracktime.split(
              ":"
            );
            console.log("trackTime", trackTime);
            if (trackTime.length < 3) {
              const minToSec = Number(trackTime[0]) * 60;
              const seconds = Number(trackTime[1]);
              const totallMilliseconds = minToSec + seconds;
              playlistTime += totallMilliseconds;
            }
            const formattedTime = await formatTime(playlistTime);
            setTotallPlaylistTime(formattedTime);
          }
        }
        addTrackTime();
      }
    } else {
      setTotallPlaylistTime(null);
    }
  }, [props.selectedPlaylistState]);

  // ------set-trackArraylength------
  useEffect(() => {
    const trackArraylength = document.getElementsByClassName("next-track-info")
      .length;
    props.setTrackArrayLengthState(trackArraylength);
  });
  // --------------------------------
  // ----------Track-Rating-Modal--------
  const [trackRatingModalState, setTrackRatingModalState] = useState(false);
  const [ratingAudioState, setRatingAudioState] = useState();
  function launchTrackRatingModal(audio) {
    setTrackRatingModalState(true);
    setRatingAudioState(audio);
  }
  const [playlistDeleteModal, setPlaylistDeleteModal] = useState(true);
  // -----Delete-Playlist-----
  function deletePlaylist() {
    const trackData = { playlist_id: props.playlistIdRef.current.playlistId };
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackData),
    };
    fetch(`${API_URL}/playlists/delete_playlist`, options);
    let prevState = props.refreshPlaylistState;
    props.setRefreshPlaylistState(prevState + 1);
    props.setPlaylistSwitchState("Tracklist2");
  }
  // -------------------------

  return (
    <>
      {trackRatingModalState ? (
        <TrackRatingModal
          updateTrackRating={updateTrackRating}
          ratingAudioState={ratingAudioState}
          setTrackRatingModalState={setTrackRatingModalState}
        />
      ) : null}
      <div id={"dnd"}>
        <DragDropContext
          onDragEnd={(result) =>
            onDragEnd(result, columnsState, setColumnsState)
          }
        >
          {columnsState
            ? Object.entries(columnsState).map(([id, column]) => {
                return (
                  <div className={"dnd-column fade-in"} key={"187687"}>
                    <div id={"playlist2-top"} className={"fade-in"}>
                      {playlistDeleteModal === true ? (
                        <div
                          className={"playlist2-top-three-dots fade-in"}
                          onClick={() => {
                            setPlaylistDeleteModal(false);
                          }}
                        >
                          <div className={"playlist2-top-dot"}></div>
                          <div className={"playlist2-top-dot"}></div>
                          <div className={"playlist2-top-dot"}></div>
                        </div>
                      ) : (
                        <div
                          className={"playlist2-top-three-dots-delete fade-in"}
                        >
                          <div
                            id={"delete-it"}
                            onClick={() => {
                              setPlaylistDeleteModal(true);
                            }}
                          >
                            X
                          </div>
                          <span onClick={deletePlaylist}>delete</span>
                        </div>
                      )}
                      <div id={"playlist2-img-c"}>
                        <img
                          src={
                            props.trackArtState
                              ? props.trackArtState
                              : column.items[0]
                              ? column.items[0].trackart
                              : formlessMusicIcon
                          }
                          alt={""}
                        />
                      </div>
                      <div id={"playlist2-top__info"}>
                        <div id={"playlist2-top__info__h2-c"}>
                          <h2>{props.playlistIdRef.current.playlistName}</h2>
                        </div>
                        <div id={"playlist2-top__info__playlist-name-c"}>
                          <h3>
                            {props.selectedPlaylistState
                              ? `${props.selectedPlaylistState.length} Tracks`
                              : ""}
                          </h3>
                        </div>
                        <div>
                          <h3 id={"playlist2-top__info__playlist-time-c"}>
                            {totallPlaylistTime}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className={"dnd-column__content"}>
                      <Droppable droppableId={id} key={id}>
                        {(provided, snapshot) => {
                          return (
                            <ul
                              id={"dop-c"}
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "rgba(147, 114, 255, 0.1)"
                                  : "transparent",
                              }}
                            >
                              {column.items
                                ? column.items.map((audio, index) => {
                                    return (
                                      <Draggable
                                        key={audio.id}
                                        draggableId={`${audio.id}`}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          return (
                                            <>
                                              <li
                                                name={index}
                                                class={"pl2-playlist-ul__li"}
                                                key={index}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                  userSelect: "none",

                                                  backgroundColor: snapshot.isDragging
                                                    ? "rgba(226, 175, 255, 0.1)"
                                                    : "transparent",
                                                  ...provided.draggableProps
                                                    .style,
                                                }}
                                              >
                                                <div
                                                  id={
                                                    "pl2-playlist2-box-shadow"
                                                  }
                                                >
                                                  <div
                                                    id={`nti${index}`}
                                                    className={`next-track-info audioId${audio.id}`}
                                                  >{`{"tracklocation":"${audio.tracklocation}","trackname":"${audio.trackname}","audioId":"${audio.id}", "trackartist":"${audio.trackartist}", "trackart":"${audio.trackart}"}`}</div>

                                                  <img
                                                    className={`pl2-playlist-ul__li__track-art ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                    src={
                                                      audio.trackart
                                                        ? audio.trackart
                                                        : formlessMusicIcon
                                                    }
                                                    alt={""}
                                                  ></img>

                                                  <div
                                                    className={`pl2-playlist-ul__li__name ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                  >
                                                    <span
                                                      className={
                                                        "pl2-playlist-artist-name-span"
                                                      }
                                                      onClick={() => {
                                                        props.setTrack(
                                                          audio.tracklocation,
                                                          audio.trackname,
                                                          audio.trackartist,
                                                          audio.id,
                                                          audio.trackart
                                                        );
                                                      }}
                                                    >
                                                      {audio.trackname
                                                        ? audio.trackname
                                                        : ""}{" "}
                                                    </span>
                                                    <span
                                                      className={
                                                        "pl2-playlist-artist-span"
                                                      }
                                                      onClick={() => {
                                                        props.setTrack(
                                                          audio.tracklocation,
                                                          audio.trackname,
                                                          audio.trackartist,
                                                          audio.id,
                                                          audio.trackart
                                                        );
                                                      }}
                                                    >
                                                      {audio.trackartist
                                                        ? audio.trackartist
                                                        : ""}{" "}
                                                    </span>
                                                  </div>

                                                  <div
                                                    className={`pl2-playlist-ul__li__album ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                  >
                                                    <span
                                                      className={
                                                        "pl2-playlist-album-span"
                                                      }
                                                      onClick={() => {
                                                        props.setTrack(
                                                          audio.tracklocation,
                                                          audio.trackname,
                                                          audio.trackartist,
                                                          audio.id,
                                                          audio.trackart
                                                        );
                                                      }}
                                                    >
                                                      {audio.trackalbum
                                                        ? audio.trackalbum
                                                        : ""}{" "}
                                                    </span>
                                                  </div>

                                                  <div
                                                    className={`pl2-playlist-ul__li__duration ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                  >
                                                    <span
                                                      className={`pl2-playlist-duration-span`}
                                                    >
                                                      {audio.tracktime
                                                        ? audio.tracktime
                                                        : ""}
                                                    </span>
                                                  </div>

                                                  <div
                                                    className={`pl2-playlist-ul__li__genre ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                  >
                                                    <span
                                                      className={
                                                        "pl2-playlist-genre-span"
                                                      }
                                                      onClick={() => {
                                                        props.setTrack(
                                                          audio.tracklocation,
                                                          audio.trackname,
                                                          audio.trackartist,
                                                          audio.id,
                                                          audio.trackart
                                                        );
                                                      }}
                                                    >
                                                      {audio.trackgenre
                                                        ? audio.trackgenre
                                                        : ""}{" "}
                                                    </span>
                                                  </div>

                                                  <div
                                                    className={`pl2-playlist-ul__li__date ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                  >
                                                    <span
                                                      className={
                                                        "pl2-playlist-date-span"
                                                      }
                                                      onClick={() => {
                                                        props.setTrack(
                                                          audio.tracklocation,
                                                          audio.trackname,
                                                          audio.trackartist,
                                                          audio.id,
                                                          audio.trackart
                                                        );
                                                      }}
                                                    >
                                                      {audio.created_date
                                                        ? audio.created_date.slice(
                                                            5,
                                                            16
                                                          ) +
                                                          " " +
                                                          toStandardTime(
                                                            audio.created_date.slice(
                                                              16,
                                                              22
                                                            )
                                                          )
                                                        : ""}{" "}
                                                    </span>
                                                  </div>

                                                  <div
                                                    className={`pl2-playlist-ul__li__rating ${
                                                      index % 2 === 1
                                                        ? "pl2-dark"
                                                        : "pl2-light"
                                                    }`}
                                                    onClick={() => {
                                                      launchTrackRatingModal(
                                                        audio
                                                      );
                                                    }}
                                                  >
                                                    <span
                                                      className={
                                                        "pl2-playlist-track-artist-rating-span"
                                                      }
                                                    >
                                                      {audio.trackrating}
                                                    </span>
                                                  </div>

                                                  <div
                                                    className={"track-edit-c"}
                                                  >
                                                    {trackEditModalState.boolean ===
                                                      true &&
                                                    trackEditModalState.index ===
                                                      index ? (
                                                      <div
                                                        className={
                                                          "track-edit-modal"
                                                        }
                                                      >
                                                        <div
                                                          className={
                                                            "track-edit-modal__close"
                                                          }
                                                        >
                                                          <div
                                                            className={
                                                              "track-edit-modal__close__button"
                                                            }
                                                            onClick={() => {
                                                              toggleTrackEditModal(
                                                                index
                                                              );
                                                            }}
                                                          >
                                                            <span>x</span>
                                                          </div>
                                                        </div>
                                                        <div
                                                          className={
                                                            "track-edit-modal__option"
                                                          }
                                                          onClick={() => {
                                                            deleteFromPlaylist(
                                                              audio.id
                                                            );
                                                          }}
                                                        >
                                                          <span>delete</span>
                                                        </div>
                                                      </div>
                                                    ) : null}
                                                    {trackEditModalState.boolean ===
                                                    false ? (
                                                      <div
                                                        className={"three-dots"}
                                                        onClick={() => {
                                                          toggleTrackEditModal(
                                                            index
                                                          );
                                                        }}
                                                      >
                                                        <div
                                                          className={"dot"}
                                                        ></div>
                                                        <div
                                                          className={"dot"}
                                                        ></div>
                                                        <div
                                                          className={"dot"}
                                                        ></div>
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                </div>
                                              </li>
                                            </>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })
                                : null}
                              {provided.placeholder}
                              <div class={"playlist-2-bottom-space"}></div>
                            </ul>
                          );
                        }}
                      </Droppable>
                    </div>
                  </div>
                );
              })
            : null}
        </DragDropContext>
      </div>
    </>
  );
};
export default Playlist2;

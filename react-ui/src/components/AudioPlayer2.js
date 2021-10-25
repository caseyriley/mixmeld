import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../config";
import playButton from "../images/playButton.svg";
import pauseButton from "../images/pauseButton.png";
import fastForward from "../images/fastForward.png";
import loop from "../images/loop.png";
import random from "../images/random.png";
import VolumeUiSlider from "./VolumeUiSlider";
import Pl2LeftColumn from "./Pl2LeftColumn";
import PlaylistSwitch from "./PlaylistSwitch";
import TrackDisplay from "./TrackDisplay";
import UploadingTrackPl2 from "./UploadingTrackPl2";
import formlessMusicIcon from "../images/formless-music-icon.png";
import LiquidMix from "./LiquidMix";

let vol = 0.5;

const AudioPlayer2 = (props) => {
  const media = useRef();
  const play = useRef();
  const rwd = useRef();
  const fwd = useRef();
  const volumeLevel = useRef();
  const volumeSlider = useRef();
  const volumeFader = useRef();
  const playHeadSlider = useRef();
  const currentTrack = useRef([]);
  // const playlistIdRef = useRef(null);
  const playlistIdRef = useRef({
    playlistId: "1",
    playlistName: "first-playlist",
  });
  const trackArtRef = useRef(formlessMusicIcon);

  const [songNameState, setSongNameState] = useState("");
  const [artistNameState, setArtistNameState] = useState("");
  const [trackArrayLengthState, setTrackArrayLengthState] = useState();
  const [refreshPlaylistState, setRefreshPlaylistState] = useState(1);
  const [refreshTrackState, setRefreshTrackState] = useState(1);
  const [imageTopState, setImageTopState] = useState(false);
  const [firstTrack, setFirstTrack] = useState();
  const [trackEditState, setTrackEditState] = useState(false);
  const [artistAlbumSongState, setArtistAlbumSongState] =
    useState("selected-song");

  //---------Get-Current_User--------------
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = window.localStorage.getItem("auth_token");
      const response = await fetch(`${API_URL}/users/token`, {
        method: "GET",
        mode: "cors",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        console.log("getCurrent user response failed in Uploading.js");
      } else {
        const json = await response.json();
        setCurrentUser(json);

        const getUserFirstTrack = async () => {
          const response = await fetch(`${API_URL}/tracks/first/${json.id}`, {
            method: "GET",
            mode: "cors",
          });
          if (!response.ok) {
            console.log("error in getUserTracks");
          } else {
            const json = await response.json();
            // if (json === []) {
            // }
            console.log("tracks/first/<id>+++++++++++++++++++++++>>>>>", json);
            setFirstTrack(json);
            currentTrack.current = json.id;
            setTrackArtState(json.trackart);
            trackArtRef.current = json.trackart;
          }
        };
        getUserFirstTrack();
        media.current.volume = 0.5;
      }
    };
    getCurrentUser();
  }, []);
  // ----------------------------------------------
  // ---------------Play/Pause-Button---------------
  const [isPlayingState, setIsPlayingState] = useState(1);

  function playPauseMedia() {
    if (!media.current.src) {
      media.current.setAttribute("src", firstTrack.tracklocation);
    }

    rwd.current.classList.remove("active");
    fwd.current.classList.remove("active");

    if (media.current.paused) {
      play.current.src = pauseButton;
      media.current.play();
      setIsPlayingState(isPlayingState + 1);
    } else {
      play.current.src = playButton;
      media.current.pause();
    }
  }
  // --------------------------------------------------
  // ---------------Stop-Button---------------------------
  function stopMedia() {
    media.current.pause();
    media.current.currentTime = 0;
    play.current.src = playButton;
    rwd.current.classList.remove("active");
    fwd.current.classList.remove("active");
    // clearInterval(intervalRwd);
    // if (intervalFwdState){
    //   clearInterval(intervalFwdState.intervalFwd);
    // }
  }
  // -----------------------------------------------
  // --------------Skip-Back------------------------
  function skipBack() {
    if (media.current.currentTime > 5) {
      if (media) {
        media.current.currentTime = 0;
      }
    } else {
      const trackLi = document.getElementsByClassName(
        `audioId${currentTrack.current}`
      ); //get Li element of current track regarless of sort choice
      let trackLiIdNumber = null;
      if (trackLi.length > 0) {
        trackLiIdNumber = Number(trackLi[0].id.slice(3)); //get index of current track
        if (trackLiIdNumber === 0) {
          trackLiIdNumber = 1;
        }
        const newTrackLi = document.getElementById(`nti${trackLiIdNumber - 1}`); //get Li element of previous track regardless of sort choice
        const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
        setTrack(
          newTrackObj.tracklocation,
          newTrackObj.trackname,
          newTrackObj.trackartist,
          newTrackObj.audioId,
          newTrackObj.trackart
        ); // start the next track
      }
    }
  }
  // ------------------------------------------------
  // -------------Move-Playhead-onClick---------------
  function movePlayheadOnClick(e) {
    if (media) {
      if (
        media.current.currentTime > 0 &&
        media.current.paused === false &&
        media.current.ended === false
      ) {
        media.current.currentTime = parseFloat(
          media.current.duration * playHeadSlider.current.value
        );
      } else {
        if (!media.current.src) {
          media.current.setAttribute("src", firstTrack.tracklocation);
          playPauseMedia();
          if (media.current.currentTime > 0) {
            media.current.currentTime = parseFloat(
              media.current.duration * playHeadSlider.current.value
            );
          }
        } else {
          playPauseMedia();
          if (media.current.currentTime > 0) {
            media.current.currentTime = parseFloat(
              media.current.duration * playHeadSlider.current.value
            );
          }
        }
      }
    }
  }
  // -------------------------------------------------
  //-------------loop----------------------------
  const [loopState, setLoopState] = useState(false);
  function toggleLoop() {
    const nextState = !loopState;
    setLoopState(nextState);
  }
  //-------------------------------------------
  //-------------random----------------------------
  const [randomState, setRandomState] = useState("not-random");
  function toggleRandom() {
    if (randomState === "not-random") {
      setRandomState("pl2-random-play");
    } else {
      setRandomState("not-random");
    }
  }
  //-------------------------------------------
  // ---------------volume------------------------
  const [volumeState, setVolumeState] = useState(50);

  function changeVolume() {
    setVolumeState(volumeSlider.current.value);
    vol = Number(volumeState) / 100;
    if (vol > 0.98) {
      vol = 1;
    }
    if (vol < 0.1) {
      vol = 0;
    }
    media.current.volume = vol;
  }

  useEffect(() => {
    if (volumeState) {
      if (volumeFader.current) {
        volumeFader.current.style.bottom = `${volumeState * 0.75}px`;
      }
      if (volumeLevel.current) {
        volumeLevel.current.style.height = `${volumeState * 0.75}px`;
      }
    }
  }, [volumeState]);
  // ---------------------------------------------
  //---------------Set-Track-Onclick--------------

  const [trackArtState, setTrackArtState] = useState();
  const [pl2TrackLocationState, setPl2TrackLocationState] = useState();

  function setTrack(track, songName, artistName, audioId, trackArt) {
    media.current.setAttribute("src", track);
    playPauseMedia();

    let newSongName = songName.slice(0);
    if (newSongName.length > 20) {
      newSongName = newSongName.slice(0, 20) + "...";
    }
    let newArtistName = artistName.slice(0);
    if (newArtistName.length > 20) {
      newArtistName = newArtistName.slice(0, 20) + "...";
    }
    setSongNameState(newSongName);
    setArtistNameState(newArtistName);
    setTrackArtState(trackArt);
    if (!trackArt) {
      trackArtRef.current = formlessMusicIcon;
    } else {
      trackArtRef.current = trackArt;
    }
    setPl2TrackLocationState(track);

    currentTrack.current = audioId;
  }
  //----------------------------------------------

  //---------------Set-Track-Onclick-Via-Search------
  function setTrackViaSearch(
    track,
    songName,
    artistName,
    audioId,
    trackArt,
    page
  ) {
    media.current.setAttribute("src", track);
    playPauseMedia();

    let newSongName = songName.slice(0);
    if (newSongName.length > 20) {
      newSongName = newSongName.slice(0, 20) + "...";
    }
    let newArtistName = artistName.slice(0);
    if (newArtistName.length > 20) {
      newArtistName = newArtistName.slice(0, 20) + "...";
    }
    setSongNameState(newSongName);
    setArtistNameState(newArtistName);
    setTrackArtState(trackArt);
    setPl2TrackLocationState(track);

    currentTrack.current = audioId;
    setPlaylistSwitchState(page);
    let selected = "Tracklist2";
    if (page === "Tracklist2") {
      selected = "selected-song";
    }
    if (page === "Pl2AlbumPage") {
      selected = "selected-album";
    }
    if (page === "Pl2ArtistPage") {
      selected = "selected-artist";
    }
    setArtistAlbumSongState(selected);
  }
  //----------------------------------------------
  // -------------next-track-function-------------
  function nextTrack() {
    const trackLi = document.getElementsByClassName(
      `audioId${currentTrack.current}`
    ); //get Li element of current track regarless of sort choice
    let trackLiIdNumber = undefined;
    if (trackLi.length > 0) {
      trackLiIdNumber = Number(trackLi[0].id.slice(3)); //get index of current track

      if (randomState === "pl2-random-play") {
        function getRandomInt(max) {
          return Math.floor(Math.random() * Math.floor(max));
        }

        const randomNum = getRandomInt(trackArrayLengthState - 1);
        const newTrackLi = document.getElementById(`nti${randomNum}`); //get Li element of next track regardless of sort choice
        const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
        setTrack(
          newTrackObj.tracklocation,
          newTrackObj.trackname,
          newTrackObj.trackartist,
          newTrackObj.audioId,
          newTrackObj.trackart
        ); // start the next track
      } else {
        if (loopState && trackLiIdNumber >= trackArrayLengthState - 1) {
          trackLiIdNumber = -1;
        }

        if (!loopState && trackLiIdNumber >= trackArrayLengthState - 1) {
          trackLiIdNumber = -1;
          const newTrackLi = document.getElementById(
            `nti${trackLiIdNumber + 1}`
          ); //get Li element of next track regardless of sort choice
          const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
          setTrack(
            newTrackObj.tracklocation,
            newTrackObj.trackname,
            newTrackObj.trackartist,
            newTrackObj.audioId,
            newTrackObj.trackart
          ); // start the next track
          stopMedia();
        } else {
          const newTrackLi = document.getElementById(
            `nti${trackLiIdNumber + 1}`
          ); //get Li element of next track regardless of sort choice
          const newTrackObj = JSON.parse(newTrackLi.innerHTML); //get key values of next track info
          setTrack(
            newTrackObj.tracklocation,
            newTrackObj.trackname,
            newTrackObj.trackartist,
            newTrackObj.audioId,
            newTrackObj.trackart
          ); // start the next track
        }
      }
    }
  }
  // --------------------------------
  // -----------PlaylistSwitch--functions-------------------
  const [playlistSwitchState, setPlaylistSwitchState] = useState("Tracklist2");

  function showPlaylist(playlistName, playlistId) {
    setPlaylistSwitchState("Playlist2");
    playlistIdRef.current = {
      playlistId: playlistId,
      playlistName: playlistName,
    };
    let nextState = refreshPlaylistState;
    setRefreshPlaylistState(nextState + 3);
    setTrackArtState(null);
  }

  function showTracklist() {
    setPlaylistSwitchState("Tracklist2");
    setAddToPlaylistState(false);
  }
  function showPl2AlbumPage() {
    setPlaylistSwitchState("Pl2AlbumPage");
    setAddToPlaylistState(false);
  }
  function showPl2ArtistPage() {
    setPlaylistSwitchState("Pl2ArtistPage");
    setAddToPlaylistState(false);
  }

  // ----------------------------------------------------
  // ----------Add-To-Playlist---------------------------
  const [addToPlaylistState, setAddToPlaylistState] = useState(false);
  function toggleAddToPlaylist() {
    setAddToPlaylistState(!addToPlaylistState);
    if (addToPlaylistState === false) {
      setPlaylistSwitchState("Tracklist2");
    }
  }
  // ----------------------------------------------------
  // ----------------Get-Playlists------------------------
  const [playlistState, setPlaylistState] = useState();

  useEffect(() => {
    if (currentUser) {
      console.log("AudioPlayer2.js line 357 currentUser", currentUser);
      const getCurrentUserPlaylists = async () => {
        const token = window.localStorage.getItem("auth_token");
        const response = await fetch(`${API_URL}/playlists/${currentUser.id}`, {
          method: "GET",
          mode: "cors",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          console.log("getCurrentUserPlaylists failed in AudioPlayer2.js");
        } else {
          const json = await response.json();
          setPlaylistState(json);
          console.log("getCurrentUserPlaylists json", json);
        }
      };
      getCurrentUserPlaylists();
    }
  }, [currentUser, refreshPlaylistState]);
  // -----------------------------------------------------
  // ----------------Get-Selected-Playlists------------------------
  const [selectedPlaylistState, setSelectedPlaylistState] = useState();

  useEffect(() => {
    // if (playlistIdRef.current){
    //   if (playlistIdRef.current.playlistId){
    console.log("AudioPlayer2-line-383");
    setSelectedPlaylistState(null);
    const getSelectedPlaylist = async () => {
      const token = window.localStorage.getItem("auth_token");
      const response = await fetch(
        `${API_URL}/playlists/list/${playlistIdRef.current.playlistId}`,
        {
          method: "GET",
          mode: "cors",

          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) {
        console.log("getSelectedPlaylist failed in Playlist2.js");
      } else {
        const json = await response.json();
        setSelectedPlaylistState(json);
        console.log("getSelectedPlaylist", json);
      }
    };
    getSelectedPlaylist();
    //   }

    // }
  }, [playlistIdRef, refreshPlaylistState, refreshTrackState]);
  // -----------------------------------------------------
  //-----------scroll-to-this-functions-------------------
  const [queryState, setQueryState] = useState();

  function scrollToThis(className) {
    setTimeout(() => {
      const newTrackInfo = document.getElementsByClassName(className);
      newTrackInfo[0].nextSibling.scrollIntoView({
        behavior: "smooth",
        alignToTop: false,
      });
    }, 500);
  }
  function scrollToThis2(className) {
    setTimeout(() => {
      const newTrackInfo = document.getElementsByClassName(className);
      newTrackInfo[0].parentNode.parentNode.parentNode.previousSibling.parentElement.parentElement.parentElement.scrollIntoView(
        { behavior: "smooth", alignToTop: false }
      );
    }, 500);
  }

  function scrollToThis3(className) {
    setTimeout(() => {
      const newTrackInfo = document.getElementsByClassName(className);
      newTrackInfo[0].parentNode.parentNode.parentNode.parentNode.scrollIntoView(
        { behavior: "smooth", alignToTop: false }
      );
    }, 500);
  }

  function scrollToTargetAdjusted(className) {
    setTimeout(() => {
      const element = document.getElementsByClassName(className);
      var headerOffset = 45;
      var elementPosition = element[0].getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: -500,
        behavior: "smooth",
      });
    }, 500);
  }

  // --------------Upload-State------------------
  const [uploadModalState, setUploadModalState] = useState("no-modal");
  const [trackLocationState, setTrackLocationState] = useState();
  //  ---------------------------------------------

  return (
    <>
      {currentUser && (
        <div id={"pl2-main-page"} className={"fade-in-2"}>
          <Pl2LeftColumn
            refreshTrackState={refreshTrackState}
            setRefreshTrackState={setRefreshTrackState}
            setRefreshPlaylistState={setRefreshPlaylistState}
            refreshPlaylistState={refreshPlaylistState}
            playlistState={playlistState}
            playlistIdRef={playlistIdRef}
            addToPlaylistState={addToPlaylistState}
            toggleAddToPlaylist={toggleAddToPlaylist}
            showTracklist={showTracklist}
            showPlaylist={showPlaylist}
            setQueryState={setQueryState}
            setPlaylistSwitchState={setPlaylistSwitchState}
            currentUser={currentUser}
            showPl2AlbumPage={showPl2AlbumPage}
            showPl2ArtistPage={showPl2ArtistPage}
            setArtistAlbumSongState={setArtistAlbumSongState}
            artistAlbumSongState={artistAlbumSongState}
          />

          <div id={"pl2-audio-tracklist-c"}>
            <div
              className={`pl2-image-top-space--closed ${
                imageTopState ? "pl2-image-top-space--open" : ""
              }`}
            ></div>
            <div id={"pl2-audio"}>
              <audio
                id={"audio"}
                ref={media}
                // controls
                // autoPlay
                onEnded={nextTrack}
                // loop={loopState}
              >
                Your browser does not support the
                <code>audio</code> element.
              </audio>
              <div id={"pl2-audio__top"}>
                <img
                  className={`track-art-450`}
                  src={`${trackArtState ? trackArtState : formlessMusicIcon}`}
                  alt={""}
                />
                <div className={"pl2-audio__top__inner"}>
                  <div id={"pl2-controls"}>
                    <img
                      className={`pl2-random ${randomState}`}
                      src={random}
                      alt={""}
                      onClick={toggleRandom}
                    ></img>
                    <img
                      className={"pl2-rewind"}
                      ref={rwd}
                      src={fastForward}
                      alt={""}
                      onClick={skipBack}
                    ></img>
                    <img
                      className={"pl2-play"}
                      ref={play}
                      src={playButton}
                      alt={""}
                      onClick={playPauseMedia}
                    ></img>
                    <img
                      className={"pl2-fast-forward"}
                      onClick={nextTrack}
                      ref={fwd}
                      src={fastForward}
                      alt={""}
                    ></img>
                    <img
                      className={`pl2-loop ${
                        loopState ? "pl2-looping" : "not-looping"
                      }`}
                      src={loop}
                      alt={""}
                      onClick={toggleLoop}
                    ></img>
                  </div>
                  <TrackDisplay
                    media={media}
                    trackEditState={trackEditState}
                    setTrackEditState={setTrackEditState}
                    currentUser={currentUser}
                    refreshTrackState={refreshTrackState}
                    setRefreshTrackState={setRefreshTrackState}
                    setTrackArtState={setTrackArtState}
                    setPl2TrackLocationState={setPl2TrackLocationState}
                    pl2TrackLocationState={pl2TrackLocationState}
                    trackArtState={trackArtState}
                    songNameState={songNameState}
                    firstTrack={firstTrack}
                    artistNameState={artistNameState}
                    playHeadSlider={playHeadSlider}
                    movePlayheadOnClick={movePlayheadOnClick}
                    trackArtRef={trackArtRef}
                    isPlayingState={isPlayingState}
                    setImageTopState={setImageTopState}
                  />
                  <div id={"volume-slider-c"}>
                    <VolumeUiSlider
                      volumeLevel={volumeLevel}
                      volumeFader={volumeFader}
                      volumeSlider={volumeSlider}
                      changeVolume={changeVolume}
                    />
                  </div>
                  <LiquidMix />
                  {playlistSwitchState === "Tracklist2" ? (
                    <div id={"pl2-uploading-track-x"}>
                      <UploadingTrackPl2
                        refreshTrackState={refreshTrackState}
                        setRefreshTrackState={setRefreshTrackState}
                        setUploadModalState={setUploadModalState}
                        setTrackLocationState={setTrackLocationState}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <PlaylistSwitch
              refreshTrackState={refreshTrackState}
              setRefreshTrackState={setRefreshTrackState}
              selectedPlaylistState={selectedPlaylistState}
              playlistState={playlistState}
              refreshPlaylistState={refreshPlaylistState}
              setRefreshPlaylistState={setRefreshPlaylistState}
              trackArtState={trackArtState}
              setTrack={setTrack}
              playlistIdRef={playlistIdRef}
              currentUser={currentUser}
              addToPlaylistState={addToPlaylistState}
              playlistSwitchState={playlistSwitchState}
              trackEditState={trackEditState}
              setTrackEditState={setTrackEditState}
              setTrackArrayLengthState={setTrackArrayLengthState}
              queryState={queryState}
              setTrackViaSearch={setTrackViaSearch}
              scrollToThis={scrollToThis}
              scrollToThis2={scrollToThis2}
              scrollToThis3={scrollToThis3}
              scrollToTargetAdjusted={scrollToTargetAdjusted}
              uploadModalState={uploadModalState}
              setUploadModalState={setUploadModalState}
              trackLocationState={trackLocationState}
              setTrackLocationState={setTrackLocationState}
              setPlaylistSwitchState={setPlaylistSwitchState}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default AudioPlayer2;

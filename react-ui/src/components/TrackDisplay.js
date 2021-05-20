import React, { useRef, useEffect, useState } from "react";
import UseTime from "./UseTime";
import TimeRemaining from "./TimeRemaining";
import UploadingNewImage from "./UploadingNewImage";
import formlessMusicIcon from "../images/formless-music-icon.png";

const TrackDisplay = (props) => {
  const audioBottomPlayhead = useRef();

  const [trackImage, setTrackImage] = useState();

  useEffect(() => {
    if (props.trackArtState) {
      setTrackImage(props.trackArtState);
    } else if (!props.trackArtState) {
      setTrackImage(props.trackArtRef.current);
    }
  }, [props.trackArtState, props.trackArtRef]);

  const { start, timeState, timerBar } = UseTime(
    props.media,
    audioBottomPlayhead
  );

  useEffect(() => {
    start();
  }, [props.play, props.isPlayingState]);

  const [largeImageState, setLargeImageState] = useState("small-image");
  function toglleImageSize() {
    if (largeImageState === "small-image") {
      setLargeImageState("large-image");
      props.setImageTopState(true);
    } else {
      setLargeImageState("small-image");
      props.setImageTopState(false);
    }
  }

  return (
    <>
      <div id={"pl2-track-display"}>
        {props.trackEditState ? (
          <>
            <UploadingNewImage
              currentUser={props.currentUser}
              refreshTrackState={props.refreshTrackState}
              setRefreshTrackState={props.setRefreshTrackState}
              setTrackArtState={props.setTrackArtState}
              setPl2TrackLocationState={props.setPl2TrackLocationState}
              pl2TrackLocationState={props.pl2TrackLocationState}
              trackEditState={props.trackEditState}
              setTrackEditState={props.setTrackEditState}
            />
          </>
        ) : (
          ""
        )}
        <div className={"track-art-c"}>
          <img
            className={`track-art ${largeImageState}`}
            src={`${trackImage}`}
            alt={""}
            onClick={toglleImageSize}
          />
        </div>
        <div id={"pl2-audio__bottom"}>
          <p id={"pl2-audio__top__song-name"}>
            {props.songNameState
              ? props.songNameState
              : `${props.firstTrack ? props.firstTrack.trackname : ""}`}
          </p>
          <p id={"pl2-audio__top__song-artist"}>
            {props.artistNameState ? props.artistNameState : ``}
          </p>

          <div
            className={"pl2-audio__bottom__playhead"}
            ref={audioBottomPlayhead}
          >
            <input
              id={"pl2-playhead-input"}
              ref={props.playHeadSlider}
              type={"range"}
              min={"0"}
              max={"1"}
              step={"0.01"}
              onChange={props.movePlayheadOnClick}
            ></input>
            <div
              className={"pl2-audio__bottom__playhead__left"}
              ref={timerBar}
            ></div>
            <div className="pl2-timer">
              <span id={"pl2-audio__bottom__time__start"}>{timeState}</span>
            </div>
            <TimeRemaining media={props.media} />
          </div>
        </div>
      </div>
    </>
  );
};
export default TrackDisplay;

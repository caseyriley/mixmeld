import React from "react";
import AudioPlayer1 from "./AudioPlayer1";
import AudioPlayer2 from "./AudioPlayer2";

const AudioPlayerSwitch = (props) => {
  return (
    <>
      {(() => {
        switch (
          props.audioSwitchState ? props.audioSwitchState : "AudioPlayer2"
        ) {
          case "AudioPlayer1":
            return <AudioPlayer1 />;
          case "AudioPlayer2":
            return <AudioPlayer2 />;
          default:
            return <div></div>;
        }
      })()}
    </>
  );
};
export default AudioPlayerSwitch;

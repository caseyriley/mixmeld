import React, {useState} from 'react';
import AudioPlayer1 from './AudioPlayer1'

const AudioPlayerSwitch = ()=>{
  const [audioSwitchState, SetAudioSwitchState] = useState("AudioPlayer1");
  return (
    <>
      {(()=>{
        switch(audioSwitchState ? audioSwitchState : "AudioPlayer1") {
          default: 
            return (
              <div></div>
              )
          case "AudioPlayer1":
          return (
            <AudioPlayer1/>
          )
        }
      })()}
     
    </>
  )
}
export default AudioPlayerSwitch;
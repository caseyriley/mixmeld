import React from 'react';
import AudioPlayer1 from './AudioPlayer1'

const AudioPlayerSwitch = (props)=>{
  
  return (
    <>
      {(()=>{
        switch(props.audioSwitchState ? props.audioSwitchState : "AudioPlayer1") {
          case "AudioPlayer1":
          return (
            <AudioPlayer1/>
          )
          default: 
            return (
              <div></div>
              )
        }
      })()}
     
    </>
  )
}
export default AudioPlayerSwitch;
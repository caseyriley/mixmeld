import React from 'react';
import texture from '../images/texture.jpg';

const VolumeKnobUi = (props) => {
  
  return(
    <>
      <div className="control-1">
        <span className="vol-level" ref={props.volumeLevel}></span>
        <div className="volume-control">
          <span className="panel">
          <img src={texture} alt=""/>
          </span>
          <div className={"knob-shadow"} ></div>
          <span className={"knob"} ref={props.volumeKnob}>
          
            <img src={texture} alt=""/>
            
          </span>
          
        </div>
      </div>
    </>
  )
}
export default VolumeKnobUi;
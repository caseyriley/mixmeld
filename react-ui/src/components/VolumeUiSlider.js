import React from 'react';
import texture from '../images/texture.jpg'

const VolumeUiSlider = (props)=> {
  return (
    <div class="control-2">
      <span className="eq eq-2">
        <span className="eq-level" ref={props.volumeFader}>
          <img src={texture} alt=""/>
        </span>
        {/* <span className="text-1">+12DB</span>
        <span className="text-2">-12DB</span> */}
      </span>
      <div className={"pl2-volume-level"} ref={props.volumeLevel}></div>
      <input className={"pl2-slider-input"} type={"range"} min={"0"} max={"100"} step={"1"} ref={props.volumeSlider} onChange={props.changeVolume}></input>
    </div>
  )
}
export default VolumeUiSlider;
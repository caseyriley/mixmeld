import React, {useRef} from 'react';
import texture from '../images/texture.jpg'

const VolumeUiSlider = (props)=> {
  return (
    <div class="control-2">
      <span className="eq eq-2">
        <span className="eq-level">
          <img src={texture} alt=""/>
        </span>
        <span className="text-1">+12DB</span>
        <span className="text-2">-12DB</span>
      </span>
      <input className={"pl2-slider-input"} type={"range"} min={"-136"} max={"136"} step={"1"} ref={props.volumeSlider} onChange={props.changeVolume}></input>
    </div>
  )
}
export default VolumeUiSlider;
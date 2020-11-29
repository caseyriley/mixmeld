import React from 'react';
import texture from '../images/texture.jpg'

const VolumeUiSlider = ()=> {
  return (
    <div class="control-2">
      <span className="eq eq-2">
        <span className="eq-level">
          <img src={texture} alt=""/>
        </span>
        <span className="text-1">+12DB</span>
        <span className="text-2">-12DB</span>
      </span>
    </div>
  )
}
export default VolumeUiSlider;
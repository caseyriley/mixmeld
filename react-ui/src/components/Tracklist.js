import React from 'react';

import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav';
import Afterimage from '../media/Afterimage.wav';
import CanWeHaveFun from '../media/CanWeHaveFun.wav';
import Hyperreal from '../media/Hyperreal.mp3';
import Natures_Joint from '../media/Natures_Joint.mp3';
import Ritual from '../media/Ritual.mp3';
import Tears from '../media/Tears.mp3';

const Tracklist = (props) => {

  return(
    <ul id="playlist">
      <li className="track" onClick={()=>{props.setTrack(CanWeHaveFun)}}><span>Can We Have Fun</span></li>
      <li className="track" onClick={()=>{props.setTrack(Natures_Joint)}}><span>Natures Joint</span></li>
      <li className="track" onClick={()=>{props.setTrack(Tears)}}><span>Tears</span></li>
      <li className="track" onClick={()=>{props.setTrack(psychoTantricJuju)}}><span>Psycho Tantric Juju Jazz</span></li>
      <li className="track" onClick={()=>{props.setTrack(Ritual)}}><span>Ritual</span></li>
      <li className="track" onClick={()=>{props.setTrack(Hyperreal)}}><span>Hyperreal</span></li>
      <li className="track" onClick={()=>{props.setTrack(Afterimage)}}><span>Afterimage</span></li>
    </ul>
  )
}
export default Tracklist;
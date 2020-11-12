import React from 'react';

const Tracklist = (props) => {

  return(
    <ul id="playlist">
      <li className="track" onClick={props.setTrack}><span>Can We Have Fun</span></li>
      <li><a href="http://www.archive.org/download/MoonlightSonata_755/Beethoven-MoonlightSonata.mp3">Moonlight Sonata - Beethoven</a></li>
      <li><a href="http://www.archive.org/download/CanonInD_261/CanoninD.mp3">Canon in D Pachabel</a></li>
      <li><a href="http://www.archive.org/download/PatrikbkarlChamberSymph/PatrikbkarlChamberSymph_vbr_mp3.zip">patrikbkarl chamber symph</a></li>
    </ul>
  )
}
export default Tracklist;
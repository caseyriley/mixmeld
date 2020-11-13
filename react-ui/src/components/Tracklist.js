import React from 'react';
import texture from '../images/texture.jpg';
import psychoTantricJuju from '../media/TrillianGreen-PsychoTantricJujuJazz-01-BhenPaUlRaga.wav';
import Afterimage from '../media/Afterimage.wav';
import CanWeHaveFun from '../media/CanWeHaveFun.wav';
import Hyperreal from '../media/Hyperreal.mp3';
import Natures_Joint from '../media/Natures_Joint.mp3';
import Ritual from '../media/Ritual.mp3';
import Tears from '../media/Tears.mp3';


const trackList1 = [CanWeHaveFun, psychoTantricJuju, Ritual, Natures_Joint,Tears, Afterimage, Hyperreal]
const trackList = [
{track: CanWeHaveFun, name: "Can We Have Fun (In this House Tonight)", artist: "Azekel", duration: "3:35", rating: "🤩", genre: "Neo-Soul"}, 
{track: psychoTantricJuju, name: "BenPaUIRaga", artist: "Trillian Green", duration: "4:53", rating: "🌿", genre: "World"}, 
{track: Ritual, name: "Ritual", artist: "Adam Hurst", duration: "5:19", rating: "🌿", genre: "World"}, 
{track: Natures_Joint, name: "Natures Joint", artist: "((O))", duration: "4:46", rating: "🌊", genre: "Downtempo"}, 
{track: Tears, name: "4 Tears", artist: "Frank Ocean", duration: "1:48", rating: "😭", genre: "Neo-Soul"}, 
{track: Afterimage, name: "Afterimage", artist: "", duration: "4:19", rating: "⭑⭑⭑⭑⭑", genre: "Lo-Fi"}, 
{track: Hyperreal, name: "Hyperreal", artist: "Flume", duration: "4:14", rating: "⭑⭑⭑⭑", genre: "EDM"} 
]


const Tracklist = (props) => {

  return(
    <>
    <div id={"playlist-border"}>
    <img id={"playlist-border__texture"} src={texture} alt=""/>
      <div id={"playlist-c"} >
        <ul id={"playlist-c__track-rating"}>
          <li className={"playlist-c_title"}><h2>Rating</h2></li>
          <li className={"playlist-c__top"}></li>
          {trackList ? trackList.map(audio => {
            return <li className={"playlist-c__track-rating__symbol"}>{audio.rating ? audio.rating : "🎵"}</li>
          }): null}
        </ul>
        <ul id={"playlist-c__track-name"}>
          <li className={"playlist-c_title"}  ><h2>Name</h2></li>
          <li className={"playlist-c__top"}></li>
          {trackList ? trackList.map(audio => {
            return <li className={"playlist-c__track-name__string"} onClick={()=>{props.setTrack(audio.track)}} ><span>{audio.name ? audio.name : "..."}</span></li>
          }): null}
        </ul>
        <ul id={"playlist-c__artist-name"}>
          <li className={"playlist-c_title"}><h2>Artist</h2></li>
          <li className={"playlist-c__top"}></li>
          {trackList ? trackList.map(audio => {
            return <li className={"playlist-c__artist-name__string"}>{audio.artist ? audio.artist : "..."}</li>
          }): null}
        </ul>
        <ul id={"playlist-c__genre-name"}>
          <li className={"playlist-c_title"}><h2>Genre</h2></li>
          <li className={"playlist-c__top"}></li>
          {trackList ? trackList.map(audio => {
              return <li className={"playlist-c__genre-name__string"}>{audio.genre ? audio.genre : "..."}</li>
            }): null}
        </ul>
      </div>
    </div>
    {/* <ul id="playlist">
      <li className="track" onClick={()=>{props.setTrack(CanWeHaveFun)}}><span>Can We Have Fun</span></li>
      <li className="track" onClick={()=>{props.setTrack(Natures_Joint)}}><span>Natures Joint</span></li>
      <li className="track" onClick={()=>{props.setTrack(Tears)}}><span>Tears</span></li>
      <li className="track" onClick={()=>{props.setTrack(psychoTantricJuju)}}><span>Psycho Tantric Juju Jazz</span></li>
      <li className="track" onClick={()=>{props.setTrack(Ritual)}}><span>Ritual</span></li>
      <li className="track" onClick={()=>{props.setTrack(Hyperreal)}}><span>Hyperreal</span></li>
      <li className="track" onClick={()=>{props.setTrack(Afterimage)}}><span>Afterimage</span></li>
    </ul> */}
    </>
  )
}
export default Tracklist;
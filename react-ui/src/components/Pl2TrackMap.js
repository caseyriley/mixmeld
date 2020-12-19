import React from 'react';

const Pl2TrackMap = (props) => {
  function toStandardTime(militaryTime) {
    let first = militaryTime.slice(0,3);
    let last = militaryTime.slice(3);
    let amPm = " am"
    if (Number.parseInt(first) > 12){
      first = Number.parseInt(first) - 12;
      amPm = " pm";
    }
    return `${first}:` + last + amPm;
  }
  return (
    <li name={props.index} className={"pl2-track-ul__li"} key={props.index} >
            <div id={`nti${props.index}`} className={`next-track-info audioId${props.audio.id}`}>{`{"tracklocation":"${props.audio.tracklocation}","trackname":"${props.audio.trackname}","audioId":"${props.audio.id}", "trackartist":"${props.audio.trackartist}", "trackart":"${props.audio.trackart}"}`}</div> 
            <div className={`pl2-track-ul__li__rating ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
            {props.trackEditState ? 
              <>
                <form name={props.audio.id} onSubmit={e=> {e.preventDefault(); props.updateTrackRating(e)}}> 
                  <input 
                    type={"text"}
                    // id={"pl2-track-genre-input"} 
                    id={`genre-${props.index}`} 
                    className={"pl2-track-genre-input"}
                    maxLength={100} 
                    placeholder={props.audio.trackrating ? props.audio.trackrating : ""} 
                  />
                  <input className={"pl2-track-artist-name-submit"} type={"submit"} />
                </form> 
              </> :
              <span className={"pl2-track-artist-rating-span"} onClick={()=>{props.setTrack(props.audio.tracklocation, props.audio.trackname, props.audio.trackartist, props.audio.id, props.audio.trackart)}}>{props.audio.trackrating ? props.audio.trackrating : ""} </span>
              
            }
            </div>

            <div className={`pl2-track-ul__li__name ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
              {props.trackEditState ? 
              <>
                <form className={"pl2-tracklist-form"} name={props.audio.id} onSubmit={e=> {e.preventDefault(); props.updateTrackName(e)}}> 
                  <input 
                    type={"text"}
                    className={"pl2-track-input"} 
                    maxLength={100} 
                    placeholder={props.audio.trackname ? props.audio.trackname : ""} 
                    // value={props.audio.trackname ? props.audio.trackname : ""} 
                  />
                  <input className={"pl2-track-artist-name-submit"} type={"submit"}  />
                </form>
                <img name={props.audio.id} className={"pl2-deleteX"} src={props.deleteX} alt={""} onClick={e=>{props.deleteTrack(e.target.name)}}/>
              </> :
              <span className={"pl2-track-artist-name-span"} onClick={()=>{props.setTrack(props.audio.tracklocation, props.audio.trackname, props.audio.trackartist, props.audio.id, props.audio.trackart)}} >{props.audio.trackname ? props.audio.trackname : ""} </span>

              }
              </div>

            <div className={`pl2-track-ul__li__artist ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
            {props.trackEditState ? 
              <form name={props.audio.id} onSubmit={e=> {e.preventDefault(); props.updateTrackArtistName(e)}}> 
                <input 
                  type={"text"}
                  className={"pl2-track-input"} 
                  maxLength={100} 
                  placeholder={props.audio.trackartist ? props.audio.trackartist : ""} 
                />
                <input className={"pl2-track-artist-name-submit"} type={"submit"} />
              </form> :
              <span className={"pl2-track-artist-span"} onClick={()=>{props.setTrack(props.audio.tracklocation, props.audio.trackname, props.audio.trackartist, props.audio.id, props.audio.trackart)}} >{props.audio.trackartist ? props.audio.trackartist : ""} </span>
            }
            </div>

            <div className={`pl2-track-ul__li__album ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`} >
            {props.trackEditState ? 
              <form name={props.audio.id} onSubmit={e=> {e.preventDefault(); props.updateTrackAlbumName(e)}}> 
                <input 
                  type={"text"}
                  className={"pl2-track-input"} 
                  maxLength={100} 
                  placeholder={props.audio.trackalbum ? props.audio.trackalbum : ""} 
                />
                <input className={"pl2-track-artist-name-submit"} type={"submit"} />
              </form> :
              <span className={"pl2-track-artist-span"} onClick={()=>{props.setTrack(props.audio.tracklocation, props.audio.trackname, props.audio.trackartist, props.audio.id, props.audio.trackart)}} >{props.audio.trackalbum ? props.audio.trackalbum : ""} </span>
            }
            </div>

            <div className={`pl2-track-ul__li__duration ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`}><span>{props.audio.tracktime ? props.audio.tracktime : ""}</span></div>

            <div className={`pl2-track-ul__li__genre ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
            {props.trackEditState ? 
              <form name={props.audio.id} onSubmit={e=> {e.preventDefault(); props.updateTrackGenre(e)}}> 
                <input 
                  type={"text"}
                  className={"pl2-track-input"} 
                  maxLength={100} 
                  placeholder={props.audio.trackgenre ? props.audio.trackgenre: ""} 
                />
                <input className={"pl2-track-artist-name-submit"} type={"submit"} />
              </form> :
              <span className={"pl2-track-genre-span"} onClick={()=>{props.setTrack(props.audio.tracklocation, props.audio.trackname, props.audio.trackartist, props.audio.id, props.audio.trackart)}} >{props.audio.trackgenre ? props.audio.trackgenre: ""} </span>
            }
            </div>

            <div className={`pl2-track-ul__li__date ${props.index % 2 === 1 ? "pl2-dark": "pl2-light"}`}>
              <span className={"pl2-track-genre-span"} onClick={()=>{props.setTrack(props.audio.tracklocation, props.audio.trackname, props.audio.trackartist, props.audio.id, props.audio.trackart)}} >{props.audio.created_date ? props.audio.created_date.slice(5, 16)+ " " + toStandardTime(props.audio.created_date.slice(16, 22)) : ""} </span>
            </div>

          </li>
  )
}
export default Pl2TrackMap;
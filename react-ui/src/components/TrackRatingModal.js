// eslint-disable-next-line no-unused-vars
import React, {useRef} from 'react';
import ReactDom from 'react-dom';
import CloseButton from '../images/CloseButton';



const TrackRatingModal = (props) => {
  
//   useEffect(() => {
//     const mySelect = document.getElementById('my-select')
//     const newOption;
//     const emojRange = [
//       [128512, 129488], [127744, 127895]
//     ];
//     for (const i = 0; i < emojRange.length; i++) {
//       const range = emojRange[i];
//       for (const x = range[0]; x < range[1]; x++) {

//         newOption = document.createElement('option');
//         newOption.value = x;
//         newOption.innerHTML = "&#" + x + ";";
//         console.log('newOption', newOption)
//         if (newOption.codePointAt(0)){
          

//           mySelect.appendChild(newOption);
//         }
//   }

// }
//   },[])
  const ratingNumberSelect = useRef()
  const emojiSelect = useRef()
  const trackRatingInput = useRef()
  const emojiArray = ['⭐️','🎵', '🎶', '😸', '😹', '🙀', '😻', '🐍', '🦄','🦚','🐉','🐲','🐝', '🦋', '🐋', '🦑', '🤬', '🧜🏼‍♂️','🧚🏾‍♂️','🤮','🤑','🌙','👀','💘','💜','💞','💔','💗','♥️', '🧡', '💛','💚','💙','🤎','🤍','🖤', '🔥', '🧨', '💣']

  function rateTrack() {
    trackRatingInput.current.value = emojiSelect.current.value.repeat(ratingNumberSelect.current.value);
  }

  return ReactDom.createPortal(
    <div>
      <div id={"track-rating-modal-background"} onClick={()=>{props.setTrackRatingModalState(false)}}></div>
        <div id={"track-rating-modal-top"}>
          <div id={"track-rating-modal-close-button"} onClick={()=>{props.setTrackRatingModalState(false)}}>
            <CloseButton/>
          </div>         
          <span id={'track-rating-name'}>{props.ratingAudioState.trackname}</span>
          <span className={'track-rating-text'}>Your Rating</span>
          
          <form id={'track-rating-form'} name={props.ratingAudioState.id} onSubmit={e=> {e.preventDefault(); props.updateTrackRating(e)}}> 
            <input 
              ref={trackRatingInput}
              type={"text"}
              // id={"pl2-track-genre-input"} 
              // id={`genre-${index}`} 
              className={"pl2-track-rating-input"}
              maxLength={100} 
              placeholder={props.ratingAudioState.trackrating ? props.ratingAudioState.trackrating : ""} 
            />
            <span className={'track-rating-text'}>pick a number and a emoji to rate your track</span>
            <input id={"pl2-track-genre-input-submit"} type={"submit"} />
            
          </form> 
          <div id={"select-box"}>
            <input ref={ratingNumberSelect} id={"rating-number-input"} type={"number"} max={5} min={0} defaultValue={0} onChange={rateTrack}></input>
            <select ref={emojiSelect} id={"emoji-select"} onChange={rateTrack}>
              {emojiArray.map(emoji => {
                return (
                  <option>{emoji}</option>
                )
                
              })}
            </select>
          </div>
        </div>  
    </div>
  , document.getElementById("track-rating-modal") )
}
export default TrackRatingModal;
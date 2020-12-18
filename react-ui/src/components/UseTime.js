import React, {useState, useRef, useCallback} from 'react';

const UseTime = (media, audioBottomPlayhead) => {

  const [timeState, setTimeState] = useState(":");

  const intervalRef = useRef(null);

  const timerBar = useRef();

  const start = useCallback(() => {

    if (intervalRef.current !== null) {
      return;
    }
    
    intervalRef.current = setInterval(() => {
      if (media){
        let minutes = Math.floor(media.current.currentTime / 60);
        let seconds = Math.floor(media.current.currentTime - minutes * 60);
    
        let minuteValue;
        let secondValue;
      
        if (minutes < 10) {
          minuteValue = '0' + minutes;
        } else {
          minuteValue = minutes;
        }
      
        if (seconds < 10) {
          secondValue = '0' + seconds;
        } else {
          secondValue = seconds;
        }

        let mediaTime = minuteValue + ':' + secondValue;
        setTimeState(mediaTime)
        let barLength = audioBottomPlayhead.current.clientWidth * (media.current.currentTime/media.current.duration);
        timerBar.current.style.width = barLength + 'px';
      }
    }, 500);
    
    
  },[])


  return {start, timeState, timerBar}

}

export default UseTime;
import React, { useEffect, useState } from "react";

const TimeRemaining = (props) => {
  const [startState, setStartState] = useState();
  const [endState, setEndState] = useState();

  useEffect(() => {
    if (props.media.current > 3600) {
      setStartState(11);
      setEndState(8);
    } else {
      setStartState(14);
      setEndState(5);
    }
  });
  return (
    <span className={"pl2-audio__bottom__playhead__time-remaining"}>
      {`${
        props.media.current
          ? new Date(
              (props.media.current.duration
                ? props.media.current.duration -
                  Math.floor(props.media.current.currentTime)
                : 0) * 1000
            )
              .toISOString()
              .substr(startState, endState)
          : 0
      }`}
    </span>
  );
};
export default TimeRemaining;

import React, { useState } from "react";

const useFormatTime = (timeState) => {
  const [startState, setStartState] = useState();
  const [endState, setEndState] = useState();

  if (timeState > 3600) {
    setStartState(11);
    setEndState(8);
  } else {
    setStartState(14);
    setEndState(5);
  }
  const formattedTime = `${
    timeState
      ? new Date((timeState ? timeState : 0) * 1000)
          .toISOString()
          .substr(startState, endState)
      : 0
  }`;
  return { formattedTime };
};
export default useFormatTime;

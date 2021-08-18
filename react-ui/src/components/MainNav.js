import React, { useState } from "react";
import Instructions from "./Instructions";

const MainNav = (props) => {
  const [instructionsModalState, setInstructionsModalState] = useState(false);
  return (
    <div id={"main-nav"} className={"fade-in-2"}>
      {instructionsModalState ? (
        <Instructions setInstructionsModalState={setInstructionsModalState} />
      ) : null}
      <div
        className={"main-nav__option"}
        onClick={() => {
          setInstructionsModalState(true);
        }}
      >
        <span>Instructions</span>
      </div>
      <div
        className={"main-nav__option"}
        onClick={() => {
          localStorage.removeItem("auth_token");
          window.location.reload();
        }}
      >
        <span>Logout</span>
      </div>
    </div>
  );
};
export default MainNav;

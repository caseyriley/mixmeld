import React, { useRef, useEffect } from "react";
import lottie from "lottie-web";

const LiquidMix = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../images/liquidLogo.json"),
    });
  }, []);
  return <div className={"liquid-mix"} ref={container}></div>;
};
export default LiquidMix;

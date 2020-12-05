import React, {useRef, useEffect} from 'react';
import lottie from 'lottie-web';

const LoadingRipples = () => {
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../images/rippleLoadingAnimation.json')
    })
  }, [])
  return(
    <div className="loading-ripples" ref={container}></div>
  )
  
}
export default LoadingRipples;
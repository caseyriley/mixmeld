window.addEventListener('DOMContentLoaded', event => {
  const media = document.querySelector('audio');
  const controls = document.querySelector('.controls');
  const play = document.querySelector('.play');
  const stop = document.querySelector('.stop');





  media.removeAttribute('controls');
  controls.style.visibility = 'visible';

  play.addEventListener('click', playPauseMedia);


  function playPauseMedia() {
    // rwd.classList.remove('active');
    // fwd.classList.remove('active');
    // clearInterval(intervalRwd);
    // clearInterval(intervalFwd);
  
    if(media.paused) {
      play.setAttribute('data-icon','u');
      media.play();
    } else {
      play.setAttribute('data-icon','P');
      media.pause();
    }
  }
})

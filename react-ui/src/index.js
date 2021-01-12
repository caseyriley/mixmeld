import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './styles/login.css';
import './styles/signup.css';
import './styles/audioP1.css';
import './styles/audioP2.css';
import './styles/tracklist2.css';
import './styles/uploadModal.css';
import './styles/newPlaylistModal.css';
import './styles/pl2LeftColumn.css';
import './styles/Playlist2.css';
import './styles/pl2Search.css';
import './styles/pl2AlbumPage.css';
import './styles/pl2ArtistPage.css';
import './styles/TrackRatingModal.css';
import './styles/InstructionsModal.css';
import './styles/mScreenW1050.css';
import './styles/mScreenW950.css';
import './styles/mScreenW850.css';
import './styles/mScreenW750.css';
import './styles/mScreenW650.css';
import './styles/mScreenW550.css';
import './styles/mScreenW515.css';
import './styles/mScreenW450.css';
import './styles/mScreenW350.css';
import './styles/mScreenH700.css';
import './styles/mScreen600.css';
import './styles/MainNav.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
console.log("HIT index.js")
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

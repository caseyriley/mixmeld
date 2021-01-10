CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password BYTEA NOT NULL,
  firstname VARCHAR(40) NOT NULL,
  lastname VARCHAR(40) NOT NULL,
  zipcode VARCHAR(20),
  about VARCHAR(240),
  profile_pic VARCHAR(500),
  banner_pic VARCHAR(500),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  trackname VARCHAR(100) NOT NULL,
  trackartist VARCHAR(100),
  trackalbum VARCHAR(100),
  tracklocation VARCHAR(200) NOT NULL,
  tracktime VARCHAR(7),
  trackrating VARCHAR(10),
  trackgenre VARCHAR(200),
  trackart TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  playlist_name VARCHAR(100) NOT NULL UNIQUE,
  playlist_list TEXT,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  FOREIGN KEY (user_id) REFERENCES users(id) 
);

CREATE TABLE playlists_tracks (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER NOT NULL,
  track_id INTEGER NOT NULL,
  FOREIGN KEY (playlist_id) REFERENCES playlists(id),
  FOREIGN KEY (track_id) REFERENCES tracks(id)
);

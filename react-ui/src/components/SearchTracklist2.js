import React from "react";

const SearchTracklist2 = (props) => {
  return (
    <div id={"pl2-search-c"}>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Track Name</h1>
        </div>
        <div className={"pl2-search-scroll"}>
          {props.queryState
            ? props.queryState[0].map((track) => {
                return (
                  <div className={"pl2-search-track-span-c"}>
                    <span
                      onClick={() => {
                        props.setTrackViaSearch(
                          track.tracklocation,
                          track.trackname,
                          track.trackartist,
                          track.id,
                          track.trackart,
                          "Tracklist2"
                        );
                        props.scrollToThis(`audioId${track.id}`);
                      }}
                    >
                      {track["trackname"]}
                    </span>
                  </div>
                );
              })
            : null}
          <div className={"pl2-search-scroll-bottom"}></div>
        </div>
      </div>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Artist Name</h1>
        </div>
        <div className={"pl2-search-scroll"}>
          {props.queryState
            ? props.queryState[1].map((track) => {
                return (
                  <div className={"pl2-search-artist-span-c"}>
                    <span
                      onClick={() => {
                        props.setTrackViaSearch(
                          track.tracklocation,
                          track.trackname,
                          track.trackartist,
                          track.id,
                          track.trackart,
                          "Pl2ArtistPage"
                        );
                        props.scrollToThis2(`audioId${track.id}`);
                      }}
                    >
                      {track["trackartist"]}
                    </span>
                  </div>
                );
              })
            : null}
          <div className={"pl2-search-scroll-bottom"}></div>
        </div>
      </div>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Album Name</h1>
        </div>
        <div className={"pl2-search-scroll"}>
          {props.queryState
            ? props.queryState[2].map((track) => {
                return (
                  <div className={"pl2-search-album-span-c"}>
                    <span
                      onClick={() => {
                        props.setTrackViaSearch(
                          track.tracklocation,
                          track.trackname,
                          track.trackartist,
                          track.id,
                          track.trackart,
                          "Pl2AlbumPage"
                        );
                        props.scrollToThis3(`audioId${track.id}`);
                      }}
                    >
                      {track["trackalbum"]}
                    </span>
                  </div>
                );
              })
            : null}
          <div className={"pl2-search-scroll-bottom"}></div>
        </div>
      </div>
    </div>
  );
};
export default SearchTracklist2;

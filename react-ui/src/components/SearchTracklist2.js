import React from 'react';

const SearchTracklist2 = (props) => {

  return (
    <div id={"pl2-search-c"}>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Track Name</h1>
        </div>
        {props.queryState ? props.queryState[0].map(match => {
          return (
            <div>
              <span>{match}</span>
            </div> 
          )
         
        })
        
        : null}
      </div>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Artist Name</h1>
        </div>
        {props.queryState ? props.queryState[1].map(match => {
          return (
            <div>
              <span>{match}</span>
            </div> 
          )
         
        })
        
        : null}
      </div>
      <div className={"pl2-search-column"}>
        <div className={"pl2-search-column__top"}>
          <h1>Album Name</h1>
        </div>
        {props.queryState ? props.queryState[2].map(match => {
          return (
            <div>
              <span>{match}</span>
            </div> 
          )
         
        })
        
        : null}
      </div>
    </div>
  )
}
export default SearchTracklist2;
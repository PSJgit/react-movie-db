import React from 'react'
import {monthStrArr} from '../js/utils.js' 

const FilmPoster = (props) => {
  // format date
  const dateArr = props.fullReleaseDate.split('-')
  const month = monthStrArr[parseInt(dateArr[1])-1]
  const year = dateArr[0]
  return (
    <div id={props.id}>
      <img src={props.poster}/>
      <p>{props.film}</p>
      <p>{month} {year}</p>
    </div>
  )
}

export default FilmPoster
import React from 'react'
import {monthStrArr} from '../js/utils.js' 

const FilmPoster = (props) => {
  // format date
  const dateArr = props.fullReleaseDate.split('-')
  const month = monthStrArr[parseInt(dateArr[1])-1]
  const year = dateArr[0]
  // format score
  const score = props.score * 10 + '%'

  return (
    <div id={props.id}>
      <img src={props.poster}/>
      <p>{props.film}</p>
      <p>{month} {year}</p>
      <div id='user-rating'>
        <p>{score}</p>
      </div>
    </div>
  )
}

export default FilmPoster
import React, { useState } from 'react'
import {monthStrArr} from '../js/utils.js' 

const FilmPoster = (props) => {
  
  const [imgLoaded, setImgLoaded] = useState(false)

  // format date
  const dateArr = props.fullReleaseDate.split('-')
  const month = monthStrArr[parseInt(dateArr[1])-1]
  const year = dateArr[0]

  // format score
  const score = props.score * 10 + '%'

  return (
    <div id={props.id} className='film-poster'>
      <div className={'image-container '}>
        {
          imgLoaded ?
            null
          : 
            <div className='placeholder-img'></div>
        }
        <img
          style={imgLoaded ? {} : {opacity: '0.2'}} 
          src={props.poster}
          onLoad={ () => setImgLoaded(true) }
        />

      </div>
      <p>{props.film}</p>
      <p>{month} {year}</p>
      <div id='user-rating'>
        <p>{score}</p>
      </div>
    </div>
  )
}

export default FilmPoster
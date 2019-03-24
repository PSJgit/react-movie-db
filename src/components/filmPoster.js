import React, { useState } from 'react'
import { monthStrArr } from '../js/utils.js' 
import posterError from '../images/poster-error.jpg'

const FilmPoster = (props) => {
  
  const [imgLoaded, setImgLoaded] = useState(false)

  // format date
  const dateArr = props.fullReleaseDate.split('-')
  const month = monthStrArr[parseInt(dateArr[1])-1]
  const year = dateArr[0]

  // format score and color
  const score = props.score * 10
  const scoreStyle = {}
  if (score >= 70) {
    scoreStyle.background = '#01D277'
  } else if (score >= 40) {
    scoreStyle.background = '#4902A3'
  } else {
    scoreStyle.background = '#D1225B' 
  }

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
          onError={(e)=>{e.target.onerror = null; e.target.src=posterError}}
        />

      </div>
      <p className='film-title'>{props.film}</p>
      <p className='sub'>{month} {year}</p>
      <div className='user-rating' style={scoreStyle}>
        <p>{score}%</p>
      </div>
    </div>
  )
}

export default FilmPoster
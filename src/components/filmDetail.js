import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import fetchApiData from '../js/apiRequests.js'

const FilmDetail = (props) => {
  //console.log('FilmDetail', props)
  /* need to get backer img, 
                 poster img,
                 title,
                 year,
                 userScore,
                 runtime,
                 overview,

  */

  const [status, updateStatus] = useState({loaded:false, error: null})


  useEffect(() => {

    console.log('detail component mounted')

    if (status.loaded === false) {

        const arr = JSON.parse(props.data)
        const idFromProps = parseInt(props.match.params.id.slice(1))
        const matchedId = arr.filter( value => value.id === idFromProps)

        fetchApiData(`https://api.themoviedb.org/3/movie/${idFromProps}?api_key=${appConfig.KEY}&language=en-US`)
          .then(data => console.log(data))
          .then(data => updateStatus({...status, loaded:true}))
          .catch(error => updateStatus({...status, error: error}))

    }
    return () => {
      console.log('unmounting detail component...')
    }
  }, [])  // empty arr here for mount/unmount only
  
  console.log(status)

  if (status.error) { 
    return <p>{status.error.message}</p> 
  } else if (status.loaded) { 
    return <p>temp loading msg</p> 
  } else {
    return (
      <div id='film-detail'>
        <NavLink to='/' exact={true}>
          <button>temp back</button>
        </NavLink>
        
        <p>Film id is {props.match.params.id}</p>
      </div>
    )
  }
}

export default FilmDetail
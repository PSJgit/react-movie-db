import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import fetchApiData from '../js/apiRequests.js'
import {monthStrArr} from '../js/utils.js' 

const FilmDetail = (props) => {

  const [state, updateState] = useState({data: {}, loading: true, error: null})

  useEffect(() => {

    console.log('detail component mounted')

    // we need: 'runtime', 'backdrop_path', 'poster_path', 'title', 'release_date', 'vote_average'  
    if (state.loading === true) {

        // we're not storing this data, so put all of it into state
        const dataFromProps = JSON.parse(props.pageData)
        const idFromProps = parseInt(props.match.params.id.slice(1))
        const matchedId = dataFromProps.filter( value => value.id === idFromProps)

        fetchApiData(`https://api.themoviedb.org/3/movie/${idFromProps}?api_key=${appConfig.KEY}&language=en-US`)
          .then(data => updateState({...state, ...data, loading: false}))
          .catch(error => updateState({...state, error: error}))
    }
    return () => {
      console.log('unmounting detail component...')
    }
  }, [])  // empty arr here for mount/unmount only

//<img src={`${baseURL}${imgSize}${pageData[i].poster_path}`}`/>
  const parsedConfig = JSON.parse(props.pageConfig)
  const baseURL = parsedConfig.images.secure_base_url
  const backdropSize = parsedConfig.images.backdrop_sizes[2]
  const posterSize = parsedConfig.images.poster_sizes[2]

  const hours = state.runtime/60
  const hoursRounded = Math.floor(hours)
  const minutes = Math.floor((hours - hoursRounded) * 60)

  if (state.error) { 
    return <p>{state.error.message}</p> 
  } else if (state.loading) { 
    return <p>temp loading msg</p> 
  } else {
    return (
      <div id='film-detail'>
        <NavLink to='/' exact={true}>
          <button>temp back</button>
        </NavLink>
        <div id='backdrop'>
          <img src={`${baseURL}${backdropSize}${state.backdrop_path}`}/>
        </div>
        <div id='poster'>
          <img src={`${baseURL}${posterSize}${state.poster_path}`}/>
        </div>  

        <p>Film id is {props.match.params.id}</p>
        <div id='details'>
          <p>{state.title}</p>
          <p>{state.release_date.split('-')[0]}</p>
          <p>{state.vote_average * 10 + '% User score'}</p>
          <p>{`${hoursRounded}h ${minutes} mins`}</p>
        </div>

        <div id='overview'>
          <p>{state.overview}</p>
        </div>
      
      </div>
    )
  }
}

export default FilmDetail
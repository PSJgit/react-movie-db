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

  const [status, updateStatus] = useState({data: {}, loading: true, error: null})

  useEffect(() => {

    console.log('detail component mounted')

    if (status.loading === true) {

        // we only need one thing from the detail api call, so trim down the data
        let dataResultsObj = {}
        const dataFromProps = JSON.parse(props.data)
        const idFromProps = parseInt(props.match.params.id.slice(1))
        const matchedId = dataFromProps.filter( value => value.id === idFromProps)

        fetchApiData(`https://api.themoviedb.org/3/movie/${idFromProps}?api_key=${appConfig.KEY}&language=en-US`)

          .then((data) => {
            for (let key in data) { 
              if (key === 'runtime'){
                dataResultsObj[key] = data[key]
                break
              }
            }
            updateStatus({...status, data: dataResultsObj, loading: false})
          })
          .catch(error => updateStatus({...status, error: error}))
    }
    return () => {
      console.log('unmounting detail component...')
    }
  }, [])  // empty arr here for mount/unmount only
  
  console.log(status)
//<img src={`${baseURL}${imgSize}${pageData[i].poster_path}`}`/>
  // get data needed for display
/*  const pageData = this.state.pageData
  const baseURL = this.state.pageConfig.images.secure_base_url
  const imgSize = this.state.pageConfig.images.poster_sizes[2]*/

  if (status.error) { 
    return <p>{status.error.message}</p> 
  } else if (status.loading) { 
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
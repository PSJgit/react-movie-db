import React, { useState, useEffect, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid' // usage = uuid.v4()
import tempData from '../data/tempData.js'
import fetchApiData, {apiConfig} from '../js/apiRequests.js'
import GetSVG, { EmailSVG } from './svgs.js'

import Section from './section.js'
import FilmPoster from './filmPoster.js'
import FilmDetail from '../components/filmDetail.js'


/* MAIN APP
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export default class App extends React.Component { 

  constructor(props){
    super(props)
    this.state = this.initialState()
  }
  
  initialState() {
    return {
      pageConfig: [],
      pageData: [],
      loading: true,
      error: null,
      apiRequestActive: false,
      apiRequestCount: 0
    }
  }

  clearState() {
    const state = this.initialState()
    this.setState({
      ...state
    })
    sessionStorage.setItem(...state)
  }

  loadStateFromSessionStorage() {
    for (let key in this.state) {
      if (sessionStorage.hasOwnProperty(key)) {
        let value = sessionStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState({ [key]: value })
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value })
        }
      }
    }
    console.log('local session loaded into state', this.state)
  }

  saveStateToSessionStorage() {
    console.log('saving to session storage...')
    for (let key in this.state) {
      sessionStorage.setItem(key, JSON.stringify(this.state[key]))
    }
  }

  handleScroll() {
    const { error, apiRequestActive } = this.state

    if (error || apiRequestActive) return

    if ( window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight ) { 

      const configObjs = apiConfig(this.state.apiRequestCount + 1)

      this.setState({apiRequestActive: true})

      fetchApiData(configObjs.data).then(data => this.trimData(data))
      .catch(error => this.setState({ error, isLoading: false }))
    }
  }
  
  trimData(data) {

    let dataResultsArr = []
    // trim the data to what we need
    data.results.map( (elem, index) => {
      dataResultsArr.push({
        id: elem.id,
        title: elem.title, 
        vote_average: elem.vote_average,
        poster_path: elem.poster_path,
        release_date: elem.release_date
      })
    })
    this.setState( (prevState) => ({ 
      pageData: prevState.pageData.concat(dataResultsArr),
      loading: false,
      apiRequestActive: false,
      apiRequestCount: prevState.apiRequestCount + 1
    }))
    this.saveStateToSessionStorage()
    console.log('saved sessionStorage', sessionStorage)
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveStateToSessionStorage.bind(this)
    )
    window.removeEventListener('scroll', this.handleScroll.bind(this))

    // saves if component has a chance to unmount
    this.saveStateToSessionStorage()
  }

  componentDidMount() {

    window.addEventListener('scroll', this.handleScroll.bind(this))
    // add event listener to save state to localStorage - when user leaves/refreshes the page
    window.addEventListener('beforeunload', this.saveStateToSessionStorage.bind(this))
    
    if (sessionStorage.length === 0) {
      this.setState({apiRequestActive: true})
      // api config and calls
      const configObjs = apiConfig()
      fetchApiData(configObjs.config).then(data => this.setState({ pageConfig: data }))
      fetchApiData(configObjs.data).then(data => this.trimData(data))
      .catch(error => this.setState({ error, isLoading: false }))
    } else {
      this.loadStateFromSessionStorage()
    } 
    console.log('----------- component mounted', this.state)
  }

  componentDidUpdate() {
    console.log('----------- component updated', this.state)
  }

  /* Render
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  render() {
    // show if we're loading data, or failed to load data
    const { loading, error } = this.state
    const filmComponentArr = []
    const filmDetailComponentArr = []
    
    if (error) { 
      return <p>{error.message}</p> 
    } else if (loading) { 
      return <p>temp loading msg</p> 
    } else {
      // if no error and load is finished, push data to components
      const pageData = this.state.pageData
      const baseURL = this.state.pageConfig.images.secure_base_url
      const imgSize = this.state.pageConfig.images.poster_sizes[2]

      for (var i = 0; i < pageData.length; i++) {

        let linkId = pageData[i].id
        filmComponentArr.push(
          <NavLink key={i} to={`/filmDetail:${linkId}`} exact={true}>
            <FilmPoster 
              key={uuid.v4()} 
              id={`film-${i}`}
              film={pageData[i].title} 
              poster={`${baseURL}${imgSize}${pageData[i].poster_path}`}
              fullReleaseDate={pageData[i].release_date}
              score={pageData[i].vote_average}
            />
          </NavLink>
        )
      }
    } 

    return (
      <Fragment>

        <Section title='Popular Movies' className='movies-list grid'>
          {filmComponentArr}
        </Section> 
        
      </Fragment>
    )

  }
}




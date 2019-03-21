import React, { useState, useEffect, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid' // usage = uuid.v4()
import tempData from '../data/tempData.js'
import fetchApiData, {apiConfig} from '../js/apiRequests.js'
import GetSVG, { EmailSVG } from './svgs.js'

import Section from './section.js'
import FilmPoster from './filmPoster.js'


/* Plan

router will handle browser history - so parent components for each view 

initial component - dashbaord
dashboard = {
  
  component = container
  component = search 
  component = (displayed in grid) film poster, title, release date + user score
            on click = route change, load in detail component
            detail component = film poster, film backer, title, release year, user score, run time 
                              on click, can revert route back to dash
}*/


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
      error: null
    }
  }

  clearState() {
    const state = this.initialState()
    this.setState({
      ...state
    })
  }

  componentDidMount() {
    const configObjs = apiConfig()
    fetchApiData(configObjs.config).then(data => this.setState({ pageConfig: data }))
    fetchApiData(configObjs.data)
      .then(data => this.setState({ pageData: data, loading: false }))
      .catch(error => this.setState({ error, isLoading: false }))


    console.log('----------- component mounted', this.state)
  }

  componentDidUpdate() {
    console.log('----------- component updated', this.state)
  }


  /* Click Events
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  

  /* Render
  –––––––––––––––––––––––––––––––––––––––––––––––––– */

  render() {
    // show if we're loading data, or failed to load data
    const { loading, error } = this.state
    const resultsArr = []
    const filmComponentArr = []

    if (error) { 
      return <p>{error.message}</p> 
    } 
    else if (loading) { 
      return <p>temp loading msg</p> 
    }
    else {
      // if no error and load is finished, push data to components
      const results = this.state.pageData.results
      const baseURL = this.state.pageConfig.images.secure_base_url
      const imgSize = this.state.pageConfig.images.poster_sizes[0]

      for (var i = 0; i < results.length; i++) {
        resultsArr.push((results[i]))
        console.log(results[i].popularity)
        filmComponentArr.push(
          <FilmPoster 
            key={i} 
            id={`film-${i}`}
            film={results[i].title} 
            poster={`${baseURL}${imgSize}${results[i].poster_path}`}
            fullReleaseDate={results[i].release_date}
          />
        )
      }
    } 


    return (
      <Fragment>

        <h1>Basic react/ router/ babel/ webpack</h1>
        <NavLink to='/temp' exact={true}>temp</NavLink>
        <GetSVG tag='EmailSVG' className='svg-med'/>  
        <Section title='Popular Movies' className='movies-list'>
          {filmComponentArr}
        </Section> 
        
      </Fragment>
    )

  }
}



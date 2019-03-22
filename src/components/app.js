import React, { useState, useEffect, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid' // usage = uuid.v4()
import tempData from '../data/tempData.js'
import fetchApiData, {apiConfig} from '../js/apiRequests.js'
import GetSVG, { EmailSVG } from './svgs.js'

import Section from './section.js'
import FilmPoster from './filmPoster.js'
import FilmDetail from '../components/filmDetail.js'

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
    localStorage.setItem(...state)
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  loadStateFromLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
    console.log('local storage loaded into state', this.state)
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  componentDidMount() {
    
    if (localStorage.length === 0) {
      // add event listener to save state to localStorage - when user leaves/refreshes the page
      window.addEventListener('beforeunload', this.saveStateToLocalStorage.bind(this))

      // api config and calls
      const configObjs = apiConfig()
      fetchApiData(configObjs.config).then(data => this.setState({ pageConfig: data }))
      fetchApiData(configObjs.data).then((data) => {

        // trim the data to what we need
        let dataResultsArr = []
        data.results.map( (elem, index) => {
          dataResultsArr.push({
            id: elem.id,
            title: elem.title, 
            vote_average: elem.vote_average,
            poster_path: elem.poster_path,
            backdrop_path: elem.backdrop_path, 
            release_date: elem.release_date,
            overview: elem.overview
          })
        })
        this.setState({ 
          pageData: dataResultsArr,
          loading: false 
        })
      })
      .catch(error => this.setState({ error, isLoading: false }))
    } else {
      this.loadStateFromLocalStorage()
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
      const imgSize = this.state.pageConfig.images.poster_sizes[0]

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

        <h1>Basic react/ router/ babel/ webpack</h1>
        <GetSVG tag='EmailSVG' className='svg-med'/>  
        <Section title='Popular Movies' className='movies-list'>
          {filmComponentArr}
        </Section> 
        
      </Fragment>
    )

  }
}




import React, { useState, useEffect, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import uuid from 'uuid' // usage = uuid.v4()
import tempData from '../data/tempData.js'
import fetchApiData, {apiConfig} from '../js/apiRequests.js'
import GetSVG, { EmailSVG } from './svgs.js'


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
    const componentArr = []

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
        componentArr.push(<Test key={i} film={results[i].title} poster={`${baseURL}${imgSize}${results[i].poster_path}`}/>)
      }
    } 

    console.log( resultsArr)
    return (
      <Fragment>

        <h1>Basic react/ router/ babel/ webpack</h1>
        <NavLink to="/temp" activeClassName="is-active" exact={true}>temp</NavLink>
        <GetSVG tag='EmailSVG' className='svg-med'/>   
        {componentArr}
      </Fragment>
    )

  }
}


const Test = (props) => {
  console.log(props)
  return (
    <Fragment>
      <p>{props.film}</p>
      <img src={props.poster}/>
    </Fragment>
  )
}
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
    const { loading, error } = this.state;

    if (error) {
      return (
        <p>{error.message}</p>
      )
    } 

    if (loading) {
      return <p>temp loading msg</p>
    } 

    return (
      <Fragment>
        <h1>Basic react/ router/ babel/ webpack</h1>
        <NavLink to="/temp" activeClassName="is-active" exact={true}>temp</NavLink>
        <GetSVG tag='EmailSVG' className='svg-med'/>   
      </Fragment>
    )

  }
}

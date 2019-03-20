import React, { useState, useEffect, Fragment } from 'react'
import uuid from 'uuid' // usage = uuid.v4()
import tempData from './data/tempData.js'
import CheckBrowser from './components/checkBrowser.js'
import GetSVG, { EmailSVG } from './components/svgs.js'


/* MAIN APP
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export default class App extends React.Component { 

  constructor(props){
    super(props)
    this.state = this.initialState()

  }
  
  initialState() {
    return {
      tempData: tempData
    }
  }

  clearState() {
    const state = this.initialState()
    this.setState({
      ...state
    })
  }

  componentDidMount() {
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
   
    return (
      <Fragment>

        <CheckBrowser isSupported={this.props.isSupported}/>

        <h1>Basic react/ babel/ webpack</h1>

        <GetSVG tag='EmailSVG' className='svg-med'/>


   
      </Fragment>
    )
  }
}

import React, { useState, Fragment } from 'react'
import fetchApiData, {apiConfig} from '../js/apiRequests.js'
import GetSVG, { Magnify } from './svgs.js'

const SearchBar = (props) => {
  	
  	const [input, updateInput] = useState('')

	 	const handleInput = (e) => {
	 		updateInput(e.target.value.toLowerCase())
	 	}

  return (
  	<div id='input-container'>
	    <input type='text' 
	    			 value={input} 
	    			 onChange={handleInput} 
	    			 onKeyPress={(e) => { if (e.key === 'Enter') { props.handleSearch(input)} } } 
	    			 placeholder='Search'></input>
	    <button id='submit-icon' onClick={() => props.handleSearch(input)}>
	    		<GetSVG tag='Magnify'/>
	    </button>
  	</div>
  )
}

export default SearchBar

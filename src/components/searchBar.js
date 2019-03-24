import React, { useState, Fragment } from 'react'
import fetchApiData, {apiConfig} from '../js/apiRequests.js'

const SearchBar = (props) => {
  	
  	const [input, updateInput] = useState('')

	 	const handleInput = (e) => {
	 		updateInput(e.target.value.toLowerCase())
	 	}

  return (
  	<Fragment>
    <p>searchBar</p>
    <input type='text' 
    			 value={input} 
    			 onChange={handleInput} 
    			 onKeyPress={(e) => {
    			 		if (e.key === 'Enter') {
    			 			props.handleSearch(input)}
    			 		}
    			 } 
    			 placeholder='Search'></input>
    <button id='submit-icon' onClick={() => props.handleSearch(input)}>sub</button>
  	</Fragment>
  )
}

export default SearchBar

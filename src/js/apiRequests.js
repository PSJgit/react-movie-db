
/* API
–––––––––––––––––––––––––––––––––––––––––––––––––– */

let data, config

// config options for api call

const sortBy = [ 
	'popularity',  
	'release_date', 
	'revenue', 
	'primary_release_date',
	'original_title',
	'vote_average',
	'vote_count'
]

const ascDesc = [
	'asc',
	'desc'
]

let page = 1

export const apiConfig = () => {
	try {
		//details = `https://api.themoviedb.org/3/movie/${id}?api_key=${appConfig.KEY}&language=en-US`
		config = `https://api.themoviedb.org/3/configuration?api_key=${appConfig.KEY}`
		data = `https://api.themoviedb.org/3/discover/movie?api_key=${appConfig.KEY}&language=en-US&sort_by=${sortBy[0]}.${ascDesc[1]}&include_adult=false&include_video=false&page=${page}`
	} catch(err) {
		console.warn('No Api Key provided', err )
	}

	return {
		config,
		data
	}
}


const fetchApiData = async (request) => {

	if (request) {
		const response = await fetch(request)
		if (response.status === 200) {
			console.warn('request made')
			const data = await response.json()
			return data
		}
	} else {
		throw new Error('No connection to API')
		return 'no data'
	}
	
}


/*const loadAllData = async () => {
	let apiConfig = await fetchApiData(config)
	let apiData = await fetchApiData(data)

	//console.log(apiConfig, apiData)

	// get the url for a poster img
	let url = apiConfig.images.secure_base_url
	let size = apiConfig.images.poster_sizes[6]
	let imgPath = apiData.results[0].poster_path

	for (let i = 0; i < apiData.results.length; i++) {
		console.log(apiData.results[i])
		console.log(`${url}${size}${apiData.results[i].poster_path}`)
	}

	//console.log(`${url}${size}${imgPath}`)
}
*/


export default fetchApiData



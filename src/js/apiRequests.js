
/* API
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// !!!!!!! Add a key for the api below


let data, config
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


try {
	// example api call
	config = `https://api.themoviedb.org/3/configuration?api_key=${appConfig.KEY}`
	data = `https://api.themoviedb.org/3/discover/movie?api_key=${appConfig.KEY}&language=en-US&sort_by=${sortBy[0]}.${ascDesc[1]}&include_adult=false&include_video=false&page=${page}`
} catch(err) {
	console.warn('No Api Key provided', err )
}

const fetchApiData = async (type) => {
	
	if (type) {
		try {
			const response = await fetch(type)
			if (response.status === 200) {
				const data = await response.json()
				return data
			} 
		} catch (err) {
			//console.warn(err)
		}
	} else {
		return undefined
	}
	
}

const loadAllData = async () => {
	let apiConfig = await fetchApiData(config)
	let apiData = await fetchApiData(data)

	//console.log(apiConfig, apiData)

	// get the url for a poster img
	let url = apiConfig.images.secure_base_url
	let size = apiConfig.images.poster_sizes[6]
	let imgPath = apiData.results[0].poster_path

	for (let i = 0; i < apiData.results.length; i++) {
		/*console.log(apiData.results[i])
		console.log(`${url}${size}${apiData.results[i].poster_path}`)*/
	}

	//console.log(`${url}${size}${imgPath}`)
}

loadAllData()


export default fetchApiData



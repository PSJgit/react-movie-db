
import React, {Fragment} from 'react'

class GetSVG extends React.Component {
    components = {
        Magnify,
        Arrow,
        TmdbLines,
        TmdbLogo
    }
    render() {
       const TagName = this.components[this.props.tag]
       return <TagName className={this.props.className}/>
    }
}

export const Arrow = (props) => {
	return (
		<Fragment>
			<svg width="18" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd" clipRule="evenodd" d="M18 8.349v2.302H4.316l6.263 6.58L9 18.874 0 9.5 9 .125l1.632 1.645-6.316 6.579H18z" fill="#fff"/>
			</svg>
		</Fragment>
	)
}

export const Magnify = (props) => {
	return (
		<Fragment>
			<svg fill="none" role="img" className={props.className}>
				<path fillRule="evenodd" clipRule="evenodd" d="M12.096 10.859l3.794 3.793a.375.375 0 0 1 0 .532l-.706.706a.375.375 0 0 1-.532 0l-3.793-3.794a.384.384 0 0 1-.11-.265v-.413A6.499 6.499 0 0 1 0 6.5C.001 2.91 2.91 0 6.5 0a6.499 6.499 0 0 1 4.92 10.75h.412c.1 0 .193.037.265.109zM1.5 6.499c0 2.763 2.237 5 5 5 2.762 0 5-2.237 5-5 0-2.762-2.238-5-5-5-2.763 0-5 2.238-5 5z" fill="#01D277"/>
			</svg>
		</Fragment>
	)
}

export const TmdbLines = (props) => {
	return (
		<Fragment>
			<svg width="375" height="193" fill="none" role="img" className={props.className}>
				<rect x="279" y="30.551" width="162" height="4" rx="2" transform="rotate(-45 279 30.551)" fill="#01D277" fillOpacity=".83"/>
				<rect x="268" y="66.551" width="162" height="4" rx="2" transform="rotate(-45 268 66.551)" fill="#01D277" fillOpacity=".83"/>
				<rect x="241" y="189.551" width="162" height="4" rx="2" transform="rotate(-45 241 189.551)" fill="#01D277" fillOpacity=".83"/>
				<rect x="-8" y="183.551" width="162" height="4" rx="2" transform="rotate(-45 -8 183.551)" fill="#01D277" fillOpacity=".83"/>
				<rect x="23" y="48.551" width="162" height="4" rx="2" transform="rotate(-45 23 48.551)" fill="#01D277" fillOpacity=".83"/>
				<rect x="23" y="21.551" width="162" height="4" rx="2" transform="rotate(-45 23 21.551)" fill="#01D277" fillOpacity=".83"/>
			</svg>
	  </Fragment>
 	)
}

export const TmdbLogo = (props) => {
	return (
		<Fragment>
			<svg aria-label="tmdb Logo" fill="none" role="img" className={props.className}>
				<path fillRule="evenodd" clipRule="evenodd" d="M59.572 55.142c3.834 0 6.428-2.616 6.428-6.482V6.482C66 2.616 63.406 0 59.572 0H6.428C2.595 0 0 2.616 0 6.482V59l3.298-3.855V6.482c.003-1.742 1.403-3.153 3.13-3.156h53.144c1.727.003 3.127 1.414 3.13 3.156V48.66c-.003 1.742-1.403 3.153-3.13 3.156H11.32l-3.298 3.326-.021-.027" fill="#01D277"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M16.14 20h1.72v-7.21H20V11h-6v1.79h2.14V20zM26.284 20H28v-9h-1.716v3.599h-2.568V11H22v9h1.716v-3.602h2.568V20zM35 18.198h-3.26v-1.8h2.784V14.6H31.74v-1.8h3.112V11H30v9h5v-1.802zM18.006 26.892L14.561 23H14v9h1.772v-4.947l2.234 2.38 2.235-2.38-.01 4.947H22v-9h-.549l-3.445 3.892zM28.5 23c-6 0-6 9 0 9s6-9 0-9zm0 7.194c-3.487 0-3.487-5.397 0-5.397s3.487 5.396 0 5.396z" fill="#01D277"/>
				<path fill="#01D277" d="M43 23h2v9h-2z"/>
				<path fillRule="evenodd" clipRule="evenodd" d="M48.739 30.2v-1.8h2.785v-1.8h-2.785v-1.8h3.113V23H47v9h5v-1.8h-3.261zM14 35h2.616c5.845 0 5.845 9 0 9H14v-9zm1.756 7.2h.86c3.414 0 3.414-5.4 0-5.4h-.86v5.4zM28.102 39.499c.545-.389.778-1.093.8-1.772C28.94 36.142 27.98 35 26.438 35H23v9h3.438a2.54 2.54 0 0 0 1.823-.801c.481-.508.747-1.192.739-1.903a2.207 2.207 0 0 0-.898-1.797zm-3.353-2.704h1.544a.897.897 0 0 1 .812.906c0 .476-.354.87-.812.907h-1.544v-1.813zm0 5.405h1.544v.003a.848.848 0 0 0 .621-.263.91.91 0 0 0 .252-.644.9.9 0 0 0-.253-.639.838.838 0 0 0-.62-.254h-1.544V42.2zM37.501 27.758L35.102 23H33l4.297 9h.409L42 23h-2.102L37.5 27.758z" fill="#01D277"/>
			</svg>
	  </Fragment>
 	)
}

export default GetSVG
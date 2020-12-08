import React from 'react';
import './Loader.css'

export default function Loader(props) {
	return (
		<div className={props.className} id="Loader">
			<div className="spinner-border text-primary" role="status">
				<p>Loading...</p>
			  	<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}
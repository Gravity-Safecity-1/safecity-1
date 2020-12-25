import React from 'react';
import './Worning.css';
import {Link} from 'react-router-dom'

export default function Worning(props) {
	
	return (
		<div className={props.className} id="Worning">
			<Link to="/" className="img-worn-wrapper">
				<div>
					<img src="images/warn.png" alt="" className="img-fluid" />
				</div>
				<div>
					<h1 className="text-center mt-4">404 not faund</h1>
				</div>
			</Link>
		</div>
	)
}
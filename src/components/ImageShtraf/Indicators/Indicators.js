import React from 'react'

export default function Indicators(props) {
	return (
		<>
			<li data-target="#carouselExampleIndicators" data-slide-to={props.nSlide} className={props.indClass}></li>
		</>
	)
}
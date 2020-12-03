import React from 'react'
import './Natification.css'

export default function Natification({src ,name, soName ,shtrafName ,time}) {
	return (
		<div className="row my-4" id="nat-n">
			<div className="col-3">
				<img src={src} className="" alt="" />
			</div>
			<div className="col-6 px-1">
				<h6>{name} {soName}</h6>
				<h6>
					<span>{shtrafName}</span>
				</h6>
			</div>
			<div className="col-3">
				<svg className="mr-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.00016 9.16668C7.30135 9.16668 9.16683 7.3012 9.16683 5.00001C9.16683 2.69882 7.30135 0.833344 5.00016 0.833344C2.69898 0.833344 0.833496 2.69882 0.833496 5.00001C0.833496 7.3012 2.69898 9.16668 5.00016 9.16668Z" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M5 2.5V5L6.66667 5.83333" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				<small>{time} мин</small>
			</div>
		</div>
	)
}
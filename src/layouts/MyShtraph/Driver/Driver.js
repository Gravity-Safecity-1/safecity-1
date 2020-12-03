import React from 'react';
import './Driver.css';

export default function Driver(props) {
	return (
		<div className="col-lg-8 col-md-7 col-12 mt-md-0 mt-4">
			<div id="Driver">
				<h4>ВОДИТЕЛЬ</h4>
				<div className="mt-4 row">
					<div className="col-lg-5">
						<img src={props.userImage === null? 'images/drivers/no-foto.jpg': props.userImage} className="img-fluid w-100" alt=""/>
					</div>
					<div className="col-lg-7 mt-md-0 mt-4">
						<h2>{props.name}</h2>
						<div className="row">
							<p className="col-lg-4 col-12"><b>Возраст</b></p>
							<p className="col-lg-8 col-12">{props.year} года</p>
						</div>
						<div className="row mt-3">
							<p className="col-lg-4 col-12"><b>Телефон</b></p>
							<p className="col-lg-8 col-12">+{props.tel}</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
	)
}
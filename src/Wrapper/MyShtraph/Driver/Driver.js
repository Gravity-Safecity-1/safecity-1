import React from 'react';
import './Driver.css';

export default function Driver() {
	return (
		<div className="col-lg-8 col-md-7 col-12 mt-md-0 mt-4">
			<div id="Driver">
				<h4>ВОДИТЕЛЬ</h4>
				<div className="d-flex mt-4 flex-md-row flex-column">
					<div className="">
						<img src="images/drivers/driver-1.png" className="img-fluid w-100" alt=""/>
					</div>
					<div className="mt-md-0 mt-4 ml-4">
						<h2>Начибулло Шапоатов</h2>
						<div className="row">
							<p className="col-lg-4 col-12"><b>Возраст</b></p>
							<p className="col-lg-8 col-12">32 года</p>
						</div>
						<div className="row mt-3">
							<p className="col-lg-4 col-12"><b>Телефон</b></p>
							<p className="col-lg-8 col-12">+992 935452332</p>
						</div>
					</div>	
				</div>
			</div>
		</div>
	)
}
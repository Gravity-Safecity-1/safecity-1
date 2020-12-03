import React from 'react';
import './Auto.css';

export default function Auto(props) {
	return (
		<div className="col-lg-4 col-md-5 col-12" >
			<div id="Auto" className="w-100">
				<h4>АВТО</h4>
				<div className="my-4 numbWrapper">
					{props.numberAuto}
				</div>
				<p className="w-100">Подтвержденные штрафы: 2 шт.</p>
				<p>Оплачено: 0 шт.</p>
				<p>В процессе проверки: 0 шт.</p>	
			</div>
		</div>
	)
}
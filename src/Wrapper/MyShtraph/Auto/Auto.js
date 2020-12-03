import React from 'react';
import './Auto.css';

export default function Auto() {
	return (
		<div className="col-lg-4 col-md-5 col-12" >
			<div id="Auto">
				<h4>АВТО</h4>
				<div className="my-4">
					<img src="images/numbers/num-1.png" alt=""/>
				</div>
				<p>Подтвержденные штрафы: 2 шт.</p>
				<p>Оплачено: 0 шт.</p>
				<p>В процессе проверки: 0 шт.</p>	
			</div>
		</div>
	)
}
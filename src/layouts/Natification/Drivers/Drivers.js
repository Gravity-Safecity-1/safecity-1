import React from 'react';


export default function DriversInfo({status,customer}) {

		return (
		<div className={status === 1 ?"font-weight-bold d-flex align-items-center":"d-flex align-items-center"}>
			<div>
				<img src={customer.Image} alt=""/>
			</div>
			<div className="ml-3 text-left">
				<h6 className={status === 1 ?"font-weight-bold":""}>{customer.Name}</h6>
				<p>+{customer.PhoneNo}</p>
			</div>
		</div>
	)
}

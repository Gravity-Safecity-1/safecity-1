import React from 'react';


export default function DriversInfo({customer}) {

		return (
		<div className="d-flex align-items-center">
			<div>
				<img src={customer.Image} alt=""/>
			</div>
			<div className="ml-3 text-left">
				<h6>{customer.Name}</h6>
				<p>+{customer.PhoneNo}</p>
			</div>
		</div>
	)
}

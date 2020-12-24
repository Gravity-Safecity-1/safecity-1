import React from 'react';

export default function NumberAuto({status, vehiclePlate }) {

	return (
		<div className={status === 1 ?"font-weight-bold d-flex align-items-center" : "d-flex align-items-center"}>
			{vehiclePlate}
		</div>
	)
}

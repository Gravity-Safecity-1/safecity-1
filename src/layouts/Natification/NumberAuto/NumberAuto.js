import React, {useState, useEffect} from 'react';
import api from '../../../api/index';

export default function NumberAuto({idx,bid}) {
	const [num, setNum] = useState(null);
	const [cont, setCont] = useState(true)
	useEffect(() => {
		api.get(`customer/${idx}/violation/${bid}`)
			.then(res=>{
				setNum(res.data.violation.VehiclePlate);
			})
			.catch(rej=>{
			})
		return()=>{
			setCont(false)
		}	
	}, [num])

	return (
		<div className="d-flex align-items-center">
			{cont?<Spinner/>:<Cont num={num}/>}
			
		</div>
	)
}
const Cont = ({num}) =>{
	return(
		<>
			{num}
		</>
	)
}

const Spinner =()=>{
	return(
		<div className="spinner-border" role="status">
		  	<span className="sr-only">Loading...</span>
		</div>
	)
}
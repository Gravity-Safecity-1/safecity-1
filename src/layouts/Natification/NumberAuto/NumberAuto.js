import React, {useState, useEffect} from 'react';
import api from '../../../api/index';

const initialState = {
	num: null,
	cont: true
}

export default function NumberAuto({idx,bid}) {
	const [state, setState] = useState(initialState);
	const {num,cont} = state

	useEffect(() => {
		function getNum(){
			api.get(`customer/${idx}/violation/${bid}`)
				.then(res=>{
					const {VehiclePlate} = res.data.violation 
					setState({num: VehiclePlate, cont:false});
				})
				.catch(rej=>{
				})
		}
		getNum()
				
	}, [])

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
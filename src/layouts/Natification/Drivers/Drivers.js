import React, {useState, useEffect} from 'react';
import api from '../../../api/index';

const initiaState = {
	ft: {
		src: null,
    	name: null,
    	phone: null,
	},
	cont: true
}

export default function DriversInfo({idx}) {
	const [state, setState] = useState(initiaState)
	const {ft, cont} = state;
	useEffect(() => {
		function getInfo(){
			api.get(`/customer/${idx}`)
				.then(res=>{
					setState({
						...state,
						ft:{
							src: res.data.customer.Images,
				    		name: res.data.customer.Name,
				    		phone: res.data.customer.PhoneNo ,
				    	},
				    	cont: false,	
					})
				})
				.catch(rej=>{
				})
		}
		getInfo()
	}, [])

	return (
		<div className="d-flex align-items-center">
			{cont?<Spinner/>:<Cont src={ft.src} name={ft.name} phone={ft.phone}/>}
			
		</div>
	)
}


const Cont = ({src,name,phone}) =>{
	return(
		<>
			<div>
				<img src={src} alt=""/>
			</div>
			<div className="ml-3 text-left">
				<h6>{name}</h6>
				<p>+{phone}</p>
			</div>
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
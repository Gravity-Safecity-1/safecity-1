import React, {useState, useEffect} from 'react';
import api from '../../../api/index';

const initialState = {
	num: null,
	cont: true,
	violetionId: null
}

export default function Violation({idx,bid}) {
	const [state, setState] = useState(initialState)
	const {num, cont, violetionId} = state

	useEffect(() => {
		function getVioletion(){
			api.get(`customer/${idx}/violation/${bid}`)
				.then(res=>{ 
					const {VDescription, VId} = res.data.violation;
					setState({
						num: VDescription,
						cont: false,
						violetionId: VId
					})
				})
				.catch(rej=>{
				})
		}
		getVioletion()	
	}, [])

	return (
		<div className="d-flex align-items-center">
			{cont?<Spinner/>:<Cont num={num} url={violetionId}/>}
			
		</div>
	)
}

const Cont = ({num, url}) =>{
	let r = (s)=>{
		switch(s){ 
				case "1625": return "images/type-shtraf/straf-2.png";
				case "1302": return "images/type-shtraf/straf-2.png";
				case "1230": return "images/type-shtraf/straf-3.png";
				case "1301": return "images/type-shtraf/straf-4.png";
				case "1345": return "images/type-shtraf/straf-1.png";
				default: return null
			}
		}
	return(
		<>
			<div className="mr-2"><img src={r(url)} alt="" /></div>
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
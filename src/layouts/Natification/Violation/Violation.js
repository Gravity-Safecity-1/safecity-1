import React, {useState, useEffect} from 'react';
import api from '../../../api/index';

const initialState = {
	num: null,
	violetionId: null,
}

export default function Violation({status, idx,bid}) {
	const [state, setState] = useState(initialState)
	const {num, violetionId} = state;

	useEffect(() => {
		function getVioletion(){
			api.get(`customer/${idx}/violation/${bid}`)
				.then(res=>{ 
					const {VDescription, VId} = res.data.violation;
					setState({ 
						num: VDescription,
						violetionId: VId,
					})
					
				})
				.catch(rej=>{
					console.log(rej)
				})
		}
		getVioletion()	
	}, [])
	
	return (
		<div className="d-flex align-items-center">
			<Cont status={status === 1 ? "font-weight-bold" : "" } num={num} url={violetionId}/>
		</div>
	)
}

const Cont = ({status,num, url}) =>{
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
			<span className={status}>{num}</span>
		</>
	)
}
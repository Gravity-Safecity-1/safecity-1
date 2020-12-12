import React, {useState, useEffect} from 'react';
import api from '../../../api/index';

export default function Violation({idx,bid}) {
	const [num, setNum] = useState(null);
	const [cont, setCont] = useState(true);
	const [violetionId, setVioletionId] = useState(null);
	useEffect(() => {
		api.get(`customer/${idx}/violation/${bid}`)
			.then(res=>{
				setNum(res.data.violation.VDescription);
				setVioletionId(res.data.violation.VId);
			})
			.catch(rej=>{
			})
		return()=>{
			setCont(false)
		}	
	}, [num])

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
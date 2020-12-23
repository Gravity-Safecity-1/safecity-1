import React, {useState, useEffect} from 'react'
import './Natification.css';
import api from '../../../api/index';
import {Link} from 'react-router-dom';

const initialState = {
	time: null,
	Vdesc: null,
} 

export default function Natification(props) {
	const [state, setState] = useState(initialState)
	const {time, Vdesc} = state
	useEffect(() => {
		function getNat(){
			api.get(`customer/${props.uId}/violation/${props.bId}`)
				.then(res=>{
					const natification = res.data.violation;
					let At = Date.parse(new Date()) - Date.parse(natification.VTime);
					setState(prevState=>({
						...prevState,
						time: At,
						Vdesc: natification.VDescription
					}))
				})
				.catch(rej=>{
					console.log(rej)
				})
		}
		getNat()
	}, [])

	return (
		<>
			<Nat id={props.uId} users={props.user} shtrafName={Vdesc} time={time}  />
		</>
	)
}



function Nat({users ,id, shtrafName ,time}) {
	const {Image ,Name} = users;
	const [clz, setClz] = useState("bg-light pt-2 row my-4")
	const winLock=()=>{
		window.location.href = `/my-shtraf/${id}`;
		setClz("pt-2 row my-4")
	}
	return (
		<Link onClick={()=> winLock()} to={`/my-shtraf/${id}`} className={clz} id="nat-n">
			<div className="col-3">
				<img src={Image === null? 'images/drivers/no-foto.jpg': Image} className="" alt="" />
			</div>
			<div className="col-6 px-1">
				<h6>{Name}</h6>
				<h6>
					<span>{shtrafName}</span>
				</h6>
			</div>
			<div className="col-3">
				<svg className="mr-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M5.00016 9.16668C7.30135 9.16668 9.16683 7.3012 9.16683 5.00001C9.16683 2.69882 7.30135 0.833344 5.00016 0.833344C2.69898 0.833344 0.833496 2.69882 0.833496 5.00001C0.833496 7.3012 2.69898 9.16668 5.00016 9.16668Z" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M5 2.5V5L6.66667 5.83333" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
				<small>{time} мин</small>
			</div>
		</Link>
	)
}
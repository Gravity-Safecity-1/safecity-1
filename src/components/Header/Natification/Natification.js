import React, {useState, useEffect} from 'react'
import './Natification.css';
import api from '../../../api/index';
import {Link} from 'react-router-dom';

const initialState = {
	violation: {},
} 

export default function Natification({notification}) {
	const [state, setState] = useState(initialState)
	const {violation} = state

	const violDate = new Date(state.violation.VTime);
	const violTime = `${violDate.getDate()}.0${violDate.getMonth()+1}.${violDate.getFullYear()} ${violDate.getHours()}:${violDate.getMinutes()}`
	useEffect(() => {
		const  getNat = () => {
			api.get(`customer/${notification.UserID}/violation/${notification.BID}`)
				.then(res=>{
					const violation = res.data.violation;
					setState(prevState=>({
						...prevState,
						violation
					}))
				})
				.catch(rej=>{console.log(rej)});
		}
		getNat()
	}, [notification])

	let link = `/my-shtraf/${notification.CustomerID}`
	let fotoSrc = notification.Customer.Image === null? 'images/drivers/no-foto.jpg': notification.Customer.Image
	return (
		<Link  to={link} className="clz pt-2 row my-3 " id="nat-n">
			<div className="col-3 d-flex align-items-center">
				<img src={fotoSrc} className="" alt="" />
			</div>
			<div className="col-6 px-1">
				<h6>{notification.Customer.Name}</h6>
				<h6>
					<span>{violation.VDescription}</span>
				</h6>
			</div>
			<div className="col-3 px-1">
				<div className="d-flex">
					<div>
						<svg className="mr-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.00016 9.16668C7.30135 9.16668 9.16683 7.3012 9.16683 5.00001C9.16683 2.69882 7.30135 0.833344 5.00016 0.833344C2.69898 0.833344 0.833496 2.69882 0.833496 5.00001C0.833496 7.3012 2.69898 9.16668 5.00016 9.16668Z" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M5 2.5V5L6.66667 5.83333" stroke="black" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
					<small>{violTime}</small>
				</div>
			</div>
		</Link>
	)
}

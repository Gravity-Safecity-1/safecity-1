import React, {useState, useEffect} from 'react';
import './Header.css';
import Natification from'./Natification/Natification';
import {Link} from 'react-router-dom';
import api from '../../api/index';

const initialState = {
	persDrop: false,
	natiDrop: false,
	notifications: [],
	count:0,
	fx: false,
	loader: true
}

const Header=()=>{
	const [state, setState] = useState(initialState);
	const {persDrop, natiDrop, notifications,fx, count,loader} = state;

	useEffect(() => {
		function getNatifications(){
			api.get('/notifications-not-readed')
				.then(res=>{	
					
					let {customers,notifications, count} = res.data;
					notifications.map(item=>{
						for (let i = 0; i < customers.length; i++) {
							if(customers[i].ID === item.CustomerID){
								item.Customer = customers[i];
								break
							}
						}
						return item.Status === 1 
					})
					const not = notifications.filter(it=> it.Status === 1)

					setState({...state, notifications: not, count, loader: false})
					
				})
				.catch(rej =>{console.log(rej)})

		}
		getNatifications()
	}, [])
	const onPers=()=>{
		setState({
			...state,
			persDrop: !persDrop,
			natiDrop: false
		})
	}
	const onClear=()=>{
		const clear =()=>{
			api.post('/notifications/mask-as-read')
				.then(res => {
					console.log(res.data.msg)
				})
				.catch(rej => console.log(rej))

			api.post('/notifications-not-readed')
				.then(res=>{	
					res.data.notifications = []
					setState({...state, notifications: res.data.notifications})
						
				})
				.catch(rej =>{console.log(rej)})
		}
		clear()
	}

	const onClosePers=()=>{
		setState({...state, persDrop: false})
	}
	const onCloseNat=()=>{
		setState({...state, natiDrop: false})
	}
	const onNatif =()=>{
		setState({
			...state,
			persDrop: false,
			natiDrop: !natiDrop
		})
	}

	let persDropStyle = "d-none";
	let persNatStyle = "d-none";
	let Natifications = notifications.map(item =>{
		return <Natification notification={item} key={item.ID}/>
	});
	if(persDrop){
		persDropStyle = "";
	}
	if(natiDrop){
		persNatStyle = "";
	}
	return (
		<header id="Header" className={fx ?"container-fluid position-fixed":"container-fluid"}>
			<div className="d-flex align-items-center justify-content-between">
				<Link to="/" href="">
					<img src="images/sblogo.svg" alt="" />
				</Link>
				<div className=" d-flex">
					<div className="notification-wrapper mr-2">
						<div className="notification c-p mt-2" onClick={onNatif}>
							<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.25 6.33331C14.25 5.07353 13.7496 3.86535 12.8588 2.97456C11.968 2.08376 10.7598 1.58331 9.5 1.58331C8.24022 1.58331 7.03204 2.08376 6.14124 2.97456C5.25045 3.86535 4.75 5.07353 4.75 6.33331C4.75 11.875 2.375 13.4583 2.375 13.4583H16.625C16.625 13.4583 14.25 11.875 14.25 6.33331Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M10.8696 16.625C10.7304 16.8649 10.5306 17.0641 10.2903 17.2025C10.0499 17.341 9.7774 17.4139 9.50002 17.4139C9.22263 17.4139 8.95012 17.341 8.70975 17.2025C8.46939 17.0641 8.26962 16.8649 8.13043 16.625" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<span className="not_badge">{notifications.length > 0? count: 0}</span>
						</div>
						<div className={persNatStyle} onMouseLeave={()=>setState({...state, natiDrop: false})} id="natDrop">
							<div className="natificationHeader justify-content-between d-flex">
								<b onClick={onCloseNat}>x</b>
								<h6 className="mr-4">
									<Link to="/natification" className="text-white text-decoration-none">Уведомления</Link>
								</h6>
								<span onClick={onClear}>отметить как проч .</span>
							</div>
							<div className="natificBody">
								{ loader?(
									<div className="d-flex justify-content-center py-3">
										<div className="spinner-border" role="status">
										  	<span className="sr-only">Loading...</span>
										</div>
									</div>
									):notifications.length > 0? Natifications: <div className="my-3 text-danger text-center"> Уведомления нету </div>
									
								}
							</div>
							<h5 className="natificFooter">
								<Link to="/natification">показать все</Link>
							</h5>
						</div>	
					</div>
					<div className="user-wrapper ml-4">
						<div className="user c-p" onClick={onPers} >
							<img src="images/drivers/no-foto.jpg"  alt="" />
						</div>
						<div id="persDrop" className={persDropStyle} onMouseLeave={()=>setState({...state, persDrop: false})}>
							<div className="d-flex align-items-center admin" >
								<b onClick={onClosePers}>x</b>
								<div className="mr-3">
									<img src="images/drivers/no-foto.jpg" alt="" />
								</div>
								<span>Админ</span>
								<Link to="/login" style={{cursor: "alias"}} className="d-block ml-4 pl-3">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M13.3333 14.1666L17.4999 9.99998L13.3333 5.83331" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M17.5 10H7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</Link>
							</div>
							<div className="adminlinks">
								<Link  to="/edit-profile" className="mt-3">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3154 14.1014 15.6903 13.4763C15.0652 12.8512 14.2173 12.5 13.3333 12.5H6.66658C5.78253 12.5 4.93468 12.8512 4.30956 13.4763C3.68444 14.1014 3.33325 14.9493 3.33325 15.8333V17.5" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M10.0001 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10.0001 2.5C8.15913 2.5 6.66675 3.99238 6.66675 5.83333C6.66675 7.67428 8.15913 9.16667 10.0001 9.16667Z" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
									<span>Профиль</span>
								</Link>
							</div>	
						</div>	
					</div>
				</div>		
			</div>
		</header>
	)
}

export default Header;
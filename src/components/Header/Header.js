import React, {useState, useEffect} from 'react';
import './Header.css';
import Natification from'./Natification/Natification';
import {Link} from 'react-router-dom';
import api from '../../api/index';

const Header=()=>{
	const [persDrop, setPersDrop] = useState(false);
	const [natiDrop, setNatiDrop] = useState(false);
	const [NatificationArr, setNatificationArr] = useState([])
	useEffect(() => {
		api.get('/notifications')
			.then(res=>{
				const natification = res.data.notifications.reverse().slice(0,3)
				setNatificationArr(natification)
				
			})
			.catch(rej =>{})
		return()=>{
			setNatificationArr(NatificationArr)
		}
	}, [])
	const onPers=()=>{
		setPersDrop(!persDrop)
		setNatiDrop(false);
	}
	const onClear=()=>{
		setNatificationArr([])
	}
	const onClosePers=()=>{
		setPersDrop(false)
	}
	const onCloseNat=()=>{
		setNatiDrop(false)
	}
	const onNatif =()=>{
		setNatiDrop(!natiDrop);
		setPersDrop(false)
	}
	let persDropStyle = "d-none";
	let persNatStyle = "d-none";
	let Natifications = NatificationArr.map(item => <Natification  uId={item.CustomerID} bId={item.BID} key={item.ID}/>);
	if(persDrop){
		persDropStyle = "";
	}
	if(natiDrop){
		persNatStyle = "";
	}
	return (
		<header id="Header" className="container-fluid">
			<div className="d-flex align-items-center justify-content-between">
				<Link to="/" href="">
					<img src="images/sblogo.svg" alt="" />
				</Link>
				<div className=" d-flex">
					<div className="notification-wrapper mr-2">
						<div className="notification c-p" onClick={onNatif}>
							<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.25 6.33331C14.25 5.07353 13.7496 3.86535 12.8588 2.97456C11.968 2.08376 10.7598 1.58331 9.5 1.58331C8.24022 1.58331 7.03204 2.08376 6.14124 2.97456C5.25045 3.86535 4.75 5.07353 4.75 6.33331C4.75 11.875 2.375 13.4583 2.375 13.4583H16.625C16.625 13.4583 14.25 11.875 14.25 6.33331Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M10.8696 16.625C10.7304 16.8649 10.5306 17.0641 10.2903 17.2025C10.0499 17.341 9.7774 17.4139 9.50002 17.4139C9.22263 17.4139 8.95012 17.341 8.70975 17.2025C8.46939 17.0641 8.26962 16.8649 8.13043 16.625" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<span className={NatificationArr.length > 0? 'not_badge': 'd-none'}>{NatificationArr.length}</span>
						</div>
						<div className={persNatStyle} onMouseLeave={()=>setNatiDrop(false)} id="natDrop">
							<div className="natificationHeader d-flex">
								<b onClick={onCloseNat}>x</b>
								<h6 className="mr-4">
									<Link to="/natification" className="text-white text-decoration-none">Уведомления</Link>
								</h6>
								<span>отметить как проч .</span>
								<span onClick={onClear}>очистить</span>
							</div>
							<div className="natificBody">
								{NatificationArr.length > 0? Natifications: <div className="my-3 text-danger text-center"> Уведомления нету </div>}
							</div>
							<h5 className="natificFooter">
								<Link to="/natification">показать все</Link>
							</h5>
						</div>	
					</div>
					<div className="user-wrapper ml-4">
						<div className="user c-p" onClick={onPers} >
							<img src="images/users/user.png" alt="" />
						</div>
						<div id="persDrop" className={persDropStyle} onMouseLeave={()=>setPersDrop(false)}>
							<div className="d-flex align-items-center admin" >
								<b onClick={onClosePers}>x</b>
								<div className="mr-3">
									<img src="images/users/user-2.png" alt="" />
								</div>
								<span>Админ</span>
								<Link to="/login" className="d-block ml-4 pl-3">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M13.3333 14.1666L17.4999 9.99998L13.3333 5.83331" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										<path d="M17.5 10H7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</Link>
							</div>
						</div>	
					</div>
				</div>		
			</div>
		</header>
	)
}
export default Header
import React from 'react';
import './Header.css';
import Natification from'./Natification/Natification';
import {Link} from 'react-router-dom'

export default class Header extends React.Component {
	state = {
		persDrop: false,
		natiDrop: false,
		NatificationArr: [
			{id: 1, src: "images/users/user.png", name: "Фарход", soName: "Азизов", shtrafName: "Проезд на красный цвет", time: 10},
			{id: 2, src: "images/users/user.png", name: "Фарход", soName: "Азизов", shtrafName: "Проезд на красный цвет", time: 20},
			{id: 3, src: "images/users/user.png", name: "Фарход", soName: "Азизов", shtrafName: "Проезд на красный цвет", time: 30},
		],
	}
	onPers=()=>{
		this.setState({
			persDrop: !this.state.persDrop,
			natiDrop: false
		})
	}
	onClear=()=>{
		this.setState({
			NatificationArr: []
		})
	}
	onClosePers=()=>{
		this.setState({
			persDrop: false,
		})
	}
	onCloseNat=()=>{
		this.setState({
			natiDrop: false,
		})
	}
	onNatif =()=>{
		this.setState({
			natiDrop: !this.state.natiDrop,
			persDrop: false
		})
	}
	render() {
		const {persDrop,natiDrop, NatificationArr} = this.state;
		let persDropStyle = "d-none";
		let persNatStyle = "d-none";
		let Natifications = NatificationArr.map(item=>{
			return(
				<Natification src={item.src} name={item.name} soName={item.soName} shtrafName={item.shtrafName} time={item.time} key={item.id} />
			)
		})
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
							<div className="notification c-p" onClick={this.onNatif}>
								<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M14.25 6.33331C14.25 5.07353 13.7496 3.86535 12.8588 2.97456C11.968 2.08376 10.7598 1.58331 9.5 1.58331C8.24022 1.58331 7.03204 2.08376 6.14124 2.97456C5.25045 3.86535 4.75 5.07353 4.75 6.33331C4.75 11.875 2.375 13.4583 2.375 13.4583H16.625C16.625 13.4583 14.25 11.875 14.25 6.33331Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								<path d="M10.8696 16.625C10.7304 16.8649 10.5306 17.0641 10.2903 17.2025C10.0499 17.341 9.7774 17.4139 9.50002 17.4139C9.22263 17.4139 8.95012 17.341 8.70975 17.2025C8.46939 17.0641 8.26962 16.8649 8.13043 16.625" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
								<span className="not_badge">5</span>
							</div>
							<div className={persNatStyle} id="natDrop">
								<div className="natificationHeader d-flex">
									<b onClick={this.onCloseNat}>x</b>
									<h6 className="mr-4">Уведомления</h6>
									<span>отметить как проч .</span>
									<span onClick={this.onClear}>очистить</span>
								</div>
								<div className="natificBody">
									{Natifications}
								</div>
								<h5 className="natificFooter">
									<a href="">показать все</a>
								</h5>
							</div>	
						</div>
						<div className="user-wrapper ml-4">
							<div className="user c-p" onClick={this.onPers}>
								<img src="images/users/user.png" alt="" />
								<span className="not_badge">2</span>
							</div>
							<div id="persDrop" className={persDropStyle}>
								<div className="d-flex align-items-center admin" >
									<b onClick={this.onClosePers}>x</b>
									<div className="mr-3">
										<img src="images/users/user-2.png" alt="" />
									</div>
									<span>Админ</span>
									<a href="" className="d-block ml-4 pl-3">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M13.3333 14.1666L17.4999 9.99998L13.3333 5.83331" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M17.5 10H7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									</a>
								</div>
								<div className="adminlinks">
									<a href="" className="mt-3">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M16.6666 17.5V15.8333C16.6666 14.9493 16.3154 14.1014 15.6903 13.4763C15.0652 12.8512 14.2173 12.5 13.3333 12.5H6.66658C5.78253 12.5 4.93468 12.8512 4.30956 13.4763C3.68444 14.1014 3.33325 14.9493 3.33325 15.8333V17.5" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											<path d="M10.0001 9.16667C11.841 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.841 2.5 10.0001 2.5C8.15913 2.5 6.66675 3.99238 6.66675 5.83333C6.66675 7.67428 8.15913 9.16667 10.0001 9.16667Z" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										<span>Профиль</span>
									</a>
									<a href="" className="mt-3">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M17.5 9.58333C17.5029 10.6832 17.2459 11.7682 16.75 12.75C16.162 13.9264 15.2581 14.916 14.1395 15.6077C13.021 16.2995 11.7319 16.6661 10.4167 16.6667C9.31678 16.6695 8.23176 16.4125 7.25 15.9167L2.5 17.5L4.08333 12.75C3.58744 11.7682 3.33047 10.6832 3.33333 9.58333C3.33384 8.26812 3.70051 6.97904 4.39227 5.86045C5.08402 4.74187 6.07355 3.83797 7.25 3.24999C8.23176 2.7541 9.31678 2.49713 10.4167 2.49999H10.8333C12.5703 2.59582 14.2109 3.32896 15.4409 4.55904C16.671 5.78912 17.4042 7.4297 17.5 9.16666V9.58333Z" stroke="black" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
										<span>Сообщения</span>
									</a>
								</div>	
							</div>	
						</div>
					</div>		
				</div>
			</header>
		)
	}
}
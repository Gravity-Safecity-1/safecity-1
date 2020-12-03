/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import './LogIn.css';
import { Link, Redirect } from 'react-router-dom';

import {HOME} from '../../routes'
import api from '../../api'
import{setToken, setUser, removeToken, removeUser, } from '../../utils'



const state = {
	login: "",
	password: "",
	remember: 0,
	warText: "",
}


 function LogIn() {
	const [usr, setState]=useState(state)


	removeToken()
	removeUser()



	const handleChange = evt =>{
		const {name, value} = evt.target;
		
		let newVal=value
		  if (name === "remember") {		
			newVal = (usr.remember===0)?1:0
		  }

		  setState((prevState) => ({
			...prevState,
			warText:"",
			[name]: newVal,
		  }));
	}
	const handleSubmit = async (e) =>{
		console.log(usr);

		try {
			const res  = await api.post("/auth", {"login":usr.login, "password":usr.password})

			if (res.data.code==200) {
				setToken(res.data.token);
				setUser(JSON.stringify(res.data.user));
				window.location.href=HOME;
			}else{
				setState((prevState)=>({
					...prevState,
					warText:"Введен неверный логин или пароль"
				}))
				removeToken();
				removeUser();
			}
			
		} catch (e) {
			console.log("error =>", e);
		}
	}

	const keyPress = (e)=>{
		if(e.keyCode == 13){
			handleSubmit()
		}
	 }

/* //<form onSubmit={e => e.preventDefault()}> */

	return (
		<div id="LogIn" className="container-fluid">
			<div className="row d-flex justify-content-center align-items-center h-100">
				<div className="col-lg-4 col-md-6 col-sm-8 col-10">
					<h1 className="d-flex align-items-center justify-content-center">
						<div>
							<img src="images/logo-1.png" alt="" />
						</div>
						<span>Шахри Бехатар</span>
					</h1>
				
					<form onSubmit={handleSubmit}>
						<h2>Войти</h2>
						<input type="text" onKeyDown={keyPress} className="form-control mt-3" placeholder="Логин" name="login" value={usr.login} onChange={handleChange} />
						<input type="password" onKeyDown={keyPress} className="form-control mt-3" placeholder="Пароль" name="password" value={usr.password} onChange={handleChange} />
						<div className="input-group my-4">
							<input type="checkbox" name="remember" id="ok" className="custom-checkbox" onChange={handleChange} />
							<label htmlFor="ok" className="ml-2 mb-0">Запомнить</label>
						</div>
						<Link to={HOME} type="submit" className="btn w-100 bg-log login-check" onClick={handleSubmit}>Войти</Link>
						<p className="text-danger my-0 mt-3" >{usr.warText}</p>
						<p className="my-3">Забыли пароль? Для восстановления позвоните по номеру <a href="tel:+992 93 100 1010">+992 93 100 1010</a></p>
					</form>
				</div>
			</div>
		</div>
	)

}


export default LogIn;
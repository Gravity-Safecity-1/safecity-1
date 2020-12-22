import React from 'react';
import './Menu.css';
import {Link} from 'react-router-dom'

const Menu = ()=>{
	return (
		<aside id="Menu" className="col-md-2 col-12 mt-4 ">
			<div>
				<Link to="/"><p>Мои авто</p></Link>
				<Link to="/natification"><p>Уведомление</p></Link>
				<Link to="/subscription"><p>Подписка</p></Link>
				<a href=""><p>Соглашение</p></a>
				<Link to="/edit-profile"><p>Мой профиль</p></Link>
				<Link to="/contacts"><p>Контакты</p></Link>
				<Link to="/login"><p>Выход</p></Link>
			</div>	
		</aside>
	)
}
export default Menu
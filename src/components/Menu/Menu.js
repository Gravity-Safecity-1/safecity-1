import React from 'react'
import './Menu.css'

export default class Menu extends React.Component {
	render() {
		return (
			<aside id="Menu" className="col-md-2 col-12 mt-4 ">
				<div>
					<h4>Меню</h4>
					<a href=""><p>Подменю</p></a>
					<a href=""><p>Подменю</p></a>
					<a href=""><p>Подменю</p></a>
					<a href=""><p>Подменю</p></a>
					<a href=""><p>Подменю</p></a>
				</div>	
			</aside>
		)
	}
}
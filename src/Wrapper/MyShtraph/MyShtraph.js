import React from 'react';
import './MyShtraph.css';
import Auto from './Auto/Auto';
import Driver from './Driver/Driver';
import TypeShtraph from './TypeShtraph/TypeShtraph';
import Payment from './Payment/Payment';
import Status from './Status/Status';
import Items from './Items/Items';
//import Header from '../Header/Header';
import Menu from '../../components/Menu/Menu';

export default class MyShtraph extends React.Component {
	state={
		filter: "all",
		payment: "all",
		status: "all",
		itemsArr: [
			{url: "images/type-shtraf/straf-2.png",nameShtraf: "Проезд на красный",paymentStatus: "Нет",statuses: "Подтверждён", id: Math.floor(Math.random()*5)},
			{url: "images/type-shtraf/straf-3.png",nameShtraf: "Стоп-линия",paymentStatus: "Да",statuses: "Неподдтверждён", id: Math.floor(Math.random()*5)},
		],
	}

	filter(items, filter){
		switch(filter){
			case "all": return items;
			case "line": return items.filter(item => item.nameShtraf === 'Сплошная линия');
			case "againts": return items.filter(item => item.nameShtraf === 'Против движения');
			case "stopLine": return items.filter(item => item.nameShtraf === 'Стоп-линия');
			case "stopLine": return items.filter(item => item.nameShtraf === 'Красный цвет светафора');
			default: return items;
		}
		console.log(items.filter(item => !item.done))
	}
	onFilter=(filter)=>{
		this.setState({filter});
	}
	payment(items, payment){
		switch(payment){
			case "all": return items;
			case "yes": return items.filter(item => item.paymentStatus === 'Да');
			case "no": return items.filter(item => item.paymentStatus === 'Нет');
			default: return items;
		}
	}
	onPayment=(payment)=>{
		this.setState({payment});
	}
	status(items, status){
		switch(status){
			case "all": return items;
			case "ver": return items.filter(item => item.statuses === 'Подтверждён');
			case "notVer": return items.filter(item => item.statuses === 'Неподдтверждён');
			default: return items;
		}
	}
	onStatus=(status)=>{
		this.setState({status});
	}

	render() {
		let {itemsArr,filter,payment,status} = this.state;
		let ItemsEl = itemsArr.map(item =>{
			return(
				<Items url={item.url} nameShtraf={item.nameShtraf} paymentStatus={item.paymentStatus} statuses={item.statuses} key={item.id}/>	
			)
		})
		return (
			<div className="">
				<div className="container-fluid">
					<div className="row">
						<Menu/>
						<div id="MyShtraph" className="col-md-10 my-4">
							<div>
								<div className="row">
									<Auto/>
									<Driver/>
									<div className="col-12">
										<div id="violetions" className="">
											<div className='row'>
												<div className=" col-12 ">
													<div>
														<h3 className=" mb-1">Тип нарушения</h3>
														<TypeShtraph filter={filter} onFilter={this.onFilter}/>
													</div>
												</div>
												<div className="mt-4 col-12 ">
													<div>
														<h3 className="mb-1">Оплата</h3>
														<Payment filter={payment} onFilter={this.onPayment}/>
													</div>
												</div>
												<div className=" mt-4 col-12 mt-4">
													<div>
														<h3 className="mb-1">Статус</h3>
														<Status filter={status} onFilter={this.onStatus}/>
													</div>
												</div>
											</div>
											<div className="t mt-3">		
												<table className="table w-100 mt-3 table-borderless ">
												  	<thead>
												    	<tr>
												    	  	<th scope="col">ТИП НАРУШЕНИЯ</th>
												    	  	<th scope="col">ОПЛАТА</th>
												    	  	<th scope="col">СТАТУС</th>
												    	  	<th scope="col">ФОТО</th>
												    	</tr>
												  	</thead>
												    <tbody>
												    	{ItemsEl}
												    </tbody>
												    <tfoot>
												    	<tr>
												    	  	<th scope="col">Тип нарушения</th>
												    	  	<th scope="col">Оплата</th>
												    	  	<th scope="col">СТАТУС</th>
												    	  	<th scope="col">ФОТО</th>
												    	</tr>
												    </tfoot>
												</table>
											</div>
											<div className="shown row d-flex justify-content-between">
												<div className="col-sm-6 col-12 col-lg-3 d-flex align-items-center">
													<p>Показано <span>10</span> из <span>86</span></p>
												</div>
												<div className="col-sm-6 mt-sm-0 mt-4 col-12 col-lg-3 d-flex align-items-center">
													<div id="pagination">
														<nav aria-label="...">
														  	<ul className="pagination">
														  	  	<li className="page-item ">
														  	  	  	<a className="page-link" href="#" tabIndex="-1" aria-disabled="false">Предыдущая</a>
														  	  	</li>
														  	  	<li className="page-item active" >
														  	  	  	<a className="page-link" href="#">1</a>
														  	  	</li>
														  	  	<li className="page-item">
														  	  		<a className="page-link" href="#">3</a>
														  	  	</li>
														  	  	<li className="page-item">
														  	  	  	<a className="page-link" href="#">Следыдущая</a>
														  	  	</li>
														  	</ul>
														</nav>
													</div>	
												</div>
											</div>	
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
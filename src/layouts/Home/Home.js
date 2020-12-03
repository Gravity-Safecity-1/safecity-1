import React, {useState, useEffect} from 'react';
import './Home.css';
import Layout from '../../components/Layout/Layout';
import Items from './Items/Items';
import api from '../../api/index'

function Home() {
	const [Item, setItems] = useState([])
	useEffect(()=>{
		api.get(`/customers`)
			.then(res=>{
				const customersArr = res.data.customers;
				setItems(customersArr)	
				console.log(Item)
			})
			.catch(rej=>{
				
			})
	},[])

	const Drivers = Item.map(item=>{
		return(
			<Items ids={item.ID} url={item.Image} name={item.Name} soName={item.soName} tel={item.PhoneNo} numberAuto={item.VehiclePlate} threeDay={item.ThreeDay} week={item.SevenDay} ops={item.ID} month={item.ThirtyDay} threeMonth={item.NinetyDay} allTime={item.Total} key={item.ID}/>
		)
	})
	return (
		<>
			<Layout component={() => {
				return (
					<div className="col-md-10 mt-4 mb-4" id="Home">
						<div className="" id="">
							<div className="hTopFilter row d-flex justify-content-between">
								<div className="col-sm-6 col-12 col-lg-3 d-flex align-items-center">
									<label htmlFor="inlineFormCustomSelect" className="mr-3 mb-0">Показать по</label>
									<select className="custom-select" id="inlineFormCustomSelect">
										<option value="0">10</option>
										<option value="1">25</option>
										<option value="2">50</option>
										<option value="3">100</option>
									</select>
								</div>
								<div className="col-sm-6 mt-sm-0 mt-4 col-12 col-lg-3 d-flex align-items-center">
									<label htmlFor="" className="mr-3 mb-0">Поиск:</label>
									<input type="text" className="form-control" />
								</div>
							</div>
							<div className="t">
								<table className="table w-100 mt-3 table-borderless ">
									<thead>
										<tr>
											<th scope="col">ФИО</th>
											<th scope="col">НОМЕР АВТО</th>
											<th scope="col">3 ДНЯ</th>
											<th scope="col">7 ДНЕЙ</th>
											<th scope="col">30 ДНЕЙ</th>
											<th scope="col">90 ДНЕЙ</th>
											<th scope="col">ВСЕГО</th>
											<th scope="col" >ОПОВЕЩЕНИЕ</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{ Drivers }
									</tbody>
									<tfoot>
										<tr>
											<th scope="col">ФИО</th>
											<th scope="col">НОМЕР АВТО</th>
											<th scope="col">3 ДНЯ</th>
											<th scope="col">7 ДНЕЙ</th>
											<th scope="col">30 ДНЕЙ</th>
											<th scope="col">90 ДНЕЙ</th>
											<th scope="col">ВСЕГО</th>
											<th scope="col">ОПОВЕЩЕНИЕ</th>
										</tr>
									</tfoot>
								</table>
							</div>
							<div className="shown mt-4 row d-flex justify-content-between">
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

				)
			}} />
			</>
			)
		
}


export default Home;
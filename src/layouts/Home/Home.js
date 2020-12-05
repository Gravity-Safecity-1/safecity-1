import React, {useState, useEffect} from 'react';
import './Home.css';
import Layout from '../../components/Layout/Layout';
import Items from './Items/Items';
import api from '../../api/index';
import ReactDatatable from '@ashvin27/react-datatable';
import {NavLink} from "react-router-dom"

function Home() {
	const [Item, setItems] = useState([])
	const [columns, setColumns] = useState([{
    	    key: "Name",
    	    text: "ФИО",
    	    sortable: true
    	},
    	{
    	    key: "VehiclePlate",
    	    text: "НОМЕР АВТО",
    	    sortable: true
    	},
    	{
    	    key: "ThreeDay",
    	    text: "3 ДНЯ",
    	    sortable: true
    	},
    	{
    	    key: "SevenDay",
    	    text: "7 ДНЕЙ",
    	    sortable: true
    	},
    	{
    	    key: "NinetyDay",
    	    text: "90 ДНЕЙ",
    	    sortable: true
    	},
    	{
    	    key: "Total",
    	    text: "ВСЕГО",
    	    sortable: true
    	},
        {
            key: "SendSms",
            text: "ОПОВЕЩЕНИЕ",
            cell: () => {
                return (
                    <p className="mb-0 custom-control custom-switch">
						<input  type="checkbox" className="custom-control-input" id={Math.floor(Math.random()*10)} />
						<label className="custom-control-label" htmlFor={Math.floor(Math.random()*10)}></label>
					</p>
                );
            }
        },
        {
            key: "ID",
            text: "",
            cell: (key) => {
                return (
                    <NavLink to={`/my-shtraf/${key}`}>
				    	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M17.5 17.5L13.875 13.875" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</NavLink> 
                );
            }
         }
    ]);

	const [config, setConfig] = useState({
		page_size: 10,
        length_menu: [10, 20, 50],
        show_filter: true,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: true,
            print: true
        }
	})
	useEffect(()=>{
		api.get(`/customers`)
			.then(res=>{
				const customersArr = res.data.customers;
				setItems(customersArr)	
				console.log(Item);
				columns.forEach(item => item.key === "ID" ? item.cell(item.ID): null)
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
						<ReactDatatable
			                config={config}
			                records={Item}
			                columns={columns}/>
					</div>

				)
			}} />
			 
		</>
	)
		
}


export default Home;
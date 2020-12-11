import React, {useEffect, useState} from 'react';
import './Natification.css';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import api from '../../api/index';
import ReactDatatable from '@ashvin27/react-datatable';
import {withRouter} from 'react-router-dom';

export default function Natification(props) {
	const [ft, setFt] = useState({
		src: null,
    	name: null,
    	phone: null,
	})
	const [load, setLoad] = useState('d-none');
	const [loader, setLoader] = useState('');
	const [Customerid, setCustomerid] = useState( null);
	const [Drivers, setDrivers] = useState([])
	const [columns, setColumns] = useState([{
    	key: "BId",
    	align: "center",
    	text: "ФИО",
    	sortable: true,
    	cell:(row)=>{
    		api.get(`/customer/${row.CustomerID}`)
				.then(res=>{
					setFt({
						src: res.data.customer.Images,
				    	name: res.data.customer.Name,
				    	phone: res.data.customer.PhoneNo,
					})
				})
				.catch(rej=>{
				})
    		return(
    			<div className="d-flex align-items-center">
		  			<div>
		  				<img src={ft.src} alt=""/>{row.CustomerID}
		  			</div>
		  			<div className="ml-3 text-left">
		  				<h6>{ft.name}</h6>
		  				<p>+{ft.phone}</p>
		  			</div>
		  		</div>
    		)
    	}
    	},
    	{
    	    key: "VehiclePlate",
    	    align: "center",
    	    TrOnlyClassName: "address",
    	    text: "НОМЕР АВТО",
    	    sortable: true,

    	},
    	
    	{
    	    key: "Total",
    	    align: "center",
    	    text: "ВСЕГО",
    	    sortable: true,
            cell:(row)=>{
    	    	api.get(`/customer/${row.customerID}/violation/${row.BId}`)
					.then(res=>{
					})
					.catch(rej=>{
						alert(rej)
					})
                return(
                	<>
	                	
                	</>
                )
            }
    	},
        {
            key: "ID",
            text: "",
            cell: (key) => {
                return (
                    <div onClick={()=> props.history.push(`/my-shtraf/${key.ID}`)}  className="c-p">
				    	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							<path d="M17.5 17.5L13.875 13.875" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div> 
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
        },
        language: {
           length_menu: "Показать _MENU_ ",
           filter: "Поиск",
           info: "Показано от _START_ до _END_ из _TOTAL_ ",
           pagination: {
               first: "First",
               previous: <span>&#9668;</span>,
               next: <span>&#9658;</span>,
               last: "Last"
           }
        }
	})

	useEffect(() => {
		api.get('/notifications')
			.then(res=>{
				const cust = res.data.notifications
				console.log(cust)
				setDrivers(cust)
				setLoad('')
				setLoader('d-none')
			})
			.catch(rej=>{

			})

			api.get(`/customer/3`)
				.then(res=>{
					setFt({
						src: res.data.customer.Images,
				    	name: res.data.customer.Name,
				    	phone: res.data.customer.PhoneNo,
					})
				})
				.catch(rej=>{
				})
		

	}, [])

	return (
		<>
			<Loader className={loader} />
			<Layout className={load} component={() => {
				return (
					<div className="col-md-10 mt-4 mb-4" id="Natification">
						<div>
							<h1>Уведомления</h1>
							<ReactDatatable
			                config={config}
			                records={Drivers}
			                columns={columns}/>
						</div>
					</div>
				)
			}} />
		</>
	)
}
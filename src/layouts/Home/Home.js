import React, {useState, useEffect} from 'react';
import './Home.css';
import Layout from '../../components/Layout/Layout';
import api from '../../api/index';
import ReactDatatable from '@ashvin27/react-datatable';
import {withRouter} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

function Home(props) {
	const [Item, setItems] = useState([]);
    const [load, setLoad] = useState('d-none');
    const [isLoaded, setIsLoaded] = useState('');
	const [columns, setColumns] = useState([{
    	    key: "Name",
    	    align: "center",
    	    text: "ФИО",
    	    sortable: true,
    	    cell:(row)=>{
    	    	return(
    	    		<div className="d-flex align-items-center">
			    		<div>
			    			<img src={row.Image} alt=""/>
			    		</div>
			    		<div className="ml-3 text-left">
			    			<h6>{row.Name}</h6>
			    			<p>+{row.PhoneNo}</p>
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
    	    sortable: true
    	},
    	{
    	    key: "ThreeDay",
    	    align: "center",
    	    text: "3 ДНЯ",
    	    sortable: true
    	},
    	{
    	    key: "SevenDay",
    	    align: "center",
    	    text: "7 ДНЕЙ",
    	    sortable: true
    	},
    	{
    	    key: "NinetyDay",
    	    align: "center",
    	    text: "90 ДНЕЙ",
    	    sortable: true
    	},
    	{
    	    key: "Total",
    	    align: "center",
    	    text: "ВСЕГО",
    	    sortable: true
    	},
        {
            key: "SendSms",
            align: "center",
            text: "ОПОВЕЩЕНИЕ",
            cell: (row) => {
                return (
                    <p className="mb-0 custom-control custom-switch">
						<input type="checkbox" className="custom-control-input" id={row.ID} />
						<label className="custom-control-label" htmlFor={row.ID}></label>
					</p>
                );
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
	useEffect(()=>{
		api.get(`/customers?page=1&pagesize=500`)
			.then(res=>{
				const customersArr = res.data.customers;
				setItems(customersArr);
				columns.forEach(item => item.key === "ID" ? item.cell(item.ID): null);
                setLoad('');
                setIsLoaded('d-none')
			})
			.catch(rej=>{
				
			})
	},[])


	return (
		<>
            <Loader className={isLoaded}/>
			<Layout className={load} component={() => {
				return (
					<div className="col-md-10 mt-4 mb-4" id="Home">
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


export default withRouter(Home);
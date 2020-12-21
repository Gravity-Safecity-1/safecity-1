import React, {useEffect, useState} from 'react';
import './Natification.css';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import api from '../../api/index';
import ReactDatatable from '@ashvin27/react-datatable';
import {withRouter} from 'react-router-dom';
import DriversInfo from './Drivers/Drivers';
import NumberAuto from './NumberAuto/NumberAuto';
import Violation from './Violation/Violation';

const initialState = props => ({
    loading: true,
    notifications: [],
    columns: [
        {
        key: "CustomerID",
        align: "center",
        text: "ФИО",
        cell:(row)=>{
            return(
                <>
                    <DriversInfo customer={row.Customer}/>
                </>
            )
        }
        },
        {
            key: "BID",
            align: "center",
            TrOnlyClassName: "address",
            text: "НОМЕР АВТО",
            cell:(row)=>{
                return(
                    <NumberAuto vehiclePlate={row.Customer.VehiclePlate}/>
                )
            }

        },
        
        {
            key: "CreatedAt",
            align: "center",
            text: "ИМЯ ШТРАФА",
            cell:(row)=>{
                return(
                    <>
                        <Violation idx={row.CustomerID} bid={row.BID}/>
                    </>
                )
            }
        },
        {
            key: "ID",
            text: "",
            cell: (key) => {
                return (
                    <div onClick={()=> props.history.push(`/natification/${String(key.CustomerID)}`)}  className="c-p">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M17.5 17.5L13.875 13.875" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div> 
                );
            }
         }
    ],
    config: {
        page_size: 10,
        length_menu: [10, 20, 30],
        show_filter: false,
        show_pagination: true,
        pagination: 'advance',
        button: {
            excel: false,
            print: false
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
    }
})

export default function Natification(props) {
	const [state, setState] = useState(initialState(props))
	const {notifications, loading, columns, config} = state;

	useEffect(() => {
        function getNatification(){
    		api.get('/notifications')
    			.then(res=>{
                    console.log(res);
                    const {customers, notifications} = res.data;
                    notifications.map(item =>{
                        for (let i = 0; i < customers.length; i++) {
                            if(customers[i].ID === item.CustomerID){
                                item.Customer=customers[i];
                                break;
                            }                            
                        }
                        return item
                    })
                    setState(pState =>({...pState,  notifications, loading: false }))
    			})
    			.catch(rej=>{

    			})
        }
		getNatification()

	}, [])

	return (
		<> 
            {   
                (loading) ?(
    			    <Loader />
                ) : ( 
        			<Layout component={() => {
        				return (
        					<div className="col-md-10 mt-4 mb-4" id="Natification">
        						<div>
        							<h1>Уведомления</h1>
        							<ReactDatatable
        			                config={config}
        			                records={notifications}
        			                columns={columns}/>
        						</div>
        					</div>
        				)
        			}} />
                )
            }
		</>
	)
}
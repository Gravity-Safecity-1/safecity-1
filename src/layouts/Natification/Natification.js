import React, {useEffect, useState} from 'react';
import './Natification.css';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import api from '../../api/index';
import ReactDatatable from '@ashvin27/react-datatable';
import DriversInfo from './Drivers/Drivers';
import NumberAuto from './NumberAuto/NumberAuto';
import Violation from './Violation/Violation';
import {Link} from 'react-router-dom';
import ImageShtraf from '../../components/ImageShtraf/ImageShtraf';

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
                            <DriversInfo customer={row.Customer} />
                        </>
                    )
                }
        },
        {//
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
            text: "ТИП НАРУШЕНИЯ",
            cell:(row)=>{
                return(
                    <>
                        <Violation idx={row.CustomerID} bid={row.BID}/>
                    </>
                )
            }
        },
        {//
            key: "ID",
            text: "",
            cell: (key) => {
                const handleImage = (violation)=>{
                    console.log( violation );
                    props.prevS(prevState=>({...prevState, imageVial: violation, imageShow: true}))
                }    
                return (
                    <IconLinkFromDetiledShtraf handleImage={handleImage} violation={key} />
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

const initiaViaFoto = {
    imageVial: null,
    imageShow: false
}


export default function Natification(props) {
	const [state, setState] = useState(initialState(props))
	const {notifications, loading, columns, config} = state;

    const [vialFoto, setVialFoto] = useState(initiaViaFoto);
    const {imageVial, imageShow} = vialFoto;
    
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
                    setState(pState =>({...pState,  notifications, loading: false  }))
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
                    <>  
                        {
                            imageShow ? ( 
                                <ImageShtraf violation={imageVial} onClose={ () => setVialFoto(prevState => ({...prevState, imageShow: false})) }/>
                            ):(
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
		</>
	) 
}

const IconLinkFromDetiledShtraf = ({handleImage,violation}) =>{
    const onhandleImage = () =>{
        return handleImage(violation);
    }
    return(
        <button  className="btn m-auto d-block text-center">
            <svg onClick={onhandleImage} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9.891" cy="9.00692" r="3.13636" stroke="#005395" />
                <path d="M0.5 4.36364C0.5 3.83645 0.927364 3.40909 1.45455 3.40909H4.23323C4.80912 3.40909 5.3557 3.15512 5.72708 2.71498L7.30994 0.838987C7.49131 0.624031 7.75824 0.5 8.03949 0.5H9.81818H11.5969C11.8781 0.5 12.1451 0.624031 12.3264 0.838987L13.9093 2.71498C14.2807 3.15512 14.8272 3.40909 15.4031 3.40909H18.1818C18.709 3.40909 19.1364 3.83646 19.1364 4.36364V14.5455C19.1364 15.0726 18.709 15.5 18.1818 15.5H1.45455C0.927365 15.5 0.5 15.0726 0.5 14.5455V4.36364Z" stroke="#005395" />
            </svg>
        </button>
    )
}
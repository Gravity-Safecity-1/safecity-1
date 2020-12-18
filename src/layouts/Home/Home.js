import React, { useState, useEffect } from 'react';
import './Home.css';
import Layout from '../../components/Layout/Layout';
import api from '../../api/index';
import ReactDatatable from '@ashvin27/react-datatable';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const initialState = (props) => ({
    items: [],
    loading: true,
    columns: [{
        key: "Name",
        align: "center",
        text: "ФИО",
        sortable: true,
        cell: (row) => {
            return (
                <div className="d-flex align-items-center">
                    <div>
                        <img src={row.Image} alt="" />
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
            sortable: true,
            cell: (row) => {
                return (
                    row.ThreeDay === 0 ? 0 : row.ThreeDay
                )
            }
        },
        {
            key: "SevenDay",
            align: "center",
            text: "7 ДНЕЙ",
            sortable: true,
            cell: (row) => {
                return (
                    row.SevenDay === 0 ? 0 : row.SevenDay
                )
            }
        },
        {
            key: "NinetyDay",
            align: "center",
            text: "90 ДНЕЙ",
            sortable: true,
            cell: (row) => {
                return (
                    row.NinetyDay === 0 ? 0 : row.NinetyDay
                )
            }
        },
        {
            key: "Total",
            align: "center",
            text: "ВСЕГО",
            sortable: true,
            cell: (row) => {
                return (
                    row.Total === 0 ? 0 : row.Total
                )
            }
        },
        {
            key: "SendSms",
            align: "center",
            text: "ОПОВЕЩЕНИЕ",
            cell: (row) => {

                console.log(row);
                const handleChange = event => {
                    console.log(event);
                    api.get(`/customer/${row.ID}/change-sms-send`)
                        .then(res => {
                            //console.log(res);
                            event.target.checked = (res.data.send_sms) ? true : false
                        })
                        .catch(rej => {
                            console.log(rej);
                        })
                }
                return (
                    <>
                        <div className="d-flex justify-content-center">
                            <div className="custom-control custom-switch">
                                <input checked={(row.SendSms === 1) ? true : false} onChange={handleChange} type="checkbox" className="custom-control-input" id={row.id} />
                                <label className="custom-control-label" htmlFor={row.id}></label>
                            </div>
                        </div>
                    </>
                );
            }
        },
        {
            key: "ID",
            text: "",
            cell: (key) => {
                return (
                    <div onClick={() => props.history.push(`/my-shtraf/${key.ID}`)} className="c-p">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.5 17.5L13.875 13.875" stroke="#005395" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );
            }
        }
        ],
    config: {
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
    },
}
)


function Home(props) {


    const [state, setState] = useState(initialState(props))

    const { loading } = state;
    const { config } = state;
    const { items } = state;
    const { columns } = state;



    useEffect(() => {
        const getData = () => {
            api.get(`/customers?page=1&pagesize=5000`)
                .then(res => {
                    const customersArr = res.data.customers;
                    setState(prevState => {

                        return { ...prevState, items: customersArr, loading: false }
                    
                    })
                })
                .catch(rej => {
                    console.log("500");
                });
        }
        getData();
    }, [])



    return (loading) ? (
        <Loader />
    ) :
        (
            <>
                <Layout component={() => {
                    return (
                        <div className="col-md-10 mt-4 mb-4" id="Home">
                            <ReactDatatable
                                config={config}
                                records={items}
                                columns={columns} />
                        </div>
                    )
                }} />

            </>
        )

}


export default withRouter(Home);

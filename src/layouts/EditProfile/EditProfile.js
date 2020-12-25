import React, {useState, useEffect} from 'react';
import './EditProfile.css';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import {Link} from 'react-router-dom';
import api from '../../api/index';

const initialState ={
	loading: true,
	name: ""
}

export default function EditProfile() {
	const [state, setState] = useState(initialState)
	const {loading, name} = state

	useEffect(() => {
		api.get('/profile')
			.then(res=>{
				const {user} = res.data;
				setState({ name: user.Name, loading: false})
			})
			.catch(rej=>{
				console.log(rej)
			})
	}, [])
	return (
		<>{
			loading ? (
				<Loader/>
			):(
				<Layout component={()=>{
					return(
						<div className="col-md-10 mt-4 mb-4" id="EditProfile">
							<div>
								<h6 className="mb-3">ПРОФИЛЬ</h6>
								<div className="row">
									<div className="col-lg-4 co-md-6 col-12">
										<div>
											<img src="images/drivers/no-foto.jpg" className="w-100 img-fluid" alt="" />
										</div>
									</div>
									<div className="col-lg-4 co-md-6 col-12">
										<div className="adminInfo">
											<h2>{name}</h2>
											<p>Телефон <span className="d-inline-block ml-4 pl-2">+992 935452332</span></p>
										</div>
									</div>
								</div>	
							</div>
						</div>
					)
				}} />
			)
		}</>

	)
}
import React, {useState, useEffect} from 'react';
import './EditProfile.css';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import {Link} from 'react-router-dom';

export default function EditProfile() {
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setLoading(false)
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
											<h2>Админ Админов</h2>
											<p>Телефон <span className="d-inline-block ml-4 pl-2">+992 935452332</span></p>
											<a className="mt-5 mb-2" href="">Редактировать профиль</a>
											<a href="">Сменить пароль</a>
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
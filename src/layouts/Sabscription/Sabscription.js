import React, {useState, useEffect} from 'react';
import './Sabscription.css';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import {Link} from 'react-router-dom';

export default function Sabscription() {
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
						<div className="col-md-10 mt-4 mb-4" id="Sabscription">
							<div>
								<h6 className="mb-3">Подписка</h6>
								<p>Срок действия вашей подписки закончится 20 января 2021 г.</p>	
							</div>
						</div>
					)
				}} />
			)
		}</>

	)
}
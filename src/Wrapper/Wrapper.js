import React from 'react';
import './Wrapper.css';
import LogIn from '../layouts/LogIn/LogIn';
import Home from '../layouts/Home/Home';
import MyShtraph from '../layouts/MyShtraph/MyShtraph';
import Natification from '../layouts/Natification/Natification';
import Contacts from '../layouts/Contacts/Contacts';
import EditProfile from '../layouts/EditProfile/EditProfile';
import Sabscription from '../layouts/Sabscription/Sabscription';
import {Route, Switch,Redirect, Link} from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

export default function Wrapper() {
	return (
		<div className="Wrapper">
			<Switch>
				<Route path="/login" exact component={LogIn}/>
				
				<Route path="/my-shtraf/:id" exact render={
					({match})=>{
						const {id} = match.params;
						return(
							<MyShtraph id={id} />
						)
					}
				} />
				<ProtectedRoute path="/" exact component={Home}/>
				<ProtectedRoute path="/natification" exact component={Natification}/>
				<ProtectedRoute path="/contacts" exact component={Contacts}/>
				<ProtectedRoute path="/subscription" exact component={Sabscription}/>
				<ProtectedRoute path="/edit-profile" exact component={EditProfile}/>
				<Redirect  to="/" />
			</Switch>
		</div>
	)
}	
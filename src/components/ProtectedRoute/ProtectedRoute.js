import React from 'react'
import { Redirect } from 'react-router-dom'
import{checkAuth} from '../../utils'

function  ProtectedRoute({component}){

    const Component=component;

    const isAuthenticated=checkAuth();
    //console.log(isAuthenticated)

    return isAuthenticated ? (
        <Component />
    ) : (
        <Redirect to={{ pathname: '/login' }} />
    );

}

export default ProtectedRoute;
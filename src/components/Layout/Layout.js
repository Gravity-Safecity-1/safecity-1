import React from 'react';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';



function Layout({ component }) {

    const Component = component;

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <Component />
                </div>
            </div>
        </div>
    )
}

export default Layout;
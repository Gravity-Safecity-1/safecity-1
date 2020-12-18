import React from 'react';
import './Payment.css';

const Payment = props =>{
  const buttonss =[
    {name: "all", label: "Все"},
    {name: "yes", label: "Да"},
    {name: "no", label: "Нет"},
  ]  
  const {filter, onFilter} = props;
  const buttons = buttonss.map(({name, label})=>{
    const isActive = filter === name;
    const clazz = isActive ? "Active":"notActive";
    return <button type="button" className={`btn ${clazz}`} key={name} onClick={()=> onFilter(name)}>{label}</button>
  });
  return (
    <div className="btn-group" id="Payment">
      {buttons}
    </div>
  );
}

export default Payment
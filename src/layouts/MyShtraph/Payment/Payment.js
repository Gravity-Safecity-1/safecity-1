import React from 'react';
import './Payment.css';

export default class Payment extends React.Component{
  buttons =[
    {name: "all", label: "Все"},
    {name: "yes", label: "Да"},
    {name: "no", label: "Нет"},
  ]  
  render(){
    const {filter, onFilter} = this.props;
    const buttons = this.buttons.map(({name, label})=>{
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
}


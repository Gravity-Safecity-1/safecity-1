import React from 'react';
import './Status.css';

export default class Status extends React.Component{
  buttons =[
    {name: "all", label: "Все"},
    {name: "ver", label: "Подтвержденные"},
    {name: "notVer", label: "В процессе"},
  ]  
  render(){
    const {filter, onFilter} = this.props;
    const buttons = this.buttons.map(({name, label})=>{
      const isActive = filter === name;
      const clazz = isActive ? "Active":"notActive";
      return <button type="button" className={`btn ${clazz}`} key={name} onClick={()=> onFilter(name)}>{label}</button>
    });
    return (
    <div className="" id="Status">
      {buttons}
    </div>
  );
  }
}


import React from 'react';
import './Status.css';

const Status= props =>{
  const buttonss =[
    {name: "all", label: "Все"},
    {name: "ver", label: "Подтвержденные"},
    {name: "notVer", label: "В процессе"},
  ]  

    const {filter, onFilter} = props;
    const buttons = buttonss.map(({name, label})=>{
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

export default Status
import React from 'react';
import './TypeShtraph.css';

export default class TypeShtraph extends React.Component{
  buttons =[
    {name: "all", label: "Все"},
    {name: "line", label: "Сплошная линия"},
    {name: "againts", label: "Против движения"},
    {name: "stopLine", label: "Стоп-линия"},
    {name: "redColor", label: "Красный цвет светафора"}
  ]  
  render(){
    const {filter, onFilter} = this.props;
    const buttons = this.buttons.map(({name, label})=>{
      const isActive = filter === name;
      const clazz = isActive ? "Active":"notActive";
      return <button type="button" className={`btn ${clazz}`} key={name} onClick={()=> onFilter(name)}>{label}</button>
    });
    return (
    <div className="" id="TypeShtraph">
      {buttons}
    </div>
  );
  }
}


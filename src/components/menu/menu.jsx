import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const Menu = ({ header, items, active, setActive }) => {
  return (
    <div className={active ? "menu active" : "menu"}>
      <div className="blur" />
      <div className="menu__content">
        <div className="menu__header">{header}</div>
        <ul className="menu__ul">
          {items.map((item) => {
            return <Link key={item.id} to={item.href} onClick={()=>{setActive(false)}}>{item.value}</Link>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default Menu;

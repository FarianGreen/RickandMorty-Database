import React from "react";
import "./row.css";

const Row = ({ left, right }) => {
  return (
    <div className="row-column">
      <div className="left-column">{left}</div>
      <div className="right-column">{right}</div>
    </div>
  );
};
export default Row;
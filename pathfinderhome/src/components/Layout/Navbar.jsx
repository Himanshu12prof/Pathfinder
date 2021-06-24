import React from "react";
import "./Navbar.css";

const Navbar = ({ onClickVisualization, onClickClear }) => {
    return (
      <div className="App-header">
     
        <div className="btn-group-vertical floating-buttons">
          <button
            onClick={() => onClickVisualization()}
            
          >
            Visualize Dijkstra's Algorithm
          </button>
          
        </div>
      </div>
    );
  };
  
  export default Navbar;
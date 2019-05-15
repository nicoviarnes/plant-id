import React from "react";
import "./style.css";

function PlantTileWrap(props){
    return (
        <div className="wrapper">{props.children}</div>
    )
}

export default PlantTileWrap;
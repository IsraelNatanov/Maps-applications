import React from 'react'

import "ol/ol.css";

interface Iprops {
 
    selectTypeValue: (e: string) => void;
    undoClick:() => void;
    deletePolygon: ()=>void;
  
  }
  
export default function SelectInteraction(props:Iprops) {
  return (
    <div>
    {/* <div className="col-auto">
    <span className="input-group">
      <label className="input-group-text" htmlFor="type">Geometry type:</label>
      <select className="form-select" id="type" onChange={(e) => props.selectTypeValue(e.target.value)
      } >
         <option value="None">None</option>
        <option value="Point" >Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
       
      </select >
      <input className="form-control" type="button" value="Undo" id="undo" onClick={props.undoClick}/>
    </span>
  </div> */}

  <div className="row-box">
  <button className="button-delete-geomtery"  onClick={props.deletePolygon}>מחק גאומטרי</button>
  <button className="form-control"  onClick={props.undoClick}>הפסק</button>
      <select className="form-select" id="type" onChange={(e) => props.selectTypeValue(e.target.value)
      } >
         <option value="None">None</option>
        <option value="Point" >Point</option>
        <option value="LineString">LineString</option>
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
       
      </select >
      <label className="inpu-text" htmlFor="type">:סוג גאומטרי</label>
     
      </div>

  </div>
  )
}

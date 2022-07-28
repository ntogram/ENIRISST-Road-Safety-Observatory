import React, {Component, useEffect, useRef, useState} from "react";
import MainView from "../../GreekStatistics/components/DataViews/MainView/MainView";
import MapDisplayer from "./components/MapDisplayer/MapDisplayer";
import DataDisplayer from "./components/DataDisplayer/DataDisplayer";




    function DataViewer(props) {
            let d = useRef(null);
            React.useEffect(() => {



            })
        const setd=(value)=>{
                d.current=value
        }



          return <table style={{marginTop:"3%"}}>
              <tr>
                   <td style={{width:"13.5%"}}> </td>
                  <td style={{width:"36.5%"}}> <MapDisplayer data={d} completed={props.completed} formdata={props.formdata} /></td>
                  <td style={{width:"36.5%"}}><DataDisplayer setd={setd} setCompleted={props.setCompleted} setformstatus={props.setformstatus} formdata={props.formdata} completed={props.completed}/></td>
                   <td style={{width:"13.5%"}}> </td>

              </tr>
          </table>

}
export default DataViewer;
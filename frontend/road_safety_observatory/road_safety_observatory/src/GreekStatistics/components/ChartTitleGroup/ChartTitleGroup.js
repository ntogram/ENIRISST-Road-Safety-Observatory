import React from 'react';
//import  "../ChartTitle.css"


function ChartTitleGroup(props) {
  return <div className={"chart-title"}>
        <div style={{whiteSpace: "nowrap"}}>
           <div> <hr style={{marginLeft:"21%"}} className={"group1"}/> <hr style={{marginLeft:"2.5%"}}  className={"group2"}/></div>
        </div>
         <div style={{whiteSpace: "nowrap"}}>
           <span   className={"ctitle"}>{props.title1}</span><span style={{paddingLeft:props.v1}} className={"ctitle"}>{props.title2}</span>
        </div>
         <div style={{whiteSpace: "nowrap"}}>
           <span  className={"csubtitle"}>{props.subtitle1}</span><span  style={{marginLeft:props.v2}} className={"csubtitle"}>{props.subtitle2}</span>
        </div>



  </div>;
}

export default ChartTitleGroup;

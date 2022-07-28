import React from 'react';
import  "./ChartTitle.css"


function ChartTitle(props) {
  return <div className={"chart-tile"}>
      <hr style={{marginLeft:"21%"}}/>
        <div  className={"ctitle"}>{props.title}</div>
         <div  className={"csubtitle"}>{props.subtitle}</div>
  </div>;
}

export default ChartTitle;

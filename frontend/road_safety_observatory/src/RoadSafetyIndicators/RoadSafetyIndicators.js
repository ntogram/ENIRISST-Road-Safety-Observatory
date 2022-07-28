import React, {Component, useEffect, useRef, useState} from "react";
import FormView from "./FormView/FormView";
import DataViewer from "./DataViewer/DataViewer";




    function RoadSafetyIndicators() {
          const [completed,setCompleted]=React.useState(false)
          const [formstatus,setformstatus]=React.useState(false)
          const [formdata,setFormData]=React.useState({})
          React.useEffect(() => {
            //    console.log("d2")
            })
          return <div className={"gs-bg"}>
      <div className={"text_header"}> Δείκτες οδικής ασφάλειας</div>
            <FormView setFormData={setFormData} formstatus={formstatus} completed={completed} setCompleted={setCompleted} format={"bg1"}/>
            <DataViewer setCompleted={setCompleted} setformstatus={setformstatus} formdata={formdata} completed={completed}/>

  </div>;

}
export default RoadSafetyIndicators;
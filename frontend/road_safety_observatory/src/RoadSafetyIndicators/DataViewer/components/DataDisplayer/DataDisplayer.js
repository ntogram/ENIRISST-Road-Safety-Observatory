import React, {Component, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faFilePdf} from "@fortawesome/free-solid-svg-icons";

import "./DataDisplayer.css"
import DataNofound from "../DataNofound/DataNofound";
import ParameterTable from "../ParameterTable/ParameterTable";
import DataTable from "./DataTable/DataTable";
import ChartBar from "../Chartbar/ChartBar";
import {Dataplot} from "./Dataplot/Dataplot";
import CustomSelector from "../../../../Main_Components/CustomSelector/CustomSelector";
import html2canvas from "html2canvas";





    function DataDisplayer(props) {
         const [index, setIndex] = useState(-1);
        const [formstatus,setformstatus]=useState(false)
         const prevformstatus=React.useRef()
        const [data,setdata]=useState([])


      const  export_data=(cl)=>{
         let tb=document.getElementById("dataparameter")
         let a=html2canvas(tb,{width:3000,height:3000}).then(function (canvas) {
                 let a = document.createElement('a');
                 a.href = canvas.toDataURL("image/png", 1.0);
                 console.log(canvas)
                 a.download = props.name + ".png"
                 if (cl===true){
                      a.click();
                 }
                 return canvas
             });
         return a
    }


     function DownloadImage() {
        if (props.completed){
            console.log("image")
             // export_data(true).then(r => {
             // });


        }

    }

    function DownloadPDF() {

       if (props.completed){
            console.log("PDF")
        }
    }

    const formChartArea = ()=>{
         if ((props.formdata === undefined || (props.formdata["indicators"] === undefined))){
             return null
        }
         else{
             if (Object.keys(props.formdata).length !== 0 ) {
                 if (props.formdata["areas"].length > 20) {
                     return null
                 }
             }

           return(  props.formdata["indicators"].map((element,idx)=>{
                 return <ChartBar chartdata={data} formstatus={formstatus} formdata={props.formdata} indicator={element.value} group={props.formdata["areas"][0].group} name={idx}/>
                 }

             ))
         }
    }
    const formBoxplot=()=>{
            if ((props.formdata === undefined || (props.formdata["indicators"] === undefined))){
             return null
        }
         else{
             if (Object.keys(props.formdata).length !== 0 ) {
                 if (props.formdata["areas"][0].group === "Επικράτεια") {
                     return null
                 }
             }


              return(
                  <div>
                    <Dataplot chartdata={data} formstatus={formstatus} formdata={props.formdata}  group={props.formdata["areas"][0].group}/>
                  </div>)
                 //  props.formdata["indicators"].map((element,idx)=>{
                 // return <Dataplot chartdata={data} formstatus={formstatus} formdata={props.formdata} indicator={element.value} group={props.formdata["areas"][0].group} name={idx}/>
                // }

           //  ))
            }
    }

    const disableTabs=()=>{
             if (Object.keys(props.formdata).length !== 0 ) {
                 if(props.formdata["areas"].length>20 || props.formdata["areas"][0].group==="Επικράτεια"){
                     return true
                 }
             }
    }


    React.useEffect(() => {

        if (props.completed===true && index!==-1 && formstatus===true){
            setIndex(-1)
        }
       // console.log(formstatus)
        if (formstatus===false && prevformstatus.current===true){
            setformstatus(false)
            props.setformstatus(formstatus)
        }
        prevformstatus.current=formstatus
        props.setd(data)

        // if(props.formdata===undefined || (props.formdata["indicators"]===undefined)){
        //     console.log("dsi")
        // }
        // else{
        //     console.log("dse")
        // }


    })

        return (
            <div  id={"dataelem"} style={{width:"100%"}} className={"data-table-view"}>
                <nav className={"dataoptions"}>
                    <span className={index === 0 ? "dataselected datalinks" : "datalinks"}
                          onClick={() => setIndex(0)}><a style={{color:"inherit"}} >Ραβδόγραμμα</a></span>
                    <span className={index === 1 ? "dataselected datalinks" : "datalinks"}
                          onClick={() => setIndex(1)}><a style={{color:"inherit"}} >Beeswarm Plot</a></span>
                    <span className={index === 2 ? "dataselected datalinks" : "datalinks"} onClick={() => setIndex(2)}><a style={{color:"inherit"}} >Πίνακας δεδομένων</a></span>
                </nav>


    {/*            <nav>*/}

    {/*    <div className="rightSection">*/}
    {/*        <span className={index===0?"selected links":"links"} onClick={() => setIndex(0)}>Ραβδόγραμμα</span>*/}
    {/*        <span className={index===1?"selected links":"links"} onClick={() => setIndex(1)}>Beeswarm plot</span>*/}
    {/*        <span className={index===2?"selected links":"links"} onClick={() => setIndex(2)}>Πίνακας δεδομένων</span>*/}
    {/*    </div>*/}
    {/*</nav>*/}
        <div style={{marginLeft:"80%",marginTop:"5%"}}>
            <FontAwesomeIcon icon={faFileImage} style={{

                color:(props.completed)?"#0F8DD6":"#CED4DA",cursor: (props.completed)?"pointer":"auto",marginRight:"15%"}} size="lg" title={"Download png"} onClick={DownloadImage} />
            <FontAwesomeIcon icon={faFilePdf} style={{color:(props.completed)?"#0F8DD6":"#CED4DA",cursor: (props.completed)?"pointer":"auto"}} size="lg" title={"Download pdf"} onClick={DownloadPDF} />
        </div>

       <hr style={{marginLeft:"5%",width:"90%"}} className={"data-sep"}/>
                <div id={"mydataframe"}>
                {Object.keys(props.formdata).length !== 0?<ParameterTable formdata={props.formdata} />:<DataNofound/>}
                <div style={{display:(index===-1)?"block":"none"}} id={"default"}></div>
                <div style={{display:(index===0)?"block":"none"}} id={"0"}>
                    {formChartArea()}
                    </div>

                <div style={{display:(index===1)?"block":"none"}} id={"1"}>
                 {formBoxplot()}


                </div>
                {/*<div style={{display:(index===2)?"block":"none"}} id={"2"}>{restdata.length!==0?<DataTable     setabledata={form_table_data} formdata={props.formdata} />:null}</div>*/}
                 <div style={{display:(index===2)?"block":"none",maxHeight:"400px",
                        maxWidth:"600px",overflow: 'auto'}} id={"2"}><DataTable setCompleted={props.setCompleted} formdata={props.formdata} completed={props.completed} setdata={setdata} formstatus={formstatus} setFormStatus={setformstatus}/></div>

            </div>
            </div>
        )



}
export default DataDisplayer;
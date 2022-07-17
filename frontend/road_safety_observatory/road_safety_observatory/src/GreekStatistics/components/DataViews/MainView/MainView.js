import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImage} from "@fortawesome/free-solid-svg-icons";
import {faFilePdf} from "@fortawesome/free-solid-svg-icons";
import "./MainView.css"
import TableView from "../TableView/TableView";
import ChartView from "../ChartView/ChartView";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import MapDisplayer from "../../MapDisplayer/MapDisplayer";






export default function MainView(props) {
//const map = useMap()
const [content,setContent]=React.useState(undefined)
 const [map_download,setmapdownload]=React.useState(false)
    const defineview=()=>{
        if (props.type===0){
            return <TableView year={props.year} name={props.name}/>
        }
        if (props.type===1){




            return <ChartView year={props.year} type={"stacked_bar"} name={props.name} setContent={setContent}/>
        }
        if (props.type===2 || props.type==5 || props.type==6){
            return <ChartView year={props.y} type={"horizontal_bar"} name={props.name} setContent={setContent}/>
        }
         if (props.type===3){

            return <ChartView y1={props.y1} y2={props.y2}  type={"line"} name={props.name} setContent={setContent}/>
        }
        if (props.type===4){
             return <ChartView y1={props.y1} y2={props.y2} type={"line_bar"} name={props.name} setContent={setContent}/>
        }
        if (props.type===7){

            return <MapDisplayer map_download={map_download} setmapdownload={setmapdownload} name={props.name} setContent={setContent}/>

        }
        else{
            return null
        }
    }

    const  export_table=(cl)=>{
        console.log(props.name)
        let options={width: 800, height: 600}
         let tb=document.getElementById(props.name)
         let a=html2canvas(tb,options).then(function (canvas) {
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
   // download image & pdf needs fixes
    function DownloadImage() {

         if (content===undefined) {
             if (props.name==="databydaytype"){
             export_table(true).then(r => {
             });
         }
         if (props.name==="databyregion"){
          //   export_map()
             export_table(true).then(r => {
             });
         }

             return;
         }
        let a = document.createElement('a');
        //a.href = content.toBase64Image()
         a.href = content.toBase64Image('image/png',1);//find correct background color
        a.download = props.name + ".png"
        a.click();
        console.log("image")
    }

    function DownloadPDF() {
         let doc = new jsPDF();
         let width = doc.internal.pageSize.getWidth();
         let height = doc.internal.pageSize.getHeight();
         if (content===undefined){
            export_table(false).then(r => {

                let img= r.toDataURL("image/png", 1.0);
                if (props.name==="databyregion"){
                     doc.addImage(img, 'PNG', 0, 0,r.width/2 , r.height/2 );
                }
                else{
                    doc.addImage(img, 'PNG', 0, 0,r.width/4 , r.height/2 );
                }

	            doc.save( props.name + ".pdf");

            })
           // console.log(pr)
            return
        }


        let img=content.toBase64Image('image/png',1);
         //console.log(width+","+height)
        // console.log(content.width+","+content.height)
        doc.addImage(img, 'PNG', 0, 0, width, width );
	    doc.save( props.name + ".pdf");
        //console.log("PDF")
    }

    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div style={{marginLeft:props.ml,display:"inline-block",width:(props.type===2 || props.type===3 || props.type===4)?"66%":null}} className={"data-table-view"}>
        <div style={{marginTop:"2%",marginLeft:props.mln}}>
            <FontAwesomeIcon id={"exportimage"+props.type} icon={faFileImage} style={{color:"#0F8DD6",marginRight:"15%",cursor: "pointer"}} size="lg" title={"Download png"} onClick={DownloadImage} />
            <FontAwesomeIcon icon={faFilePdf} style={{color:"#0F8DD6",cursor: "pointer"}} size="lg" title={"Download pdf"} onClick={DownloadPDF} />
        </div>

       <hr id={"data-sep"}/>
        {props.name==="databyregion"}
        <div id={"format-table"}>
              {defineview()}
        </div>







    </div>
  );
}
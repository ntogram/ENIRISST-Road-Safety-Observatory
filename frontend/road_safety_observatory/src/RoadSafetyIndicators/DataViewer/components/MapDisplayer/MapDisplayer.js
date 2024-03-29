import React, {Component, useEffect, useRef, useState} from "react";
import {TileLayer, Popup, Marker, MapContainer, useMap} from "react-leaflet";
import ZoomController from "./ZoomController"


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faFilePdf} from "@fortawesome/free-solid-svg-icons";
import {faSearchPlus,faSearchMinus} from "@fortawesome/free-solid-svg-icons";
import plus from"./images/+.png"
import minus from"./images/-.png"
import GreekArea from "../../../../GreekStatistics/components/MapDisplayer/GreekArea";
import Greek_Region_Layer from "../../../../GreekStatistics/components/MapDisplayer/Greek_Region_Layer";
//names of nuts3 areas are not same in db and json
import greek_regions from "../../../../GreekStatistics/components/MapDisplayer/GR_NUTS3.json";
import greek_oik from "../../../../GreekStatistics/components/MapDisplayer/oik_merge.json"
import greek_dim from "../../../../GreekStatistics/components/MapDisplayer/Kal_Dim.json"; //--memory problem &&
/* names of municipalities are not same in db and json
Some muncipalities are not found in json
*/
import DefaultGreekLayer from "./DefaultGreekLayer";
import CustomSelector from "../../../../Main_Components/CustomSelector/CustomSelector";
import  formoptions from "../../../FormView/formoptions.json"
import axios from "axios";
import NutLayer from "./NutLayer";
import OikLayer from "./OikLayer";
import DimLayer from "./DimLayer";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

function Download(props) {
    const map = useMap()
     useEffect(() => {
         let center=map.getCenter()
         let zoom=map.getZoom()
         console.log(center)
         console.log(zoom)
         if (props.ds===true){
             if(zoom!==5){
                map.setView({lat:36.24068432457244,lng:22.961684549417058},5)
           //  if (center["lat"]!==36.24068432457244 && center["lng"]!==22.961684549417058 && zoom!==5){
                //map.setView({lat:36.24068432457244,lng:22.961684549417058},5)
             }
         }
         if (zoom===5){
              let state=localStorage.getItem("state")
               console.log(state)
              if (state!==undefined) {

                 props.exportdata(true).then(r => {})
                  localStorage.removeItem("state")

              }
         }

         console.log("After")
         console.log(map.getZoom())
         /*if(props.ds===true){
             props.setds(false)
         }*/

     })

    return null
}

    function MapDisplayer(props) {


          const position =  [38.58, 24]
          const prevyear=React.useRef();
          const previndicator=React.useRef()
          const [year,setyear]=React.useState(null)
          const [indicator,setindicator]=React.useState(null)
          const [limits,setlimits]=React.useState(null)
          const [changed,setchanged]=React.useState(false)
           const [ds,setds]=React.useState(false)



     const  export_table=(cl)=>{
        console.log(props.name)
        let options={width: 800, height: 600,backgroundColor:null}
         let tb=document.getElementById("mymap")
         let a=html2canvas(tb,options).then(function (canvas) {
                 let a = document.createElement('a');
                 a.href = canvas.toDataURL("image/png", 1.0);
                 console.log(canvas)
                 a.download = "data.png"
                 if (cl===true){
                      a.click();
                 }
                 return canvas
             });
         return a
    }

    function DownloadImage() {
        if (isCompleted()){
            if (ds===false){
              console.log("image")
              localStorage.setItem("state","png")
              setds(true)
         }




             // export_table(true).then(r => {
             // });
             // export_data(true).then(r => {
             // });


        }

    }

    function DownloadPDF() {

       if (isCompleted()){
            console.log("PDF")
            localStorage.setItem("state","pdf")
           setds(true)
        }
    }
    function  displayoptions() {
        if (props.formdata === undefined || Object.keys(props.formdata).length === 0 || props.completed===false) {
            return false
        } else {
            if (props.formdata["indicators"] === undefined || props.formdata["indicators"].length === 0) {
                return false
            }
             if (props.formdata["selectedyears"] === undefined || props.formdata["selectedyears"].length === 0) {
                return false
            }
             if (props.formdata["areas"][0].group==="Επικράτεια"){
                 return false
             }



             return true
        }

    }

    const findIndicatorCode=()=>{
       let options=[]

          // console.log("ind")
            let group=props.formdata["areas"][0]["group"]
            let categories=formoptions["formoptions"].filter(opt=>{
                    return (opt["geounit"]===group)})
          //  console.log(categories)
            if (categories!==undefined){

                let indicators=categories[0]["categories"].filter(element=> {


                return (element.name===props.formdata["category"])})
            console.log(indicators)
            if (indicators.length===0){
                return null
            }
            else{
                let code=null
                for (let i=0;i<indicators[0]["indicators"].length;i++){
                    if (indicators[0]["indicators"][i].name===indicator){
                        code=indicators[0]["indicators"][i].code
                        break
                    }
                }
                return code
            }


            }
}
     async function getThresholds(code,year){
              let path="http://localhost:8080/api/qty/"+code+"/"+year
               try {
                const response = await axios.get(path);
               // console.log(response.data);
                return response.data
            } catch (error) {
                console.log(error);
            }
        }




    const calculate_indcode=()=>{
              if (prevyear.current===year && previndicator.current===indicator){
                    return
              }
              console.log("make request")
             if (Object.keys(props.formdata).length!==0){
                  let code=findIndicatorCode()
                  console.log(code)
                  let d = getThresholds(code,year).then(
                            (response) => {
                                if(response!==undefined){
                                      setlimits(response.limits)
                                }


                            })

             }

    }
    const selectdata=()=>{
              if (year!=null && indicator!=null){
                    let selecteddata=[]
                    for(let i=0;i<props.data.current.length;i++){
                        if (props.data.current[i].year==year){
                            selecteddata.push({"area":props.data.current[i].area,"year":year,"indicator":props.data.current[i].indicators[indicator],"ind_name":indicator})
                        }
                    }


                    return selecteddata
              }

            return null

    }


   const  isCompleted=()=>{
               if(Object.keys(props.formdata).length!==0 && year!=null && indicator!=null) {
                   return true
               }
               else{
                   return false
               }
    }


    const btn_style=()=>{

    }


    const showVisualizationLayer=()=>{
             if(Object.keys(props.formdata).length!==0 && year!=null && indicator!=null) {

                 let group = props.formdata["areas"][0]["group"]
                 console.log(group)
                 switch (group) {
                     case "Περιφερειακές Ενότητες (NUTS3)":
                          console.log("r")
                          console.log(selectdata())
                         // console.log(limits)

                         return <NutLayer zipUrl={greek_regions} data={selectdata()} limits={limits} code={findIndicatorCode()} completed={props.completed}/>
                     case "Οικισμοί":
                         //return null

                         return <OikLayer zipUrl={greek_oik} data={selectdata()} limits={limits} code={findIndicatorCode()} completed={props.completed}/>
                     case "Δήμοι":
                         return <DimLayer zipUrl={greek_dim} data={selectdata()} limits={limits} code={findIndicatorCode()} completed={props.completed}/>
                     default:
                         return null
                 }
             }
             return null
    }


     React.useEffect(() => {
                console.log("dmv")
             //   console.log(props.formdata)
             //   console.log(props.data.current)
                calculate_indcode()

               // let data=selectdata()
              //  console.log(limits)
                //console.log(JSON.parse(localStorage.getItem("limits")))
                prevyear.current=year
                previndicator.current=indicator
                if (ds===true){
                      let t=localStorage.getItem("state")
                     console.log(t)
                      if (t==="png"){
                          export_table(true).then(r => {});
                          localStorage.removeItem("state")
                          setds(false)
                      }
                       if (t==="pdf"){
                            let doc = new jsPDF();
                            let width = doc.internal.pageSize.getWidth();
                            let height = doc.internal.pageSize.getHeight();
                           export_table(false).then(r => {

                                   let img = r.toDataURL("image/png", 1.0);
                                   doc.addImage(img, 'PNG', 0, 0, r.width / 2, r.height / 2);
                                   doc.save("data" + ".pdf");

                           })
                           localStorage.removeItem("state")
                           setds(false)
                      }



                }
            })


        return (
            <div id={"map2"} style={{width:"80%"}} className={"data-table-view"}>
        <div style={{marginTop:"2%",marginLeft:"80%"}}>
            <FontAwesomeIcon icon={faFileImage} style={{ color:(isCompleted())?"#0F8DD6":"#CED4DA",cursor: (props.completed)?"pointer":"auto",marginRight:"15%"}} size="lg" title={"Download png"} onClick={DownloadImage} />
            <FontAwesomeIcon icon={faFilePdf} style={{ color:(isCompleted())?"#0F8DD6":"#CED4DA",cursor: (isCompleted())?"pointer":"auto"}} size="lg" title={"Download pdf"} onClick={DownloadPDF} />
        </div>

       <hr style={{marginLeft:"5%",width:"90%"}}className={"data-sep"}/>
        <div  style={{marginLeft:"5%",marginBottom:"5%",display:displayoptions()?"block":"none",position:"relative",zIndex:"1200"}}>
             <table>
          <tr>
              <td style={{width:"50%"}}>
                  <CustomSelector pos={"top"} width={"250px"} sendoptions={setindicator}   setchange={setchanged} options={displayoptions()?props.formdata["indicators"]:[]}/>
              </td>
              <td style={{width:"50%"}}>

                  <CustomSelector pos={"top"} width={"180px"}sendoptions={setyear}   setchange={setchanged} options={displayoptions()?props.formdata["selectedyears"]:[]}/>
              </td>
          </tr>
             </table>



        </div>
         <div  id={"mymap"}>
            <MapContainer style={{height: '50vh',backgroundColor:"white",marginLeft: "5%"}} center={position} zoom={5.7}  zoomControl={false}
                     maxZoom={20} minZoom={5} zoomSnap={0.1} zoomDelta={0.1}
                         // maxBounds={[[34.9199876979,20.1500159034], [41.8269046087,26.6041955909]]}
                // dragging={false}     zoomControl={false}  scrollWheelZoom={false}
                          attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            <DefaultGreekLayer zipUrl={greek_regions}/>
                {showVisualizationLayer()}
                {ds==false ?<ZoomController/>:null}
                {/*<Download ds={ds} setds={setds} exportdata={export_table} />*/}
            </MapContainer>
            </div>
            </div>
        )



}
export default MapDisplayer;
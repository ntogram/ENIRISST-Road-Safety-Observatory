import React, {Component, useEffect, useRef, useState} from "react";
import {TileLayer, Popup, Marker, MapContainer} from "react-leaflet";
import ZoomController from "./ZoomController"


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImage, faFilePdf} from "@fortawesome/free-solid-svg-icons";
import {faSearchPlus,faSearchMinus} from "@fortawesome/free-solid-svg-icons";
import plus from"./images/+.png"
import minus from"./images/-.png"
import GreekArea from "../../../../GreekStatistics/components/MapDisplayer/GreekArea";
import Greek_Region_Layer from "../../../../GreekStatistics/components/MapDisplayer/Greek_Region_Layer";
import greek_regions from "../../../../GreekStatistics/components/MapDisplayer/GR_NUTS3.json";
import greek_oik from "../../../../GreekStatistics/components/MapDisplayer/oik_merge.json"
//import greek_dim from "../../../../GreekStatistics/components/MapDisplayer/kal_dim_merge.json"; --memory problem
import DefaultGreekLayer from "./DefaultGreekLayer";
import CustomSelector from "../../../../Main_Components/CustomSelector/CustomSelector";
import  formoptions from "../../../FormView/formoptions.json"
import axios from "axios";
import NutLayer from "./NutLayer";
import OikLayer from "./OikLayer";




    function MapDisplayer(props) {

          const position =  [38.58, 24]
          const prevyear=React.useRef();
          const previndicator=React.useRef()
          const [year,setyear]=React.useState(null)
          const [indicator,setindicator]=React.useState(null)
          const [limits,setlimits]=React.useState(null)
         // const [indcode,setindcode]=React.useState(null)
          const [changed,setchanged]=React.useState(false)
     function DownloadImage() {
        console.log("image")
    }

    function DownloadPDF() {

        console.log("PDF")
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

    const showVisualizationLayer=()=>{
             console.log("svm")
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
            })


        return (
            <div id={"map2"} style={{width:"80%"}} className={"data-table-view"}>
        <div style={{marginTop:"2%",marginLeft:"80%"}}>
            <FontAwesomeIcon icon={faFileImage} style={{color:"#CED4DA",marginRight:"15%"}} size="lg" title={"Download png"} onClick={DownloadImage} />
            <FontAwesomeIcon icon={faFilePdf} style={{color:"#CED4DA"}} size="lg" title={"Download pdf"} onClick={DownloadPDF} />
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
            <ZoomController/>
            </MapContainer>
            </div>
            </div>
        )



}
export default MapDisplayer;
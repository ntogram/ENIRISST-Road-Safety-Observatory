import React, {Component, useEffect, useRef, useState} from "react";
import {TileLayer, Popup, Marker, MapContainer, useMapEvents, SVGOverlay, useMap, CircleMarker} from "react-leaflet";
import "./map_styles.css"
import greek_regions from "./GR_NUTS2.json"
import Greek_Region_Layer from "./Greek_Region_Layer";
import GreekArea from "./GreekArea";
import g10 from "../DataViews/ChartView/chart_data/graph10.json"
import g11 from "../DataViews/ChartView/chart_data/graph11.json"



const LocationFinderDummy = () => {
    const [cpos, setcpos] = useState(null)
    const map = useMapEvents({
        click(e) {
            console.log(e.latlng);
            setcpos(e.latlng)
            if (cpos===null){

            }
        },
    });
    return (cpos===null)?null:
        <Marker position={cpos}>
      <Popup>
        Current location:
                           <pre>{JSON.stringify(cpos, null, 2)}</pre>
      </Popup>
    </Marker>;

};

const LocationFinder=()=>{




    const map = useMapEvents({
      dragend: (e) => {
        console.log("mapCenter", e.target.getCenter());
        console.log("zoom"+map.getZoom())
       // console.log("map bounds", e.target.getBounds());
      }
    });
    return null;




}


function MyCircleMarker(props) {
  const [position, setPosition] = useState(props.pos)
  const [name, setName] = useState(props.region_name)


 useEffect(() => {
       // console.log(pathoptions)
       /* if (props.r!=props.region_name){
          setPathOptions({ color: 'orange', fillColor: 'blue' })
        }*/

      });




     return  <CircleMarker
     center={position}
     pathOptions={(props.r!=props.region_name)? { color: 'orange', fillColor: 'blue' }:{ color: 'yellow', fillColor: 'red' }}
     radius={props.radius}
     eventHandlers={{
      click: (e) => {
       // console.log('marker clicked', e)
       // setPathOptions({ color: 'yellow', fillColor: 'darkgreen' })
        props.SendRegion(name)
      },
    }}



 >
 <Popup position={position}>
            {/*Current location:*/}
            {/*<pre>{JSON.stringify(position, null, 2)}</pre>*/}
            <pre>Περιφέρεια: {name}</pre>
            <pre>Αριθμός νεκρών {props.value} νεκροί</pre>
          </Popup>
 </CircleMarker>

 //}

 }










    function MapDisplayer(props) {
          const [map, setMap] = useState(null);
          const [area,setarea]=useState(null)
          const [selected_region,setSelectedRegion]=React.useState("")
          const position =  [38.58, 23.5]
          const radius=[3,6,9,12,15,18];
        const regions = {
            "Πελοπόννησος": [37.50889, 22.37944],
            "Δυτική Ελλάδα": [38.24444, 21.73444],
            "Κρήτη": [35.32969, 25.12985],
            "Κεντρική Μακεδονία": [40.63666412, 22.942162898],
            "Ήπειρος": [39.66486, 20.85189],
            "Αττική": [37.97945, 23.71622],
            "Ιόνιοι Νήσοι": [39.62069, 19.91975],
            "Δυτική Μακεδονία": [40.30069, 21.78896],
            "Θεσσαλία": [39.624330836, 22.4203649852],
            "Βόρειο Αιγαίο": [39.11, 26.55472],
            "Ανατολική Μακεδονία & Θράκη": [41.11917, 25.40535],
            "Νότιο Αιγαίο": [37.463493, 24.916088],
            "Στερεά Ελλάδα": [38.902790, 22.443008],
        }

        const selectRegion=(value)=>{
                setSelectedRegion(value)

              }


        const calculate_radius=(y)=>{
                  if (y===undefined){
                      return []
                  }
                  let limkeys=(Object.keys(g11)).filter(elem=> elem!="μ.ο.")
                  console.log(limkeys)
                  const r = g10.find(element => element["Έτος"]==y);
                  let data=[]
                  let rd=-1
                  for (const [key, value] of Object.entries(r)) {
                      if (key!=="Σύνολο Νεκρών" && key!=="Έτος"){
                            for(let i=0;i<limkeys.length;i++){
                                if (value<g11[limkeys[i]][key]){
                                    rd=radius[i]
                                    break
                                }
                            }
                            if (rd===-1){
                                rd=radius[radius.length-1]
                            }
                            data.push({"per":key,"radius":rd,"center":regions[key],"value":value})
                      }
                  }
                   let circlemarkers=[]
                   for(let i=0;i<data.length;i++){
                         circlemarkers.push(<MyCircleMarker r={selected_region} SendRegion={selectRegion}
                          pos={data[i]["center"]} region_name={data[i]["per"]} radius={data[i]["radius"]} value={data[i]["value"]}/>)
                             }





                return circlemarkers



        }





           useEffect(() => {
               // console.log("new")
               //console.log(props.year)
             //  calculate_radius(props.year)
              // console.log(props.map_download)
                //console.log(area)


           })

        //mapCenter Object { lat: 35.97543821342023, lng: 30.778081108439043 }
        return (
            <div id={props.name}>
            <MapContainer style={{height: '50vh',minWidth:"100%",backgroundColor:"white",marginLeft: "5%"}} center={position} zoom={5.7}
                     doubleClickZoom={false} zoomControl={false}  maxZoom={7} minZoom={1} zoomSnap={0.1} zoomDelta={0.1}
                         // maxBounds={[[34.9199876979,20.1500159034], [41.8269046087,26.6041955909]]}
                // dragging={false}     zoomControl={false}  scrollWheelZoom={false}
                          attributionControl={false} whenReady={setMap}
            >
                <GreekArea/>
                 <Greek_Region_Layer zipUrl={greek_regions} setArea={setarea}  />
                {calculate_radius(props.year)}

            </MapContainer>
            </div>
        )



}
export default MapDisplayer;
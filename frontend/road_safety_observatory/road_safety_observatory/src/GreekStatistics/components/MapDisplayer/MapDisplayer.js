import React, {Component, useEffect, useRef, useState} from "react";
import {TileLayer, Popup, Marker, MapContainer, useMapEvents, SVGOverlay, useMap} from "react-leaflet";
import "./map_styles.css"

import greek_regions from "./GR_NUTS3.json"
import Greek_Region_Layer from "./Greek_Region_Layer";
import GreekArea from "./GreekArea";

import L from "leaflet";
import {SimpleMapScreenshoter} from "leaflet-simple-map-screenshoter";
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





    function MapDisplayer(props) {
          const [map, setMap] = useState(null);
          const [area,setarea]=useState(null)
          const position =  [38.58, 23.5]
           useEffect(() => {

                //console.log(area)


           })


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

            </MapContainer>
            </div>
        )



}
export default MapDisplayer;
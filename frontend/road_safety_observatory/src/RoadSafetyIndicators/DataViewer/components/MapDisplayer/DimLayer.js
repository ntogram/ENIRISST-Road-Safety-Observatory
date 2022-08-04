import React, {Component, useEffect, useRef, useState} from "react";
import { useMap } from "react-leaflet";
import names from "../../../../GreekStatistics/components/MapDisplayer/nuts3names.json";
import L from "leaflet";
import "./map.css"
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter'
import {element} from "prop-types";
function DimLayer(zipUrl) {
    const map = useMap()
    const form_mun_name=(name)=>{
        let returned_name=""
        let parts=name.split(" ")
        for(let i=1;i<parts.length;i++){
            returned_name=returned_name+parts[i]
        }
        return returned_name


    }
    //const geo=useRef(null)
    const getAreas=()=>{
     let areas=[]
     for (let j=0;j<zipUrl["data"].length;j++){
         areas.push(zipUrl["data"][j]["area"])
         //areas.push(form_mun_name(zipUrl["data"][j]["area"]))
     }
     return areas;
    }

    const create_greek_dim_layer=()=>{
             console.log("map visualization")
             console.log(zipUrl)
             let areas=getAreas();
             console.log(areas)
             let region_obj=zipUrl["zipUrl"]
            let features = region_obj["features"].filter(
                (elem) => {
                //    console.log(elem)
                    let name = elem["properties"]["Name"]
                   // console.log(name)
                    if (areas.includes(name)) {
                        return elem
                    }
                }
            )
     let data_features=[]
     for (let i=0;i<features.length;i++){
          let item=features[i]
          let name=item["properties"]["Name"]
          let r=zipUrl["data"].find((elem)=> {
            return elem["area"]===name
            // return form_mun_name(elem["area"])===name

         })
         let popupContent="<div class='popup-text'>"+"<span class='popup-head'>"+r["area"]+"</span>"+"<br/>Έτος:"+r["year"]+"<br/>"+r["ind_name"] +":"+r["indicator"]+"</div>"
         let elem = {
             "type": item["type"],
             "properties": {
                 "name": name,
                 "indicator": r["indicator"],
                  "popupContent":popupContent
             },
             "geometry": item["geometry"]
         }
         data_features.push(elem)
     }
     return data_features
    }


  function getColor(d) {
     if(zipUrl["completed"]==false){
         return "#F9FAFB"
     }
     let limits=zipUrl["limits"]
     switch (zipUrl["code"]){
        case "kd13":
            return d >limits[0]?'#75D1D8':'#044293'

        default:
           if (isNaN(d) || d===-1){
               return "#808080"
           }


             return d >limits[limits.length-1]  ?'#A471D1'  :
                 d > limits[limits.length-2] ? '#FF9B91' :
                     d > limits[limits.length-3] ? '#75D1D8' :
                         '#044293';

     }

  }

  function style(feature) {
    return {
        fillColor: getColor(feature.properties.indicator),
        opacity:1,
        weight:1,
       color:'#044293',
        fillOpacity:1
    };
}


function highlightFeature(e) {
    var layer = e.target;
    localStorage.setItem("fcolor",e.target.options.fillColor)
    layer.setStyle({
        fillColor:"#F9FAFB",
        opacity: 1,
        weight:1,
       color: '#044293',
        fillOpacity:1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
    layer.openPopup()
}

function resetHighlight(e) {
        var init_color=localStorage.getItem("fcolor")
        localStorage.removeItem('fcolor')
        var layer = e.target;
        layer.setStyle({
        fillColor:init_color,
        opacity: 1,
        weight:1,
       color: '#044293',
        fillOpacity:1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
  //  geo.current.resetStyle(e.target);
    e.target.closePopup()
}
    const filterLimits=(a)=>{
        let b=a.filter(
            (elem)=> elem>=0
        )
        b.reverse()
        if(b[b.length-1]===0){
            return b
        }
        b.push(0)
        return b

    }

    const clearLegend=()=>{
        let l=document.getElementsByClassName("mapinfo maplegend")
        if (l.length>0){
            l[0].remove()
        }

    }

    const clearPoints=()=> {
        console.log(map)
        let _layers = map._layers
        let kt=Object.keys(_layers)
        for (let i = 0; i < kt.length; i++) {
         if ("_popupHandlersAdded" in _layers[kt[i]]) {

             _layers[kt[i]].remove()
         }
     }
    }

 // console.log('map center:', map)
  useEffect(() => {
       if (zipUrl["completed"]===false){
            clearPoints()
            clearLegend()
      }


    if (zipUrl["limits"]!==null && zipUrl["completed"]===true) {
         console.log("map visualization")
         clearPoints()
        console.log(zipUrl)
        let datafeatures = create_greek_dim_layer()

        function onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.popupContent) {
                layer.bindPopup(feature.properties.popupContent, {closeButton: false, offset: L.point(0, -20)})

            }

            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                // click: zoomToFeature
            });
        }

        const geojson = L.geoJson(datafeatures, {
            style: style,
            onEachFeature: (zipUrl["completed"] == false) ? null : onEachFeature
        }).addTo(map);
        // if (zipUrl["completed"]===true && geo.current===null){
        //     geo.current=geojson
        // }

        // setgeo(geojson)


        clearLegend()
        if (zipUrl["completed"] === true) {
            var legend = L.control({position: 'bottomleft'});

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'mapinfo maplegend')
                let grades = filterLimits(zipUrl["limits"])
                console.log(grades)
                //  labels = [];
                div.innerHTML = '<div id="palletes" style="float:left"></div><div id="labels" style="float:right"></div>'
                let palletes = div.childNodes[0]
                let titles = div.childNodes[1]
                //console.log(titles)
                palletes.innerHTML += '<i style="background:' + getColor(grades[0] + 1) + '"></i><br/>'
                titles.innerHTML += '<div style="padding-bottom: 40%"  class="map-text">' + '</div>'
                titles.innerHTML += '<div  style="padding-bottom: 40%" class="map-text">' + '</div>'
                if (zipUrl["code"]!=="kd13")
                {
                    for (var i = 0; i < grades.length - 1; i++) {

                    palletes.innerHTML += '<i style="background:' + getColor(grades[i]) + '"></i><br/>'


                    titles.innerHTML += '<div style="padding-bottom: 40%" class="map-text">' + grades[i] + '</div>'
                    // if(i>0 && i!=grades.length-3){
                    //    titles.innerHTML+='<br/>'
                    // }
                }}
                else{
                    titles.innerHTML += '<div style="padding-bottom: 40%" class="map-text">' +1 + '</div>'
                    palletes.innerHTML += '<i style="background:' + '#044293' + '"></i><br/>'
                }
                titles.innerHTML += '<div style="padding-bottom: 40%"  class="map-text">' + 0 + '</div>'
                return div;
            };
            legend.addTo(map);
        }
    }
  });
  return null




}

// Greek_Region_Layer.propTypes = {
//   zipUrl: PropTypes.string.isRequired
// };

export default DimLayer;
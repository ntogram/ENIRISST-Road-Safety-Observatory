import React, {Component, useEffect, useRef, useState} from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "./map.css"
import names from "../../../../GreekStatistics/components/MapDisplayer/nuts3names.json";

function OikLayer(zipUrl) {
     const map = useMap()

     const getAreas=()=>{
     let areas=[]
     for (let j=0;j<zipUrl["data"].length;j++){
         areas.push(zipUrl["data"][j]["area"])
     }
     return areas;
    }
     const create_greek_oik_layer=()=> {
         console.log("map visualization")
         console.log(zipUrl)
         let areas = getAreas();
         let region_obj = zipUrl["zipUrl"]
         let features = region_obj["features"].filter(
             (elem) => {
                 let name = elem["properties"]["Name"]
                 if (areas.includes(name)) {
                     return elem
                 }
             })
         console.log(features)//records are distinct? (Glyfada exists many times)
         let data_features=[]
         for (let i=0;i<features.length;i++) {
             let item = features[i]
             let name = item["properties"]["Name"]
             let r=zipUrl["data"].find((elem)=> {
             return elem["area"]===name
             })
             item["geometry"]["coordinates"].push(0.0)
             if (r["indicator"]===-1){
                 r["indicator"]="N/A"
             }
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

    function getFillColor(d) {
        if (zipUrl["completed"] === false) {
            return "#FFFFFF"
        }
        let limits = zipUrl["limits"]
        console.log(limits)
        if (isNaN(d) || d === -1) {
            return "#808080"
        }


        return d > limits[limits.length - 1] ? '#CAA5EB' :
            d > limits[limits.length - 2] ? '#BBFAFF' :
                    '#5485E2';
    }
    function getColor(d){
         if (zipUrl["completed"] === false) {
            return "#FFFFFF"
        }
        let limits = zipUrl["limits"]
        console.log(limits)
        if (isNaN(d) || d === -1) {
            return "#0C1021"
        }
        return d > limits[limits.length - 1] ? '#A471D1' :
            d > limits[limits.length - 2] ? '#75D1D8' :
                    '#044293';

    }
    function style(feature) {
    return {
        fillColor: getFillColor(feature.properties.indicator),
        opacity: 1,
        weight:1,
       color: getColor(feature.properties.indicator),
        fillOpacity:1
    };
}

function highlightFeature(e) {
    var layer = e.target;
    localStorage.setItem("fcolor",e.target.options.fillColor)
    localStorage.setItem("bcolor",e.target.options.color)
    layer.setStyle({
        fillColor:"#F9FAFB",
        opacity: 1,
        weight:1,
       color: '#0C1021',
        fillOpacity:1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
    layer.openPopup()
}

function resetHighlight(e) {
        var init_color=localStorage.getItem("fcolor")
        var binit_color=localStorage.getItem("bcolor")
        localStorage.removeItem('fcolor')
        localStorage.removeItem('bcolor')
        var layer = e.target;
        layer.setStyle({
        fillColor:init_color,
        opacity: 1,
        weight:1,
       color: binit_color,
        fillOpacity:1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront()
    }
  //  geo.current.resetStyle(e.target);
    e.target.closePopup()
}

 function onEachFeature(feature, layer) {
              if (feature.properties && feature.properties.popupContent) {
                  layer.bindPopup(feature.properties.popupContent, {closeButton: false, offset: L.point(0, -20)})

              }
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
            });
        }

 const clearPoints=()=> {
     console.log(map)
     let _layers = map._layers
     let kt=Object.keys(_layers)
     for (let i = 0; i < kt.length; i++) {
         if ("_radius" in _layers[kt[i]]) {
             _layers[kt[i]].remove()
         }
     }

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

 useEffect(() => {

     if (zipUrl["completed"] === false) {
         clearPoints()
         clearLegend()

     }

    else{
        if (zipUrl["limits"] !== null) {

            let datafeatures = create_greek_oik_layer()
            const geojson = L.geoJson(datafeatures, {
                style: style,
                onEachFeature: (zipUrl["completed"] == false) ? null : onEachFeature,
                 pointToLayer: function (feature, latlng) {
                 return L.circleMarker(latlng, {radius: 5});
                 }
                 }).addTo(map);
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
                for (var i = 0; i < grades.length - 1; i++) {

                    palletes.innerHTML += '<i style="background:' + getColor(grades[i]) + '"></i><br/>'
                    // tootltip for legend values because limit values  have many digits-alternative?
                    titles.innerHTML += '<div style="padding-bottom: 40%" title="'+grades[i]+'" class="map-text">' + "Τ"+i + '</div>'
                }
                titles.innerHTML += '<div style="padding-bottom: 40%"  class="map-text">' + 0 + '</div>'
                return div;
            };
            legend.addTo(map);
        }
        }
 }
 })

     return null


}

export default OikLayer;
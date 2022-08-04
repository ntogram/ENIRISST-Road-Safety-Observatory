import React, {Component, useEffect, useRef, useState} from "react";
import { useMap } from "react-leaflet";
import names from "../../../../GreekStatistics/components/MapDisplayer/nuts3names.json";
import L from "leaflet";
import "./map.css"
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter'
import {element} from "prop-types";
function NutLayer(zipUrl) {
    const map = useMap()
    //const geo=useRef(null)
    const getAreas=()=>{
     let areas=[]
     for (let j=0;j<zipUrl["data"].length;j++){
         areas.push(zipUrl["data"][j]["area"])
     }
     return areas;
    }



    const create_greek_region_layer=()=>{
     console.log("map visualization")
     console.log(zipUrl)
      let areas=getAreas();
      let region_obj=zipUrl["zipUrl"]
      let features=region_obj["features"].filter(
          (elem)=>{
                let name=elem["properties"]["NUTS_NAME"]
           //   let name=names[elem["properties"]["NUTS_NAME"]]
                    if (areas.includes(name)){
                        return elem
                    }
              }
      )
      //console.log(features)
      console.log(zipUrl)
      let data_features=[]
     for (let i=0;i<features.length;i++){
          let item=features[i]
          let name=item["properties"]["NUTS_NAME"]
          let r=zipUrl["data"].find((elem)=> {
              return elem["area"]===name
             //return elem["area"]===names[name]
         })


      //   let popupContent="<div> {r["area"]}<br/> Έτος:{r["year"]}<br/> {r["ind_name"]}:{r["indicator"]} </div>"
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
    /*  for ( let feature in region_obj["features"]){
        console.log(feature)
      }*/
    }

  function getColor(d) {
     if(zipUrl["completed"]==false){
         return "#F9FAFB"
     }
     let limits=zipUrl["limits"]
     switch (zipUrl["code"]){
        case "nut13":
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
        opacity: 1,
        weight:1,
       color: '#044293',
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



 // console.log('map center:', map)
  useEffect(() => {
       if (zipUrl["completed"]===false){
            clearLegend()
      }


    if (zipUrl["limits"]!==null) {
        let datafeatures = create_greek_region_layer()

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
                if (zipUrl["code"]!=="nut13")
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

     //console.log('map center:', zipUrl)
   //   console.log(setArea)

   // zipUrl["setArea"](geo)
    ///setArea(geo)

      // loop through our density intervals and generate a label with a colored square for each interval
      // for (var i = 0; i < grades.length; i++) {
      //   if(i<grades.length-1){
      //      div.innerHTML +=
      //       '<i style="background:' + getColor(grades[i]) + '"></i> ' +'<span>'+grades[i]+'</span>' +'<br/>'
      //   }
      //   else{
      //      div.innerHTML +='<i style="background:' +"transparent"+ '"></i> ' +'<span>'+grades[i]+'</span>' +'<br/>'
      //   }
      //
      //       // grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      // }







  });
  return null




}

// Greek_Region_Layer.propTypes = {
//   zipUrl: PropTypes.string.isRequired
// };

export default NutLayer;
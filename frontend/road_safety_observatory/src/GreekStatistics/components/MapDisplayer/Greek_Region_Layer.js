import { useEffect } from "react";

import { useMap } from "react-leaflet";
import L from "leaflet";
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter'
function Greek_Region_Layer(zipUrl,setArea) {
 const map = useMap()

    const create_greek_region_layer=()=>{
      let region_obj=zipUrl["zipUrl"]
      let data_features=[]
      let data={type:region_obj["type"],features:[]}
      for (let i=0;i<region_obj["features"].length;i++){
        let item=region_obj["features"][i]
        let elem={
          "type":item["type"],
          "id":item["id"],
          "properties":{
            "name":item["properties"]["PER"],
            "accident_number": Math.floor(Math.random() * (500 - 100) ) + 100
          },
          "geometry":item["geometry"]
        }
        data_features.push(elem)
      }
      return data_features
    /*  for ( let feature in region_obj["features"]){
        console.log(feature)
      }*/
    }

  function getColor(d) {
    return d > 400 ? '#FF9B91' :
        d > 300 ? '#A471D1' :
            d > 200 ? '#75D1D8' :
                '#044293';
  }

  function style(feature) {
    return {
        fillColor: "#C0C0C0",
        opacity: 1,
        weight:1,
       color: '#044293',
        fillOpacity:1
    };
}

 // console.log('map center:', map)
  useEffect(() => {
    let datafeatures=create_greek_region_layer()
     console.log('map center:', zipUrl)
   //   console.log(setArea)
    const geo = L.geoJson(datafeatures,{style: style}).addTo(map);
    zipUrl["setArea"](geo)
    ///setArea(geo)
   /* var legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'mapinfo maplegend')
      let grades = [500, 400, 300, 200, 100]
      //  labels = [];
      div.innerHTML = '<div id="palletes" style="float:left"></div><div id="labels" style="float:right"></div>'
      let palletes = div.childNodes[0]
      let titles = div.childNodes[1]
      console.log(titles)
      for (var i = 0; i < grades.length; i++) {
          if (i!=grades.length-1){
             palletes.innerHTML+= '<i style="background:' + getColor(grades[i]) + '"></i><br/>'
          }
        titles.innerHTML+='<div class="map-text">'+grades[i]+'</div>'
        // if(i>0 && i!=grades.length-3){
        //    titles.innerHTML+='<br/>'
        // }
      }
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

      return div;
};
//L.control.BigImage().addTo(map);
legend.addTo(map);*/





  },[]);
  return null




}

// Greek_Region_Layer.propTypes = {
//   zipUrl: PropTypes.string.isRequired
// };

export default Greek_Region_Layer;
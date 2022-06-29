import { useEffect } from "react";

import { useMap } from "react-leaflet";
import L from "leaflet";
function DefaultGreekLayer(zipUrl ) {
 const map = useMap()

    const create_greek_region_layer=()=>{
      let region_obj=zipUrl["zipUrl"]
      let data_features=[]
      let data={type:region_obj["type"],features:[]}
      for (let i=0;i<region_obj["features"].length;i++){
        let item=region_obj["features"][i]
        let elem={
          "type":item["type"],
         // "id":item["id"],
          "properties":{
            "name":item["properties"]["NUTS_NAME"],
           // "accident_number": Math.floor(Math.random() * (500 - 100) ) + 100
          },
          "geometry":item["geometry"]
        }
        data_features.push(elem)
      }
      console.log(data_features)
      return data_features
    /*  for ( let feature in region_obj["features"]){
        console.log(feature)
      }*/
    }


  function style(feature) {
    return {
        fillColor: "#F9FAFB",
        opacity: 1,
        weight:1,
       color: '#044293',
        fillOpacity:1
    };
}

 // console.log('map center:', map)
  useEffect(() => {
    let datafeatures=create_greek_region_layer()
    // console.log('map center:', zipUrl)
    const geo = L.geoJson(datafeatures,{style: style}).addTo(map);






  },[]);
  return null




}

// Greek_Region_Layer.propTypes = {
//   zipUrl: PropTypes.string.isRequired
// };

export default DefaultGreekLayer;
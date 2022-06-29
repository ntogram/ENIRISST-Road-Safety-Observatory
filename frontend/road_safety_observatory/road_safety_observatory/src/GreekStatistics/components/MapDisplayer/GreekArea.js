import { useEffect } from "react";

import { useMap } from "react-leaflet";
import "leaflet-boundary-canvas";

import L from "leaflet";
import greek_regions from "./GR_NUTS3.json"
function GreekArea( ) {
  const map = useMap()





 // console.log('map center:', map)
  useEffect(() => {

        if (!map) return;
        const osm = L.TileLayer.boundaryCanvas(
                 "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                 {
                     boundary: greek_regions,


                 }
             ).addTo(map);
           //  const grLayer = L.geoJSON(greece_area,{style: {color:"red"}});
           //  map.fitBounds(grLayer.getBounds());


  },[]);
  return null




}

// Greek_Region_Layer.propTypes = {
//   zipUrl: PropTypes.string.isRequired
// };

export default GreekArea;
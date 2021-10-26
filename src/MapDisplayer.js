import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import{ useState, useEffect,useRef} from 'react';
import ReactDOM from 'react-dom';
import {MapContainer, TileLayer, Popup, Marker, useMapEvents,MapConsumer,LayersControl,CircleMarker,Rectangle,Polyline,Polygon} from "react-leaflet";
import FormTab from './FormTab';
import mapfeatures from './NUTS3/greekregionsr.json'

//helping functions
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => arraysEqual(object[key],value))
}



function MyCircleMarker(props) {
  const [position, setPosition] = useState(props.pos)
  const [name, setName] = useState(props.region_name)
//  const [pathoptions,setPathOptions]=useState({ color: 'orange', fillColor: 'blue' })
 // const [czoom,setczoom]=useState(6)
  /* const map = useMapEvents({
     click(event) {
         console.log("locate")
         let r=getKeyByValue(props.regions,event.latlng)
         console.log(r)
         
           console.log(event.latlng)
           setPosition(event.latlng)
          // map.flyTo(event.latlng, 13)
         
          // setczoom(14)
       
 
        // console.log(props.status)
 
 
     }
     })
   
      useEffect(() => {   
       console.log("1")
      /* let popuel=document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
       console.log(popuel)
       if (popuel.length!=0){
       popuel[0].click()}*/
     
   
 //     }); 
 
 useEffect(() => {   
       // console.log(pathoptions)
       /* if (props.r!=props.region_name){
          setPathOptions({ color: 'orange', fillColor: 'blue' })
        }*/

      }); 
     
  
   
 
     return  <CircleMarker
     center={position}
     pathOptions={(props.r!=props.region_name)? { color: 'orange', fillColor: 'blue' }:{ color: 'yellow', fillColor: 'red' }}
     radius={10}
     eventHandlers={{
      click: (e) => {
        console.log('marker clicked', e)
       // setPathOptions({ color: 'yellow', fillColor: 'darkgreen' })
        props.SendRegion(name)
      },
    }}  



 >
 <Popup position={position}>
            Current location: 
            <pre>{JSON.stringify(position, null, 2)}</pre>
            <pre style={{whiteSpace:"initial"}}> {name}</pre>
          </Popup>
 </CircleMarker>
 
 //}
   
 }


function LocationMarker(props) {
 const [position, setPosition] = useState([37.983810, 23.727539])
 const [rtype,setRtype]=useState("Region")
 const prevrtype = useRef();
// const [czoom,setczoom]=useState(6)
  const map = useMapEvents({
    click(event) {
        console.log("locate")
        console.log(props.status)
        console.log(props.rstatus)
        console.log(rtype)

        if (props.status==true &&props.rstatus==false){
          console.log(event.latlng)
          setPosition(event.latlng)
          map.flyTo(event.latlng, 13)
          setRtype("Point")
         // setczoom(14)
        }
        else{
          if (props.status==false &&props.rstatus==true){
            console.log(event.latlng)
            setPosition(event.latlng)
            map.flyTo(event.latlng, 8)
            setRtype("Region")
          }
          else{
          //setPosition(null)
          console.log("NO")}
        }

       // console.log(props.status)


    }
    })
  
     useEffect(() => {   
      console.log("1")
      let popuel=document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
      console.log(popuel)
      if (popuel.length!=0){
      popuel[0].click()}
     // if (prevrtype.current=="Point"&& props.){
       // setRtype(rtype)
     // }
     // setRtype(null) 
    console.log(prevrtype.current)
    console.log(rtype)
    console.log(props.status)
     console.log(props.rstatus)
      prevrtype.current=rtype
     



     /* if (czoom==6){
        map.flyTo(event.latlng, 14)
        setczoom(14)
      }*/
  
     }); 


    if(rtype=="Point"){

  return <Marker  position={position}>
  <Popup position={position}>
           Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
         </Popup>
  </Marker>}
  else{
  //  if(rtype=="Region"){

    return  <CircleMarker
    center={position}
    pathOptions={{ color: 'orange', fillColor: 'blue' }}
    radius={20}
>
<Popup position={position}>
           Current location: 
           <pre>{JSON.stringify(position, null, 2)}</pre>
          

         </Popup>
</CircleMarker>

//}
  }
}





//const LocationMarker = props => {


  /*const map = useMapEvents({
    click(event) {
      console.log(props.layer_name)
      //map.locate()
     // console.log(event.latlng)
     // const { lat, lng } = event.latlng;
     // setPosition(event.latlng)
     // map.flyTo(event.latlng, 12)
      //map.
      
      }
    })


   // console.log(props.layer_name)



  return props.position === null ? null : (
    <Marker  position={props.position} {...props}>
     <Popup  position={props.position}>
              Current location: <pre>{JSON.stringify(props.position, null, 2)}</pre>
            </Popup>
    </Marker>
  )

  /*const [position, setPosition] = useState(null)
  const initMarker = ref => {
    if (ref) {
      console.log(ref)
    //  ref.leafletElement.openPopup()
    }
  }



  const map = useMapEvents({
    click(event) {
      //map.locate()
      console.log(event.latlng)
      const { lat, lng } = event.latlng;
      setPosition(event.latlng)
      map.flyTo(event.latlng, 12)
      //map.
      
      }
    })*/
    
    /*locationfound(event) {

      
      map.flyTo(event.latlng, map.getZoom())
    },*/
  
/*  useEffect(() => {   
    console.log("0")
    let popuel=document.getElementsByClassName("leaflet-marker-icon leaflet-zoom-animated leaflet-interactive")
    console.log(popuel)
    if (popuel.length!=0){
    popuel[0].click()}

   });
    
    // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });




  return position === null ? null : (
    <Marker ref={initMarker} position={position} {...props}>
     <Popup  position={position}>
              Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
            </Popup>
    </Marker>
  )

//  return <Marker ref={selectedMarker} {...props}/>*/
//}




/*
function LocationMarker() {
  const [position, setPosition] = useState(null)

  const map = useMapEvents({
    click(event) {
      //map.locate()
      console.log(event.latlng)
      const { lat, lng } = event.latlng;
      setPosition(event.latlng)
      
      
      }
    
    
    /*locationfound(event) {

      
      map.flyTo(event.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker ref={selectedMarker} position={position}>
     <Popup position={position}>
              Current location: <pre>{JSON.stringify(position, null, 2)}</pre>
            </Popup>
    </Marker>
  )
}
*/




class MapDisplayer extends Component {
  constructor(props) {
    super(props);
    this.regions={
      "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ":[38.37138,21.43151],
"ΑΝΑΤΟΛΙΚΗΣ ΑΤΤΙΚΗΣ":[38.00514,23.88302],
"ΑΡΚΑΔΙΑΣ, ΑΡΓΟΛΙΔΑΣ":[37.50889,22.37944],
"ΑΡΤΑΣ, ΠΡΕΒΕΖΑΣ":[39.16014,20.98561],
"ΑΧΑΪΑΣ":[38.24444,21.73444],
"ΒΟΙΩΤΙΑΣ":[38.43616,22.87665],
"ΒΟΡΕΙΟΥ ΤΟΜΕΑ ΑΘΗΝΩΝ":[38.05,23.8],
"ΔΡΑΜΑΣ":[41.15283,24.1473],
"ΔΥΤΙΚΗΣ ΑΤΤΙΚΗΣ":[38.04135,23.54295],
"ΔΥΤΙΚΟΥ ΤΟΜΕΑ ΑΘΗΝΩΝ":[38.01539,23.69187],
"ΕΒΡΟΥ":[40.84995,25.87644],
"ΕΥΒΟΙΑΣ":[38.46354,23.60284],
"ΕΥΡΥΤΑΝΙΑΣ":[38.91218,21.79836],
"ΖΑΚΥΝΘΟΥ":[37.7999968,20.749997],
"ΗΛΕΙΑΣ":[37.67513,21.44102],
"ΗΜΑΘΙΑΣ":[40.52437,22.20242],
"ΗΡΑΚΛΕΙΟΥ":[35.32969,25.12985],
"ΘΑΣΟΥ, ΚΑΒΑΛΑΣ":[40.93959,24.40687],
"ΘΕΣΠΡΩΤΙΑΣ":[39.50342,20.26728],
"ΘΕΣΣΑΛΟΝΙΚΗΣ":[40.63666412,22.942162898],
"ΙΘΑΚΗΣ, ΚΕΦΑΛΛΗΝΙΑΣ":[38.18109,20.48903],
"ΙΚΑΡΙΑΣ, ΣΑΜΟΥ":[37.7333304,26.83333],
"ΙΩΑΝΝΙΝΩΝ":[39.66486,20.85189],
"ΚΑΛΥΜΝΟΥ, ΚΑΡΠΑΘΟΥ - ΗΡΩΙΚΗΣ ΝΗΣΟΥ ΚΑΣΟΥ, ΚΩ, ΡΟΔΟΥ":[36.166666,28.0],
"ΚΑΡΔΙΤΣΑΣ, ΤΡΙΚΑΛΩΝ":[39.55493,21.76837],
"ΚΑΣΤΟΡΙΑΣ":[40.52165,21.26341],
"ΚΕΝΤΡΙΚΟΥ ΤΟΜΕΑ ΑΘΗΝΩΝ":[37.97945,23.71622],
"ΚΕΡΚΥΡΑΣ":[39.62069,19.91975],
"ΚΙΛΚΙΣ":[40.99302,22.87433],
"ΚΟΖΑΝΗΣ, ΓΡΕΒΕΝΩΝ":[40.30069,21.78896],
"ΚΟΡΙΝΘΙΑΣ":[37.94007,22.9513],
"ΛΑΚΩΝΙΑΣ, ΜΕΣΣΗΝΙΑΣ":[37.03913,22.11265],
"ΛΑΡΙΣΑΣ":[39.624330836,22.4203649852],
"ΛΑΣΙΘΙΟΥ":[35.19106,25.71524],
"ΛΕΣΒΟΥ, ΛΗΜΝΟΥ":[39.11,26.55472],
"ΛΕΥΚΑΔΑΣ":[38.7166638,20.6499974],
"ΜΑΓΝΗΣΙΑΣ, ΣΠΟΡΑΔΩΝ":[39.36103,22.94248],
"ΝΟΤΙΟΥ ΤΟΜΕΑ ΑΘΗΝΩΝ":[37.86289,23.75802],
"ΞΑΝΘΗΣ":[41.13488,24.888],
"ΠΕΙΡΑΙΩΣ, ΝΗΣΩΝ":[37.943011,23.646956],
"ΠΕΛΛΑΣ":[40.801682,22.043980],
"ΠΙΕΡΙΑΣ":[40.26956,22.50608],
"ΡΕΘΥΜΝΟΥ":[35.36555,24.48232],
"ΡΟΔΟΠΗΣ":[41.11917,25.40535],
"ΣΕΡΡΩΝ":[41.08499,23.54757],
"ΣΥΡΟΥ, ΑΝΔΡΟΥ, ΘΗΡΑΣ, ΚΕΑΣ - ΚΥΘΝΟΥ, ΜΗΛΟΥ, ΜΥΚΟΝΟΥ, ΝΑΞΟΥ, ΠΑΡΟΥ, ΤΗΝΟΥ":[37.463493, 24.916088],
"ΦΘΙΩΤΙΔΑΣ":[38.902790, 22.443008],
"ΦΛΩΡΙΝΑΣ":[40.78197,21.40981],
"ΦΩΚΙΔΑΣ":[38.52813,22.37713],
"ΧΑΛΚΙΔΙΚΗΣ":[40.372165178,23.436998252],
"ΧΑΝΙΩΝ":[35.513828,24.018038],
"ΧΙΟΥ":[38.36778,26.13583]




    }




    this.state = {
      currentPos: null,
      initpos:[37.983810, 23.727539],
      status:false,
      rstatus:true,
      selected_region:""

    




      



    };
    


   this.layercontrol = React.createRef(); 
   this.handleClick = this.handleClick.bind(this);
   this.selectRegion = this.selectRegion.bind(this);
  }



  componentDidMount() {
    //document.addEventListener('click', this.handleClick);
   
  }
  componentWillUnmount() {
  // document.removeEventListener('click', this.handleClick);
  }

  selectRegion(value){

    this.setState({selected_region:value},function(){
        console.log(this.state.selected_region)
    })
    this.props.setRegion(value)
  }



  handleClick(e) {
   console.log("pr")
  // console.log(e.latlng)
  /* const map = useMapEvents({
    click(event) {
        console.log("locate")
        let r=getKeyByValue(props.regions,event.latlng)
        console.log(r)
        
          console.log(event.latlng)
          setPosition(event.latlng)
         // map.flyTo(event.latlng, 13)
        
         // setczoom(14)
      

       // console.log(props.status)


    }
    })*/




  //  console.log(e.target)
   /* if(e.target.className=="leaflet-control-layers-selector"){
      console.log("alex")
    //console.log(this.layercontrol.current)
    if (this.state.status!=this.layercontrol.current._layerControlInputs[1].checked){
      this.setState({status:this.layercontrol.current._layerControlInputs[1].checked,rstatus:this.layercontrol.current._layerControlInputs[0].checked},function(){
        console.log(this.state.status)
        console.log(this.state.rstatus)
      })
    }}
    else{
      console.log(this.layercontrol.current)
      if(this.state.status=true && this.state.rstatus==false){
        this.layercontrol.current._layerControlInputs[1].checked=true
        this.layercontrol.current._layerControlInputs[0].checked=false
      }
      //console.log(this.state.status)
     // console.log(this.state.rstatus)

    }
   /* if (this.state.rstatus!=this.layercontrol.current._layerControlInputs[0].checked){
      this.setState({rstatus:this.layercontrol.current._layerControlInputs[0].checked},function(){
        console.log(this.state.status)
        console.log(this.state.rstatus)
      }*/
        
        
        
    }
   //
   
 
     // console.log('You clicked INSIDE the component.')
    
 // }

  /*componentDidUpdate(prevProps, prevState, snapshot){
    if (this.state.status!=prevState.status)



  }
  
  
}*/


  render() {
  /*   const main_point=[37.7509002686,20,8843002319]

     const other_points=[
          [39.6018981933593,19.9116992950439],
          [39.0567016601562,26.5983009338378],
          [37.0811004639,25.3680992126],
          [35.5317001342773,24.1497001647949]
     ]


     let connections=[]
     let other_markers=[]
     for (let i = 0; i <other_points.length; i++) {  
        other_markers.push( <Marker  position={other_points[i]}>
          <Popup position={other_points[i]}>
           Current location: <pre>{JSON.stringify(other_points[i], null, 2)}</pre>
         </Popup>
          </Marker>)
      connections.push([main_point,other_points[i]])
     }
     
     */


     



     const features=mapfeatures["features"]
     let connections=[]
     
     for (let i=0;i<features.length;i++){
       console.log(features[i]["geometry"]['type'])
      connections.push(features[i]["geometry"]["coordinates"])


     }
    // console.log(this.regions)
    // let centers = [];
     //let region_names=[]
     let circlemarkers=[]
     let regional_units=[]
     if (this.props.geoUnit==="NUTS3"){
     const r=this.regions
     const center_names=Object.keys(this.regions)
     for (let i=0;i<connections.length;i++){
       regional_units.push(<Polyline pathOptions={{ color: 'black' }} positions={connections[i]} />)
     }
     for(let i=0;i<center_names.length;i++){
      circlemarkers.push(<MyCircleMarker r={this.state.selected_region} SendRegion={this.selectRegion}
         pos={r[center_names[i]]} region_name={center_names[i]}/>) 
     }
    }
   else{
   //
   if (this.state.selected_region!==""){
     console.log(109)
     this.selectRegion("")
   }
     //this.setState({selected_region:""})
   }
     /*Object.keys(r).forEach(function(key) {
      circlemarkers.push(<MyCircleMarker SendRegion={this.selectRegion} pos={r[key]} region_name={key}/>) 
      //centers.push(r[key])
      //region_names.push(key)
  })*/
    /* console.log(regions)
    
     Object.keys(regions).forEach(function(key) {
        
         centers.push(this.regions[key])
     });*/
  //  console.log(connections)




    console.log(6)
    return (
      
      <MapContainer  style={{ height: '100vh', width: '70%',marginLeft:"5%"}} center={this.state.initpos} zoom={6}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

     {/*  {connections.map((polyline, i) => 
          <Polyline pathOptions={{ color: 'black' }} positions={polyline} />)}*/}
{regional_units}
{circlemarkers}
  

</MapContainer>
         
        
         )



   /* return (
      
        <MapContainer  style={{ height: '100vh', width: '70%',marginLeft:"5%"}} center={this.state.initpos} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        
        <Marker  position={main_point}>
          <Popup position={main_point}>
           Current location: <pre>{JSON.stringify(main_point, null, 2)}</pre>
         </Popup>
          </Marker>
          {other_markers}
          {connections.map((polyline, i) => 
          <Polyline pathOptions={{ color: 'purple' }} positions={polyline} />)}
          
          
          
          





          </MapContainer>
         
        
         )*/
 /*  return (
      <div>
        <MapContainer  style={{ height: '100vh', width: '100wh' }} center={this.state.initpos} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <LayersControl position="topright" ref={this.layercontrol}>
    
      <LayersControl.BaseLayer checked name="Select region">
      <LocationMarker status={this.state.status} rstatus={this.state.rstatus}/>
     
        
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer  name="Select point">
      <LocationMarker status={this.state.status} rstatus={this.state.rstatus}/>
      </LayersControl.BaseLayer>




      </LayersControl>          

         
        </MapContainer>
      </div>
    )*/
  }
}

export default MapDisplayer;







/*
const MyMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props}/>
}







function App() {
 // const position = [51.505, -0.09]
 const position = [37.983810, 23.727539]
 const [currentPos, setcurrentPos] = useState(null);
  const outerBounds = [
    [50.505, -29.09],
    [52.505, 29.09],
  ]


  const handleClick = (event) => {
    console.log("click")
   // setcurrentPos(event.latlng)
   // getlanguages(type)

  }




  return (
   
      <MapContainer center={position} zoom={6} scrollWheelZoom={true} 
      onClick={handleClick}
      
      
      style={{ height: '100vh', width: '100wh' }}>
    <TileLayer

      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />


  {/*}  {currentPos && <MyMarker position={currentPos}>
            <Popup position={currentPos}>
              Current location: <pre>{JSON.stringify(currentPos, null, 2)}</pre>
            </Popup>
  </MyMarker>}*/
//}
        //  </MapContainer>
    
  //  )
//  }
//
    
  /*  <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>*/
 



   
 /// );
//}

//export default App;

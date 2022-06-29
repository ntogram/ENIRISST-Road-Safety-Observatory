import React from 'react';
//import  "./Intro.css"
import "./FormView.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomSelector from "../../Main_Components/CustomSelector/CustomSelector";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import CustomMultiSelector from "../../Main_Components/CustomMultiSelector/CustomMultiSelector";
import CustomGroupSelector from "../../Main_Components/CustomGroupSelector/CustomGroupSelector";
import {Button} from "react-bootstrap";
import  formoptions from "./formoptions.json"
import {useEffect} from "react";

function FormView(props) {
    const [areas,setAreas]=React.useState([])
    const [category,setCategory]=React.useState("")
    const [indicators,setIndicators]=React.useState([])
    const [selectedyears,setSelectedYears]=React.useState([])
    const [missing,setmissing]=React.useState(0)
    const prevcategory=React.useRef();
     const prevformdata=React.useRef();
    const isFormchanged=(a,b)=>{
          if (a!==undefined && b===undefined){
              return true
          }
          if (a===undefined && b===undefined){
              return false
          }
          else{
              if (a===undefined && Object.keys(b).length===0){
                  return false
              }
               if (b===undefined && Object.keys(a).length===0){
                  return false
              }
          }
          let akeys=(Object.keys(a))
          let bkeys=(Object.keys(b))
          if (akeys.length === 0 && bkeys.length === 0){
              return false
          }
          if (akeys.length==bkeys.length){
                for( let i=0;i<akeys.length;i++){
                    if(akeys[i]!==bkeys[i]){
                        return true
                    }
                    else{
                        switch (akeys[i]){
                            case "category":
                                if (a["category"]!==b["category"]) {
                                    return true
                                }
                                break
                            case "selectedyears":
                            case "indicators":
                                if (a[akeys[i]].length!=b[akeys[i]].length){
                                    return true
                                }
                                else{
                                    for(let j=0;j<a[akeys[i]].length;j++){
                                        if(a[akeys[i]][j].value!=b[akeys[i]][j].value){
                                            return true
                                        }
                                    }
                                }
                                break;
                            case "areas":
                                    if (a["areas"].length!=b["areas"].length){
                                    return true
                                }
                                else{
                                    for(let j=0;j<a["areas"].length;j++){
                                        if(a["areas"][j].value!=b["areas"][j].value){
                                            return true
                                        }
                                        else{
                                              if(a["areas"][j].group!=b["areas"][j].group){
                                                  return true
                                              }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }

          }
          else{
              return true
          }
          return false
          // compare objects
   }





let years=[]
for (let i=2012;i<2020;i++){
    years.push( { value: i, label: i})
            {/*/<FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> })*/}
}


const findIndicators=()=>{
       let options=[]
        if (areas.length===0){
            return options
        }
        else{
          // console.log("ind")
            let group=areas[0]["group"]
           // console.log(category)
            if (category===null){
                return options
            }
            let categories=formoptions["formoptions"].filter(opt=>{
                    return (opt["geounit"]===group)})
            if (categories!==undefined){

                let indicators=categories[0]["categories"].filter(element=> {


                return (element.name===category)})
          // console.log(indicators)
            if (indicators.length===0){
                return options
            }
            else{

                for (let i=0;i<indicators[0]["indicators"].length;i++){
                    options.push({value:indicators[0]["indicators"][i].name,label:indicators[0]["indicators"][i].name})
                }
               // console.log(options)
                return options
            }


            }


        }



}
const findCategories=(group)=>{
    let options=[]
    if (group===undefined){
        return options
    }
    let categories=formoptions["formoptions"].filter(opt=>{
       // console.log(opt["geounit"])
       // console.group(group)
        return (opt["geounit"]===group)})

        //console.log(categories)
        for(let i=0;i<categories[0]["categories"].length;i++){
            options.push({ value: categories[0]["categories"][i].name, label: <div>{categories[0]["categories"][i].name}  <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> })
        }
        return options
       // setAccidentCategories(options)
}

useEffect(() => {
    //console.log("Changed")
     let s=localStorage.getItem("k")
            if (s!=null){
                let formdata={"areas":areas,"category":category,"indicators":indicators,"selectedyears":selectedyears,"status":"updated"}
                  props.setFormData(formdata)
            }

    if (areas.length===0 && category===null && indicators.length===0  && props.completed===true) {
            props.setCompleted(false)
    }
    prevcategory.current=category;
    })
const submit=() =>{
   //
    if (areas.length===0 || category==="" || indicators.length===0 || selectedyears.length===0){
        return
    }
    // if (props.completed!=false){
    //     props.setCompleted(false)
    // }
     let formdata={"areas":areas,"category":category,"indicators":indicators,"selectedyears":selectedyears}
   // if (areas.length!==0 && category!==null && indicators.length!==0 && selectedyears.length!==0){
    console.log(areas)
    console.log(category)
    console.log(indicators)
    console.log(selectedyears)

        let b=isFormchanged(formdata,prevformdata.current)
       if (b===true){
           //console.log("submit")
           props.setFormData(formdata)
           props.setCompleted(true)
       }
       else{

            console.log(localStorage.getItem("k"))
            let s=localStorage.getItem("k")
            if (s!=null){
                let n=missing+1
                setmissing(n)
            }
           //     return
           // }
           //  props.setFormData(formdata)
           // props.setCompleted(true)
           //console.log(props.completed)
         //  console.log("reject")
    }
    prevformdata.current=formdata;
}
// const years=[
//   { value: '2016', label: <div style={{display:"inline"}}>2016 <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> },
//  { value: '2017', label: <div style={{display:"inline"}}>2017 <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> },
//  { value: '2018', label: <div style={{display:"inline"}}>2018 <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> },
//  { value: '2019', label: <div style={{display:"inline"}}>2019 <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> },
//   { value: '2020', label: <div style={{display:"inline"}}>2020 <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/></div> },
// ];


  return <div id={"border_form_view"} className={props.format}>
      <table>
          <tr>
              <td id={"select_header"} style={{ width:"25%",paddingLeft:"2%"}}>
                0.1 Επιλέξτε γεωγραφικό επίπεδο
              </td>
               <td id={"select_header"} style={{ width:"25%"}}>
                0.2 Επιλέξτε κατηγορία δείκτη
              </td>
               <td id={"select_header"} style={{ width:"25%"}}>
                0.3 Επιλέξτε δείκτη
              </td>
               <td id={"select_header"} style={{ width:"25%"}}>
                0.4 Επιλέξτε χρονολογία
              </td>
          </tr>
           <tr>
              <td style={{width:"25%",paddingLeft:"2%"}}>
               <CustomGroupSelector  setchange={props.setCompleted}sendoptions={setAreas} />
              </td>
               <td style={{ width:"25%"}}>
               <CustomSelector sendoptions={setCategory} pos={"auto"} width={"250px"}  setchange={props.setCompleted} options={findCategories(areas.length!==0?areas[0]["group"]:undefined)}/>
              </td>
               <td style={{ width:"25%"}}>
                <CustomMultiSelector setchange={props.setCompleted} clear={category===prevcategory.current} sendoptions={setIndicators} selectall={false} options={findIndicators()}/>
              </td>
               <td style={{ width:"25%"}}>
                <CustomMultiSelector setchange={props.setCompleted}  sendoptions={setSelectedYears} selectall={false}  options={years} />
              </td>
              </tr>
          <tr>
              <td style={{paddingLeft:"2%",paddingTop:"3%"}} colSpan={4}>
                   <Button variant="primary" onClick={submit}> <span id="search_btn_txt">Αναζήτηση</span></Button>

              </td>
          </tr>
          <tr>

          </tr>

      </table>
  </div>;
}

export default FormView;
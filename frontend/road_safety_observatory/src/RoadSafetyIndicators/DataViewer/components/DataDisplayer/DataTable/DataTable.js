import React from 'react';
import {useEffect} from "react";
import "../../ParameterTable/ParameterTable.css"
import "../../../../../GreekStatistics/components/DataViews/TableView/TableView.css"
import formoptions from "../../../../FormView/formoptions.json";
import axios from "axios";

export default function  DataTable(props) {
      const [restdata,setRestData]=React.useState([])
      const [updated,setUpdated]=React.useState(0)
      const prevformdata=React.useRef()

    const validate_data=()=>{
      //    props.setdata(restdata)
          let btn=document.getElementById("search_btn_txt")
         // console.log("validate")
       //   for(let i=0;i<2;i++){

          btn.parentElement.click()}
  //    }


       const getField = (group) => {
           let field = undefined
          // console.log(group)
           switch (group) {
               case "Οικισμοί":
                   field = "oikismos"
                   break

               case "Δήμοι":
                   field = "muname"
                   break
               case "Περιφερειακές Ενότητες (NUTS3)":
                   field = "nut"
                   break
               case "Επικράτεια":
                   field = "none"
                   break
           }
           return field
       }
      const getpaths =  () => {
                let base="http://localhost:8080/api/"
             //   console.log(props.formdata)
                if (props.formdata["areas"]!==undefined){
                    let geounit = props.formdata["areas"][0].group
                    let category=props.formdata["category"]
                  //  console.log(geounit)
                    let r = formoptions["formoptions"].find(e => e.geounit === geounit);
                    let inds=r["categories"].find(e=>e.name===category)
                    let paths=[]
                    let ind1=props.formdata["indicators"];
                    let ind2=inds["indicators"]
                    for (let j=0;j< ind1.length;j++){
                            for(let i=0;i<ind2.length;i++){
                                if (ind1[j].value===ind2[i].name){
                                   // let path=base+ind2[i].code+"/"
                                    let path={path:base+ind2[i].code, ind_name:ind2[i].name}
                                     paths.push(path)
                                 //    for(let k1=0;k1<props.formdata["areas"].length;k1++){
                                 //        for (let k2=0;k2<props.formdata["selectedyears"].length;k2++){
                                 //            paths.push({"path":path+props.formdata["areas"][k1].value+"/"+props.formdata["selectedyears"][k2].value,
                                 //                "ind_name:":ind2[i].name,"area_name":props.formdata["areas"][k1].value,"year":props.formdata["selectedyears"][k2].value}
                                 //            )
                                 //        }
                                 //    }
                                    break
                                }
                    }
                    }
                  //  console.log(paths)
                   // console.log(inds)
                    return paths
                }
                else
                {
                    return []
                }


        }

        async function getData(path) {
            try {
                const response = await axios.get(path);
             //   console.log(response);
                return response.data
            } catch (error) {
                console.log(error);
            }
        }

    const initialize_data=()=>{

        let td = []
        for (let i = 0; i < props.formdata["selectedyears"].length; i++) {
        //    console.log(props.formdata["areas"])
            for (let j = 0; j < props.formdata["areas"].length; j++) {

                td.push({
                    "area": props.formdata["areas"][j].value,
                    "year": props.formdata["selectedyears"][i].value,
                    "indicators": {}
                })
            }
        }
      //  console.log(td)
        return td
        //setRestData(td)
    }

    const formtablerecord = (r,td) => {
        let data=td
         let field = getField(props.formdata["areas"][0].group)
      //  console.log(field)
        if (field==="none"){
            //console.log("EP")
            for (let i = 0; i < data.length; i++) {
                let selected_indicator = r["response"].find(element => {
                     //   console.log(element)
                        return (element["year_ID"] === data[i]["year"])
                    }
                )
                data[i]["indicators"][r["name"]] = (selected_indicator !== undefined ? selected_indicator["indicator"] : "N/A")
            }
        }
        else {
           // console.log("OT")

            for (let i = 0; i < data.length; i++) {
               // console.log(data[i]["area"])
               // console.log(data[i]["year"])
                let selected_indicator = r["response"].find(element => {

                        return (element[field] === data[i]["area"] && element["year_ID"] === data[i]["year"])
                    }
                )

                data[i]["indicators"][r["name"]] = (selected_indicator !== undefined ? selected_indicator["indicator"] : "N/A")
                //.push({[r["name"]]:(selected_indicator !== undefined ? selected_indicator["indicator"] : "N/A")})
            }
        }
     //   }
        //     let selected_indicator=r.find(element=>
        //
        //         element[field] === data[i]["area"] && element["year_ID"] === data[i]["year"]
        //     )
        //     console.log(selected_indicator)
        //  //   data[i]["indicators"].push(selected_indicator !== undefined ? r["indicator"] : "N/A")
        // }
        // console.log("calculate")
        // console.log(data)
         return data
       // setRestData(data)
    }

      const Filltable=()=> {
          let paths=getpaths()
         // console.log(paths)
        //  console.log("filltable")
        //  console.log(restdata)
           let cells=document.querySelectorAll('[id=road_indicator]')
              let update_status=false
              for (let i=0;i<cells.length;i++){
                  if (cells[i].innerHTML===""){
                    localStorage.setItem("k","0")
                    validate_data()
                    props.setdata(restdata)
                    return false
                  }
             }
              props.setdata(restdata)
              localStorage.clear()
             return  true

         }



   const isFormchanged=()=>{
      //    console.log(props.formdata)
       //   console.log(prevformdata.current)
          let a=props.formdata
          let b=prevformdata.current
           let s=localStorage.getItem("k")
           if (s!==null){
               return false
           }

          if (b===undefined){
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
                            case "status":
                                if (a["status"]!==b["status"]){
                                    return true
                                }
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



  useEffect(() => {
     // console.log("data display")
      //  console.log(props.completed)
      //  console.log(props.formdata)
        let b=isFormchanged()
       // console.log(b)
        if (b!=props.formstatus){
              props.setFormStatus(b)
        }

       // console.log(b)
        ///console.log(props.formdata)
        if (b==true && Object.keys(props.formdata).length!==0){

                   let paths=getpaths()
                    let td=initialize_data()
                    for (let i=0;i<paths.length;i++){
                        let d = getData(paths[i].path).then(
                            (response) => {
                               // console.log(paths)
                                  let data={"response":response,"name":paths[i].ind_name}
                             //   console.log(paths[i])
                                td=formtablerecord(data,td)
                                // data[i]={name:paths[i].ind_name,data:response}

                                //  console.log(i)
                              //  console.log(response)
                                if (i==paths.length-1){
                                    setRestData(td)

                                   // console.log("end")
                                    // console.log(td)


                                 //  setUpdated(false)
                                }
                                //  console.log(data)
                                // setRestData(data)
                                //return response
                            }

                        )

                    }

           // props.setCompleted(false)
            //  seta(1)

        }
        else{

           //   if ( b==false){
           //    //   setUpdated(true)
           //       //validate_data()
           //        console.log("fill")
           //        let k=Filltable()

           //        }
           //     // setUpdated(true)
           //
           // }

        }

        let k=Filltable()

        // if (k==false){
        //      setRestData(restdata)
        //     localStorage.setItem("k",k)
        //     validate_data()
        //
        // }
        // else{
        //     localStorage.clear()
        // }
        prevformdata.current=props.formdata

      //  console.log("Rest")
      //  console.log(restdata)

  })


    // return (<div>datatable</div>)
    return (restdata.length===0?null: <table style={{marginTop: "5%"}} id={"dataparameter"} className={"data-indicators"}>
        <thead>
        <tr>
            <th  className={"header-format"}>
                {props.formdata["areas"][0]["group"]}
            </th>
            <th  className={"header-format"}>
                Έτος
            </th>

            {props.formdata["indicators"].map((element,index) =>
                <th style={{paddingRight:(props.formdata["indicators"].length-1===index)?"3%":null}} className={"header-format"}>{element.value}</th>
            )}
        </tr>
        </thead>
        <tbody>
        {restdata.map((element)=>
        <tr className={"b2"}>
            <td className={"table-cell-center"}>
                {element.area}
            </td>
            <td className={"table-cell-center"}>
                {element.year}
            </td>
            { props.formdata["indicators"].map((key,index) =>
            <td id={"road_indicator"}  className={"table-cell-center"}>

                {element["indicators"][key.value]===-1?"N/A":element["indicators"][key.value]}
            </td>)}
        </tr>
        )}
        </tbody>
    </table>)
}
        //       <tr className={"b2"}>
       // <td className={"table-cell-center"}>
        //        </td>
       // <td className={"table-cell-center"}>
        // </td>
        //        </tr>
        //       {props.tabledata.map((element)=>*/}
      //             <td className={"table-cell-center"}>
        // </td>
        //         )}
        // </tbody>
        //
        // </table>)
     //       <tr className={"dataprameter-content "}>
        //         <td id={"dataparameter-cell"} className={"gap"}>

        //                 props.formdata["areas"].map((item, i)=>
        //                      return (i===props.formdata["areas"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
        //                 })
        //
        //
        //             }
        //         </td><td id={"dataparameter-cell"} className={"gap"}>

        //                 props.formdata["indicators"].map((item, i)=>{
        //                     return (i===props.formdata["indicators"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
        //                 })
        //
        //
        //             }
        //     </td>
        //     </tr>
        //     <tr>
        //         <td colSpan={2}></td>
        //     </tr>
        //      <tr className={"dataprameter-header"}>
        //         <td id={"dataparameter-cell"}>
        //           Επιλεγμένη κατηγορία δείκτη
        //         </td><td id={"dataparameter-cell"}>
        //       Επιλεγμένη χρονολογία
        //     </td>
        //     </tr>
        //      <tr className={"dataprameter-content "}>
        //         <td id={"dataparameter-cell"} className={"gap"}>
        //             {props.formdata.category}
        //         </td><td id={"dataparameter-cell"} className={"gap"}>
        //       {
        //                 props.formdata["selectedyears"].map((item, i)=>{
        //                     return (i===props.formdata["selectedyears"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
        //                     //  return  (i=props.formdata["selectedyears"].length-1)? (return<s)
        //                     //
        //                     // (<span>{item.value}{i}
        //                     //      {
        //                     //          (i=props.formdata["selectedyears"].length-1)?"":","
        //                     //      }
        //                     //
        //                     //
        //                     //
        //                     //      ,</span>)
        //                 })
        //
        //
        //             }
        //     </td>
        //     </tr>
        //





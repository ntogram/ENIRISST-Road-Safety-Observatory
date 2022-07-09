import React from 'react';
import "./ParameterTable.css"
import {useEffect} from "react";
import NutLayer from "../MapDisplayer/NutLayer";
import greek_regions from "../../../../GreekStatistics/components/MapDisplayer/GR_NUTS3.json";
import OikLayer from "../MapDisplayer/OikLayer";
import greek_oik from "../../../../GreekStatistics/components/MapDisplayer/oik_merge.json";
import DimLayer from "../MapDisplayer/DimLayer";
import greek_dim from "../../../../GreekStatistics/components/MapDisplayer/Kal_Dim.json";


export default function  ParameterTable(props) {


    useEffect(() => {
        console.log("parameters:")
        console.log(props.formdata)
    })

    const isSelectedAll = () => {
        let counter = 0
        let s = ""
        if (Object.keys(props.formdata).length !== 0 ) {

            let group = props.formdata["areas"][0]["group"]
            console.log(group)
            switch (group) {
                case "Περιφερειακές Ενότητες (NUTS3)":
                    counter = 52
                    s = "Όλες οι " + group
                    break
                case "Οικισμοί":
                    counter = 15878
                    s = "Όλοι οι " + group
                    break
                case "Δήμοι":
                    counter = 326
                    s = "Όλοι οι " + group
                    break
            }
            if ( props.formdata["areas"].length===counter){
                return s
            }
        }


    return props.formdata["areas"].map((item, i) => {
        return (i === props.formdata["areas"].length - 1) ? (<span>{item.value}</span>) : (<span>{item.value},</span>)
    })



    }



     //return(<div>{Object.keys(props.formdata).length}</div>)
        return(<table id={"dataparameter"}>
            <tr className={"dataprameter-header"}>
                <td id={"dataparameter-cell"}>
                   Επιλεγμένo γεωγραφικό επίπεδο
                </td><td id={"dataparameter-cell"}>
             Επιλεγμένoς δείκτης
            </td>
            </tr>
              <tr className={"dataprameter-content "}>
                <td id={"dataparameter-cell"} className={"gap"}>
                    {
                        isSelectedAll()
                    }
                    {/*{
                        props.formdata["areas"].map((item, i)=>{
                             return (i===props.formdata["areas"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
                        })


                    }*/}
                </td><td id={"dataparameter-cell"} className={"gap"}>
              {
                        props.formdata["indicators"].map((item, i)=>{
                            return (i===props.formdata["indicators"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
                        })


                    }
            </td>
            </tr>
            <tr>
                <td colSpan={2}></td>
            </tr>
             <tr className={"dataprameter-header"}>
                <td id={"dataparameter-cell"}>
                  Επιλεγμένη κατηγορία δείκτη
                </td><td id={"dataparameter-cell"}>
              Επιλεγμένη χρονολογία
            </td>
            </tr>
             <tr className={"dataprameter-content "}>
                <td id={"dataparameter-cell"} className={"gap"}>
                    {props.formdata.category}
                </td><td id={"dataparameter-cell"} className={"gap"}>
              {
                        props.formdata["selectedyears"].map((item, i)=>{
                            return (i===props.formdata["selectedyears"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
                            //  return  (i=props.formdata["selectedyears"].length-1)? (return<s)
                            //
                            // (<span>{item.value}{i}
                            //      {
                            //          (i=props.formdata["selectedyears"].length-1)?"":","
                            //      }
                            //
                            //
                            //
                            //      ,</span>)
                        })


                    }
            </td>
            </tr>

        </table>


    )
}
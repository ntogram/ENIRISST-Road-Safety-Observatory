import React from 'react';
import "./ParameterTable.css"
import {useEffect} from "react";


export default function  ParameterTable(props){

    useEffect(() => {
        //console.log("parameters:")
       // console.log(props.formdata)
    })




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
                        props.formdata["areas"].map((item, i)=>{
                             return (i===props.formdata["areas"].length-1)?( <span>{item.value}</span>):( <span>{item.value},</span>)
                        })


                    }
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
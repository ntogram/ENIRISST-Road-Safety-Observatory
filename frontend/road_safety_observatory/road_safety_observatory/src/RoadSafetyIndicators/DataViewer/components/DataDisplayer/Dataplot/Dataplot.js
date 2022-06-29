import React from 'react';
import CustomSelector from "../../../../../Main_Components/CustomSelector/CustomSelector";
import BeeSwarmPlot from "./BeeSwarmPlot";


export function  Dataplot(props){
    const [year, setyear] = React.useState(null)
    const [changed, setchanged] = React.useState(false)

    const setview=()=>{
        if (year===null){
            return null
        }
        console.log (props.formdata["indicators"])
        let list=[]
        for (let i=0;i<props.formdata["indicators"].length;i++){
            list.push(<BeeSwarmPlot chartdata={props.chartdata} formstatus={props.formstatus} formdata={props.formdata} indicator={props.formdata["indicators"][i].value} year={year} group={props.formdata["areas"][0].group} name={i}/>)
        //    list.push(<div>Boxplot {year} {props.formdata["indicators"][i].value} {i}</div>)
        }
            return list


    }



    return <div>
        <CustomSelector bottom={"3%"}  width={"180px"} sendoptions={setyear} setchange={setchanged}
                        options={(props.formdata["selectedyears"] === undefined || props.formdata["selectedyears"].length === 0) ? [] : props.formdata["selectedyears"]}/>
        {
            setview()
        }
        </div>
}
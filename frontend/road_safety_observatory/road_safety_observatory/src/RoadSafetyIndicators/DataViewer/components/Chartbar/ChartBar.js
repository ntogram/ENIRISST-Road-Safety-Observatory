import React from 'react';
import {useEffect} from "react";
import Chart from "chart.js/auto";




export default  function ChartBar(props){
      const [ready,setready]=React.useState(false);
      const [height,setheight]=React.useState(100)
      const [updatedCount,setUpdatedcount]=React.useState(0);
      const prevdata=React.useRef();
       const [chart,setChart]=React.useState(undefined)
     const draw_canvas=(config)=>{
         let canvas = document.getElementById("bar_canvas"+props.name);
         let myChart = new Chart(canvas, config)
         setChart(myChart)
    }
    const calculatescaler=()=>{
          let m=props.formdata["selectedyears"].length-1
          let n=props.formdata["areas"].length-1
        if (m==0){
            return n
        }
        if (n==0){
            return m
        }
        return m*n
    }
    const datainit=()=>{
        console.log("formdata")
        let data=[]

        for(let i=0;i<props.formdata["selectedyears"].length;i++){

            let datayear=[]
            for (let j=0;j<(props.chartdata).length;j++){
                if (props.chartdata[j]["year"] === props.formdata["selectedyears"][i].value) {
                    // if (props.name===0){
                    //     console.log(j)
                    //     console.log(props.chartdata)
                    //     console.log(props.chartdata[j])
                    //     console.log(props.chartdata[j]["indicators"])
                    //     console.log(props.indicator)
                    //     console.log(props.chartdata[j]["indicators"][props.indicator])
                    // }
                    datayear.push(props.chartdata[j]["indicators"][props.indicator])
                }

            }
            //console.log(datayear)
             data.push(datayear)
            datayear=[]




        }

        // if (props.name===0){
        //        console.log(props.name)
        //        console.log(props.indicator)
               //console.log("datainit")
              //  console.log(props.name)
               // console.log(props.chartdata)
               //console.log(data)
        // }

        return data
    }



    const formData=()=>{
           let data=datainit()

            let datasets=[]
            let bgcolors=["#0F8DD6","#0A6DB9"]

          //  console.log(data)

            let k=calculatescaler()
            setheight(100+k*30)
            for(let i=0;i<props.formdata["selectedyears"].length;i++){
                let random_color="#"+Math.floor(Math.random()*16777215).toString(16)


                datasets.push(
                    {
                        label:props.formdata["selectedyears"][i].value,
                         data: data[i],
                         backgroundColor:(i<2)?bgcolors[i]:random_color
                    }
                )
            }
            return datasets
    }
    const getLabels=()=>{
          let categories=[]
         for(let i=0;i<props.formdata["areas"].length;i++){
             categories.push(props.formdata["areas"][i].value)
         }
         return categories
    }

     const create_horizontal_bar_chart= (xlabel)=> {


        //const categories = ["Γαλλία", "Ιταλία"]
        const data = {
            labels: getLabels(),
            datasets:formData()

        }
        const config = {
            type: 'bar',
            data: data,

            options: {

               maintainAspectRatio: false,
                locale: 'de-DE',
                indexAxis: 'y',

                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                scales: {
                    y: {

                          grid: {
                             display: false
                         },


                             /* callback: function (value) {
                                        return value*1000; // convert it to percentage
                                    }*/
                    },
                     x: {
                         min: 0,
                      //   max: 100,
                         barPercentage: 1,
                        title: {
                            display: true,
                            text: xlabel,
                            align :"end"
                        },

                    }
                },

                responsive: true,
                plugins: {
                    tooltip: {
                callbacks:    (props.indicator==="Αριθμός ατυχημάτων προς τον αριθμό των ανέργων")?{

                    label: function(context) {
                            console.log(context)
                            return context.raw


                    }
                    }:{}},
                    autocolors: false,
                    title: {
                        display: true,
                        text: props.group,
                        align:"start",
                        font: {

                            weight: 'normal',

                        }
                    },


                    legend: {
                                display: true,
                                position:"bottom"
                            },
                }
            },
        };

        draw_canvas(config)
    }

    const isDataUpdated=(a,b)=>{

           if (a.length!=b.length){
               return true
           }
           else{
               for(let i=0;i<a.length;i++){
                   if (a[i]["area"]!==b[i]["area"]){
                       return true
                   }
                    if (a[i]["year"]!==b[i]["year"]){
                       return true
                   }
                    let aind=a[i]["indicators"]
                    let bind=b[i]["indicators"]
               //     console.log(aind)
              //      console.log(bind)
                    let akeys=(Object.keys(aind))
                    let bkeys=(Object.keys(bind))
                   if (akeys.length!==bkeys.length){
                       return  true
                   }
                   for(let j=0;j<akeys.length;j++){
                       if (akeys[j]!==bkeys[j]){
                           return true
                       }
                       if (aind[akeys[j]]!==bind[bkeys[j]]){
                           return true
                       }
                   }
               }
           }

        return false
    }

    const existData=()=>{
           let data=chart.data.datasets.map(a=>a.data)
           // console.log("Exist")
          //  console.log(data)
            for(let i=0;i<data.length;i++){
                for (let j=0;j<data[i].length;j++){
                    if (data[i][j]===undefined){
                   return false
                }
                }

            }
            return true
    }


     React.useEffect(() => {
        // console.log("Chart")
        console.log(props.name)
        // console.log(props.formstatus)
         // console.log(props.formdata)
         //console.log(props.indicator)
       //  console.log(props.group)
         console.log(props.chartdata)
         if (props.chartdata.length!==0) {
             if (ready === false) {
                 //console.log("first")
                 create_horizontal_bar_chart(props.indicator);
                 setready(true)
                  prevdata.current=props.chartdata
             } else {
                 if (props.formstatus) {
                   //  console.log("elseif")
                   //  console.log(props.chartdata)
                     chart.config._config.options.plugins.title.text = props.group;
                     chart.config._config.options.scales.x.title.text = props.indicator
                     chart.data.datasets = formData();
                     chart.data.labels = getLabels()
                     chart.update()
                      let count=updatedCount+1
                   //  setUpdatedcount(count)
                 }
                 else{
                   let  cur=props.chartdata
                    let prev=prevdata.current
                     let b=isDataUpdated(cur,prev)
                    // console.log("else")
                     // console.log(cur)
                    if (b===true){
                     //     console.log("else2")
                          chart.data.datasets = formData();
                          chart.update()
                           prevdata.current=props.chartdata

                    }


                 }



             }

             if (chart!==undefined){
                 if (existData()===false){
                     console.log("Fill Chart")
                     console.log(chart.data.datasets)
                     chart.data.datasets=formData()
                     console.log(chart.data.datasets)
                      chart.update()
                 }
             }
         }
         //prevformstatus.current=props.formstatus
        })
    return(<div id={"ChartBox"} style={{height:(2*height)+"px"}}>

            <canvas id={"bar_canvas"+props.name} width="400px" height={height+"px"}></canvas>
    </div>);





}
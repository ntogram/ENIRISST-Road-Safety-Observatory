import React from 'react';
import {useEffect} from "react";
import Chart from "chart.js/auto";




export default  function BeeSwarmPlot(props){
       const [ready,setready]=React.useState(false);
    //   const [height,setheight]=React.useState(100)
    //   const [updatedCount,setUpdatedcount]=React.useState(0);
       const prevdata=React.useRef();
       const prevyear=React.useRef()
    const [chart,setChart]=React.useState(undefined)
     const draw_canvas=(config)=>{
         let canvas = document.getElementById("plot_canvas"+props.name);
         let myChart = new Chart(canvas, config)
         setChart(myChart)
    }

    const check_exist=(data,y1)=>{
        let y=0
       // const scaler=0.001
      //  console.log(y1)
        let filtered_records=data.filter(function (el){
            console.log(el)
            return el.x===y1
        })
      //  if (filtered_records.length==0)
       // console.log(filtered_records)
        y=filtered_records.length
        console.log(y)
        return y
    }

     const formData=()=>{
          let chartdata=props.chartdata.filter(function (el){
            return el.year===props.year
        })
       let d=[]
        for (let i=0;i<chartdata.length;i++){
          d.push({
              y:check_exist(d,chartdata[i]["indicators"][props.indicator]),
              x:chartdata[i]["indicators"][props.indicator],
              r:5,
              name:chartdata[i]["area"]
          })
        }
        return [{
                data: d,
                backgroundColor: "#0F8DD6"
            }]

      //  return data
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
            console.log("Exist")
            console.log(data)
            console.log(chart.data.datasets)
            for(let i=0;i<data.length;i++){
                for (let j=0;j<data[i].length;j++){
                    if (data[i][j].x===undefined){
                   return false
                }
                }

            }
            return true
    }

    const create_beeswarm_chart=()=>{
       const data = {
            datasets: formData()
        };
        const config = {
            type: 'bubble',
            data: data,
            options: {
                scales: {
                    y: {

                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false,

                        },
                        title: {
                            display: true,
                            text: props.indicator,
                            align: "middle",
                            font: {

                                weight: 'normal',

                            }
                        },


                        /* callback: function (value) {
                                   return value*1000; // convert it to percentage
                               }*/
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                             //   console.log(context)
                                return context.raw["name"]+":"+context.raw["x"]
                            }
                        }},
                        legend: {
                            display: false,
                        },
                    }


                }
            };
        draw_canvas(config)
    }
      React.useEffect(() => {
          if (props.chartdata.length !== 0) {
              if (ready === false) {
                  create_beeswarm_chart()
                  setready(true)
                  prevdata.current=props.chartdata
              }
               else {
                  if (props.formstatus) {
                      chart.config._config.options.scales.y.title.text = props.indicator
                      chart.data.datasets = formData()
                      chart.update()
                  } else {
                      let cur = props.chartdata
                      let prev = prevdata.current
                      let b = isDataUpdated(cur, prev)
                      if (b === true) {

                          chart.data.datasets = formData();
                          chart.update()
                          prevdata.current = props.chartdata

                      }


                  }
              }


              if (chart!==undefined){
                   if (props.year!==prevyear.current){
                   chart.data.datasets = formData()
                   chart.update()
              }
                 if (existData()===false){
                     console.log("Fill Chart")
                     console.log(chart.data.datasets)
                     chart.data.datasets=formData()
                     console.log(chart.data.datasets)
                      chart.update()
                 }
             }

             prevyear.current=props.year




      }})
    //     // console.log("Chart")
    //     console.log(props.name)
    //     // console.log(props.formstatus)
    //      // console.log(props.formdata)
    //      //console.log(props.indicator)
    //    //  console.log(props.group)
    //      console.log(props.chartdata)
    //      if (props.chartdata.length!==0) {
    //          if (ready === false) {
    //              //console.log("first")
    //              create_horizontal_bar_chart(props.indicator);
    //              setready(true)
    //               prevdata.current=props.chartdata
    //          } else {
    //              if (props.formstatus) {
    //                //  console.log("elseif")
    //                //  console.log(props.chartdata)
    //                  chart.config._config.options.plugins.title.text = props.group;
    //                  chart.config._config.options.scales.x.title.text = props.indicator
    //                  chart.data.datasets = formData();
    //                  chart.data.labels = getLabels()
    //                  chart.update()
    //                   let count=updatedCount+1
    //                //  setUpdatedcount(count)
    //              }
    //              else{
    //                let  cur=props.chartdata
    //                 let prev=prevdata.current
    //                  let b=isDataUpdated(cur,prev)
    //                 // console.log("else")
    //                  // console.log(cur)
    //                 if (b===true){
    //                  //     console.log("else2")
    //                       chart.data.datasets = formData();
    //                       chart.update()
    //                        prevdata.current=props.chartdata
    //
    //                 }
    //
    //
    //              }
    //
    //
    //
    //          }
    //
    //          if (chart!==undefined){
    //              if (existData()===false){
    //                  console.log("Fill Chart")
    //                  console.log(chart.data.datasets)
    //                  chart.data.datasets=formData()
    //                  console.log(chart.data.datasets)
    //                   chart.update()
    //              }
    //
    //                  //
    //
    //          }
    //      }
    //      //prevformstatus.current=props.formstatus
    //     })
    return(<div id={"ChartPlot"} style={{marginBottom:"50%"}}>

            <canvas id={"plot_canvas"+props.name} width="400px" height={"400px"}></canvas>
    </div>);





}
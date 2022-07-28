// data
import g1 from "./chart_data/graph1.json"
import g2 from "./chart_data/graph2.json"
import g4 from "./chart_data/graph4.json"
import g6 from "./chart_data/graph6.json"
import g5 from "./chart_data/graph5.json"
import g7 from "./chart_data/graph7.json"
import React from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
//import plugin from "chartjs-plugin-datalabels";
export default function ChartView(props) {
    const [ready,setready]=React.useState(false);
    const prevprop=React.useRef();
    const [chart,setChart]=React.useState(undefined)
    const plugin = {
        id: props.name+"_DataChart",
        beforeDraw: (chart) => {
            const ctx = chart.canvas.getContext('2d');
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };
    const draw_canvas=(config)=>{
         let canvas = document.getElementById(props.name + "_DataChart");
         let myChart = new Chart(canvas, config)
         props.setContent(myChart)
         setChart(myChart)
    }



    const calc_bar_line_results=()=>{
        let result =null
        let years=[]
        for(let i=props.y1;i<props.y2+1;i++){
           years.push(i)
         }
        let b=false
        let g= (props.name==="accident_death_injury")?g4:g5



        if (props.name==="accident_death_injury"){
            let records = g4.filter(
                (r) => {
                    if (years.includes(r["Έτος"]) === true) {
                        return r
                    }
                }
            )
            let a1 = []
            let a2 = []
            let a3 = []
            let a4 = []

            for (let i = 0; i < records.length; i++) {
                a1.push(records[i]["Αριθμός Ατυχημάτων"])
                a2.push(records[i]["Ελαφρά Τραυματίες"])
                a3.push(records[i]["Βαριά Τραυματίες"])
                a4.push(records[i]["Νεκροί"])
            }
            result = {"Έτη": years, "Ατυχήματα": a1, "Ελαφριά": a2, "Βαριά": a3, "Νεκροί": a4}}
        else{
                let a1=[]
                let a2=[]
                let rd={}
                 let default_countries=["Ιρλανδία","Ισπανία","Ελλάδα","Σουηδία","Τσεχία"]
                for (let i = 0; i < g5.length; i++) {
                    for(let j=0;j<years.length;j++){

                        a1.push(parseFloat(g5[i][years[j]])*100)
                    }
                    let random_color="#"+Math.floor(Math.random()*16777215).toString(16)
                    rd={
                        label:g5[i]["Χώρες"],
                        data:a1,
                        hidden: (!default_countries.includes(g5[i]["Χώρες"])),
                        fill:false,
                        backgroundColor: random_color,
                        borderColor: random_color,
                        tension: 0.1
                    }
                    a2.push(rd)
                    a1=[]
                    rd={}
                }
                result={"Έτη":years,"datasets":a2}
                console.log("rapid")
                console.log(result)

        }

        return result
    }




    const create_bar_line_chart=()=>{
       let results=calc_bar_line_results()

     //   console.log(results)
        const data = {
            labels: results["Έτη"]
                ,
            datasets: [
                {
                type: 'line',
                label: 'Ελαφριά',
                data: results["Ελαφριά"],
                fill: false,
               borderColor: "#B085D6",
               backgroundColor: "rgba(176,133,214,2)",
               tension:0.5,
               yAxisID: 'y',
            },
           {
                type: 'line',
                label: 'Βαριά',
                data:  results["Βαριά"],
                fill: false,
                borderColor: "#FF9B91",
                backgroundColor: "rgba(255,155,145,1)",
                tension:0.5,
                yAxisID: 'y',
            },
            {
                type: 'line',
                label: 'Νεκροί',
                data: results["Νεκροί"],
                fill: false,
                backgroundColor: 'rgba(135,214,220,1)',
                borderColor: '#87D6DC',
                tension:0.5,
                yAxisID: 'y',
            },

                {
                type: 'bar',
                label: 'Ατυχήματα',
                data: results["Ατυχήματα"],
                borderColor: "#012D81",
                backgroundColor: 'rgba(1,45,129,1)',
                yAxisID: 'y',
            },


            ]
        };
        const config = {
            type: 'bar',
            data: data,
            plugins: [plugin],
            options: {
                locale: 'de-DE',
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                },
                scales: {
                    x:
                        {
                            grid: {
                                display: false
                            }

                        },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                         min: 0,
                        max: 40000,
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        min: 0,
                        max: 10000,
                },
            }

        }};
        draw_canvas(config)
         /*let canvas = document.getElementById(props.name + "_DataChart");
         let myChart = new Chart(canvas, config)
         props.setContent(myChart)*/
    }

    const findChartData=()=>{
        let result
        if (props.name==="databycountrydeaths"){
            let a=g1.map(a=>{
                return {"country": a["Χώρες"],"value":a[props.year]}}
             )
             a= a.sort((c1, c2) => {
                   let a,b
                   if (c1.value==="n/a"){
                       a=-1
                   }
                   if (c2.value==="n/a"){
                       b=-1
                   }
                   if (a!==-1){
                       a=parseInt(c1.value)
                   }
                   if (b!==-1){
                       b=parseInt(c2.value)
                   }
                    return a - b;
                }
            ).reverse()
           let  labels = a.map(k => k["country"]);
           let colors=labels.map(a=>{
               if (a==="Ελλάδα "){
                    return "#FF9B91"
               }
               else{
                    return"#012D81"
               }

           })
           let data=a.map(k=>k["value"])
            result={"categories":labels,"data":data,"colors":colors}
        }
        else{
            if(props.name==="acc_death_per_million1"|| props.name==="acc_death_per_million2"){
              //  console.log(props.year)
                let a=[]
                for (let i=0;i<g2.length;i++) {
                    if (g2[i]["GEO"] !== "EU-27") {
                        a.push({"country": g2[i]["Χώρες"], "value": g2[i][props.year]})
                    }
                }
                a = a.sort((c1, c2) => {
                        let a, b
                        if (c1.value === "n/a") {
                            a = -1
                        }
                        if (c2.value === "n/a") {
                            b = -1
                        }
                        if (a !== -1) {
                            a = parseInt(c1.value)
                        }
                        if (b !== -1) {
                            b = parseInt(c2.value)
                        }
                        return a - b;
                    }
                ).reverse()
               // console.log(a)
                let labels = a.map(k => k["country"]);
                let colors = labels.map(a => {
                    if (a === "Ελλάδα ") {
                        return  "#75D1D8"
                    } else {
                        return "#13A2DE"
                    }

                })
                let data = a.map(k => k["value"])
                result = {"categories": labels, "data": data, "colors": colors}
            }
            else{
                  result=null
            }



        }
        return result

    }


    const create_horizontal_bar_chart= (c)=> {
        Chart.register(annotationPlugin);
       // console.log(findChartData())
        const result=findChartData()
     //  console.log(result)
        const data = {
            labels: (result===null)?[]:result["categories"],
            datasets: [
                {

                    data: (result===null)?[]:result["data"],
                    backgroundColor: (result===null)?[]:result["colors"],
                    datalabels: c["dls"]?{
                                    color: '#8D939C'
                          }:{}
                }]


        }
        const config = {
            type: 'bar',
           // plugins:c["dls"]?[ChartDataLabels,plugin]:[plugin],
            data: data,

            options: {
                aspectRatio: c["ar"],
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
                         max: parseInt(result["data"][0])+c["offset"],
                        title: {
                            display: true,
                            text: (props.name==="databycountrydeaths")?"Νεκροί":"Νεκροί (χιλιάδες)",
                            align :"end"
                        },

                    }
                },

                responsive: true,
                plugins: {
                    autocolors: true,
                    title: {
                        display: true,
                        text: 'Χώρες',
                        align:"start",
                        font: {

                            weight: 'normal',

                        }
                    },
                     annotation: (c["dc"]!=0)?{
                         annotations: {
                             line1: {
                                 type: 'line',
                                 xMin: c["dc"],
                                 xMax: c["dc"],
                                 borderColor: '#FF9B91',
                                 borderWidth: 2,
                             }
                         }
                     }:{},
                    datalabels:c["dls"]? {
                                anchor: 'end',
                                align: 'end',
                                labels: {

                                    value: {
                                        color: '#8D939C'
                                    },

                                }

                            }:{},
                    legend: {
                                display: false
                            },
                }
            },
        };

         draw_canvas(config)
    }

    const create_line_data=(min,max,N)=>{
        let data=[];
        for (let i=0;i<N;i++){
            data.push(Math.floor(Math.random() * (max - min + 1) ) + min)
        }
        return data
    }

    const create_line_chart=()=>{
        let results=calc_bar_line_results()

        let data={
            labels: results["Έτη"],
            datasets:results["datasets"]
        }
        let config = {
            type: 'line',
            data: data,
            plugins: [plugin],
            options:{
                elements: {
                    point:{
                        radius: 1
                    }
                },
                plugins: {
            legend: {
                position:"bottom"
            }
            },
                scales: {
                            x:
                                {
                                    grid: {
                                        display: false
                                    }

                                },
                            y: {

                                ticks: {
                                    display:true
                                   // min: 0,
                                   // max: 100,// Your absolute max value
                                   //  callback: function (value) {
                                   //      return value + '%'; // convert it to percentage
                                   //  },
                                }
                            }
                        }
                    }
            };
         draw_canvas(config)
    }



    const getStackedData=(r)=>{
        let values=[]
      for (const [key, value] of Object.entries(r)){

          if (key!=="Έτος"){
             // console.log(parseFloat(value))
               values.push(parseFloat(value)*100)
          }
      }
      return values
    }

    const create_stacked_bar_chart=()=>{


        if (props.name==="databyage"){

            let agegroups=Object.keys(g6[0]).filter ((elem)=>
                elem!=="Έτος"
            )
            let p=g6.find((elem=>elem["Έτος"]===props.year))
            let percentages=getStackedData(p)
           // console.log(percentages)
           const data = {
               labels: agegroups,
               datasets: [
                   {
                       data: percentages,
                       backgroundColor: '#75D1D8',
                       borderWidth: 1,
                       xAxisID: "x",
                       stack: "background",
                       datalabels: {
                           display: false

                       },
                   },
                   {
                       data: [100, 100, 100, 100, 100,100],
                       borderWidth: 1,
                       backgroundColor: '#EBF7FF',
                       xAxisID: "x1",
                       stack: "background",
                       datalabels: {},

                   },


               ]
           }
                let config = {
                    type: 'bar',
                    plugins: [ChartDataLabels,plugin],
                    data: data,
                    options: {



                        plugins: {
                            datalabels: {
                                 anchor: 'top',
                                 align: 'end',
                                offset:165,
                               // clamp:false,
                                formatter: function(value, context) {
                                    
                                        //console.log(data["datasets"][0].data[context.dataIndex])


                            return Math.round(data["datasets"][0].data[context.dataIndex])+"%";},
                                labels: {

                                    value: {
                                        color: '#8D939C'
                                    },

                                }

                            },
                            tooltip: {
                            enabled: false
                        },

                            legend: {
                                display: false
                            },
                           },
                        responsive: true,
                        scales: {
                            x1:

                                {
                                    id: "full-bar",
                                    stacked: true,
                                    categoryPercentage: 0.5,
                                    barPercentage: 0.5,
                                    display: false,
                                     grid:{
                                    display:false
                                }
                                },
                            x: {
                                display: true,
                                stacked: true,
                                id: "x",
                                type: "category",
                                categoryPercentage: 0.5,
                                barPercentage: 1,
                                gridLines: {
                                    offsetGridLines: true
                                },
                                 grid:{
                                    display:false
                                }

                            },
                            y: {
                                display: false,
                                min: 0,
                                max: 100,

                               // ticks: {
                                  //  type: 'linear',

                                   // stepSize: 20,
                                //     callback: function (value) {
                                //         return value + '%'; // convert it to percentage
                                //     },
                              //   }
                            }
                        }
                    },


                };
                 draw_canvas(config)


        }


            if (props.name==="databysex"){
                const categories=Object.keys(g7[0]).filter ((elem)=> elem!=="Έτος")
                let p=g7.find((elem=>elem["Έτος"]===props.year))
                let values=getStackedData(p)
                console.log("error")
                console.log(g7)
                console.log(values)
                let data = {
                    labels: categories,
                    datasets: [{
                        label: 'Άντρες',
                        data: [Math.round(values[0]),Math.round(values[1])],
                        backgroundColor: "#75D1D8",
                         datalabels: {
                            display: false

                        },

                    },
                        {
                            label: 'Γυναίκες',
                            data:[Math.round(values[1]),Math.round(values[0])],
                            backgroundColor: "#EBF7FF",
                             datalabels: {}
                        }]

                }
                let config = {
                    type: 'bar',
                    data: data,
                    plugins: [ChartDataLabels,plugin],
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
                              datalabels: {
                                anchor: 'end',
                                 align: 'end',
                                 offset:-20,
                                formatter: function(value, context) {

                                        //console.log(data["datasets"][0].data[context.dataIndex])


                            return Math.round(data["datasets"][0].data[context.dataIndex])+"%";},
                                labels: {

                                    value: {
                                        color: '#8D939C'
                                    },

                                }

                            },
                            tooltip: {
                                callbacks: {
                                    title: function (context) {
                                        if (context[0].dataIndex==context[0].datasetIndex){
                                             return "Άντρες"
                                        }
                                        else{
                                            return "Γυναίκες"
                                        }
                                    },


                                     label: function(tooltipItems) {

                                         return tooltipItems.formattedValue+"%"
                                    }
                                },
                                }
                        },
                        responsive: true,
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true,
                                min: 0,
                                max: 100,
                               /* ticks: {
                                   // min: 0,
                                   // max: 100,// Your absolute max value
                                    callback: function (value) {
                                        return value + '%'; // convert it to percentage
                                    },
                                }*/
                            }
                        }
                    }
                };
                 draw_canvas(config)
            }





    }

    const isUpdated=()=>{
        if(props.type==="line" || props.type==="line_bar"){

            if (prevprop.current!==undefined){
                 if (props.y1===prevprop.current.y1 && props.y2===prevprop.current.y2){
                        return false
            }
            }
        }
        else{
            if (props.name === "acc_death_per_million1" || props.name === "acc_death_per_million2") {
                console.log(props.name)
                console.log(prevprop.current)
                console.log(props.year)
            }



            if (prevprop.current===props.year){
                return false
            }
        }
        return true
    }

     React.useEffect(() => {
        if( ready===false){
            if (props.type==="stacked_bar"){
                create_stacked_bar_chart();
                prevprop.current=props.year
            }
            if (props.type==="horizontal_bar"){
                let c={}

                switch (props.name){
                    case "databycountrydeaths":

                        c={max:3500,dls:true,ar:1,dc:0,offset:200}
                        break
                    case "acc_death_per_million1":
                    case "acc_death_per_million2":
                        let dc=g2.find(elem=> elem["GEO"]==="EU-27")

                        c={max:120,dls:false,ar:0.5,dc:dc[props.year],offset:50}
                        break;
                }
                create_horizontal_bar_chart(c);
                prevprop.current=props.year
            }
            if (props.type==="line"){
                create_line_chart();
                prevprop.current={y1:props.y1,y2:props.y2}
            }
            if (props.type==="line_bar"){
                create_bar_line_chart();
                prevprop.current={y1:props.y1,y2:props.y2}
            }
             setready(true)
        }


        else {
            //console.log(isUpdated()+"by"+props.name)
            if (isUpdated() === true) {
                if (props.name === "databycountrydeaths" || props.name === "acc_death_per_million1" || props.name === "acc_death_per_million2") {

                    let offset = 50
                    if (props.name === props.name === "databycountrydeaths") {
                        offset = 200
                    }
                    if (props.name === "acc_death_per_million1" || props.name === "acc_death_per_million2") {
                        let dc = g2.find(elem => elem["GEO"] === "EU-27")
                        chart.options.plugins.annotation.annotations.line1.xMax = dc[props.year]
                        chart.options.plugins.annotation.annotations.line1.xMin = dc[props.year]
                    }

                    let result = findChartData();
                    chart.data.datasets = [
                        {
                            data: result["data"],
                            backgroundColor: result["colors"]
                        }
                    ]
                    chart.data.labels = result["categories"]
                    chart.options.scales.x.max = parseInt(result["data"][0]) + offset
                    //  console.log(chart)
                    chart.update()
                    prevprop.current=props.year

                }
                if (props.name === "accident_death_injury") {
                    let results = calc_bar_line_results()
                    for (let i = 0; i < chart.data.datasets.length; i++) {
                        chart.data.datasets[i].data = results[chart.data.datasets[i].label]
                    }
                    chart.data.labels = results["Έτη"]
                    chart.update()
                    prevprop.current={y1:props.y1,y2:props.y2}

                }
                if (props.name === "databyage") {
                    let p = g6.find((elem => elem["Έτος"] === props.year))
                    let percentages = getStackedData(p)
                    chart.data.datasets[0].data = percentages
                    chart.update()
                     prevprop.current=props.year
                }
                if (props.name === "databysex") {
                    let p = g7.find((elem => elem["Έτος"] === props.year))
                    let values = getStackedData(p)
                    for (let i = 0; i < chart.data.datasets.length; i++) {
                        chart.data.datasets[i].data = [Math.round(values[0]), Math.round(values[1])]
                        chart.data.datasets[i + 1].data = [Math.round(values[1]), Math.round(values[0])]
                        break
                    }
                    chart.update()
                    prevprop.current=props.year

                }
                if (props.name === "percentage_death_reduction") {
                    let results = calc_bar_line_results()
                    chart.data.labels = results["Έτη"]
                    chart.data.datasets = results["datasets"]
                    chart.update()
                    prevprop.current={y1:props.y1,y2:props.y2}

                }
        }
        }


     })
        // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (

    <div id={props.name}>

            <canvas style={{display:(props.name==="databyage")?"inline":null}}  id={props.name+"_DataChart"} width="700" height="700"></canvas>
    </div>

  );
}


import React from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
//import plugin from "chartjs-plugin-datalabels";
export default function ChartView(props) {
    const [ready,setready]=React.useState(false);
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
    }
    const create_bar_line_chart=()=>{
        const categories=["AXD","VOL","ATH",
            "JKN","JIK","JOA","KIT",
            "EFL","LXS","JSI","JSI","JSI","JIK","IOA","KIT",
            "EFL","LXS","JSI","JSI","JSI","JSI","JSI"
        ]
        const data = {
            labels: categories
                ,
            datasets: [
                {
                type: 'line',
                label: 'Ελαφριά',
                data: create_line_data(2000,30000,22),
                fill: false,
               borderColor: "#B085D6",
               backgroundColor: "rgba(176,133,214,2)",
               tension:0.5,
               yAxisID: 'y',
            },
           {
                type: 'line',
                label: 'Βαριά',
                data: create_line_data(2000,30000,22),
                fill: false,
                borderColor: "#FF9B91",
                backgroundColor: "rgba(255,155,145,1)",
                tension:0.5,
                yAxisID: 'y',
            },
            {
                type: 'line',
                label: 'Νεκροί',
                data: create_line_data(2000,30000,22),
                fill: false,
                backgroundColor: 'rgba(135,214,220,1)',
                borderColor: '#87D6DC',
                tension:0.5,
                yAxisID: 'y',
            },

                {
                type: 'bar',
                label: 'Ατυχήματα',
                data: create_line_data(2000,30000,22),
                borderColor: "#012D81",
                backgroundColor: 'rgba(1,45,129,1)',
                yAxisID: 'y',
            },


            ]
        };
        // const categories=["AXD","VOL","ATH",
        //     "JKN","JIK","JOA","KIT",
        //     "EFL","LXS","JSI","JSI","JSI","JIK","IOA","KIT",
        //     "EFL","LXS","JSI","JSI","JSI","JSI","JSI"
        // ]
        // let acc_data=create_line_data(2000,30000,22)
        // let death_data=create_line_data(2000,30000,22)
        // let light_inj=create_line_data(2000,30000,22)
        // let severe_inj=create_line_data(2000,30000,22)
        // let data = {
        //     labels: categories,
        //     datasets: [
        //         {
        //             type: 'bar',
        //             label: 'Ατυχήματα',
        //             data: acc_data,
        //             borderColor: "#012D81",
        //             backgroundColor: "#012D81"
        //
        //         },
        //         {
        //             type: 'line',
        //             label: 'Ελαφριά',
        //             data: light_inj,
        //             fill: false,
        //             borderColor: "#B085D6",
        //             backgroundColor: "#B085D6"
        //         }, {
        //             type: 'line',
        //             label: 'Βαριά',
        //             data:severe_inj,
        //             fill: false,
        //             borderColor: "#FF9B91",
        //             backgroundColor: "#FF9B91"
        //         }, {
        //             type: 'line',
        //             label: 'Νεκροί',
        //             data: death_data,
        //             fill: false,
        //             backgroundColor: '#87D6DC',
        //             borderColor: '#87D6DC',
        //         }
        //     ]
        // }
        // const config = {
        //     type: 'scatter',
        //     data: data,
        //       options:{
        //
        //         plugins: {
        //     legend: {
        //         position:"bottom"
        //     }
        //     },
        //         scales: {
        //                     x:
        //                         {
        //                             grid: {
        //                                 display: false
        //                             }
        //
        //                         },
        //                     // y: {
        //                     //
        //                     //    // beginAtZero: true
        //                     // }
        //                 }
        //             }
        //
        // };
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
                        beginAtZero: true
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        min: 0,
                        max: 30000,
                },
            }

        }};
        draw_canvas(config)
         /*let canvas = document.getElementById(props.name + "_DataChart");
         let myChart = new Chart(canvas, config)
         props.setContent(myChart)*/
    }



    const create_horizontal_bar_chart= (ds,cl,c)=> {
        Chart.register(annotationPlugin);
        const categories = ["Γαλλία", "Ιταλία", "Γερμανία", "Πολωνία", "Ρουμανία", "Ισπανία",
            "Πορτογαλία", "Ελλάδα", "Βέλγιο", "Βουλγαρία", "Τσεχία", "Ουγγαρία",
            "Ολλανδία", "Αυστρία", "Κροατία", "Σλοβακία", "Σουηδία", "Φινλανδία",
            "Δανία", "Ελβετία", "Λιθουανία", "Ιρλανδία", "Λετονία", "Νορβηγία", "Σλοβενία",
            "Κύπρος", "Εσθονία", "Λουξεμβούργο", "Μάλτα", "Ισλανδία", "Λιχτενστάιν"]
        const data = {
            labels: categories,
            datasets: [
                {

                    data: ds,
                    backgroundColor: cl,datalabels: c["dls"]?{
          color: '#8D939C'
        }:{}
                }]


        }
        const config = {
            type: 'bar',
            plugins:c["dls"]?[ChartDataLabels,plugin]:[plugin],
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
                         max: c["max"],
                        title: {
                            display: true,
                            text: 'Νεκροί(Χιλιάδες)',
                            align :"end"
                        },

                    }
                },

                responsive: true,
                plugins: {
                    autocolors: false,
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
        let years=[]
        for (let i=2010;i<2020;i++){
            years.push(i)
        }
        let data={
            labels:years,
            datasets:[
                {
                    label: 'Ευρωπαϊκή Ένωση',
                    data: create_line_data(50,96,10),
                    fill: false,
                    backgroundColor: '#FFA69E',
                    borderColor: '#FFA69E',
                    tension: 0.1
  },
                {
                    label: 'Ιρλανδία',
                    data: create_line_data(50,96,10),
                    fill: false,
                    backgroundColor: '#18408C',
                    borderColor: '#18408C',
                    tension: 0.1
  },
                {
                    label: 'Ισπανία',
                    data: create_line_data(50,96,10),
                    fill: false,
                    backgroundColor: '#FEB184',
                    borderColor: '#FEB184',
                    tension: 0.1
  }
  ,{
                    label: 'Γαλλία',
                    data: create_line_data(50,96,10),
                    fill: false,
                    backgroundColor: '#2797D9',
                    borderColor: '#2797D9',
                    tension: 0.1
  },
                {
                    label: "Ελλάδα",
                    data: create_line_data(50,96,10),
                    fill: false,
                    backgroundColor: '#87D6DC',
                    borderColor: '#87D6DC',
                    tension: 0.1
  },{
                    label: 'Πολωνία',
                    data: create_line_data(50,96,10),
                    fill: false,
                    backgroundColor: '#204790',
                    borderColor: '#204790',
                    tension: 0.1
  }
            ]
        }
        let config = {
            type: 'line',
            data: data,
            plugins: [plugin],
            options:{
                elements: {
                    point:{
                        radius: 0
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
                                   // min: 0,
                                   // max: 100,// Your absolute max value
                                    callback: function (value) {
                                        return value + '%'; // convert it to percentage
                                    },
                                }
                            }
                        }
                    }
            };
         draw_canvas(config)
    }

    const create_stacked_bar_chart=()=>{


        if (props.name==="databyage"){
            // Chart.register(ChartDataLabels);
            // Chart.defaults.set('plugins.datalabels', {
            //          color: '#FE777B'
            //     });
           const categories=["0-14","18-24","25-49","50-64","65+"]
           const data = {
  labels: categories,
  datasets:[
      {
          data: [4, 11, 37, 19, 26],
          backgroundColor: '#75D1D8',
          borderWidth: 1,
          xAxisID: "x",
          stack: "background",
          datalabels: {
          display:false

          },
      },
      {
          data: [95, 95, 95, 95, 95],
          borderWidth: 1,
          backgroundColor: '#EBF7FF',
          xAxisID: "x1",
          stack: "background",
          datalabels: {



          },

      },



  ]}





//       [{
//
//     data: [4, 11, 37, 19, 26],
//     backgroundColor: [
//       '#75D1D8',
//       '#75D1D8',
//       '#75D1D8',
//       '#75D1D8',
//       '#75D1D8',
//     ], datalabels: {
//           color: '#FFCE56'
//         }
//   },
//   ]
// };
                let config = {
                    type: 'bar',
                    plugins: [ChartDataLabels,plugin],
                    data: data,
                    options: {



                        plugins: {
                            datalabels: {
                                anchor: 'end',
                                align: 'end',
                                formatter: function(value, context) {
                                    



                            return data["datasets"][0].data[context.dataIndex]+"%";},
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
                const categories=["Άντρες","Γυναίκες"]
                let data = {
                    labels: categories,
                    datasets: [{
                        label: 'Άντρες',
                        data: [84.0, 16.0],
                        backgroundColor: "#75D1D8",
                    },
                        {
                            label: 'Γυναίκες',
                            data: [16., 84.0],
                            backgroundColor: "#EBF7FF",
                        }]

                }
                let config = {
                    type: 'bar',
                    data: data,
                    plugins: [plugin],
                    options: {
                        plugins: {
                            legend: {
                                display: false
                            },
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
                                ticks: {
                                   // min: 0,
                                   // max: 100,// Your absolute max value
                                    callback: function (value) {
                                        return value + '%'; // convert it to percentage
                                    },
                                }
                            }
                        }
                    }
                };
                 draw_canvas(config)
            }





    }



     React.useEffect(() => {
        if( ready===false){
            if (props.type==="stacked_bar"){
                create_stacked_bar_chart();
            }
            if (props.type==="horizontal_bar"){
                let ds,cl
                let c={}
                let dl={}
                let dc=45
                switch (props.name){
                    case "databycountrydeaths":
                        ds = [2975, 2975, 2763, 2763, 1185, 1162,
                        1162, 1115, 1106, 1106, 1106, 964,
                        980, 980, 964, 845, 845, 805,
                        805, 686, 686, 673, 582, 108, 102,
                        52, 52, 22, 16, 6, 0]
                        cl = ["#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81",
                        "#012D81", "#FF9B91", "#012D81", "#012D81", "#012D81", "#012D81",
                        "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81",
                        "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81",
                        "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81"]
                        c={max:3500,dls:true,ar:1,dc:0}
                        break
                    case "acc_death_per_million1":
                    case "acc_death_per_million2":
                        if (props.name==="acc_death_per_million1"){
                            dc=65
                        }
                        cl = ["#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE",
                            "#13A2DE", "#75D1D8", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE",
                            "#13A2DE", "#13A2DE", "#FF9B91", "#13A2DE", "#13A2DE", "#13A2DE",
                            "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE",
                            "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE", "#13A2DE"]
                        ds=[87, 87, 79, 79, 65, 64, 64, 60, 59, 59, 59, 50, 51, 51, 50, 48, 46, 45, 45, 43, 43, 38, 39, 29, 26, 16, 16, 6, 2, 1, 0]
                        c={max:120,dls:false,ar:0.5,dc:dc}
                        break;
                }
                // let ds=[2975, 2975, 2763, 2763, 1185, 1162,
                //         1162, 1115, 1106, 1106, 1106, 964,
                //         980, 980, 964, 845, 845, 805,
                //         805, 686, 686, 673, 582, 108, 102,
                //         52, 52, 22, 16, 6, 0]
                // let cl=["#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81",
                //         "#012D81", "#FF9B91", "#012D81", "#012D81", "#012D81", "#012D81",
                //         "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81",
                //         "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81",
                //         "#012D81", "#012D81", "#012D81", "#012D81", "#012D81", "#012D81"]
                create_horizontal_bar_chart(ds,cl,c,dl);
            }
            if (props.type==="line"){
                create_line_chart();
            }
            if (props.type==="line_bar"){
                create_bar_line_chart();
            }
             setready(true)
        }


        else{}


     })
        // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (

    <div id={props.name}>

            <canvas style={{display:(props.name==="databyage")?"inline":null}}  id={props.name+"_DataChart"} width="700" height="700"></canvas>
    </div>

  );
}
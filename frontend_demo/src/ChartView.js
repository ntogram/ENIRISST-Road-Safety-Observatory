import React, { Component } from "react";
import{ useState, useEffect,useRef} from 'react';
import Chart from 'chart.js/auto';
import MultiTypeSaveBtn from './MultiTypeSaveBtn';
import { CSVLink } from "react-csv";
//to 



export default function ChartView(props) {

 //const [chartData,setchartData]=React.useState({})
 const [chart_show,setChartShow]=React.useState(0)   
 const [chart,setChart]=React.useState(undefined)
 const [headers,setheaders]=React.useState([])
 const [csvdata,setcsvdata]=React.useState([])
 const preveucodesRef = useRef();
 const csvLinkEl = React.createRef();
 //const [download_type,setdownloadtype]=React.useState("")
 const [filename,setfilename]=React.useState("")


 const compare_codes=(a,b)=>{
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}

 



 }
 const plugin = {
  id: 'DataChart',
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext('2d');
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};




      React.useEffect(() => {
      //console.log(download_type)
       console.log("CH-2")
       console.log(props)
       // console.log("CH-1")
        if (props.chart_title!==""){
         // console.log("CH0")
          console.log(chart)
         

          console.log(chart_show)
           if( chart_show===0){
           //if (chart=== undefined){
            let fname=props.chart_title
          //  console.log(fname)
            fname=fname.replaceAll(':', "_")
            fname=fname.replaceAll('-',"_")+".csv"
            setfilename(fname)
            //console.log(fname)
            let ht=[
              { label: "Kωδικός NUTS3", key: "Kωδικός NUTS3" },
              { label: "Περιοχή NUTS3/Έτος", key: "Περιοχή NUTS3/Έτος" },
            ]
            for(let i=0;i<props.chart_xlabels.length;i++){
              ht.push({label: (props.chart_xlabels[i]).toString(), key: props.chart_xlabels[i].toString()})
            }
            setheaders(ht)
          //  console.log(ht)
            let dataentry={}
            let dataentries=[]
            for(let i=0;i<props.eu_codes.length;i++){
             dataentry={"Kωδικός NUTS3":props.eu_codes[i],
              "Περιοχή NUTS3/Έτος":props.current_dataset[i].label
            }
            for(let j=0;j<props.chart_xlabels.length;j++){
              dataentry[props.chart_xlabels[j].toString()]=(props.current_dataset[i].data[j]).toString()
            }
            dataentries.push(dataentry)
           // console.log(dataentry)
            }
          setcsvdata(dataentries)  
          console.log("CH2")  
        //   console.log(props.current_dataset)   
           


            let chartData= {
                      labels: props.chart_xlabels,
                       datasets: 
                        props.current_dataset
                           
                         };
        
                  let config = {
                              type: 'bar',
                              data: chartData,
                              options: {
                              responsive: true,

                              


                             
                              scales: {
                                x: {
                                  display: true,
                                  title: {
                                    display: true,
                                    text: 'Έτος',
                                    color: '#911',
                                    font: {
                                      family: 'Comic Sans MS',
                                      size: 22,
                                      weight: 'bold',
                                      lineHeight: 1.2,
                                    },
                                    padding: {top: 20, left: 0, right: 0, bottom: 0}
                                  }
                                },
                                y: {
                                  display: true,
                                  beginAtZero:true,
                                  
                                  type: 'linear',//?
                                  title: {
                                    display: true,
                                    text: "Τίμη Δείκτη"+props.indicator,
                                    color: '#191',
                                    font: {
                                      family: 'Times',
                                      size: 22,
                                      style: 'bold',
                                      lineHeight: 1.2
                                    },
                                    padding: {top: 30, left: 0, right: 0, bottom: 0}
                                  }
                                }
                              },    
                              plugins: {
                                


                              legend: {
                              position: 'top',
                              },
                               title: {
                               display: true,
                               text: props.chart_title,
                               font: {
                                size: 22,
                                style:"oblique"
                            }
                                    },
                                    tooltip: {
                                      callbacks: {
                                          label: function(tooltipItem, data) {
                                             //console.log("s1") 
                                            //console.log(tooltipItem)
                                             // console.log(data)
                                             // console.log("s2") 
                                              var label = tooltipItem.dataset.label;
                          
                                              if (label) {
                                                  label += ': ';
                                              }
                                              label += tooltipItem.raw
                                              //console.log(label)
                                              return label;
                                          }
                                      }
                                  },  



                                     }
                                      },
                                      plugins: [plugin],
                                    
                            };


      console.log("CH4")

      let canvas = document.getElementById('DataChart'); 
       console.log(canvas)
      if (canvas==null){
        console.log("CH43")
        let div=document.getElementById('canvas_frame');
        //console.log(div)
        canvas=document.createElement('canvas')
        canvas.id     = "DataChart";
        canvas.width=700
        canvas.height=700  
       // console.log(canvas)
        div.appendChild(canvas);
        //console.log(div)
      }
      
     // console.log(div)
      //console.log(canvas)
      console.log(config)
     
       var myChart = new Chart(canvas, config)
      // console.log("CH5")
       setChart(myChart)
       setChartShow(1)
      //
       console.log("CH6")
       //console.log(myChart)
                            
    //  console.log(props.current_dataset)
     }
     else{
        if (props.cleargraph===false){
          console.log(props.eu_codes)
          console.log(preveucodesRef.current)
        let added=compare_codes(props.eu_codes, preveucodesRef.current)
        if(added===false){
         console.log(chart)
         chart.config._config.options.plugins.title.text = props.chart_title;
         chart.config._config.options.scales.y.title.text="Τίμη Δείκτη"+props.indicator
         chart.data.labels=props.chart_xlabels
        chart.data.datasets= props.current_dataset;
          //console.log(chart.data.datasets)
         // console.log(props.current_dataset)
          chart.update();
          console.log("here")
        
          let dataentry={}
          let dataentries=[]
            for(let i=0;i<props.eu_codes.length;i++){
             dataentry={"Kωδικός NUTS3":props.eu_codes[i],
              "Περιοχή NUTS3/Έτος":props.current_dataset[i].label
            }
            for(let j=0;j<props.chart_xlabels.length;j++){
              dataentry[props.chart_xlabels[j].toString()]=(props.current_dataset[i].data[j]).toString()
            }
            dataentries.push(dataentry)
            console.log(dataentry)
            }
          setcsvdata(dataentries)  
          setChartShow(true)
          console.log("end")}
        }
       
         
          

        


     }
    }
    else{
      if (props.cleargraph===true){
        console.log("a")
        if (chart!==undefined){
        chart.config._config.options.plugins.title.text = props.chart_title;
        chart.data.datasets=[]
        chart.data.labels=[]
        chart.update()
        let canvas_frame = document.getElementById('canvas_frame');
        canvas_frame.innerHTML = '';
        setChart(undefined)
        setChartShow(0)
        setheaders([])
        setcsvdata([])
        setfilename("")   
       // document.body.click()

        }
        //setChart(undefined)
      
       //canvas_frame.innerHTML = '';
       //canvas.width=0
       //canvas.height=0 
        //let context = canvas.getContext('2d');
       // context.clearRect(0, 0, canvas.width, canvas.height);*/



      }




    }
    preveucodesRef.current = props.eu_codes;
        // console.log("FormTab")
       // setRegion(props.selected_region)
       // console.log(selected_region)
         //console.log(submitted)
         //console.log(geoUnit)
         //console.log(category)
        // console.log(indicator)
        // console.log(year_range)
         //console.log(props.selected_region)
     
     
      }
     )
     const downloadCSV=(type)=>{
      console.log(type)
      if(type==="ΑΠΟΘΗΚΕΥΣΗ ΔΕΔΟΜΕΝΩΝ"){
       // csvLinkEl.current.link.click();
      
      //console.log
      //console.log(filename)
     // console.log(csvdata)
     // console.log(headers)
      csvLinkEl.current.link.click(); 
    }
    else{
     // let image=chart.toBase64Image();
      var a = document.createElement('a');
      a.href = chart.toBase64Image()
     // a.href = chart.toBase64Image('image/jpeg',1);//find correct background color
      a.download = filename.substring(0,filename.length-3)+".png"
      a.click();
      console.log("Export Image")
    }
    //  console.log(headers)
     // csvLinkEl.current.link.click();
  }



    return (

        
        <div id="canvas_frame" style={{marginLeft:"10%"}}>
           
            <canvas  id="DataChart" width="700" height="700"></canvas>
            <MultiTypeSaveBtn downloadCSV={downloadCSV}/>
              <CSVLink
          headers={headers}
          filename={filename}
          data={csvdata}
          ref={csvLinkEl}
        />
        {/*  <p style={{display:(props.cleargraph===true)? "none":"block"}}>My graph</p>*/}
         
        </div>
        
      
       
    )

}
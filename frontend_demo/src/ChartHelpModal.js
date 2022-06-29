import React, { Component } from "react";
import{ useState, useEffect,useRef} from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Steps} from "intro.js-react";
import "intro.js/introjs.css";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};







export default function ChartHelpModal(props) {
  //const labels=Array.from(new Array(8), (x, i) => i + 2012)
  let nums=[[],[]]
  for(let i=0;i<nums.length;i++){
    while(nums[i].length < 8){
      var r = Math.floor(Math.random() * 100) + 1;
      if(nums[i].indexOf(r) === -1) nums[i].push(r);
  }
  }
let myRef = React.createRef(); 
const chartData={
labels:Array.from(new Array(8), (x, i) => i + 2012),
datasets:
[{backgroundColor:"rgba(255,0,0,1)",borderColor:"rgba(255,0,0,1)",label:"A",data:nums[0],hidden:true},
{backgroundColor:"rgba(0,0,255,1)",borderColor:"rgba(0,0,255,1)",label:"B",data:nums[1],hidden:false}
]
}
const [graph_name,setGraphName]=React.useState("")
const [steps,setSteps]=React.useState([])
const [stepsEnabled,setstepsEnabled]=React.useState(false)
const helpsteps=[
  {
    element: "#legend_0",
    intro: "Πάτησε εδώ για να εμφανίσεις την γραφική παράσταση Α"
  },
  {
    element: "#legend_1",
    intro: "Πάτησε εδώ για να κρύψεις την γραφική παράσταση Β"
  }
]
 

 const [chart_show,setChartShow]=React.useState(0)   
 const [chart,setChart]=React.useState(undefined)
 const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector('ul');

  if (!listContainer) {
    listContainer = document.createElement('ul');
    listContainer.style.display = 'flex';
    listContainer.style.flexDirection = 'row';
    listContainer.style.margin = 0;
    listContainer.style.padding = 0;

    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    // Remove old legend items
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item,index) => {
      const li = document.createElement('li');
      li.id="legend_"+index
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '10px';

      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  }
};


const config = {
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
        text: "Τίμη Δείκτη",
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
    htmlLegend: {
      // ID of the container to put the legend in
      containerID: 'legend-container',
    },
    legend: {
      display: false,
    }
   ,
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
          plugins: [htmlLegendPlugin],  
        
}; 


const handleClose=()=>{
/*  if (chart!==undefined){
    chart.data.datasets=[]
    chart.data.labels=[]
    chart.update()
    let canvas_frame = document.getElementById('canvas_help');
    canvas_frame.innerHTML = '';
    let legend_elem=document.createElement("div")
    legend_elem.id="legend_container"
    let  canvas=document.createElement('canvas')
    canvas.id     = "DataChartHelp";
    canvas.width=350
    canvas.height=350
    canvas_frame.appendChild(legend_elem);
    canvas_frame.appendChild(canvas)
    setChart(undefined)
    setChartShow(3)
    console.log("a")

   // document.body.click()

    }*/
   props.handleClose()
   setChartShow(0)
   let canvas_frame = document.getElementById('canvas_help');
   canvas_frame.innerHTML = '';
    
   setstepsEnabled(false)
   setSteps([])
}
React.useEffect(() => {
  console.log(props.open)
  console.log(chart_show)
  if (props.open===true && (chart_show===0 || chart_show===2)){
    let canvas_frame = document.getElementById('canvas_help');
    let canvas = document.getElementById('DataChartHelp');
    console.log(canvas_frame)
    console.log(canvas)
    if (canvas_frame!=null){
    if(canvas_frame.childElementCount==0){
      console.log("st1")
      let legend_elem=document.createElement("div")
      legend_elem.id="legend_container"
      canvas=document.createElement('canvas')
      canvas.id     = "DataChartHelp";
      canvas.width=350
      canvas.height=350
      console.log("st2")
      canvas_frame.appendChild(legend_elem);
      canvas_frame.appendChild(canvas)
    }
  }
    console.log(canvas)

    if (canvas!=null){
      console.log("s2")
      console.log(canvas)
      console.log(config)
      var myChart = new Chart(canvas, config)
      console.log("s3")
     // document.getElementById('legend_0').click()
      console.log("s4")
      setChart(myChart)
      setChartShow(1)
     setstepsEnabled(true)
     
      setSteps(helpsteps)


      console.log("s1")
    }
    
    else{
      setChartShow(2)
    }
  }
  /*if (props.open===true && (chart_show===1)){
    setChartShow(0)
    let canvas_frame = document.getElementById('canvas_help');
    console.log(canvas_frame)
    console.log("st0")
   /* if(canvas_frame.childElementCount==0){
      console.log("st1")
      let legend_elem=document.createElement("div")
      legend_elem.id="legend_container"
      let  canvas=document.createElement('canvas')
      canvas.id     = "DataChartHelp";
      canvas.width=350
      canvas.height=350
      console.log("st2")
      canvas_frame.appendChild(legend_elem);
      canvas_frame.appendChild(canvas)
      console.log("st3")
      var myChart = new Chart(canvas, config)
      console.log("st4")
      document.getElementById('legend_0').click()
      console.log("st5")

    }*/
  
  



 
})
  




    return (
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
       
      
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
         <span style={{fontSize:"medium",fontWeight:"bold",color:'PowderBlue',fontStyle:"oblique"}}>Βοήθεια:εμφάνιση/απόκρυψη γραφημάτων </span>
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <div id="canvas_help">
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={0}
          onExit={handleClose}
         
         
         
    />
       
   
         <div id="legend-container"></div>
         <canvas  id="DataChartHelp" width="350" height="350"></canvas>
        
         </div> 
        </DialogContent>
       {/* <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Save changes
          </Button>
       </DialogActions>*/}
      </BootstrapDialog>


/*
        <div id="canvas_help">
         <div id="legend-container"></div>
         <canvas  id="DataChartHelp" width="700" height="700"></canvas>
         </div>*/
    )

}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DisplayData from './DisplayData';
import nuts1 from './NUTS3/nuts1.json'
import nuts2 from './NUTS3/nuts2.json'
import nuts3 from './NUTS3/nuts3.json'
import nuts4 from './NUTS3/nuts4.json'
import nuts5 from './NUTS3/nuts5.json'
import nuts6 from './NUTS3/nuts6.json'
import nuts7 from './NUTS3/nuts7.json'
import nuts8 from './NUTS3/nuts8.json'
import nuts9 from './NUTS3/nuts9.json'
import nuts10 from './NUTS3/nuts10.json'
import nuts11 from './NUTS3/nuts11.json'
import nuts12 from './NUTS3/nuts12.json'
import nuts13 from './NUTS3/nuts13.json'
import nuts14 from './NUTS3/nuts14.json'
import nuts15 from './NUTS3/nuts15.json'
import nuts16 from './NUTS3/nuts16.json'
import nuts17 from './NUTS3/nuts17.json'
import nuts18 from './NUTS3/nuts18.json'
import nuts19 from './NUTS3/nuts19.json'
import nuts20 from './NUTS3/nuts20.json'
import nuts21 from './NUTS3/nuts21.json'
import nuts22 from './NUTS3/nuts22.json'
import nuts23 from './NUTS3/nuts23.json'
import nuts24 from './NUTS3/nuts24.json'
import nuts25 from './NUTS3/nuts25.json'
import nuts26 from './NUTS3/nuts26.json'
import nuts27 from './NUTS3/nuts27.json'
import nuts28 from './NUTS3/nuts28.json'
import nuts29 from './NUTS3/nuts29.json'
import nuts30 from './NUTS3/nuts30.json'
import nuts31 from './NUTS3/nuts31.json'
import nuts32 from './NUTS3/nuts32.json'





const useStyles = makeStyles((theme) => ({
  form_root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      
      
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    flexbox_container:{
      display: "flex",
      flexDirection:"row"
    },
   


  },
}));

export default function FormTab (props) {
  const classes = useStyles();
  const [geoUnit, setgeoUnit] = React.useState('');
  //change with nuts
  const NUTS3mpapping={
      "Ετήσιος αριθμός ατυχημάτων":nuts1["1"],
      "Ετήσιος αριθμός ατυχημάτων/εκατ. κατοίκους":nuts2["2"],
      "Ετήσιος αριθμός νεκρών από ατυχήματα/εκατ. κατοίκους":nuts3["3"],
      "Ετήσιος αριθμός σοβαρά τραυματιών από ατυχήματα/εκατ. κατοίκους":nuts4["4"],
      "% ατυχημάτων με εμπλοκή ευάλωτων χρηστών":nuts5["5"],
      "% ατυχημάτων τις βραδινές ώρες 22.00-06.00":nuts6["6"],
      "% ατυχημάτων τις ώρες αιχμής":nuts7["7"],
      "Αριθμός ατυχημάτων/χλμ. οδικού δικτύου":nuts8["8"],
      "Αριθμός ατυχημάτων/τ.μ.":nuts9["9"],
      "% ατυχημάτων που συμβαίνουν τους θερινούς μήνες":nuts10["10"],
      "% ατυχημάτων υπό δυσμενείς καιρικές συνθήκες":nuts11["11"],
      "% ατυχημάτων σε σημεία με κακό βαθμό συντήρησης οδοστρώματος":nuts12["12"],
      "% ατυχημάτων υπό δυσμενείς καιρικές συνθήκες & σε σημεία με κακό βαθμό συντήρησης οδοστρώματος":nuts13["13"],
      "% ατυχημάτων κάτω από κακές συνθήκες φωτισμού":nuts14["14"],
      "% θανατηφόρων ατυχημάτων":nuts15["15"],
      "% ατυχημάτων με σοβαρά τραυματίες":nuts16["16"],
      "% ατυχημάτων με ελαφρά τραυματίες":nuts17["17"],
      "% παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα <29 ετών":nuts18["18"],
      "% παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα >65 ετών":nuts19["19"],
      "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα <29 ετών":nuts20["20"],
      "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα >65 ετών":nuts21["21"],
      "% παθόντων (νεκρών & σοβαρά τραυματιών) ανδρών από ατυχήματα":nuts22["22"],
      "% παθόντων (νεκρών & σοβαρά τραυματιών) γυναικών από ατυχήματα":nuts23["23"],
      "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) ανδρών από ατυχήματα":nuts24["24"],
      "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) γυναικών από ατυχήματα":nuts25["25"],
      "% ατυχημάτων με παράσυρση πεζού":nuts26["26"],
      "Αριθμός ατυχημάτων με παράσυρση πεζού":nuts27["27"],
      "% ατυχημάτων τα Σαββατοκύριακα":nuts28["28"],
      "(Αριθμός νεκρών από ατυχήματα/εκατ.)/(Αριθμός νεκρών από ατυχήματα/εκατ. στην επικράτεια)":nuts29["29"],
      "Αριθμός ατυχημάτων/1.000 κυκλοφορούντα οχήματα":nuts30["30"],
      "Αριθμός ατυχημάτων/ΑΕΠ":nuts31["31"],
      "Αριθμός ατυχημάτων/Αριθμό ανέργων":nuts32["32"]}
  const [category, setCategory] = React.useState('');
  const [categoryState,setcategoryState]=React.useState(true)
  const [categoryLst,setcategoryLst]=React.useState([]);

  const [indicator, setIndicator] = React.useState('');
  const [indicatorState,setindicatorState]=React.useState(true)
  const [indicatorLst,setindicatorLst]=React.useState([]);
  const [year_range,setYearRange]=React.useState([]);
  const [yearsliderState,setyearsliderState]=React.useState(true)
  const [selected_region,setRegion]=React.useState(props.selected_region);
  const [errors,setErrors]=React.useState([false,false,false,false,false])
  const [submitted,setSubmited]=React.useState(false)
  const [table_data,setTableData]=React.useState([]);

  const handleChangegeoUnit = (event) => {
    setgeoUnit(event.target.value);
    props.setgeoLevel(event.target.value)
    const gunit=event.target.value
    let  clst=null
    let ers=errors
    ers[0]=false
    setErrors(ers)
    if (gunit==="NUTS3"){
      setcategoryState(false)
      clst=["Πλήθος ατυχημάτων","Συνθήκες","Εμπλεκόμενοι","Παθόντες","Κοινωνικοοικονομικά χαρακτηριστικά"]
      setcategoryLst(clst)
      setCategory("")
      setIndicator("")
      setindicatorState(true)
      setyearsliderState(true)
      setYearRange([])
    }
    else{
      setcategoryState(true)
      clst=[]
      setcategoryLst(clst)
      setCategory("")
      setindicatorState(true)
      setIndicator("")
      setyearsliderState(true)
      setYearRange([])
    }




  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    const c=event.target.value
    let ers=errors
    ers[1]=false
    setErrors(ers)
    
    let  ilst=null
    if (geoUnit==="NUTS3"){
        setindicatorState(false)
        setIndicator("")
        setyearsliderState(true)
        setYearRange([])
        switch (c) {
          case 'Πλήθος ατυχημάτων':
            ilst=["Ετήσιος αριθμός ατυχημάτων"] //1
            setindicatorLst(ilst)
            break;
          case 'Συνθήκες':
            ilst=["% ατυχημάτων τις βραδινές ώρες 22.00-06.00",
            "% ατυχημάτων τις ώρες αιχμής",
            "% ατυχημάτων που συμβαίνουν τους θερινούς μήνες",
            "% ατυχημάτων υπό δυσμενείς καιρικές συνθήκες",
            "% ατυχημάτων σε σημεία με κακό βαθμό συντήρησης οδοστρώματος",
            "% ατυχημάτων υπό δυσμενείς καιρικές συνθήκες & σε σημεία με κακό βαθμό συντήρησης οδοστρώματος",
            "% ατυχημάτων κάτω από κακές συνθήκες φωτισμού",
            "% ατυχημάτων τα Σαββατοκύριακα"
            ]//6,7,10,11,12,13,14,28
            setindicatorLst(ilst)
            break;
          case 'Εμπλεκόμενοι':
            console.log("here")
            ilst=["% ατυχημάτων με εμπλοκή ευάλωτων χρηστών",
            "% θανατηφόρων ατυχημάτων",
            "% ατυχημάτων με σοβαρά τραυματίες",
            "% ατυχημάτων με ελαφρά τραυματίες",
            "% παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα <29 ετών",
            "% ατυχημάτων με παράσυρση πεζού",
            "Αριθμός ατυχημάτων με παράσυρση πεζού"
            ]//5, 15, 16, 17, 18, 26, 27
            setindicatorLst(ilst)
            break; 
          case 'Παθόντες':
            ilst=["Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα <29 ετών",
            "% παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα >65 ετών",
            "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα >65 ετών",
            "% παθόντων (νεκρών & σοβαρά τραυματιών) ανδρών από ατυχήματα",
            "% παθόντων (νεκρών & σοβαρά τραυματιών) γυναικών από ατυχήματα",
            "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) ανδρών από ατυχήματα",
            "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) γυναικών από ατυχήματα",
            ]//19,20,21,22,23,24,25
            setindicatorLst(ilst)
            break;
          case 'Κοινωνικοοικονομικά χαρακτηριστικά':
            ilst=[
              "Ετήσιος αριθμός ατυχημάτων/εκατ. κατοίκους",
              "Ετήσιος αριθμός νεκρών από ατυχήματα/εκατ. κατοίκους",
              "Ετήσιος αριθμός σοβαρά τραυματιών από ατυχήματα/εκατ. κατοίκους",
              "Αριθμός ατυχημάτων/χλμ. οδικού δικτύου",
              "Αριθμός ατυχημάτων/τ.μ.",
              "(Αριθμός νεκρών από ατυχήματα/εκατ.)/(Αριθμός νεκρών από ατυχήματα/εκατ. στην επικράτεια)",
              "Αριθμός ατυχημάτων/1.000 κυκλοφορούντα οχήματα",
              "Αριθμός ατυχημάτων/ΑΕΠ",
              "Αριθμός ατυχημάτων/Αριθμό ανέργων"
              ]//2, 3, 4, 8, 9, 29, 30, 31, 32
            setindicatorLst(ilst)
            break;            
        }

    }
    else{
      setindicatorState(true)
      setIndicator("")
      setyearsliderState(true)
      setYearRange([])
      
    }



  };
  const handleChangeIndicator= (event) => {
    setIndicator(event.target.value);
    let ers=errors
    ers[2]=false
    ers[3]=false
    setErrors(ers)


    console.log(event.target.value)
    const range_indicators=["Ετήσιος αριθμός ατυχημάτων",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα <29 ετών",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα >65 ετών",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) ανδρών από ατυχήματα",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) γυναικών από ατυχήματα",
    "Αριθμός ατυχημάτων με παράσυρση πεζού"
  ]
  setyearsliderState(false)
  let check=range_indicators.includes(event.target.value)
  if (check===true){
    console.log(1)
    setYearRange([2012,2019]);
  }
  else{
    console.log(2)
    setYearRange([2012]);
  }



  }

  const handleChangeYearRange = (event, newValue) => {
    setYearRange(newValue);
  };

  const ClearForm=()=>{
   // props.btnclick("wait")
    setgeoUnit("")
    props.setgeoLevel("")
    setcategoryState(true)
    const clst=[]
    setcategoryLst(clst)
    setCategory("")
    setindicatorState(true)
    setindicatorLst(clst)
    setIndicator("")
    setyearsliderState(true)
    setYearRange([])
    setRegion("")
    setErrors([false,false,false,false,false])
    setSubmited(false)
    setTableData([])
   // props.btnclick("initial")


  }
  const SubmitForm=()=>{
   // props.btnclick("wait")
    let ers=[]
    let s=0
    let response=[]
    const range_indicators=["Ετήσιος αριθμός ατυχημάτων",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα <29 ετών",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) από ατυχήματα στην ηλικιακή ομάδα >65 ετών",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) ανδρών από ατυχήματα",
    "Αριθμός παθόντων (νεκρών & σοβαρά τραυματιών) γυναικών από ατυχήματα",
    "Αριθμός ατυχημάτων με παράσυρση πεζού"
  ]
    if (geoUnit===""){
      ers.push(true)
      s=s+1
    }
    else{
      ers.push(false)
    }
    if (category===""){
      ers.push(true)
      s=s+1
    }
    else{
      ers.push(false)
    }
    if (indicator===""){
      ers.push(true)
      s=s+1
    }
    else{
      ers.push(false)
    }
    if (year_range.length===0){
      s=s+1
      ers.push(true)
    }
    else{
      ers.push(false)
    }
    if (selected_region===""){
      ers.push(true)
      s=s+1
    }
    else{
      ers.push(false)
    }
    if (s==0){
      setSubmited(true)
      let data=NUTS3mpapping[indicator]
      let check=range_indicators.includes(indicator)
      if (check==false){
        let received = data.filter(function (r) {
          return r["Περιοχή NUTS 3"] === selected_region &&
                 r["Έτος"] === (year_range[0].toString())         
        });
        response=[
            {
              "name":"Άλλες Πληροφορίες","value":"","propvalues":
              [

                {"name":"Γεωγραφικό Επίπεδο","value":geoUnit},
                {"name":"eu_code","value":received[0]["eu_code"]},
                {"name":"Περιοχή NUTS3","value":selected_region},
                {"name":"Κατηγορία Δείκτη","value":category},
              ]
            },
            {"name":"Όνομα Δείκτη","value":indicator,"propvalues":[
              {"name":year_range[0],
              "value":received[0][indicator]+(indicator.startsWith("%")===true?"%":"")
            
            
            }]
          }
        ]
       /*  response=[
            


            {"name":"Γεωγραφικό Επίπεδο","value":geoUnit,"indicator_values":[]},
            {"name":"eu_code","value":received[0]["eu_code"],"indicator_values":[]},
            {"name":"Περιοχή NUTS3","value":selected_region,"indicator_values":[]},
            {"name":"Κατηγορία Δείκτη","value":category,"indicator_values":[]},
            {"name":"Όνομα Δείκτη","value":indicator,"indicator_values":[
                {"year":year_range[0],
                "indicator_value":received[0][indicator]+(indicator.startsWith("%")===true?"%":"")
              
              
              }

            ]}


        ]*/


        console.log(received)
      }
      else{
        let received = data.filter(function (r) {
          return r["Περιοχή NUTS 3"] === selected_region &&
                 (parseInt(r["Έτος"])>=year_range[0] &&   parseInt(r["Έτος"])<=year_range[1])       
        });
        let received_indicators=[]
        let sumrange=0
        for (const [index, element] of received.entries()){
          received_indicators.push(
            {"name":element["Έτος"],
            "value":element[indicator]
          })
          if (isNaN(element[indicator])==false){
              sumrange+=parseInt(element[indicator])
          }
        }
        received_indicators.push(
          {"name":year_range[0].toString()+"-"+year_range[1].toString()
          ,
          "value":sumrange
        })  
        
        response=[
          {
            "name":"Άλλες Πληροφορίες","value":"","propvalues":
            [

              {"name":"Γεωγραφικό Επίπεδο","value":geoUnit},
              {"name":"eu_code","value":received[0]["eu_code"]},
              {"name":"Περιοχή NUTS3","value":selected_region},
              {"name":"Κατηγορία Δείκτη","value":category},
            ]
          },
          {"name":"Όνομα Δείκτη","value":indicator,"propvalues":received_indicators
        }
      ]
      /*  response=[
          {"name":"Γεωγραφικό Επίπεδο","value":geoUnit,"indicator_values":[]},
          {"name":"eu_code","value":received[0]["eu_code"],"indicator_values":[]},
          {"name":"Περιοχή NUTS3","value":selected_region,"indicator_values":[]},
          {"name":"Κατηγορία Δείκτη","value":category,"indicator_values":[]},
          {"name":"Όνομα Δείκτη","value":indicator,"indicator_values":received_indicators
            
            
            }]*/

          


      



      }

      setTableData(response)
    }
    else{
      setSubmited(false)
    }

    setErrors(ers)
   // props.btnclick("initial")
    //console.log(geoUnit)
   // console.log(category)
   // console.log(indicator)
   // console.log(year_range)
   // console.log(selected_region)
  }

  React.useEffect(() => {
   // console.log("FormTab")
    if (geoUnit===""){
      setRegion("")
    }
    else{
      
      setRegion(props.selected_region)
    }
  //  setRegion(props.selected_region)
  // console.log(indicatorLst)
    //console.log(submitted)
    //console.log(geoUnit)
    //console.log(category)
   // console.log(indicator)
   // console.log(year_range)
    //console.log(props.selected_region)


 }
)





  return (
    <div>
    <form className={classes.form_root} noValidate autoComplete="off">
    <Typography style={{letterSpacing:0}} align="left" color="primary" gutterBottom>1.Επιλέξτε γεωγραφική μονάδα</Typography>
     <FormControl variant="filled" style={{minWidth: 750}} required={true}>
     
        <InputLabel id="demo-simple-select-filled-label">Γεωγραφική Μονάδα</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={geoUnit}
          onChange={handleChangegeoUnit}
          autoWidth={true}
        >
          <MenuItem disabled={true} value="">
            <em>Γεωγραφική Μονάδα</em>
          </MenuItem>
          <MenuItem value={"Οικισμοί"}>Οικισμοί</MenuItem>
          <MenuItem value={"Δήμοι"}>Δήμοι</MenuItem>
          <MenuItem value={"NUTS3"}>NUTS3</MenuItem>
          <MenuItem value={"Επικράτεια"}>Επικράτεια</MenuItem>
        </Select>

      <div style={{display:(errors[0]===true)?"inline":"none"}}>
      <FormHelperText error={true}>Η συμπλήρωση αυτού του πεδίου είναι υποχρεωτική</FormHelperText></div>
                
      </FormControl>
      
      <br/>
      <Typography style={{letterSpacing:0,minWidth:"30ch"}} align="left" color="primary" gutterBottom>2.Επιλέξτε περιοχή από το χάρτη</Typography>
      <FormControl variant="filled" style={{minWidth: 750}}  required={true}>
     
        
        <TextField
          id="filled-read-only-input"
         label="Περιοχή"
          value={geoUnit!==""?selected_region:""}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          disabled={categoryState}
        />




        <div style={{display:(errors[4]==true)?"inline":"none"}}>   
        <FormHelperText error={true}>Πρέπει να επιλέξετε περιοχή από το χάρτη</FormHelperText></div>
        </FormControl>     
     
      <br/>



      <Typography style={{letterSpacing:0}}  align="left" color="primary" gutterBottom>3.Επιλέξτε κατηγορία δείκτη</Typography>
      <FormControl variant="filled" style={{minWidth: 750}}  required={true}>
      
        <InputLabel id="demo-simple-select-filled-label">Κατηγορία  Δείκτη</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={category}
          onChange={handleChangeCategory}
          autoWidth={true}
          disabled={categoryState}
        >
          <MenuItem disabled={true} value="">
            <em>Κατηγορία  Δείκτη</em>
          </MenuItem>
          {categoryLst.map(c => (
       <MenuItem value={c}>{c}</MenuItem>
      ))}         
        </Select>

        <div style={{display:(errors[1]==true)?"inline":"none"}}>
      <FormHelperText error={true}>Η συμπλήρωση αυτού του πεδίου είναι υποχρεωτική</FormHelperText></div>
                
      </FormControl>
      <br/>
      <Typography style={{letterSpacing:0}} align="left" color="primary" gutterBottom>4.Επιλέξτε  δείκτη ατυχημάτων</Typography>
      <FormControl variant="filled" style={{minWidth: 750}}  required={true}>
     
        <InputLabel id="demo-simple-select-filled-label">Δείκτης Ατυχημάτων</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={indicator}
          onChange={handleChangeIndicator}
          autoWidth={true}
          disabled={indicatorState}
        >
          <MenuItem disabled={true} value="">
            <em>Δείκτης Ατυχημάτων</em>
          </MenuItem>
          {indicatorLst.map(c => (
       <MenuItem value={c}>{c}</MenuItem>
      ))}         
        </Select>
        <div style={{display:(errors[2]==true)?"inline":"none"}}>      
      <FormHelperText error={true}>Η συμπλήρωση αυτού του πεδίου είναι υποχρεωτική</FormHelperText></div>
                
      </FormControl>
      <br/>
      <Typography style={{letterSpacing:0,minWidth:"30ch"}} align="left" color="primary" gutterBottom>5.Επιλέξτε έτος/χρονική περίοδο</Typography>
      <FormControl   required={true}>     
      <div style={{marginTop:"12%"}}> 
      <Slider
        value={year_range}
        onChange={handleChangeYearRange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        disabled={yearsliderState}
        valueLabelDisplay="on"
        min={2012}
        max={2019}    
      />
      </div> 
          <div style={{display:(errors[3]==true)?"inline":"none"}}>   
       <FormHelperText error={true}>Η συμπλήρωση αυτού του πεδίου είναι υποχρεωτική</FormHelperText></div>
        </FormControl>  
        <br/>
        
        
         <div style={{marginTop:"3%",float:"right"}}>  
        <Button style={{marginRight:"3%"}} variant="contained" color="primary" onClick={SubmitForm}>
              ΥΠΟΒΟΛΗ
          </Button>
          <Button variant="contained" color="secondary" onClick={ClearForm}>
        ΑΚΥΡΩΣΗ
      </Button>   
      </div> 
          








          






    </form>
    <br/>
    <div style={{ display:(submitted?"block":"none"),
      
      marginTop:"8%"}}>
    <DisplayData rows={table_data}  data_source={"ΕΛΣΤΑΤ"}/>
    </div>
    </div>     

  );
}

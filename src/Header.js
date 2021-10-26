import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import logo from './images/enirisst_logo.jpg'
import logobeta from './images/enirisst_logobeta.jpg'
import graphpaceholder from './images/graphplaceholder.png'
import FormTab from './FormTab';
import MapDisplayer from './MapDisplayer';
import { Map } from 'leaflet';
import TrendFormTab from './TrendFormTab';
import ChartView from './ChartView';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  toolbar: {
    minHeight: 32,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'center',
    marginLeft:"5%",
  /*  textAlign: 'center',*/
    color:'PowderBlue',
    fontFamily: "Brush Script MT",
    fontStyle:"oblique"

  },
  logo: {
    maxWidth: 160,
  },
  logox:{
    display:"flex",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"10%"
  },
  graph_preview:{
    marginLeft:"10%",
    maxWidth:700,
    maxHeight:700

  },
  tab1:{
    display:"flex",
    
   // justifyContent:"flex-end"

  }
  

}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }





export default function Header() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [selected_region,setRegion]=React.useState("");
  const [geoUnit, setgeoUnit] = React.useState('');
  const [chart_title,setChartTitle]=React.useState('');
  const [chart_xlabels,setChartXlabels]=React.useState([]);
  const [current_dataset,setCurrentDataset]=React.useState([]);
  const [indicator,setIndicator]=React.useState("")
  const [eu_codes,seteucodes]=React.useState([])
  const [cleargraph,setClearGraph]=React.useState(false)
  const [cur,setcur]=React.useState("initial")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


const changecursor=(value) =>{
  setcur(value)
}

const defineChart=(x_axis_labels,dataset,title,indicator,codes)=>{
  setChartTitle(title)
  setChartXlabels(x_axis_labels)
  setIndicator(indicator)
  setCurrentDataset(dataset)
  seteucodes(codes)
}

  React.useEffect(() => {
    console.log("Header")
     // console.log(chart_xlabels)
     console.log(current_dataset)
     // console.log(cleargraph)


   }
  )

  return (
    <div style={{cursor:cur,marginBottom:(value===0)?"20%":"0%"}}className={classes.root}>
      <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <img src={logo} alt="ENIRISST" className={classes.logo} />
     
       
          
          <Typography className={classes.title} variant="h5" noWrap>
            ΠΑΡΑΤΗΡΗΤΗΡΙΟ ΟΔΙΚΗΣ ΑΣΦΑΛΕΙΑΣ
          </Typography>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="ΣΧΕΤΙΚΑ" {...a11yProps(0)} />
          <Tab label="ΔΕΙΚΤΕΣ ΑΤΥΧΗΜΑΤΩΝ" {...a11yProps(1)} />
          <Tab label="ΤΑΣΕΙΣ ΔΕΙΚΤΩΝ ΑΤΥΧΗΜΑΤΩΝ" {...a11yProps(2)} />
          
        </Tabs>



          </Toolbar>
        
      </AppBar>
      <TabPanel value={value} index={0}>
        <div>
        <img src={logobeta} alt="ENIRISST" className={classes.logox} />
        
        </div>
        
     

      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className={classes.tab1}>
      <FormTab  btnclick={changecursor} setgeoLevel={setgeoUnit}  selected_region={selected_region}/> 
  
      <MapDisplayer geoUnit={geoUnit} setRegion={setRegion}/>
      </div>
     
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className={classes.tab1}>
      <TrendFormTab btnclick={changecursor} defineChart={defineChart} ClearChart={setClearGraph}/> 
    
      {(chart_title==="")?
      <img src={graphpaceholder} alt="GRAPH_PLACEHOLDER" className={classes.graph_preview} />:
     <ChartView chart_title={chart_title} chart_xlabels={chart_xlabels} indicator={indicator} current_dataset={current_dataset}
     cleargraph={cleargraph} eu_codes={eu_codes}
     
     /> }
     
      </div>


     
      </TabPanel>



      
    </div>
  );
}
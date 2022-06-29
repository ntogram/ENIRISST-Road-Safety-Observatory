import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { CSVLink } from "react-csv";
/*const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: "PowderBlue",
    fontStyle:"oblique",
    fontFamily: "Brush Script MT",
  },
  body: {
    fontSize: 14,
    fontFamily: "Brush Script MT",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
*/
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: "PowderBlue",
    fontStyle:"oblique",
    fontFamily: "Brush Script MT",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function createData(name,value,indicator_values) {
  return { name, value, indicator_values
};
  
  };


const rows = [
  createData('Γεωγραφικό Επίπεδο', "NUTS3",[]),
  createData('eu_code', "EL631",[]),
  createData('Περιοχή NUTS 3', "ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ",[]),
  createData('Κατηγορία Δείκτη', "Πλήθος ατυχημάτων",[]),
  createData('Όνομα Δείκτη', "Ετήσιος αριθμός ατυχημάτων",[
    {"year":2012,"indicator_value":"175"},
    {"year":2013,"indicator_value":"178"},
    {"year":2014,"indicator_value":"162"},
    {"year":2015,"indicator_value":"167"},
    {"year":2016,"indicator_value":"143"},
    {"year":2017,"indicator_value":"174"},
    {"year":2018,"indicator_value":"189"},
    {"year":2019,"indicator_value":"180"},
    

  ]),
];






const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',

      
    },
  },
});



function Row(props) {
  const { row } = props;
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(true);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow className={classes.root}>
      <StyledTableCell>
          {
          (row.name==="Άλλες Πληροφορίες")?
          
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen1(!open1)}>
            {open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            
          </IconButton>:
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen2(!open2)}>
          {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          
        </IconButton>

          
          
          }
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="right">{row.value}</StyledTableCell>
        
      </StyledTableRow>
     
     
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        {
          (row.name==="Άλλες Πληροφορίες")?
        <Collapse in={open1} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
               Άλλες Πληροφορίες
              </Typography>
              <Table size="large" aria-label="other_info">
                <TableHead>
                  <TableRow>
                    <TableCell>Όνομα</TableCell>
                    <TableCell align="right">Τιμή</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.propvalues.map((proprow) => (
                    <TableRow key={proprow.name}>
                      <TableCell component="th" scope="row">
                        {proprow.name}
                      </TableCell>
                      
                      <TableCell align="right">
                        {proprow.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            </Collapse>:
                 <Collapse in={open2} timeout="auto" unmountOnExit>
                 <Box margin={1}>
                   <Typography variant="h6" gutterBottom component="div">
                    Τιμή/ές δείκτη:{row.value}
                   </Typography>
                   <Table size="large" aria-label="indicator_values">
                     <TableHead>
                       <TableRow>
                         <TableCell>Έτος</TableCell>
                         <TableCell align="right">Τιμή Δείκτη</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                       {row.propvalues.map((proprow) => (
                         <TableRow key={proprow.name}>
                           <TableCell component="th" scope="row">
                             {proprow.name}
                           </TableCell>
                           
                           <TableCell align="right">
                             {proprow.value}
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </Box>
                 </Collapse>}
                  </StyledTableCell>
                
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    value: PropTypes.string.isRequired,
   
    propvalues: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};



export default function DisplayData(props) {
  const classes = useStyles();
  const [headers,setheaders]=React.useState([])
  
  const csvLinkEl = React.createRef();
  const [filename,setfilename]=React.useState("")
  const [data,setdata]=React.useState([])
  const downloadCSV=()=>{
      console.log(props.rows)
      console.log(filename)
      console.log(data)
      console.log(headers)
      csvLinkEl.current.link.click();
  }
  React.useEffect(() => {
      console.log(props.rows)
      if (props.rows.length===0){
        if (filename!=="" || data.length>0){
          setfilename("")
          setdata([])
        }
      }
      else{
        
      
        let indicator_name=props.rows[1]["value"]
        let ht=[
          { label: "Έτος", key: "Έτος" },
          { label: indicator_name, key: "Τιμή Δείκτη" },
        ]
        let location_name=(props.rows[0].propvalues[2].value)
        let range_name=props.rows[1].propvalues[props.rows[1].propvalues.length-1].name.toString()
        let fname=location_name+"_"+range_name+".csv"
        fname=fname.replaceAll('-', "_")
        fname=fname.replaceAll(' ',"_")
        fname=fname.replaceAll(',', "")
        //fname=fname.replace(/,|, |-|/g,'_')
        //fname=(fname.replace(",","_")).substr(1)
        let dataentry=[]
        if (filename!=fname){
            setfilename(fname)
            for (const [index, element] of props.rows[1].propvalues.entries()){
              dataentry.push({"Έτος":element["name"],"Τιμή Δείκτη":element["value"]})
          }
          setdata(dataentry)
          setheaders(ht)
        }
        }
        
        


  }
  )
  //console.log(rows[0])
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={downloadCSV}
      >
        ΑΠΟΘΗΚΕΥΣΗ
       
      </Button>
      <CSVLink
          headers={headers}
          filename={filename}
          data={data}
          ref={csvLinkEl}
        />
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
            <StyledTableCell>Όνομα Πεδίου</StyledTableCell>
            <StyledTableCell align="right">Τιμή Πεδίου</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant="overline" color="primary"> ΠΗΓΗ ΔΕΔΟΜΕΝΩΝ: {props.data_source}</Typography>
</div>
  );
}

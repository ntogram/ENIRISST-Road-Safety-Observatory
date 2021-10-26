import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles,useTheme } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },button: {
    margin: theme.spacing(1),
  },
}));




function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
     
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};









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










const useRowStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));







export default function DisplayTrendData(props) {
  const classes = useRowStyles()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

//  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleClick=()=>{
    console.log(props.rows)
}





  React.useEffect(() => {
    if(props.submitted==false){
      setPage(0);
    }
   /* console.log("Trend Data")
    {props.rows.map((row) => (
      console.log(row)
      (Object.entries(row).map(([key,value],i) =>{
          console.log(key);
          console.log(value);
          console.log(i);
      }))



))}
*/
 
 
  }
 )
 console.log("executed")
  let tablerows=[]
  let cells=[]
  let reg=""
  console.log(props.rows)
  for (let i=0;i<props.rows.length;i++){
    let cellitems=props.rows[i]
    //console.log(cellitems)
    cells.push(<StyledTableCell component="th" scope="row">
    {cellitems["code"]}
  </StyledTableCell>); 
    cells.push(<StyledTableCell component="th" scope="row">
    {cellitems["name"]}
  </StyledTableCell>); 
  (Object.entries(cellitems).map(([key,value],i) =>{
      if(key!="name" && key!="code"){
        cells.push(<StyledTableCell align="right">
          {value}
                
           
    
      </StyledTableCell>
          )}
      }))
  console.log(cells)
  tablerows.push(<StyledTableRow>{cells}</StyledTableRow>)
  cells=[]

  }
 
 // tablerows.push(<StyledTableRow>{cells}</StyledTableRow>)
  
 //reg=""
  
  



 console.log(tablerows)
  return (
    <div>
  
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Kωδικός NUTS3</StyledTableCell>
            <StyledTableCell>Περιοχή NUTS3/Έτος</StyledTableCell>
            {props.labels.map((label) => (
            <StyledTableCell align="right">
                
                 {label}</StyledTableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>


          {(rowsPerPage > 0
            ? tablerows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tablerows)
          
          
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>     






      </Table>
    </TableContainer>
    <Typography variant="overline" color="primary"> ΠΗΓΗ ΔΕΔΟΜΕΝΩΝ: {props.data_source}</Typography>         
    </div>
  );
}

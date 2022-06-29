import React, {useEffect, useState} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import "./DateRangePicker.css"
export  default function DatePickerSelector(props) {
  const [value, setValue] = useState([new Date(), new Date()]);

  const onChange=(event)=>{
  //  console.log(event[0].getFullYear())
   // console.log(event[1].getFullYear())
    props.setVal1(event[0].getFullYear())
    props.setVal2(event[1].getFullYear())
    setValue(event)
  }



  return (
    <div className={"datepickerselector"}>
      <DateRangePicker  clearIcon={null} rangeDivider={"ως"} format={"dd-MM-y"} onChange={onChange} value={value} />
       <div style={{marginTop:"1%"}} className={"daterange_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
    </div>
  );
}
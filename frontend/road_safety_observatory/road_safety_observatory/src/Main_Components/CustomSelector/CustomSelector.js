import React, {useEffect, useRef, useState} from 'react';
import Select, { components } from "react-select";
import {faQuestion} from "@fortawesome/free-solid-svg-icons/faQuestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";




/*const options=[];
for (let i=1991;i<2022;i++){
    options.push({ value: i, label: i })
}*/

const styles = {
    control: (css) => ({
      ...css,
      width: "90%",
       // whitespace:"nowrap"
     // marginLeft:"21%"
     // opacity: 10 ? 1 : 0
    }),
    menu: ({ width, ...css }) => ({
      ...css,
      width: "90%",
      // whitespace:"nowrap"
     // minWidth: "100%"
    }),
    // Add padding to account for width of Indicators Container plus padding
 /*   option: (css) => ({
        ...css, width: "max-content" }*/
  };

const SingleValue = props =>
    {

  return <components.SingleValue {...props}>
    {props.data.value}
  </components.SingleValue>}
;


export default function CustomSelector(props) {
  const [selectedOption, setSelectedOption] = useState(null);
    const selectInputRef = useRef();
    const setProperty=(event)=>{
      setSelectedOption(event.value)
      props.sendoptions(event.value)
      props.setchange(false)
  }



    useEffect(() => {
        //console.log("cs")
      //  console.log(props.options.length)
      //  console.log(selectedOption)
    if (props.options.length===0 && selectedOption!==null){
         setSelectedOption(null)
         props.sendoptions(null)
    }

    })

        // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div style={{display: "inline-block",width:props.width!==undefined?props.width:"200px",marginBottom:props.bottom!==undefined?props.bottom:"0%"}}>
      <Select
            menuPlacement={props.pos}
           ref={selectInputRef}
          styles={styles}
          placeholder={"Επιλέξτε από τη λίστα"}
          isSearchable={false}

      //  styles={styles}

        value={props.options.filter(function(option) {
          return option.value === selectedOption;
        })}
        onChange={setProperty}
        options={props.options}
          components={{ SingleValue }}
      />
        {/*<div className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>*/}
    </div>
  );
}
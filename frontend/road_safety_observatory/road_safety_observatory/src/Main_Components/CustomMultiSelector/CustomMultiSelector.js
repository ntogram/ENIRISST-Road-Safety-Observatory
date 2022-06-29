import React, {useEffect, useRef, useState} from 'react';
import Select, { components } from "react-select";
import PropTypes from "prop-types";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const Option = props => {

 // console.log(props)
  return (

    <div style={{backgroundColor:"white",color:"black"}}>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
          {<label>{props.label}</label>}
          <FontAwesomeIcon style={{float:"right"}} title={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"} icon={faQuestionCircle}  size={"lg"}/>
      </components.Option>
    </div>
  );
};

const MultiValue = props => (
  <components.MultiValue {...props}>
    <span>{props.data.value}</span>
  </components.MultiValue>
);








const MultiSelector = props => {

  if (props.allowSelectAll) {



    return (
      <Select
        {...props}
        options={props.options}
        onChange={selected => {
            console.log(selected)
          return props.onChange(selected);

        }}
      />
    );
  }

  return <Select {...props} />;
};


const styles = {
    control: (css) => ({
      ...css,
      width: "95%",
       // whitespace:"nowrap"
     // marginLeft:"21%"
     // opacity: 10 ? 1 : 0
    }),
    menu: ({ width, ...css }) => ({
      ...css,
      width: "95%",
      // whitespace:"nowrap"
     // minWidth: "100%"
    }),
    // Add padding to account for width of Indicators Container plus padding
 /*   option: (css) => ({
        ...css, width: "max-content" }*/
  };


const CustomMultiSelector = props => {
    const [selectedOption, setSelectedOption] = useState(null);

    const setProperty=(selected)=>{
        console.log(selected)
       setSelectedOption(selected)
        props.sendoptions(selected)
        props.setchange(false)

  }
 useEffect(() => {
        //console.log("cs")
      //  console.log(props.options.length)
      //  console.log(selectedOption)
    if (props.options.length===0 && selectedOption!==null){
         setSelectedOption(null)
         props.sendoptions([])
    }
    if (props.clear===false){
        setSelectedOption(null)
    }


    })


    return (
         <div style={{display: "inline-block",width:"90%"}}>
      <MultiSelector
         styles={styles}
        options={props.options}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{ Option, MultiValue }}
        onChange={setProperty}
      //  allowSelectAll={props.selectall}
        value={props.options.length===0?null:selectedOption}
        placeholder={"Επιλέξτε από τη λίστα"}
         isSearchable={false}
        controlShouldRenderValue={true}


      />
         </div>
    );



}
export default CustomMultiSelector;

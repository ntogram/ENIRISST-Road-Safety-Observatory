import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import  "./YearSelector.css"
/*const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];*/
const options=[];
for (let i=1991;i<2022;i++){
    options.push({ value: i, label: i })
}

const styles = {
    control: (css) => ({
      ...css,
      //width: "30%",
       // whitespace:"nowrap"
     // marginLeft:"21%"
     // opacity: 10 ? 1 : 0
    }),
    menu: ({ width, ...css }) => ({
      ...css,
      width: "100%",
      // whitespace:"nowrap"
     // minWidth: "100%"
    }),
    // Add padding to account for width of Indicators Container plus padding
 /*   option: (css) => ({
        ...css, width: "max-content" }*/
  };


export default function YearSelector(props) {
  const [selectedOption, setSelectedOption] = useState(props.v);

  const setYear=(event)=>{
      setSelectedOption(event.value)
      console.log(event.value)
      props.setVal(event.value)
      // for dependent year selectors
      if (props.vr!==undefined){
       //   console.log("alex");
          evaluate_options(event.value)
      }
  }

  const evaluate_options=(value)=> {
      // first option
      console.log(props.indent)
      if (props.indent === undefined) {
          if (props.vr < value) {
              props.setvr(value);
          } }
      else {

              if (props.vr > value) {
                  props.setvr(value);
              }
          }
      }

    useEffect(() => {
        if (props.vr!==undefined) {
            if (props.indent === undefined) {
                if (props.vr < selectedOption) {

                    update_value(props.vr,0)
                   setSelectedOption(props.vr)
                }
            } else {

                if (props.vr > selectedOption) {
                    console.log("second")
                    update_value(props.vr,1)
                    setSelectedOption(props.vr)
                }
            }

        }

    })
    const update_value=(val,index)=>{
      console.log("click")
      var  elem=document.getElementsByClassName("css-qc6sy-singleValue")

      elem[index].textContent=val

    }
        // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div style={{display: "inline-block",width:"15%",marginLeft:(props.indent==null)?"21%": props.indent,marginTop:"2%"}}>
      <Select
          placeholder={"Επιλέξτε χρονολογία"}
          isSearchable={false}

      //  styles={styles}
        defaultValue={selectedOption}
        onChange={setYear}
        options={props.options}
      />
        {/*<div className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>*/}
    </div>
  );
}
import React, {Component, useEffect, useRef, useState} from "react";
import Select, {components, createFilter} from "react-select";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons/faCaretDown";
import {AsyncPaginate, reduceGroupedOptions} from "react-select-async-paginate"
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import {func} from "prop-types";
import {faCaretUp} from "@fortawesome/free-solid-svg-icons/faCaretUp";
const styles = {
    control: (css) => ({
      ...css,
      width: "90%",
       // whitespace:"nowrap"
     // marginLeft:"21%"
     // opacity: 10 ? 1 : 0
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 }),
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


const options = [
  {
    label: "Οικισμοί",
    options: [
      { label: "Aalue", value: "value1" ,group:"Οικισμοί"},
      { label: "Group 1, option 2", value: "value2",group: "Οικισμοί" }
    ]
  },{
      label: "Δήμοι",
      options: [
          { label: "A root option", value: "value3",group: "Δήμοι", },
          { label: "Another root option", value: "value4",group: "Δήμοι", }]
  },
    {
      label: "Περιφερειακές Ενότητες (NUTS3)",
      options: [
          { label: "A root option 3", value: "value6",group: "Περιφερειακές Ενότητες (NUTS3)", },
          { label: "Another root option 4", value: "value7",group: "Περιφερειακές Ενότητες (NUTS3)", },
           { label: "A root option 2", value: "value5",group: "Περιφερειακές Ενότητες (NUTS3)", },
      ]
  },
    {
      label: "Επικράτεια",
      options: [
          { label: "Επικράτεια", value: "Επικράτεια",group: "Επικράτεια", },

        ]
  },

];


const Option = props => {
    // const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    // const newProps = { ...props, innerProps: rest };
//  console.log(props.label)
    const define_option=()=>{
        let body=null
        if ((props.label==="Επόμενα"||props.label==="Οικισμοί"|| props.label==="Δήμοι"||  props.label==="Περιφερειακές Ενότητες (NUTS3)" || props.label==="Επικράτεια")){
            body = <components.Option {...props}>
                <FontAwesomeIcon  icon={faCaretDown} size={"lg"}/>
                {" "}
                {<label>{props.label}</label>}
            </components.Option>
        }
        else if (props.label==="Προηγούμενα"){
            body = <components.Option {...props}>
                <FontAwesomeIcon  icon={faCaretUp} size={"lg"}/>
                {" "}
                {<label>{props.label}</label>}
            </components.Option>
        }
        else{
            body = <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />{" "}
                {<label>{props.label}</label>}
            </components.Option>
        }
        return body
    }



  return (
      <div style={{backgroundColor:"white",color:"black"}}>
          {define_option()}
     {/* /!*<components.Option {...newProps}*!/*/}
     {/*  <components.Option {...props}*/}
     {/*//  className="custom-option"*/}
     {/* >{(props.label==="Οικισμοί"|| props.label==="Δήμοι"||  props.label==="Περιφερειακές Ενότητες (NUTS3)" || props.label==="Επικράτεια")?*/}
     {/*   <FontAwesomeIcon   icon={faCaretDown}  size={"lg"}/>*/}
     {/*     :*/}
     {/*   <input*/}
     {/*     type="checkbox"*/}
     {/*     checked={props.isSelected}*/}
     {/*     onChange={() => null}*/}
     {/*   />}{" "}*/}
     {/*     {<label>{props.label}</label>}*/}
     {/* </components.Option>*/}
    </div>
  );
};

const MultiValue = props => (
  <components.MultiValue {...props}>
    <span>{props.data.value}</span>
  </components.MultiValue>
);




const MultiSelect = props => {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;
 // const prev_term=useRef();
  const selectref=useRef();
  const [startpoint,setStartPoint]=React.useState(0)
  const selectAllOption = {
    value: "Επιλογή όλων",
    label: "Επιλογή όλων",
  };

  const More={
      value:"Επόμενα",
      label:"Επόμενα"
  }
  const Prev={
      value:"Προηγούμενα",
      label:"Προηγούμενα"
  }
const [search_term,setSearchTerm]=React.useState("")
   const sleep = ms =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms);
        });

    const optionsPerPage = 1000;
    const defaultAdditional = {
        page: 1
    };

    const apiLoadOptions = async (search, page) => {
        await sleep(1000);
        let filteredOptions;
        let res = await axios.get(`http://localhost:8080/data/retrieve_all_locations`)
        let res_options = res.data.response
      //  console.log(res_options)
        let options = []
        // if (selected.length===0){
        //     for (let i=0;i<menuoptions.length;i++){
        //         for (let j=0;j<menuoptions[i]["options"];j++){
        //             options.push(menuoptions[i]["options"][j])
        //         }
        //     }
        // }
        // else{
        //     options=menuoptions
        // }
        //
        console.log(res_options)
        for (let i = 0; i < res_options.length; i++) {
            if(res_options[i]["label"]===props.group) {
                for (let j = 0; j < res_options[i]["options"].length; j++) {
                    options.push(res_options[i]["options"][j])
                }
            }
        }
     //   console.log(options)
        if (!search) {
            filteredOptions = options;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.filter(({label}) =>
                label.toLowerCase().includes(searchLower)
            );
        }

        const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page;
        const slicedOptions = filteredOptions.slice(
            (page - 1) * optionsPerPage,
            page * optionsPerPage
        );
        // console.log(slicedOptions)
        const mapTypeToIndex = new Map();

        const result = [];
        console.log(slicedOptions)
        slicedOptions.forEach(option => {
            const {group} = option;

            if (mapTypeToIndex.has(group)) {
                const index = mapTypeToIndex.get(group);

                result[index].options.push(option);
            } else {
                const index = result.length;

                mapTypeToIndex.set(group, index);

                result.push({
                    label: group,
                    options: [option]
                });
            }
        });

        return {
            options: result,
            hasMore
        };
    };

    const loadOptions = async (q, prevOptions, {page}) => {
       // console.log("Alex")
        if (props.group===""){
            return []
        }


        const {options, hasMore} = await apiLoadOptions(q, page);
        console.log("LoadOptions")
        return {
            options,
            hasMore,

            additional: {
                page: page + 1
            }
        };
    };

    const getOptionsPartial=(array,start,q)=>{
        //console.log("GetPartially")
        let offset=start+optionsPerPage
        let more=true

        let filteredOptions=[]
        if (q==="") {
            filteredOptions = array;
        } else {
            const search= q.toLowerCase();

            filteredOptions = array.filter(({label}) =>
                label.toLowerCase().includes(search)
            );
        }
        if (offset>filteredOptions.length){
            offset=filteredOptions.length
            more=false
        }
       // console.log(array)
     //   console.log(filteredOptions)
       // console.log(start)
        //console.log(offset)

       const slicedOptions = filteredOptions.slice(start,offset)
      // console.log(slicedOptions)

        return {options:slicedOptions,more:more}
    }


     const getIndexGroup=(label)=>{
        let index=-1
       //  console.log("Get index")
      //  console.log(label)
        for (let i=0;i<props.options.length;i++){

            //console.log(props.options[i].options[0].group)
            if (props.options[i]["options"][0].group===label){
                index=i
                break
            }
        }
        return index
    }


      const isSelectAllSelected = () =>{
          let selected_length=valueRef.current.length
          if (selected_length===0){
              return false
          }
          let selected_group=valueRef.current[0].group
         // console.log("selected group")
        //  console.log(valueRef.current)
          let index=getIndexGroup(selected_group)
          if (index===-1){
              return false
          }
          let group_length=props.options[index]["options"].length
          return selected_length===group_length
      }



/*  const isSelectAllSelected = () =>{
        console.log(props.options)
      return valueRef.current.length === props.options.length;
  }*/

const closeMenu=()=>{
   // console.log(getValue())
    let val=getValue();
    if(val.length===0 && props.group!==""){
         props.setgroup("")
        props.setmulti(false)
         setStartPoint(0)
    }

}


  const isOptionSelected = option =>{

         let selected_values=[]
         for(let i=0;i<valueRef.current.length;i++){
             selected_values.push(valueRef.current[i].value)
         }
        // let selected_values=valueRef.current
       // console.log(option.value)
          let v=selected_values.some(({ value }) => value === option.value) ||
    isSelectAllSelected();
       //   console.log(v)
          return v
  }

  const getOptionGroup=(label)=>{
        let selectedoptiongroup=[]
        console.log(props.group)
        let group=(label===undefined)?props.group.label:label
        for (let i=0;i<props.options.length;i++){
            if (props.options[i]["options"][0].group===group){
                selectedoptiongroup=props.options[i]["options"]
                break
            }
        }
        return selectedoptiongroup
    }






  const getOptions = (q="") => {


       // console.log(search_term)

         let value=getValue()
         let selections=[]
         if (value.length===0){

             if (props.group===""){
                 selections=props.default_options
             }
             else{
                 //   console.log("Ex:"+props.group.value)
                  let idx=getIndexGroup(props.group.value)
             if (idx===-1){
              //   console.log(value)
                 return selections
             }
             //console.log()
              let slicedOptions=getOptionsPartial(props.options[idx]["options"],startpoint,q)
             //console.log(slicedOptions)
              if (slicedOptions["more"]===true){
                   if (startpoint>0){
                        selections=[{label:props.group.value,options:[ selectAllOption,Prev, ...slicedOptions["options"],More]}]
                   }
                   else{
                       selections=[{label:props.group.value,options:[ selectAllOption, ...slicedOptions["options"],More]}]
                   }

              }
              else{
                   if (startpoint>0){
                       selections=[{label:props.group.value,options:[ selectAllOption,Prev, ...slicedOptions["options"]]}]
                   }
                   else{
                       selections=[{label:props.group.value,options:[ selectAllOption, ...slicedOptions["options"]]}]
                   }

              }

             // console.log(selections)
             }
            // selections=props.options
            // selections=props.default_options
         }
         else{
            selections=[]

           //  console.log("getvalue:")
           //  console.log(props.)
            let idx=getIndexGroup(value[value.length-1].group)
             if (idx===-1){
              //   console.log(value)
                 return selections
             }
           //  console.log(idx)
              let slicedOptions=getOptionsPartial(props.options[idx]["options"],startpoint,q)
           // console.log(props.options[idx]["options"])
             if (slicedOptions["more"]===true){
                   selections=[{label:props.group.value,options:[ selectAllOption, ...slicedOptions["options"],More]}]
              }
              else{
                   selections=[{label:props.group.value,options:[ selectAllOption, ...slicedOptions["options"]]}]
              }
           //  console.log(selections)
       //      selections.unshift(selectAllOption)
         }
        //  let selections=[selectAllOption, ...props.options]
        //  let value=getValue()
        //
        //  if (value.length!=0){
        //      let idx=getIndexGroup(value[0].group)
        //      console.log(idx)
        //      selections[0].isDisabled=false
        //      let isDisabled=false
        //       for (let i=1;i<selections.length;i++){
        //           if ((i-1)===idx){
        //               isDisabled=false
        //           }
        //           else{
        //               isDisabled=true
        //           }
        //           console.log(isDisabled)
        //           for(let j=0;j<selections[i]["options"].length;j++){
        //               selections[i]["options"][j]["isDisabled"]=isDisabled
        //           }
        //      }
        //  }
        //  else{
        //      selections[0].isDisabled=true
        //      for (let i=1;i<selections.length;i++){
        //            for(let j=0;j<selections[i]["options"].length;j++){
        //               selections[i]["options"][j]["isDisabled"]=false
        //           }
        //      }
        //  }
        // // console.log(value)
        // console.log(selections)

       //  console.log(selections)
         return selections;
  }

  const filteroptions=(event)=>{
      if (props.group!==""){
         // console.log("focus")
          if (search_term!==event){
              setStartPoint(0)
          }
          //console.log(event)
          //prev_term.current=search_term;
          setSearchTerm(event)

         // getOptions(event);
      }


  }


  const getValue = () =>{
      //return props.value
      let allanswers=selectAllOption
      if( props.value.length===0){
           allanswers["group"]=undefined
      }
      else{
           allanswers["group"]=props.value[0].group
      }

    // console.log("getvalue:")
    //  console.log(props.value)
      return isSelectAllSelected() ? [allanswers] : props.value;
  }
    //isSelectAllSelected() ? [selectAllOption] : props.value;

  const onChange = (newValue, actionMeta) => {
      const {action, option, removedValue} = actionMeta;
    //  console.log(actionMeta)
    //  console.log("onChange")
    //  console.log(selectref)
    //  console.log(newValue)

     // console.log(action)
     // console.log(option)
      if(action==="clear" || newValue.length===0){
          props.setgroup("")
          props.setmulti(false)
          setStartPoint(0)

          //  props.onChange(undefined,actionMeta)
      }
        if (option===undefined){
             props.onChange(newValue || [], actionMeta);
            setStartPoint(0)
        }


      if (option !== undefined) {
          if (action === "select-option" && option.value === selectAllOption.value) {
            //  console.log("sd")
            //  console.log(option.group)
              props.onChange(getOptionGroup(option.group), actionMeta);

              //props.onChange(props.options, actionMeta);
          }  else if (action === "select-option" && option.value === More.value){
              //  console.log("More")
             // console.log(search_term)
                setSearchTerm(search_term)
               let st=startpoint+optionsPerPage;
                setStartPoint(st);
          }
          else if (action === "select-option" && option.value === Prev.value){
                setSearchTerm(search_term)
               let st=startpoint-optionsPerPage;
                setStartPoint(st);
          }
          else if (
              (action === "deselect-option" &&
                  option.value === selectAllOption.value) ||
              (action === "remove-value" &&
                  removedValue.value === selectAllOption.value)
          ) {
              //console.log("sd")
              props.onChange([], actionMeta);
          } else if (
              actionMeta.action === "deselect-option"
              && isSelectAllSelected()
          ) {
              //console.log("as")
              let group = option.group
              let groupindex = getIndexGroup(group)
              let optiongroup = props.options[groupindex]["options"]
              let restoptions = []
              for (let i = 0; i < optiongroup.length; i++) {
                  if (optiongroup[i].value !== option.value) {
                      restoptions.push(optiongroup[i])
                  }
              }
              props.onChange(restoptions, actionMeta)
              // props.onChange(
              //   props.options.filter(({ value }) => value !== option.value),
              //   actionMeta
              // );
          } else {
             // console.log("s")
              props.onChange(newValue || [], actionMeta);
          }
      }
      ;
  }

    const setInputValue=()=>{
    //console.log(search_term)

    return search_term
    }



  return (
    <Select
        ref={selectref}
       styles={styles}
       menuPortalTarget={document.body}
       filterOption={createFilter({ ignoreAccents: false })}
      isOptionSelected={isOptionSelected}
      options={getOptions(search_term)}
      inputValue={setInputValue()}
      value={getValue()}
      onChange={onChange}
       onMenuClose={closeMenu}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
       isSearchable={true}
      filterOption={() => true}
       onInputChange={filteroptions}
      components={{ Option, MultiValue }}
      placeholder={"Επιλέξτε από τη λίστα"}
      isMulti={props.multi}
    />
   );
};







// const test=props=>{
//     return( <span>Alex</span>)
//  // return <AsyncPaginate
//  //        isMulti
//  //        additional={props.defaultAdditional}
//  //        value={props.selected}
//  //        loadOptions={props.loadOptions}
//  //        onChange={props.setSelected}
//  //        reduceOptions={reduceGroupedOptions}
//  //      />
// }



export default function CustomGroupSelector(props) {
     const [selected, setSelected] = useState([]);
     const [menuoptions,setMenuOptions]=React.useState([])
     const [once,setonce]=React.useState(false)
    const [group,setgroup]=React.useState("")
    const [multiple,setmultiple]=React.useState(false)
    const default_options=[
        {value: "Οικισμοί",group:"Οικισμοί",label:"Οικισμοί"},
       {value: "Δήμοι",group:"Δήμοι",label:"Δήμοι"},
       {value: "Περιφερειακές Ενότητες (NUTS3)",group:"Περιφερειακές Ενότητες (NUTS3)",label:"Περιφερειακές Ενότητες (NUTS3)"},
        {value: "Επικράτεια",group:"Επικράτεια",label:"Επικράτεια"},


    ]
    const get_default_values=()=>{
         let default_values=[]
         for (let i=0;i<default_options.length;i++){
             default_values.push(default_options[i].value)
         }
         return default_values
    }
    const changeValue=event=>{
       //  console.log("set1")
       //  console.log(event)
         let default_values=get_default_values();
        // console.log("Change value")
        // console.log(default_values)
       // console.log(event)
         if (default_values.includes(event.value)){
              setgroup(event)
             setmultiple(true)
         }
         else{
           // console.log("setE2")
           //  console.log(event)
             setSelected(event)
             props.sendoptions(event)
             props.setchange(false)
         }

    }



    useEffect(() => {

        if (once === false) {

               axios.get(`http://localhost:8080/data/retrieve_all_locations`)
                 .then(res => {

                     //console.log(res.data.response)
                      setonce(true)
                     setMenuOptions(res.data.response)
                  // const persons = res.data;
                   //this.setState({ persons });
                 })
            // console.log("set")
        }

//console.log(once)
//console.log(menuoptions)

    })



  //    const options = [
  //   { value: "1", label: "Jimmy" },
  //   { value: "2", label: "Laura" },
  //   { value: "3", label: "Tommy" },
  //   { value: "4", label: "Jane" },
  //   { value: "5", label: "Mike" }
  // ];


 return (<MultiSelect
        options={menuoptions} group={group} multi={multiple} setmulti={setmultiple} setgroup={setgroup} default_options={default_options} value={selected}   onChange={changeValue} />)
  // return <Select  styles={styles} isMulti placeholder={"Επιλέξτε από τη λίστα"} options={options} />;
}
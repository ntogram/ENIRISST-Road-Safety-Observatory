import React, {useState} from 'react';
import  "./GreekStatistics.css"
import Intro from "./components/Intro/Intro";
import ChartTitle from "./components/ChartTitle/ChartTitle";
import ChartTitleGroup from "./components/ChartTitleGroup/ChartTitleGroup";
import YearSelector from "../Main_Components/YearSelector/YearSelector";
import DatePickerSelector from "../Main_Components/DatePickerSelector/DatePickerSelector"
import MainView from "./components/DataViews/MainView/MainView";
import MapDisplayer from "./components/MapDisplayer/MapDisplayer";
function GreekStatistics(){
    const [year1, setYear1] = useState(2020)
    const [year2, setYear2] = useState(2010)
    const [year3, setYear3] = useState(2020)
    const [year4, setYear4] = useState(2010)
    const [year5, setYear5] = useState(2021)
    const [year6, setYear6] = useState(1991)
    const [year7, setYear7] = useState(2020)
    const [year8, setYear8] = useState(2020)
    const [year9, setYear9] = useState(2020)
    const [year10, setYear10] = useState(2020)
    const [year11, setYear11] = useState(2020)

    const setYearsRange=(x1,x2)=>{
        let options=[]
        for(let i=x1;i<x2;i++){
             options.push({ value: i, label: i })
        }
        return options
    }



  return <div className={"gs-bg"}>
      <div className={"text_header"}> Η Ελλάδα σε αριθμούς</div>

      <Intro format={"bg1"} title={" Η θέση της Ελλάδας στην Ευρώπη"} value1={"11%"} value2={"2%"}
             content={<span>Το 2010 η Ελλάδα ήταν η 2η χώρα στην ΕΕ σε θανατηφόρα τροχαία ατυχήματα. Μέχρι το 2019 οι θανούντες μειώθηκαν κατά 45%, με αποτέλεσμα  να κατατάσσεται μαζί με την Πορτογαλία στην 7η θέση με τους περισσότερους θανάτους.</span>}/>
       <ChartTitle  title={"Αριθμός νεκρών από τροχαία ατυχήματα."} subtitle={"Μετρήσεις έτους ("+year1+")"}/>
                   {/* // subtitle={"Μετρήσεις έτους ("+{year1.value}+")"}/>*/}
      <YearSelector v={year1} setVal={setYear1} options={setYearsRange(2010,2021)} />
      <div className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
        <MainView y={year1} name="databycountrydeaths" ml={"20.8%"} mln={"90%"} type={2}/>
       <ChartTitle  title={"Ποσοστιαία μείωση νεκρών."} subtitle={"Διάστημα ετών ("+year2+"-"+year3+"("+year2+"=100%))"}/>
        <DatePickerSelector setVal1={setYear2} setVal2={setYear3} minDate={new Date(2010, 0, 1, 0,0)} maxDate={new Date(2020, 11, 31, 23,59)} />
     <MainView y1={year2} y2={year3}  name="percentage_death_reduction" ml={"20.8%"} mln={"90%"} type={3}/>
      {/*<YearSelector  v={year2}  setVal={setYear2}   vr={year3} setvr={setYear3}/>*/}
      {/*<YearSelector v={year3} setVal={setYear3} vr={year2} setvr={setYear2} indent={"17.5%"}/>*/}
        <ChartTitleGroup title1={"Αριθμός νεκρών από τροχαία ατυχήματα ανά 1 εκατ. Κάτοικους"} subtitle1={"Μετρήσεις έτους ("+year4+")"}
        title2={"Αριθμός νεκρών από τροχαία ατυχήματα ανά 1 εκατ. Κάτοικους"} subtitle2={"Μετρήσεις έτους ("+year5+")"} v1={"4%"} v2={"3.7%"}
        />
          <YearSelector options={setYearsRange(2010,2022)} v={year4} setVal={setYear4} />
          <YearSelector options={setYearsRange(2010,2022)} v={year5} setVal={setYear5} indent={"17.5%"}/>
        <div>
            <div style={{display:"inline-block"}} className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
      <div style={{display:"inline-block",marginLeft:"0%",paddingLeft:"11%"}} className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
        </div>






        <MainView  y={year4} name="acc_death_per_million1" ml={"20.8%"} mln={"80%"} type={5}/>
       <MainView y={year5} name="acc_death_per_million2" ml={"3.5%"} mln={"80%"} type={5}/>
          {/*<div> <ChartTitle  title={"Αριθμός νεκρών από τροχαία ατυχήματα ανά 1 εκατ. Κάτοικους"} subtitle={"Μετρήσεις έτους (2010)"}/></div>
           <div> <ChartTitle  title={"Αριθμός νεκρών από τροχαία ατυχήματα ανά 1 εκατ. Κάτοικους"} subtitle={"Μετρήσεις έτους (2019)"}/></div>*/}




{/*
//       <ChartTitle title={
//           <div>
//               <span>Αριθμός νεκρών από τροχαία ατυχήματα ανά 1 εκατ. Κάτοικους</span><span style={{marginLeft:"3%"}}>Αριθμός νεκρών από τροχαία ατυχήματα ανά 1 εκατ. Κάτοικους</span>
//           </div>
//       } subtitle={
// <div>
//               <span>Μετρήσεις έτους (2010)</span><span style={{marginLeft:"3%"}}>Μετρήσεις έτους (2019)</span>
//           </div>
//       }/>
*/}



      <Intro format={"bg2"} title={"Η Ελλάδα σε Αριθμούς"} value1={"11%"} value2={"2%"}
             content={"Αριθμός τροχαίων ατυχημάτων και παθόντων προσώπων στην Ελλάδα το διάστημα "+ year6+"-"+year7}/>
      <ChartTitle  title={
          <div>
              <span>Ατυχήματα και βαριά τραυματίες</span><span style={{marginLeft:"45%"}}>Νεκροί και βαριά τραυματίες</span>
          </div>

      } subtitle={<div></div>}/>
         <DatePickerSelector setVal1={setYear6} setVal2={setYear7} minDate={new Date(1991, 0, 1, 0,0)} maxDate={new Date(2020, 11, 31, 23,59)}/>
       <MainView y1={year6} y2={year7}  name="accident_death_injury" ml={"20.8%"} mln={"90%"} type={4}/>

        {/*<YearSelector v={year6} setVal={setYear6}  vr={year7} setvr={setYear7} />*/}
        {/*<YearSelector v={year7} setVal={setYear7}  vr={year6} setvr={setYear6} indent={"35.5%"}/>*/}
      <Intro format={"bg3"} title={""} value1={"11%"} value2={"2%"}
             content={"Κατανομή των θανατηφόρων τροχαίων ατυχημάτων στην Ελλάδα ανά:"}/>
       <ChartTitleGroup title1={"Περιφερειακή Ενότητα"} subtitle1={"Μετρήσεις τρέχοντος έτους ("+year8+")"}
        title2={"Ηλικιακή Ομάδα"} subtitle2={"Μετρήσεις τρέχοντος έτους ("+year9+")"} v1={"22.2%"} v2={"0.2%"}
        />
        <YearSelector options={setYearsRange(2007,2021)} v={year8} setVal={setYear8} />
        <YearSelector options={setYearsRange(2007,2021)} v={year9} setVal={setYear9} indent={"17.5%"}/>
        <div>
            <div style={{display:"inline-block"}} className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
      <div style={{display:"inline-block",marginLeft:"0%",paddingLeft:"11%"}} className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
        </div>
        <div>
            {/*<table>*/}
            {/*    <tr>*/}
            {/*        <td style={{width:"50%"}}>*/}
            {/*            <MainView name="databyregion" ml={"20.8%"} mln={"80%"} type={7}/>*/}
            {/*        </td>*/}
            {/*         <td style={{width:"50%"}}>*/}
            {/*            <MainView name="databyage" ml={"3.5%"} mln={"80%"} type={1}/>*/}
            {/*        </td>*/}
            {/*    </tr>*/}
            {/*</table>*/}
             <MainView name="databyregion" ml={"20.8%"} mln={"80%"} type={7}/>
          <MainView year={year9} name="databyage" ml={"3.5%"} mln={"80%"} type={1}/>
        </div>


      <ChartTitleGroup title1={"Ποσοστό νεκρών ανάλογα με το φύλλο απο τροχαία ατυχήματα"} subtitle1={"Μετρήσεις έτους ("+year10+")"}
        title2={"Ημέρα την εβδομάδας και ώρα"} subtitle2={"Μετρήσεις τρέχοντος έτους "+year11+")"} v1={"4.5%"} v2={"3.8%"}
        />
        <YearSelector options={setYearsRange(2007,2021)}  v={year10} setVal={setYear10}/>
        <YearSelector options={setYearsRange(2007,2021)}  v={year11} setVal={setYear11} indent={"17.5%"}/>
      <div>
            <div style={{display:"inline-block"}} className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
      <div style={{display:"inline-block",marginLeft:"0%",paddingLeft:"11%"}} className={"year_selector_help"}>Διαλέξτε την ημερομηνία για να δείτε τα σχετικά αποτελέσματα. </div>
        </div>


<div>
     <MainView year={year10}  name="databysex" ml={"21%"} mln={"80%"} type={1}/>
     <MainView year={year11} name="databydaytype" ml={"3.5%"} mln={"80%"} type={0}/><br/>sjsjsks
</div>

  </div>;
}

export default GreekStatistics;
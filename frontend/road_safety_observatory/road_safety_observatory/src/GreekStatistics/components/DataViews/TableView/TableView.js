
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import "./TableView.css"
import g8 from "../ChartView/chart_data/graph8.json"
import g9 from "../ChartView/chart_data/graph9.json"
export default function TableView(props) {

    const getTableItem=(g,name)=>{
        let r=g.find(item=>item["Έτος"]===props.year)
        return Math.round(parseFloat(r[name])*100)
    }


        // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (
    <div id={props.name}>
    <table  className={"format"} >
        <thead>
        <tr className={"b1"}>
           <th className={"header-format"}>
          Εργάσιμες μέρες
        </th>
          <th className={"header-format"}>
        Σαββατοκύριακα
        </th>
        </tr>

        </thead>
      <tbody>
      <tr className={"b2"}>
      <td className={"table-cell-center"}>
          {getTableItem(g8,"Καθημερινές")}
      </td> <td className={"table-cell-center"}>
        {getTableItem(g8,"Σαββατοκύριακο")}
      </td>
      </tr>
      </tbody>
    </table>
         <table style={{marginTop:"5%"}} id={props.name} className={"format"} >
        <thead>
        {/*<tr className={"b4"}>*/}
        {/*    <th className={"empty-header"} colSpan={3}></th>*/}
        {/*</tr>*/}
        <tr className={"b1"}>
           <th className={"header-format"}>
          <FontAwesomeIcon icon={faSun} style={{color:"#044293"}} size={"lg"}/>
        </th>
          <th className={"header-format"}>
        <FontAwesomeIcon icon={faMoon} style={{color:"#044293"}} size={"lg"}/>
        </th>
        </tr>

        </thead>
      <tbody>
      <tr className={"b2"}>
      {/*  <td className={"table-cell-center"}>*/}
      {/*  <FontAwesomeIcon icon={faSun} style={{color:"#044293"}} size={"lg"}/>*/}
      {/*</td>*/}
      <td className={"table-cell-center"}>
          {getTableItem(g9,"Ημέρα")}
      </td> <td className={"table-cell-center"}>
         {getTableItem(g9,"Νύχτα")}
      </td>
      </tr>
      {/*<tr className={"b3"}>*/}
      {/*  <td className={"table-cell-center"}>*/}
      {/*  <FontAwesomeIcon icon={faMoon} style={{color:"#044293"}} size={"lg"}/>*/}
      {/*</td>*/}
      {/*<td className={"table-cell-center"}>*/}
      {/*  12%*/}
      {/*</td> <td className={"table-cell-center"}>*/}
      {/*  13%*/}
      {/*</td>*/}
      {/*</tr>*/}
      </tbody>
    </table>

        </div>

  );
}
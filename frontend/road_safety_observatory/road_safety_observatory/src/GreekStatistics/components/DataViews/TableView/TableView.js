
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun} from "@fortawesome/free-solid-svg-icons";
import {faMoon} from "@fortawesome/free-solid-svg-icons";
import "./TableView.css"
export default function TableView(props) {

        // Update the document title using the browser API    document.title = `You clicked ${count} times`;  });
  return (

    <table id={props.name} className={"format"} >
        <thead>
        {/*<tr className={"b4"}>*/}
        {/*    <th className={"empty-header"} colSpan={3}></th>*/}
        {/*</tr>*/}
        <tr className={"b1"}>
          <th className={"header-format"}>
          </th>
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
        <FontAwesomeIcon icon={faSun} style={{color:"#044293"}} size={"lg"}/>
      </td>
      <td className={"table-cell-center"}>
        50%
      </td> <td className={"table-cell-center"}>
        25%
      </td>
      </tr>
      <tr className={"b3"}>
        <td className={"table-cell-center"}>
        <FontAwesomeIcon icon={faMoon} style={{color:"#044293"}} size={"lg"}/>
      </td>
      <td className={"table-cell-center"}>
        12%
      </td> <td className={"table-cell-center"}>
        13%
      </td>
      </tr>
      </tbody>
    </table>

  );
}
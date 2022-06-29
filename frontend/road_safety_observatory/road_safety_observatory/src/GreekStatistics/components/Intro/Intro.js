import React from 'react';
import  "./Intro.css"
import hr from "./blue-line.png";

function Intro(props) {
  return <div className={props.format}>
      {
          props.title !== "" ?
              <div>
                  <div className={"intro-header"}
                                    style={{paddingLeft: props.value1, paddingTop: props.value2}}> {props.title}</div>
                                <div style={{paddingLeft:props.value1,marginTop:"1%",marginBottom:"2%"}}><img src={hr}/></div>
              </div>

              :null
      }
      {/*<div style={{paddingLeft:props.value1,marginTop:"1%",marginBottom:"2%"}}><img src={hr}/></div> : null

      }
      {/*{(props.title==="")? <div className={"intro-header"}  style={{paddingLeft:props.value1,paddingTop:props.value2}}> {props.title}</div>*/}
      {/*<div style={{paddingLeft:props.value1,marginTop:"1%",marginBottom:"2%"}}><img src={hr}/></div>}:null}}*/}
       <div className={"intro-content"} style={{paddingLeft:props.value1}}>{props.content}</div>
  </div>;
}

export default Intro;

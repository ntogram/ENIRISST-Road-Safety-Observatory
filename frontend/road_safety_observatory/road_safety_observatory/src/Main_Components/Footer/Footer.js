import React from 'react';
import "./Footer.css"
import icon from "./footer_icon.png"
function Footer() {
    return <div className={"footer text-color"}>

        <div style={{float:"left"}} className={"footer-icon"}>
            <img  src={icon} alt={"icon"}/>

        </div>
         <div className={"info"} style={{float:"right"}}>
             <table>
                 <tr className={"info-header info-tr"}>
                     <td>ΧΡΗΣΙΜΑ LINKS</td>
                     <td>ΕΠΙΚΟΙΝΩΝΙΑ</td>
                 </tr>
                 <tr className={"info-text info-tr"}>
                     <td>Lorem Ipsum</td>
                     <td>aaaa@gmail.com</td>
                 </tr>
                 <tr className={"info-text info-tr"}>
                     <td>Lorem Ipsum</td>
                     <td></td>
                 </tr>
             </table>
             {/*<div className={"info-header"}><span className={"info-h1"}>ΧΡΗΣΙΜΑ LINKS<span className={"info-margin-left"}>ΕΠΙΚΟΙΝΩΝΙΑ</span></span></div>*/}
             {/* <div className={"info-text"}><span>Lorem Ipsum</span><span className={"info-margin-left"}>aaaa@gmail.com</span></div>*/}
             {/*<div className={"info-text"}><span>Lorem Ipsum</span></div>*/}
        </div>
        <div className={"end"}><hr/></div>
         <div className={"copyright"}>Copyright © 2022 All rights reserved | This template is made with by  <a href="#">NAME</a> </div>

        </div>





}

export default Footer;
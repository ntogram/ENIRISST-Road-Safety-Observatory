import React from 'react';
import "./Description2.css"
import dear from "./dear.png"
import hrx from "./hr.png";
import icon1 from "./icon1.png"
import icon2 from "./icon2.png"
function Description2() {
    return <div className={"description"}>
      <img src={dear} className={"img_top img-center"} alt={"Dear"}/>
        <div ><img className={"img_top img-center"} src={hrx}/></div>
        <div className={"dear"}>DEAR</div>
        <div className={"subtitle"}>Η πλατφόρμα DEAR προσφέρει πληροφορίες σχετικά με την Οδική Ασφάλεια στην Ελλάδα και συγκεκριμένα:</div>
        <div className={"table-tag"}>
            <div className={"subtable1"}>
            <img className={"tableicon1"} src={icon1} alt={"icon1"}/>
            <div className={"table-header tableicon1"}>Βήμα 1ο</div>
              <hr className={"hr1"}/>
              <div className={"table-content tableicon1"}>Συλλέγει δεδομένα σχετικά με τα τροχαία ατυχήματα από έγκυρες πηγές.</div>
            </div>
            <div className={"subtable2"}>
                <img className={"tableicon2"}src={icon2} alt={"icon2"}/>
                <div className={"table-header tableicon2"}>Βήμα 2ο</div>
                 <hr className={"hr2"}/>
                <div className={"table-content tableicon2"}>Αναλύει και Οπτικοποιεί Δείκτες σχετικά με <br/> την Οδική Ασφάλεια.</div>
            </div>

        </div>
    </div>


}

export default Description2;
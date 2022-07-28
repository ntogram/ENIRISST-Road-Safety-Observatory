import React from 'react';
import "./Description.css"
import hr from "./hr.png"
import vc from "./video_canvas.png"
function Description() {
    return <div className={"sec-background"}>
        <div className={"transbox"}>
             <div style={{float:"left",marginRight:"7%"}}>
             <div className={"text1"}>Παρατηρητήριο οδικής ασφάλειας</div>
              <div className={"text2"}>Η πλατφόρμα οδικής ασφάλειας σε συνεργασία με το DEAR,
                  υποστηριζόμενο απο το <br/> ENIRISST, δίνει πληροφορίες σχετικά με την οδική ασφάλεια
                  και έφτιαξε ένα βίντεο <br/> πλοήγησης στο οποίο θα βρείτε βοήθεια για:</div>
           <div style={{paddingLeft:"6.5%",paddingTop:"5%",width:"723px"}}>

                <div className={"box-background-left"}>
                    <span className={"text3"}>Ξενάγηση
                         <div className={"sep-line"}><img src={hr}/></div>
                        <div className={"text4"}>Στο βίντεο θα βρείτε μια αναλυτική <br/> ξενάγηση της πλατφόρμας μας.</div>
                    </span>

                </div>

                <div className={"box-background-right"}>
                   <span className={"text3"}>Καθοδήγηση
                         <div className={"sep-line"}><img src={hr}/></div>
                        <div className={"text4"}>Θα σας δείξουμε με αναλυτικά βήματα πως μπορείτε να πάρετε δεδομένα απο την συλλογή των δεδομένων μας</div>
                    </span>

                </div>

           </div>
                </div>
            <div  className={"video_div"}>
               <img src={vc} alt={"Video Canvas"}/>

            </div>
        {/*    <div className={"box-background"}>*/}
        {/*        */}
        {/*        */}
        {/*        */}
        {/*        <span className={"text3"}>Ξενάγηση*/}
        {/*        <div><img src={hr}/></div>*/}
        {/*        </span> <span className={"text3"}>Καθοδήγηση</span>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </div>
    </div>


}

export default Description;
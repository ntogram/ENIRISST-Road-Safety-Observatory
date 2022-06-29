import React from 'react';
import "./Preheader.css"

function Preheader() {
    return(<div className={"rectangle"}>
        Τα δεδομένα έχουν συλλεχθεί στο πρόγραμμα <span className={"text_format_bold"}>ENIRISST</span>
        <br/>Πηγές: <span className={"text_format_bold"}>ΕΛΣΤΑΤ,Eurostat,Openstreetmap</span>
       {/* <div className={"text_format"}>
             Τα δεδομένα έχουν συλλεχθεί στο πρόγραμμα ENIRISST
            <span className={"text_format_reg"}>
                Τα δεδομένα έχουν συλλεχθεί στο πρόγραμμα  <span className={"text_format_bold"}>
               ENIRISST
            </span>

            </span>

        </div>*/}
    </div>)

}

export default Preheader;
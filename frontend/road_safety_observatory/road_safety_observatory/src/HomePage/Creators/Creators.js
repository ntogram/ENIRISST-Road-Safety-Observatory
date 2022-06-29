import React from 'react';
import "./Creators.css"
import icon1 from "./creators-group-icon1.png"
import icon2 from "./creators-group-icon2.png"
function Creators() {
    return <div className={"creators-bg"}>
        <div className={"creators-icon-bg"}>
          <div className={"logogroup"}><img src={icon1}/></div>
          <div className={"logogroup"}><img src={icon2}/></div>
        </div>
        <div style={{width:"55%"}}>
        <div className={"creators-h1"}>Εταίροι Ανάπτυξης Παρατηρητηρίου</div>
        <div className={"creators-content"}>Το Παρατηρητήριο Οδικής Ασφάλειας DEAR αναπτύχθηκε από την ερευνητική ομάδα του <span className={"creators-content-annotated"}> Εργαστηρίου
            <br/>
            Συγκοινωνιακής Τεχνικής</span>  του Τομέα Μεταφορών και Διαχείρισης Έργωντου Αριστοτελείου Πανεπιστήμιου <br/>
            Θεσσαλονίκης και την ερευνητική ομάδα του <span className={"creators-content-annotated"}> Εργαστηρίου Μεταφορών και Λήψης Αποφάσεων </span>του Τμήματος
            Ναυτιλίας και Επιχειρηματικών Υπηρεσιών του Πανεπιστημίου Αιγαίου (TransDeM). <br/>
</div>
        </div>

        </div>



}

export default Creators;
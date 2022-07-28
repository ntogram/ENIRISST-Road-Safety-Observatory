import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Header.css"
import pic from "./EnirisstLogo.png";
import Homepage from "../../HomePage/Homepage";
import GreekStatistics from "../../GreekStatistics/GreekStatistics";
import RoadSafetyIndicators from "../../RoadSafetyIndicators/RoadSafetyIndicators";
export default function Header() {
    const [index, setIndex] = useState(0);
    return <Router>
    <nav>
        <a className="logo" href="#"> <img src={pic}  alt={"Enirisst_logo"}/></a>
        <div className="rightSection">
            <span className={index===0?"selected links":"links"} onClick={() => setIndex(0)}><Link style={{color:"inherit"}} to={"/"}>Αρχική</Link></span>
            <span className={index===1?"selected links":"links"} onClick={() => setIndex(1)}><Link style={{color:"inherit"}} to={"/greek_statistics"}>Η Ελλάδα σε αριθμούς</Link></span>
            <span className={index===2?"selected links":"links"} onClick={() => setIndex(2)}><Link style={{color:"inherit"}} to={"/road_safety_indicators"}>Δείκτες Οδικής Ασφάλειας</Link></span>
        </div>
    </nav>
        <Routes>
             <Route exact path="/" element={<Homepage/>}/>
          <Route exact path="/greek_statistics" element={<GreekStatistics/>}/>
          <Route exact path="/road_safety_indicators" element={<RoadSafetyIndicators/>}/>
          <Route path="*" element={<Homepage/>}/>

        </Routes>


</Router>

}


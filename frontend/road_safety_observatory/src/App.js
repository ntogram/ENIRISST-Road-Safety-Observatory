import logo from './logo.svg';
import './App.css';
import Preheader from "./Main_Components/Preheader/Preheader";
import Footer from "./Main_Components/Footer/Footer";
import Header from "./Main_Components/Header/Header";

import MapDisplayer from "./GreekStatistics/components/MapDisplayer/MapDisplayer";
function App() {
  return (
     <div>
         {/*<MapDisplayer/>*/}
       <Preheader/>
       <Header/>
       <Footer/>
     </div>
  );
}

export default App;

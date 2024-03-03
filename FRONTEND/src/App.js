import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Home/Navbar";
import Udata from "./User/Udata";
import Tg from "./TG/Tg";
import Feedback from "./Home/Feedback";
import About from "./Home/About";
import ContactUs from "./Home/ContacUs";
import HomePage from "./Home/HomePage";
import Home from "./Home/Home";
import Icheck from "./Instant/Icheck";
import Fc from "./User/Fc";
import Table_Test from "./Dealer/Table_Test";
import Text from "./Dealer/Text";
import Admin from "./Admin/Admin";

// import Dtable from "./User/Dtable";
// import Userrajesh from "./User/Userrajesh";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/Homepage" element={<HomePage/>}/>
        <Route path="/tollplaza" element={<Tg/>}/>
        <Route path="/User-data" element={<Udata/>}/>
        <Route path="/Dealer" element={<Text/>}/>
        <Route path="/reports" element={<Table_Test/>}/>
        <Route path="/fortnightCheck" element={<Fc/>}/>
        <Route path="/text" element={<Text/>}/>
        <Route path="/admin" element={<Admin/>}/>


        







      </Routes>
    </Router>
  );
}

export default App;


import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./containers/Home/Home";
import Registered from "./containers/Registered/Registered";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
      
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/registered" element={<Registered/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<Home/>}/>

      </Routes>
      
      </BrowserRouter>


    </>
  );
}

export default App;

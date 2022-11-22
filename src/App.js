
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./containers/Home/Home";
import Register from "./containers/Register/Register";
import Registered from "./containers/Registered/Registered";

function App() {
  return (
    <>
      <BrowserRouter>
      
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/registered" element={<Registered/>}/>
      <Route path="*" element={<Home/>}/>

      </Routes>
      
      </BrowserRouter>


    </>
  );
}

export default App;

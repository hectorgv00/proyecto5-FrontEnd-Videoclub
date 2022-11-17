
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./containers/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
      
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home/>}/>

      </Routes>
      
      </BrowserRouter>


    </>
  );
}

export default App;


import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./containers/Home/Home";
import Registered from "./containers/Registered/Registered";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { Content } from './containers/Content/Content';
import { ContentDetails } from './containers/ContentDetails/ContentDetails';
import Profile from "./containers/Profile/Profile";
import ProfileModify from "./containers/ProfileModify/ProfileModify";
function App() {
  return (
    <>
      <BrowserRouter>
      
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/profileModify" element={<ProfileModify/>}/>
      <Route path="/registered" element={<Registered/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/content' element={ <Content /> } />
      <Route path='/content/:contentId' element={ <ContentDetails /> } />
      <Route path="*" element={<Home/>}/>

      </Routes>
      
      </BrowserRouter>


    </>
  );
}

export default App;

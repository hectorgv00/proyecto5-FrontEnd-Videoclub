
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./containers/Home/Home";
import Registered from "./containers/Registered/Registered";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import { Content } from './containers/Content/Content';
import { ContentDetails } from './containers/ContentDetails/ContentDetails';
import Profile from "./containers/Profile/Profile";
import ProfileModify from "./containers/ProfileModify/ProfileModify";
import ProfileDestroy from "./containers/ProfileDestroy/ProfileDestroy";
import ProfileAdminUsers from "./containers/ProfileAdminUsers/ProfileAdminUsers";
import ProfileAdminLoans from "./containers/ProfileAdminLoans/ProfileAdminLoans";
import ProfileAdmin from "./containers/ProfileAdmin/ProfileAdmin";
import { ProfileLoans } from "./containers/ProfileLoans/ProfileLoans";
import { LoanDetails } from "./containers/LoanDetails/LoanDetails";
function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar />
        
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profileadmin" element={<ProfileAdmin/>}/>
          <Route path="/profileadminloans" element={<ProfileAdminLoans/>}/>
          <Route path="/profileadminusers" element={<ProfileAdminUsers/>}/>
          <Route path="/profiledestroy" element={<ProfileDestroy/>}/>
          <Route path="/profileloans" element={<ProfileLoans />} />
          <Route path="/profileloans/details" element={ <LoanDetails />} />
          <Route path="/profilemodify" element={<ProfileModify />}/>
          <Route path='/movies' element={<Content title={'Movies'} type={'movies'} />} />
          <Route path='/series' element={<Content title={'Series'} type={'series'}/>} />
          <Route path='/content/:contentId' element={<ContentDetails />} />

          <Route path="*" element={<Home />} />

        </Routes>

      </BrowserRouter>


    </>
  );
}

export default App;

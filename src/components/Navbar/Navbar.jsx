import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logoSite.png";
import "./Navbar.css";

function Navbar(props) {
  const navigate = useNavigate();

  return (
    <div className="navbarDesign container-fluid fixed-top">
      <div className=" row">
        <div className="col-3 col-lg-1 justify-content-center d-flex align-items-center mt-3 ps-0 ps-lg-3">
        <img src={logo} className="logo image-fluid" alt="logo" />
        </div>

        <div className="col-3 col-lg-1 d-xl-flex align-items-center d-none  justify-content-center pe-0 ps-0 pe-lg-5 mt-3 ">
            <h1 className="direct">Direct</h1>
        </div>

        <div className="col-6 col-lg-10 d-flex justify-content-end align-items-center mt-3">
        <ul className="listDesign d-flex justify-content-center">
          <li onClick={() => navigate("/")} className="links">
            Home
          </li>
          <li className="links">Login</li>
          <li onClick={() => navigate("/register")} className="links">
            Register
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
}

export default Navbar;

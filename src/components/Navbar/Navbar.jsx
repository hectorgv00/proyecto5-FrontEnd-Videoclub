import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logoSite.png";
import userIcon from "../../images/585e4bf3cb11b227491c339a.png";
import { userData, userout } from "../../slices/userSlice";
import "./Navbar.css";
import { useJwt } from "react-jwt";
// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

function Navbar(props) {
  const navigate = useNavigate();

  // Redux items


  const userReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();

  // LogOut

  const logout = () => {
    //We will remove the user details from the store
    dispatch(userout({ credentials: {} }));
    // We will remove the token from the localStorage
    localStorage.removeItem("jwt");
    //We will resend the user to Home.
    return navigate("/");
  };

  // Token-------------

  // We will get the token from the localStorage
  const localStorageToken = localStorage.getItem("jwt");
  // We will decode it 
  let { decodedToken } = useJwt(localStorageToken);
  // If the token is null, we will insert it a object with the name key and value "" so the app does not crash
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }


  // We render the app depending on the existance of the token
  if (
    userReduxCredentials?.credentials?.token !== undefined ||
    localStorage.getItem("jwt") !== null
  ) {
    return (
      // With token

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

              <li className="pink fontsize1-5em ms-2">{decodedToken.name}</li>

              {/* Bootstrap Dropdown */}
              <Dropdown>
                <Dropdown.Toggle
                  className="dropDownDesign"
                  id="dropdown-button-dark-example1"
                  variant="black"
                >
                  <img
                    src={userIcon}
                    className="userIconDesign"
                    alt="userIcon"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownMenuDesign" variant="dark">
                  <Dropdown.Item
                    onClick={() => navigate("/profile")}
                    className="fontFamilyGillSans"
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/profileAdmin")}
                    className="fontFamilyGillSans"
                  >
                    Profile Admin
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => navigate("/register")}
                    className="fontFamilyGillSans"
                  >
                    PRUEBA IR A REGISTER
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => logout()}
                    className="fontFamilyGillSans"
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Without Token
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
            <li onClick={()=> navigate("/login")} className="links">Login</li>
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

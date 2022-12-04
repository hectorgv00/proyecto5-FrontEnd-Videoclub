import { useJwt } from "react-jwt";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ProfileAdmin.css";

function ProfileAdmin() {

  const navigate = useNavigate();

  // const localStorageToken = localStorage.getItem("jwt");
  // let { decodedToken } = useJwt(localStorageToken);

  // useEffect(() => {
  //   if ((localStorage.getItem("jwt") === null) || (decodedToken.rolIdRol === 2)) {
  //     navigate("/");
  //   };
  // });


  return (
    <div>
      <div className="container-fluid bg-black vh-100 d-flex flex-column align-items-center justify-content-around">
        <div className="row mt-5 mt-lg-0">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <h1 className="text-light mb-5">
              Accede a todos los <span className="purple"> usuarios </span> y 
              <span className="pink"> alquileres </span> registrados.
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col col-lg-8  text-light d-flex align-items-center justify-content-center flex-column ">
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-6 d-flex justify-content-center">
                    <Button
                      text={"Usuarios"}
                      onClick={() => navigate("/profileadminusers")}
                      className={
                        "fs-3 text-light buttonDesign d-flex align-items-center bgPurple justify-content-center ms-3"
                      }
                    />
                    <Button
                      text={"Alquileres"}
                      onClick={() => navigate("/profileadminloans")}
                      className={
                        "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAdmin;

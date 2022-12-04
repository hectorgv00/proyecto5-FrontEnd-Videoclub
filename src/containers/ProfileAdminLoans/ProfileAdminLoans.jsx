import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoansAdmin } from "../../utils/httpClient"
import Table from 'react-bootstrap/Table';
import { Spinner } from "../../components/Spinner/Spinner";
import axios from "axios";
import "./ProfileAdminLoans.css"
import Button from "../../components/Button/Button";



function ProfileAdminLoans() {

  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };

    // useEffect(() => {
    //   if ((localStorage.getItem("jwt") === null) || (decodedToken.rolIdRol === 2)) {
    //     navigate("/");
    //   };
    // });

    return (
      <form className="tableDesign container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">{decodedToken.name}, esta es tu area de administrador de alquileres.</h1>
            <div className="col col-lg-6 d-flex justify-content-center">
              <Button
                text={"Volver"}
                onClick={() => navigate("/profileadmin")}
                className={
                  "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
                }
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ProfileAdminLoans;



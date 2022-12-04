import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./ProfileAdmin.css";
import { useNavigate } from "react-router-dom";
import { userData, userout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAdmin, getLoansAdmin } from "../../utils/httpClient";
import Table from "react-bootstrap/Table";
import { Spinner } from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";
import axios from "axios";
import { API } from "../../utils/httpClient";
import AdminUsers from "../../components/AdminUsers/AdminUsers";
import AdminLoans from "../../components/AdminLoans/AdminLoans";

function ProfileAdmin() {
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }


  if (localStorage.getItem("jwt") === null || decodedToken.rolIdRol === 2) {
    navigate("/");
  }


  return (

    <div className="profileAdminHeaderDesign text-center bg-black text-light">
      <header className="d-flex justify-content-center">
        <Button
          text={"Users"}
          className={
            "fs-3 text-light buttonDesign d-flex align-items-center bgPurple justify-content-center ms-3"
          }
          onClick={() => setFlag(false)}
        />
        <Button 
                  text={"Loans"}
                  className={
                    "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
                  }
                  onClick={() => setFlag(true)}/>
      </header>

      {(flag)?<AdminLoans/>:<AdminUsers/>}
    </div>
  );
}

export default ProfileAdmin;

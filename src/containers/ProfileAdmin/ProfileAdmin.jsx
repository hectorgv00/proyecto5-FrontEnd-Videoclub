import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./ProfileAdmin.css"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { userData, userout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";


function Profile() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }
  const logout = () => {
    dispatch(userout({ credentials: {} }));
    localStorage.removeItem("jwt");
    return navigate("/");
  };
  return (
    <form className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">{decodedToken.name}, esta es tu area de administrador.</h1>
          <Button className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"} text={"Informacion de usuarios"} />
          {/* <Button
            text={"Modifica tus datos"}
            onClick={() => navigate("/profileModify")}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"}
          />
          <Button
            text={"Elimina tu cuenta"}
            onClick={() => navigate("/profileDestroy")}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"}
          />                
          <Button
            onClick={() => logout()}
            className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"} text={"Deslogeate"} /> */}
        </div>
      </div>
    </form>
  );
}

export default Profile;



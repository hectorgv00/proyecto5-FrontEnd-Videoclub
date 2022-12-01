
import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { errorCheck } from "../../services/useful";
import "./ProfileDestroy.css";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { errorCheck } from "../../services/useful";
import { userout } from "../../slices/userSlice";
import { useJwt } from "react-jwt";

import { useDispatch, } from "react-redux";
import {  userout } from "../../slices/userSlice";

function ProfileDestroy(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();


  let localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    nocompletedError: "",
  });

  if (decodedToken === null) {
    decodedToken = { email: "" };
  }


  const destroyUser = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      userDestroyed();
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: "",
      }));
      logout()
    } else {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: "Es imperativo introducir datos a destruir",
      }));
    }
  };

  

  const logout = () => {
    dispatch(userout({ credentials: {} }));

    localStorage.removeItem("jwt");
    return navigate("/");
  };
  
  let validateInputs = () => {
    if (user.email !== "" && user.password !== "" && userError.emailError === "" && userError.passwordError === "") {
      return true;
    }
  };

  const userDestroyed = async () => {

    await axios.delete("http://127.0.0.1:3000/users/delete", { data: { email: user.email, password: user.password }, headers: { "Authorization": "Bearer " + localStorageToken } });


  const userDestroyed = async (e) => {
    e.preventDefault();

    let resp = await axios.delete("http://127.0.0.1:3000/users/delete", {
      data: { email: user.email, password: user.password },
      headers: { Authorization: "Bearer " + localStorageToken },
    });

    // TODO: crear la validacion del envio del destroy

    logout()
  };

 
  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorHandler = (field, value, type, password1) => {
    let error = "";
    error = errorCheck(value, type, password1);



    setUserError((prevState) => ({
      ...prevState,
      [field + "Error"]: error,
    }));
  };

  return (
    <form

      onSubmit={(e) => destroyUser(e)}

      className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0"
    >
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">

            {decodedToken.name}, si eres tu, introduce tus{" "}
            <span className="purple">datos</span> para que sean{" "}
            <span className="pink">aniquilados</span>...
          </h1>


          {/* Inputs */}

          <Input
            name="email"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")}
            type="email"
            placeholder="Email"
          />

          <div className="errorInput mb-3"> {userError.emailError} </div>

          <Input.Password
            name="password"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) =>
              errorHandler(e.target.name, e.target.value, "password")
            }
            type="password"
            placeholder="Contraseña"
          />

          <div className="errorInput mb-3"> {userError.passwordError} </div>

          <Button
            text={"Elimina tu cuenta"}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"
            }
          />

          <Button
            text={"Vuelve a tu area"}

            onClick={() => navigate("/profile")}

            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"
            }
          />
        </div>
      </div>
    </form>
  );
}

export default ProfileDestroy;

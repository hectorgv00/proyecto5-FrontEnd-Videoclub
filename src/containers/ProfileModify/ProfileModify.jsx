import React, { useState, useEffect } from "react";
import axios from "axios";
import { login } from "../../slices/userSlice";
import { useJwt } from "react-jwt";
import { Input } from 'antd';
import { useDispatch } from "react-redux";
import { errorCheck } from '../../services/useful';
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ProfileModify.css"


function ProfileModify() {

  const dispatch = useDispatch();

  let localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    address: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    addressError: "",
    nocompletedError: "",
  });

  if (decodedToken === null) {
    decodedToken = { email: "" };
  };

  const body = {
    name: user.name,
    surname: user.surname,
    address: user.address,
    email: decodedToken.email
  };

  const updateUser = async (e) => {
    e.preventDefault()
    if (validateInputs(user)) {
      userUpdater(body)
      setUserError(((prevState) => ({
        ...prevState,
        nocompletedError: ""
      })));
    } else {
      setUserError(((prevState) => ({
        ...prevState,
        nocompletedError: "Necesitas introducir nuevos datos para que sean modificados"
      })));
    }
  };

  let validateInputs = (body) => {
    if ((body.name !== "" && body.surname !== "" && body.address !== "") && (userError.nameError === "" && userError.surnameError === "" && userError.addressError === "")) { return true }
  };

  const userUpdater = async (body) => {
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }
    let res = await axios.put("http://127.0.0.1:3000/users/modify", body, config)
    let jwt = res.data.jwt;
    let credentials = {
      token: jwt
    }
    // dispatch(userout({ credentials: {} }))
    dispatch(login({ credentials: credentials }))
    // localStorage.removeItem("jwt")
    localStorage.setItem("jwt", credentials.token)
    navigate("/")
  };

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const errorHandler = (field, value, type, password1) => {
    let error = "";
    error = errorCheck(value, type, password1);
    setUserError(((prevState) => ({
      ...prevState,
      [field + "Error"]: error
    })));
  };

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/");
    };
  });


  return (
    <form onSubmit={(e) => updateUser(e)} className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">Modifica tus datos</h1>
          <div className="errorInput mb-3 ft-5"> {userError.nocompletedError} </div>

          {/* Inputs */}

          <Input name="name" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")} type="text" placeholder="Nombre" />

          <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

          <Input name="surname" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="Apellido" />

          <div className="errorInput mb-3"> {userError.surnameError} </div>

          <Input name="address" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="Dirección" />

          <div className="errorInput mb-3"> {userError.documentError} </div>

          <Button className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"} text={"Registrar cambios"} />

          <Button
            text={"Vuelve a tu area"}
            onClick={() => navigate("/profile")}
            className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"}
          />

        </div>
      </div>
    </form>
  );
};

export default ProfileModify;

import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { errorCheck } from "../../services/useful";
import "./Register.css";
import Button from "../../components/Button/Button";
// import {registerUser} from  "../../services/calls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from "../../slices/userSlice";
import { Spinner } from "react-bootstrap";
import { API } from "../../utils/httpClient";
import CyberButton from "../../components/CyberButton/CyberButton";

function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReduxCredentials = useSelector(userData);

  // Hooks

  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    document: "",
    email: "",
    address: "",
    password: "",
    password2: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    emailError: "",
    documentError: "",
    addressError: "",
    passwordError: "",
    password2Error: "",
    nocompletedError: "",
    emailAlready: "",
  });

  // Handler de los inputs

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

  // Funcion onSubmit del form

  const sendBody = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (validateBody(body)) {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: "",
      }));
      await registerUser(body);
    } else {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError:
          "The form could not be sent. Flease verify that al the fields have been filled and there are no error signs",
      }));
      setIsLoading(false);
    }
  };

  const registerUser = async (body) => {
    let resp = await axios.post(`${API}/users/register`, body);
    if (
      resp.data ===
      `The user with email: ${body.email} has been created successfully`
    ) {
      await userLogin(bodyLogin);
    } else {
      setUserError((prevState) => ({
        ...prevState,
        emailAlready: "The email is already in use",
      }));
    }
  };

  const validateBody = (body) => {
    if (
      body.name !== "" &&
      body.surname !== "" &&
      body.document !== "" &&
      body.address !== "" &&
      body.email !== "" &&
      body.password !== "" &&
      userError.nameError === "" &&
      userError.surnameError === "" &&
      userError.documentError === "" &&
      userError.documentError === "" &&
      userError.addressError === "" &&
      userError.emailError === "" &&
      userError.passwordError === "" &&
      userError.password2Error === ""
    ) {
      return true;
    }
  };

  // Body Register

  const body = {
    name: user.name,
    surname: user.surname,
    document: user.document,
    address: user.address,
    email: user.email,
    password: user.password,
  };

  // Body Login

  const bodyLogin = {
    email: user.email,
    password: user.password,
  };

  // Login Automático al registrarte

  const userLogin = async (bodyLogin) => {
    let resp = await axios.post(`${API}/users/login`, bodyLogin);

    let jwt = resp.data.jwt;
    let credentials = {
      token: jwt,
    };

    dispatch(login({ credentials: credentials }));

    localStorage.setItem("jwt", credentials.token);
  };

  // Comprobacion de si hay token

  useEffect(() => {
    if (
      userReduxCredentials?.credentials?.token !== undefined ||
      localStorage.getItem("jwt") !== null
    ) {
      navigate("/");
    }
  });

  return (
    <form
      onSubmit={sendBody}
      className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center margin-top-10vh"
    >
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">Create your account</h1>
          <h3 className="text-light mb-5">
            You are about to enjoy with the best content brought by{" "}
            <span className="colortxt2">Direct</span>
          </h3>

          {/* Spinner para cuando carga */}
          {isLoading ? <Spinner className="purple" /> : ""}

          <div className="errorInput mb-0 ft-5">
            {" "}
            {userError.nocompletedError}{" "}
          </div>
          <div className="errorInput mb-3 ft-5"> {userError.emailAlready} </div>

          {/* Inputs */}

          <Input
            name="name"
            onChange={(e) => {inputHandler(e);}}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")}
            type="text"
            placeholder="Nombre"
          />

          <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

          <Input
            name="surname"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")}
            type="text"
            placeholder="Apellido"
          />

          <div className="errorInput mb-3"> {userError.surnameError} </div>

          <Input
            name="document"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")}
            type="text"
            placeholder="DNI/NIE"
          />

          <div className="errorInput mb-3"> {userError.documentError} </div>

          <Input
            name="address"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")}
            type="text"
            placeholder="Dirección"
          />

          <div className="errorInput mb-3"> {userError.documentError} </div>

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

          <Input.Password
            name="password2"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) =>
              errorHandler(
                e.target.name,
                e.target.value,
                "password2",
                user.password
              )
            }
            type="password"
            placeholder="Repita la contraseña"
          />

          <div className="errorInput mb-3"> {userError.password2Error} </div>

          <CyberButton
            className={
              "CyberButtonColor d-flex align-items-center "
            }
            text={"Register"}
            onClick={sendBody}
          />
        </div>
      </div>
    </form>
  );
}

export default Register;

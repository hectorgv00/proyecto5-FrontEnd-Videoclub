import React, { useState } from "react";
import axios from "axios";
import { Input } from 'antd';
import { useDispatch } from "react-redux";
import { errorCheck } from '../../services/useful';
import { userout } from "../../slices/userSlice";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ProfileDestroy.css"


function ProfileDestroy() {

  const dispatch = useDispatch();

  let localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);

  const [user, setUser] = useState({
    email: "",
  });

  const [userError, setUserError] = useState({
    emailError: "",
    nocompletedError: "",
  });

  if (decodedToken === null) {
    decodedToken = { email: "" };
  };

  const body = {
    email: decodedToken.email,
  };

  const destroyUser = async (e) => {
    e.preventDefault()
    if (validateInputs(body)) {
      userDestroyed(body)
      setUserError(((prevState) => ({
        ...prevState,
        nocompletedError: ""
      })));
      // logout()
    } else {
      setUserError(((prevState) => ({
        ...prevState,
        nocompletedError: "Es imperativo introducir datos a destruir"
      })))
      ;
    }
  };

  // utizar userSlice user out?
  const logout = () => {
    dispatch(userout({ credentials: {} }));
    localStorage.removeItem("jwt");
    return navigate("/");
  };
  let validateInputs = (body) => {
    if (body.email !== "" && userError.emailError ==="") { return true }
  };
  // error axios 
  // DELETE http://127.0.0.1:3000/users/delete net::ERR_CONNECTION_REFUSED
  // const [strategy, jwt] = authorization.split(" ");
  console.log(body.email)
  console.log(decodedToken.email)

  const userDestroyed = async (user) => {
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }
    let resp = await axios.delete("http://127.0.0.1:3000/users/delete", user, config)
    .then( resp => resp.data)
    }
  

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


  return (
    <form onSubmit={(e) => destroyUser(e)} className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">{decodedToken.name}, si eres tu realmente, introduce tu <span className="purple">email</span> para <span className="pink">aniquilar</span> tus datos...</h1>
          <div className="errorInput mb-3 ft-5"> {userError.nocompletedError} </div>

          {/* Inputs */}

          <Input name="email" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")} type="email" placeholder="Email" />

          <div className="errorInput mb-3"> {userError.emailError} </div>

          {/* <Input.Password name="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} type="password" placeholder="Contraseña" />

          <div className="errorInput mb-3"> {userError.passwordError} </div> */}

          <Button
            text={"Elimina tu cuenta"}
            className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"}
          />

          <Button
            text={"Vuelve a tu area"}
            onClick={() => navigate("/profile")}
            className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"}
          />

        </div>
      </div>
    </form>
  );
}

export default ProfileDestroy;

import React, { useState } from "react";
import { Input } from 'antd';
import { errorCheck } from '../../services/useful';
import "./Login.css"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userData, login } from "../../slices/userSlice";



function Login() {
  const navigate = useNavigate();
  const dispach = useDispatch()


  const userLogin = async (body) => {
    
    let resp = await axios.post("http://127.0.0.1:3000/users/login",body);
    if(resp.data === "Password or email is incorrect"){
      setUserError(((prevState) => ({
        ...prevState,
        noEmail: "El email o la contraseña son incorrectos"
  
    })));  
  }else if (resp.data.message === "Login successful"){
    setUserError(((prevState) => ({
      ...prevState,
      noEmail: ""

  })));

// TODO: Poner spinner para la carga

    let  jwt = resp.data.jwt;
    let credentials ={
      token: jwt
    } 

    
    dispach(login({credentials:credentials}));
    
    localStorage.setItem("jwt",credentials.token)

    navigate("/")
  }



    
  };
  
  // Hooks
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  
  
  })
  
  
  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    noEmail:""
  
  })



let body = {
  email:user.email,
  password:user.password
}

const validateBody =(body)=>{
  if( body.email !== "" && body.password && userError.emailError ===""  && userError.passwordError ==="" ){ return true} 
}

  const submitLogin = (e) =>{
    e.preventDefault();
    if(validateBody(body)){
    userLogin(body)
  }else{
    setUserError(((prevState) => ({
      ...prevState,
      noEmail: "No se puede enviar el formulario. Revise que no hay campos vacíos y que el formato de los mismos es el correcto"

  })));
  }
  }


  // Handler de los inputs

  const inputHandler = (e) => {

    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value

    }));
  }

  const errorHandler = (field, value, type, password1) => {

    let error = "";

    error = errorCheck(value, type, password1);

    setUserError(((prevState) => ({
      ...prevState,
      [field + "Error"]: error

    })));

  }

  return (
    <form className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0" onSubmit={
      (e)=>submitLogin(e)}>

      <div className="row mt-5 justify-content-center">
        <div className="text col-8 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">If you have an account.  Please <span className="colortxt2"> login!</span> </h1>

          <div className="errorInput mb-3 ft-5"> {userError.noEmail} </div>


          {/* Inputs */}

          <Input className="inputs" name="email" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")} type="email" placeholder="Email" />

          <div className="errorInput mb-3"> {userError.emailError} </div>

          <Input.Password className="inputs" name="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} type="password" placeholder="Password" />

          <div className="errorInput mb-3"> {userError.passwordError} </div>
          <h4 className="text-light">Forgot your password?</h4>
          <div className="boton">
            <Button
              text={"Login!"}
              className={
                "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
              }
            />
          </div>
        </div>
        <div className="link">
          <h3 className="text-light mb-5">If you don't have account, please register on <span className="colortxt" onClick={() => navigate("/register")}>Direct</span>  for <span className="colortxt2"> FREE!</span></h3>

        </div>
      </div>

    </form>
  );
}

export default Login;

import React, { useState } from "react";
import { Input } from 'antd';
import { errorCheck } from '../../services/useful';
import "./Login.css"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  // Hooks

  const [user, setUser] = useState({
    email: "",
    password: "",


  })

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",


  })

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
    <form className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row mt-5 justify-content-center">
        <div className="text col-8 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">If you have an account.  Please <span className="colortxt2"> login!</span> </h1>

          {/* Inputs */}

          <Input className="inputs" name="email" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")} type="email" placeholder="User or Email" />

          <div className="errorInput mb-3"> {userError.emailError} </div>

          <Input.Password className="inputs" name="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} type="password" placeholder="Password" />

          <div className="errorInput mb-3"> {userError.passwordError} </div>
          <h4 className="text-light">Forgot your password?</h4>
          <div className="boton">
            <Button
              text={"Login!"}
              onClick={() => navigate("/Home")}
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

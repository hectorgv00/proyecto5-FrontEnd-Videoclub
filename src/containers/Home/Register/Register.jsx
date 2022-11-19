import React, { useState } from "react";
import { Input } from 'antd';
import { errorCheck } from '../../../services/useful';
import "./Register.css"

function Register(props) {


    // Hooks

    const [user, setUser] = useState({
        name:"",
        surname:"",
        document:"",
        email:"",
        password:"",
        password2:"",

    })

    const [userError, setUserError] = useState({
        nameError:"",
        surnameError:"",
        emailError:"",
        documentError:"",
        passwordError:"",
        password2Error:"",

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

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">Crea tu cuenta</h1>
            <h3 className="text-light mb-5">Estás a punto de empezar a disfrutar del mejor entretenimiento con <span className="direct">Direct</span></h3>

            {/* Inputs */}

        <Input name="name" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")} type="text" placeholder="Nombre" />

        <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

        <Input name="surname" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="Apellido" />

        <div className="errorInput mb-3"> {userError.surnameError} </div>

        <Input name="document" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="DNI/NIE" />

        <div className="errorInput mb-3"> {userError.documentError} </div>

        <Input name="email" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")} type="email" placeholder="Email" />

        <div className="errorInput mb-3"> {userError.emailError} </div>

        <Input.Password name="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} type="password" placeholder="Contraseña" />

        <div className="errorInput mb-3"> {userError.passwordError} </div>


        <Input.Password name="password2" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password2", user.password)} type="password" placeholder="Repita la contraseña"/>

        <div className="errorInput mb-3"> {userError.password2Error} </div>

        </div>
      </div>
    </form>
  );
}

export default Register;

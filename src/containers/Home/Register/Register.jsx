import React, { useState } from "react";
import { Input } from 'antd';
import "./Register.css"

function Register(props) {


    // Hooks

    const [user, setUser] = useState({
        name:"",
        surname:"",
        email:"",
        document:"",
        password:"",
        passwor2:"",

    })

    const [userError, setUserError] = useState({
        nameError:"",
        surnameError:"",
        emailError:"",
        documentError:"",
        passwordError:"",
        passwor2Error:"",

    })


  return (
    <form className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">Crea tu cuenta</h1>
            <h3 className="text-light mb-5">Estás a punto de empezar a disfrutar del mejor entretenimiento con <span className="direct">Direct</span></h3>
        <Input className="inputWidth mb-3" placeholder="Nombre" />
        <Input className="inputWidth mb-3" placeholder="Apellido" />
        <Input className="inputWidth mb-3" placeholder="DNI/NIE" />
        <Input className="inputWidth mb-3" placeholder="Email" />
        <Input className="inputWidth mb-3" placeholder="Contraseña" />
        <Input className="inputWidth mb-3" placeholder="Repita la contraseña" />
        </div>
      </div>
    </form>
  );
}

export default Register;

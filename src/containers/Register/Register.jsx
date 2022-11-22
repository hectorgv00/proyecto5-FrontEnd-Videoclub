import React, { useState, useEffect } from "react";
import {  Input } from 'antd';
import { errorCheck } from '../../services/useful';
import "./Register.css"
import Button from "../../components/Button/Button";
// import {registerUser} from  "../../services/apicalls";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";


function Register(props) {

  const userReduxCredentials = useSelector(userData);

    

   const registerUser = async (body) => {
    let resp = await axios.post("http://127.0.0.1:3000/users/register",body);
    if(resp.data === `The user with email: ${body.email} has been created successfully` ){
      navigate("/registered")
    }else{
      setUserError(((prevState) => ({
        ...prevState,
        emailAlready: "El email ya está en el sistema"

    })));
    }

};

const navigate = useNavigate();

    // Hooks

    const [user, setUser] = useState({
        name:"",
        surname:"",
        document:"",
        email:"",
        address:"",
        password:"",
        password2:"",

    })

    const [userError, setUserError] = useState({
        nameError:"",
        surnameError:"",
        emailError:"",
        documentError:"",
        addressError:"",
        passwordError:"",
        password2Error:"",
        nocompletedError:"",
        emailAlready:"",

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

    // Funcion onSubmit del form

    const sendBody = (e) =>{
      e.preventDefault();
      if(validateBody(body)){
        setUserError(((prevState) => ({
          ...prevState,
          nocompletedError: ""

      })));
        registerUser(body)
      }else{
        setUserError(((prevState) => ({
          ...prevState,
          nocompletedError: "No se puede enviar el formulario. Revise que no hay campos vacíos y que el formato de los mismos es el correcto"

      })));
      }
      

    }


    const validateBody =(body)=>{
      if(body.name !== "" && body.surname !== "" && body.document !== "" && body.address !== "" && body.email !== "" && body.password !== "" && userError.nameError ==="" && userError.surnameError ==="" && userError.documentError ==="" && userError.documentError ==="" && userError.addressError ===""  && userError.emailError ===""  && userError.passwordError ===""  && userError.password2Error ===""  ){ return true} 
    }

    const body = {
      name:user.name,
      surname:user.surname,
      document:user.document,
      address:user.address,
      email:user.email,
      password:user.password

    }

    useEffect(() => {


      if (userReduxCredentials?.credentials?.token !== undefined || localStorage.getItem("jwt") !== null) {

        // TODO: redireccionar a una vista que diga que no puede acceder a registro si ya está logueado con un timeout y que luego redireccione a home

          navigate("/");
      };
  });

  return (
    <form onSubmit={sendBody} className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">Crea tu cuenta</h1>
            <h3 className="text-light mb-5">Estás a punto de empezar a disfrutar del mejor entretenimiento con <span className="direct">Direct</span></h3>

            <div className="errorInput mb-3 ft-5"> {userError.nocompletedError} </div>
            <div className="errorInput mb-3 ft-5"> {userError.emailAlready} </div>


            {/* Inputs */}

        <Input name="name" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")} type="text" placeholder="Nombre" />

        <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

        <Input name="surname" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="Apellido" />

        <div className="errorInput mb-3"> {userError.surnameError} </div>

        <Input name="document" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="DNI/NIE" />

        <div className="errorInput mb-3"> {userError.documentError} </div>

        <Input name="address" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="Dirección" />

        <div className="errorInput mb-3"> {userError.documentError} </div>

        <Input name="email" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")} type="email" placeholder="Email" />

        <div className="errorInput mb-3"> {userError.emailError} </div>

        <Input.Password name="password" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password")} type="password" placeholder="Contraseña" />

        <div className="errorInput mb-3"> {userError.passwordError} </div>


        <Input.Password name="password2" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "password2", user.password)} type="password" placeholder="Repita la contraseña"/>

        <div className="errorInput mb-3"> {userError.password2Error} </div>

        <Button className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"} text={"Regístrate"}  />
        </div>
      </div>
    </form>
  );
}

export default Register;

import React, { useState, useEffect } from "react";
import { Input } from 'antd';
import { errorCheck } from '../../services/useful';
import "./ProfileModify.css"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";


function ProfileModify(props) {

  const userReduxCredentials = useSelector(userData);



  const updateUser = async (body) => {
    let resp = await axios.put("http://127.0.0.1:3000/usersmodify", body);
    if (resp.data === `Tus datos se actualizaron correctamente`) {
      navigate("/profile")
    } else {
      setUserError(((prevState) => ({
        ...prevState,
        emailAlready: "No se pudieron actualizar tus datos"

      })));
    }

  };

  const navigate = useNavigate();

  // Hooks

  const [user, setUser] = useState({
    name: "",
    surname: "",
    document: "",
    address: "",

  })

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    documentError: "",
    addressError: "",
    nocompletedError: "",

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

  const sendBody = (e) => {
    e.preventDefault();
    if (validateBody(body)) {
      setUserError(((prevState) => ({
        ...prevState,
        nocompletedError: ""

      })));
      updateUser(body)
    } else {
      setUserError(((prevState) => ({
        ...prevState,
        nocompletedError: "No se puede enviar el formulario. Revise que no hay campos vacíos y que el formato de los mismos es el correcto"

      })));
    }


  }


  const validateBody = (body) => {
    if (body.name !== "" && body.surname !== "" && body.document !== "" && body.address !== "" && userError.nameError === "" && userError.surnameError === "" && userError.documentError === "" && userError.documentError === "" && userError.addressError === "") { return true }
  }

  const body = {
    name: user.name,
    surname: user.surname,
    document: user.document,
    address: user.address,

  }

  return (
    <form onSubmit={sendBody} className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">Modifica tus datos</h1>
          <div className="errorInput mb-3 ft-5"> {userError.nocompletedError} </div>
          <div className="errorInput mb-3 ft-5"> {userError.emailAlready} </div>

          {/* Inputs */}

          <Input name="name" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")} type="text" placeholder="Nombre" />

          <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

          <Input name="surname" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "surname")} type="text" placeholder="Apellido" />

          <div className="errorInput mb-3"> {userError.surnameError} </div>

          <Input name="document" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "document")} type="text" placeholder="DNI/NIE" />

          <div className="errorInput mb-3"> {userError.documentError} </div>

          <Input name="address" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "address")} type="text" placeholder="Dirección" />

          <div className="errorInput mb-3"> {userError.documentError} </div>
          <Button className={"fs-3 text-light buttonDesign d-flex align-items-center bgTransition justify-content-center mt-3"} text={"Registrar cambios"}  />

        </div>
      </div>
    </form>
  );
}

export default ProfileModify;

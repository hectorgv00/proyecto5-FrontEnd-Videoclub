import React, { useState, useEffect } from "react";
import { Input } from 'antd';
import { errorCheck } from '../../services/useful';
import "./ProfileModify.css"
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useJwt } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { userData, userout } from "../../slices/userSlice";




function ProfileModify(props) {

  const dispatch = useDispatch()

  let localStorageToken = localStorage.getItem("jwt")
  let { decodedToken } = useJwt(localStorageToken);

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

  if (decodedToken === null) {
    decodedToken = { email: "" };
  }
  const body = {
    name: user.name,
    surname: user.surname,
    document: user.document,
    address: user.address,
    email: decodedToken.email
  };
  console.log(body.email)

  const updateUser = (e) =>{
    e.preventDefault()
    userUpdater(body)
    //We will remove the user details from the store
    dispatch(userout({ credentials: {} }));
    // We will remove the token from the localStorage
    localStorage.removeItem("jwt");
    //We will resend the user to Home.
    return navigate("/");
  }
  const userUpdater = async (body) => {
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }
    let resp = await axios.put("http://127.0.0.1:3000/users/modify", body, config);
    if (resp.data === `Tus datos se actualizaron correctamente`) {
      navigate("/profile")
    } else {
      setUserError(((prevState) => ({
        ...prevState,
        dataError: "No se pudieron actualizar tus datos"

      })));
    }

  };

  const navigate = useNavigate();



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
    <form onSubmit={(e)=> updateUser(e)} className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">

      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">Modifica tus datos</h1>

          {/* Inputs */}

          <Input name="name" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")} type="text" placeholder="Nombre" />

          <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

          <Input name="surname" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="Apellido" />

          <div className="errorInput mb-3"> {userError.surnameError} </div>

          <Input name="document" onChange={(e) => inputHandler(e)} onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")} type="text" placeholder="DNI/NIE" />

          <div className="errorInput mb-3"> {userError.documentError} </div>

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
}

export default ProfileModify;

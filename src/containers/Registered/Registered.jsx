import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";

function Registered() {
    
    
    const userReduxCredentials = useSelector(userData);
    const navigate = useNavigate()
    const redirect = () =>{
        setTimeout(()=> navigate("/"), 3000)
    } 

    useEffect(()=>redirect())

    useEffect(() => {

  
        if (userReduxCredentials?.credentials?.token !== undefined || localStorage.getItem("jwt") !== null) {
  
          // TODO: redireccionar a una vista que diga que no puede acceder a registro si ya está logueado con un timeout y que luego redireccione a home
  
            navigate("/");
        };
    });
    



    return (
        <div className='container-fluid bg-black text-light vh-100 d-flex align-items-center justify-content-center '>
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center flex-column">
            <h1 className=''>Has sido registrado correctamente. Serás redireccionado a la página principal en <span className='purple'> tres segundos </span></h1>
            </div>
            </div>
        </div>
    );
}

export default Registered;
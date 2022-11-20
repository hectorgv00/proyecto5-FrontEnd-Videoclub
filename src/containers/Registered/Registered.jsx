import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registered() {
    
    // const [time, setTime] = useState(3);

    const navigate = useNavigate()
    const redirect = () =>{
        setTimeout(()=> navigate("/"), 3000)
    } 

    useEffect(()=>redirect())

    



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
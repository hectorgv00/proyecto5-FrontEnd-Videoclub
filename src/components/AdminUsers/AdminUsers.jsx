import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./AdminUsers.css"
import { useNavigate } from "react-router-dom";
import { userData, userout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAdmin, getLoansAdmin, httpGet, httpGetAdmin } from "../../utils/httpClient"
import Table from 'react-bootstrap/Table';
import { Spinner } from "../../components/Spinner/Spinner";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { API } from "../../utils/httpClient";

export default function AdminUsers() {

  const [users, setUsers] = useState([])
  const [boolean, setBoolean] = useState(true)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const localStorageToken = localStorage.getItem("jwt");
    let { decodedToken } = useJwt(localStorageToken);
    if (decodedToken === null) {
      decodedToken = { name: "" };
    }
  
    if ((localStorage.getItem("jwt") === null) || (decodedToken.rolIdRol === 2)) {
      navigate("/");
    };
    useEffect(() => {

     httpGetAdmin("users", "all").then(data=>setUsers(data))

    },[boolean])
  

console.log(users)

    
  
    if (users?.length === 0) return <Spinner />
  
  
    const handlerDelete = async (e) => {
      let buttonId = e.target.id
      let email = users[(buttonId)].email
      console.log(users[buttonId].email)
      let resp = await axios.delete(`${API}/users/deleteprofile`, { data: { email: email }, headers: { "Authorization": "Bearer " + localStorageToken } } )
      setBoolean(!boolean)
    }
  

  return (
    <div className="container-fluid bg-black d-flex justify-content-center align-items-center ">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                {users?.map((user, index) => {
                  return (
                    <div key={user.id_user} className="text-center d-flex text-light justify-content-around">

                      <p><span>id = </span>{user.id_user}</p>
                      <p><span>name = </span>{user.name}</p>
                      <p><span>surname = </span>{user.surname}</p>
                      <p><span>email = </span>{user.email}</p>

                      <p>
                        <Button
                          id={index}
                          onClick={(e) => handlerDelete(e)}
                          variant="danger"
                        >
                          X
                        </Button>
                      </p>
                    </div>
                  );
                })}
          </div>
         </div>
     </div>
  );
}

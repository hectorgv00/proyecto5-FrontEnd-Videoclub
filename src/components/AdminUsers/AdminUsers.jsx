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
    <div>
      <form className="tableDesign container-fluid bg-black vh-100 d-flex justify-content-center align-items-center ">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">
            </h1>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => {
                  return (
                    <tr key={user.id_user} className="text-center">
                      <td>{user.id_user}</td>
                      <td>{user.name}</td>
                      <td>{user.surname}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button
                          id={index}
                          onClick={(e) => handlerDelete(e)}
                          variant="danger"
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./ProfileAdmin.css";
import { getUsersAdmin } from "../../utils/httpClient";
import Table from "react-bootstrap/Table";
import { Spinner } from "../../components/Spinner/Spinner";
import Button from "react-bootstrap/Button";
import axios from "axios";

function ProfileAdmin() {
  const [boolean, setBoolean] = useState(true);

  const [users, setUsers] = useState([]);

  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }
  useEffect(() => {
    getUsers();
  }, [boolean]);

  const getUsers = async () => {
    let { data } = await getUsersAdmin(localStorageToken);
    console.log(data);
    setUsers(data);
  };

  console.log(users);
  if (users.length === 0) return <Spinner />;

  const handlerDelete = async (e) => {
    let buttonId = e.target.id;
    let email = users[buttonId].email;
    console.log(users[buttonId].email);
    await axios.delete("http://127.0.0.1:3000/users/deleteprofile", {
      data: { email: email },
      headers: { Authorization: "Bearer " + localStorageToken },
    });
    setBoolean(!boolean);
  };

  return (
    <form className="tableDesign container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">
            {decodedToken.name}, esta es tu area de administrador.
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
  );
}

export default ProfileAdmin;

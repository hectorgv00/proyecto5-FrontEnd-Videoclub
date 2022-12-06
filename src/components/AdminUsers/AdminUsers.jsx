import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./AdminUsers.css";
import { useNavigate } from "react-router-dom";
import { httpGetAdmin } from "../../services/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { API } from "../../services/httpClient";
import Modal from "react-bootstrap/Modal";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [boolean, setBoolean] = useState(true);
  const [show, setShow] = useState(false);
  const [idButton, setIdButton] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const pushIndex = (e) => {
    handleShow()
    let buttonId = e.target.id;
    setIdButton(buttonId)
  }

  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }

  if (localStorage.getItem("jwt") === null || decodedToken.rolIdRol === 2) {
    navigate("/");
  }
  useEffect(() => {
    httpGetAdmin("users", "all", localStorageToken).then((data) =>
      setUsers(data)
    );
  }, [boolean]);

  if (users?.length === 0) return <Spinner />;

  const handlerDelete = async (e) => {
    handleClose();
    let email = users[idButton].email;
    let resp = await axios.delete(`${API}/users/deleteprofile`, {
      data: { email: email },
      headers: { Authorization: "Bearer " + localStorageToken },
    });
    setIdButton(0);
    setBoolean(!boolean);
  };

  

  return (
    <div className="container-fluid bg-black d-flex justify-content-center align-items-center mt-4">
      <div className="row vw-100">
        <div className="col-12 d-flex flex-column justify-content-center adminUsersDesign ps-0 pe-0">
          {users?.map((user, index) => {
            return (
              <div
                key={user.id_user}
                className={
                  index % 2
                    ? "container-fluid justify-content-start usersContainerDesign d-flex text-light justify-content-between bg-grey"
                    : "container-fluid justify-content-start usersContainerDesign d-flex text-light justify-content-between bg-dark-grey"
                }
              >
                <div className="container-fluid ps-0">
                  <div className="row">
                    <div className="col-12 col-md-1 ">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Id{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {user.id_user}{" "}
                      </p>
                    </div>
                    <div className="col-12 col-md-2">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Name{" "}
                      </p>
                      <p className="text-start paragraphDesign">{user.name} </p>
                    </div>

                    <div className="col-12 col-md-2">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Surname{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {user.surname}{" "}
                      </p>
                    </div>

                    <div className="col-12 col-md-6">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Email{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {user.email}{" "}
                      </p>
                    </div>
                    <div className="col-12 col-md-1 d-flex justify-content-center align-items-center ">
                    {(user.rolIdRol === 1)? <p>Admin</p>:
                    
                    
                      <p className="d-flex align-items-center">
                        <Button
                          variant="danger"
                          onClick={e=>pushIndex(e)}
                          id={index}
                        >
                          X
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                          </Modal.Header>
                          <Modal.Body></Modal.Body>
                          <p className="ms-3">
                            Are you sure that you want to delete {users[idButton].name}'s user?
                          </p>
                          <Modal.Footer>
                            <Button variant="success" onClick={handleClose}>
                              Go Back
                            </Button>

                            <Button
                              onClick={(e) => handlerDelete(e)}
                              variant="danger"
                              >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </p>
                    }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

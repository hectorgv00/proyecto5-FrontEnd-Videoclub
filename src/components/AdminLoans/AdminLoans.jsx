import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./AdminLoans.css"
import { useNavigate } from "react-router-dom";
import { getLoansAdmin, httpGetAdmin } from "../../utils/httpClient"
import Table from 'react-bootstrap/Table';
import { Spinner } from "../../components/Spinner/Spinner";
import Button from 'react-bootstrap/Button';
import { API } from "../../utils/httpClient";

export default function AdminLoans() {

        const [loans, setLoans] = useState([])
        const [boolean, setBoolean] = useState(true)
      
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
      
           httpGetAdmin("loans", "allloans").then(data=>setLoans(data))
      
          },[boolean])
        
      
      console.log(loans)
      
          
        
          if (loans?.length === 0) return <Spinner />
        
        
        //   const handlerDelete = async (e) => {
        //     let buttonId = e.target.id
        //     let email = users[(buttonId)].email
        //     console.log(users[buttonId].email)
        //     let resp = await axios.delete(`${API}/users/deleteprofile`, { data: { email: email }, headers: { "Authorization": "Bearer " + localStorageToken } } )
        //     setBoolean(!boolean)
        //   }
        
      
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
                  <th>Date of Loan</th>
                  <th>Date of Return</th>
                  <th>Returned?</th>
                  <th>Id User</th>
                  <th>Id Article</th>
                </tr>
              </thead>
              <tbody>
                {loans?.map((loan, index) => {
                  return (
                    <tr key={loan.id_loan} className="text-center">
                      <td>{loan.id_loan}</td>
                      <td>{(loan.date_of_loan).split("T")[0]}</td>
                      <td>{(loan.date_of_return).split("T")[0]}</td>
                      <td>{(loan.returned)?"yes":"no"}</td>
                      <td>{loan.userIdUser}</td>
                      <td>{loan.articleIdArticles}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </form>
    </div>  )
}

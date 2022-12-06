import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import "./AdminLoans.css";
import { useNavigate } from "react-router-dom";
import { httpGetAdmin } from "../../services/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";

export default function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [boolean, setBoolean] = useState(true);

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
    httpGetAdmin("loans", "allloans", localStorageToken).then((data) =>
      setLoans(data)
    );
  }, [boolean]);

  if (loans?.length === 0) return <Spinner />;

  return (
    <div className="container-fluid bg-black d-flex justify-content-center align-items-center mt-4">
      <div className="row vw-100">
        <div className="col-12 d-flex flex-column justify-content-center adminUsersDesign ps-0 pe-0">
          {loans?.map((loan, index) => {
            return (
              <div
                key={loan.id_loan}
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
                        {loan.id_loan}{" "}
                      </p>
                    </div>
                    <div className="col-12 col-md-3">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Date of Loan{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {loan.date_of_loan.split("T")[0]}{" "}
                      </p>
                    </div>

                    <div className="col-12 col-md-3">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Date of Return{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {loan.date_of_return.split("T")[0]}{" "}
                      </p>
                    </div>

                    <div className="col-12 col-md-1">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Returned?{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {loan.returned ? "yes" : "no"}{" "}
                      </p>
                    </div>

                    <div className="col-12 col-md-1">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Id User{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {loan.userIdUser}{" "}
                      </p>
                    </div>

                    <div className="col-12 col-md-1">
                      <p
                        className={
                          index % 2
                            ? "pink text-start paragraphDesign"
                            : "purple text-start paragraphDesign"
                        }
                      >
                        Id Article{" "}
                      </p>
                      <p className="text-start paragraphDesign">
                        {loan.articleIdArticles}{" "}
                      </p>
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

import { useSelector } from "react-redux";
import { contentData } from "../../slices/contentSlice";
import "./LoanDetails.css";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import Button from '../../components/Button/Button';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoanDetails = () => {
  const { content } = useSelector(contentData);
  const [isLoading, setIsLoading] = useState(true);

  console.log(content.id_loan);

  const fakeDateOfReturn = "2022-12-12 06:32:43";

  let cleanDateOfReturn = fakeDateOfReturn.split(" ")[0];

  let cleanDateOfLoan = content.date_of_loan.split("T")[0];

  const localStorageToken = localStorage.getItem("jwt");
  
  const navigate = useNavigate();

  const body = {
    id_loan: content.id_loan
  }

  const returnContent = async() =>{
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }
    let resp = await axios.patch("http://127.0.0.1:3000/loans/myloans/return", body, config);
    navigate("/profileloans")
  }

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <div className="spinnerDesign">
        <Spinner />
      </div>
    );

  return (
    <div className="loanDetailsDesign container-fluid vh-100 bg-black pt-5">
      <div className="row  pt-5 justify-content-around">
        <img
          className="col-xl-3 col bg-black detailImage mt-5"
          src={content.poster}
          alt={content.title}
        />
        <div className="col-xl-7 mt-5 bg-black t ext-light">
          <p>{content.title}</p>
          <p>Date of loan: {cleanDateOfLoan}</p>
          <p>Until: {cleanDateOfReturn}</p>
          <Button
            text={"Return"}
            onClick={returnContent}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
            }
          />
        </div>
      </div>
    </div>
  );
};

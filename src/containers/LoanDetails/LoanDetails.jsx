import { useSelector } from "react-redux";
import { contentData } from "../../slices/contentSlice";
import "./LoanDetails.css";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner/Spinner";

export const LoanDetails = () => {
  
  const { content } = useSelector(contentData);
  const [isLoading, setIsLoading] = useState(true);


  console.log(content);

  const fakeDateOfReturn = '2022-12-12 06:32:43';

  let cleanDateOfReturn = fakeDateOfReturn.split(' ')[0];
  
  let cleanDateOfLoan = content.date_of_loan.split('T')[0];


  
  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
  }, []);


  if (isLoading) return <div className="spinnerDesign"><Spinner /></div>

  return (
    <div className="detailsContainer container-fluid vh-100 bg-black pt-5">
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
      </div>
    </div>
  </div>
  );
};

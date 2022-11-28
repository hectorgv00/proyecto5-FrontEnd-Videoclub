import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewLoan } from "../../slices/contentSlice";
import "./LoanCard.css";

export const LoanCard = ({ content }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(viewLoan({
      content: content
    }))
    navigate(`/profileloans/details`);
  }

  
  return (
    <li key={content.id_loan} className="contentCard text-light">
        <img
          onClick={handleClick}
          width={115}
          height={172}
          className="contentImage"
          src={content.poster}
          alt={content.title}
        />

      <div style={{ color: "black" }}>{content.title}</div>
    </li>
  );
};

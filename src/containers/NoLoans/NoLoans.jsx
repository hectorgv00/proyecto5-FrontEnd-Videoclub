import { useNavigate } from "react-router-dom";
import CyberButton from "../../components/CyberButton/CyberButton";

import "./NoLoans.css";

export const NoLoans = () => {
  const navigate = useNavigate();

  return (
    <div className="noLoansYet text-center">
      <h1>You don't have content to watch yet... </h1>
      <p>Pick something now!</p>
      <div className="d-flex justify-content-center">
        <CyberButton
          text={"Movies"}
          onClick={() => navigate("/movies")}
          className={" d-flex align-items-center me-3"}
        />
        <CyberButton
          text={"Series"}
          onClick={() => navigate("/series")}
          className={"CyberButtonColor d-flex align-items-center ms-3"}
        />
      </div>
    </div>
  );
};

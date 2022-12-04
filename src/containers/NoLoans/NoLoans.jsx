import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

import "./NoLoans.css";

export const NoLoans = () => {
  const navigate = useNavigate();

  return (
    <div className="noLoansYet text-center">
      <h1>You don't have content to watch yet... </h1>
      <p>Pick something now!</p>
      <div className="d-flex justify-content-center">
        <Button
          text={"Movies"}
          onClick={() => navigate("/movies")}
          className={
            "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
          }
        />
        <Button
          text={"Series"}
          onClick={() => navigate("/series")}
          className={
            "fs-3 text-light buttonDesign d-flex align-items-center bgPurple justify-content-center ms-3"
          }
        />
      </div>
    </div>
  );
};

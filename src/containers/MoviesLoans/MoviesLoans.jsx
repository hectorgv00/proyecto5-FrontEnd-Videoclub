import { LoanCard } from "../LoanCard/LoanCard";
import Button from '../../components/Button/Button';
import "./MoviesLoans.css";
import { useNavigate } from "react-router-dom";
import CyberButton from "../../components/CyberButton/CyberButton";

export const MoviesLoans = ({ movies }) => {

  const navigate = useNavigate();

  return (
    <div className="contentRented">
      <h1 className="moviesHeader">Movies</h1>

      {movies.length > 0 ? (
        <ul className="contentGrid">
          {movies?.map((movie) => (
            <LoanCard key={movie.id_loan} content={movie} />
          ))}
        </ul>
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center">
          <p>You don't have movies yet... check out our colecction</p>
          <CyberButton
            text={"Movies"}
            onClick={() => navigate("/movies")}
            className={
              " d-flex align-items-center"
            }
          />
        </div>
      )}
    </div>
  );
};

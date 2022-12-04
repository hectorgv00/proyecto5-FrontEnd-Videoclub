import { LoanCard } from "../LoanCard/LoanCard";
import Button from '../../components/Button/Button';
import "./MoviesLoans.css";
import { useNavigate } from "react-router-dom";

export const MoviesLoans = ({ movies }) => {

  const navigate = useNavigate();

  return (
    <div className="contentRented">
      <h1>Movies</h1>

      {movies.length > 0 ? (
        <ul className="contentGrid">
          {movies?.map((movie) => (
            <LoanCard key={movie.id_loan} content={movie} />
          ))}
        </ul>
      ) : (
        <div>
          <p>You don't have movies yet... check out our colecction</p>
          <Button
            text={"Movies"}
            onClick={() => navigate("/movies")}
            className={
              "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
            }
          />
        </div>
      )}
    </div>
  );
};

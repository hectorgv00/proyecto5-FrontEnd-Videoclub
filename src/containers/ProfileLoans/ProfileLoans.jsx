import "./ProfileLoans.css";
import { useEffect, useState } from "react";
import { getMyLoansMovies, getMyLoansSeries } from "../../utils/httpClient";
import { LoanCard } from "../LoanCard/LoanCard";
// import { Spinner } from "../../components/Spinner/Spinner";

export const ProfileLoans = () => {

  const [movies, setMovies] = useState('');
  const [series, setSeries] = useState('');

  // const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // setIsLoading(true)
    getMyLoansMovies().then(data => setMovies(data))
    // setIsLoading(false)
  }, []);

  useEffect(() => {
    // setIsLoading(true)
    getMyLoansSeries().then(data => setSeries(data))
    // setIsLoading(false)
  }, []);

  
  // if (isLoading) return <Spinner />

  return (
    <div className="profileLoansDesign">
      <h1 className="text-center">Current Rentals</h1>

      <div className="wrap">
        <div className="contentRented">
          <h2>Movies</h2>
          <ul className="contentGrid">
            {movies?.map((movie) => (
              <LoanCard key={movie.id_loan} content={movie} />
            ))}
          </ul>
        </div>

        <br />

        <div className="contentRented">
          <h2>Series</h2>
          <ul className="contentGrid">
            {series?.map((serie) => (
              <LoanCard key={serie.id_loan} content={serie} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

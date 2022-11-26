import "./ProfileLoans.css";
// import fakeMovies from "../../utils/fakeMovies.json";
// import fakeSeries from "../../utils/fakeSeries.json";
// import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import { getMyLoansMovies, getMyLoansSeries } from "../../utils/httpClient";
import { LoanCard } from "../LoanCard/LoanCard";

export const ProfileLoans = () => {

  const [movies, setMovies] = useState('');
  const [series, setSeries] = useState('');
  
  useEffect(() => {
    getMyLoansMovies().then(data => setMovies(data))
  }, []);

  useEffect(() => {
    getMyLoansSeries().then(data => setSeries(data))
  }, []);
  
  console.log(movies);
  console.log(series);
  
  if ( movies.length === 0 || series.length === 0) return <h1>No matches</h1>;

  return (
    <div className="profileLoansDesign">
      <h1 className="text-center">Current Rentals</h1>

      <div className="wrap">
        <div className="contentRented">
          <h2>Movies</h2>
          <ul className="contentGrid">
            {movies.map((movie) => (
              <LoanCard key={movie.id_loan} content={movie} />
            ))}
          </ul>
        </div>

        <br />

        <div className="contentRented">
          <h2>Series</h2>
          <ul className="contentGrid">
            {series.map((serie) => (
              <LoanCard key={serie.id_loan} content={serie} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

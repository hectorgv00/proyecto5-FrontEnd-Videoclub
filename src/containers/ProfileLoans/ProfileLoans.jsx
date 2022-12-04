import "./ProfileLoans.css";
import { useEffect, useState } from "react";
import "../../components/Button/Button.css";
import { httpGet } from "../../utils/httpClient";
import { NoLoans } from "../NoLoans/NoLoans";
import { MoviesLoans } from "../MoviesLoans/MoviesLoans";
import { SeriesLoans } from "../SeriesLoans/SeriesLoans";
import { Spinner } from "../../components/Spinner/Spinner";

export const ProfileLoans = () => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    httpGet("loans", "myloans", "movies").then((data) => setMovies(data));
  }, []);

  useEffect(() => {
    httpGet("loans", "myloans", "series").then((data) => setSeries(data));
  }, []);

  setTimeout(() => {
    setIsLoading(false);
  },1000)

  if (isLoading) return <Spinner />

  if (isLoading === false && movies.length === 0 && series.length === 0) {
    return <NoLoans />;
  } else {
    return (
      <div className="profileLoansDesign">
        <h1 className="text-center">Current Rentals</h1>

        <div className="wrap">
          <MoviesLoans movies={movies} />

          <br />

          <SeriesLoans series={series} />
        </div>
      </div>
    );
  }
};

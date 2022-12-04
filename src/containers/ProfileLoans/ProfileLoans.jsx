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

  if (isLoading) {    return (
    <div className="container-fluid vh-100 bg-black d-flex justify-content-center align-items-center">
      <Spinner />
    </div>
  )}

  if (isLoading === false && movies?.length === 0 && series?.length === 0) {
    return <NoLoans />;
  } else {
    return (
      <div className="container-fluid profileLoansDesign">
        <h1 className="text-center headerRentals">Current Rentals</h1>

        <div className="wrap text-center">
          <MoviesLoans movies={movies} />

          <br />

          <SeriesLoans series={series} />
        </div>
      </div>
    );
  }
};

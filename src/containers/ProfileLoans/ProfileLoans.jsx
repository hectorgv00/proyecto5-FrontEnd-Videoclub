import "./ProfileLoans.css";
import { useEffect, useState } from "react";
import { getMyLoansMovies, getMyLoansSeries } from "../../utils/httpClient";
import { LoanCard } from "../LoanCard/LoanCard";
import Button from "../../components/Button/Button";
import "../../components/Button/Button.css";
import { useNavigate } from "react-router-dom";

export const ProfileLoans = () => {
  const [movies, setMovies] = useState("");
  const [series, setSeries] = useState("");

  // const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/");
    };
  });
  useEffect(() => {
    // setIsLoading(true)
    getMyLoansMovies(jwt).then((data) => setMovies(data));
    // setIsLoading(false)
  });

  useEffect(() => {
    // setIsLoading(true)
    getMyLoansSeries(jwt).then((data) => setSeries(data));
    // setIsLoading(false)
  });

  if (movies.length === 0 && series.length === 0)
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
              "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
            }
          />
        </div>
      </div>
    );

  return (
    <div className="profileLoansDesign">
      <h1 className="text-center">Current Rentals</h1>

      <div className="wrap">
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

        <br />

        <div className="contentRented">
          <h1>Series</h1>
          {series.length > 0 ? (
            <ul className="contentGrid">
              {series?.map((serie) => (
                <LoanCard key={serie.id_loan} content={serie} />
              ))}
            </ul>
          ) : (
            <div>
              <p>You don't have series yet... check out our colecction</p>
              <Button
                text={"Series"}
                onClick={() => navigate("/series")}
                className={
                  "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

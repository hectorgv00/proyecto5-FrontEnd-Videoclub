import "./ProfileLoans.css";
import fakeMovies from "../../utils/fakeMovies.json";
import fakeSeries from "../../utils/fakeSeries.json";
import { ContentCard } from "../ContentCard/ContentCard";

export const ProfileLoans = () => {
  // fake fetching
  console.log(fakeMovies);
  console.log(fakeSeries);

  return (
    <div className="profileLoansDesign">
      <h1 className="text-center">Current Rentals</h1>

      <div className="wrap">
        <div className="contentRented">
          <h2>Movies</h2>
          <ul className="contentGrid">
            {fakeMovies.map((movie) => (
              <ContentCard key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>

        <br />
        <div className="contentRented">
        <h2>Series</h2>
          <ul className="contentGrid">
            {fakeSeries.map((serie) => (
              <ContentCard key={serie.id} movie={serie} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

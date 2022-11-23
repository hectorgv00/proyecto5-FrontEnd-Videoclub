import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ContentDetails.css";
import { httpGet } from "../../utils/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";

export const ContentDetails = () => {
  const userReduxCredentials = useSelector(userData);

  const { contentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    httpGet("/movie/" + contentId).then((data) => {
      setIsLoading(false);

      setMovie(data);
    });
  }, [contentId]);

  if (isLoading) return <Spinner />;

  if (!movie) return null;

  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  if (
    userReduxCredentials?.credentials?.token !== undefined ||
    localStorage.getItem("jwt") !== null
  ) {
    return (
      <div className="detailsContainer container-fluid vh-100 bg-black pt-5">
        <div className="row  pt-5 justify-content-around">
          <img
            className="col-xl-3 col bg-black  detailImage mt-5"
            src={imageURL}
            alt={movie.title}
          />
          <div className="col-xl-7 mt-5 bg-black text-light">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            <Button
              text={"Order"}
              className={
                "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
              }
              onClick={() => navigate("/orders")}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="detailsContainer container-fluid vh-100 bg-black pt-5">
        <div className="row  pt-5 justify-content-around">
          <img
            className="col-xl-3 col bg-black  detailImage mt-5"
            src={imageURL}
            alt={movie.title}
          />
          <div className="col-xl-7 mt-5 bg-black text-light">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
            <h2>
              If you want to watch this movie, please login through the
              following link
            </h2>
            <Button
              text={"Login"}
              className={
                "fs-3 text-light buttonDesign d-flex align-items-center bgPurple justify-content-center ms-3"
              }
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
    );
  }
};

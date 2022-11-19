import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ContentDetails.css";
import { httpGet } from "./httpClient";

export const ContentDetails = () => {
  const { contentId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    httpGet("/movie/" + contentId).then((data) => {
      console.log(data);
      setMovie(data);
    });
  }, [contentId]);

  if (!movie) return null;

  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div className="detailsContainer">
      <img className="col detailImage" src={imageURL} alt={movie.title} />
      <div className="col">
        <p>{movie.title}</p>
        <p>{movie.overview}</p>
        <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </div>
  );
};

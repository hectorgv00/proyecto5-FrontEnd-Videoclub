import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ContentDetails.css";
import { httpGet } from "../../utils/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";

export const ContentDetails = () => {

  const { contentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [movie, setMovie] = useState(null);

  useEffect(() => {

    setIsLoading(true);

    httpGet("/movie/" + contentId).then((data) => {

      setIsLoading(false);

      setMovie(data);
    });
  }, [contentId]);

  if (isLoading) return <Spinner />

  if (!movie) return null;

  const imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div className="detailsContainer bg-black">
      <img className="col detailImage" src={imageURL} alt={movie.title} />
      <div className="col">
        <p>{movie.title}</p>
        <p>{movie.overview}</p>
        <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </div>
  );
};

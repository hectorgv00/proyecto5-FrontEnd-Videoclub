import "./ContentCard.css";
import { Link } from "react-router-dom";
import placerholderImg from "./placeholder.jpg";

export const ContentCard = ({ movie }) => {
  // TODO: refactor to function getImgMovie()
  const imageURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : placerholderImg;

  return (
    <li className="contentCard">
      <Link to={`/content/${movie.id}`}>
        <img
          width={230}
          height={345}
          className="contentImage"
          src={imageURL}
          alt={movie.title}
        />
      </Link>
      <div>{movie.title}</div>
    </li>
  );
};

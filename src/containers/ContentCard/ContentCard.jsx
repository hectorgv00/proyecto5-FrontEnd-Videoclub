import "./ContentCard.css";
import { Link } from "react-router-dom";

export const ContentCard = ({ movie }) => {
  const imageURL = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

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

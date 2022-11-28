import "./ContentCard.css";
import { Link } from "react-router-dom";

export const ContentCard = ({ movie }) => {


  return (
    <li className="contentCard text-light">
      <Link to={`/content/${movie.id_movies}`}>
        <img
          width={230}
          height={345}
          className="contentImage"
          src={movie.poster}
          alt={movie.title}
        />
      </Link>
      <div>{movie.title}</div>
    </li>
  );
};

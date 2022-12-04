import "./ContentCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contentType } from "../../slices/contentSlice";

export const ContentCard = ({ movie, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerRedux = () => {
    dispatch(
      contentType({
        content: type,
      })
    );

    type === "movies"
      ? navigate(`/content/${movie.id_movies}`)
      : navigate(`/content/${movie.id_series}`);
  };

  let title = "";

  if (movie.title.length > 12) {
    title = movie.title.slice(0, 12) + " ...";
  } else {
    title = movie.title;
  }

  return (
    <li onClick={() => handlerRedux()} className="contentCard text-light ">
      <img
        width={230}
        height={345}
        className="contentImage"
        src={movie.poster}
        alt={movie.title}
      />

      <div>{title}</div>
    </li>
  );
};

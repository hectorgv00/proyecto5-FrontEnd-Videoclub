import "./ContentCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contentType } from "../../slices/contentSlice";


export const ContentCard = ({ movie, type }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerRedux =()=>{
    dispatch(contentType({
      content:type
    }))
    
    type=== "movies"?navigate(`/content/${movie.id_movies}`):navigate(`/content/${movie.id_series}`)
    
  }

  return (
    <li onClick={()=> handlerRedux()} className="contentCard text-light">

        <img
          width={230}
          height={345}
          className="contentImage"
          src={movie.poster}
          alt={movie.title}
        />

      <div>{movie.title}</div>
    </li>
  );
};

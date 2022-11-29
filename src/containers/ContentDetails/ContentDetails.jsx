import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ContentDetails.css";
import { httpGet } from "../../utils/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
import Button from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";
import { contentData } from "../../slices/contentSlice";
import axios from "axios";


export const ContentDetails = () => {
  const userReduxCredentials = useSelector(userData);
  const contentType = useSelector(contentData)

  // console.log(contentType)

  const localStorageToken = localStorage.getItem("jwt")

  const { contentId } = useParams();

  // console.log(contentId);

  const [isLoading, setIsLoading] = useState(true);

  const [movie, setMovie] = useState(null);

  const [error, setError] = useState("")

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    httpGet(`/${contentType.content}/id/` + contentId).then((data) => {

      // console.log(data);

      setIsLoading(false);
      
      setMovie(data);
      
    });
  }, [contentId]);

  if (isLoading) return <Spinner />;

  if (!movie) return null;

  // Body to add loan

// console.log(movie[0].articleIdArticles)

  let body = {
    article: movie[0].articleIdArticles
   }

  const addLoan = async() =>{
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }

    let respGet = await axios.get("http://127.0.0.1:3000/loans/myloans",config)
    
    const arrayResponse = respGet.data;


    const filteredArray = arrayResponse.filter((loan)=> loan.articleIdArticles === movie[0].articleIdArticles && loan.returned === false);

    if(filteredArray.length > 0 ){
      setError("This film is already in your loans");
    }else{
    setError("");
    let respLoan = await axios.post("http://127.0.0.1:3000/loans/newloan",body, config);
    navigate("/profileloans")
  }




  }

  if (
    userReduxCredentials?.credentials?.token !== undefined ||
    localStorage.getItem("jwt") !== null
  ) {
    return (
      <div className="detailsContainer container-fluid vh-100 bg-black pt-5">
        <div className="row  pt-5 justify-content-around">
          <img
            className="col-xl-3 col bg-black  detailImage mt-5"
            src={movie[0].poster}
            alt={movie[0].title}
          />
          <div className="col-xl-7 mt-5 bg-black text-light">
            <p>{movie[0].title}</p>
            <p>{movie[0].summary}</p>
            <p>{movie[0].genre}</p>
            <Button
              text={"Order"}
              className={
                "fs-3 text-light buttonDesign d-flex align-items-center bgPink justify-content-center ms-3"
              }
              onClick={addLoan}
            />
          <div className="errorInput mb-3 ft-5"> {error} </div>

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
            src={movie[0].poster}
            alt={movie.title}
          />
          <div className="col-xl-7 mt-5 bg-black text-light">
            <p>{movie[0].title}</p>
            <p>{movie[0].summary}</p>
            <p>{movie[0].genre}</p>
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

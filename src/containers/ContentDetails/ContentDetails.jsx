import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ContentDetails.css";
import { httpGet } from "../../utils/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
// import CyberButton from "../../components/Button/Button";
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";
import { contentData } from "../../slices/contentSlice";
import axios from "axios";
import { API } from "../../utils/httpClient";
import CyberButton from "../../components/CyberButton/CyberButton";

export const ContentDetails = () => {
  const userReduxCredentials = useSelector(userData);
  const contentType = useSelector(contentData);

  const localStorageToken = localStorage.getItem("jwt");

  const { contentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    setIsLoading(true);
    httpGet(contentType.content, "id", contentId)
      .then((data) => setMovie(data))
      .finally(setIsLoading(false));
  }, [contentId, contentType.content]);

  if (isLoading)
    return (
      <div className="container-fluid vh-100 bg-black d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  if (!movie) return null;

  // Body to add loan

  let body = {
    article: movie[0].articleIdArticles,
  };

  const addLoan = async () => {
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }
    let respGet = await axios.get(`${API}/loans/myloans`,config)
    
    const arrayResponse = respGet.data;

    const filteredArray = arrayResponse.filter(
      (loan) =>
        loan.articleIdArticles === movie[0].articleIdArticles &&
        loan.returned === false
    );

    if (filteredArray.length > 0) {
      setError("This film is already in your loans");
    } else {
      setError("");
      let respLoan = await axios.post(
        `${API}/loans/newloan`,
        body,
        config
      );
      navigate("/profileloans");
    }
  };

  if (
    userReduxCredentials?.credentials?.token !== undefined ||
    localStorage.getItem("jwt") !== null
  ) {
    return (
      <div className="detailsContainer container-fluid vh-100 bg-black pt-5 d-flex flex-column justify-content-center mt-5 mt-lg-0 ">
        <div className="row  pt-5 justify-content-evenly mt-5 mt-lg-0 ">
          <img
            className="col-xl-3 col bg-black  detailImage mt-5 mt-lg-0"
            src={movie[0].poster}
            alt={movie[0].title}
          />
          <div className="col-xl-5  bg-black text-light d-flex flex-column justify-content-around bg-gray">
            <h1>{movie[0].title}</h1>
            <p className="mt-5 text-align-justify">{movie[0].summary}</p>
            <p>{movie[0].genre}</p>
            <CyberButton
              text={"Order"}
              className={
                "d-flex align-items-center"
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
      <div className="detailsContainer container-fluid vh-100 bg-black pt-5 d-flex flex-column justify-content-center mt-5 mt-lg-0">
        <div className="row  pt-5 justify-content-evenly mt-5 mt-lg-0">
          <img
            className="col-xl-3 col bg-black  detailImage mt-5 mt-lg-0"
            src={movie[0].poster}
            alt={movie.title}
          />
          <div className="col-xl-5  bg-black text-light d-flex flex-column justify-content-around bg-gray pb-5">
            <h1>{movie[0].title}</h1>
            <p className="mt-5 text-align-justify">{movie[0].summary}</p>
            <p>{movie[0].genre}</p>
            <h3>
              If you want to watch this movie, please login through the
              following link
            </h3>

            <CyberButton
            
            text={"Login"}
            className={
              "d-flex align-items-center "
            }
            onClick={() => navigate("/login")}
            />

          </div>
        </div>
      </div>
    );
  }
};

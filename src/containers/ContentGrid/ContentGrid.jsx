import "./ContentGrid.css";
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { Spinner } from "../../components/Spinner/Spinner";
import { Empty } from "../../components/Empty/Empty";
import { Search } from "../../components/Search/Search";
import { httpGet } from "../../utils/httpClient";

export const ContentGrid = ({ search, title, type }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [target, setTarget] = useState("title");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  console.log(search);

  useEffect(() => {
    setIsLoading(true);

    if (!search) {
      httpGet(type, "page", page).then((data) => {
        setMovies((prevMovies) => prevMovies.concat(data));
        setHasMore(page < 5 || page < 4);
        setIsLoading(false);
      });
    } else {
      httpGet(type, target, search)
        .then((data) => setMovies(data))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
            setHasMore(false);
          }, 1000)
        );
    }
  }, [type, target, search, page]);

  if (isLoading) <Spinner />;

  if (!isLoading && movies.length === 0)
    return (
      <div className="noResults mt-5 pt-5">
        <h1
          onClick={() => navigate("/content")}
          className="contentHeader text-light"
        >
          Enjoy your time with our <span className="direct">{title}</span>
        </h1>
        <Search />
        <div className="extraTargetsButtons">
          <button onClick={() => setTarget("actor")}>Find by actor</button>
          <button onClick={() => setTarget("genre")}>Find by genre</button>
        </div>
        <Empty />
      </div>
    );

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">
        <h1
          onClick={() => navigate("/content")}
          className="contentHeader text-light"
        >
          Enjoy your time with our <span className="direct">{title}</span>
        </h1>

        <Search />
        <div className="extraTargetsButtons">
          <button onClick={() => setTarget("actor")}>Find by actor</button>
          <button onClick={() => setTarget("genre")}>Find by genre</button>
        </div>
      </header>
      <InfiniteScroll
        className="noOverflow"
        dataLength={movies.length}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<Spinner />}
      >
        <ul className="contentGrid">
          {movies.map((movie, index) => (
            <ContentCard key={index} movie={movie} type={type} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

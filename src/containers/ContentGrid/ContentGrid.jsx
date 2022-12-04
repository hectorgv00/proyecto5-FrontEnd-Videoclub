import "./ContentGrid.css";
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Spinner } from "../../components/Spinner/Spinner";
import { Empty } from "../../components/Empty/Empty";
import { Search } from "../../components/Search/Search";
import { httpGet } from "../../utils/httpClient";

export const ContentGrid = ({ search, title, type }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  useEffect(() => {
    setIsLoading(true);

    if (!search) {
      httpGet(type, "page", page).then((data) => {
        if(movies.length < 5){
          setMovies((data));
        }else{
        setMovies((prevMovies) => prevMovies.concat(data));
      }
        setHasMore((type==="movies")?page < 5: page < 2);
        setIsLoading(false);
      });
    } else {

      
      httpGet(type, "title", search)
        .then((data) => setMovies(data))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
            setHasMore(false);
          }, 1000)
        );
    
  }}, [ search, page]);

  if (true) <Spinner />;

  if (!isLoading && movies.length === 0)
    return (
      <div className="noResults mt-5 pt-5">
        <h1
          className="contentHeader text-light"
        >
          Enjoy your time with our <span className="direct">{title}</span>
        </h1>
        <Search />
        <Empty />
      </div>
    );

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">
        <h1
          className="contentHeader text-light"
        >
          Enjoy your time with our <span className="direct">{title}</span>
        </h1>

        <Search />
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

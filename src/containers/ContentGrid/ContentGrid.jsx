import "./ContentGrid.css";
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { httpGet } from "../../utils/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
import { Empty } from "../../components/Empty/Empty";
import {Search} from "../../components/Search/Search";


export const ContentGrid = ({ search }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const searchURL = search
      ? "/search/movie?query=" + search + "&page=" + page
      : "/discover/movie?page=" + page;
    httpGet(searchURL).then((data) => {
      setMovies((prevMovies) => prevMovies.concat(data.results));
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [search, page]);

  if (!isLoading && movies.length === 0) return <Empty />;

  return (
    <div className="bg-black">
      <header className="contentHeader">
        <Search/>
        <Link to="/content">
          <h1>Content</h1>
        </Link>
      </header>
      <InfiniteScroll
        className="noOverflow"
        dataLength={movies.length}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<Spinner />}
      >
        <ul className="contentGrid">
          {movies.map((movie) => (
            <ContentCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

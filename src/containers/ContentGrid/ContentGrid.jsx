import "./ContentGrid.css";
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { httpGet } from "../../utils/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
import { Empty } from "../../components/Empty/Empty";
import { Search } from "../../components/Search/Search";

export const ContentGrid = ({ search, title, type }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    let findURL = "";

    // filtering type of content
    if (type === "movies") {
      findURL = search
        ? "/search/movie?query=" + search + "&page=" + page
        : "/discover/movie?page=" + page;
    }

    if (type === "series") {
      findURL = search 
      ? "/search/tv?query=" + search + "&page" + page
      : "/tv/popular?&language=en-US&page=" + page 
    }

    // fetching by type of content
    httpGet(findURL).then((data) => {
      setMovies((prevMovies) => prevMovies.concat(data.results));
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [type, page, search]);

  if (!isLoading && movies.length === 0) return <Empty />;

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">

        <Link to="/content">
          <h1>{title}</h1>
        </Link>
        <Search/>
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

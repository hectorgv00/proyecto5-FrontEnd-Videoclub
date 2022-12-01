import "./ContentGrid.css";
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()

  console.log(search);

  useEffect(() => {
    setIsLoading(true);

    let findURL = "";

    // filtering type of content
    if (type === "movies") {

      // findURL = "/movies/page/" + page
      // ? "/movies/title/" + search + "&page=" + page

      findURL = search
        ? "/movies/title/" + search
        : "/movies/page/" + page;
    }

    if (type === "series") {

      // findURL = "/series/page/" + page

      findURL = search
        ? "/series/title/" + search
        : "/series/page/" + page;
    }

    // fetching by type of content
    httpGet(findURL).then((data) => {
      // console.log(data);
      setMovies((prevMovies) => prevMovies.concat(data));
      setMovies(data)
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });
  }, [type, page, search]);

  // console.log(movies)

  if (!isLoading && movies.length === 0) return <Empty />;

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">


          <h1 onClick={()=>navigate("/content")} className="contentHeader text-light">Enjoy your time with our <span className="direct">{title}</span></h1>
        
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
          {movies.map((movie, index) => (
            <ContentCard key={index} movie={movie} type={type} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

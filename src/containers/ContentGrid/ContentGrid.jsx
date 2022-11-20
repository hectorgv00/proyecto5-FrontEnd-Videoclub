import "./ContentGrid.css";
import { ContentCard } from "./ContentCard";

import { useEffect, useState } from "react";
import { httpGet } from "./httpClient";
import { Spinner } from "./Spinner";
import { Link, useLocation } from "react-router-dom";

// custom hook
//TODO: useParams() (?)
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const ContentGrid = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery();
  const search = query.get("search");
  console.log(search);

  useEffect(() => {
    setIsLoading(true);
    const searchURL = search
      ? "/search/movie?query=" + search
      : "/discover/movie";
    httpGet(searchURL).then((data) => {
      setIsLoading(false);
      setMovies(data.results);
    });
  }, [search]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <header className="contentHeader">
        <Link to='/content'>
          <h1>Content</h1>
        </Link>
      </header>
      <ul className="contentGrid">
        {movies.map((movie) => (
          <ContentCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
};

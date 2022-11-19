import "./ContentGrid.css";
import { ContentCard } from "./ContentCard";

// import movies from "./movies.json";
import { useEffect, useState } from "react";
import { httpGet } from "./httpClient";

export const ContentGrid = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    httpGet("/discover/movie").then((data) => {
      setMovies(data.results);
    });
  }, []);

  return (
    <>
      <header className="contentHeader">
        <h1>Content</h1>
      </header>
      <ul className="contentGrid">
        {movies.map((movie) => (
          <ContentCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
};

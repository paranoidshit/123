import React, { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [totalPages, setTotalpages] = useState(0);

  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTY0NDVmZmFhZGM1YTk3MTExMzc1ZWZjZTgwZjI4NSIsInN1YiI6IjY2MDU2MmE2ZWNhZWY1MDE2MWFmOTZmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyOzBDk17OtjsjdWwRKA11tdtHqp5gq4L7ff9CxM7Ow";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  async function fetchMovies(searchValue, pageQuery) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/
          search/
          movie?
          query=
          ${searchValue}&
          include_adult=false&
          language=en-US&page=
          ${pageQuery}`,
        options,
      );
      const data = await response.json();
      setIsSuccessful(true);
      setTotalpages(data.total_pages);
      return data;
    } catch (error) {
      setIsSuccessful(false);
      console.error(error);
      return { results: [] };
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);
}
export default App;

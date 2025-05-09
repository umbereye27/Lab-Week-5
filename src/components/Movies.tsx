import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../axios/axiosApi";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

interface Movie {
  id: string;
  titleText: { text: string };
  releaseYear?: { year: number };
  primaryImage?: { url: string };
  genres?: { genres: { text: string }[] };
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularMovies();
        let movieResults = data.results || [];

        if (selectedGenre) {
          movieResults = movieResults.filter((movie: Movie) =>
            movie.genres?.genres.some((g) => g.text === selectedGenre)
          );
        }

        setMovies(movieResults);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre]);

  return (
    <>
      <SearchBar onSearch={(query) => console.log("Search query:", query)} />
      <div className="flex flex-col md:flex-row min-h-screen pt-24 bg-[#141113] ">
        <div className="w-full md:w-1/4 sticky top-10">
          <Sidebar selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
        </div>

        <main className="flex-1 p-4 lg:ml-[-80px]">
          <h1 className="text-white font-extrabold text-2xl py-2">Popular Movies</h1>

          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-black text-white  rounded-lg shadow-md"
                >
                  <img
                    src={
                      movie.primaryImage?.url ||
                      "https://via.placeholder.com/150"
                    }
                    alt={movie.titleText.text}
                    className="w-full h-52 object-cover mb-2 rounded"
                  />
                  <h3 className="font-bold px-2">{movie.titleText.text}</h3>
                  <p className="px-2">{movie.releaseYear?.year || "Unknown Year"}</p>
            
                </div>
              ))}
            </div>
          )}
          <Pagination />  
        </main>
      </div>
    </>
  );
};

export default Movies;

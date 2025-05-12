import React, { useEffect, useState } from "react";
import { fetchMovieByGenre } from "../axios/axiosApi";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import  type {Movie}  from "../type/types"


const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleGenreSelect = (genre: string | null) => {
    setSelectedGenre(genre);
  }
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieByGenre(selectedGenre as string, page);
        let movieResults = data.results || [];

        if (selectedGenre) {
          movieResults = movieResults.filter((movie: Movie) =>
            movie.genres?.genres.some((g) => g.text === selectedGenre)
          );
        }

        setMovies(movieResults);
        setTotalPages(data.totalPages || 0);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre, page]);
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieByGenre(selectedGenre as string, page); 
        const movieResults = data.results || [];
        setMovies(movieResults);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedGenre, page]);
  const handleSearch = (query: string) => {
    const filteredMovies = movies.filter((movie) =>
      movie.titleText.text.toLowerCase().includes(query.toLowerCase())
    );
    setMovies(filteredMovies);
  };
  return (
    <>
      <SearchBar onSearch={(query) => handleSearch(query)}  />
      <div className="flex flex-col md:flex-row min-h-screen pt-24 bg-[#141113] ">
        <div className="w-full md:w-1/4 sticky top-10">
          <Sidebar selectedGenre={selectedGenre} onSelectGenre={setSelectedGenre} />
        </div>

        <main className="flex-1 p-4 lg:ml-[-80px]">
          <h1 className="text-white font-extrabold text-2xl py-2">Movies</h1>

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
          <Pagination onPageChange={setPage} currentPage={page} totalPages={5}/>  
        </main>
      </div>
    </>
  );
};

export default Movies;


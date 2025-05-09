import React, { useState } from "react";
import 'boxicons'

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  initialQuery = "",
}) => {
  const [query, setQuery] = useState<string>(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <header className="flex flex-col md:flex-row  gap-3  md:gap-0 md:justify-between items-center px-4 py-3 text-white fixed top-0 left-0 w-full z-50 bg-[#1a1d24]">
      
          <div className="flex items-center text-2xl font-bold">
            <span className="text-3xl text-gray-400 mr-2">🎬</span>
            Movie Explorer
          </div>

          <div className="relative w-full max-w-md md:mx-4">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-2 px-5 pl-10 rounded-full border-none bg-[#242830] text-white text-base"
              placeholder="Search movies"
            />
          </div>

        
          <button
            type="submit"
            className="px-5 py-2 rounded text-white bg-[#242830] text-base cursor-pointer mt-2 md:mt-0"
          >
            Search
          </button>
        </header>
      </form>
    </div>
  );
};

export default SearchBar;

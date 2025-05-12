import React, { useEffect, useState } from 'react';
import { fetchMovieGenres } from '../axios/axiosApi';
import { Menu, X } from 'lucide-react';
import type { Genre } from '../type/types';

interface SidebarProps {
  selectedGenre: string | null;
  onSelectGenre: (genre: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedGenre, onSelectGenre }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      const data = await fetchMovieGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);


  return (
    <div className='fixed top-0 left-0 w-[10px] bg-[#111f3f41] md:w-55 h-full text-white p-4'>
      <div className="md:hidden flex justify-between items-center p-4 bg-zinc-900 text-white">
        <h2 className="text-lg font-semibold">Filters</h2> 
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle sidebar">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <aside
        className={`
          ${isOpen ? 'block' : 'hidden'} 
          md:block 
          w-full md:w-64 p-4 text-white  space-y-2
        `}
      >
        <div className='text-white'>
          <h2 className="text-lg font-semibold mb-4 pt-11">Genres</h2>
          <div className="space-y-1">
            {genres.length === 0 ? (
              <div className="text-gray-400">Loading genres...</div>
            ) : (
              genres.map((genre) => (
                <label
                  key={genre.id}
                  className="flex items-center space-x-2 cursor-pointer text-bold text-xs"
                  onClick={() => {
                    if (selectedGenre === genre.name) {
                      
                      onSelectGenre(null);
                    } else {
                      onSelectGenre(genre.name);
                    }
                  }}
                >
                  <span className={selectedGenre === genre.name ? 'font-bold' : ''}>
                    {genre.name}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm   mt-3 font-bold">Sort By</label>
          <select className="w-[60%] bg-zinc-800 text-white rounded px-2 py-1 text-sm">
            <option value="release">Release Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

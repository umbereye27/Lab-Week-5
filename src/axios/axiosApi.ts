import axios from 'axios';

const API_KEY = '2773656ba3msh7c9f369cad28bc3p1911f6jsn24fbbd49e8b2'; 
const API_HOST = 'moviesdatabase.p.rapidapi.com';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(
      `https://${API_HOST}/titles?startYear=2010&endYear=2024`, {
        params: {
          page,
        },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};




export interface Genre {
  id: number;
  name: string;
}

export const fetchGenres = async (): Promise<Genre[]> => {
  const genreNames = [
    "Action", "Adventure", "Animation", "Comedy",
    "Documentary", "Drama", "Family","Game-Show",
    "History", "Horror", "Music", "Reality-TV",
    "Romance"
  ];

  return genreNames.map((name, index) => ({
    id: index + 1,
    name
  }));
};

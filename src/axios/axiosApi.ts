import axios from 'axios';
import type { Genre } from '../type/types';


const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
const API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const API = axios.create({
  baseURL: `https://${API_HOST}/`,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
})


export const fetchMovieByGenre = async (genre ="All", 
  page = 1) => {

  try {
  
    const response = await API.get('titles', {
      params: {
        startYear: 2010,
        endYear: 2025,
        page,
        genre,
      },
    });

    return response.data;
  } catch (error) {

    throw error;
  }
};


export const fetchMovieGenres =  async (): Promise<Genre[]> => {
  try {
    const response = await API.get('titles/utils/genres');
    return response.data?.results.map((genre: string, index: number) => ({
      name: genre , id: index + 1
    }));
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
}

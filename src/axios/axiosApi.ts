import axios from 'axios';
import type { Genre } from '../common/types';

const API_KEY = '2773656ba3msh7c9f369cad28bc3p1911f6jsn24fbbd49e8b2'; 
const API_HOST = 'moviesdatabase.p.rapidapi.com';

export const API = axios.create({
  baseURL: `https://${API_HOST}/`,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': API_HOST,
  },
})

// API.interceptors.response.use(
//   (response) => {
//     // console.log('API Responseeeeeeeeeee:', response.data.results[0]);
//     return response;
  
//   },
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

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

    // console.log("LENGS======>", response.data.results.length);
    return response.data;
  } catch (error) {
    // console.error('Error fetching movies:', error);
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
// export const fetchMoviesByGenre = async (genre: string, page = 1) => {
//   try {
//     const response = await API.get('titles', {
//       params: {
//         genre,
//         page,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching movies by genre:', error);
//     throw error;
//   }
// }
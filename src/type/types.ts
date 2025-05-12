

export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: string;
  titleText: { text: string };
  releaseYear?: { year: number };
  primaryImage?: { url: string };
  genres?: { genres: { text: string }[] };
}

 export interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}
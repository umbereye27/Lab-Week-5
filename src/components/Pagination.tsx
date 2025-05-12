
interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({onPageChange, currentPage, totalPages}: PaginationProps) => {
    // const [setDisplayPage, setDisplayPage] = useState<boolean>();
    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
        onPageChange(page);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
        }else{
            onPageChange(totalPages);
        }
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
        onPageChange(currentPage - 1);
        }else{
            onPageChange(1);
        }
    }
  return (
    <div className="flex items-center justify-end px-4 py-6  text-white text-sm rounded-md">
      <button className="px-3 py-1 rounded hover:bg-gray-700" onClick={handlePreviousPage}>Previous</button>

     
        {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-3 mx-2 py-1 rounded ${
            currentPage === index + 1 ? "bg-white text-black" : "bg-gray-800 hover:bg-gray-700" 
        
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
        ))}
        <button className="px-3 py-1 rounded hover:bg-gray-700" onClick={handleNextPage}>Next</button>
      </div>
  );
};

export default Pagination;
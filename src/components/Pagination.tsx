const Pagination = () => {
  return (
    <div className="flex items-center justify-end px-4 py-6  text-white text-sm rounded-md">
      <button className="px-3 py-1 rounded hover:bg-gray-700">Previous</button>

      <div className="flex space-x-1 ml-4">
        <button className="px-3 py-1 bg-white text-black rounded">1</button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
          2
        </button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
          3
        </button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
          4
        </button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
          5
        </button>
        <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded">
          6
        </button>
        <button className="px-3 py-1 rounded hover:bg-gray-700">Next</button>
      </div>

      
    </div>
  );
};

export default Pagination;

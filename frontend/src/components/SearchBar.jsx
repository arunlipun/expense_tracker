import React from 'react'

const SearchBar = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="w-full md:w-96">
      <input
        type="text"
        placeholder="Search transaction..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="
          w-full
          px-4
          py-2
          border
          border-gray-200
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />
    </div>
  );
};

export default SearchBar;

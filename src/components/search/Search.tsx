import React from "react";

const Search: React.FC = () => {
  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50"
      />
    </div>
  );
};

export default Search;

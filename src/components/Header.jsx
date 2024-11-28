import React from "react";

export const Header = ({ trainerName, handleLogout }) => {
  return (
    <header className="px-12 flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold font-moderustic gap-4 md:gap-0">
        {trainerName} Pokedex
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

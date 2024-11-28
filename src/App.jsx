import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [trainerName, setTrainerName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (trainerName) {
      localStorage.setItem("trainerName", trainerName);
      navigate("/pokedex");
    }
  };

  return (
    <form className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold font-moderustic my-4">
        Welcome Trainer to the Pokedex!
      </h1>
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Enter your name"
          value={trainerName}
          onChange={(e) => setTrainerName(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 w-full font-semibold font-outfit"
        />
        <button
          onClick={handleStart}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Start
        </button>
      </div>
    </form>
  );
};

export default App;

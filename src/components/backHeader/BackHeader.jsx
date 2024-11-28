import React from "react";
import { useNavigate } from "react-router-dom";

const BackHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-slate-700 w-full p-4 flex justify-start items-center">
      <button
        onClick={() => navigate(-1)} // Va una página atrás en el historial
        className="text-white font-bold px-4 py-2 bg-slate-500 rounded-md hover:bg-slate-600"
      >
        ⬅ Go Back
      </button>
    </header>
  );
};

export default BackHeader;

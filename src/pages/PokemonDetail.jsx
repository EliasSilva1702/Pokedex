import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PokemonImg } from "../components/PokemonImg";
import BackHeader from "../components/backHeader/BackHeader";
const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const movesPerPage = 10; // Movimientos por página

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.error("Error fetching Pokémon:", err));
  }, [id]);

  if (!pokemon) {
    return (
      <h1 className="text-2xl md:text-4xl font-bold font-moderustic my-4">
        Loading...
      </h1>
    );
  }

  // Calcular movimientos para la página actual
  const totalMoves = pokemon.moves.length;
  const totalPages = Math.ceil(totalMoves / movesPerPage);
  const startIndex = (currentPage - 1) * movesPerPage;
  const currentMoves = pokemon.moves.slice(
    startIndex,
    startIndex + movesPerPage
  );

  // Función para manejar el cambio de página
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generar números de página visibles
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, totalPages];
    } else if (currentPage > totalPages - 4) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  };

  return (
    <div className="mx-auto flex flex-col justify-center items-center">
      <BackHeader />
      {/* Detalles del Pokémon */}
      <section className="flex flex-col items-center justify-center mx-auto my-4 w-full p-6 bg-slate-500 rounded-lg">
        <h1 className="text-2xl md:text-4xl font-bold font-moderustic my-4 uppercase">
          {pokemon.name || "Unknown Pokémon"}
        </h1>

        <PokemonImg pokemon={pokemon} />

        <div className="">
          <p className="font-semibold">Pokedex Number: {pokemon.id}</p>
          <p className="font-semibold">Weight: {pokemon.weight}</p>
          <p className="font-semibold">Height: {pokemon.height}</p>
        </div>
      </section>

      <div className="flex gap-16 justify-center items-start">
        <div className="my-4">
          <h2 className="text-2xl font-bold my-4 uppercase">Types</h2>
          <ul className="flex flex-col gap-4 text-center text-sm md:text-base lg:text-lg">
            {pokemon.types?.map((type) => (
              <li
                className="font-semibold bg-slate-500 rounded-lg text-white px-3 py-2  items-center"
                key={type.type.name}
              >
                {type.type.name}
              </li>
            )) || <p>No types available</p>}
          </ul>
        </div>

        <section className="my-4">
          <h2 className="text-2xl font-bold my-4 uppercase">Abilities</h2>
          <ul className="flex flex-col gap-4 text-center text-sm md:text-base lg:text-lg">
            {pokemon.abilities.map((ability) => (
              <li
                className="font-semibold bg-slate-500 rounded-lg text-white px-3 py-2 items-center"
                key={ability.ability.name}
              >
                {ability.ability.name}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="my-4 p-6 bg-slate-500 rounded-lg w-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold uppercase">Stats</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li className="my-4 text-xl font-semibold" key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </section>

      {/* Movimientos con paginación */}
      <section className="my-4 border w-full p-6 bg-slate-500 rounded-lg">
        <h2 className="text-2xl font-bold uppercase text-center">Moves</h2>
        <ul className="my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentMoves.map((move) => (
            <li
              key={move.move.name}
              className="font-semibold bg-white text-slate-700 px-3 py-2 rounded-md text-center shadow-md"
            >
              {move.move.name}
            </li>
          ))}
        </ul>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {/* Flecha anterior */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
            }`}
          >
            &larr;
          </button>

          {/* Páginas visibles */}
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-3 py-2">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-md ${
                  page === currentPage
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Flecha siguiente */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-white"
            }`}
          >
            &rarr;
          </button>
        </div>
      </section>
    </div>
  );
};

export default PokemonDetail;

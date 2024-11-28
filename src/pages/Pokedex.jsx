import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "../components/Header";
import { PokemonImg } from "../components/PokemonImg";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const trainerName = localStorage.getItem("trainerName");

  useEffect(() => {
    if (!trainerName) {
      navigate("/");
    } else {
      // Cargar la lista de Pokémon
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=100")
        .then(async (res) => {
          const promises = res.data.results.map((pokemon) =>
            axios.get(pokemon.url).then((response) => response.data)
          );
          const detailedPokemon = await Promise.all(promises);
          setPokemonList(detailedPokemon); // Lista completa con sprites
        });

      // Cargar los tipos de Pokémon
      axios.get("https://pokeapi.co/api/v2/type").then((res) => {
        setTypes(res.data.results);
      });
    }
  }, [trainerName, navigate]);

  // Filtrar Pokémon por búsqueda y tipo
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.includes(search.toLowerCase());
    const matchesType =
      selectedType === "" ||
      pokemon.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  const handleLogout = () => {
    localStorage.removeItem("trainerName"); // Elimina el nombre del entrenador
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <div className="font-host">
      <Header trainerName={trainerName} handleLogout={handleLogout} />

      <section className="p-4">
        <div className="flex flex-wrap items-center gap-4 justify-center my-8">
          <input
            type="text"
            placeholder="Search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-fit font-semibold font-outfit"
          />

          <select
            onChange={(e) => setSelectedType(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 w-fit font-semibold font-outfit"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pokemon-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPokemon.map((pokemon) => (
            <div
              key={pokemon.name}
              className="pokemon-card mx-auto w-fit border-2 border-gray-300 rounded-md p-2 m-2 hover:bg-gray-200"
              onClick={() => navigate(`/pokedex/${pokemon.name}`)}
            >
              <h2 className="text-center text-xl font-bold">{pokemon.name}</h2>
              <PokemonImg pokemon={pokemon} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pokedex;

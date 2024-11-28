import React from "react";

export const PokemonImg = ({ pokemon }) => {
  return (
    <img
      src={pokemon.sprites?.front_default || "placeholder-image-url"}
      alt={pokemon.name || "Unknown Pokémon"}
      className="my-4"
      width={200}
      height={100}
    />
  );
};

import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemonData(null);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="Pokemon-App">
      <h1>Pokémon Pokédex</h1>
      <input
        type="text"
        placeholder="Enter Pokémon name or ID"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button onClick={fetchPokemon}>Search</button>

      {pokemonData && (
        <div className="total-data">
          <h2 className="name">{capitalizeFirstLetter(pokemonData.name)}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />

          <div className="details">
            <h3>Details:</h3>
            <p>Height: {pokemonData.height / 10} meters</p>
            <p>Weight: {pokemonData.weight / 10} kg</p>
          </div>

          <div className="types">
            <h3>Types:</h3>
            <p>
              {pokemonData.types
                .map((type) => capitalizeFirstLetter(type.type.name))
                .join(", ")}
            </p>
          </div>

          <div className="abilities">
            <h3>Abilities:</h3>
            <p>
              {pokemonData.abilities
                .map((ability) => capitalizeFirstLetter(ability.ability.name))
                .join(", ")}
            </p>
          </div>

          <div className="stats">
            <h3>Stats:</h3>
            {pokemonData.stats.map((stat) => (
              <p key={stat.stat.name}>
                {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
              </p>
            ))}
          </div>

          {/* <div className="moves">
          <h3>Moves:</h3>
          <ul>
            {pokemonData.moves.map((move) => (
              <li key={move.move.name}>
                {capitalizeFirstLetter(move.move.name)}
              </li>
            ))}
          </ul>
        </div> */}
        
        </div>
      )}
    </div>
  );
}

export default App;

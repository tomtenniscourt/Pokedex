import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemonData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    setPokemonData(null);
  }, [pokemonName]);

  return (
    <div className="Pokemon-App container">
      <h1 className="text-center mt-5">Pokémon Pokédex</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Pokémon name or ID"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchPokemon}>
          Search
        </button>
      </div>

      {pokemonData && (
        <motion.div
          key={pokemonData.id} 
          className="total-data mt-5"
        >
          {/* Image Animation */}
                   <h2 className="name">{capitalizeFirstLetter(pokemonData.name)}</h2>
            
            <motion.img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />


          {/* Delayed Data */}
          {!isLoading && (
            <motion.div
              className="details-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
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
                    .map((ability) =>
                      capitalizeFirstLetter(ability.ability.name)
                    )
                    .join(", ")}
                </p>
              </div>

              <div className="stats">
                <h3>Stats:</h3>
                <div className="bulletpoints">
                {pokemonData.stats.map((stat) => (
                  <p key={stat.stat.name}>
                    {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
                  </p>
                ))}
                </div>
              </div>

              <div className="details">
                <h3>Details:</h3>
                <p>Height: {pokemonData.height / 10} meters</p>
                <p>Weight: {pokemonData.weight / 10} kg</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;

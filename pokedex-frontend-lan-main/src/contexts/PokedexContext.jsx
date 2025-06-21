import { createContext, useContext, useState } from "react";
import pokemonList from "../data/pokemonList";

const PokedexContext = createContext();

export function usePokedex() {
    return useContext(PokedexContext)
}

export function PokedexProvider({ children }) {
    const [ownedPokemon, setOwnedPokemon] = useState([]);
    const [teams, setTeams] = useState([[]]);

}

function toggleOwned(id) {
    setOwnedPokemon((prev) =>
    prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
);
}

function addTeam() {
    setTeams((prev) => [...prev, []]);
}

function addToTeam(teamIndex, id) {
    setTeams((prev) => {
        const newTeams = [...prev];
        const team = newTeams[teamIndex];
        if (!team.includes(id) && team.length < 6) {
            newTeams[teamIndex] = [...team, id];
        }
        return newTeams;
    });
}

function removeFromTeam(teamIndex, id) {
    setTeams((prev) => {
        const newTeams = [...prev];
        newTeams[teamIndex] = newTeams[teamIndex].filter((pid) => pid !== id);
    })
}

return (
    <PokedexContext.Provider
    value={{
        pokemonList,
        ownedPokemon,
        toggleOwned,
        teams,
        addTeam,
        addToTeam,
        removeFromTeam,
    }}
    >
        {children}
    </PokedexContext.Provider>
);


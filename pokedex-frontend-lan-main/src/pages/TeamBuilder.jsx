import { useState, useEffect } from "react";

const allPokemons = [
    "Pikachu", "Caterpie", "Pidgey", "Bulbasaur", "Squirtle", "Charmander",
];

export default function TeamBuilder() {
    const [team, setTeam] = useState (() => {
        const saved = localStorage.getItem("team");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("team", JSON.stringify(team));

    }, [team]);

    function togglePokemon(pokemon) {
        if (team.includes(pokemon)) {
            setTeam(team.filter(p => p !== pokemon));

        } else {
            if (team.lenght >= 6) return alert("seu time pode ter até 6 pokémon.");
            setTeam([...team, pokemon]);
        }
    }
    return (
        <div>
            <h2>Montar Time</h2>
            <h3>Seu time ({team.length}/6):</h3>
            <ul>
                {team.map((p, i) => <li key={i}>{p}</li>)}            
            </ul>
                <h3>Pokémon disponíveis:</h3>
                <div style={{display: "flex", flexWrap: "wrap", gap: "10px"}}>
                    {allPokemons.map((pokemon, index) => (
                        <button
                        key={index}
                        onClick={() => togglePokemon(pokemon)}
                        style={{
                            padding: "8px 12px",
                            backgroundColor: team.includes(pokemon) ? "lightgreen" : "lightgray"
                        }} >
                            {team.includes(pokemon) ? "Remover" : "Adicionar"} {pokemon}
                            </button>

                        ))}
                </div>
        </div>
    )

}
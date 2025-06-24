import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegionCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemonIds, setSelectedPokemonIds] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/pokemons")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch(() => setError("Erro ao carregar pokémons"));
  }, [user, navigate]);

  const togglePokemon = (id) => {
    setSelectedPokemonIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/regions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pokemonIds: selectedPokemonIds }),
      });

      if (res.ok) {
        navigate("/regions");
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao criar região");
      }
    } catch {
      setError("Erro ao criar região");
    }
  };

  if (!user) return null;

  return (
    <div>
      <h2>Criar Nova Região</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </label>

        <h4>Selecione os Pokémons:</h4>
        <ul style={{ maxHeight: 200, overflowY: "auto" }}>
          {pokemons.map((p) => (
            <li key={p.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPokemonIds.includes(p.id)}
                  onChange={() => togglePokemon(p.id)}
                />
                {p.name} (#{p.number})
              </label>
            </li>
          ))}
        </ul>

        <button type="submit">Salvar</button>
        <button
          type="button"
          onClick={() => navigate("/regions")}
          style={{ marginLeft: 8 }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeamsCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState({
    name: "",
    pokemonIds: [],
    userId: null,
  });

  const [pokemons, setPokemons] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setTeam((prev) => ({ ...prev, userId: user.id }));
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch(() => setErro("Erro ao carregar Pokémons"));
  }, []);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const togglePokemon = (id) => {
    setTeam((prev) => {
      const updatedIds = prev.pokemonIds.includes(id)
        ? prev.pokemonIds.filter((pid) => pid !== id)
        : [...prev.pokemonIds, id];
      return { ...prev, pokemonIds: updatedIds };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: team.name,
          userId: user.id,
          pokemonIds: team.pokemonIds, // ✅ CORRETO
        }),
      });

      if (res.ok) {
        navigate("/teams");
      } else {
        const data = await res.json();
        if (typeof data.message === "string") {
          setErro(data.message);
        } else if (typeof data.message === "object") {
          setErro(JSON.stringify(data.message));
        } else {
          setErro("Erro ao criar time.");
        }
      }
    } catch (err) {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h2>Criar Novo Time</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do Time"
          value={team.name}
          onChange={handleChange}
          required
        />

        <h4>Escolha até 6 Pokémons:</h4>
        <ul>
          {pokemons.map((poke) => (
            <li key={poke.id}>
              <label>
                <input
                  type="checkbox"
                  checked={team.pokemonIds.includes(poke.id)}
                  onChange={() => togglePokemon(poke.id)}
                  disabled={
                    !team.pokemonIds.includes(poke.id) &&
                    team.pokemonIds.length >= 6
                  }
                />
                {poke.name} ({poke.type})
              </label>
            </li>
          ))}
        </ul>

        <button type="submit">Criar Time</button>
      </form>

      {erro && (
        <p style={{ color: "red" }}>
          {typeof erro === "string" ? erro : JSON.stringify(erro)}
        </p>
      )}
    </div>
  );
}

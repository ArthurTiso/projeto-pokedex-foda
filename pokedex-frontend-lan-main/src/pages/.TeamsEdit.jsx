import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function TeamsEdit() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/teams/${id}`)
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch(() => setErro("Erro ao carregar o time"));
  }, [id, user]);

  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch(() => setErro("Erro ao carregar pokémons"));
  }, []);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const togglePokemon = (pokeId) => {
    setTeam((prev) => {
      const selected = prev.pokemons.map((p) => p.id);
      const updatedIds = selected.includes(pokeId)
        ? selected.filter((id) => id !== pokeId)
        : [...selected, pokeId];
      return { ...prev, pokemons: updatedIds.map(id => ({ id })) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pokemonIds = team.pokemons.map(p => p.id);

    try {
      const res = await fetch(`http://localhost:3000/teams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: team.name, pokemonIds }),
      });

      if (res.ok) {
        navigate("/teams");
      } else {
        const data = await res.json();
        setErro(data.message || "Erro ao atualizar time.");
      }
    } catch {
      setErro("Erro ao conectar com o servidor.");
    }
  };

  if (!team) return <p>Carregando time...</p>;

  const selectedIds = team.pokemons.map(p => p.id);

  return (
    <div>
      <h2>Editar Time</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nome do Time"
          value={team.name}
          onChange={handleChange}
          required
        />

        <h4>Pokémons no time:</h4>
        <ul>
          {pokemons.map((poke) => (
            <li key={poke.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(poke.id)}
                  onChange={() => togglePokemon(poke.id)}
                  disabled={
                    !selectedIds.includes(poke.id) &&
                    selectedIds.length >= 6
                  }
                />
                {poke.name}
              </label>
            </li>
          ))}
        </ul>

        <button type="submit">Salvar Alterações</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

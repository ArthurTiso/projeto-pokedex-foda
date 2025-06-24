import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function TeamDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [error, setError] = useState("");

  // Protege rota
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Buscar o time com os pokémons pelo id
    fetch(`http://localhost:3000/teams/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar time");
        return res.json();
      })
      .then((data) => {
        setTeam(data);
      })
      .catch(() => {
        setError("Erro ao carregar time");
      });
  }, [id, user, navigate]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!team) return <p>Carregando time...</p>;

  return (
    <div>
      <h2>Time: {team.name}</h2>
      <h3>Pokémons do time:</h3>
      <ul>
        {team.pokemons.length === 0 && <li>Sem pokémons no time</li>}
        {team.pokemons.map((poke) => (
          <li key={poke.id}>
            {poke.name} ({poke.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

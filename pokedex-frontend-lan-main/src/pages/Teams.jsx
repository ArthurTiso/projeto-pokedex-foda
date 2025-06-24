import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Teams() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => {
        setErro("Erro ao carregar times");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deseja realmente deletar este time?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/teams/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTeams((prev) => prev.filter((team) => team.id !== id));
      } else {
        alert("Erro ao deletar time");
      }
    } catch {
      alert("Erro ao deletar time");
    }
  };

  if (loading) return <p>Carregando times...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <div>
      <h2>Meus Times</h2>
      <button onClick={() => navigate("/teams/create")}>Criar Novo Time</button>
      <ul>
        {teams.map((team) => (
          <li key={team.id} style={{ marginBottom: "1em" }}>
            <strong>{team.name}</strong> — Criado por: {team.user?.name || team.user?.email}
            <button onClick={() => navigate(`/teams/edit/${team.id}`)} style={{ marginLeft: 8 }}>
              Editar
            </button>
            <button onClick={() => handleDelete(team.id)} style={{ marginLeft: 8 }}>
              Deletar
            </button>
            <div>
              Pokémons:{" "}
              {team.pokemons?.map((p) => (
                <span key={p.id} style={{ marginRight: 8 }}>
                  {p.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
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
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar times");
        return res.json();
      })
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => {
        setErro("Erro ao carregar times");
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) return <p>Carregando times...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <div>
      <h2>Seus Times</h2>
      <button onClick={() => navigate("/teams/create")}>Criar Novo Time</button>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <strong>{team.name}</strong>
            <button onClick={() => navigate(`/teams/edit/${team.id}`)} style={{ marginLeft: 8 }}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

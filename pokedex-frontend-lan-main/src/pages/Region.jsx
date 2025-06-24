import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function Region() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:3000/regions")
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar regiões");
        return res.json();
      })
      .then(data => {
        setRegions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar regiões");
        setLoading(false);
      });
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar esta região?")) return;

    try {
      const res = await fetch(`http://localhost:3000/regions/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRegions(prev => prev.filter(region => region.id !== id));
      } else {
        alert("Erro ao deletar região");
      }
    } catch {
      alert("Erro ao deletar região");
    }
  };

  if (loading) return <p>Carregando regiões...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Regiões</h2>
      <button onClick={() => navigate("/regions/create")}>Criar Nova Região</button>
      <ul>
        {regions.map(region => (
          <li key={region.id} style={{ marginBottom: "1em" }}>
            <strong>{region.name}</strong>
            <button onClick={() => navigate(`/regions/edit/${region.id}`)} style={{ marginLeft: 8 }}>
              Editar
            </button>
            <button onClick={() => handleDelete(region.id)} style={{ marginLeft: 8 }}>
              Deletar
            </button>
            <ul style={{ marginTop: "0.5em" }}>
              {region.pokemons.length > 0 ? (
                region.pokemons.map(pokemon => (
                  <li key={pokemon.id}>
                    {pokemon.name} (#{pokemon.number}) - Tipo: {pokemon.type}
                  </li>
                ))
              ) : (
                <li>Não há pokémons nesta região.</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

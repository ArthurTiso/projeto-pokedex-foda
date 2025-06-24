import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, useParams } from "react-router-dom";

export default function RegionEdit() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:3000/regions/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Erro ao carregar região");
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar região");
        setLoading(false);
      });
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/regions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        navigate("/regions");
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao atualizar região");
      }
    } catch {
      setError("Erro ao atualizar região");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Região</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
        </label>
        <br />
        <button type="submit">Salvar</button>
        <button type="button" onClick={() => navigate("/regions")} style={{ marginLeft: 8 }}>
          Cancelar
        </button>
      </form>
    </div>
  );
}

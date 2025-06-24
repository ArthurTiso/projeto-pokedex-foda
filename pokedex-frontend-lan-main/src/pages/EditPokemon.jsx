import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function EditPokemon() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [regions, setRegions] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch(() => setErro("Erro ao buscar Pokémon."));

    fetch("http://localhost:3000/regions")
      .then((res) => res.json())
      .then((data) => setRegions(data))
      .catch(() => setErro("Erro ao carregar regiões"));
  }, [id]);

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!form) return <p>Carregando...</p>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/pokemons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          number: parseInt(form.number),
          height: parseFloat(form.height),
          weight: parseFloat(form.weight),
          hp: parseInt(form.hp),
          attack: parseInt(form.attack),
          defense: parseInt(form.defense),
          regionId: parseInt(form.regionId)
        }),
      });

      if (res.ok) {
        navigate("/collection");
      } else {
        const data = await res.json();
        setErro(data.message || "Erro ao editar.");
      }
    } catch (err) {
      setErro("Erro de conexão.");
    }
  };

  return (
    <div>
      <h2>Editar Pokémon</h2>
      <form onSubmit={handleSubmit}>
        {["name", "number", "type", "height", "weight", "hp", "attack", "defense"].map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div>
          <label>
            Região:
            <select
              name="regionId"
              value={form.regionId || ""}
              onChange={(e) => setForm({ ...form, regionId: parseInt(e.target.value) })}
              required
            >
              <option value="">Selecione uma região</option>
              {regions.map((r) => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit">Salvar Alterações</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

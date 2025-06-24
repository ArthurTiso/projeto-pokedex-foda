import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function EditPokemon() { 
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => setForm(data))
      .catch((err) => setErro("Erro ao buscar Pokémon."));
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
          defense: parseInt(form.defense)
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
        <button type="submit">Salvar Alterações</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

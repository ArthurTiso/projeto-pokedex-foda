import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function CreatePokemon() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    number: "",
    type: "",
    height: "",
    weight: "",
    hp: "",
    attack: "",
    defense: ""
  });

  const [erro, setErro] = useState("");

  // Protege rota
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          number: parseInt(form.number),
          height: parseFloat(form.height),
          weight: parseFloat(form.weight),
          hp: parseInt(form.hp),
          attack: parseInt(form.attack),
          defense: parseInt(form.defense)
        })
      });

      if (res.ok) {
        navigate("/collection");
      } else {
        const data = await res.json();
        setErro(data.message || "Erro ao criar Pokémon.");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <div>
      <h2>Cadastrar Pokémon</h2>
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
        <button type="submit">Cadastrar</button>
      </form>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
    </div>
  );
}

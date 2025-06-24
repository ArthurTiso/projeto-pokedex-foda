import { useAuth } from '../AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Collection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [collection, setCollection] = useState({});
  const [loading, setLoading] = useState(true);

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar pokémons:", err);
        setLoading(false);
      });
  }, []);

  const toggleOwned = (id) => {
    setCollection((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Deseja realmente deletar este Pokémon?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/pokemons/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPokemons((prev) => prev.filter((poke) => poke.id !== id));
      } else {
        alert("Erro ao deletar Pokémon.");
      }
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  if (loading) return <p>Carregando pokémons...</p>;

  return (
    <div>
      <h2>Sua Coleção</h2>
      <p>Bem-vindo, {user.name || user.email}!</p>

      {/* ✅ Botão agora no topo da tela */}
      <button onClick={() => navigate("/create")}>Cadastrar Novo Pokémon</button>

      <ul>
        {pokemons.map((poke) => (
          <li key={poke.id}>
            <strong>{poke.name}</strong> ({poke.type}){' '}
            <button onClick={() => toggleOwned(poke.id)}>
              {collection[poke.id] ? 'Remover da coleção' : 'Adicionar à coleção'}
            </button>

            <button onClick={() => navigate(`/edit/${poke.id}`)}>Editar</button>
            <button onClick={() => handleDelete(poke.id)}>Deletar</button>

            {collection[poke.id] && (
              <div>
                <p><strong>Status:</strong></p>
                <p>
                  HP: {poke.hp} | ATK: {poke.attack} | DEF: {poke.defense}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

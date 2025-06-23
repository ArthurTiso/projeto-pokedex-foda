import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Collection() {
  const { user } = useAuth();
  const [pokemons, setPokemons] = useState([]);
  const [collection, setCollection] = useState({});

  // Protege rota
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Busca os pokémons do backend
  useEffect(() => {
    fetch("http://localhost:3000/pokemons")
      .then((res) => res.json())
      .then((data) => setPokemons(data))
      .catch((err) => console.error("Erro ao buscar pokémons:", err));
  }, []);

  const toggleOwned = (id) => {
    setCollection((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h2>Sua Coleção</h2>
      <p>Bem-vindo, {user.name || user.email}!</p>

      <ul>
        {pokemons.map((poke) => (
          <li key={poke.id}>
            <strong>{poke.name}</strong> ({poke.type}){' '}
            <button onClick={() => toggleOwned(poke.id)}>
              {collection[poke.id] ? 'Remover da coleção' : 'Adicionar à coleção'}
            </button>

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

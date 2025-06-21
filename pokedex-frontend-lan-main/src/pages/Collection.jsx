import { useAuth } from '../AuthContext';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import pokemonList from '../data/pokemonList';

export default function Collection() {
  const { user } = useAuth();
  const [collection, setCollection] = useState({});

  if (!user) {
    return <Navigate to="/login" />;
  }

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
        {pokemonList.map((poke) => (
          <li key={poke.id}>
            <strong>{poke.name}</strong> ({poke.type}){' '}
            <button onClick={() => toggleOwned(poke.id)}>
              {collection[poke.id] ? 'Remover da coleção' : 'Adicionar à coleção'}
            </button>

            {collection[poke.id] && (
              <div>
                <p><strong>Status:</strong></p>
                <p>HP: {poke.stats.hp} | ATK: {poke.stats.atk} | DEF: {poke.stats.def}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

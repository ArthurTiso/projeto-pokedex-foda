import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.includes('@')) {
      setErro("O e-mail precisa conter @");
      return;
    }

    if (!senha) {
      setErro("Digite a senha");
      return;
    }

    try {
      const resposta = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password: senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        login({ id: dados.userId, email: email.trim() });
        navigate('/collection');
      } else {
        setErro(dados.message || "Erro ao fazer login.");
      }
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}

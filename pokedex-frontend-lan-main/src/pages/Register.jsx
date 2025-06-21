  import { useState } from "react";
  import { useNavigate } from "react-router-dom";

  export default function Register() {
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");


console.log("Enviando para backend:", {
  name: nome,
  email,
  password: senha
});


  async function handleSubmit(e) {
  e.preventDefault();

  if (!nome.trim()) {
    setErro("Digite seu nome.");
    return;
  }

  if (!email.includes("@")) {
    setErro("O e-mail precisa conter @");
    return;
  }

  if (!senha) {
    setErro("Digite uma senha");
    return;
  }

  try {
    const resposta = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: nome, email, password: senha }),
    });

    const dados = await resposta.json();
    console.log("Resposta:", resposta.status, dados);

    if (resposta.ok) {
      navigate("/login");
    } else {
      // Se vier erro do Zod (array), mostra o primeiro
      if (Array.isArray(dados.message)) {
        setErro(dados.message[0].message);
      } else {
        setErro(dados.message || "Erro ao registrar.");
      }
    }
  } catch (err) {
    console.error("Erro de conexão:", err);
    setErro("Erro de conexão com o servidor.");
  }
}



    return (
      <div>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
            <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Registrar</button>
        </form>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
      </div>
    );
  }

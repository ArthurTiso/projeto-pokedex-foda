import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Collection from './pages/Collection'
import TeamBuilder from './pages/TeamBuilder'
import Maps from './pages/Maps'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import CreatePokemon from "./pages/CreatePokemon";
import EditPokemon from "./pages/EditPokemon";
import Teams from "./pages/Teams";
import TeamsCreate from "./pages/TeamsCreate";




export default function App() {
  const { user, logout } = useAuth()
  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | { ' '}
       {
  user ? (
    <>
      <Link to="/collection">Sua Coleção</Link> |{' '}
      <Link to="/teams">Times</Link> |{' '}
      <Link to="/maps">Mapas</Link> |{' '}
      <button onClick={() => {logout(); navigate('/');}}
      >Sair</button>
    </>
  ) : (
    <>
      <Link to="/login">Login</Link> | <Link to="/register">Registrar</Link>
    </>
  )
}

        
      </nav>
      <Routes>
        <Route path="/" element={<h1>Pokédex Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/edit/:id" element={<EditPokemon />} />
        <Route path="/teams/create" element={<TeamsCreate />} />
      </Routes>
    </div>
  )
}
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Collection from './pages/Collection'
import TeamBuilder from './pages/TeamBuilder'
import Maps from './pages/Maps'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'


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
      <Link to="/team">Montar Time</Link> |{' '}
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
        <Route path="/team" element={<TeamBuilder />} />
        <Route path="/maps" element={<Maps />} />
      </Routes>
    </div>
  )
}
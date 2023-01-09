import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import Inicial from './pages/Inicial/Inicial';
import Login from './pages/Login/Login';
import Registrar from './pages/Registrar/Registrar';
import RotaGeral from './pages/RotaGeral/RotaGeral';
import RotasProtegidas from './pages/RotasProtegidas/RotasProtegidas';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Contato from './pages/Contato/Contato';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/alunos/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json)
    } catch (err) {
      console.log(err)
    }
  };

  const aluno = useSelector(state => state?.alunos);
  const { alunoLogado } = aluno;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
    <Routes>
      <Route element={<RotaGeral />} >
        <Route path="/" element={user ? <Registrar user={user} /> : <Inicial />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/registrar" element={<Registrar />}/>
        <Route path="/contato" element={<Contato />}/>
      </Route>
      <Route element={<RotasProtegidas alunoLogado={alunoLogado} />} >
          <Route path="/home" element={<Home />} />
        </Route>
    </Routes>
  </Router>
  );
}

export default App;

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
import AreaDoAluno from './pages/AreaDoAluno/AreaDoAluno';
import MudarModalidade from './components/MudarModalidade/MudarModalidade';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json)
    } catch (err) {
      console.log(JSON.stringify(err))
    }
  };

  const aluno = useSelector(state => state?.alunos);
  const { alunoLogado } = aluno;

  useEffect(() => {
    getUser();
    user ? console.log(user): 'Não há user'
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
          {/* <Route path="/mudarModalidade" element={<MudarModalidade />} /> */}
          {/* <Route path="/aluno" element={<AreaDoAluno />} />  Será desenvolvido no módulo 3 /* */}
        </Route>
    </Routes>
  </Router>
  );
}

export default App;

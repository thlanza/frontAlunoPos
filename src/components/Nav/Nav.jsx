import React from 'react';
import { useSelector } from 'react-redux';
import NavLogado from './NavLogado';
import NavPublica from './NavPublica';

const Navbar = ({ aoClicar }) => {
  const aluno = useSelector(state => state?.alunos);
  const { alunoLogado } = aluno;
  return (
    <div>
        {alunoLogado ? (
            <NavLogado aoClicar={aoClicar} logado={alunoLogado} />
        ): (
            <NavPublica aoClicar={aoClicar}/>
        )
        }
    </div>
  )
}

export default Navbar
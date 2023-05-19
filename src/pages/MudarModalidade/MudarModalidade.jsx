import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import useMediaQuery from '../../hooks/useMediaQuery'
import { mudarModalidadeAction } from '../../redux/slices/alunos/alunosSlices';
import { getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';
import { shallowEqual } from 'react-redux';
import store from '../../redux/store';

const MudarModalidade = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const [modalidadeSelecionada, configurarModalidadeSelecionada] = useState("");
  const [modalidadeAlterada, configurarModalidadeAlterada] = useState("");
  const [modalidadePopulada, configurarModalidadePopulada] = useState("");

  const { modalidades, loading } = useSelector(state => state?.modalidades, shallowEqual);
  const { alunoLogado } = useSelector(() => store.getState().alunos, shallowEqual);

  useEffect(() => {
    dispatch(getModalidadesAction());
    configurarModalidadePopulada(popularModalidades());
  }, [dispatch, modalidadeAlterada]);
  
  const popularModalidades = () => {
    const modalidadeAnterior = alunoLogado?.usuario?.modalidade;
    return modalidades.map(modalidade => {
      if (modalidade._id === modalidadeAnterior) {
        return (
          <option disabled value={modalidade._id}>{modalidade.nomeModalidade}</option>
          )
      } else {
        return (
          <option value={modalidade._id}>{modalidade.nomeModalidade}</option>
          )
      } 
  }
  )
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (modalidadeSelecionada === "") {
      alert("Selecione uma opção!");
      return;
    }
    const requisicao = {
      modalidadeEscolhida: modalidadeSelecionada
    }
    const resultado = await dispatch(mudarModalidadeAction(requisicao));
    const modalidadeAlterada = resultado?.payload?.aluno?.modalidade;
    configurarModalidadeAlterada(modalidadeAlterada);
    if (resultado.error) {
      if (resultado.payload.message === 'Não autorizado. Token expirado. Faça login novamente.') {
        alert("Seu token de autorização expirou, logue novamente.");
        return;
      }
      alert("Ocorreu um erro, tente novamente!");
      return;
    } else {
      alert("Modalidade alterada!");
      return;
    }
  }

  return (
    <div>{
      isMobile ? (
        <div className='flex flex-col justify-start items-center'>
        <p className='outlined text-2xl mt-20 ml-5 mb-5'>Escolha sua nova modalidade:</p>
        <form className='mb-3 ml-5 mt-3 font-spartan flex flex-col justify-start items-center' onSubmit={(e) => onSubmit(e)}>
                  {loading ?   
              <ClipLoader
                color={"red"}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> :
              <select onChange={(e) => configurarModalidadeSelecionada(e.target.value)}  className='p-2 mb-2' name="modalidade" id="modalidade">
              <option disabled selected value> -- Selecione uma opção de modalidade-- </option>
              {modalidadePopulada}
              </select>
              }
              <input  className='button-white mt-5' type="submit" value="Alterar" />
        </form>
      </div>
      ) : (
        <div className='flex flex-col justify-start items-center'>
          <p className='outlined text-2xl mt-7 ml-5'>Escolha sua nova modalidade:</p>
          <form className='mb-3 ml-5 mt-3 font-spartan flex flex-col justify-start items-center' onSubmit={(e) => onSubmit(e)}>
                    {loading ?   
                <ClipLoader
                  color={"red"}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /> :
                <select onChange={(e) => configurarModalidadeSelecionada(e.target.value)}  className='p-2 mb-2' name="modalidade" id="modalidade">
                <option disabled selected value> -- Selecione uma opção de modalidade-- </option>
                {modalidadePopulada}
                </select>
                }
                <input  className='button-white mt-2' type="submit" value="Alterar" />
          </form>
        </div>
      )
      }</div>
  )
}

export default MudarModalidade
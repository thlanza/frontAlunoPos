import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import useMediaQuery from '../../hooks/useMediaQuery'
import { getModalidadesAction, mudarModalidadeAction } from '../../redux/slices/modalidades/modalidadeSlices';

const MudarModalidade = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const [modalidadeSelecionada, configurarModalidadeSelecionada] = useState("");

  useEffect(() => {
    dispatch(getModalidadesAction());
  }, [dispatch]);

  const { modalidades, loading} = useSelector(state => state?.modalidades);
  const { alunoLogado } = useSelector(state => state?.alunos);

  const popularModalidades = () => {
    const modalidadeAnterior = alunoLogado?.usuario?.modalidade;
    return modalidades.map(modalidade => {
      if (modalidade._id === modalidadeAnterior) {
        return (
          <option disabled value={modalidade.nomeModalidade}>{modalidade.nomeModalidade}</option>
          )
      } else {
        return (
          <option value={modalidade.nomeModalidade}>{modalidade.nomeModalidade}</option>
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
    const modalidadeAlterada = await dispatch(mudarModalidadeAction(requisicao));
    console.log(modalidadeAlterada);
    if (modalidadeAlterada.error) {
      if (modalidadeAlterada.payload.message === 'Não autorizado. Token expirado. Faça login novamente.') {
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
  //   const listaAtualizada = dispatch(notificarListaPresencaAction(requisicao))
  //   if (listaAtualizada.error || !mes || !ano || !dia){
  //     configurarMsgErro(listaAtualizada.payload.message);
  //     return;
  //   } else {
  //     alert("Notificação bem sucedida!")
  //   }
  //   alert("Modalidade alterada!")    
  // }

  return (
    <div>{
      isMobile ? (
        <div >TODO</div>
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
                {popularModalidades()}
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
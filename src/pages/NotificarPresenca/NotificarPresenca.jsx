import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import { getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from 'date-fns/locale/pt-BR';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { notificarListaPresencaAction } from '../../redux/slices/alunos/alunosSlices';
registerLocale('pt', pt);

const NotificarPresenca = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();
  const [dataInicial, configurarDataInicial] = useState(new Date());
  const [modalidadeSelecionada, configurarModalidadeSelecionada] = useState("");
  const [presenca, configurarPresenca] = useState(""); 
  const [msgErro, configurarMsgErro] = useState("");

  useEffect(() => {
    dispatch(getModalidadesAction());
  }, [dispatch]);

  const { modalidades, loading} = useSelector(state => state?.modalidades);
  const { alunoLogado } = useSelector(state => state?.alunos);
  let primeiroNome = alunoLogado?.usuario?.primeiroNome;
  let sobrenome = alunoLogado?.usuario?.sobrenome;
  let nome = `${primeiroNome} ${sobrenome}`

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = new Date(dataInicial);
    let mes = data.getMonth() + 1 < 10 ? `0${data.getMonth() + 1}` : data.getMonth() + 1;
    let ano = data.getFullYear();
    let dia = data.getDate() < 10 ? `0${data.getDate()}` : data.getDate();
    let stringData = `${dia}/${mes}/${ano}`;
    if (modalidadeSelecionada === "" || presenca == "") {
      alert("Selecione uma opção!");
      return;
    }
    const requisicao = {
      "nomeModalidade": modalidadeSelecionada,
      "dataDaPresenca": stringData,
      "presenca": presenca,
      "nomeAluno": nome
    }
    const listaAtualizada = await dispatch(notificarListaPresencaAction(requisicao))
    if (listaAtualizada.error || !mes || !ano || !dia){
      configurarMsgErro(listaAtualizada.payload.message);
      return;
    } else {
      configurarMsgErro(null);
      alert("Notificação bem sucedida!")
    }
    
  }

 

  return (
    <div>
    {isMobile ? (
        <div className='flex flex-col items-center'>
        {msgErro ? 
        <p className='outlined text-2xl text-red-600 mt-10 mb-3 ml-5'>Estamos com problemas nos servidores. Tente novamente mais tarde.</p>
        :
        <p className='outlined text-2xl mt-10 mb-3 ml-5'>Escolha a data e a modalidade para notificar presença ou falta:</p>  
      }
        
        <form className='mt-5 mb-3 ml-5  font-spartan' onSubmit={(e) => onSubmit(e)}>
                <label className='text-white border border-white p-1' htmlFor="modalidade">Escolha uma modalidade:</label>
                <br /><br />
                {loading ?   
                <ClipLoader
                  color={"red"}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /> :
                <select onChange={(e) => configurarModalidadeSelecionada(e.target.value)}  className='p-2 mt-2' name="modalidade" id="modalidade">
                <option disabled selected value> -- Selecione uma opção de modalidade-- </option>
                {modalidades.map(modalidade => {
                    return (
                    <option value={modalidade.nomeModalidade}>{modalidade.nomeModalidade}</option>
                    )
                }
                )}
            </select>}
            <br /><br />
                <select onChange={(e) => configurarPresenca(e.target.value)} className='p-2 mt-2' name="presenca" id="presenca">
                <option disabled selected value> -- Selecione uma opção de presença-- </option>
                <option value="faltou">Faltou</option>
                <option value="presente">Presente</option>
                </select>
                <br /><br />
                <DatePicker 
                    selected={dataInicial} 
                    className='mb-5 mt-2'
                    onChange={(date) => configurarDataInicial(date)} 
                    locale='pt'
                    dateFormat="dd/MM/yyyy"
                />
                <input  className='button-white mt-2' type="submit" value="Notificar" />
        </form>

    </div>
    ): (
        <div className='flex flex-col justify-start items-center'>
            {msgErro ? 
            <p className='outlined text-2xl text-red-600 mt-3 mb-3 ml-5'>Estamos com problemas nos servidores. Tente novamente mais tarde.</p>
            :
            <p className='outlined text-2xl mt-3 mb-3 ml-5'>Escolha a data e a modalidade para notificar presença ou falta:</p>  
          }
            
            <form className='mt-3 mb-3 ml-5  font-spartan' onSubmit={(e) => onSubmit(e)}>
                    <label className='text-white border border-white p-1' htmlFor="modalidade">Escolha uma modalidade:</label>
                    <br /><br />
                    {loading ?   
                    <ClipLoader
                      color={"red"}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /> :
                    <select onChange={(e) => configurarModalidadeSelecionada(e.target.value)}  className='p-2' name="modalidade" id="modalidade">
                    <option disabled selected value> -- Selecione uma opção de modalidade-- </option>
                    {modalidades.map(modalidade => {
                        return (
                        <option value={modalidade.nomeModalidade}>{modalidade.nomeModalidade}</option>
                        )
                    }
                    )}
                </select>}
                <br /><br />
                    <select onChange={(e) => configurarPresenca(e.target.value)} className='p-2' name="presenca" id="presenca">
                    <option disabled selected value> -- Selecione uma opção de presença-- </option>
                    <option value="faltou">Faltou</option>
                    <option value="presente">Presente</option>
                    </select>
                    <br /><br />
                    <DatePicker 
                        selected={dataInicial} 
                        className='mb-5'
                        onChange={(date) => configurarDataInicial(date)} 
                        locale='pt'
                        dateFormat="dd/MM/yyyy"
                    />
                    <input  className='button-white' type="submit" value="Notificar" />
            </form>

        </div>
    )}
    </div>
    
  )
}

export default NotificarPresenca
import React from 'react'
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery'
import Logo from '../Logo/Logo';
import { IoHomeSharp } from 'react-icons/io5';
import { IoMdContacts } from 'react-icons/io';
import { MdOutlineCircleNotifications, MdChangeCircle } from 'react-icons/md'
import { AiOutlineLogin } from 'react-icons/ai'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/slices/alunos/alunosSlices';

// RiMoneyDollarCircleFill


const IconLink = ({ icon, link, url, onClick }) => {
    return (
        <div className='flex mt-3 items-center'>
            {icon}
            <Link onClick={onClick} to={url} className='ml-3 text-white font-bakbak'>{link}</Link>
        </div>
    )
}

const NavLogado = ({ logado, aoClicar }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cssButton = 'mr-4 outlined dynamic-transition border border-white rounded-xl p-1';
  return (
    <>
     {isMobile ? (
        <div className='h-screen overflow-hidden bg-myblack flex flex-col'>
            <Logo mobile />
            <div className='flex flex-col items-center'>
            <div className='mt-3'>
            </div>
            <p className='text-white mt-3 font-bakbak text-4xl'>Painel do Aluno</p>
            <div className='bg-white w-[320px] h-0.5 mt-3 mb-3'></div>
        </div>
        <div className='ml-5 text-2xl'>
            <IconLink onClick={aoClicar} icon={<IoHomeSharp color="white" size={25} />} url="/" link="Home" />
            <IconLink onClick={aoClicar} icon={<IoMdContacts color="white" size={25} />} url="/contato" link="Contato" /> 
            <IconLink onClick={aoClicar} icon={<MdChangeCircle color="white" size={25} />} url="/mudarModalidade" link="Mudar Modalidade" /> 
            <IconLink onClick={aoClicar} icon={<MdOutlineCircleNotifications color="white" size={25} />} url="/notificar-Presenca" link="Notificar Presença" /> 
            <IconLink onClick={aoClicar} icon={<RiMoneyDollarCircleFill color="white" size={25} />} url="/notificar-Pagamento" link="Notificar Pagamento" />  
            <div className='flex mt-3 items-center' onClick={() => dispatch(logoutAction())}>
            <AiOutlineLogin color="white" size={25}  />
            <p className='ml-3 text-white font-bakbak'>Deslogar</p>
           </div>
        </div>
        </div>
     ): (
        <div className='bg-transparent flex justify-between items-center border-b border-red-50'>
        <div className='ml-10'>
            <Logo small />
        </div>
        <div className='mr-10'>
            <button className={cssButton}>
                <Link to="/">Home</Link>
            </button>
            <button className={cssButton}>
                <Link to="/contato">Contato</Link>
            </button>
            <button className={cssButton}>
            <Link to="/mudar-Modalidade">Mudar Modalidade</Link>
            </button>
            <button className={cssButton}>
            <Link to="/notificar-Presenca">Notificar Presença / Falta</Link>
            </button>
            <button className={cssButton}>
            <Link to="/notificar-Pagamento">Notificar Pagamento</Link>
            </button>
                <Link to="/login">
                <button onClick={() => dispatch(logoutAction())} className='deslogar mr-8 button-white dynamic-transition'>
                    Deslogar
                </button>
                </Link>

        </div>
    </div>
     )}
    </>
  )
}

export default NavLogado
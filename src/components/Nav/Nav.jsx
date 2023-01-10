import React from 'react'
import { Link } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery'
import Logo from '../Logo/Logo';
import { IoHomeSharp } from 'react-icons/io5';
import { IoMdContacts } from 'react-icons/io';
import { AiOutlineLogin } from 'react-icons/ai'



const IconLink = ({ icon, link, url, onClick }) => {
    return (
        <div className='flex mt-3 items-center'>
            {icon}
            <Link onClick={onClick} to={url} className='ml-3 text-white font-bakbak'>{link}</Link>
        </div>
    )
}

const Nav = ({ aoClicar }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
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
            <IconLink onClick={aoClicar} icon={<AiOutlineLogin color="white" size={25} />} url="/login" link="Login/Matricular" />
        </div>
        </div>
     ): (
        <div className='bg-transparent flex justify-between items-center'>
        <div className='ml-10'>
            <Logo small />
        </div>
        <div className='mr-10'>
            <button className='mr-16 outlined dynamic-transition'>
                <Link to="/">Home</Link>
            </button>
            <button className='mr-16 outlined dynamic-transition'>
                <Link to="/contato">Contato</Link>
            </button>
                <Link to="/login">
                <button className='mr-16 button-white dynamic-transition'>
                    Login/Matricular
                </button>
                </Link>

        </div>
    </div>
     )}
    </>
  )
}

export default Nav
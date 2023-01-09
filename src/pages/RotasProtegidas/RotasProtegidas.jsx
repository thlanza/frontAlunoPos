import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav'
import useMediaQuery from '../../hooks/useMediaQuery';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RotasProtegidas = ({ alunoLogado }) => {
  const [nav, setNav] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { pathname } = useLocation();

  if (!alunoLogado) {
    return <Navigate to="/login" />;
  }

  return (
      <>
          {isMobile ? (
              <div className="my-gradient h-screen relative">
                      <div>
                           {nav ? 
                           <div className=''>
                               <div className='absolute top-2 right-2'>
                               <AiOutlineClose size={35} onClick={() => setNav(false)} />
                               </div>
                               <Nav aoClicar={() => setNav(false)}/>
                           </div>
                           : 
                           <div className=''>
                                      <div className='h-[50px] font-bebas text-white
                                      flex items-center text-3xl'>{pathname === "/" ? "Home" : pathname.substring(1)}</div>
                              <div className='absolute top-2 right-2'>
                              <GiHamburgerMenu size={35} onClick={() => setNav(true)} />
                              </div>
                      
                           <Outlet />
                           </div>
                           }
  
                      </div>
          </div>
          ): (
              <div className="h-screen my-gradient">
              <Nav />
              <Outlet />
          </div>
          )}
    
      </>
    )
}

export default RotasProtegidas
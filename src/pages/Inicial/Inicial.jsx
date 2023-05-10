import React, { useState } from 'react'
import Nav from '../../components/Nav/Nav';
import useMediaQuery from '../../hooks/useMediaQuery';


const Inicial = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
    {isMobile ? (
      <div className='my-gradient h-screen flex flex-col relative transition-all duration-500'>
        
          <div className='h-screen flex flex-col p-16 font-bebas
          text-4xl'>
              <h1 className='text-white text-5xl mb-24'>HOME</h1>
              <h1 className='text-mygreen'>BEM-VINDO À</h1>
              <h1 className='text-white mb-16'>MELHOR ACADEMIA DE BELO HORIZONTE!</h1>
              <h1 className='text-white'>NÃO PERCA TEMPO!</h1>
              <h1 className='text-white'>COMECE JÁ!</h1>
          </div>
        
      </div>
    ): (
      <div className='h-[calc(100vh - 88px)]'>
              <div className='flex'>
                  <div className='w-1/2 h-[calc(100vh - 88px)] flex flex-col p-16 font-bebas
                  text-5xl'>
                      <h1 className='text-mygreen'>BEM-VINDO À</h1>
                      <h1 className='text-white mb-10 melhor'>MELHOR ACADEMIA DE BELO HORIZONTE!</h1>
                      <h1 className='text-white'>NÃO PERCA TEMPO!</h1>
                      <h1 className='text-white'>COMECE JÁ!</h1>
                  </div>
                  <div className='w-1/2'>
                      <img src="./hero.png" alt="" />
                  </div>
              </div>
        </div>
    )}
    
    </>
  )
}

export default Inicial
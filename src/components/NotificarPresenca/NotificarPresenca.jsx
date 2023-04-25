import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useMediaQuery from '../../hooks/useMediaQuery';
import { getModalidadesAction } from '../../redux/slices/modalidades/modalidadeSlices';

const NotificarPresenca = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModalidadesAction());
  }, [dispatch]);
  return (
    <div>
    {isMobile ? (
        <div>TODO</div>
    ): (
        <div>
            <p className='outlined text-2xl mt-3 mb-3 ml-5'>Escolha a data e a modalidade para notificar presença ou falta:</p>
        </div>
    )}
    </div>
    
  )
}

export default NotificarPresenca
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import React from 'react';
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { mygreen } from '../../colorsForIcons';



const Contato = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_MAPS
  });

  const position = {
    lat: -19.9692871,
    lng: -43.9630243
   }

  return (
    <div className="grid grid-cols-2">
      <div className='h-[calc(100vh - 88px)] flex mt-10 items-center flex-col'>
          <p className='outlined text-2xl mb-3'>Endereço</p>
          <p className='text-white mb-5'>Rua José Rodrigues Pereira, 1218/601</p>
          <p className='outlined text-2xl mb-3'>Telefone / Whatsapp</p>
          <p className='text-white mb-5'>(31)99712-0294</p>
          <p className='outlined text-2xl mb-3'>Email </p>
          <p className='text-white mb-5'>academialanza@gmail.com</p>
          <p className='outlined text-2xl mb-3'>Responsável</p>
          <p className='text-white mb-5'>Thiago Corrêa Lanza Guimarães</p>
          <div className='grid grid-cols-2 w-[100%]'>
            <div className='flex justify-center ml-72'>
              <a href="https://www.facebook.com/ThiagoLanza" target="_blank">
                <AiFillFacebook size={50} color={mygreen} className="iconhover" />
              </a>       
            </div>
            <div className='flex justify-center mr-72'>
              <a href="https://www.instagram.com/thlanza/" target="_blank">
                <AiFillInstagram size={50} color={mygreen} className="iconhover" /></a>    
              </div>
          </div>
      </div>
      {isLoaded ? (
        <div className='mt-[40px] mr-[40px]'>
        <GoogleMap
           mapContainerStyle={{width: '100%', height: 'calc(100vh - 160px)'}}
           center={position}
           zoom={15}
          >
            <Marker 
              position={position}
              options={{
                label: {
                  text: "Academia Lanza",
                  className: "map-marker"
                }
              }}
            />
          </GoogleMap>
        </div>
      ): <></>}
    </div>
  )
}

export default Contato
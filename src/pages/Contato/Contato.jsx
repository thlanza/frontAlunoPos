import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';
import React, { useEffect, useRef, useState } from 'react';


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
      <div className='h-[calc(100vh - 88px)]'>Contato</div>
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
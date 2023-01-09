import React from 'react';
import { Gym } from 'iconoir-react';

const Logo = ({ small, mobile }) => {
  return (
    <div className={small || mobile ? 'flex items-center bg-white' : 'flex items-center text-4xl border-b-2 border-black'}>
    <div className='relative'>
      <div className='bg-black w-20 h-20' />
      <Gym fontSize={50} color='#B8D20B'className='absolute top-0'/>
    </div>
  {small ? (
    <div>
    <p className='font-goblin text-[23px] ml-5'>Academia</p>
    <p className='font-goblin text-[23px] ml-5'>Lanza</p>
    </div>
    ) : mobile ? 
    (<div>
      <p className='font-goblin text-[19px] ml-5'>Academia</p>
      <p className='font-goblin text-[19px] ml-5'>Lanza</p>
      </div>) :
    (<p className='font-goblin ml-5'>Academia Lanza</p>)}
</div>
  )
}

export default Logo
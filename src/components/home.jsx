import React from 'react';
import backgroundImage from '../assets/background.png'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-full h-screen relative'>
      <div className='absolute top-0 left-0 w-full h-full'>
        <img className='w-full h-full object-cover absolute inset-0' src={backgroundImage} alt='Background' />
      </div>
      <div className='absolute w-full h-full top-0 left-0 bg-gray-900/30'></div>
      <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-black p-4'>
        <h1 className='text-5xl text-white'>EXPERIENCE THE THRILL AT BIÑAN</h1>
        <h2 className='py-4 text-white'>Explore Biñan Ticket!</h2>
        <form className='items-center'>
          <div>
            <Link to='/event'>
              <button className='w-56 h-12 rounded-full shadow-shadowOne 
              flex items-center justify-center 
              bg-transparent group 
              hover:bg-black hover:text-white 
              active:bg-black active:text-white 
              transition-colors duration-1000 mx-auto text-white'>Browse Events</button>
            </Link>



          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;

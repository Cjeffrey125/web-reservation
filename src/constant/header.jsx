import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../components/context/authContext';
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle, FaYoutube, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserDropdown from '../components/user/userDropdown';
import images from './images'

const Header = () => {
  const { user, logout } = useUserAuth();
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const navbar = document.querySelector('.navbar');

      if (offset > 100) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    setIsUserLoggedIn(!!user);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user, logout, navigate]);

  useEffect(() => {
    setIsUserLoggedIn(true);
  }, []);


  if (user && user.email === 'admin@gmail.com') 
  {
    return (
    <div
      className={`flex w-full justify-between items-center h-20 px-4 z-10 text-black navbar sticky top-0 backdrop-blur-lg bg-white/30`}
    > 
      <div>
      <img src={images.logo} alt="Logo" className="h-12" />
      </div>

      <ul className="hidden md:flex">
        <li>
          <Link to="/admin">Home</Link>
        </li>
        <li>
          <Link to="/adminBlog">Blog</Link>
        </li>
        <li>
          <Link to="/adminEvent">Events</Link>
        </li>
        <li>
          <Link to="/adminQuery">Queries</Link>
        </li>
      </ul>

      <div className="hidden md:flex">
        <ul className="hidden md:flex">
             <li>
              <UserDropdown />
            </li>
        </ul>
      </div>

      <div onClick={handleNav} className="md:hidden z-10">
        {nav ? (
          <AiOutlineClose className="text-black" size={20} />
        ) : (
          <HiOutlineMenuAlt4 size={20} />
        )}
      </div>

      <div
        onClick={handleNav}
        className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}
      >
        <ul>
          <img src={images.logo} alt="Logo" className="h-12" />

          <li className="border-b hover:bg-green-200">
          <Link to="/admin">Home</Link>
          </li>

          <li className="border-b hover:bg-green-200">
          <Link to="/adminBlog">Blog</Link>
          </li>

          <li className="border-b hover:bg-green-200">
          <Link to="/adminEvent">Events</Link>
          </li>

          <li className="border-b hover:bg-green-200">
          <Link to="/adminQuery">Queries</Link>
          </li>
        </ul>
      </div>    

      
      </div>
    )
  }

 else {
  return (
    <div
      className={`flex w-full justify-between items-center h-20 px-4 z-10 text-black navbar sticky top-0 backdrop-blur-lg bg-white/30`}
    > 
      <div>
        <h1>Biñan</h1>
      </div>

      <ul className="hidden md:flex">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/article">Blog</Link>
        </li>
        <li>
          <Link to="/event">Events</Link>
        </li>
        <li>
          <Link to="/contact-us">Contact Us</Link>
        </li>
      </ul>

      <div className="hidden md:flex">
        {isUserLoggedIn ? (
          <ul className="hidden md:flex">
            <li>
              <UserDropdown />
            </li>
          </ul>
        ) : (
          <ul className="hidden md:flex">
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>

      <div onClick={handleNav} className="md:hidden z-10">
        {nav ? (
          <AiOutlineClose className="text-black" size={20} />
        ) : (
          <HiOutlineMenuAlt4 size={20} />
        )}
      </div>

      <div
        onClick={handleNav}
        className={nav ? ' z-10 absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}
      >
        <ul>
          <h1>Biñan</h1>

          <li className="border-b hover:bg-green-200">
            <Link to="/">Home</Link>
          </li>

          <li className="border-b hover:bg-green-200">
            <Link to="/article">Blog</Link>
          </li>

          <li className="border-b hover:bg-green-200">
            <Link to="/event">Events</Link>
          </li>

          <li className="border-b hover:bg-green-200">
            <Link to="/contact-us">Contact Us</Link>
          </li>

          <div className="flex flex-col">
            {isUserLoggedIn ? (
              <Link to="/user-profile">
                <button className="rounded-full border w-full my-5 py-2 bg-green-600 hover:bg-green-500 text-white">
                <div className='flex'>
                  <div className='mt-1 ml-5'><FaUserCircle /></div>
                  <div className='ml-32'>User Profile</div>
                  </div>
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="rounded-full border w-full my-5 py-2 bg-green-600 hover:bg-green-500 text-white">
                  Account
                </button>
              </Link>
            )}
          </div>

          <div className="flex justify-between my-6">
            <FaFacebook className="icon" />
            <FaTwitter className="icon" />
            <FaYoutube className="icon" />
            <FaGoogle className="icon" />
            <FaInstagram className="icon" />
          </div>
        </ul>
      </div>
    </div>
  );
};
}

export default Header;

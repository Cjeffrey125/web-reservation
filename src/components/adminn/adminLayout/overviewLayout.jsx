import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faTicket, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const OverViewLayout = () => {
  return (
    <div className="w-full xl:px-12 h-auto xl:py-8">
      <div className="flex flex-col items-left">

        <Link to="/adminEvent" className="border rounded-lg p-2 border-gray-400 hover:border-black hover:text-black flex items-center">
          <FontAwesomeIcon icon={faCalendar} className="text-4xl" style={{ color: '#af6caf', fontSize: '60px' }} />
          <span style={{ fontSize: '60px', margin: '10px 10px', color: '#b6b7b6' }}> |</span>
          <div>
            <h1 className='ml-20' style={{ display: 'block' }}>20</h1>
            <p className='ml-10' style={{ display: 'block' }}>Events Created</p>
          </div>
        </Link>

        <Link to="/registrations" className="border rounded-lg p-2 border-gray-400 hover:border-black hover:text-black flex items-center mt-4">
          <FontAwesomeIcon icon={faUser} className="text-4xl" style={{ color: '#88ae89', fontSize: '60px' }} />
          <span style={{ fontSize: '60px', margin: '10px 10px', color: '#b6b7b6' }}> |</span>
          <div>
            <h1 className='ml-20' style={{ display: 'block' }}>20</h1>
            <p className='ml-7' style={{ display: 'block' }}>User Registrations</p>
          </div>
        </Link>

        <Link to="/ticket-sales" className="border rounded-lg p-2 border-gray-400 hover:border-black hover:text-black flex items-center mt-4">
          <FontAwesomeIcon icon={faTicket} className="text-4xl" style={{ color: '#5d5be5', fontSize: '60px' }} />
          <span style={{ fontSize: '60px', margin: '10px 10px', color: '#b6b7b6' }}>|</span>
          <div>
            <h1 className='ml-16' style={{ display: 'block' }}>101</h1>
            <p className='ml-10' style={{ display: 'block' }}>Ticket Sales</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default OverViewLayout;

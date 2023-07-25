import React, { useState, useEffect } from 'react';
import OverViewLayout from './adminLayout/overviewLayout';
import { eventData } from '../../constant/eventData';


const Admin = () => {
  const [upcomingEventsHeight, setUpcomingEventsHeight] = useState('auto');

  useEffect(() => {
    const setHeight = () => {
      const upcomingEventsDiv = document.getElementById('upcomingEvents');
      if (upcomingEventsDiv) {
        const height = upcomingEventsDiv.offsetHeight;
        setUpcomingEventsHeight(height);
      }
    };

    setHeight();
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  return (
    <section id="blog" className="py-12 border-b-[1px] relative z-0">
      <div className="container mx-auto flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4" style={{ maxWidth: '1000px' }}>
              <div className="mb-1" >
                <div className="bg-white shadow-lg rounded-lg p-4 hover:bg-gray-300 hover:bg-[#7a7a7a] transition-colors duration-500">
                  <OverViewLayout
                  />
                </div>
              </div>
      
          <div className="ml-12">
            <div
              id="upcomingEvents"
              className="bg-white shadow-lg rounded-lg p-4 hover:bg-gray-300 hover:bg-[#7a7a7a] transition-colors duration-500"
              style={{ maxWidth: '600px' }}
            >
              <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
              <ul>
                {eventData.map((events) => (
                  <li key={events.ID}>
                    <div className="flex items-center">
                      <img src={events.image} alt={events.title} className="w-12 h-12 rounded border border-gray-300 mr-4" />
                      <div>
                        <h3>{events.title}</h3>
                        <p>{events.date_time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
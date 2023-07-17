{/*
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventData } from '../../constant/eventData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from '../context/authContext';
import DefaultUser from './booking/defaultUser';
import Guest from './booking/guest';
import Payment from './booking/payment';

const Booking = ({ isOpen, onClose }) => {
  const { user } = useUserAuth();
  const [info, setInfo] = useState('');
  
  const [residency, setResidency] = useState(false);
 
  const [showSecondSection, setShowSecondSection] = useState(false);
  const [showThirdSection, setShowThirdSection] = useState(false);

  const { eventKey } = useParams();
  const parsedEventKey = parseInt(eventKey);
  const eventInfo = eventData.find((event) => event.eventKey === parsedEventKey);

  const [ticketCount, setTicketCount] = useState(1);

  const closeModal = () => {
    onClose();
  };

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    setInfo(checkboxValue);
    setResidency(checkboxValue === 'yes');
    setShowSecondSection(checkboxValue === 'yes');
    setShowThirdSection(checkboxValue === 'no');
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white w-full max-w-6xl p-6 rounded-lg relative">
            <button
              className="absolute top-0 right-0 m-3 p-2 border-b-gray-500 text-black hover:text-gray-700 hover:bg-red-500 bg-transparent"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          
            <section>
              <h1>Check Out</h1>
              <div className="container mx-auto min-h-[300px] mb-14">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-1">
                    <div className="w-full h-auto bg-gray-300 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={eventInfo.image}
                        alt="Event Image"
                      />
                    </div>
                  </div>


                  <div className="col-span-2 p-6">
                    <h1 className="text-2sm font-bold">{eventInfo.title}</h1>
                    <div className="flex items-center mt-2">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                      <span>{eventInfo.location}</span>
                    </div>
                    <div className="mt-2">{eventInfo.date_time}</div>
                    <div className="flex gap-3 mt-4">
                      <div className="text-xs px-2 py-1 rounded-full border border-black">
                        {eventInfo.genre1}
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full border border-black">
                        {eventInfo.genre2}
                      </div>
                    </div>

                    <div className="mt-3 mb-4">
                      Ticket for {ticketCount} : {eventInfo.price}
                    </div>

                    <div className="flex flex-col">
                      <p>Is the ticket for you?</p>
                      <div className="flex gap-3 mt-1">
                        <div className="flex items-center mt-1">
                          <input
                            id="yesCheckbox"
                            type="radio"
                            value="yes"
                            checked={info === 'yes'}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor="yesCheckbox" className="ml-2">
                            Yes
                          </label>
                        </div>
                        <div className="flex items-center mt-1">
                          <input
                            id="noCheckbox"
                            type="radio"
                            value="no"
                            checked={info === 'no'}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor="noCheckbox" className="ml-2">
                            No
                          </label>
                        </div>
                      </div>


                      <div className="flex justify-center mt-6">
                      <Payment />
                      </div>
                      
                    </div>
                  </div>
                 

                </div>
              </div>
            </section>

            
            {showSecondSection && (
              <div className="flex justify-center mt-6">
                <DefaultUser user={user} />
              </div>
            )}

            {showThirdSection && (
              <div className="flex justify-center mt-6">
                <Guest />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;

*/}

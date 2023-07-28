import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventData } from '../../constant/eventData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTimes } from '@fortawesome/free-solid-svg-icons';
import DefaultUser from './booking/defaultUser';
import Guest from './booking/guest';
import GuestPayment from './booking/guestpayment';
import DUPayment from './booking/duPayment';
import { MdOutlineReceiptLong } from 'react-icons/md';

const Booking = ({ isOpen, onClose }) => {
  const [info, setInfo] = useState('');
  const [showGuestPaymentContent, setShowGuestPaymentContent] = useState(false);
  const [showDUPaymentContent, setShowDUPaymentContent] = useState(false);
  const [isDefaultPaymentVisible, setIsDefaultPaymentVisible] = useState(true);

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
  };

  const guestHandleConfirm = () => {
    setShowGuestPaymentContent(true);
    setIsDefaultPaymentVisible(false);
  };

  const DUHandleConfirm = () => {
    setShowDUPaymentContent(true);
    setIsDefaultPaymentVisible(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-filter backdrop-blur-sm z-50" style = {{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}> 
          <div className=" w-full max-w-6xl p-6 rounded-lg relative" style={{ maxHeight: '880px', backgroundColor: '#F5F5F5'}}>
            <button
              className="absolute top-10 right-0 m-3 p-2 border-b-gray-500 text-black hover:text-gray-700 hover:bg-red-500 bg-transparent"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-screen mt-10">
              <div className="image-container flex items-center justify-center">
                <img className="max-w-full max-h-full object-contain -mb-20" src={eventInfo.image} alt="Event Image" />
              </div>

              <div className="info-container flex items-center justify-center">
                <div className="col-span-2 p-6 -mb-20">
                  <h1 className="text-2sm font-bold">{eventInfo.title}</h1>
                  <div className="flex items-center mt-2">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    <span>{eventInfo.location}</span>
                  </div>
                  <div className="mt-2">{eventInfo.date_time}</div>
                  <div className="flex gap-3 mt-4">
                    <div className="text-xs px-2 py-1 rounded-full border border-black">{eventInfo.genre1}</div>
                    <div className="text-xs px-2 py-1 rounded-full border border-black">{eventInfo.genre2}</div>
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
                  </div>
                </div>
              </div>

              <div className="payment-container flex items-start justify-center">
                {isDefaultPaymentVisible && (
                  <div className="payment-container h-[168%] w-full border-1.5 rounded-lg mt-10 flex flex-col bg-white shadow-lg">
                    <h1 className="payment-title text-2xl mt-4 ml-4">Payment Summary</h1>
                    <div className="empty-content flex flex-col items-center justify-center flex-1">
                    <MdOutlineReceiptLong className="payment-icon-svg text-8xl text-green-500" />
                      <div className="payment-icon flex items-center justify-center mt-4">
                        
                      </div>
                      <p className="payment-text mt-4 text-center">
                        Your Payment Summary Will Be Displayed Here.
                      </p>
                    </div>
                  </div>
                )}

                {showDUPaymentContent && <DUPayment onConfirmed={showDUPaymentContent} />}
                {showGuestPaymentContent && <GuestPayment onConfirmed={showGuestPaymentContent} />}
              </div>

              <div className="hiddencontainer-container flex items-center col-span-2 row-span-2 mb-32">
                {info === 'yes' && <DefaultUser eventKey={parsedEventKey} onConfirm={DUHandleConfirm} />}
                {info === 'no' && <Guest eventKey={parsedEventKey} onConfirm={guestHandleConfirm} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;

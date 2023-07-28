import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTicket } from '@fortawesome/free-solid-svg-icons';

const ContactModal = ({ closeModal, openModal, handleContinueClick }) => {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${openModal ? 'visible' : 'hidden'}`}>
        <div className="bg-white w-96 p-6 rounded-lg shadow-md relative">
          <button
            className="absolute top-0 right-0 m-3 p-2 border-b-gray-500 text-black hover:text-gray-700 hover:bg-red-500 bg-transparent"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
  
          <h1 className="text-4xl font-bold mb-8 text-center">Message Sent.</h1>
          <div className="flex items-center justify-center mb-5">
            <FontAwesomeIcon icon={faTicket} className="text-8xl text-green-400" />
          </div>
  
          <p className="mb-4 text-sm text-center">Your Concern Has Been Sent.</p>
  
          <div className="flex justify-center items-center mr-16 mt-12">
            <button
              className="w-40 h-10 rounded-full shadow-shadowOne flex items-center justify-center 
              bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-gradient-to-b hover:from-green-200 hover:to-green-300 
              transition-colors duration-1000 mx-auto text-black mr-4"
              onClick={() => {
                handleContinueClick();
                closeModal();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactModal;
  
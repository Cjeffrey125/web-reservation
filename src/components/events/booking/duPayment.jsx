import React, { useState, useEffect } from 'react';
import { MdOutlineReceiptLong } from 'react-icons/md';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import BookSuccessModal from './bookSuccessModal';

const DuPayment = () => {
  const [reservationData, setReservationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchReservationData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'attendees'));
      const reservations = [];
      querySnapshot.forEach((doc) => {
        const reservationData = doc.data();
        reservations.push({
          id: doc.id,
          reservationDate: reservationData.reservationDate,
          price: reservationData.price,
          ...reservationData,
        });
      });
      setReservationData(reservations[0]);
      console.log(reservations);
    } catch (error) {
      console.error('Error fetching reservation data:', error);
    }
  };

  useEffect(() => {
    fetchReservationData();
  }, []);

  const handleConfirm = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="payment-container h-[168%] w-full border-1.5 rounded-lg mt-10 flex flex-col bg-white shadow-lg">
      <h1 className="payment-title text-2xl mt-4 ml-4">Payment Summary</h1>

      <div className="payment-content flex flex-col items-left ml-12 justify-center flex-1">
        <div className="payment-icon flex items-left justify-left mt-4">
          <MdOutlineReceiptLong className="ml-20 mb-5 payment-icon-svg text-8xl  text-green-500" />
        </div>
        {reservationData && (
          <div>
            <p className="payment-text mt-4">Reservation Date: {reservationData.reservationDate}</p>
            <p className="payment-text mt-4">Ticket Fee: {reservationData.price}</p>
            <p className="payment-text mt-4">Order No: {reservationData.ticketCount}</p>
            <p className="payment-text mt-4">Attendee Name: {reservationData.name}</p>
            <p className="payment-text mt-4">Total: {reservationData.price}</p>

            <div className="flex justify-left ml-12 mt-7">
              <button
                className="w-40 h-10 rounded-full shadow-shadowOne flex items-center justify-center bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-gradient-to-b
             hover:from-green-200 hover:to-green-300 transition-colors duration-1000 text-black mr-4"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <BookSuccessModal onClose={closeModal} />
      )}
    </div>
  );
};

export default DuPayment;
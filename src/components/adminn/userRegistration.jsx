import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const UserRegistration = () => {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const data = querySnapshot.docs.map((doc) => ({ eventKey: doc.id, ...doc.data() }));
        setEventData(data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };
    fetchEventData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Events:</h1>
      <div className="grid grid-cols-4 gap-4">
        {eventData.map((event) => (
          <Link to ={'/analytics'}>
            <div className="bg-white rounded-lg p-4 shadow-md cursor-pointer">
              <img
                src={event.imagePath}
                alt={event.title}
                className="w-40 h-40 object-cover mx-auto rounded-full mb-4"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserRegistration;

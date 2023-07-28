import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const Analytics = () => {
  const [attendeeData, setAttendeeData] = useState([]);

  useEffect(() => {
    const fetchAttendeeData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'attendees'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setAttendeeData(data);
      } catch (error) {
        console.error('Error fetching attendee data:', error);
      }
    };
    fetchAttendeeData();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-lg bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Event Attendees:</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">#</th>
              <th className="p-4">Email</th>
              <th className="p-4">Name</th>
              <th className="p-4">Age</th>
              <th className="p-4">Residency</th>
            </tr>
          </thead>
          <tbody>
            {attendeeData.map((attendee, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{attendee.email}</td>
                <td className="p-4">{attendee.name}</td>
                <td className="p-4">{attendee.age}</td>
                <td className="p-4">{attendee.residency ? 'Resides in Binan' : 'Outside of Binan'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;

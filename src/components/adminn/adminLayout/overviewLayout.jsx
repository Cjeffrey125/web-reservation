import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, where, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faTicket } from '@fortawesome/free-solid-svg-icons';

const OverViewLayout = () => {
  const [unansweredConcernsCount, setUnansweredConcernsCount] = useState(0);
  const [totalQueries, setTotalQueries] = useState(0);
  const [attendeeCount, setAttendeeCount] = useState(0); 

  useEffect(() => {
    const fetchUnansweredConcerns = async () => {
      try {
        const respondedQuery = query(collection(db, 'queries'), where('status', '==', 'Responded'));
        const unansweredQuery = query(collection(db, 'queries'), where('status', '==', 'No Reply'));

        const [respondedSnapshot, unansweredSnapshot, allQueriesSnapshot] = await Promise.all([
          getDocs(respondedQuery),
          getDocs(unansweredQuery),
          getDocs(collection(db, 'queries')), // Fetch all queries to get the total count
        ]);

        const respondedCount = respondedSnapshot.size;
        const unansweredCount = unansweredSnapshot.size;
        const totalCount = allQueriesSnapshot.size;

        setUnansweredConcernsCount(unansweredCount);
        setTotalQueries(totalCount);
      } catch (error) {
        console.error('Error fetching concerns:', error);
      }
    };
    const fetchAttendeeCount = async () => {
      try {
        const attendeeQuery = collection(db, 'attendees');
        const attendeeSnapshot = await getDocs(attendeeQuery);
        const attendeeCount = attendeeSnapshot.size;
        setAttendeeCount(attendeeCount);
      } catch (error) {
        console.error('Error fetching attendee count:', error);
      }
    };

    fetchAttendeeCount();
    fetchUnansweredConcerns();
  }, []);

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

        <Link to="/user-registrations" className="border rounded-lg p-2 border-gray-400 hover:border-black hover:text-black flex items-center mt-4">
          <FontAwesomeIcon icon={faUser} className="text-4xl" style={{ color: '#88ae89', fontSize: '60px' }} />
          <span style={{ fontSize: '60px', margin: '10px 10px', color: '#b6b7b6' }}> |</span>
          <div>
            <h1 className='ml-20' style={{ display: 'block' }}>{attendeeCount}</h1>
            <p className='ml-7' style={{ display: 'block' }}>User Registrations</p>
          </div>
        </Link>

        <Link to="/adminQuery" className="border rounded-lg p-2 border-gray-400 hover:border-black hover:text-black flex items-center mt-4">
          <FontAwesomeIcon icon={faTicket} className="text-4xl" style={{ color: '#5d5be5', fontSize: '60px' }} />
          <span style={{ fontSize: '60px', margin: '10px 10px', color: '#b6b7b6' }}>|</span>
          <div>
          <h1 className='ml-16' style={{ display: 'block' }}>{unansweredConcernsCount}</h1>
        <p className='ml-10' style={{ display: 'block' }}>Concerns</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default OverViewLayout;

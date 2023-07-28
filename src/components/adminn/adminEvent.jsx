import React, { useState, useEffect } from 'react';
import { BsPencil, BsX } from 'react-icons/bs';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import CreateEvent from './modal/createEvent';
import EventModal from './modal/eventModal';
import ConfirmationModal from './modal/confirmationModal';

const AdminEvent = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isEditClicked, setEditClicked] = useState({});
  const [isDeleteClicked, setDeleteClicked] = useState({});
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [eventToDelete, setEventToDelete] = useState(null);

  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImageURL, setCurrentImageURL] = useState(null);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const events = querySnapshot.docs.map((doc) => doc.data());

        events.sort((a, b) => a.ID - b.ID);

        setEventData(events);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchEvents();
  }, []);


  const handleSaveEvent = async (eventData) => {
    try {
      
      console.log('Article data to be saved:', eventData);
    } catch (error) {
      console.error('Error saving article data:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateEvent = () => {
    setShowCreateEvent(true); // Set the state to true to open the modal
  };

  const handleEditClick = (eventId) => {
    setEditClicked((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  const handleDeleteClick = (eventId) => {
    setEventToDelete(eventId);
  };

  const handleConfirmDelete = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'));
      const documentIdToDelete = querySnapshot.docs.find((doc) => doc.data().ID === eventToDelete)?.id;
  
      if (documentIdToDelete) {
        await deleteDoc(doc(db, 'events', documentIdToDelete));
        setEventData((prevEventData) =>
          prevEventData.filter((event) => event.ID !== eventToDelete)
        );

        setEventToDelete(null); 
      } else {
        console.warn('Article not found with the specified ID:', eventToDelete);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleOpenEventModal = (eventData) => {
    if (eventData) {
      setSelectedEvent(eventData);
      setCurrentImageURL(eventData.src || '');
    } else {
    
      setSelectedEvent(null);
      setCurrentImageURL(''); 
    }
    setEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setSelectedEvent(null);
    setEventModalOpen(false);
  };

  const handleImageChange = (imageFile, newImageURL) => {
  
    setSelectedEvent((prevSelectedEvent) => ({
      ...prevSelectedEvent,
      src: newImageURL,
    }));
    setCurrentImageURL(newImageURL); 
  };
  const updateEventImage = (eventId, newImageURL) => {
    setEventData((prevEventData) =>
      prevEventData.map((event) =>
        event.ID === eventId ? { ...event, src: newImageURL } : event
      )
    );
  };

 

  return (
    <div className="shadow-md rounded-lg p-4" style={{ borderRadius: '35px' }}>
      <div className="flex justify-between items-center px-60 mt-8">
        <h1>Events Created</h1>
        <div className="flex items-center" style={{ margin: '0 10px', position: 'relative' }}>
          <svg viewBox="0 0 24 24" fill="#525353" width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '12px', top: '9px' }}>
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4 4 1.49-1.49-4-4zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <input type="text" placeholder="Search Events" style={{ border: 'none', outline: 'none', backgroundColor: '#EDEDED', borderRadius: '25px', paddingLeft: '30px', height: '3rem', width: '250px' }} />
          <button
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: '#525353', color: '#e9e9e8' }}
          onClick={handleCreateEvent} 
        >
          + Create Event
        </button>
        </div>
      </div>

      <div className="flex justify-center overflow-y-scroll">
        <table className="w-3/4 mt-4 border rounded mb-8" style={{ borderColor: 'rgba(224, 224, 224, 0.7)' }}>
          <thead style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
            <tr>
              <th className="p-2" colSpan="7" style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
                <ul className="flex border-b">
                  <li className={`cursor-pointer py-2 px-4 ${activeTab === 'all' ? 'bg-black text-white' : ''}`} onClick={() => handleTabChange('all')}>
                    All
                  </li>
                  <li className={`cursor-pointer py-2 px-4 ${activeTab === 'published' ? 'bg-black text-white' : ''}`} onClick={() => handleTabChange('published')}>
                    Published
                  </li>
                  <li className={`cursor-pointer py-2 px-4 ${activeTab === 'draft' ? 'bg-black text-white' : ''}`} onClick={() => handleTabChange('draft')}>
                    Draft
                  </li>
                </ul>
              </th>
            </tr>
            <tr style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
              <th className="border-b p-2">#</th>
              <th className="border-b p-2">Event Name</th>
              <th className="border-b p-2">Organizer</th>
              <th className="border-b p-2">Date</th>
              <th className="border-b p-2">Publish Date</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            {eventData.map((event) => (
              <tr key={event.eventID}>
                <td className="border-b p-2 text-center">{event.ID}</td>
                <td className="border-b p-2 text-center" style={{ color: '#00008B' }}>
                  {event.title}
                </td>
                <td className="border-b p-2 text-center">{event.organization}</td>
                <td className="border-b p-2 text-center">{event.date}</td>
                <td className="border-b p-2 text-center">
                  <div style={{ backgroundColor: '#a3f294', color: '#8c8c8c', padding: '0.5rem 1rem', borderRadius: '5px', width: 'fit-content', margin: 'auto' }}>
                    {event.dateCreated}
                  </div>
                </td>
                <td className="border-b p-2 text-center">
                  <button
                    className="mr-2"
                    title="Edit"
                    style={{
                      backgroundColor: isEditClicked[event.ID] ? '#000101' : 'white',
                      borderRadius: '50%',
                    }}
                    onClick={() => handleOpenEventModal(event)}
                  >
                    <BsPencil
                      size={20}
                      color={isEditClicked[event.ID] ? '#e9e9e8' : '#525353'}
                    />
                  </button>
                  <button
                    title="Delete"
                    style={{
                      backgroundColor: isDeleteClicked[event.eventKey] ? '#000101' : 'white',
                      borderRadius: '50%',
                    }}
                    onClick={() => handleDeleteClick(event.ID)} 
                  >
                    <BsX
                      size={20}
                      color={isDeleteClicked[event.eventKey] ? '#e9e9e8' : '#525353'}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showCreateEvent && (
        <CreateEvent
          show={showCreateEvent}
          onClose={() => setShowCreateEvent(false)}
          onSaveEvent={handleSaveEvent} 
        />
      )}

      {selectedEvent && (
        <EventModal
          eventId={selectedEvent.id}
          date={selectedEvent.date}
          eventCreated={selectedEvent.dateCreated}
          des={selectedEvent.description}
          genre1={selectedEvent.genre1}
          genre2={selectedEvent.genre2}   
          imagePath={selectedEvent.imagePath}
          limit={selectedEvent.limit}
          location={selectedEvent.location}
          org={selectedEvent.organization}
          price={selectedEvent.price}
          time={selectedEvent.time}
          host={selectedEvent.host}
          title={selectedEvent.title}

          onClose={handleCloseEventModal} 
          isOpen={isEventModalOpen}


          onImageChange={(imageFile, newImageURL) => {
            handleImageChange(imageFile, newImageURL); 
            updateEventImage(selectedEvent.id, newImageURL); 
          }} 
          
        />
      )}

      {eventToDelete && (
      <ConfirmationModal
        closeModal={() => setEventToDelete(null)}
        openModal={!!eventToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
      )}
    </div>
  );
};

export default AdminEvent;
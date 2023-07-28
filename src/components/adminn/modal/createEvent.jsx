import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import BirthdaySelector from '../../../constant/birthdaySelector';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from '../../../config/firebase'; 
import EventImageUploader from './eventImageUploader';

const CreateEvent = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    ID: '',
    title: '',
    location: '',
    date: '',
    time: '',
    genre1: '',
    genre2: '',
    organization: '',
    limit: '',
    price: '',
    description: '',
    imagePath: null, 
    dateCreated: '', // Updated to include the date created
    host: '',
  });

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (imageFile) => {
    setFormData((prevData) => ({
      ...prevData,
      imagePath: imageFile,
    }));
  };
  
  const handleImageUpload = async (imageFile) => {
    try {
      const user = auth.currentUser;
      const storageRef = ref(storage, `eventimages/${user.uid}/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL; 
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const publicationDate = formatDateString(selectedDay, selectedMonth, selectedYear);

    const updatedFormData = {
      ...formData,
      date: publicationDate, 
      dateCreated: getCurrentDate(), // Set the dateCreated field to the current date
    };
    try {
      if (formData.imagePath) {
        const imageUrl = await handleImageUpload(formData.imagePath);
        updatedFormData.imagePath = imageUrl;
      }

      // Save the event data to Firebase collection named 'events'
      const docRef = await addDoc(collection(db, 'events'), updatedFormData);
      console.log('Event data saved with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving event data:', error);
    }

    onClose();
    window.location.reload();
  };

  const formatDateString = (day, month, year) => {
    if (!day || !month || !year) return '';
    return `${month} ${day}, ${year}`;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <div className='fixed inset-0 flex items-center justify-center z-50' style={{ display: show ? 'block' : 'none', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', zIndex: '999', maxHeight: '80vh', overflowY: 'auto' }}>
      <button className="absolute top-0 right-0 m-3 p-2 border-b-gray-500 text-black hover:text-gray-700 hover:bg-red-500 bg-transparent" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>

        <h2>Create New Article</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>ID</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="text"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Title</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Location</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
            <label>Date</label>
            <BirthdaySelector
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </div>
          <div className='ml-24 mt-1 flex flex-col'>
          <label>Time</label>
          <input
            className="block appearance-none w-1/1 bg-transparent border border-gray-400 px-2 py-1 rounded-full focus:outline-none focus:border-black text-lg"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block">Genres</label>
              <input
                className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
                type="text"
                name="genre1"
                value={formData.genre1}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2">
              <input
                className='mt-6 border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
                type="text"
                name="genre2"
                value={formData.genre2}
                onChange={handleChange}
              />
            </div>
          </div>

         

          <div className="flex mb-4">
          <div className='mr-2'>
            <label>Organization</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>
            <div className="mr-2 w-1/3">
            <label>Limit</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
            />
          </div>
          <div className='mr-2 w-1/3'>
            <label>Price</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Host</label>
            <textarea
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              rows={4}
              name="host"
              value={formData.host}
              onChange={handleChange}
            />
          </div>

          <div className='ml-12 flex justify-center items-center'>
            <EventImageUploader onImageChange={handleImageChange} />
          </div>

          <div>
            <button className='rounded-full border w-full  my-5 py-2 bg-black hover:bg-gray-500 text-white' type="submit">Save</button>
            <button className='rounded-full border w-full my-5 py-2 bg-black hover:bg-gray-500 text-white' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

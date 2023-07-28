import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import BirthdaySelector from '../../../constant/birthdaySelector';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from '../../../config/firebase'; 
import ImageUploader from './imageUploader';

const CreateArticle = ({ show, onClose, onSaveArticle }) => {
  const [formData, setFormData] = useState({
    ID: '',
    title: '',
    date: '',
    organization: '',
    description: '',
    image: null,
    publicationDate: '',
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
      image: imageFile,
    }));
  };
  
  const handleImageUpload = async (imageFile) => {
    try {
      const user = auth.currentUser;
      const storageRef = ref(storage, `articleimages/${user.uid}/${imageFile.name}`);
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
      publicationDate: publicationDate,
      date: `${selectedMonth} ${selectedDay}, ${selectedYear}`,
    };
  
    try {
      if (formData.image) {
        const imageUrl = await handleImageUpload(formData.image);
        updatedFormData.image = imageUrl; 
      }
  
      onSaveArticle(updatedFormData);
  
      const docRef = await addDoc(collection(db, 'articles'), updatedFormData);
      console.log('Article data saved with ID:', docRef.id);
    } catch (error) {
      console.error('Error saving article data:', error);
    }
  
    onClose();
    window.location.reload();
  };
  

  const formatDateString = (day, month, year) => {
    if (!day || !month || !year) return '';
    return `${month} ${day}, ${year}`;
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

          <div>
            <label>Organization</label>
            <input
              className='border-black border-opacity-40 p-2 rounded pl-10 border w-full bg-transparent'
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
            />
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
        
            <ImageUploader onImageChange={handleImageChange}  />
          </div>

          <div>
            {formData.publicationDate && <p>Publication Date: {formData.publicationDate}</p>}
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

export default CreateArticle;
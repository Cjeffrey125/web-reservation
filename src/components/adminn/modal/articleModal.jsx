import React, { useState, useEffect } from "react";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import { db, auth, storage, ref, uploadBytes, getDownloadURL } from "../../../config/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BsPencil } from 'react-icons/bs';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import ImageUploader from './imageUploader';
import BirthdaySelector from "../../../constant/birthdaySelector";

const ArticleModal = ({ title, des, imagePath, date, org, onClose, isOpen, onImageChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(des);
  const [editedDate, setEditedDate] = useState(date);
  const [editedOrganization, setEditedOrganization] = useState(org);
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [currentImageURL, setCurrentImageURL] = useState(null);
  const [newImageURL, setNewImageURL] = useState(null);


  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    setCurrentImageURL(imagePath);

    if (isOpen && date) {
      const [month, dayYear] = date.split(' ');
      const [day, year] = dayYear.split(', ');
      setSelectedMonth(month);
      setSelectedDay(day);
      setSelectedYear(year);
      setEditedDate(date); 
    }
  }, [imagePath, isOpen, date]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedArticle = {
        title: editedTitle,
        description: editedDescription,
        organization: editedOrganization,
        imagePath: newImageURL || imagePath,
      };
  
      if (editedImageFile) {
        const imageUrl = await handleImageUpload(editedImageFile, editedDate); 
        updatedArticle.imagePath = imageUrl;
        setEditedImageFile(null);
      }
  
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const matchingArticle = querySnapshot.docs.find(
        (doc) => doc.data().title === title && doc.data().description === des
      );
  
      if (matchingArticle) {
        const articleId = matchingArticle.id;
  
        const articleRef = doc(db, 'articles', articleId);
        
        // Update only the 'date' field in the document
        await updateDoc(articleRef, { date: editedDate });
        
        // Update the rest of the fields in the document
        await updateDoc(articleRef, updatedArticle);
  
        setEditedTitle(updatedArticle.title);
        setEditedDescription(updatedArticle.description);
        setEditedOrganization(updatedArticle.organization);
        setCurrentImageURL(updatedArticle.imagePath);
      } else {
        console.error('Article not found with matching title and description.');
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  
    setIsEditMode(false);
    window.location.reload();
  };

  const handleImageChange = (imageFile, newImageURL) => {
    setEditedImageFile(imageFile);
    setCurrentImageURL(newImageURL);
    onImageChange(imageFile, newImageURL); 
    setNewImageURL(newImageURL);
  };

  const handleImageUpload = async (imageFile) => {
    try {
      const user = auth.currentUser;
      const storageRef = ref(
        storage,
        `articleimages/${user.uid}/${imageFile.name}`
      );
      await uploadBytes(storageRef, imageFile);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleNewImageChange = (imageFile, newImageURL) => {
    setNewImageURL(newImageURL);
  };
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="fixed inset-0 z-40 backdrop-filter backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
        <div className="payment-container h-[80%] max-h-[80%] w-[50%] border-2 rounded-lg border-gray-500 flex flex-col bg-white p-12 rounded-lg shadow-md relative overflow-y-auto">
          <button
            className="absolute top-0 right-0 m-3 p-2 border-b-gray-500 text-black hover:text-gray-700 hover:bg-red-500 bg-transparent"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <div className='flex flex-row items-center justify-between mb-8'>
            <h1 className='text-3xl font-bold'>Edit Article</h1>

            {isEditMode ? (
              <button className='w-10' onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faSave} className="text-black text-1xl" />
              </button>
            ) : (
              <button className='w-10' onClick={handleEditClick}>
              <BsPencil className="text-black text-1xl" />
              </button>
            )}
          </div>

          <div className="flex">
            <div className="title-container flex-1">
              {isEditMode ? (
                <input
                  className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <h3 className="ml-12 text-base uppercase text-designColor font-normal">
                  {editedTitle}
                </h3>
              )}
            </div>

            <div className="divider mx-4"></div>

            <div className="image-container flex-1">
  {isEditMode ? (
    <ImageUploader
      onImageChange={(imageFile, newImageURL) => {
        handleNewImageChange(imageFile, newImageURL);
      }}
      imageURL={newImageURL || currentImageURL} 
    />
  ) : (
    <img
      className="w-full h-60 object-cover group-hover:scale-110 duration-300 cursor-pointer mr-24"
      src={currentImageURL}
      alt="src"
    />
  )}
</div>
      </div>

      <div className="date-container ">
        {isEditMode ? (
          <div>
            <BirthdaySelector
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
                <input
                  className="ml-12 text-sm tracking-wide mt-3 hover:text-gray-700 duration-300"
                  type="text"
                  value={editedOrganization}
                  onChange={(e) => setEditedOrganization(e.target.value)}
                />
              </div>
            ) : (
              <p className="ml-12 text-sm tracking-wide mt-3 hover:text-gray-700 duration-300">
                {date} | {org}
              </p>
            )}
          </div>

          <div className="horizontal-divider my-4"></div>

        
          <div className="description-container mt-12">
            {isEditMode ? (
              <textarea
                className="ml-12 text-base w-[80%] uppercase text-designColor font-normal border-b border-gray-500 flex-1"
                rows={4}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            ) : (
              <p className='ml-12'>{editedDescription}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
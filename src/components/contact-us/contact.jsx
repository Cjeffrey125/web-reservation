import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { collection, addDoc } from 'firebase/firestore'; 
import { db } from '../../config/firebase';
import images from '../../constant/images';
import ContactModal from '../adminn/modal/contactModal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    status:'No Reply',
  });

  const [showModal, setShowModal] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      });
      const formDataWithDate = {
        ...formData,
        dateSent: currentDate,
      };
  

      await addDoc(collection(db, 'queries'), formDataWithDate);
      console.log('Form data saved successfully.');

      setShowModal(true);
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };

  const handleContinueClick = () => {

    setFormData({
      name: '',
      email: '',
      message: '',
    });

  
    setShowModal(false);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row justify-center items-center p-4 ">
      <form className="flex flex-col max-w-[600px] w-full ml-12 mr-12 md:mt-12" onSubmit={handleSubmit}>
        <div className="pb-8">
          <p className="text-4xl font-bold text-black">Contact Us</p>
          <p className="text-black py-4">We are here for you. How can we help?</p>
        </div>
        <input className="bg-gray-300 border border-gray-400 rounded-lg py-2 px-4 mb-4" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
        <input className="bg-gray-300 border border-gray-400 rounded-lg py-2 px-4 mb-4" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        <textarea className="bg-gray-300 border border-gray-400 rounded-lg py-2 px-4 mb-4" name="message" rows="10" placeholder="Message" value={formData.message} onChange={handleChange}></textarea>
        <button className="w-40 h-12 mb-5 rounded-full shadow-shadowOne flex items-center justify-center 
          bg-green-300 group hover:bg-green-500 
          transition-colors duration-1000 mx-auto text-white" type="submit">Submit</button>
      </form>

      <div className="flex flex-col max-w-[600px] w-full ml-12 md:mt-8">
        <div className="pb-8">
          <img className="icon ml-12 mb-4" src={images.contacticon} style={{ maxWidth: '300px' }} alt="Contact Icon" />
          <p className="text-4xl font-bold text-black mb-6">Get in Touch with Us</p>
          <p><FontAwesomeIcon icon={faLocationDot} /> 83QM+GPF, Old Municipal Building, Biñan, Laguna</p>
          <p className="mt-2"><FontAwesomeIcon icon={faPhone} /> 091234567891</p>
          <p className="mt-2"><FontAwesomeIcon icon={faEnvelope} /> Example@gmail.com</p>
        </div>
      </div>

      {showModal && (
        <ContactModal
          closeModal={() => setShowModal(false)} 
          openModal={showModal}
          handleContinueClick={handleContinueClick}
        />
      )}
    </div>
  );
};

export default Contact;

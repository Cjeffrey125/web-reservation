import React, { useState } from 'react';
import { useUserAuth } from '../../context/authContext';

const ReplyModal = ({ closeModal, query, onSend }) => {
  const [message, setMessage] = useState('');
  const { user } = useUserAuth();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    console.log(`Message to: ${query.name} (${query.email})`);
    console.log('Message content:', message);

    onSend(message);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900">
      <div className="bg-white w-96 p-6 rounded-lg shadow-md relative">
        <h1 className="text-2xl font-bold mb-4">Reply to Concern</h1>
        <p className="mb-4">From: {user.email}</p>
        <p className="mb-4">To: {query.name}</p>
        <p className="mb-4">Email: {query.email}</p>
        <textarea
          className="w-full h-32 bg-gray-100 rounded-lg p-2 mb-4"
          placeholder="Enter your reply here..."
          value={message}
          onChange={handleInputChange}
        />
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg mr-4"
            onClick={handleSend}
          >
            Send
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;

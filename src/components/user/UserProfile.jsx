import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/authContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import UserImage from './userImage';
import BirthdaySelector from '../../constant/birthdaySelector';

const UserProfile = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstname: user?.firstname || '',
    lastname: user?.lastname || '',
    selectedGender: user?.selectedGender || '',
    age: user?.age || '',
    phoneNumber: user?.phoneNumber || '',
    selectedMonth: user?.selectedMonth || '',
    selectedDay: user?.selectedDay || '',
    selectedYear: user?.selectedYear || '',
  });

  useEffect(() => {
    setUpdatedUser({
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      selectedGender: user?.selectedGender || '',
      age: user?.age || '',
      phoneNumber: user?.phoneNumber || '',
      selectedMonth: user?.selectedMonth || '',
      selectedDay: user?.selectedDay || '',
      selectedYear: user?.selectedYear || '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updatedUser);
      console.log('User data updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto my-4 p-4">
      <h1 className="text-2xl font-bold py-4">Personal Information</h1>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="py-2">User Email:</td>
            <td>{user && user.email}</td>
          </tr>
          <tr>
            <td className="py-2">First Name:</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="firstname"
                  value={updatedUser.firstname}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 rounded"
                />
              ) : (
                <span>{user && user.firstname}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2">Last Name:</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="lastname"
                  value={updatedUser.lastname}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 rounded"
                />
              ) : (
                <span>{user && user.lastname}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2">Gender:</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="selectedGender"
                  value={updatedUser.selectedGender}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 rounded"
                />
              ) : (
                <span>{user && user.selectedGender}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2">Age:</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="age"
                  value={updatedUser.age}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 rounded"
                />
              ) : (
                <span>{user && user.age}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2">Contact Number:</td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={updatedUser.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 p-1 rounded"
                />
              ) : (
                <span>{user && user.phoneNumber}</span>
              )}
            </td>
          </tr>
          <tr>
            <td className="py-2">Birthday:</td>
            <td>
              {isEditing ? (
                <BirthdaySelector
                  selectedMonth={updatedUser.selectedMonth}
                  setSelectedMonth={(value) => setUpdatedUser((prevUser) => ({ ...prevUser, selectedMonth: value }))}
                  selectedDay={updatedUser.selectedDay}
                  setSelectedDay={(value) => setUpdatedUser((prevUser) => ({ ...prevUser, selectedDay: value }))}
                  selectedYear={updatedUser.selectedYear}
                  setSelectedYear={(value) => setUpdatedUser((prevUser) => ({ ...prevUser, selectedYear: value }))}
                />
              ) : (
                <span>
                  {user && user.selectedMonth} {user && user.selectedDay}, {user && user.selectedYear}
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        {!isEditing ? (
          <button
            className="border border-gray-300 hover:border-black rounded-full py-1 px-4"
            onClick={() => setIsEditing(true)}
          >
            Change
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
            onClick={handleUpdate}
          >
            Save
          </button>
        )}
      </div>
      <div>
        <UserImage />
      </div>
    </div>
  );
};

export default UserProfile;

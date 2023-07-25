import { createContext, useContext, useState } from 'react';
import { storage } from '../config/firebase';

const AdminContext = createContext();

export const useAdminAuth = () => useContext(AdminContext);

export const AdminAuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const uploadImage = async (imageFile) => {
    try {
      setLoading(true);
      const imageRef = storage.ref().child(`admin_images/${imageFile.name}`);
      await imageRef.put(imageFile);
      const imageUrl = await imageRef.getDownloadURL();
      setLoading(false);
      return imageUrl;
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return (
    <AdminContext.Provider value={{ uploadImage, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

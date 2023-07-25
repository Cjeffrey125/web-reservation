import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAmbopoxbGm9iMp8Tx__dTdu_ygfIpFxd8",
    authDomain: "web-reservation-8849e.firebaseapp.com",
    projectId: "web-reservation-8849e",
    storageBucket: "web-reservation-8849e.appspot.com",
    messagingSenderId: "882673154976",
    appId: "1:882673154976:web:4ff4731f01bf45bb1ec2c5"
  };
  
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

   const upload = async (file, users, setLoading, setPhotoURL) => {
    const storageRef = ref(storage, `${users.uid}/${file.name}`);
  
    setLoading(true);
    await uploadBytes(storageRef, file);
    setLoading(false);
  
    const downloadURL = await getDownloadURL(storageRef);
    setPhotoURL(downloadURL);
  };

  export { db, auth, storage, ref, uploadBytes, getDownloadURL, collection, addDoc };
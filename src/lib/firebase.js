// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDg0NHH2IfR95bGmevvKO4TmtF2NL9hnVs',
  authDomain: 'chat-cuy-7ce48.firebaseapp.com',
  projectId: 'chat-cuy-7ce48',
  storageBucket: 'chat-cuy-7ce48.appspot.com',
  messagingSenderId: '52093203005',
  appId: '1:52093203005:web:003dce894e54c806bf7054',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

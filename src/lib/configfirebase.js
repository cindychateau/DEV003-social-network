import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAd2memvRUmWmvAnGpocHTjdzWpxO-VWho",
    authDomain: "social-network-la.firebaseapp.com",
    projectId: "social-network-la",
    storageBucket: "social-network-la.appspot.com",
    messagingSenderId: "343222736207",
    appId: "1:343222736207:web:ada801f643e5ce993fe13a",
    measurementId: "G-BKEG2TZG81"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBcxIqqnLP0gWXobHUUGMXVLSMCmalcxDc",
  authDomain: "mendy-s.firebaseapp.com",
  projectId: "mendy-s",
  storageBucket: "mendy-s.appspot.com",
  messagingSenderId: "313701570188",
  appId: "1:313701570188:web:2815f70b54492480910da9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
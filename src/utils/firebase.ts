import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBr7L2I0AyuFQ5VcTuxm0_2qbsTGiN-5JI",
  authDomain: "playbook-59a53.firebaseapp.com",
  projectId: "playbook-59a53",
  storageBucket: "playbook-59a53.appspot.com",
  messagingSenderId: "476962525328",
  appId: "1:476962525328:web:b875edd83b6482219a8815"
};
export const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const firestore=getFirestore(app)
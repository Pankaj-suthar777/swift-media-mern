import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.FIRBASE_API_KEY,
  authDomain: process.env.FIRBASE_API_DOMAIN,
  projectId: process.env.FIRBASE_API_PROJECT_ID,
  storageBucket: process.env.FIRBASE_API_STORE_BUCKET,
  messagingSenderId: process.env.FIRBASE_API_MESSAGING_SENDER_ID,
  appId: process.env.FIRBASE_API_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;

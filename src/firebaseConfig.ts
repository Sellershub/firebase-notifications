import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

// Determine if the application is running in an emulator environment
const isEmulator = window.location.hostname === 'localhost';

// Firebase configuration
const firebaseConfig = {
  apiKey: isEmulator ? 'dummy-api-key' : 'real-api-key',
  authDomain: isEmulator ? 'localhost' : 'react-notifications-app.firebaseapp.com',
  projectId: 'react-notifications-app',
  storageBucket: isEmulator ? 'localhost' : 'react-notifications-app.appspot.com',
  messagingSenderId: '3469974871',
  appId: '1:3469974871:web:ab8f67afee49b9a25cb212'
};

// Initialize Firebase with the configuration
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Connect to local emulators if running locally
if (isEmulator) {
  connectFirestoreEmulator(db, 'localhost', 8080); // Connect Firestore to the local emulator
  connectAuthEmulator(auth, 'http://localhost:9099'); // Connect Authentication to the local emulator
}

// Export Firestore and Authentication instances
export { db, auth };
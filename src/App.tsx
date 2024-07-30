import React from "react";

import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { NOTIFICATION_MESSAGES } from "./constants/messages";

import NotificationButton from "./components/NotificationButton";
import Notifications from "./components/Notifications";

import "./App.css";

const App: React.FC = () => {
  // Function to send a notification
  const sendNotification = async (message: string) => {
    try {
      await addDoc(collection(db, "notifications"), {
        message,
        read: false,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error sending notification: ", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Notification System</h1>
      <div className="button-container">
        {Object.keys(NOTIFICATION_MESSAGES).map((key) => (
          <NotificationButton
            key={key}
            label={`Button ${key.slice(-1)}`}
            onClick={() =>
              sendNotification(
                NOTIFICATION_MESSAGES[key as keyof typeof NOTIFICATION_MESSAGES]
              )
            }
          />
        ))}
      </div>
      <Notifications />
    </div>
  );
};

export default App;

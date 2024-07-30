import React, { useEffect, useState } from "react";

import { db } from "../firebaseConfig";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

import { Notification } from "../types/notification";

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to Firestore collection updates
    const unsub = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const notificationsData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Notification)
      );

      // Sort notifications: unread first, then by timestamp (newest first)
      notificationsData.sort((a, b) => {
        if (a.read === b.read) {
          const timestampA = a.timestamp?.seconds ?? 0;
          const timestampB = b.timestamp?.seconds ?? 0;
          return timestampB - timestampA;
        }
        return a.read ? 1 : -1;
      });

      setNotifications(notificationsData);
    });

    // Cleanup subscription on unmount
    return () => unsub();
  }, []);

  // Mark a notification as read
  const markAsRead = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { read: true });
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification-item ${
            notification.read ? "read" : "unread"
          }`}
        >
          <div>{notification.message}</div>
          <div>
            {!notification.read && (
              <button onClick={() => markAsRead(notification.id)}>
                Mark as Read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

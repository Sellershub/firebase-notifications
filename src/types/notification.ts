// Define Notification interface
export interface Notification {
  id: string;
  message: string;
  read: boolean;

  timestamp: { seconds: number; nanoseconds: number };
}

// Define interface for NotificationButton properties
export interface NotificationButtonProps {
  label: string; // Label for the button
  onClick: () => void; // Function to handle button click
}

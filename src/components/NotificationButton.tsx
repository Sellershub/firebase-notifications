import React from "react";
import { NotificationButtonProps } from "../types/notification";

const NotificationButton: React.FC<NotificationButtonProps> = ({
  label,
  onClick,
}) => (
  <button className="notification-button" onClick={onClick}>
    {label}
  </button>
);

export default NotificationButton;

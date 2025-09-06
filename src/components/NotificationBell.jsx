import { Bell } from "lucide-react";

export default function NotificationBell({ notifications }) {
  return (
    <div className="notification-icon">
      <Bell className="icon" />
      {notifications.length > 0 && (
        <span className="badge">{notifications.length}</span>
      )}
    </div>
  );
}
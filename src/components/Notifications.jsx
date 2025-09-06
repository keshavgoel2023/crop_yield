export default function Notifications({ notifications, t }) {
  return (
    <section className="notifications">
      <h2>{t.notifications}</h2>
      {notifications.length === 0 ? (
        <p className="empty">{t.empty}</p>
      ) : (
        notifications.map((n) => (
          <div key={n.id} className="notification">
            {n.msg}
          </div>
        ))
      )}
    </section>
  );
}
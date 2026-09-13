import { useEffect, useMemo, useState } from "react";
import "./Admin.css";

function Admin({ onBack }) {
  const [activePage, setActivePage] = useState("Overview");
  const [notification, setNotification] = useState("");
  const [notificationSent, setNotificationSent] = useState(false);
  const [bookingStatus, setBookingStatus] = useState({});
  const [liveBookings, setLiveBookings] = useState([]);

  const mockBookings = [
    {
      id: "YTR-2048",
      traveler: "Arjun Mehta",
      service: "Hotel",
      provider: "The Heritage Hotel",
      location: "Hyderabad",
      amount: "₹2,400",
      status: "Confirmed",
      time: "2 min ago",
    },
    {
      id: "YTR-2047",
      traveler: "Sophia Williams",
      service: "Guide",
      provider: "Arjun Guide",
      location: "Hyderabad",
      amount: "₹1,200",
      status: "Confirmed",
      time: "18 min ago",
    },
    {
      id: "YTR-2046",
      traveler: "Rahul Sharma",
      service: "Restaurant",
      provider: "Gokul Chaat House",
      location: "Hyderabad",
      amount: "₹680",
      status: "Pending",
      time: "32 min ago",
    },
    {
      id: "YTR-2045",
      traveler: "Emma Brown",
      service: "Transport",
      provider: "Yatra Transport",
      location: "Hyderabad",
      amount: "₹420",
      status: "Completed",
      time: "1 hr ago",
    },
  ];

  const menu = [
    "Overview",
    "Travelers",
    "Hotels",
    "Restaurants",
    "Transport",
    "Guides",
    "Bookings",
    "Notifications",
    "Settings",
  ];

  useEffect(() => {
    const loadBookings = () => {
      const stored = JSON.parse(
        localStorage.getItem("yatra360_bookings") || "[]"
      );

      if (stored.length > 0) {
        const formatted = stored
          .slice()
          .reverse()
          .map((booking) => ({
            ...booking,
            traveler: booking.guest,
            time: "Just now",
            amount:
              typeof booking.amount === "number"
                ? `₹${booking.amount.toLocaleString("en-IN")}`
                : booking.amount,
          }));

        setLiveBookings(formatted);
      }
    };

    loadBookings();

    window.addEventListener("storage", loadBookings);

    const interval = setInterval(loadBookings, 1000);

    return () => {
      window.removeEventListener("storage", loadBookings);
      clearInterval(interval);
    };
  }, []);

  const allBookings = useMemo(() => {
    const combined = [...liveBookings, ...mockBookings];

    const unique = [];
    const ids = new Set();

    combined.forEach((booking) => {
      if (!ids.has(booking.id)) {
        ids.add(booking.id);
        unique.push(booking);
      }
    });

    return unique;
  }, [liveBookings]);

  const updateStatus = (id, status) => {
    setBookingStatus((prev) => ({
      ...prev,
      [id]: status,
    }));

    const stored = JSON.parse(
      localStorage.getItem("yatra360_bookings") || "[]"
    );

    const updated = stored.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );

    localStorage.setItem(
      "yatra360_bookings",
      JSON.stringify(updated)
    );

    const latest = JSON.parse(
      localStorage.getItem("yatra360_latest_booking") || "null"
    );

    if (latest && latest.id === id) {
      localStorage.setItem(
        "yatra360_latest_booking",
        JSON.stringify({
          ...latest,
          status,
        })
      );
    }
  };

  const getStatus = (booking) =>
    bookingStatus[booking.id] || booking.status;

  const sendNotification = () => {
    if (!notification.trim()) return;

    setNotificationSent(true);

    setTimeout(() => {
      setNotificationSent(false);
      setNotification("");
    }, 2500);
  };

  const exportBookings = () => {
    const data = JSON.stringify(allBookings, null, 2);
    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "yatra360-bookings.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const renderOverview = () => (
    <>
      <div className="admin-welcome">
        <div>
          <span>YATRA 360 COMMAND CENTER</span>
          <h1>Good morning, Admin.</h1>
          <p>
            Monitor travelers, partners and bookings from one
            central control system.
          </p>
        </div>

        <div className="admin-welcome-orb">
          <div>Y</div>
        </div>
      </div>

      {liveBookings.length > 0 && (
        <div className="admin-live-alert">
          <div className="admin-alert-icon">!</div>

          <div>
            <strong>Live booking received</strong>
            <p>
              {liveBookings[0].traveler} created a{" "}
              {liveBookings[0].service.toLowerCase()} booking.
            </p>
          </div>

          <button onClick={() => setActivePage("Bookings")}>
            View Booking →
          </button>
        </div>
      )}

      <div className="admin-kpi-grid">
        <div className="admin-kpi">
          <span>TRAVELERS</span>
          <strong>12,480</strong>
          <small>↑ 12.8% this month</small>
        </div>

        <div className="admin-kpi">
          <span>ACTIVE PARTNERS</span>
          <strong>1,284</strong>
          <small>↑ 8.4% this month</small>
        </div>

        <div className="admin-kpi">
          <span>BOOKINGS</span>
          <strong>
            {4_892 + liveBookings.length}
          </strong>
          <small>↑ 18.6% this month</small>
        </div>

        <div className="admin-kpi">
          <span>REVENUE</span>
          <strong>₹18.6L</strong>
          <small>↑ 21.4% this month</small>
        </div>
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>ACTIVITY</span>
              <h2>Recent bookings</h2>
            </div>

            <button onClick={() => setActivePage("Bookings")}>
              View all →
            </button>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Traveler</th>
                  <th>Service</th>
                  <th>Provider</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {allBookings.slice(0, 6).map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.id}</strong>
                      <small>{booking.time}</small>
                    </td>

                    <td>{booking.traveler}</td>

                    <td>{booking.service}</td>

                    <td>{booking.provider}</td>

                    <td>
                      <strong>{booking.amount}</strong>
                    </td>

                    <td>
                      <span
                        className={`admin-status ${getStatus(
                          booking
                        )
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {getStatus(booking)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>PARTNERS</span>
              <h2>Pending approvals</h2>
            </div>
          </div>

          <div className="admin-approval-list">
            <div>
              <span>🏨</span>
              <section>
                <strong>Royal Palace Hotel</strong>
                <small>Hotel · Hyderabad</small>
              </section>
              <b>Review</b>
            </div>

            <div>
              <span>🧭</span>
              <section>
                <strong>Ravi Local Tours</strong>
                <small>Guide · Jaipur</small>
              </section>
              <b>Review</b>
            </div>

            <div>
              <span>🚕</span>
              <section>
                <strong>CityRide Mobility</strong>
                <small>Transport · Goa</small>
              </section>
              <b>Review</b>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-bottom-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>CONTROL</span>
              <h2>Quick actions</h2>
            </div>
          </div>

          <div className="admin-quick-actions">
            <button onClick={() => setActivePage("Bookings")}>
              <span>▤</span>
              <strong>Manage bookings</strong>
              <small>View and update bookings</small>
            </button>

            <button
              onClick={() => setActivePage("Notifications")}
            >
              <span>◇</span>
              <strong>Send notification</strong>
              <small>Reach your travelers</small>
            </button>

            <button onClick={() => setActivePage("Hotels")}>
              <span>+</span>
              <strong>Approve partner</strong>
              <small>Review applications</small>
            </button>

            <button onClick={() => setActivePage("Settings")}>
              <span>⚙</span>
              <strong>Platform settings</strong>
              <small>Manage configuration</small>
            </button>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>SYSTEM</span>
              <h2>Platform health</h2>
            </div>
          </div>

          <div className="admin-system-list">
            <div>
              <span className="online"></span>
              <strong>Booking engine</strong>
              <b>Operational</b>
            </div>

            <div>
              <span className="online"></span>
              <strong>Partner network</strong>
              <b>Operational</b>
            </div>

            <div>
              <span className="online"></span>
              <strong>Traveler services</strong>
              <b>Operational</b>
            </div>

            <div>
              <span className="online"></span>
              <strong>Notification system</strong>
              <b>Operational</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderBookings = () => (
    <section className="admin-page">
      <div className="admin-page-heading">
        <div>
          <span>TRANSACTION CONTROL</span>
          <h1>Bookings</h1>
        </div>

        <button
          className="admin-primary-button"
          onClick={exportBookings}
        >
          Export Data ↓
        </button>
      </div>

      <div className="admin-kpi-grid">
        <div className="admin-kpi">
          <span>TOTAL BOOKINGS</span>
          <strong>{allBookings.length}</strong>
          <small>All services</small>
        </div>

        <div className="admin-kpi">
          <span>NEW</span>
          <strong>
            {
              allBookings.filter(
                (b) => getStatus(b) === "New"
              ).length
            }
          </strong>
          <small>Needs attention</small>
        </div>

        <div className="admin-kpi">
          <span>CONFIRMED</span>
          <strong>
            {
              allBookings.filter(
                (b) => getStatus(b) === "Confirmed"
              ).length
            }
          </strong>
          <small>Active bookings</small>
        </div>

        <div className="admin-kpi">
          <span>COMPLETED</span>
          <strong>
            {
              allBookings.filter(
                (b) => getStatus(b) === "Completed"
              ).length
            }
          </strong>
          <small>Successful trips</small>
        </div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span>LIVE BOOKING DATABASE</span>
            <h2>All bookings</h2>
          </div>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Traveler</th>
                <th>Service</th>
                <th>Provider</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {allBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.id}</strong>
                  </td>

                  <td>{booking.traveler}</td>

                  <td>{booking.service}</td>

                  <td>{booking.provider}</td>

                  <td>{booking.location}</td>

                  <td>
                    <strong>{booking.amount}</strong>
                  </td>

                  <td>
                    <select
                      value={getStatus(booking)}
                      onChange={(e) =>
                        updateStatus(
                          booking.id,
                          e.target.value
                        )
                      }
                      className="admin-status-select"
                    >
                      <option>New</option>
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Preparing</option>
                      <option>Accepted</option>
                      <option>Checked In</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const renderNotifications = () => (
    <section className="admin-page">
      <div className="admin-page-heading">
        <div>
          <span>COMMUNICATION CENTER</span>
          <h1>Notifications</h1>
        </div>
      </div>

      <div className="admin-notification-grid">
        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>COMPOSE</span>
              <h2>Send notification</h2>
            </div>
          </div>

          <label>Audience</label>

          <select className="admin-input">
            <option>All Travelers</option>
            <option>Hyderabad Travelers</option>
            <option>Foreign Travelers</option>
            <option>Hotel Partners</option>
            <option>Restaurant Partners</option>
            <option>Transport Partners</option>
            <option>Guide Partners</option>
          </select>

          <label>Message</label>

          <textarea
            className="admin-textarea"
            placeholder="Write your notification..."
            value={notification}
            onChange={(e) =>
              setNotification(e.target.value)
            }
          />

          <button
            className="admin-primary-button"
            onClick={sendNotification}
          >
            Send Notification →
          </button>

          {notificationSent && (
            <div className="admin-success">
              ✓ Notification sent successfully.
            </div>
          )}
        </div>

        <div className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span>PREVIEW</span>
              <h2>Traveler notification</h2>
            </div>
          </div>

          <div className="admin-notification-preview">
            <div>Y</div>

            <section>
              <strong>Yatra 360</strong>

              <p>
                {notification ||
                  "Your next journey starts here. Discover India's best experiences with Yatra 360."}
              </p>

              <small>Just now</small>
            </section>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPlaceholder = () => (
    <section className="admin-page">
      <div className="admin-page-heading">
        <div>
          <span>YATRA 360 MANAGEMENT</span>
          <h1>{activePage}</h1>
        </div>
      </div>

      <div className="admin-placeholder">
        <div>⚙</div>

        <h2>{activePage} Management</h2>

        <p>
          This module is ready for the next stage of the
          Yatra 360 platform.
        </p>

        <button
          className="admin-primary-button"
          onClick={() => setActivePage("Bookings")}
        >
          View Live Bookings →
        </button>
      </div>
    </section>
  );

  const renderPage = () => {
    if (activePage === "Overview") return renderOverview();
    if (activePage === "Bookings") return renderBookings();
    if (activePage === "Notifications")
      return renderNotifications();

    return renderPlaceholder();
  };

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div>Y</div>

          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <div className="admin-sidebar-label">
          ADMIN CONSOLE
        </div>

        <nav className="admin-nav">
          {menu.map((item) => (
            <button
              key={item}
              className={
                activePage === item ? "active" : ""
              }
              onClick={() => setActivePage(item)}
            >
              <span>
                {item === "Overview" && "⌂"}
                {item === "Travelers" && "♙"}
                {item === "Hotels" && "▣"}
                {item === "Restaurants" && "◉"}
                {item === "Transport" && "🚕"}
                {item === "Guides" && "🧭"}
                {item === "Bookings" && "▤"}
                {item === "Notifications" && "◇"}
                {item === "Settings" && "⚙"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-system-mini">
            <span></span>

            <div>
              <strong>All Systems</strong>
              <small>Operational</small>
            </div>
          </div>

          <button
            className="admin-main-button"
            onClick={onBack}
          >
            ↩ Main Website
          </button>

          <div className="admin-profile">
            <div className="admin-avatar">AD</div>

            <div>
              <strong>Yatra Admin</strong>
              <small>Super Administrator</small>
            </div>

            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span>YATRA 360</span>
            <h2>{activePage}</h2>
          </div>

          <div className="admin-top-actions">
            <button
              onClick={() =>
                setActivePage("Notifications")
              }
            >
              ◇
              {liveBookings.length > 0 && <i></i>}
            </button>

            <div className="admin-top-avatar">AD</div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default Admin;
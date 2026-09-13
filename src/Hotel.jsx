import { useState } from "react";
import "./Hotel.css";

function Hotel({ onBack }) {
  const [activePage, setActivePage] = useState("Overview");

  const [bookingStatus, setBookingStatus] = useState({
    "HTL-2048": "New",
    "HTL-2047": "Confirmed",
    "HTL-2046": "Checked In",
    "HTL-2045": "Completed",
  });

  const bookings = [
    {
      id: "HTL-2048",
      guest: "Arjun Mehta",
      room: "Deluxe King",
      date: "Sep 18–20, 2026",
      guests: "2 Guests",
      amount: "₹4,800",
    },
    {
      id: "HTL-2047",
      guest: "Sophia Williams",
      room: "Premium Suite",
      date: "Sep 19–22, 2026",
      guests: "2 Guests",
      amount: "₹8,400",
    },
    {
      id: "HTL-2046",
      guest: "Rahul Sharma",
      room: "Executive Room",
      date: "Sep 20–21, 2026",
      guests: "1 Guest",
      amount: "₹3,200",
    },
    {
      id: "HTL-2045",
      guest: "Emma Brown",
      room: "Family Room",
      date: "Sep 21–24, 2026",
      guests: "4 Guests",
      amount: "₹9,600",
    },
  ];

  const rooms = [
    {
      name: "Deluxe King",
      total: 24,
      available: 8,
      price: "₹2,400",
    },
    {
      name: "Premium Suite",
      total: 12,
      available: 3,
      price: "₹4,200",
    },
    {
      name: "Executive Room",
      total: 18,
      available: 6,
      price: "₹3,200",
    },
    {
      name: "Family Room",
      total: 10,
      available: 2,
      price: "₹4,800",
    },
  ];

  const menu = [
    "Overview",
    "Bookings",
    "Rooms",
    "Guests",
    "Reviews",
    "Offers",
    "Analytics",
    "Settings",
  ];

  const updateBooking = (id, status) => {
    setBookingStatus((current) => ({
      ...current,
      [id]: status,
    }));
  };

  const statusClass = (status) =>
    status.toLowerCase().replace(/\s+/g, "-");

  const renderPage = () => {
    if (activePage === "Bookings") {
      return (
        <section className="hotel-page">
          <div className="hotel-page-heading">
            <div>
              <span>RESERVATION MANAGEMENT</span>
              <h1>Bookings</h1>
            </div>

            <button
              className="hotel-primary-button"
              onClick={() =>
                alert("Hotel booking report generated.")
              }
            >
              Export Report ↓
            </button>
          </div>

          <div className="hotel-kpi-grid">
            <div className="hotel-kpi">
              <span>Today's Bookings</span>
              <strong>18</strong>
              <small>+4 from yesterday</small>
            </div>

            <div className="hotel-kpi">
              <span>New Requests</span>
              <strong>3</strong>
              <small>Needs attention</small>
            </div>

            <div className="hotel-kpi">
              <span>Check-ins</span>
              <strong>12</strong>
              <small>Today</small>
            </div>

            <div className="hotel-kpi">
              <span>Revenue</span>
              <strong>₹42,800</strong>
              <small>Today's estimate</small>
            </div>
          </div>

          <div className="hotel-panel">
            <div className="hotel-panel-heading">
              <div>
                <span>LIVE RESERVATIONS</span>
                <h2>Incoming bookings</h2>
              </div>

              <div className="hotel-live">
                <i></i>
                LIVE
              </div>
            </div>

            <div className="hotel-table-wrap">
              <table className="hotel-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Stay</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.id}</strong>
                      </td>

                      <td>
                        <strong>{booking.guest}</strong>
                        <small>{booking.guests}</small>
                      </td>

                      <td>{booking.room}</td>

                      <td>{booking.date}</td>

                      <td>
                        <strong>{booking.amount}</strong>
                      </td>

                      <td>
                        {bookingStatus[booking.id] === "New" ? (
                          <div className="hotel-booking-actions">
                            <button
                              className="hotel-accept"
                              onClick={() =>
                                updateBooking(
                                  booking.id,
                                  "Confirmed"
                                )
                              }
                            >
                              Accept
                            </button>

                            <button
                              className="hotel-reject"
                              onClick={() =>
                                updateBooking(
                                  booking.id,
                                  "Cancelled"
                                )
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`hotel-status ${statusClass(
                              bookingStatus[booking.id]
                            )}`}
                          >
                            {bookingStatus[booking.id]}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      );
    }

    if (activePage === "Rooms") {
      return (
        <section className="hotel-page">
          <div className="hotel-page-heading">
            <div>
              <span>INVENTORY MANAGEMENT</span>
              <h1>Rooms</h1>
            </div>

            <button
              className="hotel-primary-button"
              onClick={() =>
                alert("New room type added for demo.")
              }
            >
              + Add Room
            </button>
          </div>

          <div className="hotel-room-grid">
            {rooms.map((room) => (
              <div className="hotel-room-card" key={room.name}>
                <div className="hotel-room-icon">🛏️</div>

                <h3>{room.name}</h3>

                <p>
                  {room.available} rooms available
                </p>

                <div className="hotel-room-bar">
                  <span
                    style={{
                      width: `${
                        (room.available / room.total) * 100
                      }%`,
                    }}
                  ></span>
                </div>

                <div className="hotel-room-bottom">
                  <strong>{room.price}</strong>
                  <small>
                    {room.total} total rooms
                  </small>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activePage !== "Overview") {
      return (
        <section className="hotel-page">
          <div className="hotel-page-heading">
            <div>
              <span>HOTEL MANAGEMENT</span>
              <h1>{activePage}</h1>
            </div>
          </div>

          <div className="hotel-placeholder">
            <div>🏨</div>

            <h2>{activePage} Management</h2>

            <p>
              This module is ready for the next stage of
              the Yatra 360 partner ecosystem.
            </p>

            <button
              className="hotel-primary-button"
              onClick={() => setActivePage("Bookings")}
            >
              View Incoming Bookings →
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="hotel-page">
        <div className="hotel-welcome">
          <div>
            <span>HOTEL PARTNER PORTAL</span>

            <h1>
              Welcome back,
              <br />
              Heritage Hotel.
            </h1>

            <p>
              Manage your property, reservations and guests
              from one place.
            </p>
          </div>

          <div className="hotel-welcome-orb">
            <div></div>
          </div>
        </div>

        <div className="hotel-kpi-grid">
          <div className="hotel-kpi">
            <span>Total Bookings</span>
            <strong>284</strong>
            <small>↑ 16.4% this month</small>
          </div>

          <div className="hotel-kpi">
            <span>Revenue</span>
            <strong>₹8.42L</strong>
            <small>↑ 12.8% this month</small>
          </div>

          <div className="hotel-kpi">
            <span>Occupancy</span>
            <strong>78%</strong>
            <small>+6.2% this month</small>
          </div>

          <div className="hotel-kpi">
            <span>Rating</span>
            <strong>4.8 ★</strong>
            <small>342 reviews</small>
          </div>
        </div>

        <div className="hotel-dashboard-grid">
          <div className="hotel-panel">
            <div className="hotel-panel-heading">
              <div>
                <span>LIVE ACTIVITY</span>
                <h2>Recent bookings</h2>
              </div>

              <button
                onClick={() => setActivePage("Bookings")}
              >
                View all →
              </button>
            </div>

            <div className="hotel-table-wrap">
              <table className="hotel-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <strong>{booking.id}</strong>
                      </td>

                      <td>{booking.guest}</td>

                      <td>{booking.room}</td>

                      <td>
                        <strong>{booking.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`hotel-status ${statusClass(
                            bookingStatus[booking.id]
                          )}`}
                        >
                          {bookingStatus[booking.id]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hotel-panel">
            <div className="hotel-panel-heading">
              <div>
                <span>PROPERTY STATUS</span>
                <h2>Today's occupancy</h2>
              </div>
            </div>

            <div className="hotel-occupancy">
              <div className="hotel-occupancy-circle">
                <strong>78%</strong>
                <span>Occupied</span>
              </div>

              <div className="hotel-occupancy-list">
                <div>
                  <span>Occupied</span>
                  <strong>42 rooms</strong>
                </div>

                <div>
                  <span>Available</span>
                  <strong>13 rooms</strong>
                </div>

                <div>
                  <span>Maintenance</span>
                  <strong>4 rooms</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hotel-bottom-grid">
          <div className="hotel-panel">
            <div className="hotel-panel-heading">
              <div>
                <span>ROOM INVENTORY</span>
                <h2>Room availability</h2>
              </div>

              <button
                onClick={() => setActivePage("Rooms")}
              >
                Manage rooms →
              </button>
            </div>

            <div className="hotel-room-grid">
              {rooms.map((room) => (
                <div
                  className="hotel-room-card"
                  key={room.name}
                >
                  <div className="hotel-room-icon">
                    🛏️
                  </div>

                  <h3>{room.name}</h3>

                  <p>
                    {room.available} rooms available
                  </p>

                  <div className="hotel-room-bar">
                    <span
                      style={{
                        width: `${
                          (room.available / room.total) *
                          100
                        }%`,
                      }}
                    ></span>
                  </div>

                  <div className="hotel-room-bottom">
                    <strong>{room.price}</strong>
                    <small>{room.total} rooms</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hotel-panel">
            <div className="hotel-panel-heading">
              <div>
                <span>QUICK ACTIONS</span>
                <h2>Manage property</h2>
              </div>
            </div>

            <div className="hotel-actions">
              <button
                onClick={() => setActivePage("Bookings")}
              >
                <span>▣</span>
                <strong>View Bookings</strong>
                <small>Manage incoming reservations</small>
              </button>

              <button
                onClick={() => setActivePage("Rooms")}
              >
                <span>🛏️</span>
                <strong>Update Rooms</strong>
                <small>Manage room availability</small>
              </button>

              <button
                onClick={() =>
                  alert("Offer created for demo.")
                }
              >
                <span>％</span>
                <strong>Create Offer</strong>
                <small>Attract more travelers</small>
              </button>

              <button
                onClick={() =>
                  alert("Property report generated.")
                }
              >
                <span>↗</span>
                <strong>View Analytics</strong>
                <small>Track your performance</small>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="hotel-app">
      <aside className="hotel-sidebar">
        <div className="hotel-logo">
          <div>Y</div>

          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <div className="hotel-sidebar-label">
          PARTNER PORTAL
        </div>

        <nav className="hotel-nav">
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
                {item === "Bookings" && "▤"}
                {item === "Rooms" && "▣"}
                {item === "Guests" && "♙"}
                {item === "Reviews" && "★"}
                {item === "Offers" && "%"}
                {item === "Analytics" && "↗"}
                {item === "Settings" && "⚙"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="hotel-sidebar-bottom">
          <div className="hotel-system-mini">
            <span></span>

            <div>
              <strong>Partner Online</strong>
              <small>Accepting bookings</small>
            </div>
          </div>

          <button
            className="hotel-main-button"
            onClick={onBack}
          >
            ↩ Main Website
          </button>

          <div className="hotel-profile">
            <div className="hotel-avatar">TH</div>

            <div>
              <strong>The Heritage Hotel</strong>
              <small>Hyderabad</small>
            </div>

            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="hotel-main">
        <header className="hotel-topbar">
          <div>
            <span>HOTEL PARTNER</span>
            <h2>{activePage}</h2>
          </div>

          <div className="hotel-top-actions">
            <button
              onClick={() =>
                alert(
                  "New booking received from Yatra 360."
                )
              }
            >
              ◇
              <i></i>
            </button>

            <div className="hotel-top-avatar">TH</div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default Hotel;
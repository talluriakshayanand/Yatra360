import { useEffect, useState } from "react";
import "./Guide.css";

function Guide({ onBack }) {
  const [activePage, setActivePage] = useState("Overview");
  const [latestBooking, setLatestBooking] = useState(null);
  const [tourStatus, setTourStatus] = useState("New");

  const menu = [
    "Overview",
    "Tour Requests",
    "Upcoming Tours",
    "Travelers",
    "Availability",
    "Reviews",
    "Earnings",
    "Analytics",
    "Settings",
  ];

  const tours = [
    {
      id: "#GUIDE-2048",
      traveler: "Sophia Williams",
      experience: "Old City Heritage Walk",
      date: "Today · 4:30 PM",
      travelers: "3 Travelers",
      amount: "₹1,200",
      status: "Confirmed",
    },
    {
      id: "#GUIDE-2047",
      traveler: "Arjun Mehta",
      experience: "Charminar & Laad Bazaar",
      date: "Tomorrow · 10:00 AM",
      travelers: "2 Travelers",
      amount: "₹800",
      status: "Confirmed",
    },
    {
      id: "#GUIDE-2046",
      traveler: "Emma Brown",
      experience: "Hyderabad Food Trail",
      date: "Sep 15 · 6:00 PM",
      travelers: "4 Travelers",
      amount: "₹1,600",
      status: "Pending",
    },
    {
      id: "#GUIDE-2045",
      traveler: "Rahul Sharma",
      experience: "Golconda Fort Experience",
      date: "Sep 16 · 9:00 AM",
      travelers: "5 Travelers",
      amount: "₹2,000",
      status: "Confirmed",
    },
  ];

  const experiences = [
    [
      "Old City Heritage Walk",
      "Heritage",
      "₹400 / person",
      "84 bookings",
    ],
    [
      "Hyderabad Food Trail",
      "Food",
      "₹500 / person",
      "62 bookings",
    ],
    [
      "Golconda Fort Experience",
      "History",
      "₹400 / person",
      "48 bookings",
    ],
  ];

  useEffect(() => {
    const loadBooking = () => {
      const stored = JSON.parse(
        localStorage.getItem("yatra360_latest_booking") || "null"
      );

      if (stored && stored.service === "Guide") {
        setLatestBooking(stored);
      }
    };

    loadBooking();

    window.addEventListener("storage", loadBooking);

    return () => {
      window.removeEventListener("storage", loadBooking);
    };
  }, []);

  const updateBooking = (status) => {
    setTourStatus(status);

    if (latestBooking) {
      localStorage.setItem(
        "yatra360_latest_booking",
        JSON.stringify({
          ...latestBooking,
          status,
        })
      );
    }
  };

  const statusClass = (status) =>
    status.toLowerCase().replace(/\s+/g, "-");

  const renderPage = () => {
    if (activePage === "Tour Requests") {
      return (
        <section className="guide-page">
          <div className="guide-page-heading">
            <div>
              <span>REQUEST MANAGEMENT</span>
              <h1>Tour Requests</h1>
            </div>

            <button
              className="guide-primary-button"
              onClick={() => alert("Tour report generated.")}
            >
              Export Report ↓
            </button>
          </div>

          {latestBooking && (
            <div className="guide-live-order">
              <div className="guide-live-top">
                <div>
                  <span>NEW YATRA 360 TOUR REQUEST</span>
                  <h2>Incoming traveler request</h2>
                </div>

                <div className="guide-live-badge">
                  <i></i>
                  LIVE
                </div>
              </div>

              <div className="guide-live-content">
                <div>
                  <small>BOOKING</small>
                  <strong>{latestBooking.id}</strong>
                </div>

                <div>
                  <small>TRAVELER</small>
                  <strong>{latestBooking.guest}</strong>
                </div>

                <div>
                  <small>TRAVELERS</small>
                  <strong>{latestBooking.guests}</strong>
                </div>

                <div>
                  <small>FEE</small>
                  <strong>{latestBooking.amount}</strong>
                </div>

                {tourStatus === "New" ? (
                  <div className="guide-order-actions">
                    <button
                      className="guide-accept"
                      onClick={() => updateBooking("Confirmed")}
                    >
                      Accept Tour
                    </button>

                    <button
                      className="guide-reject"
                      onClick={() => updateBooking("Cancelled")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`guide-status ${statusClass(
                      tourStatus
                    )}`}
                  >
                    {tourStatus}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="guide-panel">
            <div className="guide-panel-heading">
              <div>
                <span>TOUR REQUESTS</span>
                <h2>Upcoming tours</h2>
              </div>
            </div>

            <div className="guide-table-wrap">
              <table className="guide-table">
                <thead>
                  <tr>
                    <th>Tour</th>
                    <th>Traveler</th>
                    <th>Experience</th>
                    <th>Schedule</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour.id}>
                      <td>
                        <strong>{tour.id}</strong>
                      </td>

                      <td>{tour.traveler}</td>

                      <td>{tour.experience}</td>

                      <td>{tour.date}</td>

                      <td>
                        <strong>{tour.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`guide-status ${statusClass(
                            tour.status
                          )}`}
                        >
                          {tour.status}
                        </span>
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

    if (activePage === "Upcoming Tours") {
      return (
        <section className="guide-page">
          <div className="guide-page-heading">
            <div>
              <span>TOUR SCHEDULE</span>
              <h1>Upcoming Tours</h1>
            </div>
          </div>

          <div className="guide-schedule">
            {tours.map((tour, index) => (
              <div className="guide-schedule-item" key={tour.id}>
                <div className="guide-time">
                  <strong>
                    {index === 0
                      ? "4:30"
                      : index === 1
                      ? "10:00"
                      : index === 2
                      ? "18:00"
                      : "09:00"}
                  </strong>

                  <small>
                    {index === 0
                      ? "PM"
                      : index === 1
                      ? "AM"
                      : index === 2
                      ? "PM"
                      : "AM"}
                  </small>
                </div>

                <div className="guide-schedule-dot"></div>

                <div className="guide-schedule-card">
                  <span>{tour.experience}</span>
                  <h3>{tour.traveler}</h3>
                  <p>{tour.travelers}</p>
                  <strong>{tour.amount}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activePage === "Travelers") {
      return (
        <section className="guide-page">
          <div className="guide-page-heading">
            <div>
              <span>TRAVELER MANAGEMENT</span>
              <h1>Travelers</h1>
            </div>
          </div>

          <div className="guide-traveler-grid">
            {[
              ["Sophia Williams", "🇬🇧", "3 tours"],
              ["Arjun Mehta", "🇮🇳", "2 tours"],
              ["Emma Brown", "🇺🇸", "4 tours"],
              ["Rahul Sharma", "🇮🇳", "3 tours"],
            ].map(([name, flag, toursCount]) => (
              <div className="guide-traveler-card" key={name}>
                <div className="guide-traveler-avatar">
                  {name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>

                <h3>{name}</h3>

                <p>
                  {flag} Verified traveler
                </p>

                <small>{toursCount}</small>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activePage === "Availability") {
      return (
        <section className="guide-page">
          <div className="guide-page-heading">
            <div>
              <span>GUIDE SCHEDULE</span>
              <h1>Availability</h1>
            </div>
          </div>

          <div className="guide-availability">
            <div>
              <span>MON</span>
              <strong>16</strong>
              <small>Available</small>
            </div>

            <div>
              <span>TUE</span>
              <strong>17</strong>
              <small>Available</small>
            </div>

            <div className="selected">
              <span>WED</span>
              <strong>18</strong>
              <small>6 tours</small>
            </div>

            <div>
              <span>THU</span>
              <strong>19</strong>
              <small>Available</small>
            </div>

            <div>
              <span>FRI</span>
              <strong>20</strong>
              <small>Available</small>
            </div>
          </div>

          <div className="guide-placeholder">
            <div>📅</div>
            <h2>Availability Management</h2>
            <p>
              Set your available tour slots and let Yatra 360
              travelers discover them.
            </p>
          </div>
        </section>
      );
    }

    if (activePage !== "Overview") {
      return (
        <section className="guide-page">
          <div className="guide-page-heading">
            <div>
              <span>GUIDE MANAGEMENT</span>
              <h1>{activePage}</h1>
            </div>
          </div>

          <div className="guide-placeholder">
            <div>🧭</div>

            <h2>{activePage} Management</h2>

            <p>
              This module is ready for the next stage of the
              Yatra 360 guide ecosystem.
            </p>

            <button
              className="guide-primary-button"
              onClick={() => setActivePage("Tour Requests")}
            >
              View Incoming Requests →
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="guide-page">
        <div className="guide-welcome">
          <div>
            <span>GUIDE PARTNER PORTAL</span>

            <h1>
              Share the real India,
              <br />
              one journey at a time.
            </h1>

            <p>
              Manage travelers, tours, availability and
              earnings from one intelligent dashboard.
            </p>
          </div>

          <div className="guide-welcome-orb">
            <div>🧭</div>
          </div>
        </div>

        {latestBooking && (
          <div className="guide-alert">
            <div className="guide-alert-icon">!</div>

            <div>
              <strong>New Yatra 360 tour request</strong>

              <p>
                {latestBooking.guest} requested a guided
                experience for {latestBooking.guests} traveler(s).
              </p>
            </div>

            <button
              onClick={() => setActivePage("Tour Requests")}
            >
              View Request →
            </button>
          </div>
        )}

        <div className="guide-kpi-grid">
          <div className="guide-kpi">
            <span>Today's Tours</span>
            <strong>6</strong>
            <small>2 more than yesterday</small>
          </div>

          <div className="guide-kpi">
            <span>Today's Earnings</span>
            <strong>₹4,800</strong>
            <small>↑ 18.4% today</small>
          </div>

          <div className="guide-kpi">
            <span>Total Travelers</span>
            <strong>428</strong>
            <small>Across all tours</small>
          </div>

          <div className="guide-kpi">
            <span>Guide Rating</span>
            <strong>4.9 ★</strong>
            <small>186 reviews</small>
          </div>
        </div>

        <div className="guide-dashboard-grid">
          <div className="guide-panel">
            <div className="guide-panel-heading">
              <div>
                <span>LIVE SCHEDULE</span>
                <h2>Upcoming tours</h2>
              </div>

              <button
                onClick={() => setActivePage("Tour Requests")}
              >
                View all →
              </button>
            </div>

            <div className="guide-table-wrap">
              <table className="guide-table">
                <thead>
                  <tr>
                    <th>Tour</th>
                    <th>Traveler</th>
                    <th>Experience</th>
                    <th>Schedule</th>
                    <th>Fee</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour.id}>
                      <td>
                        <strong>{tour.id}</strong>
                      </td>

                      <td>{tour.traveler}</td>

                      <td>{tour.experience}</td>

                      <td>{tour.date}</td>

                      <td>
                        <strong>{tour.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`guide-status ${statusClass(
                            tour.status
                          )}`}
                        >
                          {tour.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="guide-panel">
            <div className="guide-panel-heading">
              <div>
                <span>TODAY'S SCHEDULE</span>
                <h2>Tour timeline</h2>
              </div>
            </div>

            <div className="guide-timeline">
              <div>
                <strong>10:00 AM</strong>
                <span></span>
                <section>
                  <b>Charminar & Laad Bazaar</b>
                  <small>2 travelers</small>
                </section>
              </div>

              <div>
                <strong>1:30 PM</strong>
                <span></span>
                <section>
                  <b>Local Food Experience</b>
                  <small>4 travelers</small>
                </section>
              </div>

              <div>
                <strong>4:30 PM</strong>
                <span></span>
                <section>
                  <b>Old City Heritage Walk</b>
                  <small>3 travelers</small>
                </section>
              </div>

              <div>
                <strong>7:00 PM</strong>
                <span></span>
                <section>
                  <b>Hyderabad Night Tour</b>
                  <small>5 travelers</small>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="guide-bottom-grid">
          <div className="guide-panel">
            <div className="guide-panel-heading">
              <div>
                <span>YOUR EXPERIENCES</span>
                <h2>Popular tours</h2>
              </div>

              <button
                onClick={() =>
                  alert("Experience editor opened for demo.")
                }
              >
                Manage experiences →
              </button>
            </div>

            <div className="guide-experience-grid">
              {experiences.map(
                ([name, category, price, bookings]) => (
                  <div
                    className="guide-experience-card"
                    key={name}
                  >
                    <div className="guide-experience-icon">
                      🧭
                    </div>

                    <span>{category}</span>

                    <h3>{name}</h3>

                    <div>
                      <strong>{price}</strong>
                      <small>{bookings}</small>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="guide-panel">
            <div className="guide-panel-heading">
              <div>
                <span>QUICK ACTIONS</span>
                <h2>Manage your profile</h2>
              </div>
            </div>

            <div className="guide-actions">
              <button
                onClick={() =>
                  setActivePage("Tour Requests")
                }
              >
                <span>▣</span>
                <strong>Tour Requests</strong>
                <small>Manage incoming travelers</small>
              </button>

              <button
                onClick={() =>
                  setActivePage("Availability")
                }
              >
                <span>📅</span>
                <strong>Update Availability</strong>
                <small>Manage your tour slots</small>
              </button>

              <button
                onClick={() =>
                  alert("Experience created for demo.")
                }
              >
                <span>+</span>
                <strong>Add Experience</strong>
                <small>Create a new local tour</small>
              </button>

              <button
                onClick={() =>
                  alert("Analytics opened for demo.")
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
    <div className="guide-app">
      <aside className="guide-sidebar">
        <div className="guide-logo">
          <div>Y</div>

          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <div className="guide-sidebar-label">
          PARTNER PORTAL
        </div>

        <nav className="guide-nav">
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
                {item === "Tour Requests" && "▤"}
                {item === "Upcoming Tours" && "◷"}
                {item === "Travelers" && "♙"}
                {item === "Availability" && "📅"}
                {item === "Reviews" && "★"}
                {item === "Earnings" && "₹"}
                {item === "Analytics" && "↗"}
                {item === "Settings" && "⚙"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="guide-sidebar-bottom">
          <div className="guide-system-mini">
            <span></span>

            <div>
              <strong>Guide Online</strong>
              <small>Accepting tours</small>
            </div>
          </div>

          <button
            className="guide-main-button"
            onClick={onBack}
          >
            ↩ Main Website
          </button>

          <div className="guide-profile">
            <div className="guide-avatar">AG</div>

            <div>
              <strong>Arjun Guide</strong>
              <small>Hyderabad · Verified</small>
            </div>

            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="guide-main">
        <header className="guide-topbar">
          <div>
            <span>GUIDE PARTNER</span>
            <h2>{activePage}</h2>
          </div>

          <div className="guide-top-actions">
            <button
              onClick={() =>
                alert("New Yatra 360 tour notification.")
              }
            >
              ◇
              <i></i>
            </button>

            <div className="guide-top-avatar">AG</div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default Guide;
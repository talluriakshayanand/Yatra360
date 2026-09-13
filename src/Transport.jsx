import { useEffect, useState } from "react";
import "./Transport.css";

function Transport({ onBack }) {
  const [activePage, setActivePage] = useState("Overview");
  const [latestBooking, setLatestBooking] = useState(null);
  const [rideStatus, setRideStatus] = useState("New");

  const menu = [
    "Overview",
    "Ride Bookings",
    "Drivers",
    "Vehicles",
    "Earnings",
    "Reviews",
    "Offers",
    "Analytics",
    "Settings",
  ];

  const rides = [
    {
      id: "#RIDE-2048",
      customer: "Arjun Mehta",
      route: "Charminar → HITEC City",
      vehicle: "Sedan",
      amount: "₹420",
      status: "On Trip",
    },
    {
      id: "#RIDE-2047",
      customer: "Sophia Williams",
      route: "Airport → Banjara Hills",
      vehicle: "SUV",
      amount: "₹680",
      status: "Completed",
    },
    {
      id: "#RIDE-2046",
      customer: "Rahul Sharma",
      route: "Koti → Gachibowli",
      vehicle: "Bike",
      amount: "₹180",
      status: "Completed",
    },
    {
      id: "#RIDE-2045",
      customer: "Emma Brown",
      route: "Secunderabad → Necklace Road",
      vehicle: "Auto",
      amount: "₹260",
      status: "Waiting",
    },
  ];

  const vehicles = [
    ["Hyundai Verna", "Sedan", "TS 09 AB 4521", "Ravi Kumar", "Active"],
    ["Toyota Innova", "SUV", "TS 08 CD 7284", "Vikram Singh", "Active"],
    ["Honda Activa", "Bike", "TS 10 EF 3198", "Kiran Reddy", "Available"],
    ["TVS Auto", "Auto", "TS 12 GH 6190", "Mahesh Rao", "Offline"],
  ];

  useEffect(() => {
    const loadBooking = () => {
      const stored = JSON.parse(
        localStorage.getItem("yatra360_latest_booking") || "null"
      );

      if (stored && stored.service === "Transport") {
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
    setRideStatus(status);

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
    if (activePage === "Ride Bookings") {
      return (
        <section className="transport-page">
          <div className="transport-page-heading">
            <div>
              <span>RIDE MANAGEMENT</span>
              <h1>Ride Bookings</h1>
            </div>

            <button
              className="transport-primary-button"
              onClick={() => alert("Ride report generated.")}
            >
              Export Report ↓
            </button>
          </div>

          {latestBooking && (
            <div className="transport-live-order">
              <div className="transport-live-top">
                <div>
                  <span>NEW YATRA 360 RIDE</span>
                  <h2>Incoming ride request</h2>
                </div>

                <div className="transport-live-badge">
                  <i></i>
                  LIVE
                </div>
              </div>

              <div className="transport-live-content">
                <div>
                  <small>BOOKING</small>
                  <strong>{latestBooking.id}</strong>
                </div>

                <div>
                  <small>TRAVELER</small>
                  <strong>{latestBooking.guest}</strong>
                </div>

                <div>
                  <small>PASSENGERS</small>
                  <strong>{latestBooking.guests}</strong>
                </div>

                <div>
                  <small>FARE</small>
                  <strong>{latestBooking.amount}</strong>
                </div>

                {rideStatus === "New" ? (
                  <div className="transport-order-actions">
                    <button
                      className="transport-accept"
                      onClick={() => updateBooking("Accepted")}
                    >
                      Accept Ride
                    </button>

                    <button
                      className="transport-reject"
                      onClick={() => updateBooking("Cancelled")}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`transport-status ${statusClass(
                      rideStatus
                    )}`}
                  >
                    {rideStatus}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="transport-panel">
            <div className="transport-panel-heading">
              <div>
                <span>LIVE RIDES</span>
                <h2>Recent ride bookings</h2>
              </div>
            </div>

            <div className="transport-table-wrap">
              <table className="transport-table">
                <thead>
                  <tr>
                    <th>Ride</th>
                    <th>Traveler</th>
                    <th>Route</th>
                    <th>Vehicle</th>
                    <th>Fare</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {rides.map((ride) => (
                    <tr key={ride.id}>
                      <td><strong>{ride.id}</strong></td>
                      <td>{ride.customer}</td>
                      <td>{ride.route}</td>
                      <td>{ride.vehicle}</td>
                      <td><strong>{ride.amount}</strong></td>
                      <td>
                        <span
                          className={`transport-status ${statusClass(
                            ride.status
                          )}`}
                        >
                          {ride.status}
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

    if (activePage === "Drivers") {
      return (
        <section className="transport-page">
          <div className="transport-page-heading">
            <div>
              <span>DRIVER MANAGEMENT</span>
              <h1>Drivers</h1>
            </div>
          </div>

          <div className="transport-driver-grid">
            <div className="transport-stat-card">
              <span>Total Drivers</span>
              <strong>42</strong>
              <small>Registered partners</small>
            </div>

            <div className="transport-stat-card">
              <span>Available</span>
              <strong>28</strong>
              <small>Ready for rides</small>
            </div>

            <div className="transport-stat-card">
              <span>On Trip</span>
              <strong>14</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="transport-placeholder">
            <div>🚕</div>
            <h2>Driver Management</h2>
            <p>
              Manage verification, availability and driver
              performance from this module.
            </p>
          </div>
        </section>
      );
    }

    if (activePage === "Vehicles") {
      return (
        <section className="transport-page">
          <div className="transport-page-heading">
            <div>
              <span>FLEET MANAGEMENT</span>
              <h1>Vehicles</h1>
            </div>

            <button
              className="transport-primary-button"
              onClick={() => alert("Vehicle added for demo.")}
            >
              + Add Vehicle
            </button>
          </div>

          <div className="transport-vehicle-grid">
            {vehicles.map((vehicle) => (
              <div className="transport-vehicle-card" key={vehicle[2]}>
                <div className="transport-vehicle-icon">🚗</div>

                <h3>{vehicle[0]}</h3>

                <p>{vehicle[1]}</p>

                <div className="transport-vehicle-info">
                  <span>Registration</span>
                  <strong>{vehicle[2]}</strong>
                </div>

                <div className="transport-vehicle-info">
                  <span>Driver</span>
                  <strong>{vehicle[3]}</strong>
                </div>

                <span
                  className={`transport-status ${statusClass(
                    vehicle[4]
                  )}`}
                >
                  {vehicle[4]}
                </span>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activePage !== "Overview") {
      return (
        <section className="transport-page">
          <div className="transport-page-heading">
            <div>
              <span>TRANSPORT MANAGEMENT</span>
              <h1>{activePage}</h1>
            </div>
          </div>

          <div className="transport-placeholder">
            <div>🚕</div>

            <h2>{activePage} Management</h2>

            <p>
              This module is ready for the next stage of the
              Yatra 360 transport ecosystem.
            </p>

            <button
              className="transport-primary-button"
              onClick={() => setActivePage("Ride Bookings")}
            >
              View Incoming Rides →
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="transport-page">
        <div className="transport-welcome">
          <div>
            <span>TRANSPORT PARTNER PORTAL</span>

            <h1>
              Move travelers,
              <br />
              across India.
            </h1>

            <p>
              Manage rides, drivers, vehicles and earnings
              from one intelligent dashboard.
            </p>
          </div>

          <div className="transport-welcome-orb">
            <div>🚕</div>
          </div>
        </div>

        {latestBooking && (
          <div className="transport-alert">
            <div className="transport-alert-icon">!</div>

            <div>
              <strong>New Yatra 360 ride request</strong>
              <p>
                {latestBooking.guest} requested transport for{" "}
                {latestBooking.guests} passenger(s).
              </p>
            </div>

            <button
              onClick={() => setActivePage("Ride Bookings")}
            >
              View Request →
            </button>
          </div>
        )}

        <div className="transport-kpi-grid">
          <div className="transport-kpi">
            <span>Today's Rides</span>
            <strong>248</strong>
            <small>↑ 14.8% today</small>
          </div>

          <div className="transport-kpi">
            <span>Today's Earnings</span>
            <strong>₹62,480</strong>
            <small>↑ 9.4% today</small>
          </div>

          <div className="transport-kpi">
            <span>Active Drivers</span>
            <strong>42</strong>
            <small>28 available now</small>
          </div>

          <div className="transport-kpi">
            <span>Partner Rating</span>
            <strong>4.8 ★</strong>
            <small>928 reviews</small>
          </div>
        </div>

        <div className="transport-dashboard-grid">
          <div className="transport-panel">
            <div className="transport-panel-heading">
              <div>
                <span>LIVE ACTIVITY</span>
                <h2>Recent rides</h2>
              </div>

              <button
                onClick={() => setActivePage("Ride Bookings")}
              >
                View all →
              </button>
            </div>

            <div className="transport-table-wrap">
              <table className="transport-table">
                <thead>
                  <tr>
                    <th>Ride</th>
                    <th>Traveler</th>
                    <th>Route</th>
                    <th>Vehicle</th>
                    <th>Fare</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {rides.map((ride) => (
                    <tr key={ride.id}>
                      <td><strong>{ride.id}</strong></td>
                      <td>{ride.customer}</td>
                      <td>{ride.route}</td>
                      <td>{ride.vehicle}</td>
                      <td><strong>{ride.amount}</strong></td>
                      <td>
                        <span
                          className={`transport-status ${statusClass(
                            ride.status
                          )}`}
                        >
                          {ride.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="transport-panel">
            <div className="transport-panel-heading">
              <div>
                <span>DRIVER AVAILABILITY</span>
                <h2>Live fleet</h2>
              </div>

              <div className="transport-live-badge">
                <i></i>
                LIVE
              </div>
            </div>

            <div className="transport-fleet-circle">
              <strong>42</strong>
              <span>Drivers</span>
            </div>

            <div className="transport-fleet-list">
              <div>
                <span>Available</span>
                <strong>28</strong>
              </div>

              <div>
                <span>On Trip</span>
                <strong>14</strong>
              </div>

              <div>
                <span>Offline</span>
                <strong>7</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="transport-bottom-grid">
          <div className="transport-panel">
            <div className="transport-panel-heading">
              <div>
                <span>FLEET</span>
                <h2>Vehicles</h2>
              </div>

              <button
                onClick={() => setActivePage("Vehicles")}
              >
                Manage fleet →
              </button>
            </div>

            <div className="transport-mini-vehicles">
              {vehicles.map((vehicle) => (
                <div
                  className="transport-mini-vehicle"
                  key={vehicle[2]}
                >
                  <div className="transport-mini-icon">🚗</div>

                  <div>
                    <strong>{vehicle[0]}</strong>
                    <small>{vehicle[3]}</small>
                  </div>

                  <span>{vehicle[4]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="transport-panel">
            <div className="transport-panel-heading">
              <div>
                <span>QUICK ACTIONS</span>
                <h2>Manage transport</h2>
              </div>
            </div>

            <div className="transport-actions">
              <button
                onClick={() =>
                  setActivePage("Ride Bookings")
                }
              >
                <span>▣</span>
                <strong>View Rides</strong>
                <small>Manage incoming requests</small>
              </button>

              <button
                onClick={() => setActivePage("Drivers")}
              >
                <span>♙</span>
                <strong>Manage Drivers</strong>
                <small>Check driver availability</small>
              </button>

              <button
                onClick={() => setActivePage("Vehicles")}
              >
                <span>🚗</span>
                <strong>Manage Vehicles</strong>
                <small>Manage your fleet</small>
              </button>

              <button
                onClick={() =>
                  alert("Analytics opened for demo.")
                }
              >
                <span>↗</span>
                <strong>View Analytics</strong>
                <small>Track transport performance</small>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="transport-app">
      <aside className="transport-sidebar">
        <div className="transport-logo">
          <div>Y</div>

          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <div className="transport-sidebar-label">
          PARTNER PORTAL
        </div>

        <nav className="transport-nav">
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
                {item === "Ride Bookings" && "▤"}
                {item === "Drivers" && "♙"}
                {item === "Vehicles" && "🚗"}
                {item === "Earnings" && "₹"}
                {item === "Reviews" && "★"}
                {item === "Offers" && "%"}
                {item === "Analytics" && "↗"}
                {item === "Settings" && "⚙"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="transport-sidebar-bottom">
          <div className="transport-system-mini">
            <span></span>

            <div>
              <strong>Transport Online</strong>
              <small>Accepting rides</small>
            </div>
          </div>

          <button
            className="transport-main-button"
            onClick={onBack}
          >
            ↩ Main Website
          </button>

          <div className="transport-profile">
            <div className="transport-avatar">YT</div>

            <div>
              <strong>Yatra Transport</strong>
              <small>Hyderabad</small>
            </div>

            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="transport-main">
        <header className="transport-topbar">
          <div>
            <span>TRANSPORT PARTNER</span>
            <h2>{activePage}</h2>
          </div>

          <div className="transport-top-actions">
            <button
              onClick={() =>
                alert("New Yatra 360 ride notification.")
              }
            >
              ◇
              <i></i>
            </button>

            <div className="transport-top-avatar">
              YT
            </div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default Transport;
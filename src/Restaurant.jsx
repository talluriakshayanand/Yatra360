import { useEffect, useState } from "react";
import "./Restaurant.css";

function Restaurant({ onBack }) {
  const [activePage, setActivePage] = useState("Overview");
  const [latestBooking, setLatestBooking] = useState(null);
  const [orderStatus, setOrderStatus] = useState("New");

  const menu = [
    "Overview",
    "Orders",
    "Menu",
    "Customers",
    "Reviews",
    "Offers",
    "Analytics",
    "Settings",
  ];

  const orders = [
    {
      id: "#ORD-1048",
      customer: "Arjun Mehta",
      items: "Hyderabadi Biryani + 2",
      amount: "₹680",
      status: "Preparing",
    },
    {
      id: "#ORD-1047",
      customer: "Sophia Williams",
      items: "Paneer Tikka + Naan",
      amount: "₹540",
      status: "Ready",
    },
    {
      id: "#ORD-1046",
      customer: "Rahul Sharma",
      items: "Chicken Biryani",
      amount: "₹320",
      status: "Delivered",
    },
    {
      id: "#ORD-1045",
      customer: "Emma Brown",
      items: "Veg Thali + Lassi",
      amount: "₹390",
      status: "Preparing",
    },
  ];

  const popularDishes = [
    ["Hyderabadi Biryani", "₹280", "124 orders"],
    ["Paneer Tikka", "₹240", "86 orders"],
    ["Double Ka Meetha", "₹160", "72 orders"],
    ["Irani Chai", "₹80", "64 orders"],
  ];

  useEffect(() => {
    const loadBooking = () => {
      const stored = JSON.parse(
        localStorage.getItem("yatra360_latest_booking") ||
          "null"
      );

      if (stored && stored.service === "Restaurant") {
        setLatestBooking(stored);
      }
    };

    loadBooking();

    window.addEventListener(
      "storage",
      loadBooking
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadBooking
      );
    };
  }, []);

  const acceptBooking = () => {
    setOrderStatus("Preparing");

    if (latestBooking) {
      const updated = {
        ...latestBooking,
        status: "Preparing",
      };

      localStorage.setItem(
        "yatra360_latest_booking",
        JSON.stringify(updated)
      );
    }
  };

  const rejectBooking = () => {
    setOrderStatus("Cancelled");

    if (latestBooking) {
      const updated = {
        ...latestBooking,
        status: "Cancelled",
      };

      localStorage.setItem(
        "yatra360_latest_booking",
        JSON.stringify(updated)
      );
    }
  };

  const renderPage = () => {
    if (activePage === "Orders") {
      return (
        <section className="restaurant-page">
          <div className="restaurant-page-heading">
            <div>
              <span>ORDER MANAGEMENT</span>
              <h1>Orders</h1>
            </div>

            <button
              className="restaurant-primary-button"
              onClick={() =>
                alert("Order report generated.")
              }
            >
              Export Report ↓
            </button>
          </div>

          {latestBooking && (
            <div className="restaurant-live-order">
              <div className="restaurant-live-top">
                <div>
                  <span>NEW YATRA 360 ORDER</span>
                  <h2>Incoming customer booking</h2>
                </div>

                <div className="restaurant-live-badge">
                  <i></i>
                  LIVE
                </div>
              </div>

              <div className="restaurant-live-content">
                <div>
                  <small>BOOKING</small>
                  <strong>{latestBooking.id}</strong>
                </div>

                <div>
                  <small>CUSTOMER</small>
                  <strong>{latestBooking.guest}</strong>
                </div>

                <div>
                  <small>GUESTS</small>
                  <strong>
                    {latestBooking.guests}
                  </strong>
                </div>

                <div>
                  <small>AMOUNT</small>
                  <strong>{latestBooking.amount}</strong>
                </div>

                {orderStatus === "New" ? (
                  <div className="restaurant-order-actions">
                    <button
                      className="restaurant-accept"
                      onClick={acceptBooking}
                    >
                      Accept Order
                    </button>

                    <button
                      className="restaurant-reject"
                      onClick={rejectBooking}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span
                    className={`restaurant-status ${orderStatus
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {orderStatus}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="restaurant-panel">
            <div className="restaurant-panel-heading">
              <div>
                <span>TODAY'S ORDERS</span>
                <h2>Recent orders</h2>
              </div>
            </div>

            <div className="restaurant-table-wrap">
              <table className="restaurant-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                      </td>

                      <td>{order.customer}</td>

                      <td>{order.items}</td>

                      <td>
                        <strong>{order.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`restaurant-status ${order.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {order.status}
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

    if (activePage !== "Overview") {
      return (
        <section className="restaurant-page">
          <div className="restaurant-page-heading">
            <div>
              <span>RESTAURANT MANAGEMENT</span>
              <h1>{activePage}</h1>
            </div>
          </div>

          <div className="restaurant-placeholder">
            <div>🍽️</div>

            <h2>{activePage} Management</h2>

            <p>
              This module is ready for the next stage
              of the Yatra 360 restaurant ecosystem.
            </p>

            <button
              className="restaurant-primary-button"
              onClick={() => setActivePage("Orders")}
            >
              View Incoming Orders →
            </button>
          </div>
        </section>
      );
    }

    return (
      <section className="restaurant-page">
        <div className="restaurant-welcome">
          <div>
            <span>RESTAURANT PARTNER PORTAL</span>

            <h1>
              Welcome back,
              <br />
              Gokul Chaat House.
            </h1>

            <p>
              Manage orders, menu, customers and
              restaurant performance from one place.
            </p>
          </div>

          <div className="restaurant-welcome-orb">
            <div>🍽️</div>
          </div>
        </div>

        {latestBooking && (
          <div className="restaurant-alert">
            <div className="restaurant-alert-icon">
              !
            </div>

            <div>
              <strong>
                New Yatra 360 booking received
              </strong>

              <p>
                {latestBooking.guest} placed a{" "}
                {latestBooking.guests}-guest booking.
              </p>
            </div>

            <button
              onClick={() => setActivePage("Orders")}
            >
              View Order →
            </button>
          </div>
        )}

        <div className="restaurant-kpi-grid">
          <div className="restaurant-kpi">
            <span>Today's Orders</span>
            <strong>186</strong>
            <small>↑ 12.4% today</small>
          </div>

          <div className="restaurant-kpi">
            <span>Today's Revenue</span>
            <strong>₹48,620</strong>
            <small>↑ 8.7% today</small>
          </div>

          <div className="restaurant-kpi">
            <span>Avg Order Value</span>
            <strong>₹262</strong>
            <small>+₹18 this week</small>
          </div>

          <div className="restaurant-kpi">
            <span>Rating</span>
            <strong>4.7 ★</strong>
            <small>1,284 reviews</small>
          </div>
        </div>

        <div className="restaurant-dashboard-grid">
          <div className="restaurant-panel">
            <div className="restaurant-panel-heading">
              <div>
                <span>LIVE ACTIVITY</span>
                <h2>Recent orders</h2>
              </div>

              <button
                onClick={() => setActivePage("Orders")}
              >
                View all →
              </button>
            </div>

            <div className="restaurant-table-wrap">
              <table className="restaurant-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <strong>{order.id}</strong>
                      </td>

                      <td>{order.customer}</td>

                      <td>{order.items}</td>

                      <td>
                        <strong>{order.amount}</strong>
                      </td>

                      <td>
                        <span
                          className={`restaurant-status ${order.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="restaurant-panel">
            <div className="restaurant-panel-heading">
              <div>
                <span>KITCHEN STATUS</span>
                <h2>Live kitchen</h2>
              </div>

              <div className="restaurant-live-badge">
                <i></i>
                LIVE
              </div>
            </div>

            <div className="restaurant-kitchen-circle">
              <strong>24</strong>
              <span>Active Orders</span>
            </div>

            <div className="restaurant-kitchen-list">
              <div>
                <span>
                  <i></i>
                  Preparing
                </span>
                <strong>12</strong>
              </div>

              <div>
                <span>
                  <i></i>
                  Ready
                </span>
                <strong>7</strong>
              </div>

              <div>
                <span>
                  <i></i>
                  Out for delivery
                </span>
                <strong>5</strong>
              </div>

              <div>
                <span>
                  <i></i>
                  Completed
                </span>
                <strong>162</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="restaurant-bottom-grid">
          <div className="restaurant-panel">
            <div className="restaurant-panel-heading">
              <div>
                <span>BEST SELLERS</span>
                <h2>Popular dishes</h2>
              </div>

              <button
                onClick={() =>
                  setActivePage("Menu")
                }
              >
                Manage menu →
              </button>
            </div>

            <div className="restaurant-dishes">
              {popularDishes.map(
                ([name, price, ordersCount]) => (
                  <div
                    className="restaurant-dish"
                    key={name}
                  >
                    <div className="restaurant-dish-icon">
                      🍛
                    </div>

                    <div>
                      <strong>{name}</strong>
                      <small>{ordersCount}</small>
                    </div>

                    <span>{price}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="restaurant-panel">
            <div className="restaurant-panel-heading">
              <div>
                <span>QUICK ACTIONS</span>
                <h2>Manage restaurant</h2>
              </div>
            </div>

            <div className="restaurant-actions">
              <button
                onClick={() =>
                  setActivePage("Orders")
                }
              >
                <span>▣</span>
                <strong>View Orders</strong>
                <small>Manage incoming orders</small>
              </button>

              <button
                onClick={() =>
                  setActivePage("Menu")
                }
              >
                <span>☷</span>
                <strong>Update Menu</strong>
                <small>Manage dishes and prices</small>
              </button>

              <button
                onClick={() =>
                  alert("Offer created for demo.")
                }
              >
                <span>%</span>
                <strong>Create Offer</strong>
                <small>Attract more travelers</small>
              </button>

              <button
                onClick={() =>
                  alert("Analytics opened for demo.")
                }
              >
                <span>↗</span>
                <strong>View Analytics</strong>
                <small>Track restaurant performance</small>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="restaurant-app">
      <aside className="restaurant-sidebar">
        <div className="restaurant-logo">
          <div>Y</div>

          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <div className="restaurant-sidebar-label">
          PARTNER PORTAL
        </div>

        <nav className="restaurant-nav">
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
                {item === "Orders" && "▤"}
                {item === "Menu" && "☷"}
                {item === "Customers" && "♙"}
                {item === "Reviews" && "★"}
                {item === "Offers" && "%"}
                {item === "Analytics" && "↗"}
                {item === "Settings" && "⚙"}
              </span>

              {item}
            </button>
          ))}
        </nav>

        <div className="restaurant-sidebar-bottom">
          <div className="restaurant-system-mini">
            <span></span>

            <div>
              <strong>Restaurant Online</strong>
              <small>Accepting orders</small>
            </div>
          </div>

          <button
            className="restaurant-main-button"
            onClick={onBack}
          >
            ↩ Main Website
          </button>

          <div className="restaurant-profile">
            <div className="restaurant-avatar">GC</div>

            <div>
              <strong>Gokul Chaat House</strong>
              <small>Koti, Hyderabad</small>
            </div>

            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="restaurant-main">
        <header className="restaurant-topbar">
          <div>
            <span>RESTAURANT PARTNER</span>
            <h2>{activePage}</h2>
          </div>

          <div className="restaurant-top-actions">
            <button
              onClick={() =>
                alert(
                  "New Yatra 360 order notification."
                )
              }
            >
              ◇
              <i></i>
            </button>

            <div className="restaurant-top-avatar">
              GC
            </div>
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default Restaurant;
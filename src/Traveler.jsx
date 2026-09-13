import { useState } from "react";
import "./Traveler.css";
import TravelAI from "./TravelAI";

function Traveler({ onBack, onBook }) {
  const [activePage, setActivePage] = useState("Home");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      name: "Hyderabad",
      location: "Telangana",
      image:
        "https://images.unsplash.com/photo-1572449043410-6c7f8f4a2f1d?auto=format&fit=crop&w=1000&q=80",
      description:
        "Heritage, food and modern city experiences.",
    },
    {
      name: "Jaipur",
      location: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
      description:
        "Royal architecture, culture and local markets.",
    },
    {
      name: "Goa",
      location: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
      description:
        "Beaches, food and coastal experiences.",
    },
    {
      name: "Manali",
      location: "Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1000&q=80",
      description:
        "Mountains, nature and adventure.",
    },
  ];

  const services = [
    {
      title: "Hotels",
      icon: "🏨",
      description: "Find verified stays",
      action: "Hotel",
    },
    {
      title: "Restaurants",
      icon: "🍽️",
      description: "Discover local food",
      action: "Restaurant",
    },
    {
      title: "Transport",
      icon: "🚕",
      description: "Book local rides",
      action: "Transport",
    },
    {
      title: "Guides",
      icon: "🧑‍🏫",
      description: "Meet local experts",
      action: "Guide",
    },
    {
      title: "Tickets",
      icon: "🎟️",
      description: "Skip the queues",
      action: "Ticket",
    },
    {
      title: "Emergency",
      icon: "🆘",
      description: "Travel assistance",
      action: null,
    },
  ];

  const handleService = (service) => {
    if (service.action && onBook) {
      onBook(service.action);
    }
  };

  const renderPage = () => {
    if (activePage === "Bookings") {
      return (
        <div className="traveler-page">
          <div className="traveler-page-heading">
            <div>
              <span>TRAVEL ACTIVITY</span>
              <h1>My Bookings</h1>
            </div>
          </div>

          <div className="traveler-booking-list">
            <div className="traveler-booking-card">
              <div className="booking-card-icon">🏨</div>

              <div>
                <span>HOTEL</span>
                <h3>The Heritage Hotel</h3>
                <p>Hyderabad · Sep 18, 2026</p>
              </div>

              <strong className="confirmed">
                Confirmed
              </strong>
            </div>

            <div className="traveler-booking-card">
              <div className="booking-card-icon">🧑‍🏫</div>

              <div>
                <span>GUIDE</span>
                <h3>Old City Heritage Walk</h3>
                <p>Hyderabad · Sep 19, 2026</p>
              </div>

              <strong className="confirmed">
                Confirmed
              </strong>
            </div>
          </div>
        </div>
      );
    }

    if (activePage === "Saved") {
      return (
        <div className="traveler-page">
          <div className="traveler-page-heading">
            <div>
              <span>YOUR COLLECTION</span>
              <h1>Saved Places</h1>
            </div>
          </div>

          <div className="traveler-trip-grid">
            {destinations.slice(0, 3).map((item) => (
              <div
                className="traveler-trip-card"
                key={item.name}
              >
                <img src={item.image} alt={item.name} />

                <div>
                  <span>{item.location}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activePage === "Explore") {
      return (
        <div className="traveler-page">
          <div className="traveler-page-heading">
            <div>
              <span>DISCOVER INDIA</span>
              <h1>Explore destinations</h1>
            </div>
          </div>

          <div className="traveler-trip-grid">
            {destinations.map((destination) => (
              <div
                className="traveler-trip-card clickable"
                key={destination.name}
                onClick={() =>
                  setSelectedDestination(destination)
                }
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                />

                <div>
                  <span>{destination.location}</span>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                </div>
              </div>
            ))}
          </div>

          <TravelAI />
        </div>
      );
    }

    return (
      <>
        <section className="traveler-hero">
          <div>
            <span className="traveler-eyebrow">
              YOUR JOURNEY STARTS HERE
            </span>

            <h1>
              Where are you
              <br />
              going next?
            </h1>

            <p>
              Discover places, book services and build your
              entire journey in one place.
            </p>

            <div className="traveler-search">
              <span>⌕</span>

              <input
                placeholder="Search destinations, hotels, food..."
                onFocus={() => setActivePage("Explore")}
              />

              <button
                onClick={() => setActivePage("Explore")}
              >
                Search
              </button>
            </div>
          </div>

          <div className="traveler-hero-orb">
            <div></div>
          </div>
        </section>

        {/* YATRA AI */}
        <TravelAI />

        <section className="traveler-section">
          <div className="traveler-section-title">
            <div>
              <span>QUICK ACCESS</span>
              <h2>Everything you need</h2>
            </div>
          </div>

          <div className="traveler-services">
            {services.map((service) => (
              <button
                className="traveler-service"
                key={service.title}
                onClick={() => handleService(service)}
              >
                <div className="traveler-service-icon">
                  {service.icon}
                </div>

                <strong>{service.title}</strong>
                <span>{service.description}</span>

                <b>
                  {service.action
                    ? "Book →"
                    : "Get help →"}
                </b>
              </button>
            ))}
          </div>
        </section>

        <section className="traveler-section">
          <div className="traveler-section-title">
            <div>
              <span>POPULAR RIGHT NOW</span>
              <h2>Explore India</h2>
            </div>

            <button
              onClick={() => setActivePage("Explore")}
            >
              View all →
            </button>
          </div>

          <div className="traveler-trip-grid">
            {destinations.map((destination) => (
              <div
                className="traveler-trip-card clickable"
                key={destination.name}
                onClick={() =>
                  setSelectedDestination(destination)
                }
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                />

                <div className="traveler-trip-overlay"></div>

                <div className="traveler-trip-info">
                  <span>{destination.location}</span>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="traveler-feature-banner">
          <div>
            <span>LOCAL EXPERIENCES</span>

            <h2>
              Travel like
              <br />
              a local.
            </h2>

            <p>
              Discover food, culture and hidden experiences
              that typical tourist apps miss.
            </p>

            <button
              onClick={() =>
                handleService({
                  action: "Guide",
                })
              }
            >
              Find a local guide →
            </button>
          </div>

          <div className="traveler-banner-orb"></div>
        </section>

        <section className="traveler-upcoming">
          <div>
            <span>UPCOMING JOURNEY</span>
            <h2>Hyderabad Heritage Trip</h2>
            <p>18 Sep · 3 Days · 2 Travelers</p>
          </div>

          <button
            onClick={() => setActivePage("Bookings")}
          >
            View trip →
          </button>
        </section>
      </>
    );
  };

  return (
    <div className="traveler-app">
      <aside className="traveler-sidebar">
        <div className="traveler-logo">
          <div>Y</div>

          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <nav>
          {["Home", "Explore", "Bookings", "Saved"].map(
            (item) => (
              <button
                key={item}
                className={
                  activePage === item ? "active" : ""
                }
                onClick={() => setActivePage(item)}
              >
                <span>
                  {item === "Home" && "⌂"}
                  {item === "Explore" && "⌕"}
                  {item === "Bookings" && "▣"}
                  {item === "Saved" && "♡"}
                </span>

                {item}
              </button>
            )
          )}
        </nav>

        <div className="traveler-sidebar-bottom">
          <button
            onClick={() =>
              alert(
                "Yatra 360 Support: Demo assistance available 24/7."
              )
            }
          >
            <span>?</span>
            Help & Support
          </button>

          <button onClick={onBack}>
            <span>↩</span>
            Main Website
          </button>

          <div className="traveler-profile">
            <div className="traveler-avatar">A</div>

            <div>
              <strong>Traveler</strong>
              <small>Yatra Member</small>
            </div>

            <span>•••</span>
          </div>
        </div>
      </aside>

      <main className="traveler-main">
        <header className="traveler-topbar">
          <div>
            <span>TRAVELER PORTAL</span>

            <h2>
              {activePage === "Home"
                ? "Good afternoon, Traveler"
                : activePage}
            </h2>
          </div>

          <div className="traveler-top-actions">
            <button
              onClick={() =>
                alert(
                  "You have 2 new Yatra 360 notifications."
                )
              }
            >
              ♢
              <i></i>
            </button>

            <div className="traveler-top-avatar">A</div>
          </div>
        </header>

        {renderPage()}
      </main>

      {selectedDestination && (
        <div
          className="traveler-modal"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="traveler-modal-card"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              className="traveler-modal-close"
              onClick={() =>
                setSelectedDestination(null)
              }
            >
              ×
            </button>

            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
            />

            <div className="traveler-modal-content">
              <span>{selectedDestination.location}</span>

              <h2>{selectedDestination.name}</h2>

              <p>
                {selectedDestination.description}
              </p>

              <div className="traveler-modal-actions">
                <button
                  onClick={() => {
                    setSelectedDestination(null);

                    if (onBook) {
                      onBook("Hotel");
                    }
                  }}
                >
                  Book a Hotel →
                </button>

                <button
                  onClick={() => {
                    setSelectedDestination(null);

                    if (onBook) {
                      onBook("Guide");
                    }
                  }}
                >
                  Find a Guide →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Traveler;
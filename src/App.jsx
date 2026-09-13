import { useState } from "react";
import "./App.css";

import Admin from "./Admin";
import Traveler from "./Traveler";
import Hotel from "./Hotel";
import Restaurant from "./Restaurant";
import Transport from "./Transport";
import Guide from "./Guide";
import Booking from "./Booking";

function App() {
  const [view, setView] = useState("home");
  const [bookingService, setBookingService] = useState("Hotel");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const destinations = [
    {
      name: "Hyderabad",
      state: "Telangana",
      image:
        "https://images.unsplash.com/photo-1572449043410-6c7f8f4a2f1d?auto=format&fit=crop&w=1200&q=80",
      description:
        "Heritage, food, technology and the historic charm of the City of Pearls.",
    },
    {
      name: "Jaipur",
      state: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
      description:
        "Royal palaces, colourful markets and Rajasthan's timeless architecture.",
    },
    {
      name: "Goa",
      state: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      description:
        "Beaches, local culture, food and relaxed coastal experiences.",
    },
    {
      name: "Manali",
      state: "Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
      description:
        "Mountains, valleys, adventure and peaceful Himalayan experiences.",
    },
  ];

  const services = [
    {
      icon: "🏨",
      title: "Hotels",
      description: "Stay, compare and reserve verified properties.",
      action: "Hotel",
    },
    {
      icon: "🍽️",
      title: "Restaurants",
      description: "Discover local food and affordable dining.",
      action: "Restaurant",
    },
    {
      icon: "🚕",
      title: "Transport",
      description: "Book taxis, bikes, autos and local rides.",
      action: "Transport",
    },
    {
      icon: "🧑‍🏫",
      title: "Guides",
      description: "Connect with verified local guides.",
      action: "Guide",
    },
    {
      icon: "🎟️",
      title: "Tickets",
      description: "Plan attraction visits and avoid queues.",
      action: "Ticket",
    },
  ];

  const openBooking = (service) => {
    setBookingService(service);
    setView("booking");
  };

  if (view === "admin") {
    return (
      <div>
        <button
          className="exit-admin-button"
          onClick={() => setView("home")}
        >
          ← Back to Yatra 360
        </button>
        <Admin />
      </div>
    );
  }

  if (view === "traveler") {
    return (
      <Traveler
        onBack={() => setView("home")}
        onBook={openBooking}
      />
    );
  }

  if (view === "hotel") {
    return <Hotel onBack={() => setView("home")} />;
  }

  if (view === "restaurant") {
    return <Restaurant onBack={() => setView("home")} />;
  }

  if (view === "transport") {
    return <Transport onBack={() => setView("home")} />;
  }

  if (view === "guide") {
    return <Guide onBack={() => setView("home")} />;
  }

  if (view === "booking") {
    return (
      <Booking
        service={bookingService}
        onBack={() => setView("traveler")}
      />
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand" onClick={() => setView("home")}>
          <div className="brand-mark">Y</div>
          <div>
            <strong>YATRA 360</strong>
            <span>INDIA, YOUR WAY.</span>
          </div>
        </div>

        <div className="nav-links">
          <a href="#destinations">Destinations</a>
          <a href="#experiences">Experiences</a>
          <a href="#services">Services</a>
          <a href="#partners">Partners</a>

          <button
            className="nav-admin"
            onClick={() => setView("admin")}
          >
            Admin Console
          </button>

          <button
            className="nav-cta"
            onClick={() => setView("traveler")}
          >
            Open Yatra →
          </button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="hero-tag">
              <span></span>
              INDIA'S SMART TRAVEL PLATFORM
            </div>

            <h1>
              Travel India.
              <br />
              <em>Your way.</em>
            </h1>

            <p>
              One intelligent platform for destinations, stays,
              food, transport, guides and unforgettable local
              experiences.
            </p>

            <div className="hero-search">
              <span>⌕</span>
              <input
                placeholder="Where do you want to go?"
                onFocus={() => setView("traveler")}
              />
              <button onClick={() => setView("traveler")}>
                Explore
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>500+</strong>
                <span>Destinations</span>
              </div>
              <div>
                <strong>10K+</strong>
                <span>Travel Partners</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Travel Support</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orb"></div>

            <div className="orb-ring ring-one"></div>
            <div className="orb-ring ring-two"></div>

            <div className="orb-label">
              <span>DISCOVER</span>
              <strong>INDIA</strong>
            </div>
          </div>
        </section>

        <section
          className="section destinations-section"
          id="destinations"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE INDIA</span>
              <h2>Where will you go?</h2>
            </div>

            <button onClick={() => setView("traveler")}>
              View all destinations →
            </button>
          </div>

          <div className="destination-grid">
            {destinations.map((destination) => (
              <article
                className="destination-card"
                key={destination.name}
                onClick={() => setSelectedDestination(destination)}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                />

                <div className="destination-overlay"></div>

                <div className="destination-info">
                  <span>{destination.state}</span>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                </div>

                <div className="destination-arrow">↗</div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="experiences-section"
          id="experiences"
        >
          <div className="experience-content">
            <span className="section-label">
              BEYOND TOURISM
            </span>

            <h2>
              Don't just visit.
              <br />
              <em>Experience.</em>
            </h2>

            <p>
              Discover India through its people, food,
              traditions, streets and stories.
            </p>

            <button
              className="orange-button"
              onClick={() => setView("traveler")}
            >
              Discover experiences →
            </button>
          </div>

          <div className="experience-orb">
            <div></div>
          </div>
        </section>

        <section
          className="section services-section"
          id="services"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">
                EVERYTHING IN ONE PLACE
              </span>
              <h2>Your journey, connected.</h2>
            </div>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article
                className="service-card"
                key={service.title}
                onClick={() => openBooking(service.action)}
              >
                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <span className="service-link">
                  Book now →
                </span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="partners-section"
          id="partners"
        >
          <div className="section-heading">
            <div>
              <span className="section-label">
                BUILT FOR THE WHOLE ECOSYSTEM
              </span>
              <h2>Everyone belongs on Yatra.</h2>
            </div>
          </div>

          <div className="partner-grid">
            <button
              onClick={() => setView("hotel")}
              className="partner-card"
            >
              <span>🏨</span>
              <strong>Hotels</strong>
              <small>Manage stays & bookings</small>
            </button>

            <button
              onClick={() => setView("restaurant")}
              className="partner-card"
            >
              <span>🍽️</span>
              <strong>Restaurants</strong>
              <small>Manage menus & orders</small>
            </button>

            <button
              onClick={() => setView("transport")}
              className="partner-card"
            >
              <span>🚕</span>
              <strong>Transport</strong>
              <small>Manage rides & drivers</small>
            </button>

            <button
              onClick={() => setView("guide")}
              className="partner-card"
            >
              <span>🧑‍🏫</span>
              <strong>Guides</strong>
              <small>Manage tours & travelers</small>
            </button>
          </div>
        </section>

        <section className="trust-section">
          <div>
            <span className="section-label">
              MADE FOR INDIA
            </span>

            <h2>
              Simple for travelers.
              <br />
              Powerful for partners.
            </h2>
          </div>

          <div className="trust-items">
            <div>
              <strong>01</strong>
              <span>One connected platform</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Local-first discovery</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Verified travel ecosystem</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Smart travel assistance</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <div className="brand-mark">Y</div>

          <div>
            <strong>YATRA 360</strong>
            <span>INDIA, YOUR WAY.</span>
          </div>
        </div>

        <div className="footer-links">
          <button onClick={() => setView("traveler")}>
            Traveler Portal
          </button>

          <button onClick={() => setView("hotel")}>
            Partner Portal
          </button>

          <button onClick={() => setView("admin")}>
            Admin Console
          </button>
        </div>

        <p>
          © 2026 Yatra 360 · Smart India Hackathon Prototype
        </p>
      </footer>

      {selectedDestination && (
        <div
          className="destination-modal"
          onClick={() => setSelectedDestination(null)}
        >
          <div
            className="destination-modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedDestination(null)}
            >
              ×
            </button>

            <img
              src={selectedDestination.image}
              alt={selectedDestination.name}
            />

            <div className="modal-content">
              <span>{selectedDestination.state}</span>

              <h2>{selectedDestination.name}</h2>

              <p>{selectedDestination.description}</p>

              <button
                className="orange-button"
                onClick={() => {
                  setSelectedDestination(null);
                  setView("traveler");
                }}
              >
                Explore {selectedDestination.name} →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
import { useState } from "react";
import "./Booking.css";

function Booking({ service = "Hotel", onBack }) {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const [form, setForm] = useState({
    name: "",
    date: "",
    guests: "2",
    request: "",
  });

  const serviceData = {
    Hotel: {
      title: "The Heritage Hotel",
      location: "Hyderabad",
      price: "₹2,400",
      description: "Premium stay in the heart of Hyderabad.",
    },
    Restaurant: {
      title: "Gokul Chaat House",
      location: "Koti, Hyderabad",
      price: "₹680",
      description: "Authentic local food experience.",
    },
    Transport: {
      title: "Yatra Transport",
      location: "Hyderabad",
      price: "₹420",
      description: "Reliable city transportation.",
    },
    Guide: {
      title: "Arjun Guide",
      location: "Hyderabad Old City",
      price: "₹1,200",
      description: "Verified local heritage guide.",
    },
    Ticket: {
      title: "Hyderabad Heritage Pass",
      location: "Charminar & Old City",
      price: "₹350",
      description: "Explore Hyderabad's iconic attractions.",
    },
  };

  const current = serviceData[service] || serviceData.Hotel;

  const updateForm = (field, value) => {
    setForm((old) => ({
      ...old,
      [field]: value,
    }));
  };

  const createBooking = () => {
    const bookingId = `YTR-${Date.now()
      .toString()
      .slice(-6)}`;

    const booking = {
      id: bookingId,
      service,
      guest: form.name || "Yatra Traveler",
      date: form.date || "Sep 18–20, 2026",
      guests: form.guests,
      request: form.request,
      provider: current.title,
      location: current.location,
      amount: current.price,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "yatra360_latest_booking",
      JSON.stringify(booking)
    );

    const existingBookings = JSON.parse(
      localStorage.getItem("yatra360_bookings") || "[]"
    );

    localStorage.setItem(
      "yatra360_bookings",
      JSON.stringify([
        booking,
        ...existingBookings,
      ])
    );

    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="booking-app">
        <div className="booking-success">
          <div className="booking-success-icon">✓</div>

          <span>BOOKING CONFIRMED</span>

          <h1>Your journey is booked.</h1>

          <p>
            Your booking has been successfully created
            and sent to the partner.
          </p>

          <div className="booking-success-card">
            <div>
              <span>BOOKING ID</span>
              <strong>
                YTR-
                {JSON.parse(
                  localStorage.getItem(
                    "yatra360_latest_booking"
                  ) || "{}"
                ).id?.replace("YTR-", "")}
              </strong>
            </div>

            <div>
              <span>SERVICE</span>
              <strong>{service}</strong>
            </div>

            <div>
              <span>PARTNER</span>
              <strong>{current.title}</strong>
            </div>

            <div>
              <span>STATUS</span>
              <strong className="booking-confirmed">
                New
              </strong>
            </div>
          </div>

          <div className="booking-demo-note">
            <strong>Yatra 360 Demo</strong>
            <p>
              This booking has been added to the
              partner portal for demonstration.
            </p>
          </div>

          <button
            className="booking-primary-button"
            onClick={onBack}
          >
            Back to Traveler Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-app">
      <header className="booking-header">
        <button
          className="booking-back"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="booking-brand">
          <div>Y</div>
          <span>
            <strong>YATRA</strong>
            <small>360</small>
          </span>
        </div>

        <div className="booking-secure">
          <span>●</span>
          Demo Secure
        </div>
      </header>

      <main className="booking-main">
        <div className="booking-heading">
          <span>YATRA 360 BOOKING</span>

          <h1>Complete your booking</h1>

          <p>
            Reserve your experience with{" "}
            <strong>{current.title}</strong>.
          </p>
        </div>

        <div className="booking-progress">
          <div className={step >= 1 ? "active" : ""}>
            <span>1</span>
            Details
          </div>

          <i className={step >= 2 ? "active" : ""}></i>

          <div className={step >= 2 ? "active" : ""}>
            <span>2</span>
            Review
          </div>

          <i className={step >= 3 ? "active" : ""}></i>

          <div className={step >= 3 ? "active" : ""}>
            <span>3</span>
            Confirm
          </div>
        </div>

        <div className="booking-layout">
          <section className="booking-card">
            {step === 1 && (
              <>
                <div className="booking-card-heading">
                  <span>TRAVELER DETAILS</span>
                  <h2>Tell us about your trip</h2>
                </div>

                <div className="booking-form">
                  <label>
                    Full name
                    <input
                      type="text"
                      placeholder="Enter traveler name"
                      value={form.name}
                      onChange={(e) =>
                        updateForm(
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <div className="booking-form-row">
                    <label>
                      Date
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          updateForm(
                            "date",
                            e.target.value
                          )
                        }
                      />
                    </label>

                    <label>
                      Guests
                      <select
                        value={form.guests}
                        onChange={(e) =>
                          updateForm(
                            "guests",
                            e.target.value
                          )
                        }
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Special request
                    <textarea
                      placeholder="Anything the partner should know?"
                      value={form.request}
                      onChange={(e) =>
                        updateForm(
                          "request",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>

                <button
                  className="booking-primary-button"
                  onClick={() => setStep(2)}
                >
                  Continue to Review →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="booking-card-heading">
                  <span>REVIEW</span>
                  <h2>Check your booking</h2>
                </div>

                <div className="booking-review">
                  <div>
                    <span>Traveler</span>
                    <strong>
                      {form.name || "Yatra Traveler"}
                    </strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>
                      {form.date ||
                        "Sep 18–20, 2026"}
                    </strong>
                  </div>

                  <div>
                    <span>Guests</span>
                    <strong>
                      {form.guests} Guests
                    </strong>
                  </div>

                  <div>
                    <span>Special request</span>
                    <strong>
                      {form.request || "None"}
                    </strong>
                  </div>
                </div>

                <div className="booking-demo-payment">
                  <span>DEMO PAYMENT</span>

                  <strong>
                    No real payment will be processed.
                  </strong>

                  <p>
                    This is a prototype booking flow
                    created for the Yatra 360 SIH demo.
                  </p>
                </div>

                <div className="booking-button-row">
                  <button
                    className="booking-secondary-button"
                    onClick={() => setStep(1)}
                  >
                    ← Edit
                  </button>

                  <button
                    className="booking-primary-button"
                    onClick={() => setStep(3)}
                  >
                    Continue →
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="booking-card-heading">
                  <span>FINAL CONFIRMATION</span>
                  <h2>Ready to book?</h2>
                </div>

                <div className="booking-final">
                  <div className="booking-final-icon">
                    ✓
                  </div>

                  <h3>{current.title}</h3>

                  <p>{current.location}</p>

                  <strong>{current.price}</strong>

                  <small>
                    Your booking will immediately
                    appear in the partner portal.
                  </small>
                </div>

                <div className="booking-button-row">
                  <button
                    className="booking-secondary-button"
                    onClick={() => setStep(2)}
                  >
                    ← Back
                  </button>

                  <button
                    className="booking-primary-button"
                    onClick={createBooking}
                  >
                    Confirm Booking ✓
                  </button>
                </div>
              </>
            )}
          </section>

          <aside className="booking-summary">
            <span>YOUR BOOKING</span>

            <h2>{current.title}</h2>

            <p>{current.location}</p>

            <div className="booking-summary-line"></div>

            <div>
              <span>Service</span>
              <strong>{service}</strong>
            </div>

            <div>
              <span>Guests</span>
              <strong>{form.guests}</strong>
            </div>

            <div>
              <span>Price</span>
              <strong>{current.price}</strong>
            </div>

            <div className="booking-summary-total">
              <span>Total</span>
              <strong>{current.price}</strong>
            </div>

            <div className="booking-partner-note">
              <span>✓</span>
              <p>
                Verified Yatra 360 partner
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Booking;
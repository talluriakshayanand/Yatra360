import { useState } from "react";
import "./TravelAI.css";

function TravelAI() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState(null);

  const generatePlan = () => {
    const text = query.toLowerCase();

    if (
      text.includes("hyderabad") ||
      text.includes("charminar")
    ) {
      setAnswer({
        title: "Your Hyderabad Smart Plan",
        days: [
          {
            day: "DAY 01",
            title: "Heritage Hyderabad",
            places:
              "Charminar → Laad Bazaar → Chowmahalla Palace → Old City food trail",
            budget: "₹1,200–₹1,800",
          },
          {
            day: "DAY 02",
            title: "History & Culture",
            places:
              "Golconda Fort → Qutb Shahi Tombs → Hussain Sagar → Necklace Road",
            budget: "₹1,000–₹1,600",
          },
        ],
        tip:
          "Use local transport for short distances and try famous local food instead of expensive tourist restaurants.",
      });
      return;
    }

    if (text.includes("goa")) {
      setAnswer({
        title: "Your Goa Smart Plan",
        days: [
          {
            day: "DAY 01",
            title: "North Goa",
            places:
              "Fort Aguada → Candolim → Anjuna → Vagator sunset",
            budget: "₹1,500–₹2,200",
          },
          {
            day: "DAY 02",
            title: "South Goa",
            places:
              "Colva → Benaulim → Old Goa → Basilica area",
            budget: "₹1,200–₹2,000",
          },
        ],
        tip:
          "Compare transport options before booking and keep some time free for local discoveries.",
      });
      return;
    }

    if (text.includes("jaipur")) {
      setAnswer({
        title: "Your Jaipur Smart Plan",
        days: [
          {
            day: "DAY 01",
            title: "Royal Jaipur",
            places:
              "Amber Fort → Jal Mahal → City Palace → Hawa Mahal",
            budget: "₹1,200–₹2,000",
          },
          {
            day: "DAY 02",
            title: "Culture & Markets",
            places:
              "Jantar Mantar → Albert Hall → Bapu Bazaar → local food",
            budget: "₹900–₹1,500",
          },
        ],
        tip:
          "Start major monuments early to avoid crowds and use local food spots for a better-value experience.",
      });
      return;
    }

    setAnswer({
      title: "Your Yatra 360 Smart Plan",
      days: [
        {
          day: "DAY 01",
          title: "Explore the city",
          places:
            "Start with the main heritage landmark → local market → famous food spot",
          budget: "₹1,000–₹1,800",
        },
        {
          day: "DAY 02",
          title: "Culture & experiences",
          places:
            "Historic attraction → local experience → sunset destination",
          budget: "₹1,000–₹1,800",
        },
      ],
      tip:
        "Tell Yatra 360 your destination, number of days and approximate budget for a more specific plan.",
    });
  };

  return (
    <section className="travel-ai">
      <div className="travel-ai-heading">
        <div>
          <span>YATRA INTELLIGENCE</span>
          <h2>Ask Yatra AI</h2>
          <p>
            Build a smarter trip using destinations, local
            experiences and budget-friendly suggestions.
          </p>
        </div>

        <div className="travel-ai-orb">Y</div>
      </div>

      <div className="travel-ai-search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") generatePlan();
          }}
          placeholder="Try: Plan a 2-day Hyderabad trip under ₹5,000"
        />

        <button onClick={generatePlan}>
          Ask Yatra →
        </button>
      </div>

      <div className="travel-ai-suggestions">
        <button
          onClick={() => {
            setQuery(
              "Plan a 2-day Hyderabad trip under ₹5,000"
            );
          }}
        >
          Hyderabad trip
        </button>

        <button
          onClick={() => {
            setQuery("Plan a budget Goa trip");
          }}
        >
          Budget Goa
        </button>

        <button
          onClick={() => {
            setQuery("Plan a Jaipur heritage trip");
          }}
        >
          Jaipur heritage
        </button>
      </div>

      {answer && (
        <div className="travel-ai-result">
          <div className="travel-ai-result-top">
            <div>
              <span>AI ITINERARY</span>
              <h3>{answer.title}</h3>
            </div>

            <div className="travel-ai-status">
              ● READY
            </div>
          </div>

          <div className="travel-ai-days">
            {answer.days.map((item) => (
              <article key={item.day}>
                <span>{item.day}</span>

                <h4>{item.title}</h4>

                <p>{item.places}</p>

                <strong>{item.budget}</strong>
              </article>
            ))}
          </div>

          <div className="travel-ai-tip">
            <span>✦</span>
            <p>
              <strong>Yatra tip:</strong> {answer.tip}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default TravelAI;
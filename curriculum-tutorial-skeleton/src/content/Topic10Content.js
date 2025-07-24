import React, { useState } from "react";
import "./CustomSectionStyles.css";

const realWorldTable = [
  ["Flipkart wants to kill a link after 24h", "URL Expiration"],
  ["Zomato wants /zomato/monsoon-deal", "Custom Short Code"],
  ["Admin checks trending campaigns", "URL Statistics"],
  ["Upload CSV of 500 product URLs", "Bulk Operations"],
  ["Filter by date: \"last 7 days\"", "Search & Filtering"],
  ["Prevent bot spamming", "Rate Limiting"]
];

const learningTable = [
  ["10.1 URL Expiration", "Add expiryDate field and logic in redirect controller"],
  ["10.2 Custom Codes", "Allow user to choose short code manually (with fallback)"],
  ["10.3 Stats", "Total clicks, last access, click logs"],
  ["10.4 Bulk Ops", "(Optional) CSV upload, multiple URL entries"],
  ["10.5 Search", "Query by filters – org, keyword, time"],
  ["10.6 Rate Limiting", "(Optional) Using IP + timestamp checks or filters"]
];

const discussionQA = [
  {
    question: "Why should URLs have an expiry date?",
    answer: "To limit link usage post-campaign or for sensitive content."
  },
  {
    question: "How do custom codes help branding?",
    answer: "Custom codes like /zomato/biryani2025 are easier to remember and share."
  },
  {
    question: "What's the benefit of tracking total hits?",
    answer: "Gives visibility into what's working and what's not (click-through rate)."
  },
  {
    question: "Should rate limiting be applied to all users?",
    answer: "It can be selective—apply to anonymous users or by IP address only."
  }
];

const tryItTasks = [
  "Add expiryDate field in your URLEntity, block redirects after expiry",
  "Add a customCode field in the DTO and make short code optional",
  "Add a /stats/{code} API to return total hits and last clicked time",
  "Try implementing simple filtering on /api/urls?org=zomato&createdAfter=..."
];

const bonusTasks = [
  "Log user-agent, referrer information",
  "Use Spring Data Specifications for advanced filtering"
];

const Topic10Content = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🧠 Section 10 – Advanced Features Overview</h2>
      <hr />
      <div className="yellow-callout">
        <b>This section explores optional and enhancement-based features that improve usability, performance, and customization.</b>
        <br /><br />
        Whether you're building for a marketing platform, SaaS tool, or analytics dashboard, these features give users the control and insight they need.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why Advanced Features?
      </h3>
      <div className="blue-card-section">
        <b>While core functionality (shortening & redirecting URLs) works well, modern users expect more:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li><b>Expiration</b> to make links auto-disable after campaigns.</li>
          <li><b>Custom aliases</b> like <span className="blue-inline-code">/summer-deals</span> instead of gibberish codes.</li>
          <li><b>Statistics</b> to measure link performance.</li>
          <li><b>Search & filter</b> for better UX in large datasets.</li>
          <li><b>Bulk operations</b> for power users managing hundreds of links.</li>
          <li><b>Rate limiting</b> to prevent abuse and bot attacks.</li>
        </ul>
        <div style={{ marginTop: "1rem", fontWeight: "bold" }}>
          These upgrades make your app <b>enterprise-ready</b>.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 How They Help in Real Use Cases
      </h3>
      <ul className="topic-checklist">
        <li><b>Marketers</b> want to expire links after the campaign ends.</li>
        <li><b>Admins</b> want to block malicious users via rate limits.</li>
        <li><b>Users</b> want to quickly find a link using filters.</li>
        <li><b>Power Users</b> want to generate 100+ short links in one go.</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💼 Real-world Use Example
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Use Case</th>
            <th>Feature Needed</th>
          </tr>
        </thead>
        <tbody>
          {realWorldTable.map(([useCase, feature], idx) => (
            <tr key={idx}>
              <td>{useCase}</td>
              <td><span className="blue-inline-code">{feature}</span></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📚 What You'll Learn in Section 10
      </h3>
      <div className="blue-card-section">
        <b>Here's what you'll gain:</b>
        <table className="custom-table" style={{ marginTop: "0.7rem" }}>
          <thead>
            <tr>
              <th>Topic</th>
              <th>What You'll Implement</th>
            </tr>
          </thead>
          <tbody>
            {learningTable.map(([topic, implementation], idx) => (
              <tr key={idx}>
                <td><span className="blue-inline-code">{topic}</span></td>
                <td>{implementation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4 style={{ color: "#1976d2", margin: "0 0 0.5rem 0" }}>❓ Quick Questions:</h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}
            >
              Q{idx + 1}: {item.question}
            </div>
            <button
              className="reveal-btn"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`answer-${idx}`}
            >
              {openIdx === idx ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openIdx === idx && (
              <div className="yellow-callout" id={`answer-${idx}`}>
                → {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🎯 Tasks:</b>
        <ul style={{ margin: "0.5rem 0 1rem 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
        <b>💡 Bonus:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bonusTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </div>

      <div className="blue-card-section" style={{ marginTop: "1.5rem" }}>
        <h3 style={{ color: "#1769aa", margin: "0 0 1rem 0" }}>🎪 Next Steps</h3>
        <p>
          In the following subtopics, we'll implement each of these advanced features step by step. 
          Each one builds upon the core URL shortening functionality we've already created, making your 
          platform more robust and feature-rich.
        </p>
        <p style={{ marginTop: "0.7rem" }}>
          <b>Ready to make your URL shortener enterprise-grade? Let's dive in! 🚀</b>
        </p>
      </div>
    </div>
  );
};

export default Topic10Content;

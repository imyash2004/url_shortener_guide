import React from 'react';
import './CustomSectionStyles.css';

const Topic13Content = () => {
  const learningOutcomes = [
    "How to configure CORS so browsers can communicate securely",
    "Why API contracts are critical and how to define them",
    "What happens during frontend-backend communication",
    "How to test APIs from a frontend developer's perspective",
    "How to use mock data when backend isn't ready yet"
  ];

  const problemScenarios = [
    "Your backend is production-ready, but the frontend can't log in because CORS blocks the request.",
    "The frontend sends a sign-up payload, but your backend expects a different format. Error.",
    "The backend sends complex nested data, but the frontend needs a simpler structure. UI breaks.",
    "Frontend is blocked because you're still finalizing one API. Time wasted."
  ];

  const sectionBenefits = [
    "Smooth dev collaboration",
    "Predictable testing",
    "Secure API access",
    "Faster feature delivery"
  ];

  const skillsGained = [
    "Prevent CORS errors in the browser",
    "Deliver APIs with clear expectations and stable behavior",
    "Guide frontend developers with mock data",
    "Eliminate guesswork during UI integration",
    "Create a fast, smooth collaboration flow between teams"
  ];

  const checklistItems = [
    "CORS config allows your frontend domain",
    "All API contracts documented in Notion/Postman/Swagger",
    "JWT setup ready for frontend tokens",
    "Postman tests for frontend use-cases (401, 403, 404)",
    "JSON mock files or mock server created for integration testing"
  ];

  const summaryTable = [
    ["CORS Configuration", "Enables secure communication between browser and backend"],
    ["API Contracts", "Defines request/response format for frontend/backend"],
    ["Communication Handling", "Covers auth headers, error codes, and JSON standards"],
    ["Frontend Testing", "Ensures backend behaves correctly when hit from UI"],
    ["Mock Data Setup", "Lets frontend work independently from backend"]
  ];

  return (
    <div className="topic-content">
      <h2 style={{ color: "#1769aa", borderBottom: "3px solid #1769aa", paddingBottom: "10px" }}>
        🚀 Section 13 – Frontend Integration Preparation
      </h2>
      
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
        As your backend system becomes more robust, it's time to ensure it <b>talks fluently and securely</b> with the frontend. 
        This section focuses on making your backend ready for integration with UI frameworks like <b>React, Angular, or Vue</b>.
      </p>

      <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
        Frontend developers rely on clean APIs, predictable responses, and cross-origin compatibility. Any friction in this integration 
        can cause delays, bugs, or even total disconnects between UI and backend logic.
      </p>

      <div className="yellow-callout">
        <i>Let's understand how to avoid that and build a strong handshake between both ends of the system.</i>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🎯 What You Will Learn in This Section
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {learningOutcomes.map((outcome, index) => (
            <li key={index}>✅ {outcome}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔍 Why This Matters
      </h3>
      <div className="blue-card-section">
        <p><b>Imagine this:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {problemScenarios.map((scenario, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>{scenario}</li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          That's where <b>Frontend Integration Preparation</b> comes into play. This section ensures:
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {sectionBenefits.map((benefit, index) => (
            <li key={index}>🛠 {benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📦 Topics Covered in Section 13
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1.5rem" }}>
          <h4><b>🔐 13.1 – CORS Configuration</b></h4>
          <p>
            Learn how to configure Cross-Origin Resource Sharing so your frontend (e.g., localhost:3000) can communicate 
            with the backend (localhost:8080) without browser security issues.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4><b>📑 13.2 – API Contract Definition</b></h4>
          <p>
            Establish strong, consistent API contracts – defining exactly what requests should look like and how responses 
            will behave. We'll also explore tools like Swagger and Postman for API documentation and mock previews.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4><b>🔁 13.3 – Frontend-Backend Communication</b></h4>
          <p>
            Understand how frontend apps communicate with your backend, including JWT token headers, JSON formats, 
            HTTP error handling, and response parsing on the UI.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4><b>🧪 13.4 – API Testing for Frontend</b></h4>
          <p>
            Test your backend from a frontend developer's lens. We'll simulate scenarios like invalid tokens, expired sessions, 
            missing payloads, and correct CORS headers using Postman or browser dev tools.
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h4><b>🧰 13.5 – Mock Data Setup</b></h4>
          <p>
            Explore how to unblock frontend developers by simulating backend responses using mock data. Use tools like 
            JSON Server, MSW (for React), and Postman Mock Server when backend APIs are not yet stable.
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧠 What You'll Gain
      </h3>
      <div className="blue-card-section">
        <p>After this section, you'll be able to:</p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {skillsGained.map((skill, index) => (
            <li key={index}>✅ {skill}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔁 Real-World Scenario
      </h3>
      <div className="blue-card-section">
        <div className="yellow-callout">
          <i>
            "Frontend team pushed a new feature, but the login keeps failing due to CORS issues. The backend expected 
            firstName, but the frontend sent firstname. The project is now delayed."
          </i>
        </div>
        <p style={{ marginTop: "1rem" }}>
          You can avoid that chaos by mastering <b>frontend integration preparation</b> right now.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p><b>🎯 Build a checklist:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {checklistItems.map((item, index) => (
            <li key={index}>☐ {item}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, index) => (
            <tr key={index}>
              <td><b>{row[0]}</b></td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic13Content;

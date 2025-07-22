import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic7Subtopic10Content = () => {
  const [showQ1, setShowQ1] = useState(false);
  const [showQ2, setShowQ2] = useState(false);
  const [showQ3, setShowQ3] = useState(false);
  const [showQ4, setShowQ4] = useState(false);

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🧪 7.10 – Testing Authentication APIs
      </h2>
      <hr />
      <div className="yellow-callout">
        This section is all about <b>verifying</b> that:
        <ul className="topic-checklist">
          <li>Signup works ✅</li>
          <li>Login works ✅</li>
          <li>JWT is generated and parsed correctly ✅</li>
          <li>Protected endpoints reject unauthenticated users ❌</li>
          <li>Valid JWT allows access to secure data ✅</li>
        </ul>
        We'll use <b>Postman</b> or <b>curl</b> for this.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧭 What Are We Testing?
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Test Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>POST /signup</code>
            </td>
            <td>Register a new user</td>
          </tr>
          <tr>
            <td>
              <code>POST /signin</code>
            </td>
            <td>Log in and receive JWT</td>
          </tr>
          <tr>
            <td>
              <code>Authorization</code> header
            </td>
            <td>Pass JWT in protected request headers</td>
          </tr>
          <tr>
            <td>
              <code>/api/**</code>
            </td>
            <td>Should fail without JWT, succeed with JWT</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 1. Signup Test – <code>/api/auth/signup</code>
      </h3>
      <div className="blue-card-section">
        <p>
          <strong>Request:</strong>
        </p>
        <pre className="topic-codeblock">{`POST /api/auth/signup
Content-Type: application/json`}</pre>

        <p>
          <strong>Body:</strong>
        </p>
        <pre className="topic-codeblock">{`{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}`}</pre>

        <p>
          <strong>Expected Response:</strong>
        </p>
        <pre className="topic-codeblock">{`{
  "status": "success",
  "message": "User registered successfully"
}`}</pre>

        <h4>🔁 Retry</h4>
        <p>If the email is already taken, you should get:</p>
        <pre className="topic-codeblock">{`{
  "status": "error",
  "message": "User already exists with this email"
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔑 2. Login Test – <code>/api/auth/signin</code>
      </h3>
      <div className="blue-card-section">
        <p>
          <strong>Request:</strong>
        </p>
        <pre className="topic-codeblock">{`POST /api/auth/signin
Content-Type: application/json`}</pre>

        <p>
          <strong>Body:</strong>
        </p>
        <pre className="topic-codeblock">{`{
  "email": "alice@example.com",
  "password": "password123"
}`}</pre>

        <p>
          <strong>Expected Response:</strong>
        </p>
        <pre className="topic-codeblock">{`{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`}</pre>
        <p>
          ✅ Copy this <code>token</code> — we'll use it to access secure APIs!
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔒 3. Accessing Protected API – <code>/api/urls</code>
      </h3>
      <div className="blue-card-section">
        <h4>❌ Without Token</h4>
        <pre className="topic-codeblock">{`GET /api/urls`}</pre>
        <p>
          <strong>Expected:</strong> <code>401 Unauthorized</code>
        </p>
        <p>
          <strong>Reason:</strong> JWT is not provided
        </p>

        <h4>✅ With Token</h4>
        <pre className="topic-codeblock">{`GET /api/urls
Authorization: Bearer <token>`}</pre>
        <p>
          <strong>Expected:</strong> Success response with protected data
        </p>
        <p>Example:</p>
        <pre className="topic-codeblock">{`{
  "status": "success",
  "data": [
    { "originalUrl": "https://flipkart.com", "shortCode": "abcd123" }
  ]
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div className="topic-faq">
          <div className="topic-faq-q">
            <b>Q1: How does the client authenticate requests after login?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ1(!showQ1)}>
            {showQ1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ1 && (
            <div className="topic-faq-a">
              By adding the JWT in the <code>Authorization</code> header:{" "}
              <code>Bearer &lt;token&gt;</code>
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q2: What happens if the token is missing or invalid?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ2(!showQ2)}>
            {showQ2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ2 && (
            <div className="topic-faq-a">
              Spring Security returns <code>401 Unauthorized</code>
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q3: Where is the user email/role extracted from?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ3(!showQ3)}>
            {showQ3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ3 && (
            <div className="topic-faq-a">
              From claims inside the decoded JWT
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q4: How can I test multiple users?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ4(!showQ4)}>
            {showQ4 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ4 && (
            <div className="topic-faq-a">
              Repeat the signup + login process for different email/password
              combos
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Extra Task: Test with curl
      </h3>
      <div className="blue-card-section">
        <h4>Signup:</h4>
        <pre className="topic-codeblock">{`curl -X POST http://localhost:8080/api/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Bob","email":"bob@example.com","password":"secret123"}'`}</pre>

        <h4>Login:</h4>
        <pre className="topic-codeblock">{`curl -X POST http://localhost:8080/api/auth/signin \\
  -H "Content-Type: application/json" \\
  -d '{"email":"bob@example.com","password":"secret123"}'`}</pre>

        <h4>Protected:</h4>
        <pre className="topic-codeblock">{`curl http://localhost:8080/api/urls \\
  -H "Authorization: Bearer <token>"`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Test Step</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Signup</td>
            <td>Registers a user and saves hashed password</td>
          </tr>
          <tr>
            <td>Login</td>
            <td>Returns JWT token if credentials are valid</td>
          </tr>
          <tr>
            <td>Access Protected</td>
            <td>
              Requires valid <code>Authorization</code> header
            </td>
          </tr>
          <tr>
            <td>Invalid Token</td>
            <td>Returns 401 Unauthorized</td>
          </tr>
          <tr>
            <td>curl/Postman</td>
            <td>Tools to test API endpoints easily</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Subtopic10Content;

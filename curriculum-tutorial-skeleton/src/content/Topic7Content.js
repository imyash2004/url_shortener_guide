import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  ["User Entity", "Model user data", "Organizes user info securely"],
  ["User Repository", "DB operations for users", "Simplifies data access"],
  [
    "Authentication DTOs",
    "Clean request/response payloads",
    "Decouples API and internal models",
  ],
  [
    "Password Encryption (BCrypt)",
    "Securely hash passwords",
    "Protects user credentials",
  ],
  [
    "JWT Token Generation",
    "Create signed tokens after login",
    "Stateless, secure session management",
  ],
  [
    "JWT Token Validation",
    "Verify token authenticity on each request",
    "Prevents unauthorized access",
  ],
  [
    "Auth Service & Controller",
    "Login and registration APIs",
    "User-friendly access and management",
  ],
  [
    "JWT Configuration",
    "Integrate with Spring Security",
    "Protects endpoints automatically",
  ],
  [
    "Testing Authentication APIs",
    "Ensure everything works securely and as expected",
    "Confidence in system stability",
  ],
];

const Topic7Content = () => {
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🔐 Section 7: Users and JWT – Secure Authentication with JSON Web Tokens
      </h2>
      <hr />
      <div className="yellow-callout">
        Security is a <b>non-negotiable foundation</b> for any modern web
        application, especially one like a URL shortener where users create and
        manage valuable links. Without proper authentication and authorization,
        anyone could manipulate or misuse the service — causing data leaks,
        spam, or worse.
        <br />
        <br />
        This section equips your app with a <b>
          robust authentication system
        </b>{" "}
        that:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Verifies users’ identities,</li>
          <li>Protects sensitive APIs,</li>
          <li>Ensures only authorized users can access or modify resources,</li>
          <li>
            And provides a seamless, stateless, scalable way to manage user
            sessions.
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        What You Will Learn
      </h3>
      <div className="blue-card-section">
        You’ll learn to build a{" "}
        <b>secure user management and authentication system</b> based on
        industry standards:
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            User Entity Design: Structuring the user data model with essential
            fields.
          </li>
          <li>
            User Repository: Efficiently managing user data persistence using
            Spring Data JPA.
          </li>
          <li>
            Authentication DTOs: Designing data transfer objects to keep API
            communication clean and decoupled.
          </li>
          <li>
            Password Encryption: Storing passwords securely using the BCrypt
            hashing algorithm to protect against leaks.
          </li>
          <li>
            JWT Token Generation: Creating signed JSON Web Tokens after login,
            encapsulating user identity securely.
          </li>
          <li>
            JWT Token Validation: Verifying the authenticity and validity of
            tokens on every request.
          </li>
          <li>
            Auth Service Implementation: Handling login, registration, and
            token-related logic in the service layer.
          </li>
          <li>
            Auth Controller: Exposing login and registration endpoints to the
            client.
          </li>
          <li>
            JWT Configuration: Integrating JWT with Spring Security filters to
            protect routes.
          </li>
          <li>
            Testing Authentication APIs: Ensuring the authentication mechanism
            works perfectly through rigorous testing.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        How It Works – The Big Picture
      </h3>
      <div className="blue-card-section">
        When a user registers, their{" "}
        <b>password is never stored in plain text</b> — it’s hashed with BCrypt
        to keep it safe. When they log in, the system verifies their credentials
        and issues a <b>JWT token</b>, a compact string containing user identity
        and metadata, signed cryptographically.
        <br />
        <br />
        This JWT token is then sent with every subsequent request (usually in
        the <span className="blue-inline-code">Authorization</span> HTTP
        header), acting as a <b>digital key</b>. Your backend verifies this
        token on each request — no need to maintain server-side sessions,
        enabling scalability.
        <br />
        <br />
        If the token is valid, the user is authorized to access protected
        resources, otherwise, access is denied. This{" "}
        <b>stateless authentication</b> model is a best practice for modern REST
        APIs.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>Why JWT?</h3>
      <ul className="topic-checklist">
        <li>
          <b>Stateless</b>: No server-side session storage required.
        </li>
        <li>
          <b>Compact & Portable</b>: Can be sent easily in HTTP headers or URLs.
        </li>
        <li>
          <b>Secure</b>: Signed to prevent tampering.
        </li>
        <li>
          <b>Flexible</b>: You can embed user roles and permissions inside the
          token.
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        Key Security Considerations Covered Here
      </h3>
      <ul className="topic-checklist">
        <li>
          <b>Password Hashing</b>: Prevents password theft in case of DB leaks.
        </li>
        <li>
          <b>Token Expiry</b>: Limits window for token misuse.
        </li>
        <li>
          <b>Token Validation</b>: Ensures tokens are genuine and unaltered.
        </li>
        <li>
          <b>Role-Based Access Control</b>: Different permissions for users
          (e.g., admin vs regular user).
        </li>
        <li>
          <b>Secure Storage</b>: Best practices for storing tokens on client
          side (outside backend scope but important).
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        How This Fits Into Your URL Shortener
      </h3>
      <div className="blue-card-section">
        Only registered and logged-in users can create or manage URLs. The
        JWT-based security layer protects your APIs from unauthorized access
        while maintaining a fast, scalable architecture. Later, you can easily
        add <b>refresh tokens</b>, <b>social login</b>, or{" "}
        <b>multi-factor authentication</b> on top.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>Summary Table</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Purpose</th>
            <th>Benefit</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, purpose, benefit], idx) => (
            <tr key={idx}>
              <td>{feature}</td>
              <td>{purpose}</td>
              <td>{benefit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Content;

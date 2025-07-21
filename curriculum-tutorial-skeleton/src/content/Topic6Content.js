import React from "react";
import "./CustomSectionStyles.css";

const Topic6Content = () => {
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🚀 Section 6 – Redirect Controller</h2>
      <hr />
      <div className="yellow-callout">
        <i>
          “Turning short codes into long journeys — the magic of redirection!”
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧭 What Is a Redirect Controller?
      </h3>
      <div className="blue-card-section">
        In a URL shortener system, the <b>Redirect Controller</b> is the part of
        the application that handles <b>incoming short links</b> like:
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>https://short.ly/zomato/20off</code>
          </pre>
        </div>
        When a user clicks this short URL, the backend must:
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Understand the organization (<b>zomato</b>)
          </li>
          <li>
            Decode the short code (<b>20off</b>)
          </li>
          <li>Look it up in the database</li>
          <li>
            Redirect the user to the <b>original full URL</b> (e.g.,{" "}
            <span className="blue-inline-code">
              https://www.zomato.com/offers/20off
            </span>
            )
          </li>
        </ol>
        <div style={{ marginTop: "0.7rem" }}>
          It’s like a digital map that tells a browser:
          <br />
          <b>
            ➡ “Hey, don’t stop here — go <i>there</i> instead!”
          </b>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 What Will You Learn in Section 6?
      </h3>
      <div className="blue-card-section">
        This section takes you through <b>everything</b> involved in making that
        redirection possible:
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>✅ 6.1. Short Code Generation Logic</li>
          <li>✅ 6.2. Redirect Controller Implementation</li>
          <li>✅ 6.3. Path Variable Handling</li>
          <li>✅ 6.4. HTTP Redirect Response</li>
          <li>✅ 6.5. Analytics Tracking</li>
          <li>✅ 6.6. Error Handling for Invalid URLs</li>
          <li>✅ 6.7. Testing Redirect Functionality</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Why This Section Is Critical?
      </h3>
      <div className="yellow-callout">
        A URL shortener is <b>useless without redirection</b>. This is the{" "}
        <b>user-facing interface</b>.<br />
        It must be:
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>🔁 Fast</li>
          <li>🧠 Smart</li>
          <li>🔐 Safe</li>
          <li>📈 Measurable</li>
        </ul>
        <br />
        Think of companies like Bitly or TinyURL — their entire business model{" "}
        <b>depends on accurate and fast redirection</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Preview
      </h3>
      <div className="blue-card-section try-tasks">
        Here are some challenges you’ll face later in this section:
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>Handle custom 404 redirect pages</li>
          <li>Add expiration logic to short codes</li>
          <li>Log analytics to a database or a log file</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔚 Summary</h3>
      <div className="blue-card-section">
        By the end of Section 6, you will:
        <br />
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>✅ Build a working redirect route</li>
          <li>✅ Make it smart, fast, and safe</li>
          <li>✅ Hook in analytics tracking</li>
          <li>✅ Handle invalid links gracefully</li>
        </ul>
      </div>
    </div>
  );
};

export default Topic6Content;

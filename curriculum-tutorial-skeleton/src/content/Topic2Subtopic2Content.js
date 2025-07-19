import React, { useState } from "react";
import "../App.css";

const Topic2Subtopic2Content = () => {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [copiedCode, setCopiedCode] = useState({});

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode((prev) => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopiedCode((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="topic-animated-content">
      <div className="key-idea-box">
        <h3 style={{ marginTop: "0", color: "#1769aa" }}>
          🏗️{" "}
          <span style={{ color: "#1769aa" }}>
            Overview: Connecting Spring Boot with a Database
          </span>
        </h3>
        <p>
          Your application now has an entity, but where will this data live?
          This section helps you configure the <strong>database</strong>
          so your app can store and retrieve data.
        </p>
        <p>
          Spring Boot makes it super easy to set up a database — whether you're
          using <strong>in-memory (H2)</strong> for development or{" "}
          <strong>MySQL/PostgreSQL</strong> in production.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <strong>
            Think of this step as telling your app: "Here's where the data
            lives, and here's how to talk to it."
          </strong>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 <span style={{ color: "#1769aa" }}>Learning Outcomes</span>
      </h3>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Understand how Spring Boot handles database configuration
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Configure &nbsp;<strong>H2 Database</strong> &nbsp;for local
          development
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Learn about <code>application.properties</code> (or{" "}
          <code>application.yml</code>)
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Enable H2 console for inspection
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Understand key Spring Boot DB properties
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ <span style={{ color: "#1769aa" }}>What is H2 Database?</span>
      </h3>
      <p>
        H2 is a <strong>lightweight in-memory database</strong> that works well
        for development and testing.
      </p>
      <ul className="topic-bullets">
        <li>Auto-configures with Spring Boot</li>
        <li>Doesn't need installation</li>
        <li>Disappears when the app stops (because it's in-memory)</li>
        <li>
          Accessible through browser (<code>/h2-console</code>)
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📄{" "}
        <span style={{ color: "#1769aa" }}>
          Basic Configuration: `application.properties`
        </span>
      </h3>
      <p>Create or edit this file:</p>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.properties ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `# ===============================
# H2 Database Configuration
# ===============================
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Automatically creates tables based on entities
spring.jpa.hibernate.ddl-auto=update

# Show SQL in the logs
spring.jpa.show-sql=true

# Format the printed SQL
spring.jpa.properties.hibernate.format_sql=true

# Enable H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console`,
                "properties"
              )
            }
          >
            {copiedCode.properties ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.properties ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`# ===============================
# H2 Database Configuration
# ===============================
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Automatically creates tables based on entities
spring.jpa.hibernate.ddl-auto=update

# Show SQL in the logs
spring.jpa.show-sql=true

# Format the printed SQL
spring.jpa.properties.hibernate.format_sql=true

# Enable H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console`}</code>
          </pre>
        </div>
      </div>

      <div className="topic-callout">
        <span role="img" aria-label="checkmark">
          ✅
        </span>
        <strong>
          Tip: Place this file under:{" "}
          <code>src/main/resources/application.properties</code>
        </strong>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘{" "}
        <span style={{ color: "#1769aa" }}>
          What is `spring.jpa.hibernate.ddl-auto`?
        </span>
      </h3>

      <div className="topic-funfact example-block">
        <b>🔧 DDL Auto Options</b>
        <div className="topic-funfact-block">
          <div>
            <strong>none:</strong> Do nothing with schema
          </div>
          <div>
            <strong>create:</strong> Create schema at startup,{" "}
            <strong>deletes existing data</strong>
          </div>
          <div>
            <strong>update:</strong> Create if not exists and update schema if
            needed (<strong>default choice</strong>)
          </div>
          <div>
            <strong>validate:</strong> Validate schema matches entity
            definitions
          </div>
          <div>
            <strong>create-drop:</strong> Like create but drops schema when app
            stops
          </div>
        </div>
      </div>

      <div className="topic-callout">
        <span role="img" aria-label="info">
          ℹ️
        </span>
        <strong>
          Recommended during development: <code>update</code>
        </strong>
        <br />
        <span style={{ color: "#666" }}>
          Avoid <code>create</code> or <code>drop</code> in production
        </span>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍{" "}
        <span style={{ color: "#1769aa" }}>
          Real-World Use Case: Switching Databases
        </span>
      </h3>
      <p>
        In real applications, you can use H2 for development and
        PostgreSQL/MySQL for production. You just{" "}
        <strong>change the properties</strong>, and Spring Boot handles the
        rest.
      </p>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪{" "}
        <span style={{ color: "#1769aa" }}>Try It Yourself: Step-by-step</span>
      </h3>

      <div className="topic-funfact example-block">
        <b>✅ Setup Steps</b>
        <div className="topic-funfact-block">
          <div>
            1. Open <code>application.properties</code>
          </div>
          <div>2. Add the H2 configuration shown above</div>
          <div>3. Run your Spring Boot application</div>
          <div>
            4. Visit: <code>http://localhost:8080/h2-console</code>
          </div>
          <div>5. Enter:</div>
          <div style={{ marginLeft: "1rem" }}>
            • <strong>JDBC URL:</strong> <code>jdbc:h2:mem:testdb</code>
            <br />• <strong>User Name:</strong> <code>sa</code>
            <br />• <strong>Password:</strong> <em>(leave blank)</em>
          </div>
          <div>
            6. Click "Connect" → View tables → Check <code>url</code> table
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ❓{" "}
        <span style={{ color: "#1769aa" }}>
          Common Questions & Clarifications
        </span>
      </h3>

      <div className="topic-funfact example-block">
        <b>Q1: Why use H2 instead of MySQL/PostgreSQL?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer1(!showAnswer1)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer1 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> H2 is easy to set up, fast, and requires no
              installation — great for development and testing.
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>Q2: What happens if I restart the app?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer2(!showAnswer2)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer2 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Since it's in-memory, all data is lost unless
              you're using file-based H2. This is intentional for testing.
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>Q3: How can I change to MySQL or PostgreSQL later?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer3(!showAnswer3)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer3 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Just change the{" "}
              <code>spring.datasource.url</code>, driver, username, and
              password. Spring Boot does the rest.
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 <span style={{ color: "#1769aa" }}>Best Practices</span>
      </h3>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use H2 for local development and testing
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use environment-specific config for dev/prod
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use <code>ddl-auto=validate</code> or migrations (like
          Flyway/Liquibase) in production
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Keep credentials and secrets in environment variables (not hard-coded)
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪{" "}
        <span style={{ color: "#1769aa" }}>
          Bonus: application.yml Alternative
        </span>
      </h3>
      <p>You can also use YAML format:</p>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.yaml ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
  h2:
    console:
      enabled: true
      path: /h2-console`,
                "yaml"
              )
            }
          >
            {copiedCode.yaml ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.yaml ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password:
  jpa:
    show-sql: true
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
  h2:
    console:
      enabled: true
      path: /h2-console`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔚 <span style={{ color: "#1769aa" }}>You're Ready!</span>
      </h3>
      <p>
        Your database is now connected and ready to store URLs. From here,
        you'll move into building <strong>repositories</strong>
        to actually perform DB operations.
      </p>
    </div>
  );
};

export default Topic2Subtopic2Content;

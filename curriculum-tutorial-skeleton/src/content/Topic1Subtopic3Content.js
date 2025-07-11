import React, { useState } from "react";
import "../App.css";

export default function Topic1Subtopic3Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [showA4, setShowA4] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState({});

  const copyToClipboard = async (text, commandId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommands((prev) => ({ ...prev, [commandId]: true }));
      setTimeout(() => {
        setCopiedCommands((prev) => ({ ...prev, [commandId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="topic-animated-content">
      <h3>🏗️ Overview: What's Inside a Spring Boot Project?</h3>
      <p>
        Ever opened a Spring Boot project and thought,{" "}
        <i>"Whoa... so many folders! Where do I even begin?"</i> 😵‍💫
      </p>
      <p>
        Don't worry — this section is your map. Here, you'll explore{" "}
        <b>what goes where, why it's structured that way</b>, and how to keep
        your project <b>clean and scalable</b> from day one.
      </p>
      <p>
        Think of your project like a building — the <b>structure</b> determines
        how easily you can move, expand, or fix things.
      </p>

      <h3>🎯 Learning Outcomes</h3>
      <ul className="topic-checklist">
        <li>✅ Navigate the key folders and files in a Spring Boot project</li>
        <li>
          ✅ Organize code using best-practice <b>package structures</b>
        </li>
        <li>
          ✅ Understand the <b>layered architecture</b> (Controller → Service →
          Repository → Entity)
        </li>
        <li>
          ✅ Set up your own <b>clean architecture</b> for real-world
          development
        </li>
      </ul>

      <h3>🧩 Key Concepts</h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>src/main/java</b>
            </td>
            <td>Where your application logic (Java code) lives</td>
          </tr>
          <tr>
            <td>
              <b>src/main/resources</b>
            </td>
            <td>
              Holds configuration files like <code>application.properties</code>{" "}
              & templates
            </td>
          </tr>
          <tr>
            <td>
              <b>Controller Layer</b>
            </td>
            <td>
              Handles HTTP requests (like a receptionist handling customer
              queries)
            </td>
          </tr>
          <tr>
            <td>
              <b>Service Layer</b>
            </td>
            <td>
              Contains business logic (like the brain processing decisions)
            </td>
          </tr>
          <tr>
            <td>
              <b>Repository Layer</b>
            </td>
            <td>Deals with data (like a librarian managing books)</td>
          </tr>
          <tr>
            <td>
              <b>Entity Layer</b>
            </td>
            <td>
              Defines database models — the real structure of your data (like
              blueprints)
            </td>
          </tr>
          <tr>
            <td>
              <b>DTOs</b>
            </td>
            <td>Transfers data between layers safely and efficiently</td>
          </tr>
        </tbody>
      </table>

      <h3>💡 Analogy: Layers in Real Life</h3>
      <div className="topic-funfact example-block">
        <b>🏪 Online Bookstore Example</b>
        <div className="topic-funfact-block">
          <div>
            <strong>🧍‍♀️ The Controller</strong> takes the order from the customer
          </div>
          <div>
            <strong>🧠 The Service</strong> decides what to do with it
          </div>
          <div>
            <strong>📚 The Repository</strong> fetches/stores books in the
            database
          </div>
          <div>
            <strong>📄 The Entity</strong> is the book record itself
          </div>
          <div>
            <strong>📦 The DTO</strong> is the nicely wrapped package sent back
            to the customer
          </div>
        </div>
      </div>

      <h3>🗂️ Standard Folder Structure</h3>
      <div className="animated-codeblock example-block">
        <b>📁 Your Project Structure</b>
        <div className="topic-funfact-block">
          <pre className="topic-codeblock">
            <code>{`src
└── main
    ├── java
    │   └── com.example.urlshortener
    │       ├── controller
    │       ├── service
    │       ├── repository
    │       ├── entity
    │       └── dto
    └── resources
        ├── application.properties
        └── static / templates (if using web UI)`}</code>
          </pre>
        </div>
      </div>

      <h3>🔨 Step-by-Step Activities</h3>
      <div className="topic-funfact example-block">
        <b>🚀 Hands-On Setup</b>
        <div className="topic-funfact-block">
          <div>
            <strong>1.</strong> Explore the default structure under{" "}
            <code>src/main/java</code>
          </div>
          <div>
            <strong>2.</strong> Create your own package layout:
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>{`com.example.urlshortener
├── controller
├── service
├── repository
├── entity
└── dto`}</code>
            </pre>
            <button
              className={`copy-button ${
                copiedCommands.package ? "copied" : ""
              }`}
              onClick={() =>
                copyToClipboard(
                  `com.example.urlshortener
├── controller
├── service
├── repository
├── entity
└── dto`,
                  "package"
                )
              }
            >
              {copiedCommands.package ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div>
            <strong>3.</strong> Create a simple{" "}
            <code>HelloWorldController</code> inside <code>controller/</code>
          </div>
          <div>
            <strong>4.</strong> Open and understand{" "}
            <code>application.properties</code> under <code>resources/</code>
          </div>
          <div>
            <strong>5.</strong> Review <code>pom.xml</code> for managing
            dependencies
          </div>
        </div>
      </div>

      <h3>🧪 Try It Yourself</h3>
      <div className="topic-funfact example-block">
        <b>💻 Create Your First Controller</b>
        <div className="topic-funfact-block">
          <div>
            <strong>1.</strong> Create the full project structure under{" "}
            <code>com.example.urlshortener</code>
          </div>
          <div>
            <strong>2.</strong> Add a sample REST endpoint:
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>{`@GetMapping("/hello")
public String hello() {
    return "Hello, Spring Boot!";
}`}</code>
            </pre>
            <button
              className={`copy-button ${
                copiedCommands.endpoint ? "copied" : ""
              }`}
              onClick={() =>
                copyToClipboard(
                  `@GetMapping("/hello")
public String hello() {
    return "Hello, Spring Boot!";
}`,
                  "endpoint"
                )
              }
            >
              {copiedCommands.endpoint ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div>
            <strong>3.</strong> Run the app and hit{" "}
            <code>http://localhost:8080/hello</code> in your browser
          </div>
        </div>
      </div>

      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>
            Q: Why do we separate code into different packages like controller,
            service, etc.?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            <strong>A:</strong> It promotes <b>separation of concerns</b>:
            <ul>
              <li>Easier to debug (you know where to look)</li>
              <li>Easier to maintain and scale</li>
              <li>
                Different team members can work on different layers
                independently
              </li>
            </ul>
          </div>
        )}

        <div className="topic-faq-q">
          <b>
            Q: What happens if I skip this structure and write everything in one
            file/class?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
            <strong>A:</strong> You create a <b>God Class</b> – a messy,
            unmaintainable file where everything is mixed:
            <ul>
              <li>Hard to test</li>
              <li>Risk of breaking multiple things with one small change</li>
              <li>Poor collaboration and readability</li>
            </ul>
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: What is the role of application.properties?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA3((v) => !v)}>
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="topic-faq-a">
            <strong>A:</strong> It holds <b>key configuration settings</b>, such
            as:
            <ul>
              <li>
                Port number (<code>server.port=8081</code>)
              </li>
              <li>
                DB connection (<code>spring.datasource.url</code>)
              </li>
              <li>Logging level, JWT secrets, mail settings, etc.</li>
            </ul>
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: What's the difference between an Entity and a DTO?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA4((v) => !v)}>
          {showA4 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA4 && (
          <div className="topic-faq-a">
            <strong>A:</strong>
            <table className="topic-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>DTO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Maps directly to a database table</td>
                  <td>Used to transfer data between layers</td>
                </tr>
                <tr>
                  <td>
                    Contains annotations like <code>@Entity</code>,{" "}
                    <code>@Id</code>
                  </td>
                  <td>Doesn't need database annotations</td>
                </tr>
                <tr>
                  <td>Usually has full data</td>
                  <td>
                    Often has <b>only required</b> fields (secure)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <h3>🌟 Best Practices</h3>
      <ul className="topic-checklist">
        <li>✅ Keep packages small and focused</li>
        <li>
          ✅ Avoid putting logic inside <code>controller</code> — use{" "}
          <code>service</code> instead
        </li>
        <li>
          ✅ Use meaningful names (not <code>Test1Controller</code>,{" "}
          <code>MyService</code>)
        </li>
        <li>
          ✅ Group by <b>function</b>, not just technical layer if project grows
          (feature-based packaging)
        </li>
      </ul>

      <h3>📎 Pro Tip</h3>
      <div
        className="topic-callout"
        style={{ background: "#e8f5e8", borderLeft: "5px solid #4caf50" }}
      >
        <span role="img" aria-label="lightbulb">
          💡
        </span>{" "}
        If your project starts growing too big, consider <b>modularizing it</b>:
        Split it into multiple modules (e.g., <code>user-service</code>,{" "}
        <code>url-service</code>) using Maven multi-module or microservices.
      </div>
    </div>
  );
}

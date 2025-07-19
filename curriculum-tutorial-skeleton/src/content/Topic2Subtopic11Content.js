import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  postBody: `{
  "originalUrl": "https://example.com/long-url"
}`,
  postExample: `{
  "originalUrl": "https://openai.com"
}`,
  postResponse: `{
  "id": 1,
  "originalUrl": "https://openai.com",
  "shortUrl": "abc123",
  "createdAt": "2025-07-17T10:00:00",
  "clickCount": 0
}`,
  redirectUrl: `http://localhost:8080/abc123`,
  loginBody: `{
  "username": "user1",
  "password": "password123"
}`,
  authHeader: `Authorization: Bearer <token>`,
  testScript: `pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});`,
};

const learningOutcomes = [
  "Understand what Postman is and why it’s a must-have for API testing.",
  "Use Postman to send all kinds of HTTP requests (GET, POST, PUT, DELETE).",
  "Inspect request and response headers, status codes, and body payloads.",
  "Set up authentication headers (e.g., JWT tokens) in Postman.",
  "Organize your API requests into collections and environments.",
  "Automate API tests with Postman’s scripting features.",
  "Apply Postman effectively to test your URL shortener APIs.",
];

const discussionPrompts = [
  {
    q: "Why is Postman a game-changer for API development?",
    a: (
      <>
        Postman lets you interact with your backend APIs without building a
        frontend — which speeds up development drastically. Imagine trying to
        test a remote control car without the remote! Postman{" "}
        <b>is that remote control</b> that lets you steer, accelerate, and brake
        your APIs with ease.
      </>
    ),
  },
  {
    q: "How does Postman improve collaboration between frontend and backend teams?",
    a: (
      <>
        By sharing Postman <b>Collections</b> (groups of requests), frontend
        developers instantly know how to call APIs and what responses to expect.
        No more guessing or waiting for backend code updates. It’s like having a
        shared recipe book for both chefs in a kitchen — everyone cooks the same
        dish perfectly!
      </>
    ),
  },
  {
    q: "What are the advantages of automating tests in Postman?",
    a: (
      <>
        Automation saves time and reduces human error. With scripts checking
        status codes, response bodies, and data formats automatically, you catch
        bugs before they reach users. Think of it as having a vigilant assistant
        who double-checks every order before it leaves the kitchen.
      </>
    ),
  },
  {
    q: "How can Postman’s environment variables simplify working with multiple deployment setups?",
    a: (
      <>
        Using environments lets you switch effortlessly between local, staging,
        and production URLs or API keys without editing every request. Imagine
        driving your car on different terrains without changing gears manually —
        Postman handles the shift for you smoothly!
      </>
    ),
  },
  {
    q: "In the context of a URL shortener, why is testing redirect responses important?",
    a: (
      <>
        Redirects are the core of a URL shortener’s functionality. Testing them
        ensures users land on the correct original URL when clicking a short
        link. Missed redirects are like sending guests to the wrong address —
        frustrating and damaging your app’s reputation.
      </>
    ),
  },
  {
    q: "What challenges might beginners face when using Postman, and how can they overcome them?",
    a: (
      <>
        Beginners may feel overwhelmed by the many features and terminology
        (collections, environments, scripts). Starting with simple requests,
        gradually exploring features, and using official tutorials or guides
        (like the linked interactive resource) helps build confidence.
      </>
    ),
  },
  {
    q: "Why is including authentication headers essential for testing secured APIs?",
    a: (
      <>
        Without proper tokens or credentials, your API will reject requests,
        returning 401 Unauthorized errors. Testing authentication thoroughly
        prevents security loopholes. It’s like having a bouncer at a club — no
        valid ID, no entry.
      </>
    ),
  },
];

const tryItTasks = [
  "Download and launch Postman.",
  "Create and send a POST request to your URL shortener create API.",
  "Confirm you receive a short URL in response.",
  "Send a GET request to the short URL endpoint and confirm redirection.",
  "Experiment with PUT and DELETE requests.",
  "Add JWT tokens to test protected endpoints.",
  "Group your requests into collections.",
  "Create environments with variables for URLs and tokens.",
];

const Topic2Subtopic11Content = () => {
  const [copied, setCopied] = useState({});
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 2.11 – Test with Postman/curl</h2>
      <hr />
      <div className="yellow-callout">
        Testing your APIs is a crucial step in software development — it ensures
        your backend behaves exactly as expected before exposing it to real
        users or frontend apps. Postman is a{" "}
        <b>
          powerful and intuitive tool designed specifically for API testing and
          development
        </b>
        . It allows you to build, send, and debug HTTP requests interactively
        without writing any frontend code.
        <br />
        <br />
        Think of Postman as a <b>remote control for your backend</b> — it lets
        you send requests and see responses instantly, making API development
        fast, efficient, and collaborative.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        {learningOutcomes.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🌟 What is Postman?
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>Create and send HTTP requests to any RESTful API.</li>
          <li>
            View and analyze responses with detailed status codes and data.
          </li>
          <li>
            Save requests and group them into collections for reuse and sharing.
          </li>
          <li>
            Manage environments with variables (e.g., different URLs or tokens).
          </li>
          <li>Write test scripts to automate validation of responses.</li>
          <li>Collaborate with team members through shared collections.</li>
        </ul>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Available as a desktop app, browser app, and mobile app, Postman fits
          perfectly into any developer workflow.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Why Postman for URL Shortener APIs?
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            <b>Create short URLs</b> (
            <span className="blue-inline-code">POST /urls</span>)
          </li>
          <li>
            <b>Retrieve list of URLs</b> (
            <span className="blue-inline-code">GET /urls</span>)
          </li>
          <li>
            <b>Update URLs</b> (
            <span className="blue-inline-code">PUT /urls/1</span>)
          </li>
          <li>
            <b>Delete URLs</b> (
            <span className="blue-inline-code">DELETE /urls/1</span>)
          </li>
          <li>
            <b>Redirect short URLs</b> (
            <span className="blue-inline-code">GET /abc123</span>)
          </li>
        </ul>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Testing these endpoints in Postman allows you to verify correctness{" "}
          <b>without writing any frontend code</b>. It also helps debug, verify
          authentication, and ensure all HTTP methods work as intended.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 How to Use Postman: Step-by-Step
      </h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            <b>Install Postman</b>
            <br />
            Download and install from{" "}
            <a
              href="https://www.postman.com/downloads/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.postman.com/downloads/
            </a>
            .
          </li>
          <li>
            <b>Create a New Request</b>
            <br />
            Open Postman. Click <b>New</b> → <b>Request</b>. Name your request
            (e.g., “Create Short URL”).
          </li>
          <li>
            <b>Select HTTP Method and Enter URL</b>
            <br />
            Choose from methods: GET, POST, PUT, DELETE. Enter your API endpoint
            URL, e.g.,{" "}
            <span className="blue-inline-code">http://localhost:8080/urls</span>
            .
          </li>
          <li>
            <b>Add Request Headers</b>
            <br />
            For JSON payloads, add:{" "}
            <span className="blue-inline-code">
              Content-Type: application/json
            </span>
            <br />
            For secured endpoints, add:{" "}
            <span className="blue-inline-code">
              Authorization: Bearer &lt;your-jwt-token&gt;
            </span>
          </li>
          <li>
            <b>Enter Request Body (for POST/PUT)</b>
            <br />
            Switch to <b>Body</b> → <b>raw</b> → <b>JSON</b>. Provide JSON data,
            e.g.:
            <div
              className="topic-codeblock code-with-copy"
              style={{ margin: "0.7rem 0" }}
            >
              <button
                className={`copy-button ${copied.postBody ? "copied" : ""}`}
                onClick={() => copyToClipboard(codeBlocks.postBody, "postBody")}
              >
                {copied.postBody ? "Copied!" : "Copy"}
              </button>
              <pre>
                <code>{codeBlocks.postBody}</code>
              </pre>
            </div>
          </li>
          <li>
            <b>Send Request</b>
            <br />
            Click <b>Send</b>. View response status code, body, headers, and
            time.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Example: Create a Short URL
      </h3>
      <div className="blue-card-section">
        <b>Method:</b> POST
        <br />
        <b>URL:</b>{" "}
        <span className="blue-inline-code">http://localhost:8080/urls</span>
        <br />
        <b>Headers:</b>{" "}
        <span className="blue-inline-code">Content-Type: application/json</span>
        <br />
        <b>Body:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.postExample ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postExample, "postExample")
            }
          >
            {copied.postExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postExample}</code>
          </pre>
        </div>
        <b>Expected Response:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.postResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postResponse, "postResponse")
            }
          >
            {copied.postResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔎 Testing Redirect
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            <b>Method:</b> GET
          </li>
          <li>
            <b>URL:</b>{" "}
            <span className="blue-inline-code">
              http://localhost:8080/abc123
            </span>
          </li>
        </ul>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Postman will display a{" "}
          <span className="blue-inline-code">302 Found</span> status with a{" "}
          <span className="blue-inline-code">Location</span> header pointing to
          the original URL. This confirms your redirect is working.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 Authentication Testing
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>First, call the login API to get a JWT token.</li>
          <li>Copy the token.</li>
          <li>
            In Postman, add a header:{" "}
            <span className="blue-inline-code">
              Authorization: Bearer &lt;token&gt;
            </span>
          </li>
          <li>Test protected endpoints by including this header.</li>
        </ul>
        <div style={{ margin: "0.7rem 0" }}>
          Example login request body:
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.loginBody ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.loginBody, "loginBody")}
            >
              {copied.loginBody ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.loginBody}</code>
            </pre>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📁 Collections & Environments
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            <b>Collections:</b> Organize related API requests into groups for
            easy access and sharing.
          </li>
          <li>
            <b>Environments:</b> Manage variables like base URLs and tokens,
            allowing quick switching between local, dev, staging, or production
            setups.
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Automated Testing in Postman
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            Postman lets you write JavaScript tests that run after each request
            to verify:
          </li>
          <ul>
            <li>Status codes</li>
            <li>Response body structure and values</li>
            <li>Response times</li>
          </ul>
        </ul>
        <div style={{ margin: "0.7rem 0" }}>
          Example test script:
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.testScript ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(codeBlocks.testScript, "testScript")
              }
            >
              {copied.testScript ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.testScript}</code>
            </pre>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why Postman is Essential
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>Accelerates API development and debugging.</li>
          <li>Eliminates the need for a frontend for initial testing.</li>
          <li>Improves collaboration via sharable collections.</li>
          <li>Enables automated testing and integration in CI/CD pipelines.</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Session: Mastering Postman for API Testing
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {item.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{item.a}</div>}
          </div>
        ))}
      </div>

      <div
        className="yellow-callout"
        style={{ marginTop: "1.5rem", fontSize: "1.08em" }}
      >
        <b>Resource:</b>{" "}
        <a
          href="https://zesty-sawine-c372eb.netlify.app/#authentication"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://zesty-sawine-c372eb.netlify.app/#authentication
        </a>
      </div>
    </div>
  );
};

export default Topic2Subtopic11Content;
 
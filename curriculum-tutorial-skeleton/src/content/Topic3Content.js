import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  postBody: `{
  "originalUrl": "https://example.com",
  "expiresAt": "2025-12-31T23:59:59"
}`,
  putBody: `{
  "originalUrl": "https://updated-url.com",
  "expiresAt": "2026-01-01T00:00:00"
}`,
};

const learningOutcomes = [
  "Build APIs using POST, PUT, and DELETE HTTP methods",
  "Accept input using Request DTOs",
  "Update existing records using path variables",
  "Add basic validation to input data",
  "Handle cases like missing or invalid URLs using custom error handling",
  "Understand status codes like 201, 204, and 404",
];

const bestPractices = [
  "Validate all input fields using annotations like @NotBlank or @Future",
  "Handle errors using custom exceptions and a global error handler",
  "Return meaningful status codes (201 Created, 204 No Content, 404 Not Found)",
  "Log changes for debugging and auditing",
  "Use consistent and predictable endpoints (/api/urls/{id})",
];

const discussionPrompts = [
  {
    q: "Why do we use POST, PUT, and DELETE methods instead of just GET?",
    a: (
      <>
        <b>GET</b> is meant only for reading data — it should never change
        anything.
        <br />
        <b>POST</b> creates new data, <b>PUT</b> updates it, and <b>DELETE</b>{" "}
        removes it.
        <br />
        This aligns with REST standards and helps tools like Swagger or Postman
        work better.
      </>
    ),
  },
  {
    q: "Why not return the entity directly in the response?",
    a: (
      <>
        Entities may contain sensitive fields like internal IDs or timestamps.
        <br />
        Using a <b>Response DTO</b> gives you control over the shape and safety
        of your API response.
        <br />
        You can hide, rename, or transform fields easily.
      </>
    ),
  },
  {
    q: "What happens if I try to update or delete a non-existent URL?",
    a: (
      <>
        Ideally, your service should throw a{" "}
        <span className="blue-inline-code">UrlNotFoundException</span>.<br />
        Spring will then return a{" "}
        <span className="blue-inline-code">404 Not Found</span> status.
        <br />
        This provides clarity to the client and avoids silent failures.
      </>
    ),
  },
];

const Topic3Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 3. Create, Update, and Delete API</h2>
      <hr />
      <div className="yellow-callout">
        Now that your backend can list URLs, let’s move a step further and allow
        users to <b>create, update, and delete</b> URLs from the system. This is
        where the API becomes dynamic and <b>interactive</b> — users send data,
        and the system responds by <b>modifying the database</b>.<br />
        <br />
        You’ll implement the core of any RESTful system: the <b>CRUD</b>{" "}
        operations (Create, Read, Update, Delete), using Spring Boot’s layered
        architecture.
        <br />
        <br />
        <i>
          In real-world apps, these operations drive features like form
          submissions, admin panels, and data management systems.
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        {learningOutcomes.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Key Concepts</h3>
      <div className="blue-card-section">
        <h4>🔁 RESTful Mutation Operations</h4>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Purpose</th>
              <th>Example URL</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>POST</td>
              <td>Create new resource</td>
              <td>/api/urls</td>
              <td>Add a new shortened URL</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>Update resource</td>
              <td>/api/urls/1</td>
              <td>Modify an existing short URL</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>Remove resource</td>
              <td>/api/urls/1</td>
              <td>Delete a URL from the system</td>
            </tr>
          </tbody>
        </table>
        <h4>🧾 Request DTO (Data Transfer Object)</h4>
        <div className="yellow-callout">
          A <b>Request DTO</b> is a simplified Java class used to receive input
          data from users. You should avoid using entities directly in APIs for
          security and design reasons.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧩 The API Flow</h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            The user sends a <b>JSON payload</b> to your REST endpoint.
          </li>
          <li>
            Spring Boot automatically maps it to a <b>DTO</b>.
          </li>
          <li>
            The <b>Controller</b> sends it to the <b>Service Layer</b>.
          </li>
          <li>
            The Service Layer performs validation and calls the{" "}
            <b>Repository</b> to interact with the database.
          </li>
          <li>
            A proper <b>Response</b> or <b>Status Code</b> is returned.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself (Postman Examples)
      </h3>
      <div className="blue-card-section try-tasks">
        <b>✅ Create a New URL</b>
        <ul>
          <li>
            <b>Method:</b> POST
          </li>
          <li>
            <b>Endpoint:</b>{" "}
            <span className="blue-inline-code">
              http://localhost:8080/api/urls
            </span>
          </li>
          <li>
            <b>Body:</b>
          </li>
        </ul>
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
        <b>✏️ Update an Existing URL</b>
        <ul>
          <li>
            <b>Method:</b> PUT
          </li>
          <li>
            <b>Endpoint:</b>{" "}
            <span className="blue-inline-code">
              http://localhost:8080/api/urls/1
            </span>
          </li>
          <li>
            <b>Body:</b>
          </li>
        </ul>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.putBody ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.putBody, "putBody")}
          >
            {copied.putBody ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.putBody}</code>
          </pre>
        </div>
        <b>❌ Delete a URL</b>
        <ul>
          <li>
            <b>Method:</b> DELETE
          </li>
          <li>
            <b>Endpoint:</b>{" "}
            <span className="blue-inline-code">
              http://localhost:8080/api/urls/1
            </span>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points (With Answers)
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <div className="blue-card-section">
        <ul>
          {bestPractices.map((item, i) => (
            <li key={i}>✅ {item}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Bonus Tip: Automate ID Generation
      </h3>
      <div className="yellow-callout">
        Your <span className="blue-inline-code">Url</span> entity likely uses{" "}
        <span className="blue-inline-code">@GeneratedValue</span>, so you{" "}
        <b>
          don’t need to send <span className="blue-inline-code">id</span>{" "}
          manually
        </b>{" "}
        when creating a URL. Spring Boot handles it!
      </div>
    </div>
  );
};

export default Topic3Content;

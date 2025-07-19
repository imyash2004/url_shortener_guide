import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  pageResponseClass: `public class PageResponse<T> {
    private List<T> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean lastPage;

    // Getters, setters, constructor(s)
}`,
  controllerExample: `@GetMapping("/urls")
public PageResponse<UrlDTO> getPaginatedUrls(Pageable pageable) {
    Page<UrlDTO> page = urlService.getAllUrls(pageable);

    return new PageResponse<>(
        page.getContent(),
        page.getNumber(),
        page.getSize(),
        page.getTotalElements(),
        page.getTotalPages(),
        page.isLast()
    );
}`,
  jsonResponse: `{
  "content": [
    { "id": 1, "shortUrl": "abc123", "originalUrl": "https://example.com" },
    ...
  ],
  "pageNumber": 0,
  "pageSize": 5,
  "totalElements": 23,
  "totalPages": 5,
  "lastPage": false
}`,
};

const bestPractices = [
  [
    "✅ Always wrap paginated data in a DTO",
    "Ensures control over what’s exposed and keeps responses frontend-friendly",
  ],
  [
    "✅ Include basic metadata like totalPages",
    "Helps with pagination logic on the frontend",
  ],
  [
    "✅ Keep DTOs generic with <T>",
    "So they can be reused across multiple APIs",
  ],
  [
    "✅ Avoid overcomplicating your response",
    "Stick to useful and relevant pagination info",
  ],
];

const discussionPrompts = [
  {
    q: "Can’t we just return the Page<T> directly?",
    a: (
      <>
        You can, but it’s messy and tightly coupled to Spring’s internal format.
        A DTO gives you full control over the response format.
      </>
    ),
  },
  {
    q: "Why include metadata like totalPages or lastPage?",
    a: (
      <>
        It helps the frontend show “Next” or “Previous” buttons and know when to
        stop fetching.
      </>
    ),
  },
  {
    q: "Can I add custom fields in the DTO like timestamp or statusCode?",
    a: <>Absolutely! You can shape it however your API contract requires.</>,
  },
];

const tryItTasks = [
  "Create a new PageResponse<T> class in your project",
  "Wrap a paginated list of products, users, or orders using this DTO",
  "Add a custom field like requestedAt timestamp for debugging",
  "Test it in Postman or Swagger — is the response clean?",
];

const Topic4Subtopic3Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 4.4 – Page Response DTOs</h2>
      <hr />
      <div className="yellow-callout">
        When using <span className="blue-inline-code">Page&lt;T&gt;</span>,
        Spring automatically includes pagination metadata. But directly
        returning it might expose unwanted internal details or make the frontend
        harder to work with.
        <br />
        <br />A <b>Page Response DTO</b> (Data Transfer Object) helps you{" "}
        <b>customize and clean</b> the response by extracting only the useful
        parts: data, current page, total pages, total elements, etc.
        <br />
        <br />
        This way, your API becomes <b>frontend-friendly</b>, secure, and
        predictable.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Build a custom Page Response DTO class</li>
        <li>✅ Wrap your paginated data in a clean structure</li>
        <li>✅ Make frontend devs love your API ❤️</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤹 <b>Funny Example: The “Pizza Delivery Guy” Analogy 🍕</b>
      </h3>
      <div className="blue-card-section">
        Imagine you're ordering pizza online:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            You don’t want the <b>entire kitchen status</b> or{" "}
            <b>pizza oven logs</b>
          </li>
          <li>
            You just want your <b>pizza</b>, the <b>order number</b>,{" "}
            <b>total items</b>, and <b>ETA</b>
          </li>
        </ul>
        That’s what a Page Response DTO does. It delivers{" "}
        <b>just the delicious data</b> (the list) along with useful info (like
        how many pizzas are still on the way).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 What Does a Page Response DTO Look Like?
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.pageResponseClass ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.pageResponseClass, "pageResponseClass")
          }
        >
          {copied.pageResponseClass ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.pageResponseClass}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧑‍🍳 How to Use It in a Controller
      </h3>
      <div className="blue-card-section">
        Instead of directly returning{" "}
        <span className="blue-inline-code">Page&lt;T&gt;</span>, extract and map
        it:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.controllerExample ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(codeBlocks.controllerExample, "controllerExample")
            }
          >
            {copied.controllerExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.controllerExample}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          👨‍💻 Now your API response will be clean, like:
          <div
            className="topic-codeblock code-with-copy"
            style={{ marginTop: 8 }}
          >
            <button
              className={`copy-button ${copied.jsonResponse ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(codeBlocks.jsonResponse, "jsonResponse")
              }
            >
              {copied.jsonResponse ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.jsonResponse}</code>
            </pre>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {faq.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{faq.a}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([practice, why], idx) => (
            <tr key={idx}>
              <td>{practice}</td>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic4Subtopic3Content;

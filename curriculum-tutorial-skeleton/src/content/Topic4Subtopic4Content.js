import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controllerCode: `@RestController
@RequestMapping("/api/urls")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @GetMapping
    public PageResponse<UrlDTO> getAllUrls(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<UrlDTO> pageResult = urlService.getAllUrls(pageable);

        return new PageResponse<>(
                pageResult.getContent(),
                pageResult.getNumber(),
                pageResult.getSize(),
                pageResult.getTotalElements(),
                pageResult.getTotalPages(),
                pageResult.isLast()
        );
    }
}`,
};

const bestPractices = [
  [
    "✅ Always validate page and size values",
    "Prevent users from requesting 1000 items at once",
  ],
  [
    "✅ Provide sensible defaults",
    "Ensures API works without needing query parameters",
  ],
  ["✅ Keep sorting optional", "Makes API flexible for multiple use cases"],
  [
    "✅ Use PageResponse<T> for consistent responses",
    "Makes integration with frontend smoother",
  ],
  [
    "✅ Document available sorting fields and default behavior",
    "Helps API consumers understand how to use it efficiently",
  ],
];

const discussionPrompts = [
  {
    q: "What’s Pageable?",
    a: (
      <>
        It’s a Spring interface that automatically captures <b>page</b>,{" "}
        <b>size</b>, and <b>sort</b> parameters from your request.
      </>
    ),
  },
  {
    q: "What does PageRequest.of() do?",
    a: (
      <>
        It creates a <b>Pageable</b> object with your desired page number, page
        size, and sorting logic.
      </>
    ),
  },
  {
    q: "Why use a PageResponse<T>?",
    a: (
      <>
        To return only the relevant data + pagination metadata in a clean
        format, not internal Spring structures.
      </>
    ),
  },
];

const tryItTasks = [
  "Expose a GET endpoint for /api/products or /api/users with pagination",
  "Change the default page size to 10 and sort by a different field",
  "Return a PageResponse<T> DTO like we did above",
  "Open Swagger/Postman and test your API using ?page=1&size=10&sortBy=name",
];

const Topic4Subtopic4Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>
        ✅ 4.5 – Controller Pagination Implementation
      </h2>
      <hr />
      <div className="yellow-callout">
        The controller is the <b>entry point</b> to your API. When dealing with
        large datasets (like user logs, shortened URLs, or product listings),
        returning everything in one shot is inefficient and overwhelming.
        <br />
        <br />
        Pagination lets us <b>fetch data in chunks</b>, improving performance
        and making responses manageable. The controller handles this by
        accepting pagination inputs (
        <span className="blue-inline-code">page</span>,{" "}
        <span className="blue-inline-code">size</span>, etc.) and returning a
        clean, paginated response.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Add pagination parameters to your controller endpoints</li>
        <li>
          ✅ Accept and parse Spring’s{" "}
          <span className="blue-inline-code">Pageable</span> object
          automatically
        </li>
        <li>
          ✅ Return a custom{" "}
          <span className="blue-inline-code">PageResponse&lt;T&gt;</span> DTO
          with the paginated data
        </li>
        <li>✅ Improve frontend communication with precise metadata</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎢 Real-Life Example: The Elevator Analogy 🚪
      </h3>
      <div className="blue-card-section">
        Imagine your office building has 100 floors. Would you want an elevator
        that <i>stops at every single floor at once</i>? Of course not.
        <br />
        <br />
        Pagination in your controller is like telling the elevator:
        <br />
        <b>
          “Hey, just take me to floor 20–30 right now, not the whole building!”
        </b>
        <br />
        <br />
        That’s exactly what we’re doing—delivering{" "}
        <b>just a slice of the total data</b> to the user or frontend.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Controller Code – URL Shortener Pagination
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.controllerCode ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.controllerCode, "controllerCode")
          }
        >
          {copied.controllerCode ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.controllerCode}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Discussion Points
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

export default Topic4Subtopic4Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  entity: `@Entity
public class ShortUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalUrl;
    private String shortCode;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    // getters and setters
}`,
  repo: `List<ShortUrl> findAllByOrganization_ShortName(String shortName);`,
  service: `public List<ShortUrlResponseDTO> getUrlsByOrganization(String shortName) {
    List<ShortUrl> urls = shortUrlRepository.findAllByOrganization_ShortName(shortName);
    return urls.stream().map(this::toResponseDTO).collect(Collectors.toList());
}`,
  controller: `@GetMapping("/organizations/{shortName}/urls")
public ResponseEntity<List<ShortUrlResponseDTO>> getUrlsByOrganization(
        @PathVariable String shortName) {
    return ResponseEntity.ok(shortUrlService.getUrlsByOrganization(shortName));
}`,
  pageableRepo: `Page<ShortUrl> findAllByOrganization_ShortName(String shortName, Pageable pageable);`,
  customRepo: `Optional<ShortUrl> findByShortCodeAndOrganization_ShortName(String shortCode, String shortName);`,
  sampleResponse: `[
  {
    "id": 101,
    "originalUrl": "https://www.zomato.com/offers/20off",
    "shortCode": "20off"
  },
  {
    "id": 102,
    "originalUrl": "https://www.zomato.com/menu/biryani",
    "shortCode": "zomabiryani"
  }
]`,
};

const discussionPrompts = [
  {
    q: "Why do we use organization.shortName in the filter?",
    a: (
      <>
        shortName is <b>unique</b>, human-readable, and used in URLs like a slug
        (e.g., <span className="blue-inline-code">zomato</span>). Using ID would
        make URLs unreadable.
      </>
    ),
  },
  {
    q: "What if I need paginated results?",
    a: (
      <>
        Use <span className="blue-inline-code">Pageable</span>:<br />
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button className="copy-button">Copy</button>
          <pre>
            <code>{`Page<ShortUrl> findAllByOrganization_ShortName(String shortName, Pageable pageable);`}</code>
          </pre>
        </div>
        Then return a paginated response in your controller.
      </>
    ),
  },
  {
    q: "Can we combine filtering by both org and shortCode?",
    a: (
      <>
        Yes! Add custom methods like:
        <br />
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button className="copy-button">Copy</button>
          <pre>
            <code>{`Optional<ShortUrl> findByShortCodeAndOrganization_ShortName(String shortCode, String shortName);`}</code>
          </pre>
        </div>
      </>
    ),
  },
];

const tryItTasks = [
  "Add pagination support to this endpoint",
  "Add optional search filter (?search=biryani)",
  "Return 404 if no such organization exists (add validation)",
  "Modify Swagger to show this endpoint under 'Organization URLs'",
];

const Topic5Subtopic7Content = () => {
  const [copied, setCopied] = useState({});
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(codeBlocks[codeId]);
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
        🎯 5.8 – URL Filtering by Organization
      </h2>
      <hr />
      <div className="yellow-callout">
        <i>
          “In a multi-organization environment, isolating and retrieving data
          per organization is essential for security, clarity, and branding.”
        </i>
        <br />
        <br />
        In our URL shortener system, each shortened URL can now belong to a
        specific <b>organization</b> (like{" "}
        <span className="blue-inline-code">zomato</span>,{" "}
        <span className="blue-inline-code">amazon</span>,{" "}
        <span className="blue-inline-code">flipkart</span>). In this section,
        we’ll implement the logic to <b>filter</b> URLs by an organization’s{" "}
        <span className="blue-inline-code">shortName</span>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Filter URLs by Organization?
      </h3>
      <div className="blue-card-section">
        Think of each organization as a <b>tenant</b>. Each should:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>View only their own shortened URLs</li>
          <li>Filter URLs for analytics</li>
          <li>Manage their namespace</li>
        </ul>
        <div style={{ marginTop: "0.7rem" }}>
          <i>
            🔗 https://short.ly/zomato/20off belongs to Zomato. So Zomato should
            be able to view only their URLs, not Amazon’s.
          </i>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Backend Setup
      </h3>
      <div className="blue-card-section">
        We’ll modify the <span className="blue-inline-code">URL</span> entity to
        have an <span className="blue-inline-code">organization</span> field (if
        not already present) and create an endpoint to fetch{" "}
        <b>only URLs that belong to a given organization</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Step 1 – Modify ShortUrl Entity
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.entity ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.entity, "entity")}
        >
          {copied.entity ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.entity}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Step 2 – Repository Method
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.repo ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.repo, "repo")}
        >
          {copied.repo ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.repo}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Step 3 – Service Layer
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.service ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.service, "service")}
        >
          {copied.service ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.service}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Step 4 – Controller Layer
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.controller ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.controller, "controller")}
        >
          {copied.controller ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.controller}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Sample Response
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.sampleResponse ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.sampleResponse, "sampleResponse")
          }
        >
          {copied.sampleResponse ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.sampleResponse}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 Bonus (Optional): Secure This Route
      </h3>
      <div className="yellow-callout">
        Later in the authentication section, we’ll ensure that only:
        <br />
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            The logged-in user <b>belonging to that org</b> or
          </li>
          <li>
            An <b>admin</b>
          </li>
        </ul>
        …can access that route. For now, it’s public.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
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
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔚 Summary</h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Organizations can now see <b>only their own</b> shortened URLs.
          </li>
          <li>
            You added a clean, RESTful endpoint{" "}
            <span className="blue-inline-code">
              /organizations/&#123;shortName&#125;/urls
            </span>
          </li>
          <li>
            This setup makes your app <b>multi-tenant ready</b> 🔒
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topic5Subtopic7Content;

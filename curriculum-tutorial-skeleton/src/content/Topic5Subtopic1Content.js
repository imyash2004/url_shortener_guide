import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  urlEntity: `@Entity
@Table(name = "urls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalUrl;
    private String shortUrl;
    private LocalDateTime createdAt;

    // Relationship to Organization
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id")
    private Organization organization;
}`,
  relationField: `@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "organization_id")
private Organization organization;`,
  sqlUpdate: `UPDATE urls SET organization_id = 1 WHERE id = 5;`,
  postExample: `POST /api/shorten
{
  "originalUrl": "https://zomato.com/biryani",
  "organizationShortName": "zomato"
}`,
};

const bestPractices = [
  [
    "Use FetchType.LAZY for @ManyToOne",
    "Loads organization data only when needed",
  ],
  ["Ensure non-null organization in Url", "Prevents unlinked, orphan URLs"],
  ["Use JoinColumn", "Explicitly defines the foreign key in the DB table"],
];

const tryItTasks = [
  "Update an existing URL in your DB to assign it to an organization.",
  "Try fetching a URL and check if it knows its owning organization.",
];

const discussionPrompts = [
  {
    q: "Why should each shortened URL be associated with an organization?",
    a: (
      <>
        To ensure data isolation, branding, and correct analytics for each
        organization. It also enables filtering and access control.
      </>
    ),
  },
  {
    q: "What could go wrong if the organization is not assigned properly?",
    a: (
      <>
        URLs may become orphaned, analytics may be mixed up, and users may see
        or modify links they shouldn't have access to.
      </>
    ),
  },
  {
    q: "What’s the impact of FetchType.LAZY vs. FetchType.EAGER in this context?",
    a: (
      <>
        LAZY loads organization data only when accessed, improving performance.
        EAGER loads it every time, which can be wasteful if not always needed.
      </>
    ),
  },
  {
    q: "If a company rebrands, how should the shortName change be handled in existing URLs?",
    a: (
      <>
        You should update the shortName in the organization and consider
        updating all related short URLs, or provide redirects from old to new
        branded paths.
      </>
    ),
  },
];

const Topic5Subtopic1Content = () => {
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
        ✅ 5.2 – URL-Organization Relationship
      </h2>
      <hr />
      <div className="yellow-callout">
        In this step, we’ll establish a{" "}
        <b>
          relationship between <span className="blue-inline-code">Url</span> and{" "}
          <span className="blue-inline-code">Organization</span> entities
        </b>
        , so every shortened URL is linked to an organization.
        <br />
        <br />
        This enables:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Organization-specific filtering</li>
          <li>Branded link creation</li>
          <li>Scoping analytics & access</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why It’s Important
      </h3>
      <div className="blue-card-section">
        Right now, all URLs exist independently. But in the real world:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Flipkart’s links should be separated from Amazon’s</li>
          <li>A user from VIT should not see Netflix’s URLs</li>
          <li>
            Analytics and dashboards must show <b>organization-specific</b> data
          </li>
        </ul>
        This is possible only when we{" "}
        <b>associate each URL with its owning organization</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔗 Real-World Analogy
      </h3>
      <div className="blue-card-section">
        Imagine a URL shortening service like a parking garage.
        <br />
        Each floor is an organization (Zomato, VIT, Netflix), and each parked
        car is a shortened URL.
        <br />
        Without assigning cars to their floors, the whole garage becomes
        chaotic!
        <br />
        We need a structured way to <b>group and organize</b> URLs — that's what
        this relationship does.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🏗️ What Type of Relationship?
      </h3>
      <div className="blue-card-section">
        We’ll use a <b>Many-to-One</b> relationship:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Each <span className="blue-inline-code">Url</span> belongs to{" "}
            <b>one Organization</b>
          </li>
          <li>
            An <span className="blue-inline-code">Organization</span> can have{" "}
            <b>many URLs</b>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧑‍💻 Code: Update Url Entity
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.relationField ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.relationField, "relationField")
          }
        >
          {copied.relationField ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.relationField}</code>
        </pre>
      </div>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.urlEntity ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.urlEntity, "urlEntity")}
        >
          {copied.urlEntity ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.urlEntity}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>💡 Example Flow</h3>
      <div className="blue-card-section">
        Let’s say Zomato shortens a link:
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
        Internally:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            First, fetch the{" "}
            <span className="blue-inline-code">Organization</span> by{" "}
            <span className="blue-inline-code">shortName</span>
          </li>
          <li>
            Then associate that{" "}
            <span className="blue-inline-code">Organization</span> with the new{" "}
            <span className="blue-inline-code">Url</span>
          </li>
        </ul>
        <div className="blue-card-section" style={{ marginTop: "0.7rem" }}>
          <b>So in DB:</b>
          <table className="custom-table" style={{ marginTop: 8 }}>
            <thead>
              <tr>
                <th>Url ID</th>
                <th>Short URL</th>
                <th>Organization</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>short.ly/zomato/abc</td>
                <td>zomato</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Best Practices
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Complete Picture: Database View
      </h3>
      <div className="blue-card-section">
        While we’re avoiding visual tables, imagine:
        <br />
        Each row in the <span className="blue-inline-code">urls</span> table
        references a row in the{" "}
        <span className="blue-inline-code">organizations</span> table via{" "}
        <span className="blue-inline-code">organization_id</span>.<br />
        This forms a <b>foreign key link</b> that relational DBs are built upon.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Hands-On Prompt
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Update an existing URL in your DB to assign it to an organization:
          </li>
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.sqlUpdate ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.sqlUpdate, "sqlUpdate")}
            >
              {copied.sqlUpdate ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.sqlUpdate}</code>
            </pre>
          </div>
          <li>Now, when you fetch that URL, it knows who “owns” it.</li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Zone
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
    </div>
  );
};

export default Topic5Subtopic1Content;

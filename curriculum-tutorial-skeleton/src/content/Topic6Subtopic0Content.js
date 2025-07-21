import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  base62Example: `long id = 12345;
String shortCode = Base62Encoder.encode(id); // outputs: "dnh"`,
  hashExample: `String hash = DigestUtils.md5DigestAsHex(originalUrl.getBytes());
String shortCode = hash.substring(0, 6); // Use first 6 chars`,
  hybridExample: `if (customCode != null && !customCode.isEmpty()) {
    // Validate & check if already exists
    use(customCode);
} else {
    // Auto-generate using Base62 or hashing
    use(generateBase62FromId(id));
}`,
  base62Class: `public class Base62Encoder {
    private static final String CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public static String encode(long id) {
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(CHARACTERS.charAt((int)(id % 62)));
            id /= 62;
        }
        return sb.reverse().toString();
    }
}`,
  serviceUsage: `public String generateShortCode(Long id) {
    return Base62Encoder.encode(id); // outputs something like "b3K"
}`,
};

const summaryTable = [
  ["Short Code", "Unique identifier for the long URL"],
  ["Base62 Encoding", "Converts numeric ID to short alphanumeric string"],
  ["Hashing", "Deterministic way to convert string to fixed-length code"],
  ["Custom Short Codes", "User-defined branded links"],
  ["Collision Handling", "Check DB before saving to avoid duplicates"],
];

const discussionPrompts = [
  {
    q: "Why is Base62 preferred over Base16 or Base10 in short URLs?",
    a: (
      <>
        Base62 uses more characters (a-z, A-Z, 0-9), so you get shorter codes
        for the same number. This makes links more compact and user-friendly.
      </>
    ),
  },
  {
    q: "What problems can arise with hashing-based short codes?",
    a: (
      <>
        Hashing can cause collisions (two different URLs producing the same
        code), and hashes are not easily reversible. Also, truncating hashes
        increases collision risk.
      </>
    ),
  },
  {
    q: "How can you ensure uniqueness when users create custom short codes?",
    a: (
      <>
        Always check the database for existing codes for that organization
        before saving. If it exists, prompt the user to choose another or append
        a random digit.
      </>
    ),
  },
];

const tryItTasks = [
  "Build your own ShortCodeGenerator utility class that:",
  <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
    <li>Accepts a long number (ID)</li>
    <li>Converts it to a 6-character Base62 string</li>
    <li>Handles collisions by appending a random digit if needed</li>
  </ul>,
];

const Topic6Subtopic0Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🌟 6.1 – Short Code Generation Logic</h2>
      <hr />
      <div className="yellow-callout">
        <b>What Is a Short Code?</b>
        <br />A <b>short code</b> is the small, unique part of a shortened URL.
        For example, in:
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>https://short.ly/zomato/20off</code>
          </pre>
        </div>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>zomato</b> is the <b>organization’s short name</b>
          </li>
          <li>
            <b>20off</b> is the <b>short code</b>
          </li>
        </ul>
        <i>
          The short code is what maps to the <b>long/original URL</b> in the
          backend database.
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Why Is It Important?
      </h3>
      <ul className="topic-checklist">
        <li>
          ✅ Must be <b>unique</b> for each organization
        </li>
        <li>
          ✅ Should be <b>short</b> and <b>readable</b>
        </li>
        <li>
          ✅ Cannot <b>collide</b> with others
        </li>
        <li>
          ✅ Should be <b>URL-safe</b> (alphanumeric, no special chars)
        </li>
        <li>
          ✅ Should be <b>consistent</b> (for custom or branded links)
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧰 Different Approaches to Generate Short Codes
      </h3>
      <div className="blue-card-section">
        <b>1. Auto-Incremented ID + Base62 Encoding</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.base62Example ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.base62Example, "base62Example")
            }
          >
            {copied.base62Example ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.base62Example}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          <b>Characters used in Base62:</b>{" "}
          <span className="blue-inline-code">a-z, A-Z, 0-9</span> (total 62
          characters)
        </div>
      </div>
      <div className="blue-card-section">
        <b>2. Hashing the Original URL</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.hashExample ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.hashExample, "hashExample")
            }
          >
            {copied.hashExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.hashExample}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>3. Custom/Branded Short Code</b>
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>/zomato/biryani50</code>
          </pre>
        </div>
        <i>
          Stored directly in DB as{" "}
          <span className="blue-inline-code">shortCode</span>.
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Recommended Hybrid Strategy
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.hybridExample ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.hybridExample, "hybridExample")
          }
        >
          {copied.hybridExample ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.hybridExample}</code>
        </pre>
      </div>
      <div className="blue-card-section" style={{ marginTop: "0.7rem" }}>
        This gives flexibility for both programmatic code generation and branded
        short URLs.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💻 Code Example – Base62 Generator
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.base62Class ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.base62Class, "base62Class")}
        >
          {copied.base62Class ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.base62Class}</code>
        </pre>
      </div>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.serviceUsage ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.serviceUsage, "serviceUsage")
          }
        >
          {copied.serviceUsage ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.serviceUsage}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚫 Collision Prevention
      </h3>
      <div className="yellow-callout">
        No matter which method you use:
        <br />
        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Always check in the DB whether the short code already exists for
            that organization
          </li>
          <li>
            If so, <b>regenerate</b> or prompt user to choose a different one
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📁 Example Entry in DB
      </h3>
      <div className="blue-card-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>org_shortname</th>
              <th>short_code</th>
              <th>original_url</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>zomato</td>
              <td>20off</td>
              <td>
                <a
                  href="https://zomato.com/discount-20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://zomato.com/discount-20
                </a>
              </td>
            </tr>
            <tr>
              <td>amazon</td>
              <td>prime99</td>
              <td>
                <a
                  href="https://amazon.com/offer/prime"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://amazon.com/offer/prime
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Time
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
        🎯 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧾 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([concept, desc], idx) => (
            <tr key={idx}>
              <td>{concept}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic6Subtopic0Content;

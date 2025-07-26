import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  dto: `public class CreateUrlRequest {

    @NotBlank
    private String originalUrl;

    private String customCode; // Optional 🆕

    private LocalDateTime expiryDate;
}`,
  entity: `@Entity
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String originalUrl;

    @Column(nullable = false, unique = true)
    private String shortCode;

    private String organizationShortName;

    private LocalDateTime expiryDate;

    private LocalDateTime createdAt;
}`,
  serviceLogic: `public Url createShortUrl(CreateUrlRequest request) {
    Url url = new Url();
    url.setOriginalUrl(request.getOriginalUrl());
    url.setOrganizationShortName(getCurrentOrg());

    // Use custom short code if provided
    if (request.getCustomCode() != null && !request.getCustomCode().isEmpty()) {
        if (urlRepository.existsByShortCode(request.getCustomCode())) {
            throw new RuntimeException("Custom code already in use!");
        }
        url.setShortCode(request.getCustomCode());
    } else {
        url.setShortCode(generateRandomCode()); // fallback
    }

    // Expiry logic
    url.setExpiryDate(request.getExpiryDate() != null
        ? request.getExpiryDate()
        : LocalDateTime.now().plusDays(30));

    url.setCreatedAt(LocalDateTime.now());
    return urlRepository.save(url);
}`,
  errorResponse: `409 Conflict
{
  "error": "Custom code already in use"
}`,
};

const summaryTable = [
  ["customCode", "Allows user-defined short code"],
  ["Unique constraint", "Ensures no duplicates exist"],
  ["409 Conflict", "Response for already-used custom code"],
  ["Code fallback", "Automatically generates a code if blank"],
];

const discussionQA = [
  {
    question: "Why do brands prefer custom short codes?",
    answer: "It improves readability, brand recall, and trust.",
  },
  {
    question: "What status should be returned for duplicate codes?",
    answer: "409 Conflict.",
  },
  {
    question: "What's the fallback if user doesn't provide a code?",
    answer: "Generate a random 5–8 character code (e.g., Base62).",
  },
  {
    question: "Where should uniqueness be enforced?",
    answer:
      "In both database (unique constraint) and service layer (manual check).",
  },
];

const tryItTasks = [
  "Add customCode to your DTOs",
  "Let users send a preferred code",
  "Check for duplicates",
  "Fall back to auto-generation if null",
  "Return a friendly 409 error if duplicate",
];

const bonusTasks = [
  "Implement validation like ^[a-zA-Z0-9_-]{4,30}$ to restrict custom codes.",
];

const brandedBenefits = [
  "Easy to read and remember",
  "Great for marketing (flyers, social posts, ads)",
  "Improve trust and click-through rates",
  "SEO-friendly (when using 301 redirects)",
];

const Topic10Subtopic1Content = () => {
  const [copied, setCopied] = useState({});
  const [openIdx, setOpenIdx] = useState(null);

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

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✨ 10.2 – Custom Short Codes</h2>
      <hr />
      <div className="yellow-callout">
        <b>In this section, we'll enable users to:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>Provide a custom short code</b> during URL creation
          </li>
          <li>
            Fall back to <b>auto-generated code</b> if not provided
          </li>
          <li>
            Handle <b>duplicate conflicts gracefully</b>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Custom Short Codes?
      </h3>
      <div className="blue-card-section">
        <b>Branded links are:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {brandedBenefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Modify the Create URL Request DTO
      </h3>
      <div className="blue-card-section">
        <b>
          Update your request DTO to accept a{" "}
          <span className="blue-inline-code">customCode</span> field:
        </b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.dto ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.dto, "dto")}
          >
            {copied.dto ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.dto}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Update the URL Entity
      </h3>
      <div className="blue-card-section">
        <b>
          Ensure your <span className="blue-inline-code">shortCode</span> field
          is unique:
        </b>
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
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Implement Logic in Service Layer
      </h3>
      <div className="blue-card-section">
        <b>
          Handle both <b>custom</b> and <b>generated</b> short codes in your
          service:
        </b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.serviceLogic ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.serviceLogic, "serviceLogic")
            }
          >
            {copied.serviceLogic ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.serviceLogic}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛑 Handle Duplicates
      </h3>
      <div className="blue-card-section">
        <b>
          If <span className="blue-inline-code">customCode</span> is already
          taken, respond with:
        </b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.errorResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.errorResponse, "errorResponse")
            }
          >
            {copied.errorResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.errorResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎨 Customize Your Frontend (if any)
      </h3>
      <div className="blue-card-section">
        <b>Allow the user to:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Enter a preferred short code (optional)</li>
          <li>
            See a preview of their final short link:{" "}
            <span className="blue-inline-code">short.ly/org/customCode</span>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4 style={{ color: "#1976d2", margin: "0 0 0.5rem 0" }}>
          ❓ Short Answers:
        </h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}>
              Q{idx + 1}: {item.question}
            </div>
            <button
              className="reveal-btn"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`answer-${idx}`}
            >
              {openIdx === idx ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openIdx === idx && (
              <div className="yellow-callout" id={`answer-${idx}`}>
                → {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🚀 Task:</b>
        <ul style={{ margin: "0.5rem 0 1rem 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
        <b>💡 Bonus:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bonusTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, purpose], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{feature}</span>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic10Subtopic1Content;

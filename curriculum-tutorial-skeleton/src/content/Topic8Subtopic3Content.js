import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  enableMethodSecurity: `@EnableMethodSecurity // Enables @PreAuthorize, @Secured, etc.
@Configuration
public class AppConfig {
    // your SecurityFilterChain & beans...
}`,
  preAuthorizeBasic: `@PreAuthorize("hasRole('ADMIN')")
public void deleteOrganization(Long orgId) {
    // only users with role ADMIN can delete
}`,
  preAuthorizeWithParams: `@PreAuthorize("#email == authentication.name")
public void updateProfile(String email) {
    // only the logged-in user can update their own profile
}`,
  secured: `@Secured("ROLE_ADMIN")
public void getAllUsers() {
    // must have ROLE_ADMIN
}`,
  postAuthorize: `@PostAuthorize("returnObject.owner == authentication.name")
public Account getAccount(Long id) {
    // Only return if user owns the account
}`,
  useCases: `@PreAuthorize("hasRole('USER')")
@GetMapping("/user/dashboard")
public ResponseEntity<?> getDashboard() { ... }

@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/admin/delete-user/{id}")
public void deleteUser(@PathVariable Long id) { ... }

@PreAuthorize("#userId == authentication.name")
@PutMapping("/user/update/{userId}")
public void updateUser(@PathVariable String userId) { ... }`,
  task1: `@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/secure")
public String secureAdminData() {
    return "Only admins see this!";
}`,
  task2: `@PreAuthorize("#email == authentication.name")
@PutMapping("/user/update/{email}")
public String updateUser(@PathVariable String email) {
    return "Updated your profile!";
}`,
};

const expressionTable = [
  ["hasRole('ADMIN')", "Must have the role ADMIN"],
  ["authentication.name", "The email (or username) from JWT"],
  [
    "#id == authentication.name",
    "Only if passed ID matches authenticated user",
  ],
  [
    "hasAnyRole('ADMIN','MODERATOR')",
    "User must have at least one of the given roles",
  ],
];

const summaryTable = [
  ["@PreAuthorize", "Checks permission **before** method execution"],
  ["@PostAuthorize", "Checks permission **after** method execution"],
  ["@Secured", "Simpler role check using `ROLE_` prefix"],
  ["authentication", "Object holding authenticated user's identity & roles"],
  ["SpEL Support", "Enables use of method args, logic, etc. in expressions"],
];

const discussionPrompts = [
  {
    q: "What annotation allows access before method call?",
    a: "@PreAuthorize",
  },
  {
    q: "How to access the logged-in user's email/username?",
    a: "authentication.name",
  },
  {
    q: "What's the difference between @PreAuthorize and @Secured?",
    a: "@PreAuthorize is more powerful and flexible; @Secured is simpler.",
  },
  {
    q: "Can you use Spring Expression Language (SpEL) inside annotations?",
    a: "✅ Yes! #paramName, authentication.name, logical ops, etc.",
  },
];

const tryItTasks = [
  {
    title: "Add @PreAuthorize",
    description: "Try calling it with a user who is not an admin.",
    code: codeBlocks.task1,
    expected: "403 Forbidden",
  },
  {
    title: "Secure update based on identity",
    description:
      "Try calling it as someone else's email.\n🟥 Expected: 403\n\n✅ Now try with the logged-in user's email.",
    code: codeBlocks.task2,
    expected: "Success",
  },
];

const Topic8Subtopic3Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🛡️ 8.3 – Method-Level Security</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll explore how to{" "}
        <b>secure individual service or controller methods</b> using annotations
        like <span className="blue-inline-code">@PreAuthorize</span>,{" "}
        <span className="blue-inline-code">@PostAuthorize</span>,{" "}
        <span className="blue-inline-code">@Secured</span>, etc. — giving you{" "}
        <b>fine-grained access control</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Use Method-Level Security?
      </h3>
      <div className="blue-card-section">
        Even if you protect routes via HTTP paths, sometimes:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            You want different roles to access different logic within the same
            service
          </li>
          <li>
            You want to <b>centralize access rules at the method level</b>
          </li>
          <li>
            You want <b>more control</b> inside services or controllers
          </li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          👉 Method-level security helps you <b>declaratively</b> enforce these
          rules.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Step 1: Enable Method Security
      </h3>
      <div className="blue-card-section">
        In your config class:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.enableMethodSecurity ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(
                codeBlocks.enableMethodSecurity,
                "enableMethodSecurity"
              )
            }
          >
            {copied.enableMethodSecurity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.enableMethodSecurity}</code>
          </pre>
        </div>
        That's it. Now annotations will work.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔒 Step 2: Using <span className="blue-inline-code">@PreAuthorize</span>{" "}
        – Most Common!
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.preAuthorizeBasic ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(codeBlocks.preAuthorizeBasic, "preAuthorizeBasic")
            }
          >
            {copied.preAuthorizeBasic ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.preAuthorizeBasic}</code>
          </pre>
        </div>

        <p>
          You can even access <b>method parameters</b>:
        </p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${
              copied.preAuthorizeWithParams ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(
                codeBlocks.preAuthorizeWithParams,
                "preAuthorizeWithParams"
              )
            }
          >
            {copied.preAuthorizeWithParams ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.preAuthorizeWithParams}</code>
          </pre>
        </div>

        <h4 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
          🧠 Expression Breakdown:
        </h4>

        <table className="custom-table">
          <thead>
            <tr>
              <th>Expression</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {expressionTable.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <span className="blue-inline-code">{row[0]}</span>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛑 Using <span className="blue-inline-code">@Secured</span>{" "}
        (Alternative)
      </h3>
      <div className="blue-card-section">
        <p>This is a simpler but older approach. Still valid!</p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.secured ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.secured, "secured")}
          >
            {copied.secured ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.secured}</code>
          </pre>
        </div>

        <p>
          Note: You must write <span className="blue-inline-code">ROLE_</span>{" "}
          prefix with <span className="blue-inline-code">@Secured</span>.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Using <span className="blue-inline-code">@PostAuthorize</span>
      </h3>
      <div className="blue-card-section">
        <p>
          This is evaluated <b>after</b> the method executes. Not used often but
          useful for filtering results.
        </p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.postAuthorize ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postAuthorize, "postAuthorize")
            }
          >
            {copied.postAuthorize ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postAuthorize}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘 Example Use Cases
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.useCases ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.useCases, "useCases")}
          >
            {copied.useCases ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.useCases}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Quick Questions</h4>
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
      <div className="blue-card-section">
        {tryItTasks.map((task, idx) => (
          <div key={idx} style={{ marginBottom: "1.5rem" }}>
            <h4>
              🚀 Task {idx + 1}: {task.title}
            </h4>
            <p>{task.description}</p>
            <div
              className="topic-codeblock code-with-copy"
              style={{ margin: "0.7rem 0" }}
            >
              <button
                className={`copy-button ${
                  copied[`task${idx}`] ? "copied" : ""
                }`}
                onClick={() => copyToClipboard(task.code, `task${idx}`)}
              >
                {copied[`task${idx}`] ? "Copied!" : "Copy"}
              </button>
              <pre>
                <code>{task.code}</code>
              </pre>
            </div>
            <p>
              {task.expected.includes("403") ? (
                <span style={{ color: "#d32f2f" }}>
                  🟥 Expected: {task.expected}
                </span>
              ) : task.expected.includes("Success") ? (
                <span style={{ color: "#388e3c" }}>
                  🟩 Expected: {task.expected}
                </span>
              ) : (
                <span>Expected: {task.expected}</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Annotation</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{row[0]}</span>
              </td>
              <td
                dangerouslySetInnerHTML={{
                  __html: row[1].replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
                }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic8Subtopic3Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  securityConfig: `@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig {
}`,
  adminExample: `@PreAuthorize("@roleChecker.isAdmin(authentication, #orgId)")
public void assignUserToOrganization(Long userId, Long orgId, String role) {
    // logic
}`,
  adminOrSelfExample: `@PreAuthorize("@roleChecker.isAdmin(authentication, #orgId) || authentication.name == #userEmail")
public void updateUserProfile(Long orgId, String userEmail) {
    // logic
}`,
  roleChecker: `@Component
@RequiredArgsConstructor
public class RoleChecker {

    private final UserRepository userRepo;
    private final OrganizationRepository orgRepo;
    private final UserOrganizationRepository userOrgRepo;

    public boolean isAdmin(Authentication auth, Long orgId) {
        String email = auth.getName();
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent()) {
            return userOrgRepo.findByUserIdAndOrganizationId(user.get().getId(), orgId)
                    .map(mapping -> mapping.getRole().equalsIgnoreCase("ADMIN"))
                    .orElse(false);
        }
        return false;
    }

    public boolean hasRole(Authentication auth, Long orgId, String role) {
        String email = auth.getName();
        Optional<User> user = userRepo.findByEmail(email);
        if (user.isPresent()) {
            return userOrgRepo.findByUserIdAndOrganizationId(user.get().getId(), orgId)
                    .map(mapping -> mapping.getRole().equalsIgnoreCase(role))
                    .orElse(false);
        }
        return false;
    }
}`
};

const useCasesTable = [
  ["Assign Users", "Only ADMIN can assign"],
  ["Delete URLs", "Only URL creator or ADMIN"],
  ["View Analytics", "Allow ADMIN, VIEWER"],
  ["Update Organization Info", "Only ADMIN"]
];

const summaryTable = [
  ["@PreAuthorize", "Secures methods based on user roles"],
  ["RoleChecker", "Custom logic to evaluate dynamic roles"],
  ["authentication.name", "Retrieves logged-in user's identity"],
  ["Method-level Security", "Enables per-org access control"]
];

const discussionQA = [
  {
    question: "What annotation is used for method-level access control?",
    answer: "@PreAuthorize"
  },
  {
    question: "What does authentication.name return?",
    answer: "The logged-in user's email (or username)"
  },
  {
    question: "Where is dynamic role check logic placed?",
    answer: "In a component like RoleChecker injected using Spring"
  },
  {
    question: "Can multiple roles be allowed?",
    answer: "Yes, use logical operators in @PreAuthorize, like || or &&"
  }
];

const tryItTasks = [
  "Add @PreAuthorize(\"@roleChecker.isAdmin(authentication, #orgId)\") to your assignUserToOrganization method",
  "Test by logging in with different users and attempting the action"
];

const bonusTasks = [
  "Create roles like VIEWER, EDITOR",
  "Block URL delete/edit for non-creators"
];

const Topic9Subtopic5Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🔑 9.5 – Role-Based Access</h2>
      <hr />
      <div className="yellow-callout">
        <b>In this section, you'll learn how to:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Restrict access to endpoints based on roles like <span className="blue-inline-code">ADMIN</span>, <span className="blue-inline-code">USER</span>, or <span className="blue-inline-code">VIEWER</span></li>
          <li>Use Spring Security's <span className="blue-inline-code">@PreAuthorize</span> and method-level security</li>
          <li>Dynamically check a user's role within a specific organization</li>
          <li>Secure your app for real-world multi-tenant use</li>
        </ul>
        <div style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Let's make your platform smart enough to say: <br />
          <b>"You can only do this if you're an Admin of this Organization." ✅</b>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Role-Based Access Matters
      </h3>
      <div className="blue-card-section">
        <b>Imagine a system where:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>A <b>Zomato Admin</b> can add new users to the org.</li>
          <li>A <b>Flipkart User</b> can only view links, not add/delete.</li>
          <li>A <b>Viewer</b> can only check analytics but not manage anything.</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          Without proper <b>access control</b>, your API is a security risk. <br />
          With it, you unlock <b>fine-grained permissions</b> per organization.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Enabling Method-Level Security
      </h3>
      <div className="blue-card-section">
        <b>Make sure method-level security is enabled in your config:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.securityConfig ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.securityConfig, "securityConfig")}
          >
            {copied.securityConfig ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.securityConfig}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 Using @PreAuthorize Annotations
      </h3>
      <div className="blue-card-section">
        <b>You can now add <span className="blue-inline-code">@PreAuthorize</span> on service or controller methods.</b>
      </div>

      <h4 style={{ color: "#1976d2", marginTop: "1rem" }}>Example 1: Allow only Admins</h4>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.adminExample ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.adminExample, "adminExample")}
        >
          {copied.adminExample ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.adminExample}</code>
        </pre>
      </div>

      <h4 style={{ color: "#1976d2", marginTop: "1rem" }}>Example 2: Allow Admins or Self</h4>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.adminOrSelfExample ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.adminOrSelfExample, "adminOrSelfExample")}
        >
          {copied.adminOrSelfExample ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.adminOrSelfExample}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Create a RoleChecker Component
      </h3>
      <div className="blue-card-section">
        <b>You'll need a custom bean to evaluate roles dynamically:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.roleChecker ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.roleChecker, "roleChecker")}
          >
            {copied.roleChecker ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.roleChecker}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚦 Where to Use Role Checks?
      </h3>
      <div className="blue-card-section">
        <b>You can use it in:</b>
        <table className="custom-table" style={{ marginTop: "0.7rem" }}>
          <thead>
            <tr>
              <th>Area</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {useCasesTable.map(([area, example], idx) => (
              <tr key={idx}>
                <td>{area}</td>
                <td><span className="blue-inline-code">{example}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4 style={{ color: "#1976d2", margin: "0 0 0.5rem 0" }}>❓ Short Answers:</h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}
            >
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
        <b>🎯 Task:</b>
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
              <td><span className="blue-inline-code">{feature}</span></td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic9Subtopic5Content;

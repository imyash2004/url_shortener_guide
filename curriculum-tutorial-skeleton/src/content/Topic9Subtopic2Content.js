import React, { useState } from "react";
import "./CustomSectionStyles.css";

const discussionQA = [
  {
    q: "Why don’t we use @ManyToMany directly?",
    a: "Because we need extra fields like role, which aren’t supported in plain @ManyToMany.",
  },
  {
    q: "What’s the purpose of mappedBy in @OneToMany?",
    a: "It tells JPA that the mapping is handled by the UserOrganization side.",
  },
  {
    q: "What does orphanRemoval = true do?",
    a: "Automatically deletes child records when removed from the parent.",
  },
  {
    q: "Can I get all users in an organization easily now?",
    a: "✅ Yes! Use organization.getUserOrganizations().",
  },
];

const userCode = `@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    // 👥 Organizations this user is part of
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserOrganization> userOrganizations = new ArrayList<>();

    // ... roles, other fields, etc.
}`;

const orgCode = `@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String shortName;

    // 👥 Users in this organization
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserOrganization> userOrganizations = new ArrayList<>();
}`;

const Topic9Subtopic2Content = () => {
  const [copied, setCopied] = useState({ user: false, org: false });
  const [openIdx, setOpenIdx] = useState(null);

  const handleCopy = (which, code) => {
    navigator.clipboard.writeText(code);
    setCopied((prev) => ({ ...prev, [which]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [which]: false })), 2000);
  };

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🔗 9.2 – Many-to-Many Relationship (User ↔ Organization)
      </h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll link <code>User</code> and{" "}
        <code>Organization</code> via the <code>UserOrganization</code> entity.
        This allows us to:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>List all organizations a user belongs to</li>
          <li>List all users under an organization</li>
          <li>Query users based on their role or organization</li>
          <li>Avoid duplication and enforce clean mapping</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          Let’s design this elegantly using JPA best practices.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Not Use <code>@ManyToMany</code>?
      </h3>
      <div className="blue-card-section">
        <pre
          style={{
            background: "#f4f8ff",
            padding: "0.7rem 1rem",
            borderRadius: 8,
            border: "1px solid #d0e7ff",
          }}
        >
          {`@ManyToMany
private List<Organization> organizations;`}
        </pre>
        <ul className="custom-bullet-list" style={{ marginTop: 12 }}>
          <li>
            You can’t add extra fields like <code>role</code>,{" "}
            <code>createdAt</code>
          </li>
          <li>You lose flexibility for role-based access and analytics</li>
          <li>It’s not scalable for permission-driven applications</li>
        </ul>
        <div style={{ marginTop: 12 }}>
          <strong>
            So instead, we use{" "}
            <u>
              two <code>@OneToMany</code> relationships
            </u>{" "}
            from <code>User</code> and <code>Organization</code> to{" "}
            <code>UserOrganization</code>.
          </strong>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        👤 Update: <code>User.java</code>
      </h3>
      <div
        className="blue-card-section code-block-section"
        style={{ position: "relative" }}
      >
        <button
          className="copy-btn"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          onClick={() => handleCopy("user", userCode)}
        >
          {copied.user ? "Copied!" : "Copy"}
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>{userCode}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🏢 Update: <code>Organization.java</code>
      </h3>
      <div
        className="blue-card-section code-block-section"
        style={{ position: "relative" }}
      >
        <button
          className="copy-btn"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          onClick={() => handleCopy("org", orgCode)}
        >
          {copied.org ? "Copied!" : "Copy"}
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>{orgCode}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 How It All Connects
      </h3>
      <div className="blue-card-section">
        <pre
          style={{
            background: "#f4f8ff",
            padding: "0.7rem 1rem",
            borderRadius: 8,
            border: "1px solid #d0e7ff",
            marginBottom: 0,
          }}
        >
          {`User 1 ---\
           \___ UserOrganization ___/ Organization A
User 2 ---/                           \ Organization B`}
        </pre>
        <ul className="custom-bullet-list" style={{ marginTop: 12 }}>
          <li>User 1 can belong to multiple organizations</li>
          <li>Organization A can have multiple users</li>
          <li>
            Each relationship has its own metadata (<code>role</code>,{" "}
            <code>createdAt</code>, etc.)
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}
            >{`Q${idx + 1}: ${item.q}`}</div>
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
                → {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <h4>🚀 Task:</h4>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Add <code>userOrganizations</code> list to both <code>User</code>{" "}
            and <code>Organization</code> classes
          </li>
          <li>
            Use <code>@OneToMany(mappedBy = "...")</code>
          </li>
          <li>
            Ensure <code>cascade = CascadeType.ALL</code> and{" "}
            <code>orphanRemoval = true</code>
          </li>
          <li>Run your app and test mappings with test data</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <strong>💡 Bonus:</strong>
          <br />
          Write a utility method in <code>OrganizationService</code> to list all
          users in an organization.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Entity</th>
            <th>Field Name</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User</td>
            <td>userOrganizations</td>
            <td>List of orgs the user is in</td>
          </tr>
          <tr>
            <td>Organization</td>
            <td>userOrganizations</td>
            <td>List of users in the org</td>
          </tr>
          <tr>
            <td>Join</td>
            <td>UserOrganization</td>
            <td>Middle table storing mappings</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic9Subtopic2Content;

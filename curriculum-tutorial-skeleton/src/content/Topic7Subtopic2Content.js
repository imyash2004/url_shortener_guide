import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  [
    "findByUsername(String)",
    "Fetch a user based on username (used during authentication)",
  ],
  [
    "existsByUsername(String)",
    "Check if a username is already taken (for validation)",
  ],
  [
    "extends JpaRepository",
    "Gives you access to save, delete, findAll, findById, etc.",
  ],
];

const summaryTable2 = [
  ["UserRepository", "Interface to perform DB operations on User entity"],
  ["findByUsername()", "Key method for authentication"],
  ["existsByUsername()", "Useful during signup for validations"],
  ["Spring Data JPA", "Makes repository implementation automatic & clean"],
];

const discussionPrompts = [
  {
    q: "Why use JpaRepository?",
    a: "It provides built-in methods like save(), findById(), delete(), reducing boilerplate code.",
  },
  {
    q: "Why do we use Optional<User>?",
    a: "To avoid NullPointerException and handle cases where the user isn’t found safely.",
  },
  {
    q: "What is the purpose of existsByUsername()?",
    a: "To check if a username is already registered before creating a new account.",
  },
];

const Topic7Subtopic2Content = () => {
  const [openFAQ, setOpenFAQ] = React.useState(
    Array(discussionPrompts.length).fill(false)
  );
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>📦 7.2 – User Repository</h2>
      <hr />
      <div className="yellow-callout">
        <b>🔍 Why Do We Need a User Repository?</b>
        <div style={{ margin: "0.5rem 0 0 0.2rem" }}>
          A repository acts as the bridge between your Java code and the
          database. Rather than writing boilerplate SQL queries, Spring Data JPA
          allows us to perform CRUD operations with ease, using simple method
          names.
        </div>
        <div style={{ margin: "0.7rem 0 0 1.2rem" }}>
          Specifically for authentication, we’ll need to:
          <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
            <li>
              Find a user by their <b>username</b> (for login)
            </li>
            <li>
              Possibly check if a username <b>already exists</b> (during
              registration)
            </li>
            <li>Save new users (on signup)</li>
          </ul>
        </div>
        <div style={{ margin: "0.7rem 0 0 0.2rem" }}>
          The <b>UserRepository</b> interface will make all of this incredibly
          easy using Spring Data’s method conventions.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🗃️ Creating the UserRepository Interface
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          {`
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by username (used during login)
    Optional<User> findByUsername(String username);

    // Optional: Check if a username already exists
    boolean existsByUsername(String username);
}
`}
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Code Explanation
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([method, desc], idx) => (
            <tr key={idx}>
              <td>{method}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="blue-card-section" style={{ marginTop: "1rem" }}>
        <b>
          Why <code>Optional&lt;User&gt;</code>?
        </b>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          {`
Optional<User> user = userRepository.findByUsername("vaibhav");
if (user.isPresent()) {
    // proceed
} else {
    // user not found
}
`}
        </pre>
        <span style={{ display: "block", margin: "0.7rem 0" }}>
          Or even better with <code>.orElseThrow()</code>:
        </span>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          {`
User user = userRepository.findByUsername("vaibhav")
    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
`}
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✨ Advantages of Using Spring Data Repositories
      </h3>
      <ul className="topic-checklist">
        <li>✅ Clean and readable</li>
        <li>✅ Reduces boilerplate</li>
        <li>✅ Auto-implemented at runtime by Spring</li>
        <li>✅ Easy to extend later with custom queries</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
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
          <li>
            Create <b>UserRepository</b> interface.
          </li>
          <li>
            Extend <b>JpaRepository&lt;User, Long&gt;</b>.
          </li>
          <li>
            Add <b>findByUsername()</b> and <b>existsByUsername()</b> methods.
          </li>
          <li>
            <b>Bonus:</b> Add <b>findAllByRole(String role)</b> to fetch users
            by role.
          </li>
          <li>
            <b>Bonus:</b> Add <b>@Transactional(readOnly = true)</b> for
            read-optimized queries.
          </li>
        </ol>
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
          {summaryTable2.map(([feature, desc], idx) => (
            <tr key={idx}>
              <td>{feature}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Subtopic2Content;

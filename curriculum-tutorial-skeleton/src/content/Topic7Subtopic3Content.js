import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  ["BCryptPasswordEncoder", "Secure password hashing tool"],
  ["encode()", "Hashes the password before saving it"],
  ["matches()", "Validates raw input against the stored hash"],
  ["Adaptive Hashing", "Becomes slower with increased strength value"],
  ["Spring Integration", "Easily managed as a Spring @Bean"],
];

const bestPractices = [
  ["Always hash before storing", "Never save raw passwords"],
  [
    "Use BCryptPasswordEncoder",
    "Industry-standard, secure, salted, and adaptive",
  ],
  [
    "Never manually compare passwords",
    "Use passwordEncoder.matches() for verification",
  ],
  [
    "Never log passwords (even hashed)",
    "Logging credentials is a huge security flaw",
  ],
  [
    "Use a bean instead of new instance",
    "Lets Spring inject and manage configuration",
  ],
];

const discussionPrompts = [
  {
    q: "Why is BCrypt better than MD5 or SHA-256?",
    a: "BCrypt is salted, slow, and adaptive — perfect for password hashing. MD5/SHA are fast and insecure for passwords.",
  },
  {
    q: "What happens if you save a password without encoding it?",
    a: "It's stored in plain text and can be stolen easily.",
  },
  {
    q: "How do you compare a raw password with a hashed one?",
    a: "Use passwordEncoder.matches(raw, hashed)",
  },
  {
    q: "What annotation is used to make PasswordEncoder injectable across the app?",
    a: "@Bean inside a @Configuration class",
  },
];

const Topic7Subtopic4Content = () => {
  const [openFAQ, setOpenFAQ] = React.useState(
    Array(discussionPrompts.length).fill(false)
  );
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🔒 7.4 – Password Encryption</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll learn how to <b>securely store user passwords</b>{" "}
        using the <b>BCrypt hashing algorithm</b> — ensuring even if your
        database is compromised, raw passwords are never exposed.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Encrypt Passwords?
      </h3>
      <div className="blue-card-section">
        <b>Never store passwords in plain text.</b>
        <br />
        If a hacker gets access to your database and passwords aren’t encrypted,
        every user’s account — potentially across multiple platforms — is
        compromised.
      </div>
      <ul className="topic-checklist">
        <li>✔️ Prevents raw password leaks</li>
        <li>✔️ Adds computational cost (slows down brute force attacks)</li>
        <li>
          ✔️ BCrypt includes a <b>salt</b> internally (extra randomness)
        </li>
      </ul>
      <div className="blue-card-section">
        BCrypt is a widely trusted and <b>adaptive</b> hashing algorithm —
        meaning it can be made slower over time as computers get faster.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Using BCryptPasswordEncoder in Spring Boot
      </h3>
      <div className="blue-card-section">
        Spring Security makes it <b>super easy</b> to hash and validate
        passwords using <code>BCryptPasswordEncoder</code>.
      </div>
      <h4 style={{ marginTop: "1.2rem", color: "#1769aa" }}>
        Step 1️⃣ – Create a Bean
      </h4>
      <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
        {`
@Configuration
public class PasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
`}
      </pre>
      <h4 style={{ marginTop: "1.2rem", color: "#1769aa" }}>
        Step 2️⃣ – Encode Password Before Saving
      </h4>
      <div className="blue-card-section">
        In your Auth Service (during registration):
      </div>
      <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
        {`
@Autowired
private PasswordEncoder passwordEncoder;

public void registerUser(RegisterRequest request) {
    User user = new User();
    user.setUsername(request.getUsername());
    
    // Hash the password before saving
    user.setPassword(passwordEncoder.encode(request.getPassword()));

    userRepository.save(user);
}
`}
      </pre>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Validating Password During Login
      </h3>
      <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
        {`
User user = userRepository.findByUsername(request.getUsername())
    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

// Match raw input with hashed password
if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
    throw new BadCredentialsException("Invalid credentials");
}
`}
      </pre>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Best Practice</th>
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
            Add <b>BCryptPasswordEncoder</b> bean to your config
          </li>
          <li>
            Use <b>.encode()</b> while registering the user
          </li>
          <li>
            Use <b>.matches()</b> while logging in
          </li>
          <li>
            Verify in DB: passwords should look like <code>$2a$10$qJk...</code>{" "}
            instead of plain strings
          </li>
          <li>
            <b>Bonus:</b> Try increasing BCrypt strength:{" "}
            <code>new BCryptPasswordEncoder(12)</code> (default is 10)
          </li>
          <li>
            <b>Bonus:</b> Log the time taken to hash vs validate — see how
            BCrypt slows brute force
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, desc], idx) => (
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

export default Topic7Subtopic4Content;

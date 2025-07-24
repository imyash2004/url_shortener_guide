import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  securityConfig: `@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()         // Public Auth APIs
            .requestMatchers("/api/public/**").permitAll()       // Open to all
            .requestMatchers("/s/**").permitAll()                // Short URL Redirects
            .requestMatchers("/api/admin/**").hasRole("ADMIN")   // Admin-only section
            .requestMatchers("/api/user/**").hasRole("USER")     // Authenticated users
            .requestMatchers("/api/**").authenticated()          // All other /api/ require login
            .anyRequest().permitAll()                            // Allow others (like Swagger/UI)
        )
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()));

    return http.build();
}`,
  adminEndpoint: `@GetMapping("/api/admin/dashboard")
public String adminView() {
    return "Welcome Admin!";
}`,
  securityRule: `.requestMatchers("/api/admin/**").hasRole("ADMIN")`,
  denyAllRule: `.anyRequest().denyAll()`,
};

const matcherTable = [
  ["/api/auth/**", "Open to all"],
  ["/api/admin/**", "Requires `ROLE_ADMIN`"],
  ["/api/user/**", "Requires `ROLE_USER`"],
  ["/api/**", "Any logged-in user"],
  ["/s/**`, `/api/public/**", "Public, no auth required"],
  ["anyRequest()", "Default: allow or deny others"],
];

const summaryTable = [
  ["authorizeHttpRequests", "Secures routes based on URL patterns"],
  ["requestMatchers()", "Matches specific path patterns"],
  ["hasRole() / permitAll()", "Defines access logic"],
  ["anyRequest()", "Final catch-all rule"],
  ["Order of rules", "Top-down priority; define specific routes first"],
];

const discussionPrompts = [
  {
    q: "Where do we define path-based access rules?",
    a: "Inside `authorizeHttpRequests()` of `SecurityFilterChain`",
  },
  {
    q: "What happens if no rule matches a request?",
    a: "It falls back to `.anyRequest()` – usually `permitAll()` or `denyAll()`",
  },
  {
    q: 'Why are roles written as "hasRole(\'ADMIN\')" and not "ROLE_ADMIN"?',
    a: 'Spring adds the `"ROLE_"` prefix automatically',
  },
  {
    q: "Is this enough to protect internal logic?",
    a: "No — always combine with method-level security for full protection",
  },
];

const tryItTasks = [
  {
    title: "Make an Admin-only Endpoint",
    description:
      "🔁 Test as a regular user → 🟥 403 Forbidden\n🔁 Test as admin → ✅ Success",
    codeBlocks: [
      {
        id: "adminEndpoint",
        code: codeBlocks.adminEndpoint,
      },
      {
        id: "securityRule",
        code: codeBlocks.securityRule,
      },
    ],
  },
  {
    title: "Make a fallback `denyAll()` rule",
    description:
      "Try accessing an undefined path like `/hidden/system/config` → 🛑 Access denied!",
    codeBlocks: [
      {
        id: "denyAllRule",
        code: codeBlocks.denyAllRule,
      },
    ],
  },
];

const Topic8Subtopic4Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🌐 8.4 – URL-Based Security</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll explore how to{" "}
        <b>protect API endpoints based on URL patterns and user roles</b> using
        Spring Security's{" "}
        <span className="blue-inline-code">authorizeHttpRequests</span>{" "}
        configuration.
        <br />
        <br />
        This ensures that{" "}
        <b>unauthorized users can't even reach protected endpoints</b>, even
        before method-level security kicks in.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 What Is URL-Based Security?
      </h3>
      <div className="blue-card-section">
        <p>
          URL-based security allows you to configure access rules for different
          routes like:
        </p>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">/api/auth/**</span> → Public
          </li>
          <li>
            <span className="blue-inline-code">/api/admin/**</span> → Only
            Admins
          </li>
          <li>
            <span className="blue-inline-code">/api/user/**</span> → Only
            Logged-in Users
          </li>
        </ul>
        <p>
          You define this in your{" "}
          <span className="blue-inline-code">SecurityFilterChain</span> using{" "}
          <span className="blue-inline-code">.authorizeHttpRequests()</span>.
        </p>
        <p>
          This makes security <b>centralized</b>, <b>fast</b>, and{" "}
          <b>highly customizable</b>.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Defining Security Rules by URL Pattern
      </h3>
      <div className="blue-card-section">
        <p>Here's how you configure it:</p>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.securityConfig ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.securityConfig, "securityConfig")
            }
          >
            {copied.securityConfig ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.securityConfig}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 How the Request Matchers Work
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Matcher</th>
            <th>Access Rule</th>
          </tr>
        </thead>
        <tbody>
          {matcherTable.map((row, idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{row[0]}</span>
              </td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="yellow-callout" style={{ marginTop: "1rem" }}>
        <p>
          💡 Remember: roles are automatically prefixed with{" "}
          <span className="blue-inline-code">ROLE_</span>. So{" "}
          <span className="blue-inline-code">"hasRole('ADMIN')"</span> maps to{" "}
          <span className="blue-inline-code">"ROLE_ADMIN"</span> in JWT.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Order Matters!
      </h3>
      <div className="blue-card-section">
        <p>
          Spring evaluates your matchers <b>top-down</b>.
        </p>
        <p>
          Put more specific rules <b>above</b> general ones.
          <br />
          For example:
        </p>
        <p>
          ✅ <span className="blue-inline-code">/api/admin/**</span>
          <br />
          ⬇️ <span className="blue-inline-code">/api/**</span>
        </p>
        <p>
          If you reverse them, the general rule may override the specific one!
        </p>
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

            {task.codeBlocks.map((codeBlock, codeIdx) => (
              <div
                key={codeIdx}
                className="topic-codeblock code-with-copy"
                style={{ margin: "0.7rem 0" }}
              >
                <button
                  className={`copy-button ${
                    copied[codeBlock.id] ? "copied" : ""
                  }`}
                  onClick={() => copyToClipboard(codeBlock.code, codeBlock.id)}
                >
                  {copied[codeBlock.id] ? "Copied!" : "Copy"}
                </button>
                <pre>
                  <code>{codeBlock.code}</code>
                </pre>
              </div>
            ))}

            <p
              dangerouslySetInnerHTML={{
                __html: task.description
                  .replace(/🟥/g, '<span style="color: #d32f2f">🟥</span>')
                  .replace(/✅/g, '<span style="color: #388e3c">✅</span>')
                  .replace(/🛑/g, '<span style="color: #d32f2f">🛑</span>'),
              }}
            />
          </div>
        ))}
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
          {summaryTable.map((row, idx) => (
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
  );
};

export default Topic8Subtopic4Content;

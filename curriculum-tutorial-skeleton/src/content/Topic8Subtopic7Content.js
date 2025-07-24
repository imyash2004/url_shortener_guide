import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  securityConfig: `@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors(cors -> cors.configurationSource(corsConfigurationSource())) // 👈 Add this
        .csrf(csrf -> csrf.disable())
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/public/**").permitAll()
            .requestMatchers("/s/**").permitAll()
            .requestMatchers("/api/**").authenticated()
            .anyRequest().permitAll())
        .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class);

    return http.build();
}`,
  corsSource: `private CorsConfigurationSource corsConfigurationSource() {
    return request -> {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(corsProperties.getAllowedOrigins()); // from your config file
        cfg.setAllowedMethods(corsProperties.getAllowedMethods());
        cfg.setAllowedHeaders(corsProperties.getAllowedHeaders());
        cfg.setExposedHeaders(corsProperties.getExposedHeaders());
        cfg.setAllowCredentials(corsProperties.isAllowCredentials());
        cfg.setMaxAge(corsProperties.getMaxAge());
        return cfg;
    };
}`,
  applicationYml: `cors:
  allowed-origins:
    - "https://zesty-sawine-c372eb.netlify.app"
    - "http://localhost:5173"
  allowed-methods:
    - GET
    - POST
    - PUT
    - DELETE
  allowed-headers:
    - Authorization
    - Content-Type
  exposed-headers:
    - Authorization
  allow-credentials: true
  max-age: 3600`,
  frontendTest: `fetch("https://your-backend/api/secure-endpoint", {
  headers: {
    Authorization: "Bearer <your-token>",
  }
})`,
};

const discussionPrompts = [
  {
    q: "Why do we need CORS configuration?",
    a: "Browsers block requests between different origins unless explicitly allowed.",
  },
  {
    q: "What does the browser send before actual request?",
    a: "A preflight OPTIONS request.",
  },
  {
    q: "Where should CORS be configured in Spring Boot?",
    a: "Inside SecurityFilterChain with a CorsConfigurationSource.",
  },
  {
    q: "Can we use * for all origins if credentials are enabled?",
    a: "❌ No. You must explicitly list allowed origins.",
  },
];

const tryItTasks = [
  {
    title: "Add localhost and netlify to allowed origins",
    code: `allowed-origins:
  - http://localhost:5173
  - https://zesty-sawine-c372eb.netlify.app`,
    description: "Edit your application.yml to allow these origins",
  },
  {
    title: "Test API from Frontend",
    code: codeBlocks.frontendTest,
    description: "Use fetch() or axios from your frontend and pass the JWT",
  },
];

const summaryTable = [
  ["CORS", "Mechanism to allow cross-origin API access"],
  [
    "Preflight Request",
    "An OPTIONS request sent by browser to verify permission",
  ],
  [
    "CorsConfiguration",
    "Spring class to set allowed origins, headers, methods, etc.",
  ],
  ["SecurityFilterChain", "Where global CORS is configured in Spring Security"],
  [
    "application.yml",
    "Central config for origins, headers, methods used by frontend",
  ],
];

const Topic8Subtopic7Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🌍 8.7 – CORS Configuration</h2>
      <hr />
      <div className="yellow-callout">
        <strong>CORS (Cross-Origin Resource Sharing)</strong> is a security
        mechanism that allows a backend server (e.g.,{" "}
        <code>https://api.myapp.com</code>) to accept requests from a different
        frontend origin (e.g., <code>https://myfrontend.netlify.app</code>).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why CORS Is Needed
      </h3>
      <div className="blue-card-section">
        Browsers <strong>block API calls</strong> made from one origin to
        another unless the server explicitly allows it.
        <div style={{ marginTop: "1rem" }}>
          Without CORS:
          <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
            <li>
              Your frontend gets a <strong>CORS error</strong>.
            </li>
            <li>
              API calls <strong>fail silently</strong> — even before hitting
              your controller.
            </li>
            <li>Users are left confused (and so are you 😓).</li>
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔐 How It Works</h3>
      <div className="blue-card-section">
        When a browser makes a cross-origin request, it first sends a{" "}
        <strong>preflight request (OPTIONS)</strong> to check if it's safe. If
        allowed, the browser continues with the actual request.
        <div style={{ marginTop: "1rem" }}>
          You can allow these requests using Spring's{" "}
          <strong>CORS configuration</strong>.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Setting Up CORS in Spring Boot
      </h3>
      <div className="blue-card-section">
        Let's configure CORS <strong>globally</strong> using your existing{" "}
        <code>AppConfig</code>:
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
        <div style={{ marginTop: "1rem" }}>
          Now create the configuration source:
        </div>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.corsSource ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.corsSource, "corsSource")}
          >
            {copied.corsSource ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.corsSource}</code>
          </pre>
        </div>
        <div style={{ marginTop: "1rem" }}>
          Make sure you've created a <code>CorsProperties</code> class that
          loads the config from <code>application.yml</code> or{" "}
          <code>application.properties</code>.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧾 Example: <code>application.yml</code>
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.applicationYml ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.applicationYml, "applicationYml")
            }
          >
            {copied.applicationYml ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.applicationYml}</code>
          </pre>
        </div>

        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#f8f9fa",
            padding: "0.75rem",
            borderLeft: "4px solid #4CAF50",
            borderRadius: "0.25rem",
          }}
        >
          ✅ With this setup, your React/Angular/Vue frontend can call protected
          APIs and send the JWT in headers.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Additional Tips
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Always set <code>Allow-Credentials</code> to <code>true</code> if
            your frontend needs cookies or auth headers.
          </li>
          <li>
            Never use <code>"*"</code> for <code>allowedOrigins</code> when
            credentials are enabled — it will <strong>not work</strong>.
          </li>
          <li>
            You can also annotate specific controllers with{" "}
            <code>@CrossOrigin(...)</code>, but global config is better for
            consistency.
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>
                Q{idx + 1}: {faq.q}
              </b>
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
          </div>
        ))}
        <div style={{ marginTop: "0.5rem" }}>
          If you configured CORS correctly — 🎉 no errors!
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Key Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, idx) => (
            <tr key={idx}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic8Subtopic7Content;

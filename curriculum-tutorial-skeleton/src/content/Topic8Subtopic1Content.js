import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  securityConfig: `@Configuration
@EnableWebSecurity
public class AppConfig {

    @Autowired
    private CorsProperties corsProperties;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/s/**").permitAll() // Short URL redirects
                .requestMatchers("/api/auth/**").permitAll() // Login/Signup
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/**").authenticated() // All API routes secured
                .anyRequest().permitAll()
            )
            .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(corsProperties.getAllowedOrigins());
            config.setAllowedMethods(corsProperties.getAllowedMethods());
            config.setAllowedHeaders(corsProperties.getAllowedHeaders());
            config.setExposedHeaders(corsProperties.getExposedHeaders());
            config.setAllowCredentials(corsProperties.isAllowCredentials());
            config.setMaxAge(corsProperties.getMaxAge());
            return config;
        };
    }
}`,
  fakePathExample: `.requestMatchers("/open/**").permitAll()`,
};

const keyHighlights = [
  [
    "sessionCreationPolicy(SessionCreationPolicy.STATELESS)",
    "No HTTP sessions are created. JWT is used instead — each request must include a token.",
  ],
  [
    ".permitAll() vs .authenticated()",
    "Define what's public (signup, redirect) and what's secure (/api/**).",
  ],
  [
    "addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)",
    "This adds our custom JWT validator to intercept and validate tokens before Spring's filters act.",
  ],
  [
    "csrf().disable()",
    "CSRF is a problem in session-based logins. Since JWT is stateless and stored in headers, CSRF protection is not required.",
  ],
  [
    "CORS Setup",
    "Allows frontend on a different domain (like React or Angular) to communicate with this API.",
  ],
];

const summaryTable = [
  ["SecurityFilterChain", "Main security logic and rules"],
  ["JwtTokenValidator", "Verifies JWT and extracts user identity"],
  ["BCryptPasswordEncoder", "Encrypts user passwords"],
  ["SessionCreationPolicy", "Ensures stateless API (JWT instead of sessions)"],
  ["CORS Configuration", "Enables frontend integration"],
];

const discussionPrompts = [
  {
    q: "Why do we use SessionCreationPolicy.STATELESS?",
    a: "Because we are using JWT, which is stateless — no need for server-side sessions.",
  },
  {
    q: "What does permitAll() do in .requestMatchers()?",
    a: "It allows access to specific paths without requiring authentication (e.g., /api/auth/**, /s/**).",
  },
  {
    q: "Why is CSRF disabled?",
    a: "CSRF is only a concern for session-based authentication. With JWT (stored in headers), it's not needed.",
  },
  {
    q: "What's the role of JwtTokenValidator?",
    a: "It intercepts requests, checks the JWT, and sets the user's identity in Spring's SecurityContext.",
  },
  {
    q: "Why do we configure CORS?",
    a: "To allow your frontend (e.g., React, Angular) to make cross-origin requests to this Spring Boot backend.",
  },
];

const tryItTasks = [
  "Block access to /api/urls without JWT: Try sending GET /api/urls and expect 401 Unauthorized",
  "Allow access to /api/auth/signup without JWT: Send a POST /api/auth/signup and expect 200 OK",
  "Add a fake path to test permitAll(): Add '.requestMatchers(\"/open/**\").permitAll()' and hit GET /open/test",
];

const Topic8Subtopic1Content = () => {
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
        🔐 8.1 – Spring Security Configuration
      </h2>
      <hr />
      <div className="yellow-callout">
        Spring Security is extremely flexible. In this section, we'll customize
        it to:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>✅ Accept JWT for all authenticated APIs</li>
          <li>✅ Allow public access to signup/login/redirect routes</li>
          <li>
            ✅ Set session management to <b>stateless</b>
          </li>
          <li>✅ Disable CSRF (not needed for token-based APIs)</li>
          <li>
            ✅ Enable proper <b>CORS</b> support
          </li>
          <li>
            ✅ Apply custom filters like{" "}
            <span className="blue-inline-code">JwtTokenValidator</span>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧭 What is <span className="blue-inline-code">SecurityFilterChain</span>
        ?
      </h3>
      <div className="blue-card-section">
        In Spring Security, instead of extending{" "}
        <span className="blue-inline-code">WebSecurityConfigurerAdapter</span>{" "}
        (deprecated), we now use{" "}
        <span className="blue-inline-code">SecurityFilterChain</span> beans to
        define:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>Which endpoints are protected or open</li>
          <li>What filters to apply</li>
          <li>How authentication works</li>
          <li>How to handle sessions, CSRF, and CORS</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Sample Configuration
      </h3>
      <div className="blue-card-section">
        Here's a clean and production-ready example:
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
        🔍 Key Highlights Explained
      </h3>

      <div style={{ margin: "1.2rem 0" }}>
        <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            <span className="blue-inline-code">
              sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            </span>
          </div>
          <div>
            No HTTP sessions are created. JWT is used instead — each request
            must include a token.
          </div>
        </div>

        <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            <span className="blue-inline-code">
              .permitAll() vs .authenticated()
            </span>
          </div>
          <div>
            Define what's <b>public</b> (signup, redirect) and what's{" "}
            <b>secure</b> (/api/**).
          </div>
        </div>

        <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            <span className="blue-inline-code">
              addFilterBefore(new JwtTokenValidator(),
              BasicAuthenticationFilter.class)
            </span>
          </div>
          <div>
            This adds our custom JWT validator to intercept and validate tokens
            before Spring's filters act.
          </div>
        </div>

        <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            <span className="blue-inline-code">csrf().disable()</span>
          </div>
          <div>
            CSRF is a problem in session-based logins. Since JWT is stateless
            and stored in headers, CSRF protection is not required.
          </div>
        </div>

        <div className="blue-card-section">
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            <span className="blue-inline-code">CORS Setup</span>
          </div>
          <div>
            Allows frontend on a different domain (like React or Angular) to
            communicate with this API.
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why is This Important?
      </h3>
      <div className="blue-card-section">
        Without this setup:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>JWTs wouldn't be validated</li>
          <li>Anyone could access secure routes</li>
          <li>Frontend requests from another origin would fail</li>
          <li>You'd accidentally expose sensitive data</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          This configuration ensures that every request is{" "}
          <b>authenticated, validated, and filtered properly</b>.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
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
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "1.2rem 0 0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.fakePathExample ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.fakePathExample, "fakePathExample")
            }
          >
            {copied.fakePathExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.fakePathExample}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <div className="blue-card-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Config Element</th>
              <th>Role</th>
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
    </div>
  );
};

export default Topic8Subtopic1Content;

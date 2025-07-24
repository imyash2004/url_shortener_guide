import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  junitTest: `@SpringBootTest
@AutoConfigureMockMvc
public class AuthSecurityTests {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testAccessWithoutToken_shouldReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/users/me"))
               .andExpect(status().isUnauthorized());
    }

    @Test
    public void testAccessWithInvalidToken_shouldReturnUnauthorized() throws Exception {
        mockMvc.perform(get("/api/users/me")
               .header("Authorization", "Bearer faketoken"))
               .andExpect(status().isUnauthorized());
    }

    @Test
    public void testAdminAccess_withProperRole_shouldPass() throws Exception {
        String token = getJwtForRole("ADMIN");

        mockMvc.perform(get("/api/admin/dashboard")
                .header("Authorization", "Bearer " + token))
               .andExpect(status().isOk());
    }

    @Test
    public void testAdminAccess_withUserRole_shouldFail() throws Exception {
        String token = getJwtForRole("USER");

        mockMvc.perform(get("/api/admin/dashboard")
                .header("Authorization", "Bearer " + token))
               .andExpect(status().isForbidden());
    }

    private String getJwtForRole(String role) {
        // Simulate or mock a JWT here
        return JwtGenerator.generateMockJwt(role); // implement a mock helper
    }
}`,
  publicEndpoint: `GET /api/public/welcome`,
  protectedEndpoint: `GET /api/users/me`,
  invalidToken: `Authorization: Bearer faketoken.123`,
  validToken: `Authorization: Bearer <valid-jwt>`,
  roleBasedTest: `GET /api/admin/dashboard`
};

const discussionPrompts = [
  {
    q: "What is the expected status code for protected APIs without tokens?",
    a: "401 Unauthorized"
  },
  {
    q: "What happens if a user with `ROLE_USER` accesses an admin route?",
    a: "403 Forbidden"
  },
  {
    q: "What tool is used for automated testing of secured endpoints?",
    a: "`MockMvc` with `@SpringBootTest` or `@WebMvcTest`"
  },
  {
    q: "Can you test security manually too?",
    a: "✅ Yes, with Postman or curl"
  }
];

const tryItTasks = [
  {
    title: "Use Postman to test",
    steps: [
      "`/api/public/hello` → should succeed",
      "`/api/users/me` → should fail without token",
      "Use fake token → should fail",
      "Use real token from login → should succeed"
    ]
  },
  {
    title: "Write a test with `MockMvc`",
    steps: [
      "Use `MockMvc.perform()` to test role-based and unauthenticated access",
      "Mock JWT token creation"
    ]
  }
];

const testingStrategies = [
  ["Accessing public endpoint", "✅ Allowed without authentication"],
  ["Accessing protected endpoint (no token)", "❌ 401 Unauthorized"],
  ["Accessing with invalid token", "❌ 401 Unauthorized"],
  ["Accessing with valid token", "✅ Allowed"],
  ["Role-based method access", "✅ or ❌ depending on user role"]
];

const summaryTable = [
  ["No token", "401 Unauthorized"],
  ["Invalid token", "401 Unauthorized"],
  ["Valid token, wrong role", "403 Forbidden"],
  ["Valid token, correct role", "200 OK"],
  ["Public route", "200 OK, no token needed"]
];

const Topic8Subtopic8Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🧪 8.8 – Security Testing</h2>
      <hr />
      <div className="yellow-callout">
        In this final section of the security module, we'll explore how to <strong>test protected endpoints, verify token validation</strong>, and simulate access control scenarios.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why Security Testing?
      </h3>
      <div className="blue-card-section">
        <p>Even if your code looks solid, there could be gaps. Security testing ensures:</p>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>🔐 Protected endpoints <strong>aren't accessible without a valid JWT</strong></li>
          <li>🚫 Invalid tokens are <strong>rejected with proper error codes</strong></li>
          <li>👤 Role-based access <strong>actually works</strong></li>
          <li>🧪 Automated tests catch bugs before users do</li>
        </ul>
        
        <p style={{ marginTop: "1rem" }}>Without it, your app might be vulnerable to unauthorized access, token manipulation, or privilege escalation.</p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Testing Strategy Overview
      </h3>
      <div className="blue-card-section">
        <p>You'll need to test:</p>
        
        <table className="custom-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Expected Outcome</th>
            </tr>
          </thead>
          <tbody>
            {testingStrategies.map((row, idx) => (
              <tr key={idx}>
                <td>{row[0]}</td>
                <td dangerouslySetInnerHTML={{ __html: row[1] }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧰 Tools You Can Use
      </h3>
      <div className="blue-card-section">
        <p>You can use <strong>Postman</strong>, <strong>cURL</strong>, or write <strong>JUnit + Spring Security tests</strong>.</p>
        <p>For this section, we'll cover both <strong>manual</strong> (Postman) and <strong>automated</strong> (JUnit) testing.</p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Manual Testing with Postman
      </h3>
      
      <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
        <h4>✅ Public Endpoint</h4>
        <p><strong>Request:</strong></p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.publicEndpoint ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.publicEndpoint, "publicEndpoint")}
          >
            {copied.publicEndpoint ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.publicEndpoint}</code>
          </pre>
        </div>
        <p><strong>Expected:</strong> 200 OK, no token needed.</p>
      </div>

      <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
        <h4>❌ Protected Endpoint Without Token</h4>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.protectedEndpoint ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.protectedEndpoint, "protectedEndpoint")}
          >
            {copied.protectedEndpoint ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.protectedEndpoint}</code>
          </pre>
        </div>
        <p><strong>Expected:</strong> 401 Unauthorized</p>
      </div>

      <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
        <h4>❌ With Invalid Token</h4>
        <p><strong>Header:</strong></p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.invalidToken ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.invalidToken, "invalidToken")}
          >
            {copied.invalidToken ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.invalidToken}</code>
          </pre>
        </div>
        <p><strong>Expected:</strong> 401 Unauthorized</p>
      </div>

      <div className="blue-card-section" style={{ marginBottom: "1rem" }}>
        <h4>✅ With Valid JWT</h4>
        <p>Use a real token from login:</p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.validToken ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.validToken, "validToken")}
          >
            {copied.validToken ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.validToken}</code>
          </pre>
        </div>
        <p><strong>Expected:</strong> 200 OK with user data</p>
      </div>

      <div className="blue-card-section">
        <h4>🧪 Role-Based Test</h4>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.roleBasedTest ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.roleBasedTest, "roleBasedTest")}
          >
            {copied.roleBasedTest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.roleBasedTest}</code>
          </pre>
        </div>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>If JWT has <code>ROLE_ADMIN</code>: ✅ 200 OK</li>
          <li>If not: ❌ 403 Forbidden</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔬 Automated Testing (JUnit)
      </h3>
      <div className="blue-card-section">
        <p>Use Spring Boot's testing utilities:</p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.junitTest ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.junitTest, "junitTest")}
          >
            {copied.junitTest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.junitTest}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}: {faq.q}</b>
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
            <h4>🚀 Task {idx + 1}: {task.title}</h4>
            <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
              {task.steps.map((step, stepIdx) => (
                <li key={stepIdx} dangerouslySetInnerHTML={{ __html: step }} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Test Case</th>
            <th>Expected Result</th>
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
      
      <div style={{ marginTop: "2rem", textAlign: "center", fontSize: "1.5rem" }}>
        🎉 Congratulations! You've completed the Security module!
      </div>
    </div>
  );
};

export default Topic8Subtopic8Content;

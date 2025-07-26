import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic11Subtopic1Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const codeBlocks = {
    controllerMethod: `@PostMapping("/signup")
public ResponseEntity<ApiResponse<AuthResponse>> signUp(@RequestBody @Valid SignUpRequest request) {
    return ResponseEntity.ok(authService.signUp(request));
}`,
    integrationTest: `@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test") // uses application-test.yml
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testSignUp_Success() throws Exception {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("john@example.com");
        request.setPassword("StrongPass123");
        request.setFirstName("John");
        request.setLastName("Doe");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("john@example.com"));
    }

    @Test
    void testSignUp_ValidationError() throws Exception {
        SignUpRequest request = new SignUpRequest();
        request.setEmail("bad-email");
        request.setPassword("123");

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testSignIn_InvalidCredentials() throws Exception {
        SignInRequest request = new SignInRequest("invalid@example.com", "wrongPass");

        mockMvc.perform(post("/api/auth/signin")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Invalid email or password"));
    }
}`,
  };

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

  const benefitsTable = [
    [
      "End-to-End Coverage",
      "Ensures all layers (Controller → Service → Repository) work as one",
    ],
    ["Bug Detection", "Catches bugs missed by unit tests"],
    [
      "Verifies Configuration",
      "Validates application configs like DB, Bean injections, validation",
    ],
    [
      "Safer Refactoring",
      "Ensures any major code refactor doesn't break the flow",
    ],
  ];

  const annotationsTable = [
    ["@SpringBootTest", "Boots the entire application context"],
    ["@AutoConfigureMockMvc", "Injects MockMvc to simulate HTTP calls"],
    ['@ActiveProfiles("test")', "Uses test-specific configs (like H2 DB)"],
  ];

  const summaryTable = [
    ["Integration Testing", "Tests multiple components working together"],
    ["Tools Used", "@SpringBootTest, MockMvc, @AutoConfigureMockMvc"],
    ["Focus", "Realistic flow — from Controller to DB"],
    ["Test DB", "Usually H2 or in-memory database"],
    ["Mocking", "Avoided — test real behavior"],
  ];

  const tryItTasks = [
    "/api/url/create — should save and return the short URL",
    "/api/url/delete/{id} — should delete the given short URL",
    "/api/organization/create — should save organization and validate fields",
  ];

  const bonusTasks = [
    "Configure application-test.yml to use H2 database",
    "Test authentication-required routes using @WithMockUser",
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🔗 11.2 – Integration Testing</h2>
      <hr />

      <div className="yellow-callout">
        Integration Testing focuses on <b>validating the interaction</b> between
        multiple layers or components of your Spring Boot application. It's a
        step beyond unit testing — where instead of mocking everything, you use{" "}
        <b>actual Spring Beans and configurations</b> to test{" "}
        <b>end-to-end flows</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 What is Integration Testing?
      </h3>
      <div className="blue-card-section">
        <b>
          Integration Testing is a realistic simulation of how your application
          behaves in production:
        </b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Controllers handle HTTP requests.</li>
          <li>Services implement business logic.</li>
          <li>Repositories talk to the (test) database.</li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          It doesn't mock dependencies — it wires real components to test the
          complete functionality of your feature, ensuring all layers work{" "}
          <b>together</b> as expected.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤔 Why Integration Testing?
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Benefit</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {benefitsTable.map(([benefit, description], idx) => (
            <tr key={idx}>
              <td>
                <b>{benefit}</b>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="yellow-callout" style={{ marginTop: "1rem" }}>
        Unlike unit tests, you <b>don't mock services</b> — you load the real
        application context using Spring's testing framework.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Setting up Integration Testing in Spring Boot
      </h3>
      <div className="blue-card-section">
        <b>To enable integration testing, we need to use:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">@SpringBootTest</span> to load
            the full Spring application context
          </li>
          <li>
            <span className="blue-inline-code">@AutoConfigureMockMvc</span> for
            simulating HTTP requests without running a server
          </li>
          <li>
            H2 or in-memory DB (configured in{" "}
            <span className="blue-inline-code">test</span> profile)
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Sample Integration Test: AuthController
      </h3>
      <div className="blue-card-section">
        <b>
          Let's test <span className="blue-inline-code">/api/auth/signup</span>{" "}
          and <span className="blue-inline-code">/api/auth/signin</span> as if
          they're running in real life.
        </b>

        <h4
          style={{
            color: "#1769aa",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          ✅ Controller Method We're Testing:
        </h4>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.controllerMethod ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.controllerMethod, "controllerMethod")
            }
          >
            {copied.controllerMethod ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.controllerMethod}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Integration Test Code:
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.integrationTest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.integrationTest, "integrationTest")
            }
          >
            {copied.integrationTest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.integrationTest}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Explanation of Key Annotations
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Annotation</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {annotationsTable.map(([annotation, purpose], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{annotation}</span>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <b>❓ Short Answers:</b>
          <button
            style={{
              marginLeft: "1rem",
              padding: "0.2rem 0.5rem",
              fontSize: "0.8rem",
              backgroundColor: "#1769aa",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setDiscussionVisible(!discussionVisible)}
          >
            {discussionVisible ? "Hide" : "Show"} Answers
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q1: What does integration testing validate that unit tests don't?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> It validates the collaboration between layers
                like controllers, services, and repositories.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q2: What annotation is used to load the full Spring Boot
              application context?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> @SpringBootTest
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q3: Which tool is used to simulate HTTP requests without starting
              a server?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> MockMvc
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: Where should your integration tests be placed?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> In src/test/java/, mirroring your controller or
                service package.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🚀 Tasks:</b>
        <p style={{ marginTop: "0.5rem" }}>✅ Write integration tests for:</p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          <b>💡 Bonus:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bonusTasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([concept, description], idx) => (
            <tr key={idx}>
              <td>
                <b>{concept}</b>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic11Subtopic1Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic11Subtopic2Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const codeBlocks = {
    setup: `@WebMvcTest(AuthController.class)
@Import(TestConfig.class) // Optional: For password encoder or custom config
@ExtendWith(SpringExtension.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthService authService;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    // Test methods follow below...
}`,
    signUpSuccess: `@Test
void signUp_Success() throws Exception {
    SignUpRequest request = new SignUpRequest("John", "Doe", "john@example.com", "secure123");

    AuthResponse response = new AuthResponse("jwt-token", "john@example.com", "John", "Doe");
    ApiResponse<AuthResponse> apiResponse = ApiResponse.success("User registered", response);

    when(authService.signUp(any(SignUpRequest.class))).thenReturn(apiResponse);

    mockMvc.perform(post("/api/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.success").value(true))
        .andExpect(jsonPath("$.data.email").value("john@example.com"))
        .andExpect(jsonPath("$.data.token").value("jwt-token"));
}`,
    signUpValidation: `@Test
void signUp_ValidationError() throws Exception {
    SignUpRequest invalidRequest = new SignUpRequest("", "", "bad-email", "123");

    mockMvc.perform(post("/api/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(invalidRequest)))
        .andExpected(status().isBadRequest());
}`,
    signInSuccess: `@Test
void signIn_Success() throws Exception {
    SignInRequest request = new SignInRequest("john@example.com", "secure123");

    AuthResponse response = new AuthResponse("jwt-token", "john@example.com", "John", "Doe");
    ApiResponse<AuthResponse> apiResponse = ApiResponse.success("Login successful", response);

    when(authService.signIn(any(SignInRequest.class))).thenReturn(apiResponse);

    mockMvc.perform(post("/api/auth/signin")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.data.token").value("jwt-token"));
}`,
    signInInvalid: `@Test
void signIn_InvalidCredentials() throws Exception {
    SignInRequest request = new SignInRequest("john@example.com", "wrongpass");
    ApiResponse<AuthResponse> errorResponse = ApiResponse.error("Invalid email or password");

    when(authService.signIn(any(SignInRequest.class))).thenReturn(errorResponse);

    mockMvc.perform(post("/api/auth/signin")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.success").value(false))
        .andExpect(jsonPath("$.message").value("Invalid email or password"));
}`,
    withMockUser: `@Test
@WithMockUser(username = "john@example.com")
void getCurrentUser_Success() throws Exception {
    User user = new User("John", "Doe", "john@example.com");
    ApiResponse<User> apiResponse = ApiResponse.success(user);

    when(authService.getCurrentUser("john@example.com")).thenReturn(apiResponse);

    mockMvc.perform(get("/api/auth/me"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.data.email").value("john@example.com"));
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

  const toolsTable = [
    [
      "@WebMvcTest",
      "Loads only controller-related components (no services or DB beans)",
    ],
    ["MockMvc", "Simulates HTTP calls to your endpoints"],
    ["@MockBean", "Mocks service layer so controller logic is isolated"],
    [
      "objectMapper",
      "Converts DTOs to JSON and vice versa for request/response handling",
    ],
    [
      "@WithMockUser",
      "Simulates authenticated user in Spring Security context",
    ],
  ];

  const summaryTable = [
    ["Controller Tests", "Ensure request–response flow is valid"],
    ["MockMvc", "Mocks HTTP requests without launching a server"],
    ["JSONPath & Asserts", "Validate JSON data structure and values"],
    ["@WebMvcTest", "Loads only controllers and related config"],
    ["Security Simulated", "Easily test protected routes using mock users"],
  ];

  const testingBenefits = [
    "Endpoints are reachable",
    "Inputs are validated",
    "Proper responses are returned (200, 400, 401, etc.)",
    "JSON structures are correct",
    "Security and permissions are respected",
  ];

  const validationChecks = [
    "HTTP status codes",
    "JSON responses",
    "URL paths and payloads",
    "Authentication logic",
    "Input validation errors",
  ];

  const tryItTasks = ["POST /api/url/shorten", "GET /{org}/{shortCode}"];

  const tryItChecks = [
    "302 redirect",
    "404 Not Found",
    "Valid and invalid payloads",
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🎮 11.3 – Controller Layer Testing with MockMvc
      </h2>
      <hr />

      <div className="yellow-callout">
        In this section, we'll dive into <b>Controller Testing using MockMvc</b>{" "}
        — a powerful Spring utility that simulates real HTTP requests without
        starting the actual server.
        <p style={{ marginTop: "1rem" }}>
          <b>This lets you validate:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {validationChecks.map((check, idx) => (
            <li key={idx}>{check}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤔 Why Controller Testing?
      </h3>
      <div className="blue-card-section">
        <p>
          Even if your services and repositories are perfect, if your controller
          logic fails to wire things together or exposes bad responses, your
          users are impacted.
        </p>

        <p style={{ marginTop: "1rem" }}>
          <b>Controller tests ensure:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {testingBenefits.map((benefit, idx) => (
            <li key={idx}>✅ {benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Tools & Annotations Used
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Annotation/Class</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {toolsTable.map(([tool, purpose], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{tool}</span>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Example: Testing AuthController Endpoints
      </h3>
      <div className="blue-card-section">
        <p>
          <b>We'll test:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">POST /api/auth/signup</span>
          </li>
          <li>
            <span className="blue-inline-code">POST /api/auth/signin</span>
          </li>
          <li>
            <span className="blue-inline-code">GET /api/auth/me</span>
          </li>
        </ul>

        <h4
          style={{
            color: "#1769aa",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          ✅ Setup: @WebMvcTest
        </h4>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.setup ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.setup, "setup")}
          >
            {copied.setup ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.setup}</code>
          </pre>
        </div>
      </div>

      <h4
        style={{
          color: "#1769aa",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        ✅ Test Case 1: SignUp Success
      </h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.signUpSuccess ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.signUpSuccess, "signUpSuccess")
            }
          >
            {copied.signUpSuccess ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.signUpSuccess}</code>
          </pre>
        </div>
      </div>

      <h4
        style={{
          color: "#1769aa",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        ❌ Test Case 2: SignUp Validation Fail
      </h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.signUpValidation ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.signUpValidation, "signUpValidation")
            }
          >
            {copied.signUpValidation ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.signUpValidation}</code>
          </pre>
        </div>
      </div>

      <h4
        style={{
          color: "#1769aa",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        ✅ Test Case 3: SignIn Success
      </h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.signInSuccess ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.signInSuccess, "signInSuccess")
            }
          >
            {copied.signInSuccess ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.signInSuccess}</code>
          </pre>
        </div>
      </div>

      <h4
        style={{
          color: "#1769aa",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        ❌ Test Case 4: SignIn Invalid Credentials
      </h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.signInInvalid ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.signInInvalid, "signInInvalid")
            }
          >
            {copied.signInInvalid ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.signInInvalid}</code>
          </pre>
        </div>
      </div>

      <h4
        style={{
          color: "#1769aa",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        ✅ Test Case 5: Get Current User with @WithMockUser
      </h4>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.withMockUser ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.withMockUser, "withMockUser")
            }
          >
            {copied.withMockUser ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.withMockUser}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <b>❓ Short Q&A</b>
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
            <b>Q1: What is MockMvc used for?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To simulate HTTP requests to controller endpoints
                in tests.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q2: Why use @WebMvcTest?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To load only controller-related beans for faster,
                isolated testing.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: When to use @MockBean?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> When your controller relies on a service you
                don't want to run for real.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: What is objectMapper.writeValueAsString() used for?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To convert Java DTOs to JSON for the request
                body.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🚀 Task:</b>
        <p style={{ marginTop: "0.5rem" }}>Test your UrlController:</p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          <b>Use MockMvc to check:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItChecks.map((check, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {check}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          <b>💡 Bonus:</b> Test endpoints with and without JWT authentication
          using <span className="blue-inline-code">@WithMockUser</span>.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
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
              <td>
                <b>{feature}</b>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic11Subtopic2Content;

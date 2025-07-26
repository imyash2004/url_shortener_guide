import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic11Subtopic0Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const codeBlocks = {
    dependencies: `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <scope>test</scope>
</dependency>`,
    serviceMethod: `public ApiResponse<AuthResponse> signUp(SignUpRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
        return ApiResponse.error("Email already registered");
    }
    User user = new User(...);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    userRepository.save(user);
    String token = jwtProvider.generateToken(...);
    return ApiResponse.success("User registered", new AuthResponse(token, user.getEmail(), ...));
}`,
    unitTest: `@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtProvider jwtProvider;

    @InjectMocks
    private AuthService authService;

    @Test
    void testSignUp_Successful() {
        SignUpRequest request = new SignUpRequest("test@example.com", "pass123", "John", "Doe");

        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(passwordEncoder.encode("pass123")).thenReturn("hashedPassword");
        when(jwtProvider.generateToken(any())).thenReturn("jwt-token");

        ApiResponse<AuthResponse> response = authService.signUp(request);

        assertTrue(response.isSuccess());
        assertEquals("test@example.com", response.getData().getEmail());
        assertEquals("jwt-token", response.getData().getToken());
    }

    @Test
    void testSignUp_EmailAlreadyExists() {
        SignUpRequest request = new SignUpRequest("existing@example.com", "pass", "Jane", "Doe");

        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        ApiResponse<AuthResponse> response = authService.signUp(request);

        assertFalse(response.isSuccess());
        assertEquals("Email already registered", response.getMessage());
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

  const toolsTable = [
    ["JUnit 5", "The primary testing framework used in Java"],
    ["Mockito", "For mocking dependencies like services and DAOs"],
    ["AssertJ / Hamcrest", "For writing expressive assertions"],
    ["MockMvc", "To simulate HTTP requests for controller layer tests"],
    ["@WebMvcTest", "To test controllers in isolation (web layer only)"],
    ["@MockBean", "To inject mock dependencies into Spring's test context"],
    ["@DataJpaTest", "To test repositories with in-memory DBs like H2"],
  ];

  const bestPracticesList = [
    "Name Tests Clearly - Use descriptive method names like shouldReturnErrorWhenPasswordIsTooShort()",
    "Test One Thing at a Time - Each test should focus on one behavior, not multiple outcomes",
    "Use Mocks to Isolate Units - Don't test the database or web layer in a service unit test",
    "Keep Tests Fast - If your unit tests take too long, they won't be run frequently",
  ];

  const summaryTable = [
    ["Unit Testing", "Testing one function/method in isolation"],
    ["Tools", "JUnit 5, Mockito"],
    ["Benefits", "Catch bugs early, faster feedback, safer refactoring"],
    ["Best Practice", "Write tests for every critical service or utility"],
    ["Mocking", "Used to avoid real dependency calls"],
  ];

  const tryItTasks = [
    "Write unit tests for your service methods like signIn, createShortURL, or getCurrentUser",
    "Use Mockito.when(...) to stub method responses",
    "Use @ExtendWith(MockitoExtension.class) and @InjectMocks properly",
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🧪 11.1 – Unit Testing</h2>
      <hr />

      <div className="yellow-callout">
        Welcome to Unit Testing, the bedrock of high-quality software
        engineering. In this section, we'll understand what unit testing is, why
        it matters, and how to apply it to your Spring Boot application using
        modern Java testing tools.
        <br />
        <br />
        We'll also look into how to write clean, isolated, and meaningful unit
        tests that improve your codebase's reliability, maintainability, and
        developer confidence.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 What is Unit Testing?
      </h3>
      <div className="blue-card-section">
        <b>
          Unit Testing is a technique where you test small, isolated "units" of
          code — usually a single method or class — to verify they behave as
          expected.
        </b>

        <p style={{ marginTop: "1rem" }}>In the context of Spring Boot:</p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            A <b>controller test</b> checks if the endpoint returns the correct
            status, message, and structure.
          </li>
          <li>
            A <b>service test</b> verifies that the business logic performs
            correctly and handles edge cases.
          </li>
          <li>
            A <b>repository test</b> mocks or uses in-memory databases to check
            query methods.
          </li>
        </ul>

        <p style={{ marginTop: "1rem" }}>
          Each of these ensures your code behaves correctly, independently of
          the rest of the application.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why Unit Tests Matter
      </h3>
      <div className="blue-card-section">
        <b>
          Without unit tests, you're flying blind. Here's what good unit tests
          enable:
        </b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>✅ Catch bugs early during development</li>
          <li>🔄 Safely refactor code without fear of breaking it</li>
          <li>🚀 Speed up development with confidence</li>
          <li>🧪 Ensure correctness before integration or deployment</li>
          <li>
            👨‍💻 Help other developers understand intent and expected behavior
          </li>
        </ul>

        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
          <b>Unit tests act like a safety net for your code.</b>
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Tools for Unit Testing in Spring Boot
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Tool</th>
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
        ✅ Best Practices for Writing Unit Tests
      </h3>
      <div className="blue-card-section">
        <b>
          Here are some tips to make your unit tests powerful and maintainable:
        </b>
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bestPracticesList.map((practice, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              <b>{practice.split(" - ")[0]}</b> - {practice.split(" - ")[1]}
            </li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Setup: JUnit + Mockito in Spring Boot
      </h3>
      <div className="blue-card-section">
        <b>Make sure your pom.xml includes the testing dependencies:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.dependencies ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.dependencies, "dependencies")
            }
          >
            {copied.dependencies ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.dependencies}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Example: Unit Test for AuthService
      </h3>
      <div className="blue-card-section">
        <b>
          Let's say your AuthService has a method signUp() that handles user
          registration.
        </b>

        <h4
          style={{
            color: "#1769aa",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          🔧 Sample Method to Test:
        </h4>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.serviceMethod ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.serviceMethod, "serviceMethod")
            }
          >
            {copied.serviceMethod ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.serviceMethod}</code>
          </pre>
        </div>

        <h4
          style={{
            color: "#1769aa",
            marginTop: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          ✅ Unit Test with Mockito:
        </h4>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.unitTest ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.unitTest, "unitTest")}
          >
            {copied.unitTest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.unitTest}</code>
          </pre>
        </div>
      </div>

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
            <b>Q1: What is the goal of unit testing?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To test individual components or methods in
                isolation.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q2: Which libraries are commonly used for unit testing in Spring
              Boot?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> JUnit 5 and Mockito.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: Why do we use mocks in unit tests?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To simulate dependencies (like databases) and
                focus only on the logic under test.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: Where should unit tests reside in your project structure?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Inside src/test/java/ mirroring your main package
                structure.
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
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ol>

        <p style={{ marginTop: "1rem" }}>
          <b>💡 Bonus:</b> Try mocking exceptions and test how your service
          handles failures.
        </p>
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

export default Topic11Subtopic0Content;

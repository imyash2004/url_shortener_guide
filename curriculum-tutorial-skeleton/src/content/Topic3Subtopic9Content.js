import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  unitTest: `@SpringBootTest
public class UrlServiceTest {

    @MockBean
    private UrlRepository urlRepository;

    @Autowired
    private UrlService urlService;

    @Test
    public void testCreateUrl_Success() {
        Url url = Url.builder()
            .originalUrl("https://example.com")
            .shortUrl("ex123")
            .createdAt(LocalDateTime.now())
            .build();

        Mockito.when(urlRepository.save(Mockito.any(Url.class))).thenReturn(url);

        Url created = urlService.createUrl(url);
        Assertions.assertNotNull(created);
        Assertions.assertEquals("ex123", created.getShortUrl());
    }

    // Add more tests for update, delete, exception scenarios
}
`,
  integrationTest: `@WebMvcTest(UrlController.class)
public class UrlControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UrlService urlService;

    @Test
    public void testCreateUrlAPI() throws Exception {
        UrlResponseDto responseDto = new UrlResponseDto("ex123", "https://example.com");

        Mockito.when(urlService.createUrl(Mockito.any())).thenReturn(responseDto);

        mockMvc.perform(post("/api/urls")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"originalUrl\": \"https://example.com\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.shortUrl").value("ex123"))
            .andExpect(jsonPath("$.originalUrl").value("https://example.com"));
    }

    // More tests for other APIs and failure scenarios
}
`,
};

const learningOutcomes = [
  "Understand different types of tests: unit, integration, and end-to-end",
  "Write unit tests for service methods with mock dependencies",
  "Perform integration tests for REST endpoints with Spring’s MockMvc",
  "Validate API request and response data",
  "Automate testing to run on every build",
];

const whyTesting = [
  ["Bugs and regressions go unnoticed", "Early detection and easier debugging"],
  [
    "Manual testing is time-consuming",
    "Automated and repeatable testing saves time",
  ],
  [
    "Unclear if code changes break features",
    "Confidence in refactoring and enhancements",
  ],
  ["Unreliable API behavior", "Stable and predictable API endpoints"],
];

const testTypes = [
  [
    "Unit Tests",
    "Test individual methods/classes in isolation",
    "JUnit, Mockito",
  ],
  [
    "Integration Tests",
    "Test components working together (e.g., DB + Service)",
    "Spring Boot Test, @SpringBootTest",
  ],
  ["Controller Tests", "Test REST API endpoints", "MockMvc, @WebMvcTest"],
];

const strategy = [
  "Unit Test Service Layer: Mock the repository layer, test create/read/update/delete logic and exception cases.",
  "Integration Test Controller Layer: Use MockMvc to send HTTP requests, validate status codes, response body, and error handling.",
  "Database Testing: Use H2 in-memory database for integration tests, verify data is correctly saved, updated, or deleted.",
];

const tryItTasks = [
  "Write unit tests for your UrlService methods using Mockito",
  "Create integration tests for your URL CRUD endpoints with MockMvc",
  "Test successful and failure cases (e.g., URL not found, invalid input)",
  "Validate that your APIs return correct HTTP status codes (200, 201, 404, 400)",
  "Automate tests to run on project build or CI pipeline",
];

const discussionPrompts = [
  {
    q: "What is the difference between a unit test and an integration test?",
    a: "Unit tests isolate single components or methods; integration tests verify how components work together.",
  },
  {
    q: "Why use MockMvc for testing REST controllers?",
    a: "MockMvc simulates HTTP requests without starting a server, making tests fast and reliable.",
  },
  {
    q: "How does using an in-memory database help testing?",
    a: "It allows running tests without an external DB setup, making tests faster and more isolated.",
  },
  {
    q: "Why test failure cases like invalid inputs?",
    a: "To ensure your API handles errors gracefully and securely without crashing or exposing sensitive info.",
  },
];

const bestPractices = [
  ["Test both success and failure cases", "Covers all possible scenarios"],
  ["Keep tests isolated and independent", "Easier debugging and maintenance"],
  ["Use descriptive test method names", "Clear understanding of test purpose"],
  ["Mock external dependencies", "Faster and focused unit tests"],
  ["Automate tests in CI/CD pipelines", "Continuous quality assurance"],
];

const summaryTable = [
  ["Testing Area", "Tools/Annotations", "Focus"],
  ["Unit Testing", "JUnit, Mockito", "Service layer methods"],
  [
    "Integration Testing",
    "@SpringBootTest, H2 DB",
    "Service + Repository integration",
  ],
  ["Controller Testing", "MockMvc, @WebMvcTest", "REST API endpoints"],
];

const Topic3Subtopic9Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 3.9 – Testing CRUD Operations</h2>
      <hr />
      <div className="yellow-callout">
        <b>Overview: Ensuring Your APIs Work Correctly</b>
        <br />
        After building your Create, Read, Update, and Delete (CRUD) APIs, the
        next essential step is to <b>verify</b> that they work as expected.
        Testing ensures reliability, prevents bugs, and boosts confidence in
        your application’s stability.
        <br />
        <br />
        In this section, you will learn how to <b>
          write and perform tests
        </b>{" "}
        for your CRUD operations in the URL shortener project using{" "}
        <b>Spring Boot’s testing tools</b>.<br />
        <br />
        <i>
          Think of testing as your app’s safety net — catching issues early so
          users don’t face them later.
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        {learningOutcomes.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📚 Why Testing CRUD Operations is Critical
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Without Testing</th>
            <th>With Testing</th>
          </tr>
        </thead>
        <tbody>
          {whyTesting.map(([w, t], i) => (
            <tr key={i}>
              <td>{w}</td>
              <td>{t}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Types of Tests in Spring Boot
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Test Type</th>
            <th>Purpose</th>
            <th>Tools/Annotations</th>
          </tr>
        </thead>
        <tbody>
          {testTypes.map(([type, purpose, tools], i) => (
            <tr key={i}>
              <td>{type}</td>
              <td>{purpose}</td>
              <td>{tools}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Testing Strategy for URL Shortener CRUD
      </h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {strategy.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <ul>
          {tryItTasks.map((t, i) => (
            <li key={i}>🔹 {t}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points (With Answers)
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {item.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{item.a}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([p, r], i) => (
            <tr key={i}>
              <td>✅ {p}</td>
              <td>{r}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Summary Table
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Testing Area</th>
            <th>Tools/Annotations</th>
            <th>Focus</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([a, b, c], i) => (
            <tr key={i}>
              <td>{a}</td>
              <td>{b}</td>
              <td>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Example: Unit Test for{" "}
        <span className="blue-inline-code">UrlService</span> Create Method
      </h3>
      <div className="blue-card-section">
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
        🔧 Example: Integration Test for Create URL API
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
    </div>
  );
};

export default Topic3Subtopic9Content;

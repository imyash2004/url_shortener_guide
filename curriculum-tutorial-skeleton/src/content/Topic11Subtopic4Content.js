import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic11Subtopic4Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const codeBlocks = {
    applicationTestYml: `spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driverClassName: org.h2.Driver
    username: sa
    password:
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true`,
    activeProfiles: `@ActiveProfiles("test")`,
    dataJpaTest: `@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByEmail() {
        User user = new User("test@example.com", "John", "Doe", "password");
        userRepository.save(user);

        Optional<User> result = userRepository.findByEmail("test@example.com");
        assertTrue(result.isPresent());
    }
}`,
    sqlAnnotation: `@Sql(scripts = "/sql/init.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/sql/cleanup.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)`,
    folderStructure: `src/test/resources/sql/
├── init.sql
├── cleanup.sql`,
    builderMethod: `public static UrlMapping createUrlMapping(User user, Organization org) {
    UrlMapping mapping = new UrlMapping();
    mapping.setShortCode("abc123");
    mapping.setOriginalUrl("https://example.com");
    mapping.setOrganization(org);
    mapping.setUser(user);
    return mapping;
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

  const summaryTable = [
    ["In-memory DB (H2)", "Fast, isolated DB that resets after each test"],
    ["@DataJpaTest", "Lightweight setup for repository testing"],
    ["@Sql", "Loads and clears test data using SQL files"],
    ["TestUtils.java", "Creates consistent, reusable data objects"],
    ["application-test.yml", "Controls database config in test environment"],
  ];

  const whyManagementBenefits = [
    "Each test runs independently",
    "You can safely run all tests in any order",
    "No unexpected failures due to shared state",
  ];

  const problemScenarios = [
    "You write a test to save a new user.",
    "You run the test again, and it fails because the user already exists.",
    "Or worse — one test breaks another because they share a common DB state.",
  ];

  const strategies = [
    {
      number: "1️⃣",
      title: "Use In-Memory Databases",
      description:
        "Use H2 Database for all tests, so it starts fresh every time.",
    },
    {
      number: "2️⃣",
      title: "Use @DataJpaTest for Repository Tests",
      description:
        "Spring provides a convenient annotation that sets up an in-memory DB and scans only your repositories.",
    },
    {
      number: "3️⃣",
      title: "Use @Sql for Preloading Data",
      description:
        "For integration tests, load SQL before and after test execution.",
    },
    {
      number: "4️⃣",
      title: "Use Builder or Factory Methods for Dummy Data",
      description: "Combine this with your TestUtils class.",
    },
  ];

  const tryItTasks = [
    "Use @DataJpaTest to write a test for OrganizationRepository",
    "Add SQL files to preload 2 organizations and test findByShortName()",
    "Use an H2 DB for test profile",
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🧪 11.5 – Test Data Management</h2>
      <hr />

      <div className="yellow-callout">
        In this section, we'll explore how to{" "}
        <b>create, use, and clean up test data</b> during automated testing.
        Whether you're testing repositories or running end-to-end tests,
        controlling test data is essential for consistency, repeatability, and
        reliability.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Test Data Management Matters?
      </h3>
      <div className="blue-card-section">
        <p>
          <b>Imagine this:</b>
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {problemScenarios.map((scenario, idx) => (
            <li key={idx}>{scenario}</li>
          ))}
        </ul>

        <div className="yellow-callout" style={{ marginTop: "1rem" }}>
          <b>🚫 That's called test coupling, and it's dangerous.</b>
        </div>

        <p style={{ marginTop: "1rem" }}>
          <b>👉 Proper test data isolation ensures:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {whyManagementBenefits.map((benefit, idx) => (
            <li key={idx}>✅ {benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Strategies for Managing Test Data
      </h3>
      <div className="blue-card-section">
        <p>
          Let's break this down into the most effective and beginner-friendly
          practices for managing test data in Spring Boot projects:
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          {strategies.map((strategy, idx) => (
            <div key={idx} style={{ marginBottom: "1.5rem" }}>
              <h4 style={{ color: "#1769aa", marginBottom: "0.5rem" }}>
                {strategy.number} {strategy.title}
              </h4>
              <p>{strategy.description}</p>

              {idx === 0 && (
                <>
                  <p style={{ marginTop: "1rem" }}>
                    <b>✅ Add this to your application-test.yml:</b>
                  </p>
                  <div
                    className="topic-codeblock code-with-copy"
                    style={{ margin: "0.7rem 0" }}
                  >
                    <button
                      className={`copy-button ${
                        copied.applicationTestYml ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(
                          codeBlocks.applicationTestYml,
                          "applicationTestYml"
                        )
                      }
                    >
                      {copied.applicationTestYml ? "Copied!" : "Copy"}
                    </button>
                    <pre>
                      <code>{codeBlocks.applicationTestYml}</code>
                    </pre>
                  </div>

                  <p style={{ marginTop: "1rem" }}>
                    <b>✅ Activate it using:</b>
                  </p>
                  <div
                    className="topic-codeblock code-with-copy"
                    style={{ margin: "0.7rem 0" }}
                  >
                    <button
                      className={`copy-button ${
                        copied.activeProfiles ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(
                          codeBlocks.activeProfiles,
                          "activeProfiles"
                        )
                      }
                    >
                      {copied.activeProfiles ? "Copied!" : "Copy"}
                    </button>
                    <pre>
                      <code>{codeBlocks.activeProfiles}</code>
                    </pre>
                  </div>
                </>
              )}

              {idx === 1 && (
                <>
                  <div
                    className="topic-codeblock code-with-copy"
                    style={{ margin: "0.7rem 0" }}
                  >
                    <button
                      className={`copy-button ${
                        copied.dataJpaTest ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(codeBlocks.dataJpaTest, "dataJpaTest")
                      }
                    >
                      {copied.dataJpaTest ? "Copied!" : "Copy"}
                    </button>
                    <pre>
                      <code>{codeBlocks.dataJpaTest}</code>
                    </pre>
                  </div>

                  <div className="yellow-callout" style={{ marginTop: "1rem" }}>
                    <b>💡</b> No need for manual cleanup — the database resets
                    after each test!
                  </div>
                </>
              )}

              {idx === 2 && (
                <>
                  <p style={{ marginTop: "1rem" }}>
                    For integration tests, load SQL before and after test
                    execution:
                  </p>
                  <div
                    className="topic-codeblock code-with-copy"
                    style={{ margin: "0.7rem 0" }}
                  >
                    <button
                      className={`copy-button ${
                        copied.sqlAnnotation ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(
                          codeBlocks.sqlAnnotation,
                          "sqlAnnotation"
                        )
                      }
                    >
                      {copied.sqlAnnotation ? "Copied!" : "Copy"}
                    </button>
                    <pre>
                      <code>{codeBlocks.sqlAnnotation}</code>
                    </pre>
                  </div>

                  <p style={{ marginTop: "1rem" }}>
                    🔹 <b>init.sql</b> – Insert users or orgs you want to test
                    <br />
                    🔹 <b>cleanup.sql</b> – Delete everything after the test
                    ends
                  </p>

                  <p style={{ marginTop: "1rem" }}>
                    <b>📁 Folder Structure:</b>
                  </p>
                  <div
                    className="topic-codeblock code-with-copy"
                    style={{ margin: "0.7rem 0" }}
                  >
                    <button
                      className={`copy-button ${
                        copied.folderStructure ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(
                          codeBlocks.folderStructure,
                          "folderStructure"
                        )
                      }
                    >
                      {copied.folderStructure ? "Copied!" : "Copy"}
                    </button>
                    <pre>
                      <code>{codeBlocks.folderStructure}</code>
                    </pre>
                  </div>
                </>
              )}

              {idx === 3 && (
                <>
                  <p style={{ marginTop: "1rem" }}>
                    Combine this with your TestUtils class:
                  </p>
                  <div
                    className="topic-codeblock code-with-copy"
                    style={{ margin: "0.7rem 0" }}
                  >
                    <button
                      className={`copy-button ${
                        copied.builderMethod ? "copied" : ""
                      }`}
                      onClick={() =>
                        copyToClipboard(
                          codeBlocks.builderMethod,
                          "builderMethod"
                        )
                      }
                    >
                      {copied.builderMethod ? "Copied!" : "Copy"}
                    </button>
                    <pre>
                      <code>{codeBlocks.builderMethod}</code>
                    </pre>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <b>❓ Q&A</b>
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
            <b>Q1: What is the safest way to isolate DB tests?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Use an in-memory DB like H2 and clear data
                between tests.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q2: What annotation sets up repository-only testing?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> @DataJpaTest
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: How to preload SQL data before tests?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Use @Sql(scripts = "...", executionPhase =
                BEFORE_TEST_METHOD)
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: How do you make reusable test data?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Create factory methods in TestUtils.java
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🎯 Task:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          <b>💡 Bonus:</b> Add validation — make sure duplicate{" "}
          <span className="blue-inline-code">shortName</span> fails the test
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

export default Topic11Subtopic4Content;

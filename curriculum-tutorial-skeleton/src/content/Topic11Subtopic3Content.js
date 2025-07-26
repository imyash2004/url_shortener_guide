import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic11Subtopic3Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const codeBlocks = {
    testConfig: `package com.url_shortener;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@TestConfiguration
public class TestConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
    testUtils: `package com.url_shortener;

import com.url_shortener.dto.SignInRequest;
import com.url_shortener.dto.SignUpRequest;
import com.url_shortener.entity.User;

public class TestUtils {

    public static SignUpRequest createSignUpRequest() {
        SignUpRequest request = new SignUpRequest();
        request.setFirstName("John");
        request.setLastName("Doe");
        request.setEmail("john@example.com");
        request.setPassword("password123");
        return request;
    }

    public static SignInRequest createSignInRequest() {
        SignInRequest request = new SignInRequest();
        request.setEmail("john@example.com");
        request.setPassword("password123");
        return request;
    }

    public static User createTestUser() {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        return user;
    }
}`,
    usingConfig: `@WebMvcTest(AuthController.class)
@Import(TestConfig.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper; // Provided by TestConfig

    @MockBean
    private AuthService authService;

    // Now reuse TestUtils.createSignUpRequest(), etc.
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
    ["TestConfig", "Centralizes beans like ObjectMapper, PasswordEncoder"],
    ["TestUtils", "Provides reusable test data (DTOs, Entities)"],
    ["@Import", "Injects your config into the test class"],
    ["Reusability", "Minimizes redundancy, improves consistency"],
  ];

  const whyConfigBenefits = [
    "Centralize common beans like ObjectMapper",
    "Configure mocks like JwtProvider, PasswordEncoder, etc.",
    "Create reusable test data in a utility class",
    "Avoid duplication in all test classes",
  ];

  const redundantTasks = [
    "Creating ObjectMapper",
    "Mocking PasswordEncoder",
    "Setting security filters",
    "Reusing test data (SignUpRequest, User)",
  ];

  const tryItTasks = [
    "ObjectMapper",
    "PasswordEncoder",
    "JwtProvider (mocked if needed)",
  ];

  const tryItTestUtils = ["Sample User, Organization, UrlMapping"];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🧪 11.4 – Test Configuration</h2>
      <hr />

      <div className="yellow-callout">
        In this section, we'll focus on setting up{" "}
        <b>custom configurations for testing</b> so you don't have to duplicate
        code across all test classes.
        <p style={{ marginTop: "1rem" }}>
          Whether it's object mappers, mock beans, JWT constants, or test
          utility methods — organizing these in a single place will save time
          and avoid clutter.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚀 Why Create a Test Configuration?
      </h3>
      <div className="blue-card-section">
        <p>
          <b>Imagine this...</b>
        </p>
        <p>Every test class you write repeats things like:</p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {redundantTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>

        <div className="yellow-callout" style={{ marginTop: "1rem" }}>
          <b>🔁 That's redundant and violates DRY (Don't Repeat Yourself)!</b>
        </div>

        <p style={{ marginTop: "1rem" }}>
          <b>👉 With a shared test configuration, you can:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {whyConfigBenefits.map((benefit, idx) => (
            <li key={idx}>✅ {benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Step 1: Create TestConfig.java
      </h3>
      <div className="blue-card-section">
        <p>
          This class will register common test-specific beans that can be
          imported into test classes using{" "}
          <span className="blue-inline-code">@Import(TestConfig.class)</span>.
        </p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.testConfig ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.testConfig, "testConfig")}
          >
            {copied.testConfig ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.testConfig}</code>
          </pre>
        </div>

        <div className="yellow-callout" style={{ marginTop: "1rem" }}>
          <b>💡</b> <span className="blue-inline-code">@TestConfiguration</span>{" "}
          is like <span className="blue-inline-code">@Configuration</span> but
          used only for test contexts.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧰 Step 2: Create TestUtils.java for Sample Data
      </h3>
      <div className="blue-card-section">
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.testUtils ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.testUtils, "testUtils")}
          >
            {copied.testUtils ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.testUtils}</code>
          </pre>
        </div>

        <div className="yellow-callout" style={{ marginTop: "1rem" }}>
          <b>✅</b> This allows you to reuse dummy objects across all your test
          classes without rewriting them.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Step 3: Using Config in Test Classes
      </h3>
      <div className="blue-card-section">
        <p>Here's how to plug in your shared config and utils:</p>

        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.usingConfig ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.usingConfig, "usingConfig")
            }
          >
            {copied.usingConfig ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.usingConfig}</code>
          </pre>
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
            <b>Q1: What does @TestConfiguration do?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> It defines configuration classes that are only
                loaded in the Spring test context.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q2: Why create TestUtils.java?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> To reuse common sample data across test classes
                without duplicating logic.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q3: What's the benefit of centralizing beans in TestConfig?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Simplifies test classes and avoids repeating
                boilerplate code like ObjectMapper, PasswordEncoder.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>Q4: Can I mock external services in TestConfig?</b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Yes, you can declare mock beans (e.g., Mock
                EmailService) and inject them into the test context.
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
        <p style={{ marginTop: "0.5rem" }}>
          Create your own TestConfig.java with:
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {task}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          <b>Create TestUtils.java to return:</b>
        </p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {tryItTestUtils.map((util, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {util}
            </li>
          ))}
        </ul>

        <p style={{ marginTop: "1rem" }}>
          Use{" "}
          <span className="blue-inline-code">@Import(TestConfig.class)</span> in
          your test classes
        </p>

        <p style={{ marginTop: "1rem" }}>
          <b>💡 Bonus:</b> Add a{" "}
          <span className="blue-inline-code">MockMvcRequestBuilderFactory</span>{" "}
          to build custom requests with headers (like Bearer tokens) pre-added!
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([component, purpose], idx) => (
            <tr key={idx}>
              <td>
                <b>{component}</b>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic11Subtopic3Content;

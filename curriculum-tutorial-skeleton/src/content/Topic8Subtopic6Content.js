import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  preAuthorizeExample: `@PreAuthorize("hasRole('ADMIN') and principal == #email")`,
  customAnnotation: `@IsAdminAndOwner`,
  enableMethodSecurity: `@EnableMethodSecurity(prePostEnabled = true)`,
  isAdminAnnotation: `@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole('ADMIN')")
public @interface IsAdmin {
}`,
  isSelfAnnotation: `@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@securityUtil.getCurrentUserEmail().equals(#email)")
public @interface IsSelf {
}`,
  isAdminOrSelfAnnotation: `@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole('ADMIN') or @securityUtil.getCurrentUserEmail().equals(#email)")
public @interface IsAdminOrSelf {
}`,
  controllerExample: `@IsAdmin
@GetMapping("/admin/dashboard")
public String showAdminPage() {
    return "Admin only content";
}

@IsSelf
@GetMapping("/user/{email}")
public UserDto getOwnData(@PathVariable String email) {
    return userService.getByEmail(email);
}`
};

const summaryTable = [
  ["Custom annotations", "Encapsulate repeated security expressions"],
  ["@PreAuthorize", "Evaluates access rules **before** method executes"],
  ["SpEL", "Lets you compare roles, email, beans, params"],
  ["Cleaner controllers", "Makes code easier to read and maintain"]
];

const discussionPrompts = [
  {
    q: "Why use custom annotations instead of writing logic in controllers?",
    a: "For code clarity, reuse, and security centralization"
  },
  {
    q: "What language does @PreAuthorize use?",
    a: "SpEL (Spring Expression Language)"
  },
  {
    q: "How can you reference beans like SecurityUtil in expressions?",
    a: "Use @beanName.method() in the annotation"
  },
  {
    q: "What if you want to check both role and email match?",
    a: "Combine checks using logical and or or in the @PreAuthorize value"
  }
];

const tryItTasks = [
  {
    title: "Create @IsAdmin Annotation",
    description: [
      "Create an annotation as shown above",
      "Use it on an admin-only method",
      "Try accessing as a regular user → ❌ Forbidden"
    ]
  },
  {
    title: "Create @IsSelf Annotation",
    description: [
      "Accept an email as path or method param",
      "In the annotation, compare with logged-in user's email",
      "Access another user's data → ❌ Denied",
      "Access your own → ✅ Success"
    ]
  }
];

const Topic8Subtopic6Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🏷️ 8.6 – Custom Annotations</h2>
      <hr />
      <div className="yellow-callout">
        Custom annotations allow us to <b>wrap common security checks</b> into simple, reusable tags that make your code more expressive and less error-prone.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤔 Why Use Custom Security Annotations?
      </h3>
      <div className="blue-card-section">
        <p>Imagine this:</p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.preAuthorizeExample ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.preAuthorizeExample, "preAuthorizeExample")}
          >
            {copied.preAuthorizeExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.preAuthorizeExample}</code>
          </pre>
        </div>
        <p>Now imagine needing it in multiple places 😵</p>
        <p>Instead of repeating this expression everywhere, we can wrap it like this:</p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.customAnnotation ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.customAnnotation, "customAnnotation")}
          >
            {copied.customAnnotation ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.customAnnotation}</code>
          </pre>
        </div>
        <p>This improves:</p>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>✅ Code readability</li>
          <li>✅ DRY (Don't Repeat Yourself)</li>
          <li>✅ Separation of concerns</li>
          <li>✅ Testability and reusability</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Step 1: Enable Global Method Security
      </h3>
      <div className="blue-card-section">
        <p>In your <span className="blue-inline-code">@SpringBootApplication</span> or <span className="blue-inline-code">@Configuration</span> class:</p>
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.enableMethodSecurity ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.enableMethodSecurity, "enableMethodSecurity")}
          >
            {copied.enableMethodSecurity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.enableMethodSecurity}</code>
          </pre>
        </div>
        <p>This enables annotations like <span className="blue-inline-code">@PreAuthorize</span> and <span className="blue-inline-code">@PostAuthorize</span>.</p>
        <div className="yellow-callout">
          ✅ Already done if you've completed Section 8.3
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Step 2: Define a Custom Annotation
      </h3>
      <div className="blue-card-section">
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.isAdminAnnotation ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.isAdminAnnotation, "isAdminAnnotation")}
          >
            {copied.isAdminAnnotation ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.isAdminAnnotation}</code>
          </pre>
        </div>
        
        <p>You can also define more advanced ones:</p>
        
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.isSelfAnnotation ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.isSelfAnnotation, "isSelfAnnotation")}
          >
            {copied.isSelfAnnotation ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.isSelfAnnotation}</code>
          </pre>
        </div>
        
        <p>Or combine both:</p>
        
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.isAdminOrSelfAnnotation ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.isAdminOrSelfAnnotation, "isAdminOrSelfAnnotation")}
          >
            {copied.isAdminOrSelfAnnotation ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.isAdminOrSelfAnnotation}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Step 3: Use It in a Controller or Service
      </h3>
      <div className="blue-card-section">
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.controllerExample ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.controllerExample, "controllerExample")}
          >
            {copied.controllerExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.controllerExample}</code>
          </pre>
        </div>
        <p>Boom! Clean and elegant authorization rules 😍</p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 Behind the Scenes: SpEL + Spring Security
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li><span className="blue-inline-code">@PreAuthorize</span> uses <b>SpEL (Spring Expression Language)</b></li>
          <li>You can access:</li>
          <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
            <li><span className="blue-inline-code">authentication</span> → the whole <span className="blue-inline-code">Authentication</span> object</li>
            <li><span className="blue-inline-code">principal</span> → the user identifier (usually email)</li>
            <li><span className="blue-inline-code">#paramName</span> → method parameters</li>
            <li><span className="blue-inline-code">@beanName</span> → Spring beans (like SecurityUtil)</li>
          </ul>
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
            <h4>🚀 Task {idx + 1}: {task.title}</h4>
            <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
              {task.description.map((step, stepIdx) => (
                <li key={stepIdx} dangerouslySetInnerHTML={{ __html: step.replace(/❌/g, '<span style="color: #d32f2f">❌</span>').replace(/✅/g, '<span style="color: #388e3c">✅</span>') }} />
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
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
              <td>{row[0]}</td>
              <td dangerouslySetInnerHTML={{ __html: row[1].replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic8Subtopic6Content;

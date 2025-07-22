import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  ["AuthRequest", "Holds username & password for login"],
  ["AuthResponse", "Returns JWT token after successful login"],
  ["RegisterRequest", "Optional — supports registration fields"],
  ["Validation", "Ensures only clean and required data flows"],
];

const discussionPrompts = [
  {
    q: "Why shouldn’t we use the User entity directly in controllers?",
    a: "To avoid exposing sensitive fields and to separate DB model from API structure.",
  },
  {
    q: "What is the purpose of AuthResponse?",
    a: "To return the JWT token after successful login.",
  },
  {
    q: "Can we include fields like email and role in a registration DTO?",
    a: "Yes, but sanitize and validate them properly.",
  },
  {
    q: "What annotation ensures a field is not empty in the DTO?",
    a: "@NotBlank (from javax.validation.constraints)",
  },
];

const Topic7Subtopic3Content = () => {
  const [openFAQ, setOpenFAQ] = React.useState(
    Array(discussionPrompts.length).fill(false)
  );
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✉️ 7.3 – Authentication DTOs</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll create <b>DTOs (Data Transfer Objects)</b> for
        login and registration. DTOs are <b>simple Java classes</b> used to
        carry data between processes — in this case, between the frontend/client
        and backend.
        <br />
        <br />
        They help you separate your <b>internal database models</b> from the{" "}
        <b>external API contract</b>, which keeps your application{" "}
        <b>clean, secure, and maintainable</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Use DTOs?
      </h3>
      <div style={{ marginBottom: "1.5rem", padding: "1rem 1.2rem" }}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
        >
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>
              <b>Security:</b> You don’t want to expose your full{" "}
              <span className="blue-inline-code">User</span> entity (especially
              fields like <span className="blue-inline-code">id</span>,{" "}
              <span className="blue-inline-code">password</span>,{" "}
              <span className="blue-inline-code">role</span>, etc.) in API
              responses.
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>
              <b>Validation:</b> DTOs allow you to add custom validation logic
              without modifying your core entity.
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>
              <b>Flexibility:</b> You can shape your request/response payloads
              however you like, independently of your database schema.
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>
              <b>Clean API Contract:</b> DTOs form the bridge between the client
              and backend, making your API more predictable and stable.
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Create Request and Response DTOs
      </h3>
      <div className="blue-card-section">
        You typically need <b>two request DTOs</b> (for login and register) and{" "}
        <b>one response DTO</b> (for token response):
      </div>

      <div className="blue-card-section" style={{ marginTop: "1.2rem" }}>
        <b>📝 AuthRequest (for Login/Register)</b>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
public class AuthRequest {

    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;

    // Getters and Setters
}
`}</pre>
      </div>

      <div className="blue-card-section" style={{ marginTop: "1.2rem" }}>
        <b>📨 AuthResponse (for returning JWT Token)</b>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
public class AuthResponse {

    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    // Getter
    public String getToken() {
        return token;
    }
}
`}</pre>
      </div>

      <div className="blue-card-section" style={{ marginTop: "1.2rem" }}>
        <b>🧾 (Optional) RegisterRequest</b>
        <div style={{ marginBottom: "0.5rem" }}>
          If you want to support <b>extra fields during registration</b> (e.g.,
          email, role):
        </div>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
public class RegisterRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private String role = "USER"; // Default role

    // Optional: email, phone, etc.

    // Getters and Setters
}
`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✨ Key Notes</h3>
      <div className="blue-card-section">
        <ul className="topic-checklist" style={{ margin: 0 }}>
          <li>
            All these classes are <b>POJOs (Plain Old Java Objects)</b>.
          </li>
          <li>
            Decorate fields with <b>validation annotations</b> like{" "}
            <code>@NotBlank</code>, <code>@Size</code>, <code>@Email</code> for
            better input safety.
          </li>
          <li>
            You can use <b>Lombok</b> annotations like <code>@Data</code>,{" "}
            <code>@AllArgsConstructor</code>, and{" "}
            <code>@NoArgsConstructor</code> to reduce boilerplate.
          </li>
        </ul>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthRequest {
    private String username;
    private String password;
}
`}</pre>
        <div style={{ marginTop: "0.5rem" }}>
          Just make sure Lombok is in your dependencies.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
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
          <li>
            Create <b>AuthRequest</b> and <b>AuthResponse</b> DTOs.
          </li>
          <li>
            Add validation annotations for fields like <b>username</b> and{" "}
            <b>password</b>.
          </li>
          <li>
            Use these DTOs in your <b>AuthController</b> (which we’ll build in{" "}
            <b>7.8</b>).
          </li>
          <li>
            <b>Bonus:</b> Create a <b>RegisterRequest</b> DTO that supports
            fields like email, role, and confirmPassword.
          </li>
          <li>
            <b>Bonus:</b> Add a global <b>@ControllerAdvice</b> to handle
            validation errors nicely.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>DTO Class</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([dto, desc], idx) => (
            <tr key={idx}>
              <td>{dto}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Subtopic3Content;

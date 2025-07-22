import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic7Subtopic8Content = () => {
  const [showQ1, setShowQ1] = useState(false);
  const [showQ2, setShowQ2] = useState(false);
  const [showQ3, setShowQ3] = useState(false);
  const [showQ4, setShowQ4] = useState(false);

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🔓 7.8 – Auth Controller (Login/Register)
      </h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll create the <b>AuthController</b>, which:
        <ul className="topic-checklist">
          <li>Accepts HTTP POST requests from the client</li>
          <li>Validates request bodies (DTOs)</li>
          <li>Delegates to AuthService</li>
          <li>
            Returns a structured response (token, success message, or errors)
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why an Auth Controller?
      </h3>
      <div className="blue-card-section">
        Your backend needs <b>entry points</b> for clients like:
        <ul className="topic-checklist">
          <li>Web frontend (React, Angular, etc.)</li>
          <li>Mobile apps</li>
          <li>API consumers (Postman, curl)</li>
        </ul>
        The controller defines these entry points using REST endpoints (
        <code>/api/auth/signup</code>, <code>/api/auth/signin</code>), following
        best practices for:
        <ul className="topic-checklist">
          <li>✅ Route naming</li>
          <li>✅ Input validation</li>
          <li>✅ Clean delegation to services</li>
          <li>✅ Standardized responses</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 AuthController Implementation
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock">{`@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Signup endpoint
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<String>> registerUser(
            @Valid @RequestBody SignUpRequest request) {
        ApiResponse<String> response = authService.register(request);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    /**
     * Login endpoint
     */
    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<AuthResponse>> loginUser(
            @Valid @RequestBody SignInRequest request) {
        ApiResponse<AuthResponse> response = authService.login(request);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 What Each Endpoint Does
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Input DTO</th>
            <th>Output DTO</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>POST</td>
            <td>
              <code>/api/auth/signup</code>
            </td>
            <td>
              <code>SignUpRequest</code>
            </td>
            <td>
              <code>ApiResponse&lt;String&gt;</code>
            </td>
            <td>Registers a new user</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>
              <code>/api/auth/signin</code>
            </td>
            <td>
              <code>SignInRequest</code>
            </td>
            <td>
              <code>ApiResponse&lt;AuthResponse&gt;</code>
            </td>
            <td>Authenticates & returns JWT</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📥 DTOs Recap</h3>
      <div className="blue-card-section">
        <p>Here's what your request/response models likely look like:</p>

        <h4>🔸 SignUpRequest</h4>
        <pre className="topic-codeblock">{`public class SignUpRequest {
    @NotBlank
    private String name;

    @Email
    private String email;

    @Size(min = 6)
    private String password;
    // Getters/Setters
}`}</pre>

        <h4>🔸 SignInRequest</h4>
        <pre className="topic-codeblock">{`public class SignInRequest {
    @Email
    private String email;

    @NotBlank
    private String password;
    // Getters/Setters
}`}</pre>

        <h4>🔸 AuthResponse</h4>
        <pre className="topic-codeblock">{`public class AuthResponse {
    private String token;
    // Constructors, Getters
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 End-to-End Example
      </h3>
      <div className="blue-card-section">
        <h4>
          ✅ Signup Request (POST <code>/api/auth/signup</code>):
        </h4>
        <pre className="topic-codeblock">{`{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "12345678"
}`}</pre>

        <p>
          <strong>Response:</strong>
        </p>
        <pre className="topic-codeblock">{`{
  "status": "success",
  "message": "User registered successfully"
}`}</pre>

        <h4>
          ✅ Login Request (POST <code>/api/auth/signin</code>):
        </h4>
        <pre className="topic-codeblock">{`{
  "email": "alice@example.com",
  "password": "12345678"
}`}</pre>

        <p>
          <strong>Response:</strong>
        </p>
        <pre className="topic-codeblock">{`{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div className="topic-faq">
          <div className="topic-faq-q">
            <b>Q1: What is the role of @RequestBody?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ1(!showQ1)}>
            {showQ1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ1 && (
            <div className="topic-faq-a">
              It maps the incoming JSON body to a Java object (DTO).
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q2: Why use @Valid with DTOs?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ2(!showQ2)}>
            {showQ2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ2 && (
            <div className="topic-faq-a">
              Ensures validation annotations (like @NotBlank, @Email) are
              enforced before calling the service.
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q3: What happens if login credentials are incorrect?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ3(!showQ3)}>
            {showQ3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ3 && (
            <div className="topic-faq-a">
              The service returns an error response, typically with 401
              Unauthorized.
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q4: Why is AuthService injected here?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ4(!showQ4)}>
            {showQ4 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ4 && (
            <div className="topic-faq-a">
              To follow clean architecture (controller → service → repo).
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section">
        <p>🚀 Task:</p>
        <ul className="topic-checklist">
          <li>
            Hit <code>/api/auth/signup</code> and create a new user.
          </li>
          <li>
            Use the same credentials with <code>/api/auth/signin</code>.
          </li>
          <li>
            Copy the returned token and try accessing a protected API with it.
          </li>
        </ul>

        <p>💡 Bonus:</p>
        <ul className="topic-checklist">
          <li>Handle duplicate email during signup</li>
          <li>Return user info (name/email) along with JWT</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>AuthController</code>
            </td>
            <td>Exposes signup and login APIs</td>
          </tr>
          <tr>
            <td>
              <code>POST /signup</code>
            </td>
            <td>Registers a new user</td>
          </tr>
          <tr>
            <td>
              <code>POST /signin</code>
            </td>
            <td>Authenticates a user and returns JWT</td>
          </tr>
          <tr>
            <td>
              <code>@Valid</code>
            </td>
            <td>Triggers automatic field-level validation</td>
          </tr>
          <tr>
            <td>
              <code>ApiResponse&lt;T&gt;</code>
            </td>
            <td>Unified format for success/error responses</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Subtopic8Content;

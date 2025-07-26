import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  ["AuthService", "Business logic for signup & login"],
  ["AuthenticationManager", "Verifies user credentials securely"],
  ["PasswordEncoder", "Secures user password with hashing"],
  ["JwtProvider", "Returns token after successful login"],
  ["ApiResponse", "Consistent response structure"],
];

const discussionPrompts = [
  {
    q: "What does the AuthenticationManager do?",
    a: "Verifies the user’s credentials against stored values (using Spring Security under the hood)",
  },
  {
    q: "What happens if the user is not found or password is wrong?",
    a: "AuthenticationManager throws an exception → your service returns an error response.",
  },
  {
    q: "Why use @Service here?",
    a: "It’s a business layer component, injectable in controllers.",
  },
  {
    q: "Why is password encoded before saving?",
    a: "To avoid storing plain text passwords and reduce the impact of data breaches.",
  },
];

const responsibilities = [
  {
    label: "register()",
    desc: "Validates uniqueness, hashes password, saves user",
  },
  {
    label: "login()",
    desc: "Authenticates using AuthenticationManager and returns token",
  },
  { label: "ApiResponse", desc: "Unified response format for success/failure" },
];

const Topic7Subtopic7Content = () => {
  const [openFAQ, setOpenFAQ] = React.useState(
    Array(discussionPrompts.length).fill(false)
  );
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>⚙️ 7.7 – Auth Service Implementation</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll create the <b>AuthService</b>, which handles the
        complete <b>authentication workflow</b>:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>✅ Signing up users</li>
          <li>✅ Logging in with password encryption</li>
          <li>✅ Returning JWT tokens on success</li>
          <li>✅ Handling invalid credentials</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why an Auth Service?
      </h3>
      <div className="blue-card-section">
        The <span className="blue-inline-code">AuthService</span> acts as a
        bridge between your controller and the security mechanisms. It
        encapsulates:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>User validation</li>
          <li>Password encoding</li>
          <li>Token generation</li>
          <li>Error handling</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          This keeps your controllers thin and logic isolated.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 AuthService Class – Structure
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    /**
     * Registers a new user.
     */
    public ApiResponse<String> register(SignUpRequest signUpRequest) {
        Optional<User> existing = userRepository.findByEmail(signUpRequest.getEmail());
        if (existing.isPresent()) {
            return ApiResponse.error("User with this email already exists");
        }

        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword())); // 🔐 hashed
        user.setRole("ROLE_USER");

        userRepository.save(user);

        return ApiResponse.success("User registered successfully");
    }

    /**
     * Authenticates a user and returns JWT token.
     */
    public ApiResponse<AuthResponse> login(SignInRequest signInRequest) {
        try {
            // 🔐 Perform authentication using credentials
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    signInRequest.getEmail(),
                    signInRequest.getPassword()
                )
            );

            // 🪙 Generate JWT
            String token = jwtProvider.generateToken(auth);
            return ApiResponse.success(new AuthResponse(token));

        } catch (Exception e) {
            return ApiResponse.error("Invalid email or password");
        }
    }
}
`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Key Responsibilities
      </h3>
      <div
        style={{
          margin: "1.2rem 0 1.5rem 0",
          padding: "1.2rem 1.5rem",
          borderRadius: "10px",
          background: "#f8fbff",
          border: "1.5px solid #e3eefd",
        }}
      >
        <ul style={{ margin: 0 }}>
          <li>
            <b>register():</b> Validates uniqueness, hashes password, saves user
          </li>
          <li>
            <b>login():</b> Authenticates using{" "}
            <span className="blue-inline-code">AuthenticationManager</span> and
            returns token
          </li>
          <li>
            <b>ApiResponse:</b> Unified response format for success/failure
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 Important Details
      </h3>
      <div className="blue-card-section">
        <b>Password Encryption:</b>
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`passwordEncoder.encode(signUpRequest.getPassword())`}</pre>
        You're using <b>BCrypt</b>, which is safe, salted, and slow (which is
        good for security).
      </div>
      <div className="blue-card-section">
        <b>Authentication Manager:</b>
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`authenticationManager.authenticate(...)`}</pre>
        This triggers Spring Security's internal validation logic (with{" "}
        <span className="blue-inline-code">UserDetailsService</span> behind the
        scenes).
      </div>
      <div className="blue-card-section">
        <b>JWT Token:</b>
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`jwtProvider.generateToken(auth)`}</pre>
        After login, the JWT is generated and returned.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 User Repository Helper
      </h3>
      <div className="blue-card-section">
        Make sure your <span className="blue-inline-code">UserRepository</span>{" "}
        has this method:
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`Optional<User> findByEmail(String email);`}</pre>
        This is used during both signup (to check for duplicates) and login
        (internally via{" "}
        <span className="blue-inline-code">UserDetailsService</span>).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Example Workflow
      </h3>
      <div className="blue-card-section">
        <b>Signup:</b>
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`POST /api/auth/signup`}</pre>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "123456"
}`}</pre>
        <b>Response:</b>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`{
  "status": "success",
  "message": "User registered successfully"
}`}</pre>
        <b>Login:</b>
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`POST /api/auth/signin`}</pre>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`{
  "email": "alice@example.com",
  "password": "123456"
}`}</pre>
        <b>Response:</b>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
  }
}`}</pre>
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
            Implement the <span className="blue-inline-code">AuthService</span>{" "}
            class.
          </li>
          <li>
            Hook it into your{" "}
            <span className="blue-inline-code">AuthController</span> (coming
            next in 7.8).
          </li>
          <li>Test via Postman or curl to simulate signup/login.</li>
          <li>
            <b>Bonus:</b> Add role selection during signup (
            <span className="blue-inline-code">ROLE_ADMIN</span>,{" "}
            <span className="blue-inline-code">ROLE_USER</span>)
          </li>
          <li>
            <b>Bonus:</b> Send response with user's name/email along with JWT.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, desc], idx) => (
            <tr key={idx}>
              <td>{feature}</td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Subtopic7Content;

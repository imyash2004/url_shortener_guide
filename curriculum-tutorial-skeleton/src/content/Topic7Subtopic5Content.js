import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  ["JWT Token", "Secure, self-contained token for authentication"],
  ["JwtProvider", "Class that builds and signs the token"],
  ["generateToken()", "Adds email and roles to token payload"],
  ["Signature", "Ensures token is not forged"],
  ["Expiration", "Forces clients to re-authenticate after timeout"],
];

const discussionPrompts = [
  {
    q: "What information is stored inside a JWT?",
    a: "Claims like email, roles, issued time, and expiration.",
  },
  {
    q: "Why is the JWT signed?",
    a: "To ensure it hasn't been tampered with and to validate authenticity.",
  },
  {
    q: "Where should JWT be stored on the client side?",
    a: "Usually in memory, localStorage, or secure HTTP-only cookies.",
  },
  {
    q: "How does the server validate a token later?",
    a: "It parses and verifies the signature using the same secret key.",
  },
];

const jwtChecklist = [
  {
    label: "No need to store sessions in DB",
  },
  {
    label: "Works perfectly for RESTful APIs",
  },
  {
    label: "Tokens are ",
    strong: "self-contained",
    suffix: " (contain all needed info)",
  },
  {
    label: "They can be ",
    strong: "verified anywhere",
    suffix: ", including microservices",
  },
];

const Topic7Subtopic5Content = () => {
  const [openFAQ, setOpenFAQ] = React.useState(
    Array(discussionPrompts.length).fill(false)
  );
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🔐 7.5 – JWT Token Generation</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll understand what <b>JWT (JSON Web Tokens)</b> are,
        why they are crucial for building scalable APIs, and how to generate
        them securely using Spring Boot. We'll also walk through your existing{" "}
        <span className="blue-inline-code">JwtProvider</span> class in a very
        descriptive and interactive way.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 What is a JWT?
      </h3>
      <div className="blue-card-section">
        A <b>JWT (JSON Web Token)</b> is a compact, URL-safe token used to{" "}
        <b>securely transmit information</b> between parties. It’s digitally
        signed so it can be verified but <b>not tampered with</b>.
      </div>
      <div className="blue-card-section">
        <b>JWT Structure (3 parts, separated by dots):</b>
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
xxxxx.yyyyy.zzzzz
Header.Payload.Signature
`}</pre>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Part</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Header</td>
              <td>Algorithm & token type (e.g., HS256, JWT)</td>
            </tr>
            <tr>
              <td>Payload</td>
              <td>Claims (data like username, roles)</td>
            </tr>
            <tr>
              <td>Signature</td>
              <td>HMAC-SHA256 signature using secret key</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧠 Why Use JWT?</h3>
      <div
        style={{
          margin: "1.2rem 0 1.5rem 0",
          padding: "1.2rem 1.5rem",
          borderRadius: "10px",
          background: "#f8fbff",
          border: "1.5px solid #e3eefd",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
        >
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>No need to store sessions in DB</div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>Works perfectly for RESTful APIs</div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>
              Tokens are <b>self-contained</b> (contain all needed info)
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "0.7rem" }}
          >
            <span style={{ fontSize: "1.4em", lineHeight: 1.1 }}>✅</span>
            <div>
              They can be <b>verified anywhere</b>, including microservices
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ How JWT Token Generation Works
      </h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>User logs in with credentials.</li>
          <li>
            If valid, backend generates a JWT using:
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              <li>User’s email/username</li>
              <li>Roles/authorities</li>
              <li>Expiration time</li>
            </ul>
          </li>
          <li>The signed token is returned in the response.</li>
          <li>The client stores it (usually in localStorage or memory).</li>
          <li>
            On future requests, client sends the token via the{" "}
            <span className="blue-inline-code">Authorization</span> header.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Your Existing JwtProvider – Explained
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
public class JwtProvider {

    private static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    public String generateToken(Authentication auth) {
        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
        String roles = populateAuthorities(authorities);

        String jwt = Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000)) // Token valid for 24h
                .claim("email", auth.getName())         // Add username/email
                .claim("authorities", roles)            // Add roles
                .signWith(key)                          // Sign using secret key
                .compact();

        return jwt;
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auth = new HashSet<>();
        for (GrantedAuthority ga : authorities) {
            auth.add(ga.getAuthority());
        }
        return String.join(",", auth);
    }
}
`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 What’s Happening Here?
      </h3>
      <div className="blue-card-section">
        <ul className="topic-checklist" style={{ margin: 0 }}>
          <li>
            <span className="blue-inline-code">auth.getName()</span> → gets the
            username or email of the authenticated user.
          </li>
          <li>
            <span className="blue-inline-code">getAuthorities()</span> → gets
            the list of user roles (e.g.,{" "}
            <span className="blue-inline-code">ROLE_ADMIN</span>)
          </li>
          <li>
            <span className="blue-inline-code">.setIssuedAt()</span> and{" "}
            <span className="blue-inline-code">.setExpiration()</span> → define
            token validity (usually 24 hours)
          </li>
          <li>
            <span className="blue-inline-code">.claim(...)</span> → adds extra
            data to the payload.
          </li>
          <li>
            <span className="blue-inline-code">.signWith(key)</span> → signs the
            token with a <b>secure HMAC SHA key</b>
          </li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          The result: a secure, signed token that looks like this:
          <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
`}</pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Where Is This Token Used?
      </h3>
      <div className="blue-card-section">
        The token is returned to the client in{" "}
        <span className="blue-inline-code">AuthResponse</span> (as you defined
        earlier):
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
return new AuthResponse(jwt);
`}</pre>
        Clients must send this token in <b>every request</b> to protected
        endpoints like this:
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
`}</pre>
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
            Generate a token using your{" "}
            <span className="blue-inline-code">JwtProvider</span> after login.
          </li>
          <li>
            Return it to the client as part of{" "}
            <span className="blue-inline-code">AuthResponse</span>.
          </li>
          <li>Add a short expiry for testing (e.g., 10 mins).</li>
          <li>
            Decode the token on{" "}
            <a href="https://jwt.io" target="_blank" rel="noopener noreferrer">
              https://jwt.io
            </a>{" "}
            and explore the claims.
          </li>
          <li>
            <b>Bonus:</b> Add a <span className="blue-inline-code">userId</span>{" "}
            or <span className="blue-inline-code">organizationShortName</span>{" "}
            as custom claim.
          </li>
          <li>
            <b>Bonus:</b> Set token expiry to 15 minutes and refresh with a
            refresh token.
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

export default Topic7Subtopic5Content;

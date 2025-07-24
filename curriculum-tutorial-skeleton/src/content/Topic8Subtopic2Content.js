import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  jwtFilter: `public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                    HttpServletResponse response, 
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JwtConstant.JWT_HEADER); // usually "Authorization"

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Strip "Bearer "

            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                Claims claims = Jwts.parserBuilder()
                                    .setSigningKey(key)
                                    .build()
                                    .parseClaimsJws(jwt)
                                    .getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                List<GrantedAuthority> auths =
                    AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                Authentication authentication =
                    new UsernamePasswordAuthenticationToken(email, null, auths);

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                throw new BadCredentialsException("Invalid token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response); // move forward
    }
}`,
  logExample: `System.out.println("User: " + email + " | Roles: " + authorities);`
};

const keySteps = [
  ["Extract JWT", "Reads header from the request (usually `Authorization`)"],
  ["Strip Prefix", "Removes `Bearer ` to get the raw token"],
  ["Verify Signature", "Uses secret key to validate JWT signature"],
  ["Extract Claims", "Pulls out email and roles from the payload"],
  ["Build Auth Object", "Wraps info in `UsernamePasswordAuthenticationToken`"],
  ["Set Context", "Adds it to `SecurityContextHolder` for Spring to recognize the user"]
];

const summaryTable = [
  ["OncePerRequestFilter", "Intercepts every request exactly once"],
  ["SecurityContextHolder", "Stores the authenticated user details"],
  ["JwtTokenValidator", "Validates token, extracts info, sets context"],
  ["AuthorityUtils", "Converts role strings into `GrantedAuthority` list"],
  ["UsernamePasswordAuthenticationToken", "Represents the authenticated user"]
];

const discussionPrompts = [
  {
    q: "What class is used to build a custom filter?",
    a: "`OncePerRequestFilter`"
  },
  {
    q: "Where is the authentication info stored once the JWT is validated?",
    a: "In `SecurityContextHolder`"
  },
  {
    q: "What happens if the token is invalid?",
    a: "`BadCredentialsException` is thrown"
  },
  {
    q: "Why use `Bearer ` prefix?",
    a: "It's the standard way to include JWT in the Authorization header"
  },
  {
    q: "What utility class converts roles?",
    a: "`AuthorityUtils.commaSeparatedStringToAuthorityList()`"
  }
];

const tryItTasks = [
  {
    title: "Break the JWT",
    description: "Send a request with a malformed or expired token:",
    code: "Authorization: Bearer fake.token.here",
    expected: "401 Unauthorized"
  },
  {
    title: "Use a valid token",
    description: "1. Log in via `/api/auth/signin`\n2. Copy the token from the response\n3. Hit a protected API with:",
    code: "Authorization: Bearer {your_token_here}",
    expected: "Access granted ✅"
  },
  {
    title: "Add logging inside the filter",
    description: "Add this inside your filter to debug user access:",
    code: "System.out.println(\"User: \" + email + \" | Roles: \" + authorities);",
    expected: "Check your console when requests are made. You'll see who accessed what — super useful for debugging!"
  }
];

const Topic8Subtopic2Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🔐 8.2 – JWT Security Filter</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll explore how to implement a <b>custom filter</b> that intercepts every request, extracts the JWT, 
        validates it, and sets the user as authenticated — all before your controller or service logic runs.
        <br /><br />
        This is done using a powerful component called <span className="blue-inline-code">OncePerRequestFilter</span>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 What Is <span className="blue-inline-code">OncePerRequestFilter</span>?
      </h3>
      <div className="blue-card-section">
        This is a Spring class that ensures your custom filter runs <b>once per request</b>. It's ideal for token validation because:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>It sits early in the filter chain</li>
          <li>It works on <b>every incoming HTTP request</b></li>
          <li>It allows you to <b>inspect headers</b>, do validations, and set authentication</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 JwtTokenValidator – Our Custom JWT Filter
      </h3>
      <div className="blue-card-section">
        Here's the full implementation:
        <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
          <button
            className={`copy-button ${copied.jwtFilter ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.jwtFilter, "jwtFilter")}
          >
            {copied.jwtFilter ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.jwtFilter}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Breakdown of Logic
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>What Happens</th>
          </tr>
        </thead>
        <tbody>
          {keySteps.map((step, idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">✅ {step[0]}</span>
              </td>
              <td>{step[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Quick Questions</h4>
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
            <p>{task.description}</p>
            <div className="topic-codeblock code-with-copy" style={{ margin: "0.7rem 0" }}>
              <button
                className={`copy-button ${copied[`task${idx}`] ? "copied" : ""}`}
                onClick={() => copyToClipboard(task.code, `task${idx}`)}
              >
                {copied[`task${idx}`] ? "Copied!" : "Copy"}
              </button>
              <pre>
                <code>{task.code}</code>
              </pre>
            </div>
            <p>
              {task.expected.startsWith("4") ? <span style={{ color: "#d32f2f" }}>🟥 Expected: {task.expected}</span> : 
               task.expected.includes("✅") ? <span style={{ color: "#388e3c" }}>🟩 Expected: {task.expected}</span> :
               <span>Expected: {task.expected}</span>}
            </p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{row[0]}</span>
              </td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic8Subtopic2Content;

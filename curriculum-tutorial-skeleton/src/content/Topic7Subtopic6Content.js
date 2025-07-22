import React from "react";
import "./CustomSectionStyles.css";

const summaryTable = [
  ["JwtTokenValidator", "Custom filter that validates every token"],
  ["Authorization header", "Where the JWT is expected from the client"],
  ["SecurityContext", "Stores authenticated user context"],
  ["@OncePerRequestFilter", "Ensures one-time filter per request lifecycle"],
  ["Token Exception", "Automatically triggers 401 if invalid"],
];

const discussionPrompts = [
  {
    q: "Which header contains the JWT token?",
    a: "Authorization (prefixed with Bearer )",
  },
  {
    q: "What happens if the JWT is expired?",
    a: "An exception is thrown, and 401 Unauthorized is returned.",
  },
  {
    q: "What does SecurityContextHolder do?",
    a: "Stores the authenticated user for the current request.",
  },
  {
    q: "What happens if no token is provided?",
    a: "Spring treats the request as anonymous and restricts protected endpoints.",
  },
];

const howItWorksSteps = [
  "Extract JWT from Authorization header",
  "Remove the Bearer prefix",
  "Validate the token using the signing key",
  "Parse claims: email, authorities",
  "Create an Authentication object",
  "Set the authenticated user in Spring's SecurityContext",
  "Continue the filter chain",
];

const Topic7Subtopic6Content = () => {
  const [openFAQ, setOpenFAQ] = React.useState(
    Array(discussionPrompts.length).fill(false)
  );
  const toggleFAQ = (idx) => {
    setOpenFAQ((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };
  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🔐 7.6 – JWT Token Validation</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll build the logic that validates incoming JWTs to
        allow secure access to protected resources — essentially replicating how{" "}
        <b>sessions work without a database</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why Do We Need JWT Validation?
      </h3>
      <div className="blue-card-section">
        When a user sends a request to a protected route, the server must:
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Check if the <b>JWT exists</b> in the request.
          </li>
          <li>
            Verify the <b>signature</b> of the token.
          </li>
          <li>
            Check if the <b>token is expired</b>.
          </li>
          <li>
            Extract the <b>user identity and roles</b>.
          </li>
          <li>
            Inject that into the <b>SecurityContext</b>, so Spring knows who the
            user is.
          </li>
        </ol>
        <div style={{ marginTop: "1rem" }}>
          Without this, <b>every route would be unprotected</b>, and tokens
          would be meaningless.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Your Existing JwtTokenValidator – Explained
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
public class JwtTokenValidator extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
                Claims claims = Jwts.parserBuilder()
                                    .setSigningKey(key)
                                    .build()
                                    .parseClaimsJws(jwt)
                                    .getBody();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                List<GrantedAuthority> auths = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auths);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                throw new BadCredentialsException("Invalid token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 How This Works
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
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            Extract JWT from{" "}
            <span className="blue-inline-code">Authorization</span> header
          </li>
          <li>
            Remove the <span className="blue-inline-code">Bearer</span> prefix
          </li>
          <li>Validate the token using the signing key</li>
          <li>
            Parse claims: <span className="blue-inline-code">email</span>,{" "}
            <span className="blue-inline-code">authorities</span>
          </li>
          <li>
            Create an <span className="blue-inline-code">Authentication</span>{" "}
            object
          </li>
          <li>
            Set the authenticated user in Spring's{" "}
            <span className="blue-inline-code">SecurityContext</span>
          </li>
          <li>Continue the filter chain</li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚠️ What Happens if Token is Invalid?
      </h3>
      <div className="blue-card-section">
        This part of your code handles invalid JWTs:
        <pre className="topic-codeblock" style={{ margin: "0.7rem 0" }}>{`
catch (Exception e) {
    throw new BadCredentialsException("Invalid token: " + e.getMessage());
}
`}</pre>
        Which then gets translated into a <b>401 response</b> by Spring
        Security.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛡️ SecurityFilterChain Integration
      </h3>
      <div className="blue-card-section">
        You already registered this filter in your config:
        <pre
          className="topic-codeblock"
          style={{ margin: "0.7rem 0" }}
        >{`.addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)`}</pre>
        This ensures <b>every request passes through your token validator</b>{" "}
        before reaching your controller.
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
          <li>Hit a protected route without a token → should return 401.</li>
          <li>Hit the same route with an invalid token → should return 401.</li>
          <li>
            Hit it with a valid token → should return 200 OK and include
            authenticated details.
          </li>
          <li>
            <b>Bonus:</b> Print the logged-in user with:{" "}
            <span className="blue-inline-code">
              SecurityContextHolder.getContext().getAuthentication().getName()
            </span>
          </li>
        </ol>
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

export default Topic7Subtopic6Content;

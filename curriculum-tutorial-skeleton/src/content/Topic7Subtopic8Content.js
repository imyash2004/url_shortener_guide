import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic7Subtopic9Content = () => {
  const [showQ1, setShowQ1] = useState(false);
  const [showQ2, setShowQ2] = useState(false);
  const [showQ3, setShowQ3] = useState(false);
  const [showQ4, setShowQ4] = useState(false);

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>🛡️ 7.9 – JWT Configuration</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we'll explore how to{" "}
        <b>integrate JWT into Spring Security</b> by customizing the{" "}
        <code>SecurityFilterChain</code>. This setup ensures that:
        <ul className="topic-checklist">
          <li>Public routes are accessible without login</li>
          <li>Protected APIs require a valid JWT</li>
          <li>Tokens are validated via a custom filter</li>
          <li>CORS and CSRF are handled properly</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Why JWT Configuration Is Needed?
      </h3>
      <div className="blue-card-section">
        Spring Security, by default, expects <b>session-based</b>{" "}
        authentication. But we're using <b>stateless JWT</b> authentication.
        <br />
        <br />
        So we must:
        <ul className="topic-checklist">
          <li>Turn off sessions</li>
          <li>Inject our JWT validator</li>
          <li>Define public and protected routes</li>
          <li>Add password encoder</li>
          <li>Configure CORS properly</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Configuration Breakdown
      </h3>
      <div className="blue-card-section">
        <p>You already shared this class:</p>
        <pre className="topic-codeblock">{`@Configuration
@EnableWebSecurity
public class AppConfig {

    @Autowired
    private CorsProperties corsProperties;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/s/**", "/api/auth/**", "/api/public/**").permitAll()
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            )
            .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

    private CorsConfigurationSource corsConfigurationSource() {
        return request -> {
            CorsConfiguration cfg = new CorsConfiguration();
            cfg.setAllowedOrigins(corsProperties.getAllowedOrigins());
            cfg.setAllowedMethods(corsProperties.getAllowedMethods());
            cfg.setAllowCredentials(corsProperties.isAllowCredentials());
            cfg.setAllowedHeaders(corsProperties.getAllowedHeaders());
            cfg.setExposedHeaders(corsProperties.getExposedHeaders());
            cfg.setMaxAge(corsProperties.getMaxAge());
            return cfg;
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Let's Understand Each Part
      </h3>

      <h4>✅ SessionCreationPolicy.STATELESS</h4>
      <div className="blue-card-section">
        Disables HTTP sessions. Each request must carry its{" "}
        <b>own authentication token (JWT)</b>.
      </div>

      <h4>✅ authorizeHttpRequests</h4>
      <div className="blue-card-section">
        Defines <b>public and protected</b> routes:
        <ul className="topic-checklist">
          <li>
            <code>/s/**</code>, <code>/api/auth/**</code>,{" "}
            <code>/api/public/**</code> → accessible without login
          </li>
          <li>
            <code>/api/**</code> → requires authentication
          </li>
        </ul>
      </div>

      <h4>✅ addFilterBefore</h4>
      <div className="blue-card-section">
        This is the <b>heart of JWT authentication</b>. It ensures every request
        to a protected route is validated by your <code>JwtTokenValidator</code>
        .
      </div>

      <h4>✅ csrf().disable()</h4>
      <div className="blue-card-section">
        Since JWTs are immune to CSRF, we turn this off.
      </div>

      <h4>✅ cors()</h4>
      <div className="blue-card-section">
        Needed if your frontend is hosted on a different origin.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔐 Password Encoder Bean
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock">{`@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`}</pre>
        <p>
          This bean is <b>required</b> by Spring Security to encrypt passwords
          during signup and match during login.
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Extra: JwtTokenValidator Recap
      </h3>
      <div className="blue-card-section">
        <pre className="topic-codeblock">{`public class JwtTokenValidator extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String jwt = request.getHeader("Authorization");

        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);
            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes()))
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                String email = claims.get("email", String.class);
                String roles = claims.get("authorities", String.class);
                List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(roles);

                Authentication auth = new UsernamePasswordAuthenticationToken(email, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                throw new BadCredentialsException("Invalid token");
            }
        }

        chain.doFilter(request, response);
    }
}`}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔑 What Happens on a Protected Request?
      </h3>
      <div className="blue-card-section">
        <ol className="topic-checklist">
          <li>
            Frontend adds JWT in <code>Authorization</code> header
          </li>
          <li>
            Spring calls <code>JwtTokenValidator</code>
          </li>
          <li>It parses the token, extracts email/roles</li>
          <li>
            Builds an <code>Authentication</code> object
          </li>
          <li>If valid → request continues, else → 401 Unauthorized</li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <div className="topic-faq">
          <div className="topic-faq-q">
            <b>Q1: What is the role of SecurityFilterChain?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ1(!showQ1)}>
            {showQ1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ1 && (
            <div className="topic-faq-a">
              Defines how HTTP requests are secured and which filters handle
              authentication.
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q2: Why disable sessions in JWT-based apps?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ2(!showQ2)}>
            {showQ2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ2 && (
            <div className="topic-faq-a">
              JWT is stateless, sessions are unnecessary.
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q3: Why use JwtTokenValidator?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ3(!showQ3)}>
            {showQ3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ3 && (
            <div className="topic-faq-a">
              To verify and extract user info from JWT on each request.
            </div>
          )}

          <div className="topic-faq-q">
            <b>Q4: What is the use of PasswordEncoder bean?</b>
          </div>
          <button className="reveal-btn" onClick={() => setShowQ4(!showQ4)}>
            {showQ4 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showQ4 && (
            <div className="topic-faq-a">
              Encrypts passwords during signup and checks passwords during
              login.
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
            Add a new protected API like <code>/api/user/me</code> and test:
            <ul>
              <li>Without token → should get 401</li>
              <li>With token → should work</li>
            </ul>
          </li>
        </ul>

        <p>💡 Bonus:</p>
        <ul className="topic-checklist">
          <li>Return user details (email, name, roles) from token claims</li>
        </ul>
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
          <tr>
            <td>
              <code>SecurityFilterChain</code>
            </td>
            <td>Main configuration for HTTP security</td>
          </tr>
          <tr>
            <td>
              <code>JwtTokenValidator</code>
            </td>
            <td>Custom filter to validate JWT</td>
          </tr>
          <tr>
            <td>
              <code>PasswordEncoder</code>
            </td>
            <td>Securely hashes passwords with BCrypt</td>
          </tr>
          <tr>
            <td>
              <code>SessionCreationPolicy</code>
            </td>
            <td>Tells Spring not to use sessions (stateless)</td>
          </tr>
          <tr>
            <td>
              <code>CORS</code>
            </td>
            <td>Ensures browser can call backend from other origins</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic7Subtopic9Content;

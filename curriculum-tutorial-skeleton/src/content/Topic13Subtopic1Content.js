import React, { useState } from 'react';
import './CustomSectionStyles.css';

const Topic13Subtopic1Content = () => {
  const [showAnswers, setShowAnswers] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false
  });

  const toggleAnswer = (questionKey) => {
    setShowAnswers(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }));
  };

  const corsIssues = [
    "Browser blocks requests from localhost:3000 to localhost:8080",
    "Frontend can't call your API from different domains",
    "Development becomes impossible without CORS setup",
    "Production deployment fails when frontend and backend are on different domains"
  ];

  const corsConfiguration = [
    "Allowed Origins - Which domains can access your API",
    "Allowed Methods - GET, POST, PUT, DELETE, etc.",
    "Allowed Headers - Authorization, Content-Type, etc.",
    "Credentials Support - For cookies and auth tokens",
    "Preflight Handling - For complex requests"
  ];

  const testingSteps = [
    "Open browser dev tools (F12)",
    "Go to Network tab",
    "Make a request from frontend to backend",
    "Check if CORS headers are present in response",
    "Verify no CORS errors in console"
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="topic-content">
      <h2 style={{ color: "#1769aa", borderBottom: "3px solid #1769aa", paddingBottom: "10px" }}>
        � 13.1 – CORS Configuration for Frontend Integration
      </h2>
      
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
        In this section, we'll bridge the gap between frontend and backend by ensuring the backend accepts HTTP requests 
        from the frontend — even when they're hosted on <b>different origins</b> (domains or ports).
      </p>

      <p style={{ fontSize: "1rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
        This is where <b>CORS (Cross-Origin Resource Sharing)</b> comes in. CORS is not just a Spring Boot setting — 
        it's a browser security feature that prevents unauthorized cross-origin requests unless explicitly allowed.
      </p>

      <div className="yellow-callout">
        <i>CORS is your bridge between frontend and backend – configure it wrong, and communication breaks entirely.</i>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🌍 Why Do We Need CORS?
      </h3>
      <div className="blue-card-section">
        <p><b>Imagine this:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Your frontend (React, Angular, etc.) runs at: <code>http://localhost:3000</code></li>
          <li>Your backend Spring Boot API runs at: <code>http://localhost:8080</code></li>
        </ul>

        <p style={{ marginTop: "1rem" }}>When the frontend tries to make an API call:</p>
        
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>JavaScript - Frontend API Call</span>
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(`fetch("http://localhost:8080/api/auth/signin")`)}
            >
              Copy
            </button>
          </div>
          <pre>
{`fetch("http://localhost:8080/api/auth/signin")`}
          </pre>
        </div>

        <p style={{ marginTop: "1rem" }}>
          The browser blocks it due to the <b>Same-Origin Policy</b>, unless your backend explicitly allows this origin via CORS.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ The Backend-Side Solution
      </h3>
      <div className="blue-card-section">
        <p>In your Spring Boot application, you've already configured a CORS policy using <code>CorsConfigurationSource</code> inside the <code>AppConfig</code> class.</p>

        <h4><b>🔧 Your Configuration Recap:</b></h4>
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - Security Filter Chain with CORS</span>
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(`@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/s/**", "/api/auth/**", "/api/public/**").permitAll()
            .requestMatchers("/api/**").authenticated()
            .anyRequest().permitAll())
        .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()));
    return http.build();
}`)}
            >
              Copy
            </button>
          </div>
          <pre>
{`@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/s/**", "/api/auth/**", "/api/public/**").permitAll()
            .requestMatchers("/api/**").authenticated()
            .anyRequest().permitAll())
        .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class)
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()));
    return http.build();
}`}
          </pre>
        </div>

        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>Java - CORS Configuration Source</span>
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(`private CorsConfigurationSource corsConfigurationSource() {
    return request -> {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ your frontend origin
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*")); // allow all headers
        config.setExposedHeaders(List.of("Authorization")); // so frontend can read JWT
        config.setAllowCredentials(true); // for cookies or token-based auth
        config.setMaxAge(3600L); // cache pre-flight request
        return config;
    };
}`)}
            >
              Copy
            </button>
          </div>
          <pre>
{`private CorsConfigurationSource corsConfigurationSource() {
    return request -> {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:3000")); // ✅ your frontend origin
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*")); // allow all headers
        config.setExposedHeaders(List.of("Authorization")); // so frontend can read JWT
        config.setAllowCredentials(true); // for cookies or token-based auth
        config.setMaxAge(3600L); // cache pre-flight request
        return config;
    };
}`}
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        � Frontend Perspective
      </h3>
      <div className="blue-card-section">
        <p>When your React app sends a request like:</p>
        
        <div className="topic-codeblock code-with-copy">
          <div className="code-header">
            <span>JavaScript - Frontend Request with Auth</span>
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(`axios.post("http://localhost:8080/api/auth/signin", data, {
  withCredentials: true,
  headers: {
    "Authorization": \`Bearer \${token}\`
  }
});`)}
            >
              Copy
            </button>
          </div>
          <pre>
{`axios.post("http://localhost:8080/api/auth/signin", data, {
  withCredentials: true,
  headers: {
    "Authorization": \`Bearer \${token}\`
  }
});`}
          </pre>
        </div>

        <p style={{ marginTop: "1rem" }}><b>✅ It works without CORS errors because:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>The origin is whitelisted (<code>http://localhost:3000</code>)</li>
          <li>Headers are allowed</li>
          <li>Credentials are enabled</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔐 How It Supports Secure Auth
      </h3>
      <div className="blue-card-section">
        <p>Thanks to your setup:</p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>JWT tokens sent in headers are accepted</li>
          <li>If using cookies (future scope), they'll be included</li>
          <li>Preflight OPTIONS requests are handled gracefully</li>
        </ul>
        
        <p style={{ marginTop: "1rem" }}>
          This ensures <b>secure frontend-backend communication</b> with no compromise on browser rules.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        � Key Takeaways
      </h3>
      <div className="blue-card-section">
        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>✅ Benefit</th>
              <th>🌟 Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Allows cross-origin frontend calls</b></td>
              <td>No CORS error in browser</td>
            </tr>
            <tr>
              <td><b>Enables secure headers & credentials</b></td>
              <td>JWT and cookies work across domains</td>
            </tr>
            <tr>
              <td><b>Ensures safe API access</b></td>
              <td>Only whitelisted origins can communicate</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        � Interactive Q&A
      </h3>

      <div className="blue-card-section discussion-section">
        <p style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "1rem" }}>
          💡 Discussion Questions
        </p>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleAnswer('q1')}
          >
            <span>🤔 Q1: Why does a browser block requests without CORS?</span>
            <span className={`qa-icon ${showAnswers.q1 ? 'rotated' : ''}`}>▼</span>
          </button>
          {showAnswers.q1 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Because of the Same-Origin Policy, which prevents cross-site scripting and data theft. CORS is a secure way to declare who can access your API.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleAnswer('q2')}
          >
            <span>🔒 Q2: What's the role of setAllowCredentials(true)?</span>
            <span className={`qa-icon ${showAnswers.q2 ? 'rotated' : ''}`}>▼</span>
          </button>
          {showAnswers.q2 && (
            <div className="qa-answer">
              <p><b>Answer:</b> It allows cookies or authorization headers (like JWT) to be included in cross-origin requests.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleAnswer('q3')}
          >
            <span>🌐 Q3: Why use setExposedHeaders()?</span>
            <span className={`qa-icon ${showAnswers.q3 ? 'rotated' : ''}`}>▼</span>
          </button>
          {showAnswers.q3 && (
            <div className="qa-answer">
              <p><b>Answer:</b> To make custom headers like Authorization visible to the frontend, otherwise, the browser hides them by default.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleAnswer('q4')}
          >
            <span>⚡ Q4: What is a preflight request?</span>
            <span className={`qa-icon ${showAnswers.q4 ? 'rotated' : ''}`}>▼</span>
          </button>
          {showAnswers.q4 && (
            <div className="qa-answer">
              <p><b>Answer:</b> An OPTIONS request sent by browsers before complex requests to check if the actual request is allowed.</p>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p><b>🔧 Task:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Make a POST <code>/api/auth/signin</code> call from your frontend using fetch or axios.</li>
          <li>Add the <code>Authorization</code> header and use <code>withCredentials: true</code>.</li>
        </ul>

        <p style={{ marginTop: "1rem" }}><b>✅ Expected:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>No CORS error</li>
          <li>Successful login with token in response</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Concept</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>CORS</b></td>
            <td>Controls cross-origin requests to your backend</td>
          </tr>
          <tr>
            <td><b>Spring Boot Config</b></td>
            <td>Enables selected frontend origins and headers</td>
          </tr>
          <tr>
            <td><b>withCredentials</b></td>
            <td>Allows token/cookie transmission across origins</td>
          </tr>
          <tr>
            <td><b>Exposed Headers</b></td>
            <td>Lets frontend read custom headers like Authorization</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic13Subtopic1Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic13Subtopic4Content = () => {
  // Q&A state management for multiple questions
  const [qnaStates, setQnaStates] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false
  });

  const toggleQna = (questionId) => {
    setQnaStates(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Optional: Show a temporary feedback
    });
  };

  return (
    <div className="custom-section">
      <h2 style={{ color: "#1769aa", borderBottom: "2px solid #1769aa" }}>
        13.4 API Testing for Frontend Development
      </h2>

      <div className="blue-card-section">
        <p style={{ fontSize: "1.1rem" }}>
          <b>🎯 Learning Objective:</b> Learn how to test your backend APIs from a frontend developer's perspective using browser tools, Postman, and automated testing strategies to ensure robust frontend-backend integration.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🌐 Browser Development Tools
      </h3>
      <p>
        Your browser's developer tools are your first line of defense for debugging API communication issues.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Network Tab Analysis</h4>
      <div className="topic-codeblock">
        <p><b>Key Things to Check in Network Tab</b></p>
        <pre>
{`// What to look for in browser DevTools Network tab:

1. Request Headers:
   ✅ Authorization: Bearer eyJhbGciOiJIUzI1...
   ✅ Content-Type: application/json
   ✅ Origin: http://localhost:3000

2. Response Status:
   ✅ 200 OK - Success
   ❌ 401 Unauthorized - Token issue
   ❌ 403 Forbidden - Permission issue
   ❌ 404 Not Found - Wrong endpoint
   ❌ 500 Internal Server Error - Backend issue

3. Response Headers:
   ✅ Access-Control-Allow-Origin: http://localhost:3000
   ✅ Content-Type: application/json
   
4. Response Body:
   ✅ Expected JSON structure
   ❌ HTML error page (often means wrong endpoint)

5. Timing:
   ✅ Fast response times (<500ms for simple operations)
   ❌ Timeouts or very slow responses`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`// Network Tab Debugging Checklist\n1. Request Headers: Authorization, Content-Type, Origin\n2. Response Status: 200 OK vs error codes\n3. Response Headers: CORS headers present\n4. Response Body: JSON vs HTML error page\n5. Timing: Response times under 500ms`)}
        >
          📋 Copy
        </button>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Console Debugging</h4>
      <div className="topic-codeblock">
        <p><b>Frontend Debugging Techniques</b></p>
        <pre>
{`// Debug API calls in browser console
// services/debugApiService.js

class DebugApiService {
  static logRequest(config) {
    console.group('🚀 API Request');
    console.log('URL:', config.url);
    console.log('Method:', config.method);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.groupEnd();
  }

  static logResponse(response) {
    console.group('✅ API Response');
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Data:', response.data);
    console.groupEnd();
  }

  static logError(error) {
    console.group('❌ API Error');
    console.log('Message:', error.message);
    console.log('Status:', error.response?.status);
    console.log('Response:', error.response?.data);
    console.log('Config:', error.config);
    console.groupEnd();
  }
}

// Add to your axios interceptors for development
if (process.env.NODE_ENV === 'development') {
  apiClient.interceptors.request.use(
    (config) => {
      DebugApiService.logRequest(config);
      return config;
    }
  );

  apiClient.interceptors.response.use(
    (response) => {
      DebugApiService.logResponse(response);
      return response;
    },
    (error) => {
      DebugApiService.logError(error);
      return Promise.reject(error);
    }
  );
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`class DebugApiService {\n  static logRequest(config) {\n    console.group('🚀 API Request');\n    console.log('URL:', config.url);\n    console.log('Method:', config.method);\n    console.log('Headers:', config.headers);\n    console.log('Data:', config.data);\n    console.groupEnd();\n  }\n\n  static logResponse(response) {\n    console.group('✅ API Response');\n    console.log('Status:', response.status);\n    console.log('Data:', response.data);\n    console.groupEnd();\n  }\n}`)}
        >
          📋 Copy
        </button>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📬 Postman for Frontend Developers
      </h3>
      
      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Setting Up Postman Collections</h4>
      <div className="topic-codeblock">
        <p><b>Postman Collection Structure for Frontend Testing</b></p>
        <pre>
{`📁 URL Shortener API
├── 🔐 Authentication
│   ├── POST Register New User
│   ├── POST Login User
│   └── GET Get Current User Profile
├── 🔗 URL Management
│   ├── POST Create Short URL
│   ├── GET Get User URLs (Paginated)
│   ├── PUT Update URL
│   └── DELETE Delete URL
├── 📊 Analytics
│   ├── GET URL Click Statistics
│   └── GET User Dashboard Data
└── ⚙️ Utility
    ├── GET Health Check
    └── POST Test CORS

// Environment Variables in Postman:
{
  "api_base_url": "http://localhost:8080/api",
  "frontend_url": "http://localhost:3000",
  "auth_token": "{{auth_token}}", // Auto-populated from login
  "user_id": "{{user_id}}"
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`// Postman Environment Variables\n{\n  "api_base_url": "http://localhost:8080/api",\n  "frontend_url": "http://localhost:3000",\n  "auth_token": "{{auth_token}}",\n  "user_id": "{{user_id}}"\n}`)}
        >
          📋 Copy
        </button>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Automated Token Management</h4>
      <div className="topic-codeblock">
        <p><b>Postman Pre-request & Test Scripts</b></p>
        <pre>
{`// Pre-request Script for Login endpoint
// (No auth token needed for login)

// Test Script for Login endpoint (saves token)
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.have.property('token');
    pm.expect(responseJson).to.have.property('user');
    
    // Save token for future requests
    pm.environment.set("auth_token", responseJson.token);
    pm.environment.set("user_id", responseJson.user.id);
});

// Pre-request Script for Protected endpoints
// (Auto-adds Bearer token)
pm.request.headers.add({
    key: 'Authorization',
    value: 'Bearer ' + pm.environment.get('auth_token')
});

// Test Script for Protected endpoints
pm.test("Response time is less than 1000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

pm.test("Response has correct structure", function () {
    pm.response.to.have.status(200);
    const responseJson = pm.response.json();
    pm.expect(responseJson).to.be.an('object');
});`}
        </pre>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Testing Different Scenarios</h4>
      <div className="topic-codeblock">
        <p><b>Frontend-Focused Test Scenarios</b></p>
        <pre>
{`// Postman Tests for Frontend Edge Cases

// 1. Test Expired Token
pm.test("Handles expired token correctly", function () {
    if (pm.response.code === 401) {
        const responseJson = pm.response.json();
        pm.expect(responseJson.message).to.include('expired');
    }
});

// 2. Test Large Payload
pm.test("Handles large data correctly", function () {
    const requestSize = JSON.stringify(pm.request.body).length;
    if (requestSize > 1000000) { // 1MB
        pm.expect(pm.response.code).to.be.oneOf([200, 413]);
    }
});

// 3. Test CORS Headers
pm.test("CORS headers present", function () {
    pm.expect(pm.response.headers.get('Access-Control-Allow-Origin')).to.exist;
});

// 4. Test Rate Limiting
pm.test("Rate limiting works", function () {
    // Send multiple requests quickly to test rate limiting
    if (pm.response.code === 429) {
        pm.expect(pm.response.headers.get('Retry-After')).to.exist;
    }
});

// 5. Test Validation Errors
pm.test("Validation errors are user-friendly", function () {
    if (pm.response.code === 400) {
        const responseJson = pm.response.json();
        pm.expect(responseJson).to.have.property('message');
        pm.expect(responseJson.message).to.be.a('string');
        pm.expect(responseJson.message.length).to.be.above(0);
    }
});`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧪 Frontend Testing Strategies
      </h3>
      
      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Mock Service Worker (MSW) for Development</h4>
      <div className="topic-codeblock">
        <p><b>MSW Setup for Frontend Testing</b></p>
        <pre>
{`// Install MSW
npm install msw --save-dev

// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Mock login endpoint
  rest.post('http://localhost:8080/api/auth/signin', (req, res, ctx) => {
    const { email, password } = req.body;
    
    if (email === 'test@example.com' && password === 'password') {
      return res(
        ctx.status(200),
        ctx.json({
          token: 'mock-jwt-token-12345',
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User'
          }
        })
      );
    }
    
    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  }),

  // Mock URL creation
  rest.post('http://localhost:8080/api/urls', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader?.includes('Bearer')) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }

    return res(
      ctx.status(201),
      ctx.json({
        id: Date.now(),
        originalUrl: req.body.originalUrl,
        shortUrl: \`http://short.ly/\${Math.random().toString(36).substr(2, 6)}\`,
        createdAt: new Date().toISOString(),
        clickCount: 0
      })
    );
  }),

  // Mock getting user URLs
  rest.get('http://localhost:8080/api/urls/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        content: [
          {
            id: 1,
            originalUrl: 'https://example.com',
            shortUrl: 'http://short.ly/abc123',
            clickCount: 5,
            createdAt: '2024-01-15T10:30:00Z'
          }
        ],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 0
      })
    );
  })
];

// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// src/index.js (conditionally start MSW)
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_MOCK === 'true') {
  const { worker } = require('./mocks/browser');
  worker.start();
}`}
        </pre>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Integration Testing with React Testing Library</h4>
      <div className="topic-codeblock">
        <p><b>Testing API Integration in React Components</b></p>
        <pre>
{`// __tests__/LoginForm.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import LoginForm from '../components/LoginForm';

// Setup MSW server for tests
const server = setupServer(
  rest.post('http://localhost:8080/api/auth/signin', (req, res, ctx) => {
    const { email, password } = req.body;
    
    if (email === 'test@example.com' && password === 'password') {
      return res(ctx.json({ 
        token: 'test-token',
        user: { email, name: 'Test User' }
      }));
    }
    
    return res(
      ctx.status(401),
      ctx.json({ message: 'Invalid credentials' })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('successful login flow', async () => {
  const mockOnSuccess = jest.fn();
  
  render(<LoginForm onSuccess={mockOnSuccess} />);
  
  // Fill form
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password' }
  });
  
  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  // Wait for success
  await waitFor(() => {
    expect(mockOnSuccess).toHaveBeenCalledWith({
      token: 'test-token',
      user: { email: 'test@example.com', name: 'Test User' }
    });
  });
});

test('handles login error', async () => {
  render(<LoginForm />);
  
  // Fill with wrong credentials
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'wrong@example.com' }
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'wrongpassword' }
  });
  
  fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
  // Wait for error message
  await waitFor(() => {
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔧 Debugging Common Issues
      </h3>
      
      <div className="topic-codeblock">
        <p><b>Frontend-Backend Communication Troubleshooting</b></p>
        <pre>
{`// Common Issues and Solutions

1. ❌ CORS Error
   Problem: "Access to XMLHttpRequest at 'http://localhost:8080' 
            from origin 'http://localhost:3000' has been blocked"
   
   Check:
   ✅ Backend CORS configuration allows frontend origin
   ✅ withCredentials: true in axios config
   ✅ Access-Control-Allow-Credentials: true in backend

2. ❌ 401 Unauthorized
   Problem: "Request failed with status code 401"
   
   Check:
   ✅ Token is being sent: Authorization: Bearer <token>
   ✅ Token is not expired (check JWT payload)
   ✅ Token format is correct (Bearer prefix)
   ✅ Backend JWT secret matches

3. ❌ Network Error
   Problem: "Network Error" without status code
   
   Check:
   ✅ Backend server is running
   ✅ URL is correct (protocol, host, port)
   ✅ No typos in endpoint paths
   ✅ Firewall/antivirus not blocking requests

4. ❌ Preflight CORS Error
   Problem: "Request method PUT is not allowed by Access-Control-Allow-Methods"
   
   Check:
   ✅ Backend allows PUT/DELETE methods in CORS config
   ✅ All custom headers are in Access-Control-Allow-Headers
   ✅ Preflight caching is not causing stale responses

5. ❌ JSON Parse Error
   Problem: "Unexpected token < in JSON at position 0"
   
   Check:
   ✅ Backend returns JSON, not HTML error page
   ✅ Content-Type: application/json header is set
   ✅ API endpoint exists (not returning 404 HTML page)`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📋 Interactive Q&A
      </h3>

      <div className="blue-card-section discussion-section">
        <p style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "1rem" }}>
          💡 Discussion Questions
        </p>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q1')}
          >
            <span>🔍 Q1: What's the difference between testing in Postman vs browser DevTools?</span>
            <span className={`qa-icon ${qnaStates.q1 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q1 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Postman is great for isolated API testing and automation, while browser DevTools show you exactly what your frontend code is sending/receiving, including CORS headers, cookies, and timing. Use both: Postman for API validation, DevTools for integration debugging.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q2')}
          >
            <span>🤖 Q2: When should you use MSW vs real backend for frontend development?</span>
            <span className={`qa-icon ${qnaStates.q2 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q2 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use MSW for unit/component tests and when the backend isn't ready. Use real backend for integration testing and final validation. MSW is perfect for developing UI logic independently of backend completion.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q3')}
          >
            <span>⏱️ Q3: How do you test API performance from frontend perspective?</span>
            <span className={`qa-icon ${qnaStates.q3 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q3 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use browser DevTools Network tab to check response times, Postman for automated performance tests, and consider implementing performance monitoring in your frontend code. Focus on user-perceived performance, not just server response time.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q4')}
          >
            <span>🚨 Q4: How do you test error scenarios in frontend-backend communication?</span>
            <span className={`qa-icon ${qnaStates.q4 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q4 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use MSW to simulate different error responses, test network offline scenarios, implement timeout testing, and verify your error handling UI. Don't forget to test edge cases like malformed JSON responses.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q5')}
          >
            <span>🔐 Q5: What security aspects should frontend developers test in APIs?</span>
            <span className={`qa-icon ${qnaStates.q5 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q5 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Test that tokens expire correctly, unauthorized requests get 401 responses, sensitive data isn't exposed in responses, CORS is properly configured, and that HTTPS is enforced in production environments.</p>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p><b>🔧 Tasks:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Set up a Postman collection for your URL shortener API</li>
          <li>Create automated tests that save auth tokens between requests</li>
          <li>Use MSW to mock API responses for a React component test</li>
          <li>Debug a CORS issue using browser DevTools Network tab</li>
          <li>Implement error handling tests for 401, 403, and 500 responses</li>
        </ul>

        <p style={{ marginTop: "1rem" }}><b>✅ Expected:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Automated API testing workflow</li>
          <li>Robust error handling in frontend</li>
          <li>Clear debugging process for API issues</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Use Case</th>
            <th>Key Benefits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Browser DevTools</b></td>
            <td>Real-time debugging</td>
            <td>See actual requests, CORS issues, timing</td>
          </tr>
          <tr>
            <td><b>Postman</b></td>
            <td>API validation & automation</td>
            <td>Isolated testing, automated flows</td>
          </tr>
          <tr>
            <td><b>MSW</b></td>
            <td>Frontend development</td>
            <td>Independent development, consistent tests</td>
          </tr>
          <tr>
            <td><b>Integration Tests</b></td>
            <td>Component-API testing</td>
            <td>Full user flow validation</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic13Subtopic4Content;

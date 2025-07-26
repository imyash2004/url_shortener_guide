import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic13Subtopic5Content = () => {
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
        13.5 Mock Data Setup for Frontend Development
      </h2>

      <div className="blue-card-section">
        <p style={{ fontSize: "1.1rem" }}>
          <b>🎯 Learning Objective:</b> Learn how to set up comprehensive mock data systems that allow frontend development to proceed independently of backend completion, using JSON Server, MSW, and Postman Mock Server.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🗃️ JSON Server for Rapid Prototyping
      </h3>
      <p>
        JSON Server provides a full fake REST API with zero coding. Perfect for initial frontend development and demos.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Setting Up JSON Server</h4>
      <div className="topic-codeblock">
        <p><b>Installation and Basic Setup</b></p>
        <pre>
{`# Install JSON Server globally
npm install -g json-server

# Or install locally in your project
npm install json-server --save-dev

# Create db.json file with your data structure
touch db.json

# Start JSON Server
json-server --watch db.json --port 3001`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`# Install JSON Server globally\nnpm install -g json-server\n\n# Or install locally in your project\nnpm install json-server --save-dev\n\n# Start JSON Server\njson-server --watch db.json --port 3001`)}
        >
          📋 Copy
        </button>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>URL Shortener Mock Database</h4>
      <div className="topic-codeblock">
        <p><b>db.json - Complete Mock Database</b></p>
        <pre>
{`{
  "users": [
    {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "password": "hashedpassword123",
      "createdAt": "2024-01-15T10:30:00Z",
      "isActive": true,
      "role": "USER"
    },
    {
      "id": 2,
      "email": "admin@example.com", 
      "name": "Admin User",
      "password": "adminpassword123",
      "createdAt": "2024-01-10T08:00:00Z",
      "isActive": true,
      "role": "ADMIN"
    }
  ],
  
  "urls": [
    {
      "id": 1,
      "originalUrl": "https://www.example.com/very-long-url-that-needs-shortening",
      "shortCode": "abc123",
      "shortUrl": "http://localhost:8080/abc123",
      "userId": 1,
      "clickCount": 25,
      "createdAt": "2024-01-16T14:20:00Z",
      "updatedAt": "2024-01-16T14:20:00Z",
      "expiresAt": "2024-07-16T14:20:00Z",
      "isActive": true,
      "title": "Example Website",
      "description": "A sample website for testing"
    },
    {
      "id": 2,
      "originalUrl": "https://github.com/spring-projects/spring-boot",
      "shortCode": "boot99",
      "shortUrl": "http://localhost:8080/boot99",
      "userId": 1,
      "clickCount": 142,
      "createdAt": "2024-01-12T09:15:00Z",
      "updatedAt": "2024-01-12T09:15:00Z",
      "expiresAt": null,
      "isActive": true,
      "title": "Spring Boot Repository",
      "description": "Official Spring Boot GitHub repository"
    },
    {
      "id": 3,
      "originalUrl": "https://reactjs.org/docs/getting-started.html",
      "shortCode": "react1",
      "shortUrl": "http://localhost:8080/react1",
      "userId": 2,
      "clickCount": 67,
      "createdAt": "2024-01-18T16:45:00Z",
      "updatedAt": "2024-01-18T16:45:00Z",
      "expiresAt": "2024-06-18T16:45:00Z",
      "isActive": true,
      "title": "React Documentation",
      "description": "Official React.js documentation"
    }
  ],
  
  "clicks": [
    {
      "id": 1,
      "urlId": 1,
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "referer": "https://google.com",
      "country": "United States",
      "city": "New York",
      "timestamp": "2024-01-17T10:30:00Z"
    },
    {
      "id": 2,
      "urlId": 1,
      "ipAddress": "10.0.0.15",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "referer": "https://twitter.com",
      "country": "Canada",
      "city": "Toronto",
      "timestamp": "2024-01-17T15:22:00Z"
    }
  ],
  
  "auth": [
    {
      "id": 1,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.mock-signature",
      "userId": 1,
      "expiresAt": "2024-02-15T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}`}
        </pre>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Custom JSON Server Routes</h4>
      <div className="topic-codeblock">
        <p><b>routes.json - Custom Endpoint Mapping</b></p>
        <pre>
{`{
  "/api/auth/signin": "/auth",
  "/api/auth/signup": "/users", 
  "/api/auth/me": "/users/1",
  "/api/urls": "/urls",
  "/api/urls/user/:userId": "/urls?userId=:userId",
  "/api/urls/:id/clicks": "/clicks?urlId=:id",
  "/api/analytics/dashboard": "/urls?userId=1"
}

# Start with custom routes
json-server --watch db.json --routes routes.json --port 3001`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`{\n  "/api/auth/signin": "/auth",\n  "/api/auth/signup": "/users",\n  "/api/auth/me": "/users/1",\n  "/api/urls": "/urls",\n  "/api/urls/user/:userId": "/urls?userId=:userId"\n}\n\n# Start with custom routes\njson-server --watch db.json --routes routes.json --port 3001`)}
        >
          📋 Copy
        </button>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🎭 Advanced MSW (Mock Service Worker)
      </h3>
      <p>
        MSW provides more sophisticated mocking with request/response manipulation, perfect for complex scenarios.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Complete MSW Setup</h4>
      <div className="topic-codeblock">
        <p><b>Advanced MSW Handlers</b></p>
        <pre>
{`// src/mocks/data/mockDatabase.js
export const mockUsers = [
  {
    id: 1,
    email: 'john@example.com',
    name: 'John Doe',
    createdAt: '2024-01-15T10:30:00Z'
  }
];

export const mockUrls = [
  {
    id: 1,
    originalUrl: 'https://example.com/long-url',
    shortCode: 'abc123',
    shortUrl: 'http://localhost:8080/abc123',
    userId: 1,
    clickCount: 25,
    createdAt: '2024-01-16T14:20:00Z'
  }
];

// Mock JWT tokens
export const mockTokens = new Map();

// src/mocks/handlers/authHandlers.js
import { rest } from 'msw';
import { mockUsers, mockTokens } from '../data/mockDatabase';

export const authHandlers = [
  // Login
  rest.post('/api/auth/signin', (req, res, ctx) => {
    const { email, password } = req.body;
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user || password !== 'password') {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Invalid credentials' })
      );
    }
    
    const token = \`mock-token-\${user.id}-\${Date.now()}\`;
    mockTokens.set(token, { userId: user.id, expiresAt: Date.now() + 3600000 });
    
    return res(
      ctx.status(200),
      ctx.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      })
    );
  }),

  // Get current user
  rest.get('/api/auth/me', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !mockTokens.has(token)) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
    }
    
    const tokenData = mockTokens.get(token);
    if (tokenData.expiresAt < Date.now()) {
      mockTokens.delete(token);
      return res(ctx.status(401), ctx.json({ message: 'Token expired' }));
    }
    
    const user = mockUsers.find(u => u.id === tokenData.userId);
    return res(ctx.status(200), ctx.json(user));
  })
];

// src/mocks/handlers/urlHandlers.js
import { rest } from 'msw';
import { mockUrls, mockTokens } from '../data/mockDatabase';

export const urlHandlers = [
  // Create URL
  rest.post('/api/urls', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !mockTokens.has(token)) {
      return res(ctx.status(401));
    }
    
    const { originalUrl } = req.body;
    
    // Simulate validation
    if (!originalUrl || !originalUrl.startsWith('http')) {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Invalid URL',
          errors: ['URL must start with http:// or https://']
        })
      );
    }
    
    const tokenData = mockTokens.get(token);
    const newUrl = {
      id: Date.now(),
      originalUrl,
      shortCode: Math.random().toString(36).substr(2, 6),
      shortUrl: \`http://localhost:8080/\${Math.random().toString(36).substr(2, 6)}\`,
      userId: tokenData.userId,
      clickCount: 0,
      createdAt: new Date().toISOString()
    };
    
    mockUrls.push(newUrl);
    
    // Simulate network delay
    return res(
      ctx.delay(300),
      ctx.status(201),
      ctx.json(newUrl)
    );
  }),

  // Get user URLs with pagination
  rest.get('/api/urls/user', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !mockTokens.has(token)) {
      return res(ctx.status(401));
    }
    
    const tokenData = mockTokens.get(token);
    const page = parseInt(req.url.searchParams.get('page')) || 0;
    const size = parseInt(req.url.searchParams.get('size')) || 10;
    
    const userUrls = mockUrls.filter(url => url.userId === tokenData.userId);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedUrls = userUrls.slice(startIndex, endIndex);
    
    return res(
      ctx.status(200),
      ctx.json({
        content: paginatedUrls,
        totalElements: userUrls.length,
        totalPages: Math.ceil(userUrls.length / size),
        size,
        number: page
      })
    );
  }),

  // Simulate rate limiting
  rest.post('/api/urls', (req, res, ctx) => {
    // Simulate rate limiting (allow 10 requests per minute)
    const now = Date.now();
    const minute = Math.floor(now / 60000);
    const requestCount = req.headers.get('X-Mock-Request-Count') || 0;
    
    if (requestCount > 10) {
      return res(
        ctx.status(429),
        ctx.set('Retry-After', '60'),
        ctx.json({ message: 'Rate limit exceeded. Try again later.' })
      );
    }
    
    // ... rest of create URL logic
  })
];`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📬 Postman Mock Server
      </h3>
      <p>
        Postman Mock Server allows you to share mock APIs with your team and provides a more realistic testing environment.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Setting Up Postman Mock Server</h4>
      <div className="topic-codeblock">
        <p><b>Postman Mock Server Configuration</b></p>
        <pre>
{`// Steps to create Postman Mock Server:

1. Create a Collection in Postman
2. Add example responses to each request
3. Click "..." on collection → "Mock Collection"
4. Configure mock server settings:
   - Name: "URL Shortener API Mock"
   - Environment: "Development"
   - Make mock server public: Yes (for team sharing)

// Example Request with Mock Response:
POST {{mock_url}}/api/auth/signin

Headers:
Content-Type: application/json

Body:
{
  "email": "test@example.com",
  "password": "password"
}

Example Response:
Status: 200 OK
Headers:
Content-Type: application/json

Body:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  }
}

// Use mock server URL in your frontend:
const API_BASE_URL = process.env.REACT_APP_USE_MOCK === 'postman' 
  ? 'https://12345678-1234-1234-1234-123456789012.mock.pstmn.io/api'
  : 'http://localhost:8080/api';`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔄 Dynamic Mock Data Generation
      </h3>
      
      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Faker.js for Realistic Data</h4>
      <div className="topic-codeblock">
        <p><b>Generating Realistic Mock Data</b></p>
        <pre>
{`// Install faker
npm install @faker-js/faker --save-dev

// src/mocks/dataGenerators.js
import { faker } from '@faker-js/faker';

export const generateMockUser = (id) => ({
  id,
  email: faker.internet.email(),
  name: faker.person.fullName(),
  createdAt: faker.date.past().toISOString(),
  isActive: faker.datatype.boolean(0.9), // 90% active users
  role: faker.helpers.arrayElement(['USER', 'ADMIN'])
});

export const generateMockUrl = (id, userId) => ({
  id,
  originalUrl: faker.internet.url(),
  shortCode: faker.string.alphanumeric(6),
  shortUrl: \`http://localhost:8080/\${faker.string.alphanumeric(6)}\`,
  userId,
  clickCount: faker.number.int({ min: 0, max: 1000 }),
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
  expiresAt: faker.datatype.boolean(0.3) ? faker.date.future().toISOString() : null,
  isActive: faker.datatype.boolean(0.95),
  title: faker.lorem.sentence(3),
  description: faker.lorem.sentence()
});

export const generateMockClickEvent = (id, urlId) => ({
  id,
  urlId,
  ipAddress: faker.internet.ip(),
  userAgent: faker.internet.userAgent(),
  referer: faker.helpers.arrayElement([
    'https://google.com',
    'https://twitter.com', 
    'https://facebook.com',
    'direct'
  ]),
  country: faker.location.country(),
  city: faker.location.city(),
  timestamp: faker.date.recent().toISOString()
});

// Generate bulk data
export const generateMockDatabase = () => {
  const users = Array.from({ length: 10 }, (_, i) => generateMockUser(i + 1));
  const urls = Array.from({ length: 50 }, (_, i) => 
    generateMockUrl(i + 1, faker.helpers.arrayElement(users).id)
  );
  const clicks = Array.from({ length: 200 }, (_, i) =>
    generateMockClickEvent(i + 1, faker.helpers.arrayElement(urls).id)
  );
  
  return { users, urls, clicks };
};

// Use in MSW handlers
import { generateMockDatabase } from './dataGenerators';

const { users, urls, clicks } = generateMockDatabase();

// Update MSW handlers to use generated data
export const urlHandlers = [
  rest.get('/api/analytics/popular', (req, res, ctx) => {
    const popularUrls = urls
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, 10);
      
    return res(ctx.json(popularUrls));
  }),
  
  rest.get('/api/analytics/recent-clicks/:urlId', (req, res, ctx) => {
    const { urlId } = req.params;
    const recentClicks = clicks
      .filter(click => click.urlId === parseInt(urlId))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20);
      
    return res(ctx.json(recentClicks));
  })
];`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`// Install faker\nnpm install @faker-js/faker --save-dev\n\n// Generate realistic mock data\nimport { faker } from '@faker-js/faker';\n\nexport const generateMockUser = (id) => ({\n  id,\n  email: faker.internet.email(),\n  name: faker.person.fullName(),\n  createdAt: faker.date.past().toISOString(),\n  isActive: faker.datatype.boolean(0.9),\n  role: faker.helpers.arrayElement(['USER', 'ADMIN'])\n});`)}
        >
          📋 Copy
        </button>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ⚙️ Environment-Based Mock Configuration
      </h3>
      
      <div className="topic-codeblock">
        <p><b>Flexible Mock System Configuration</b></p>
        <pre>
{`// .env.development
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_MOCK_TYPE=none  # none, msw, json-server, postman

// .env.development.mock
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_MOCK_TYPE=json-server

// .env.development.msw
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_MOCK_TYPE=msw

// src/services/apiConfig.js
const getApiConfig = () => {
  const mockType = process.env.REACT_APP_MOCK_TYPE;
  
  switch (mockType) {
    case 'json-server':
      return {
        baseURL: 'http://localhost:3001/api',
        timeout: 5000,
        mock: true
      };
    case 'postman':
      return {
        baseURL: 'https://your-postman-mock.mock.pstmn.io/api',
        timeout: 10000,
        mock: true
      };
    case 'msw':
      return {
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 5000,
        mock: true
      };
    default:
      return {
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 10000,
        mock: false
      };
  }
};

// src/index.js - Conditional MSW startup
async function enableMocking() {
  if (process.env.REACT_APP_MOCK_TYPE !== 'msw') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'warn'
  });
}

enableMocking().then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

// package.json scripts for different environments
{
  "scripts": {
    "start": "react-scripts start",
    "start:mock": "REACT_APP_MOCK_TYPE=msw react-scripts start",
    "start:json": "concurrently \"json-server --watch db.json --port 3001\" \"REACT_APP_MOCK_TYPE=json-server react-scripts start\"",
    "start:postman": "REACT_APP_MOCK_TYPE=postman react-scripts start"
  }
}`}
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
            <span>🤔 Q1: When should you use JSON Server vs MSW vs Postman Mock Server?</span>
            <span className={`qa-icon ${qnaStates.q1 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q1 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use JSON Server for quick prototyping and simple CRUD operations. Use MSW for sophisticated request/response manipulation and testing edge cases. Use Postman Mock Server for team collaboration and when you need to share mock APIs across different tools.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q2')}
          >
            <span>📊 Q2: How do you ensure mock data stays realistic and useful?</span>
            <span className={`qa-icon ${qnaStates.q2 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q2 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use Faker.js for realistic data generation, regularly update mock data based on real API responses, include edge cases in your mock data, and maintain data relationships (foreign keys) to mirror real database constraints.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q3')}
          >
            <span>🔄 Q3: How do you handle stateful interactions in mock APIs?</span>
            <span className={`qa-icon ${qnaStates.q3 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q3 && (
            <div className="qa-answer">
              <p><b>Answer:</b> In MSW, use JavaScript Maps or Arrays to maintain state between requests. For JSON Server, it automatically persists changes to the db.json file. For Postman, use environment variables to store temporary state.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q4')}
          >
            <span>⚡ Q4: How do you simulate network conditions and errors in mocks?</span>
            <span className={`qa-icon ${qnaStates.q4 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q4 && (
            <div className="qa-answer">
              <p><b>Answer:</b> MSW supports ctx.delay() for network latency and can return different status codes based on conditions. JSON Server can be extended with middleware. Always test your error handling with 4xx and 5xx responses.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q5')}
          >
            <span>🚀 Q5: How do you transition from mock data to real APIs?</span>
            <span className={`qa-icon ${qnaStates.q5 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q5 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use environment variables to switch between mock and real APIs, ensure your mock data structure exactly matches real API responses, gradually migrate endpoints from mock to real as they become available, and maintain comprehensive tests for both scenarios.</p>
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
          <li>Set up JSON Server with realistic URL shortener data</li>
          <li>Create MSW handlers that simulate authentication flow</li>
          <li>Build a Postman Mock Server and share it with a teammate</li>
          <li>Use Faker.js to generate 100 realistic URL records</li>
          <li>Implement environment-based mock switching</li>
        </ul>

        <p style={{ marginTop: "1rem" }}><b>✅ Expected:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Independent frontend development capability</li>
          <li>Realistic testing data for all scenarios</li>
          <li>Easy switching between mock and real APIs</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Mock Solution</th>
            <th>Best For</th>
            <th>Key Features</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>JSON Server</b></td>
            <td>Quick prototyping</td>
            <td>Zero config, file-based persistence, REST endpoints</td>
          </tr>
          <tr>
            <td><b>MSW</b></td>
            <td>Complex scenarios</td>
            <td>Request interception, stateful mocks, testing integration</td>
          </tr>
          <tr>
            <td><b>Postman Mock</b></td>
            <td>Team collaboration</td>
            <td>Cloud-hosted, shareable, integrated with Postman workflow</td>
          </tr>
          <tr>
            <td><b>Faker.js</b></td>
            <td>Realistic data</td>
            <td>Generate consistent, realistic mock data at scale</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic13Subtopic5Content;

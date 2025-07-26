import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic13Subtopic3Content = () => {
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

  return (
    <div className="custom-section">
      <h2 style={{ color: "#1769aa", borderBottom: "2px solid #1769aa" }}>
        13.3 Frontend-Backend Communication
      </h2>

      <div className="blue-card-section">
        <p style={{ fontSize: "1.1rem" }}>
          <b>🎯 Learning Objective:</b> Master the practical aspects of communicating between your React frontend and Spring Boot backend, including JWT token handling, request patterns, and error management.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔐 JWT Token Management
      </h3>
      <p>
        When your backend returns JWT tokens, the frontend needs to store and use them properly for authenticated requests.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Token Storage Strategies</h4>
      <div className="topic-codeblock">
        <p><b>Frontend Token Service (React)</b></p>
        <pre>
{`// utils/tokenService.js
class TokenService {
  setToken(token) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  removeToken() {
    localStorage.removeItem('authToken');
  }

  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  getAuthHeader() {
    const token = this.getToken();
    return token ? { Authorization: \`Bearer \${token}\` } : {};
  }
}

export default new TokenService();`}
        </pre>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Axios Interceptors for Automatic Token Handling</h4>
      <div className="topic-codeblock">
        <p><b>API Service with Interceptors</b></p>
        <pre>
{`// services/apiService.js
import axios from 'axios';
import TokenService from '../utils/tokenService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config) => {
    const authHeaders = TokenService.getAuthHeader();
    config.headers = { ...config.headers, ...authHeaders };
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      TokenService.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📡 Common Request Patterns
      </h3>
      
      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Authentication Requests</h4>
      <div className="topic-codeblock">
        <p><b>Login/Registration Service</b></p>
        <pre>
{`// services/authService.js
import apiClient from './apiService';

export const authService = {
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/signin', credentials);
      const { token, user } = response.data;
      
      TokenService.setToken(token);
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed'
      };
    }
  },

  async register(userData) {
    try {
      const response = await apiClient.post('/auth/signup', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  },

  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return { success: true, user: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to get user info' };
    }
  }
};`}
        </pre>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>CRUD Operations</h4>
      <div className="topic-codeblock">
        <p><b>URL Service (for URL Shortening)</b></p>
        <pre>
{`// services/urlService.js
import apiClient from './apiService';

export const urlService = {
  async createShortUrl(originalUrl) {
    try {
      const response = await apiClient.post('/urls', { originalUrl });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create short URL'
      };
    }
  },

  async getUserUrls(page = 0, size = 10) {
    try {
      const response = await apiClient.get(\`/urls/user?page=\${page}&size=\${size}\`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch URLs' };
    }
  },

  async updateUrl(id, data) {
    try {
      const response = await apiClient.put(\`/urls/\${id}\`, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: 'Failed to update URL' };
    }
  },

  async deleteUrl(id) {
    try {
      await apiClient.delete(\`/urls/\${id}\`);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to delete URL' };
    }
  }
};`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ⚠️ Error Handling Strategies
      </h3>
      
      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Global Error Handler Hook</h4>
      <div className="topic-codeblock">
        <p><b>Custom Hook for Error Management</b></p>
        <pre>
{`// hooks/useErrorHandler.js
import { useState } from 'react';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsync = async (asyncFunction, errorMessage = 'Something went wrong') => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFunction();
      return result;
    } catch (err) {
      const message = err.response?.data?.message || errorMessage;
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { error, loading, handleAsync, clearError };
};

// Usage in component
const MyComponent = () => {
  const { error, loading, handleAsync, clearError } = useErrorHandler();

  const handleLogin = async (credentials) => {
    await handleAsync(
      () => authService.login(credentials),
      'Login failed. Please check your credentials.'
    );
  };

  return (
    <div>
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={clearError}>✕</button>
        </div>
      )}
      {loading && <div className="loading-spinner">Loading...</div>}
      {/* Rest of component */}
    </div>
  );
};`}
        </pre>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Status Code Handling</h4>
      <div className="topic-codeblock">
        <p><b>Comprehensive Error Response Handler</b></p>
        <pre>
{`// utils/errorHandler.js
export const handleApiError = (error) => {
  if (!error.response) {
    return {
      message: 'Network error. Please check your connection.',
      type: 'network'
    };
  }

  const { status, data } = error.response;

  switch (status) {
    case 400:
      return {
        message: data?.message || 'Invalid request data',
        type: 'validation',
        errors: data?.errors || []
      };
    case 401:
      return {
        message: 'Authentication required. Please log in.',
        type: 'auth'
      };
    case 403:
      return {
        message: 'Access denied. You don\\'t have permission.',
        type: 'permission'
      };
    case 404:
      return {
        message: 'Requested resource not found',
        type: 'notfound'
      };
    case 409:
      return {
        message: data?.message || 'Resource conflict',
        type: 'conflict'
      };
    case 500:
      return {
        message: 'Server error. Please try again later.',
        type: 'server'
      };
    default:
      return {
        message: data?.message || 'Something went wrong',
        type: 'unknown'
      };
  }
};`}
        </pre>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🔄 Loading States and UX
      </h3>
      
      <div className="topic-codeblock">
        <p><b>Custom Hook for API Calls with Loading</b></p>
        <pre>
{`// hooks/useApiCall.js
import { useState, useCallback } from 'react';
import { handleApiError } from '../utils/errorHandler';

export const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      const errorInfo = handleApiError(err);
      setError(errorInfo);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setLoading(false);
  }, []);

  return { loading, error, execute, reset };
};

// Usage Example
const UrlDashboard = () => {
  const { loading, error, execute } = useApiCall();
  const [urls, setUrls] = useState([]);

  const loadUrls = async () => {
    const result = await execute(urlService.getUserUrls);
    if (result.success) {
      setUrls(result.data.content);
    }
  };

  const createUrl = async (originalUrl) => {
    const result = await execute(urlService.createShortUrl, originalUrl);
    if (result.success) {
      setUrls(prev => [result.data, ...prev]);
    }
  };

  return (
    <div>
      {loading && <div className="loading-overlay">Creating URL...</div>}
      {error && (
        <div className={\`error-alert \${error.type}\`}>
          {error.message}
        </div>
      )}
      {/* Component content */}
    </div>
  );
};`}
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
            <span>🤔 Q1: Why store JWT tokens in localStorage instead of cookies?</span>
            <span className={`qa-icon ${qnaStates.q1 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q1 && (
            <div className="qa-answer">
              <p><b>Answer:</b> localStorage gives you full control over token management and works well with SPA routing. However, it's vulnerable to XSS attacks. HttpOnly cookies are more secure but require proper CORS setup and make logout more complex.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q2')}
          >
            <span>⚡ Q2: When should you use axios interceptors vs manual token attachment?</span>
            <span className={`qa-icon ${qnaStates.q2 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q2 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use interceptors for automatic token handling across all requests and centralized error management. Use manual attachment when you need request-specific logic or when working with different token types for different endpoints.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q3')}
          >
            <span>🔄 Q3: How do you handle token refresh in the frontend?</span>
            <span className={`qa-icon ${qnaStates.q3 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q3 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Implement refresh token logic in axios response interceptor. When you get 401, try to refresh the token. If refresh fails, redirect to login. Queue other requests during refresh to avoid multiple refresh calls.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q4')}
          >
            <span>📊 Q4: How do you provide user feedback during API calls?</span>
            <span className={`qa-icon ${qnaStates.q4 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q4 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use loading states for pending requests, success messages for completed actions, and specific error messages based on status codes. Consider toast notifications for non-blocking feedback and inline errors for form validation.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q5')}
          >
            <span>🎯 Q5: What's the best practice for handling validation errors from backend?</span>
            <span className={`qa-icon ${qnaStates.q5 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q5 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Parse field-specific errors from the backend response and display them next to relevant form fields. Use a consistent error format like <code>{"{ field: 'email', message: 'Invalid format' }"}</code> to map errors to UI components.</p>
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
          <li>Set up axios interceptors for automatic token handling</li>
          <li>Create a login form that stores JWT and makes authenticated requests</li>
          <li>Implement error handling that shows user-friendly messages</li>
          <li>Build a loading state that prevents double-clicking during API calls</li>
        </ul>

        <p style={{ marginTop: "1rem" }}><b>✅ Expected:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Seamless authentication flow</li>
          <li>Automatic token attachment to requests</li>
          <li>Proper error handling and user feedback</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>Purpose</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>Token Service</b></td>
            <td>Centralized token management</td>
            <td>localStorage + JWT parsing</td>
          </tr>
          <tr>
            <td><b>Axios Interceptors</b></td>
            <td>Automatic token handling</td>
            <td>Request/response middleware</td>
          </tr>
          <tr>
            <td><b>Error Handling</b></td>
            <td>User-friendly error messages</td>
            <td>Status code mapping + custom hooks</td>
          </tr>
          <tr>
            <td><b>Loading States</b></td>
            <td>Better user experience</td>
            <td>useState + async function wrapping</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic13Subtopic3Content;

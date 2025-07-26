import React, { useState } from "react";
import "./CustomSectionStyles.css";

const Topic13Subtopic2Content = () => {
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
        13.2 API Contract Definition
      </h2>

      <div className="blue-card-section">
        <p style={{ fontSize: "1.1rem" }}>
          <b>🎯 Learning Objective:</b> Learn how to create comprehensive API contracts that serve as the foundation for frontend-backend collaboration, ensuring consistent communication and reducing integration issues.
        </p>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📋 What is an API Contract?
      </h3>
      <p>
        An API contract is a formal specification that defines how your frontend and backend systems communicate. It acts as a blueprint that both teams follow to ensure consistent integration.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Core Components of API Contracts</h4>
      <div className="topic-codeblock">
        <p><b>Essential Elements to Define</b></p>
        <pre>
{`// 1. Request Format
{
  "method": "POST",
  "endpoint": "/api/urls",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": "Bearer <token>"
  },
  "body": {
    "originalUrl": "string (required, URL format)",
    "customAlias": "string (optional, 3-20 chars)",
    "expiresAt": "string (optional, ISO date)"
  }
}

// 2. Response Format
{
  "success": {
    "status": 201,
    "body": {
      "id": "number",
      "originalUrl": "string",
      "shortUrl": "string", 
      "shortCode": "string",
      "createdAt": "string (ISO date)",
      "expiresAt": "string | null",
      "clickCount": "number"
    }
  }
}

// 3. Error Format
{
  "error": {
    "status": 400,
    "body": {
      "message": "string",
      "errors": [
        {
          "field": "originalUrl",
          "message": "Must be a valid URL"
        }
      ],
      "timestamp": "string (ISO date)"
    }
  }
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`// API Contract Example\n{\n  "method": "POST",\n  "endpoint": "/api/urls",\n  "headers": {\n    "Content-Type": "application/json",\n    "Authorization": "Bearer <token>"\n  },\n  "body": {\n    "originalUrl": "string (required, URL format)",\n    "customAlias": "string (optional, 3-20 chars)",\n    "expiresAt": "string (optional, ISO date)"\n  }\n}`)}
        >
          📋 Copy
        </button>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        📚 OpenAPI/Swagger Implementation
      </h3>
      <p>
        Swagger provides interactive API documentation that serves as both specification and testing tool.
      </p>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Spring Boot Swagger Configuration</h4>
      <div className="topic-codeblock">
        <p><b>Swagger Setup and Configuration</b></p>
        <pre>
{`// pom.xml - Add Swagger dependencies
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.2</version>
</dependency>

// SwaggerConfig.java
@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "URL Shortener API",
        version = "1.0",
        description = "API for URL shortening service",
        contact = @Contact(
            name = "API Support",
            email = "support@urlshortener.com"
        )
    ),
    servers = {
        @Server(url = "http://localhost:8080", description = "Development"),
        @Server(url = "https://api.urlshortener.com", description = "Production")
    }
)
@SecurityScheme(
    name = "Bearer Authentication",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)
public class SwaggerConfig {
    
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("url-shortener")
                .pathsToMatch("/api/**")
                .build();
    }
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`@Configuration\n@OpenAPIDefinition(\n    info = @Info(\n        title = "URL Shortener API",\n        version = "1.0",\n        description = "API for URL shortening service"\n    )\n)\npublic class SwaggerConfig {\n    @Bean\n    public GroupedOpenApi publicApi() {\n        return GroupedOpenApi.builder()\n                .group("url-shortener")\n                .pathsToMatch("/api/**")\n                .build();\n    }\n}`)}
        >
          📋 Copy
        </button>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>Controller Documentation</h4>
      <div className="topic-codeblock">
        <p><b>Annotated Controller with OpenAPI</b></p>
        <pre>
{`@RestController
@RequestMapping("/api/urls")
@Tag(name = "URL Management", description = "Operations for creating and managing short URLs")
@SecurityRequirement(name = "Bearer Authentication")
public class UrlController {

    @PostMapping
    @Operation(
        summary = "Create a short URL",
        description = "Creates a new short URL from the provided original URL",
        responses = {
            @ApiResponse(
                responseCode = "201",
                description = "URL created successfully",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = UrlResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "400", 
                description = "Invalid URL format",
                content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ErrorResponse.class)
                )
            ),
            @ApiResponse(
                responseCode = "401",
                description = "Authentication required"
            )
        }
    )
    public ResponseEntity<UrlResponse> createShortUrl(
            @Valid @RequestBody 
            @Parameter(description = "URL creation request") 
            CreateUrlRequest request) {
        // Implementation
    }

    @GetMapping("/user")
    @Operation(
        summary = "Get user's URLs",
        description = "Retrieves paginated list of URLs created by the authenticated user"
    )
    public ResponseEntity<PagedResponse<UrlResponse>> getUserUrls(
            @Parameter(description = "Page number (0-based)") 
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") 
            @RequestParam(defaultValue = "10") int size) {
        // Implementation
    }
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`@RestController\n@RequestMapping("/api/urls")\n@Tag(name = "URL Management", description = "Operations for creating and managing short URLs")\npublic class UrlController {\n\n    @PostMapping\n    @Operation(summary = "Create a short URL")\n    public ResponseEntity<UrlResponse> createShortUrl(@Valid @RequestBody CreateUrlRequest request) {\n        // Implementation\n    }\n}`)}
        >
          📋 Copy
        </button>
      </div>

      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>DTO Documentation</h4>
      <div className="topic-codeblock">
        <p><b>Request/Response Models with Schema</b></p>
        <pre>
{`// CreateUrlRequest.java
@Schema(description = "Request to create a new short URL")
public class CreateUrlRequest {
    
    @Schema(
        description = "The original URL to be shortened",
        example = "https://www.example.com/very-long-url",
        required = true
    )
    @NotBlank(message = "Original URL is required")
    @URL(message = "Must be a valid URL")
    private String originalUrl;
    
    @Schema(
        description = "Custom alias for the short URL (optional)",
        example = "my-custom-link",
        minLength = 3,
        maxLength = 20
    )
    @Size(min = 3, max = 20, message = "Custom alias must be 3-20 characters")
    @Pattern(regexp = "^[a-zA-Z0-9-_]+$", message = "Only alphanumeric, dash, and underscore allowed")
    private String customAlias;
    
    @Schema(
        description = "Expiration date for the short URL (optional)",
        example = "2024-12-31T23:59:59Z"
    )
    @Future(message = "Expiration date must be in the future")
    private LocalDateTime expiresAt;
    
    // Constructors, getters, setters
}

// UrlResponse.java
@Schema(description = "Short URL creation response")
public class UrlResponse {
    
    @Schema(description = "Unique identifier", example = "123")
    private Long id;
    
    @Schema(description = "Original URL", example = "https://www.example.com")
    private String originalUrl;
    
    @Schema(description = "Generated short URL", example = "http://localhost:8080/abc123")
    private String shortUrl;
    
    @Schema(description = "Short code", example = "abc123")
    private String shortCode;
    
    @Schema(description = "Creation timestamp", example = "2024-01-15T10:30:00Z")
    private LocalDateTime createdAt;
    
    @Schema(description = "Number of clicks", example = "0")
    private Integer clickCount;
    
    // Constructors, getters, setters
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`@Schema(description = "Request to create a new short URL")\npublic class CreateUrlRequest {\n    \n    @Schema(description = "The original URL to be shortened", required = true)\n    @NotBlank(message = "Original URL is required")\n    @URL(message = "Must be a valid URL")\n    private String originalUrl;\n    \n    @Schema(description = "Custom alias for the short URL (optional)")\n    private String customAlias;\n}`)}
        >
          📋 Copy
        </button>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🌐 Frontend Integration Patterns
      </h3>
      
      <h4 style={{ color: "#2e7d32", marginTop: "1.5rem" }}>TypeScript Interface Generation</h4>
      <div className="topic-codeblock">
        <p><b>Auto-generated TypeScript from OpenAPI</b></p>
        <pre>
{`// Install OpenAPI TypeScript generator
npm install @openapitools/openapi-generator-cli --save-dev

// package.json script
{
  "scripts": {
    "generate-api": "openapi-generator-cli generate -i http://localhost:8080/v3/api-docs -g typescript-axios -o src/api/generated"
  }
}

// Generated TypeScript interfaces
export interface CreateUrlRequest {
    originalUrl: string;
    customAlias?: string;
    expiresAt?: string;
}

export interface UrlResponse {
    id: number;
    originalUrl: string;
    shortUrl: string;
    shortCode: string;
    createdAt: string;
    clickCount: number;
}

export interface ErrorResponse {
    message: string;
    errors?: FieldError[];
    timestamp: string;
}

export interface FieldError {
    field: string;
    message: string;
}

// Generated API client
export class UrlManagementApi extends BaseAPI {
    public createShortUrl(
        createUrlRequest: CreateUrlRequest,
        options?: AxiosRequestConfig
    ): AxiosPromise<UrlResponse> {
        return UrlManagementApiFp(this.configuration)
            .createShortUrl(createUrlRequest, options)
            .then((request) => request(this.axios, this.basePath));
    }
}`}
        </pre>
        <button 
          className="copy-btn"
          onClick={() => copyToClipboard(`export interface CreateUrlRequest {\n    originalUrl: string;\n    customAlias?: string;\n    expiresAt?: string;\n}\n\nexport interface UrlResponse {\n    id: number;\n    originalUrl: string;\n    shortUrl: string;\n    shortCode: string;\n    createdAt: string;\n    clickCount: number;\n}`)}
        >
          📋 Copy
        </button>
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
            <span>🤔 Q1: Why is API contract definition important before development starts?</span>
            <span className={`qa-icon ${qnaStates.q1 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q1 && (
            <div className="qa-answer">
              <p><b>Answer:</b> API contracts prevent integration issues by establishing clear expectations early. They enable parallel development, reduce miscommunication, serve as testing documentation, and help catch design flaws before implementation begins.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q2')}
          >
            <span>📚 Q2: What are the advantages of Swagger/OpenAPI over simple documentation?</span>
            <span className={`qa-icon ${qnaStates.q2 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q2 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Swagger provides interactive testing, auto-generates client SDKs, validates requests/responses automatically, stays synchronized with code changes, and offers standardized documentation format that many tools can consume.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q3')}
          >
            <span>🔄 Q3: How do you handle API contract changes without breaking frontend?</span>
            <span className={`qa-icon ${qnaStates.q3 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q3 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use API versioning (/v1/, /v2/), implement backward compatibility for a transition period, use feature flags for gradual rollouts, maintain clear deprecation timelines, and communicate changes early to frontend teams.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q4')}
          >
            <span>🎯 Q4: What should be included in error response contracts?</span>
            <span className={`qa-icon ${qnaStates.q4 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q4 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Include consistent error structure, human-readable messages, field-specific validation errors, error codes for programmatic handling, timestamps, and contextual information to help debugging.</p>
            </div>
          )}
        </div>

        <div className="qa-item">
          <button 
            className="qa-question"
            onClick={() => toggleQna('q5')}
          >
            <span>🛠️ Q5: How do you validate that implementation matches the contract?</span>
            <span className={`qa-icon ${qnaStates.q5 ? 'rotated' : ''}`}>▼</span>
          </button>
          {qnaStates.q5 && (
            <div className="qa-answer">
              <p><b>Answer:</b> Use contract testing tools like Pact, implement schema validation in tests, use Swagger validator, set up automated tests that verify request/response formats, and establish CI/CD checks for contract compliance.</p>
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
          <li>Set up Swagger in your Spring Boot project</li>
          <li>Document one complete API endpoint with all annotations</li>
          <li>Generate TypeScript interfaces from your OpenAPI spec</li>
          <li>Create a comprehensive error response contract</li>
          <li>Test your API documentation with the Swagger UI</li>
        </ul>

        <p style={{ marginTop: "1rem" }}><b>✅ Expected:</b></p>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Interactive API documentation at /swagger-ui.html</li>
          <li>Consistent request/response formats</li>
          <li>Clear error handling patterns</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        ✅ Summary
      </h3>
      <table className="custom-table" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Component</th>
            <th>Purpose</th>
            <th>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>API Contract</b></td>
            <td>Define communication standards</td>
            <td>Request/response schemas, validation rules</td>
          </tr>
          <tr>
            <td><b>OpenAPI/Swagger</b></td>
            <td>Interactive documentation</td>
            <td>Annotations + UI generation</td>
          </tr>
          <tr>
            <td><b>TypeScript Generation</b></td>
            <td>Type-safe frontend integration</td>
            <td>Auto-generated interfaces from schema</td>
          </tr>
          <tr>
            <td><b>Error Contracts</b></td>
            <td>Consistent error handling</td>
            <td>Standardized error response format</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic13Subtopic2Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  taskRequest: `{
  "title": "Finish Assignment",
  "description": "Complete the Java project",
  "dueDate": "2025-07-20",
  "status": "pending"
}`,
  taskResponse: `{
  "id": 101,
  "title": "Finish Assignment",
  "description": "Complete the Java project",
  "dueDate": "2025-07-20",
  "status": "pending"
}`,
  urlRequest: `{
  "originalUrl": "https://www.google.com",
  "expiresAt": "2025-08-01T00:00:00"
}`,
  urlResponse: `{
  "originalUrl": "https://www.google.com",
  "shortUrl": "https://short.ly/HgT89K",
  "expiresAt": "2025-08-01T00:00:00"
}`,
  urlRequestDTO: `public class UrlRequestDTO {
    private String originalUrl;
    private LocalDateTime expiresAt;

    // Getters and Setters
}`,
  urlResponseDTO: `public class UrlResponseDTO {
    private String originalUrl;
    private String shortUrl;
    private LocalDateTime expiresAt;

    // Constructors, Getters and Setters
}`,
  urlEntity: `@Entity
public class UrlEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String originalUrl;
    private String shortCode;
    private LocalDateTime expiresAt;

    // Getters and Setters
}`,
  urlRepository: `@Repository
public interface UrlRepository extends JpaRepository<UrlEntity, Long> {
    boolean existsByShortCode(String shortCode);
}`,
  urlService: `@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    public UrlResponseDTO createShortUrl(UrlRequestDTO request) {
        String shortCode = generateUniqueCode();

        UrlEntity url = new UrlEntity();
        url.setOriginalUrl(request.getOriginalUrl());
        url.setShortCode(shortCode);
        url.setExpiresAt(request.getExpiresAt());

        urlRepository.save(url);

        UrlResponseDTO response = new UrlResponseDTO();
        response.setOriginalUrl(url.getOriginalUrl());
        response.setShortUrl("https://short.ly/" + shortCode);
        response.setExpiresAt(url.getExpiresAt());

        return response;
    }

    private String generateUniqueCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        String code;

        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                sb.append(characters.charAt(random.nextInt(characters.length())));
            }
            code = sb.toString();
        } while (urlRepository.existsByShortCode(code));

        return code;
    }
}`,
  urlController: `@RestController
@RequestMapping("/api/urls")
public class UrlController {

    @Autowired
    private UrlService urlService;

    @PostMapping
    public ResponseEntity<UrlResponseDTO> createShortUrl(@RequestBody UrlRequestDTO request) {
        UrlResponseDTO response = urlService.createShortUrl(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}`,
};

const learningOutcomes = [
  "Understand how to create a POST API in Spring Boot",
  "Accept JSON input from the user",
  "Validate input data",
  "Return meaningful responses",
  "Use DTOs to decouple API and database",
];

const tryItTasks = [
  {
    title: "Student Registration API",
    desc: "Create an API to register a student with name, email, course, and admission year. Return a student ID and success message.",
  },
  {
    title: "Blog Post Creation API",
    desc: "Build an endpoint to submit a blog post with title, content, and author name. Return blog ID and publish status.",
  },
];

const Topic3Subtopic1Content = () => {
  const [copied, setCopied] = useState({});

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

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 3.1 – Create API</h2>
      <hr />
      <div className="yellow-callout">
        Until now, we’ve mostly fetched data (like listing shortened URLs). But
        real-world systems need more than that — users must be able to{" "}
        <b>send new data</b> to the system.
        <br />
        <br />
        That’s where the <b>Create API</b> (also called <b>POST API</b>) comes
        into play.
        <br />
        <br />
        <i>
          You use the Create API when a user wants to <b>submit a form</b>,{" "}
          <b>add new content</b>, or <b>create a new record</b>.
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        {learningOutcomes.map((item, i) => (
          <li key={i}>✅ {item}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Generic Real-World Example – Create a Task
      </h3>
      <div className="blue-card-section">
        <b>Sample Request</b>
        <ul>
          <li>
            <b>Endpoint:</b>{" "}
            <span className="blue-inline-code">POST /api/tasks</span>
          </li>
          <li>
            <b>Request Body (JSON):</b>
          </li>
        </ul>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.taskRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.taskRequest, "taskRequest")
            }
          >
            {copied.taskRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.taskRequest}</code>
          </pre>
        </div>
        <b>Expected Response (201 Created):</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.taskResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.taskResponse, "taskResponse")
            }
          >
            {copied.taskResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.taskResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 How it works in code (step-by-step)
      </h3>
      <div className="blue-card-section">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            A <span className="blue-inline-code">TaskRequestDTO</span> class
            receives the incoming JSON.
          </li>
          <li>
            The controller method receives the data using{" "}
            <span className="blue-inline-code">@RequestBody</span>.
          </li>
          <li>The service layer processes and saves the task.</li>
          <li>
            A <span className="blue-inline-code">TaskResponseDTO</span> is
            returned as the response.
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Why Use DTOs?
      </h3>
      <div className="yellow-callout">
        <b>DTO (Data Transfer Object)</b> separates:
        <ul>
          <li>📥 Incoming data (Request DTO)</li>
          <li>📤 Outgoing data (Response DTO)</li>
          <li>🗄️ Internal logic (Entity or Model)</li>
        </ul>
        This keeps your API clean and flexible.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔗 Now, Let’s Implement the Same Logic for the URL Shortener
      </h3>
      <div className="blue-card-section">
        <b>API Goal:</b> Allow a user to create a <b>shortened URL</b> by
        submitting the original URL and expiry time.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Step-by-Step Code (Spring Boot)
      </h3>
      <div className="blue-card-section">
        <b>UrlRequestDTO.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlRequestDTO ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlRequestDTO, "urlRequestDTO")
            }
          >
            {copied.urlRequestDTO ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlRequestDTO}</code>
          </pre>
        </div>
        <b>UrlResponseDTO.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlResponseDTO ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlResponseDTO, "urlResponseDTO")
            }
          >
            {copied.urlResponseDTO ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlResponseDTO}</code>
          </pre>
        </div>
        <b>UrlEntity.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlEntity ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.urlEntity, "urlEntity")}
          >
            {copied.urlEntity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlEntity}</code>
          </pre>
        </div>
        <b>UrlRepository.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlRepository ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlRepository, "urlRepository")
            }
          >
            {copied.urlRepository ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlRepository}</code>
          </pre>
        </div>
        <b>UrlService.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlService ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.urlService, "urlService")}
          >
            {copied.urlService ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlService}</code>
          </pre>
        </div>
        <b>UrlController.java</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlController ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlController, "urlController")
            }
          >
            {copied.urlController ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlController}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Sample Request to This API
      </h3>
      <div className="blue-card-section">
        <b>POST</b>{" "}
        <span className="blue-inline-code">https://your-api.com/api/urls</span>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlRequest ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.urlRequest, "urlRequest")}
          >
            {copied.urlRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlRequest}</code>
          </pre>
        </div>
        <b>Sample Response</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.urlResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlResponse, "urlResponse")
            }
          >
            {copied.urlResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself Tasks – Create API
      </h3>
      <div className="blue-card-section try-tasks">
        <ul>
          {tryItTasks.map((t, i) => (
            <li key={i}>
              <b>
                🔹 {i + 1}. {t.title}
              </b>
              <br />
              {t.desc}
            </li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points (With Answers)
      </h3>
      <div className="blue-card-section">
        {/* Q1 */}
        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>1. Q:</b> Why not generate the short URL on the frontend?
          </div>
          <button
            className="reveal-btn"
            onClick={() => setCopied((c) => ({ ...c, showA1: !c.showA1 }))}
            style={{ marginBottom: "0.5rem" }}
          >
            {copied.showA1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {copied.showA1 && (
            <div className="yellow-callout">
              The backend is the right place to:
              <ul>
                <li>Ensure uniqueness of the short code</li>
                <li>Avoid URL collisions</li>
                <li>Store the mapping in the database</li>
                <li>Apply security logic like auth, rate limiting, etc.</li>
              </ul>
              Frontend can only display, not enforce these rules.
            </div>
          )}
        </div>
        {/* Q2 */}
        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>2. Q:</b> What if the user doesn’t provide an expiry time?
          </div>
          <button
            className="reveal-btn"
            onClick={() => setCopied((c) => ({ ...c, showA2: !c.showA2 }))}
            style={{ marginBottom: "0.5rem" }}
          >
            {copied.showA2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {copied.showA2 && (
            <div className="yellow-callout">
              You can either:
              <ul>
                <li>Assign a default (e.g., 30 days from creation), or</li>
                <li>
                  Keep it permanent (null or no expiry) based on your product
                  decision
                </li>
              </ul>
              Always communicate this in your response.
            </div>
          )}
        </div>
        {/* Q3 */}
        <div style={{ marginBottom: "1.2rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <b>3. Q:</b> How long should the short code be?
          </div>
          <button
            className="reveal-btn"
            onClick={() => setCopied((c) => ({ ...c, showA3: !c.showA3 }))}
            style={{ marginBottom: "0.5rem" }}
          >
            {copied.showA3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {copied.showA3 && (
            <div className="yellow-callout">
              <ul>
                <li>Usually 6–8 characters is a sweet spot</li>
                <li>
                  It provides ~56 billion combinations with 6 alphanumerics
                  (62^6)
                </li>
                <li>You can customize this if your system scales up</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            ✅ Validate originalUrl with regex or{" "}
            <span className="blue-inline-code">@URL</span> annotation
          </li>
          <li>✅ Ensure short code uniqueness (retry if conflict)</li>
          <li>✅ Always return the full short URL (https://domain/code)</li>
          <li>✅ Use DTOs instead of entity objects for safety</li>
          <li>✅ Log all creations for monitoring</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Tech Behind the Scenes
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            <b>Service Layer:</b> Generates code, saves to DB
          </li>
          <li>
            <b>Repository Layer:</b> Inserts the Url object
          </li>
          <li>
            <b>Controller Layer:</b> Accepts input and returns response
          </li>
          <li>
            <b>Short Code Generator:</b> Can be a utility class or service
          </li>
          <li>
            <b>Database:</b> Stores mapping like
          </li>
        </ul>
        <table className="custom-table">
          <thead>
            <tr>
              <th>id</th>
              <th>originalUrl</th>
              <th>shortCode</th>
              <th>expiresAt</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>https://www.google.com</td>
              <td>HgT89K</td>
              <td>2025-08-01T00:00:00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topic3Subtopic1Content;

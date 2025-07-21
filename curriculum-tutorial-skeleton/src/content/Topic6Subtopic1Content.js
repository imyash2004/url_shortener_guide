import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controller: `@RestController
public class RedirectController {

    @Autowired
    private UrlMappingService urlMappingService;

    @GetMapping("/{orgShortName}/{shortCode}")
    public ResponseEntity<?> redirectToOriginalUrl(
        @PathVariable String orgShortName,
        @PathVariable String shortCode
    ) {
        Optional<String> originalUrlOpt = urlMappingService.getOriginalUrl(orgShortName, shortCode);

        if (originalUrlOpt.isPresent()) {
            String originalUrl = originalUrlOpt.get();
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(originalUrl));
            return new ResponseEntity<>(headers, HttpStatus.FOUND); // 302 Redirect
        } else {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Short URL not found!");
        }
    }
}`,
  service: `@Service
public class UrlMappingService {

    @Autowired
    private UrlMappingRepository urlMappingRepository;

    public Optional<String> getOriginalUrl(String orgShortName, String shortCode) {
        Optional<UrlMapping> mapping = urlMappingRepository.findByOrgShortNameAndShortCode(orgShortName, shortCode);
        return mapping.map(UrlMapping::getOriginalUrl);
    }
}`,
  repo: `@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    Optional<UrlMapping> findByOrgShortNameAndShortCode(String orgShortName, String shortCode);
}`,
};

const dbTable = [
  [1, "zomato", "offer50", "https://zomato.com/biryani"],
  [2, "amazon", "prime2025", "https://amazon.com/prime2025"],
];

const summaryTable = [
  ["Endpoint", "/{orgShortName}/{shortCode}"],
  ["Controller", "Handles path variable, service call, and redirect"],
  ["Status Code", "302 FOUND"],
  ["DB Lookup", "Finds original URL from short code"],
  ["Error Handling", "Returns 404 if not found"],
];

const discussionPrompts = [
  {
    q: "Why do we use HttpStatus.FOUND and not HttpStatus.OK?",
    a: (
      <>
        HttpStatus.FOUND (302) tells the browser to redirect to a new location.
        HttpStatus.OK (200) would just return a normal response, not a redirect.
      </>
    ),
  },
  {
    q: "What would happen if shortCode was not unique?",
    a: (
      <>
        If shortCode is not unique within an organization, the redirect could be
        ambiguous or incorrect. Always enforce uniqueness for each org.
      </>
    ),
  },
  {
    q: "How would you prevent malicious redirections?",
    a: (
      <>
        Validate and sanitize all inputs, and only allow redirects to trusted
        domains or after proper checks. Log all redirects for auditing.
      </>
    ),
  },
];

const tryItTasks = [
  "Implement a test redirect endpoint for /testOrg/summerSale mapping to https://example.com/summer-sale",
  "Test redirection in Postman or browser",
];

const Topic6Subtopic1Content = () => {
  const [copied, setCopied] = useState({});
  const [openFAQ, setOpenFAQ] = useState(
    Array(discussionPrompts.length).fill(false)
  );

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(codeBlocks[codeId]);
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
      <h2 style={{ color: "#1769aa" }}>
        🚀 6.2 – Redirect Controller Implementation
      </h2>
      <hr />
      <div className="yellow-callout">
        The <b>Redirect Controller</b> is the part of your Spring Boot backend
        that handles incoming short URLs like:
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>https://short.ly/zomato/offer50</code>
          </pre>
        </div>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Reads the <b>organization short name</b> (e.g.,{" "}
            <span className="blue-inline-code">zomato</span>)
          </li>
          <li>
            Reads the <b>short code</b> (e.g.,{" "}
            <span className="blue-inline-code">offer50</span>)
          </li>
          <li>Looks them up in the database</li>
          <li>
            Returns an <b>HTTP redirect</b> to the full/original URL
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 URL Structure: Path Variables
      </h3>
      <div className="blue-card-section">
        The redirect endpoint will use <b>path variables</b>:
        <div className="topic-codeblock" style={{ margin: "0.7rem 0" }}>
          <pre>
            <code>GET /&#123;orgShortName&#125;/&#123;shortCode&#125;</code>
          </pre>
        </div>
        These two variables are extracted and passed to the controller for
        processing.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Sample Database Table
      </h3>
      <div className="blue-card-section">
        <table className="custom-table">
          <thead>
            <tr>
              <th>id</th>
              <th>org_shortname</th>
              <th>short_code</th>
              <th>original_url</th>
            </tr>
          </thead>
          <tbody>
            {dbTable.map(([id, org, code, url], idx) => (
              <tr key={idx}>
                <td>{id}</td>
                <td>{org}</td>
                <td>{code}</td>
                <td>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧑‍💻 Controller Code – Spring Boot
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.controller ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.controller, "controller")}
        >
          {copied.controller ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.controller}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔍 Explanation</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Line</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>@GetMapping(...)</td>
            <td>Exposes the redirect endpoint</td>
          </tr>
          <tr>
            <td>@PathVariable</td>
            <td>Extracts orgShortName and shortCode from the URL</td>
          </tr>
          <tr>
            <td>urlMappingService.getOriginalUrl(...)</td>
            <td>Queries the DB for the matching original URL</td>
          </tr>
          <tr>
            <td>HttpHeaders.setLocation(...)</td>
            <td>Sets the redirect target</td>
          </tr>
          <tr>
            <td>HttpStatus.FOUND</td>
            <td>302 Redirect to the new location</td>
          </tr>
          <tr>
            <td>If not found</td>
            <td>Return a 404 Not Found response</td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 What Is HttpStatus.FOUND?
      </h3>
      <div className="blue-card-section">
        <b>302 FOUND</b>: Standard HTTP status code used for temporary
        redirection.
        <br />
        Browser will automatically navigate to the given URL.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Best Practices
      </h3>
      <ul className="topic-checklist">
        <li>
          Always validate the inputs (
          <span className="blue-inline-code">orgShortName</span>,{" "}
          <span className="blue-inline-code">shortCode</span>)
        </li>
        <li>Sanitize input if it's user-generated</li>
        <li>Log redirection for analytics (more in 6.5)</li>
        <li>Handle not-found and internal server errors gracefully</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📁 Service Layer Code
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.service ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.service, "service")}
        >
          {copied.service ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.service}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🗃️ Repository Code
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.repo ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.repo, "repo")}
        >
          {copied.repo ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.repo}</code>
        </pre>
      </div>
    </div>
  );
};

export default Topic6Subtopic1Content;

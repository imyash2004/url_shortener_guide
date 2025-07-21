import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controller: `@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping
    public ResponseEntity<OrganizationResponseDTO> createOrganization(
            @Valid @RequestBody OrganizationRequestDTO requestDTO) {
        OrganizationResponseDTO createdOrg = organizationService.createOrganization(requestDTO);
        return new ResponseEntity<>(createdOrg, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OrganizationResponseDTO>> getAllOrganizations() {
        List<OrganizationResponseDTO> organizations = organizationService.getAllOrganizations();
        return ResponseEntity.ok(organizations);
    }

    @GetMapping("/{shortName}")
    public ResponseEntity<OrganizationResponseDTO> getByShortName(@PathVariable String shortName) {
        Organization org = organizationService.getOrganizationByShortName(shortName);
        OrganizationResponseDTO dto = new OrganizationResponseDTO(org.getId(), org.getName(), org.getShortName());
        return ResponseEntity.ok(dto);
    }
}`,
  postRequest: `{
  "name": "Swiggy",
  "shortName": "swiggy"
}`,
  postResponse: `{
  "id": 2,
  "name": "Swiggy",
  "shortName": "swiggy"
}`,
};

const discussionPrompts = [
  {
    q: "Why use @Valid on @RequestBody?",
    a: (
      <>
        To automatically apply validations defined in DTO (like{" "}
        <span className="blue-inline-code">@NotBlank</span>) and return helpful
        error messages if input is invalid.
      </>
    ),
  },
  {
    q: "Why return ResponseEntity instead of DTO directly?",
    a: (
      <>
        ResponseEntity allows us to set status codes, headers, and body
        flexibly, improving API control.
      </>
    ),
  },
  {
    q: "Why fetch by shortName instead of id?",
    a: (
      <>
        Because <span className="blue-inline-code">shortName</span> is the
        public-facing brand key (used in URLs like{" "}
        <span className="blue-inline-code">swiggy/xyz123</span>). We hide{" "}
        <span className="blue-inline-code">id</span> from external clients for
        better abstraction.
      </>
    ),
  },
];

const tryItTasks = [
  "Add a PUT /api/organizations/{shortName} to update an organization's name (but not the shortName).",
  "Return a 409 Conflict response when someone tries to create an organization with a duplicate shortName.",
  "Add a DELETE endpoint for cleanup – but only allow it for admins (hint: future use with role-based auth).",
];

const Topic5Subtopic5Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🚀 5.6 – Organization Controller</h2>
      <hr />
      <div className="yellow-callout">
        The <b>Organization Controller</b> is the entry point for all HTTP
        requests related to organizations. It handles incoming data, delegates
        business logic to the service layer, and sends appropriate responses to
        the client.
        <br />
        <br />
        Think of it as the <b>reception desk</b> of your organization API –
        receiving calls (HTTP requests), taking notes (validating input), and
        forwarding them to the right department (service layer).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🎯 Objectives</h3>
      <ul className="topic-checklist">
        <li>
          Understand how to expose organization endpoints (
          <span className="blue-inline-code">POST</span>,{" "}
          <span className="blue-inline-code">GET</span>)
        </li>
        <li>Implement a RESTful controller</li>
        <li>Handle request and response DTOs</li>
        <li>Return appropriate HTTP status codes and messages</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Controller Setup
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 What’s Happening Here?
      </h3>
      <div className="blue-card-section">
        <b>@PostMapping – Create a New Organization</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Accepts a JSON request (
            <span className="blue-inline-code">OrganizationRequestDTO</span>)
          </li>
          <li>Calls service to save it</li>
          <li>
            Returns the saved DTO with{" "}
            <span className="blue-inline-code">201 Created</span>
          </li>
        </ul>
      </div>
      <div className="blue-card-section">
        <b>@GetMapping – List All Organizations</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Calls the service to fetch all organizations</li>
          <li>
            Returns the list with{" "}
            <span className="blue-inline-code">200 OK</span>
          </li>
        </ul>
      </div>
      <div className="blue-card-section">
        <b>@GetMapping("/swiggy") – Fetch by Brand Name</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Uses <span className="blue-inline-code">shortName</span> from URL
          </li>
          <li>Retrieves organization by that identifier</li>
          <li>Great for later use in filtering URLs by brand!</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📬 Sample Request & Response
      </h3>
      <div className="blue-card-section">
        <b>POST /api/organizations</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.postRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postRequest, "postRequest")
            }
          >
            {copied.postRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postRequest}</code>
          </pre>
        </div>
        <b>Response:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.postResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postResponse, "postResponse")
            }
          >
            {copied.postResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postResponse}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>GET /api/organizations/swiggy</b>
        <b>Response:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.postResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postResponse, "postResponse")
            }
          >
            {copied.postResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
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
        🔧 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Topic5Subtopic5Content;

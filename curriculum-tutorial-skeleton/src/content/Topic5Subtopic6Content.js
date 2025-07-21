import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  post: `@PostMapping
public ResponseEntity<OrganizationResponseDTO> createOrganization(
        @Valid @RequestBody OrganizationRequestDTO requestDTO) {
    OrganizationResponseDTO createdOrg = organizationService.createOrganization(requestDTO);
    return new ResponseEntity<>(createdOrg, HttpStatus.CREATED);
}`,
  get: `@GetMapping("/{shortName}")
public ResponseEntity<OrganizationResponseDTO> getByShortName(@PathVariable String shortName) {
    Organization org = organizationService.getOrganizationByShortName(shortName);
    OrganizationResponseDTO dto = new OrganizationResponseDTO(org.getId(), org.getName(), org.getShortName());
    return ResponseEntity.ok(dto);
}`,
  put: `@PutMapping("/{shortName}")
public ResponseEntity<OrganizationResponseDTO> updateOrganization(
        @PathVariable String shortName,
        @Valid @RequestBody OrganizationUpdateDTO updateDTO) {
    OrganizationResponseDTO updated = organizationService.updateOrganization(shortName, updateDTO);
    return ResponseEntity.ok(updated);
}`,
  updateDTO: `@Data
public class OrganizationUpdateDTO {
    @NotBlank
    private String name;
}`,
  putService: `public OrganizationResponseDTO updateOrganization(String shortName, OrganizationUpdateDTO dto) {
    Organization org = organizationRepository.findByShortName(shortName)
        .orElseThrow(() -> new NotFoundException("Organization not found"));
    org.setName(dto.getName());
    return toResponseDTO(organizationRepository.save(org));
}`,
  delete: `@DeleteMapping("/{shortName}")
public ResponseEntity<Void> deleteOrganization(@PathVariable String shortName) {
    organizationService.deleteOrganization(shortName);
    return ResponseEntity.noContent().build();
}`,
  postRequest: `{
  "name": "Zomato",
  "shortName": "zomato"
}`,
  postResponse: `{
  "id": 3,
  "name": "Zomato",
  "shortName": "zomato"
}`,
  putRequest: `{
  "name": "Zomato India Pvt. Ltd."
}`,
  putResponse: `{
  "id": 3,
  "name": "Zomato India Pvt. Ltd.",
  "shortName": "zomato"
}`,
};

const discussionPrompts = [
  {
    q: "Why do we avoid updating shortName?",
    a: (
      <>
        shortName is the <b>URL identifier</b> and often used as a foreign key
        reference. Changing it could break all shortened URLs and other
        references.
      </>
    ),
  },
  {
    q: "Should we allow deleting an organization with active URLs?",
    a: (
      <>
        Not directly. In production, we should either:
        <ul>
          <li>Prevent deletion if URLs exist (soft block)</li>
          <li>Cascade delete all URLs (risky)</li>
          <li>Soft-delete the organization (mark as inactive)</li>
        </ul>
      </>
    ),
  },
  {
    q: "Why do we use PUT and not PATCH?",
    a: (
      <>
        PUT replaces fields explicitly sent. For partial updates (PATCH), Spring
        needs more configuration. PUT is simpler and often sufficient for simple
        updates like changing a name.
      </>
    ),
  },
];

const tryItTasks = [
  "Prevent deletion of system-critical organizations (like 'admin' or 'default')",
  "Add Swagger documentation for all CRUD operations",
  "Validate that shortName is lowercase and contains no spaces or special characters",
  "Add pagination to list organizations (bonus from earlier topics)",
];

const crudTable = [
  ["Create", "POST", "/api/organizations", "Add a new organization"],
  [
    "Read",
    "GET",
    "/api/organizations/{shortName}",
    "Get organization by shortName",
  ],
  [
    "Update",
    "PUT",
    "/api/organizations/{shortName}",
    "Update organization name",
  ],
  [
    "Delete",
    "DELETE",
    "/api/organizations/{shortName}",
    "Delete an organization",
  ],
];

const Topic5Subtopic6Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>
        🚀 5.7 – Organization CRUD Operations
      </h2>
      <hr />
      <div className="yellow-callout">
        <i>
          “CRUD is not just about saving data — it’s about designing robust,
          predictable, and secure APIs for your app to communicate with the
          outside world.”
        </i>
        <br />
        <br />
        In this section, we’ll implement <b>Create</b>, <b>Read</b>,{" "}
        <b>Update</b>, and <b>Delete</b> operations for the{" "}
        <span className="blue-inline-code">Organization</span> entity using{" "}
        <b>Spring Boot</b>, making our API production-ready.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 What You Will Learn
      </h3>
      <ul className="topic-checklist">
        <li>
          How to design all 4 CRUD operations for{" "}
          <span className="blue-inline-code">Organization</span>
        </li>
        <li>How to handle errors like duplicate entries or missing data</li>
        <li>Best practices in building RESTful APIs</li>
        <li>Example requests & responses</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Quick Overview of CRUD Operations
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Operation</th>
            <th>HTTP Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {crudTable.map(([op, method, endpoint, desc], idx) => (
            <tr key={idx}>
              <td>{op}</td>
              <td>
                <span className="blue-inline-code">{method}</span>
              </td>
              <td>
                <span className="blue-inline-code">{endpoint}</span>
              </td>
              <td>{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 1. Create – POST /api/organizations
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.post ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.post, "post")}
        >
          {copied.post ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.post}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 2. Read – GET /api/organizations/&#123;shortName&#125;
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.get ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.get, "get")}
        >
          {copied.get ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.get}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✏️ 3. Update – PUT /api/organizations/&#123;shortName&#125;
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.put ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.put, "put")}
        >
          {copied.put ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.put}</code>
        </pre>
      </div>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.updateDTO ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.updateDTO, "updateDTO")}
        >
          {copied.updateDTO ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.updateDTO}</code>
        </pre>
      </div>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.putService ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.putService, "putService")}
        >
          {copied.putService ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.putService}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🗑 4. Delete – DELETE /api/organizations/&#123;shortName&#125;
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.delete ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.delete, "delete")}
        >
          {copied.delete ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.delete}</code>
        </pre>
      </div>
      <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
        <b>Optional Extension:</b> Add role-based authorization to only allow
        Admins to delete (Spring Security – covered in Section 5).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📬 Example API Flow
      </h3>
      <div className="blue-card-section">
        <b>Create</b>
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
        <b>Update</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.putRequest ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.putRequest, "putRequest")}
          >
            {copied.putRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.putRequest}</code>
          </pre>
        </div>
        <b>Response:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.putResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.putResponse, "putResponse")
            }
          >
            {copied.putResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.putResponse}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>Delete</b>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          <b>Response:</b>{" "}
          <span className="blue-inline-code">204 No Content</span>
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
        🧪 Try It Yourself
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

export default Topic5Subtopic6Content;

import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  controller: `@RestController
@RequestMapping("/api/orgs")
@RequiredArgsConstructor
public class UserOrganizationController {

    private final UserOrganizationService userOrgService;

    // ✅ Assign a user to an organization
    @PostMapping("/{orgId}/users/{userId}")
    public ResponseEntity<ApiResponse<String>> assignUser(
            @PathVariable Long orgId,
            @PathVariable Long userId,
            @RequestParam(defaultValue = "USER") String role) {

        userOrgService.assignUserToOrganization(userId, orgId, role);
        return ResponseEntity.ok(ApiResponse.success("User assigned to organization successfully"));
    }

    // ✅ Get all users of an organization
    @GetMapping("/{orgId}/users")
    public ResponseEntity<ApiResponse<List<User>>> getUsersByOrg(@PathVariable Long orgId) {
        List<User> users = userOrgService.getUsersByOrganization(orgId);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    // ✅ Get all organizations a user belongs to
    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Organization>>> getOrgsByUser(@PathVariable Long userId) {
        List<Organization> orgs = userOrgService.getOrganizationsByUser(userId);
        return ResponseEntity.ok(ApiResponse.success(orgs));
    }

    // ✅ Get user's role in a specific organization
    @GetMapping("/{orgId}/users/{userId}/role")
    public ResponseEntity<ApiResponse<String>> getUserRole(
            @PathVariable Long orgId,
            @PathVariable Long userId) {

        String role = userOrgService.getUserRoleInOrganization(userId, orgId);
        return ResponseEntity.ok(ApiResponse.success(role));
    }

    // ✅ Change user's role
    @PutMapping("/{orgId}/users/{userId}/role")
    public ResponseEntity<ApiResponse<String>> changeUserRole(
            @PathVariable Long orgId,
            @PathVariable Long userId,
            @RequestParam String role) {

        userOrgService.changeUserRole(userId, orgId, role);
        return ResponseEntity.ok(ApiResponse.success("User role updated successfully"));
    }
}`,
  assignEndpoint: `@PostMapping("/{orgId}/users/{userId}")
public ResponseEntity<ApiResponse<String>> assignUser(
        @PathVariable Long orgId,
        @PathVariable Long userId,
        @RequestParam(defaultValue = "USER") String role) {

    userOrgService.assignUserToOrganization(userId, orgId, role);
    return ResponseEntity.ok(ApiResponse.success("User assigned to organization successfully"));
}`,
  getUsersEndpoint: `@GetMapping("/{orgId}/users")
public ResponseEntity<ApiResponse<List<User>>> getUsersByOrg(@PathVariable Long orgId) {
    List<User> users = userOrgService.getUsersByOrganization(orgId);
    return ResponseEntity.ok(ApiResponse.success(users));
}`,
  getOrgsEndpoint: `@GetMapping("/user/{userId}")
public ResponseEntity<ApiResponse<List<Organization>>> getOrgsByUser(@PathVariable Long userId) {
    List<Organization> orgs = userOrgService.getOrganizationsByUser(userId);
    return ResponseEntity.ok(ApiResponse.success(orgs));
}`,
  getRoleEndpoint: `@GetMapping("/{orgId}/users/{userId}/role")
public ResponseEntity<ApiResponse<String>> getUserRole(
        @PathVariable Long orgId,
        @PathVariable Long userId) {

    String role = userOrgService.getUserRoleInOrganization(userId, orgId);
    return ResponseEntity.ok(ApiResponse.success(role));
}`,
  secureExample: `@PreAuthorize("hasRole('ADMIN')")
@PutMapping("/{orgId}/users/{userId}/role")
public ResponseEntity<ApiResponse<String>> changeUserRole(
        @PathVariable Long orgId,
        @PathVariable Long userId,
        @RequestParam String role) {

    userOrgService.changeUserRole(userId, orgId, role);
    return ResponseEntity.ok(ApiResponse.success("User role updated successfully"));
}`,
};

const apiDesignTable = [
  ["/api/orgs/{orgId}/users/{userId}", "POST", "Assign user to org"],
  ["/api/orgs/{orgId}/users", "GET", "List users in org"],
  ["/api/orgs/user/{userId}", "GET", "Get all orgs user belongs to"],
  [
    "/api/orgs/{orgId}/users/{userId}/role",
    "GET",
    "Get user's role in that org",
  ],
  ["/api/orgs/{orgId}/users/{userId}/role", "PUT", "Change user's role"],
];

const summaryTable = [
  ["Assign endpoint", "Adds user to org with role"],
  ["Users list endpoint", "Useful for org dashboards"],
  ["Orgs list for user", "Shows user their active orgs"],
  ["Role endpoints", "Manage permission levels per org"],
  ["Secure + scalable", "Perfect foundation for multi-org platforms"],
];

const discussionQA = [
  {
    question: "What should be the default role while assigning a user?",
    answer: '"USER" is a good default unless explicitly set.',
  },
  {
    question: "Why do we separate role change and assignment APIs?",
    answer:
      "To follow single-responsibility and allow admins to manage roles later.",
  },
  {
    question: "Can the same user be added to the same org twice?",
    answer:
      "No, the service logic prevents duplicates using existsByUserAndOrganization.",
  },
  {
    question: "Should these endpoints be secured?",
    answer: "Yes! Add role-based checks to restrict who can assign or update.",
  },
];

const tryItTasks = [
  "Create UserOrganizationController.java",
  "Implement all 5 endpoints shown above",
  "Test with Postman by assigning users and fetching orgs",
];

const bonusTasks = [
  "Add pagination to /users list if needed",
  "Only allow admins to change roles using a @PreAuthorize(\"hasRole('ADMIN')\") check",
];

const Topic9Subtopic4Content = () => {
  const [copied, setCopied] = useState({});
  const [openIdx, setOpenIdx] = useState(null);

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

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        🧩 9.4 – User-Organization Controller
      </h2>
      <hr />
      <div className="yellow-callout">
        <b>In this section, we'll:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Create a controller to assign users to organizations</li>
          <li>Fetch all users in an organization</li>
          <li>Get all organizations a user belongs to</li>
          <li>Retrieve or update the user's role in an organization</li>
        </ul>
        We'll make this clean, descriptive, and ready to integrate with a
        frontend or another service.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📡 Why Do We Need This Controller?
      </h3>
      <div className="blue-card-section">
        Our backend needs to expose user-organization interactions like:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">
              POST /api/orgs/&#123;orgId&#125;/users/&#123;userId&#125;
            </span>{" "}
            → Assign user
          </li>
          <li>
            <span className="blue-inline-code">
              GET /api/orgs/&#123;orgId&#125;/users
            </span>{" "}
            → List all users
          </li>
          <li>
            <span className="blue-inline-code">
              GET /api/users/&#123;userId&#125;/orgs
            </span>{" "}
            → List all orgs for a user
          </li>
          <li>
            <span className="blue-inline-code">
              PUT /api/orgs/&#123;orgId&#125;/users/&#123;userId&#125;/role
            </span>{" "}
            → Change role
          </li>
        </ul>
        All of these will be managed in a dedicated controller to keep code
        modular and focused.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Create: UserOrganizationController.java
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
        🎯 Endpoint Breakdown
      </h3>

      <h4 style={{ color: "#1976d2", marginTop: "1rem" }}>
        ✅ Assign User to Organization
      </h4>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.assignEndpoint ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.assignEndpoint, "assignEndpoint")
          }
        >
          {copied.assignEndpoint ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.assignEndpoint}</code>
        </pre>
      </div>

      <h4 style={{ color: "#1976d2", marginTop: "1rem" }}>
        ✅ Get All Users in Organization
      </h4>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.getUsersEndpoint ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.getUsersEndpoint, "getUsersEndpoint")
          }
        >
          {copied.getUsersEndpoint ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.getUsersEndpoint}</code>
        </pre>
      </div>

      <h4 style={{ color: "#1976d2", marginTop: "1rem" }}>
        ✅ Get All Organizations for User
      </h4>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.getOrgsEndpoint ? "copied" : ""}`}
          onClick={() =>
            copyToClipboard(codeBlocks.getOrgsEndpoint, "getOrgsEndpoint")
          }
        >
          {copied.getOrgsEndpoint ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.getOrgsEndpoint}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎨 Sample API Design
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Method</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {apiDesignTable.map(([endpoint, method, description], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{endpoint}</span>
              </td>
              <td>
                <span
                  style={{
                    color:
                      method === "POST"
                        ? "#4caf50"
                        : method === "PUT"
                        ? "#ff9800"
                        : "#2196f3",
                    fontWeight: "bold",
                  }}
                >
                  {method}
                </span>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔒 Security Enhancement
      </h3>
      <div className="blue-card-section">
        <b>Adding Role-Based Security:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.secureExample ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.secureExample, "secureExample")
            }
          >
            {copied.secureExample ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.secureExample}</code>
          </pre>
        </div>
        <b>This ensures only admins can change user roles in organizations.</b>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4 style={{ color: "#1976d2", margin: "0 0 0.5rem 0" }}>
          ❓ Short Answers:
        </h4>
        {discussionQA.map((qa, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}>
              Q{idx + 1}: {qa.question}
            </div>
            <button
              className="reveal-btn"
              onClick={() => handleToggle(idx)}
              aria-expanded={openIdx === idx}
              aria-controls={`answer-${idx}`}
            >
              {openIdx === idx ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openIdx === idx && (
              <div className="yellow-callout" id={`answer-${idx}`}>
                → {qa.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <b>🚀 Task:</b>
        <ol style={{ margin: "0.5rem 0 1rem 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
        <b>💡 Bonus:</b>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {bonusTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Benefit</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, benefit], idx) => (
            <tr key={idx}>
              <td>{feature}</td>
              <td>{benefit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic9Subtopic4Content;

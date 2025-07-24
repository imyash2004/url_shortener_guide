import React, { useState } from "react";
import "./CustomSectionStyles.css";

const discussionQA = [
  {
    q: "Why do we check existsByUserAndOrganization() before saving?",
    a: "To prevent duplicate assignments of the same user to the same org.",
  },
  {
    q: "What does @Query do in the repository?",
    a: "Custom JPQL queries for fetching users/orgs based on relationships.",
  },
  {
    q: "What happens if the user or org is not found?",
    a: "We throw a RuntimeException — you can later replace this with custom exceptions.",
  },
  {
    q: "What’s the benefit of putting this in a service layer?",
    a: "Business logic is reusable, testable, and not mixed with controller code.",
  },
];

const serviceInterface = `public interface UserOrganizationService {
    void assignUserToOrganization(Long userId, Long orgId, String role);
    List<User> getUsersByOrganization(Long orgId);
    List<Organization> getOrganizationsByUser(Long userId);
    String getUserRoleInOrganization(Long userId, Long orgId);
    void changeUserRole(Long userId, Long orgId, String newRole);
}`;

const serviceImpl = `@Service
@RequiredArgsConstructor
public class UserOrganizationServiceImpl implements UserOrganizationService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final UserOrganizationRepository userOrgRepo;

    @Override
    public void assignUserToOrganization(Long userId, Long orgId, String role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Organization org = organizationRepository.findById(orgId)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        // Prevent duplicates
        if (userOrgRepo.existsByUserAndOrganization(user, org)) {
            throw new RuntimeException("User already assigned to this organization");
        }

        UserOrganization userOrg = UserOrganization.builder()
                .user(user)
                .organization(org)
                .role(role.toUpperCase())
                .build();

        userOrgRepo.save(userOrg);
    }

    @Override
    public List<User> getUsersByOrganization(Long orgId) {
        return userOrgRepo.findUsersByOrganizationId(orgId);
    }

    @Override
    public List<Organization> getOrganizationsByUser(Long userId) {
        return userOrgRepo.findOrganizationsByUserId(userId);
    }

    @Override
    public String getUserRoleInOrganization(Long userId, Long orgId) {
        return userOrgRepo.findByUserIdAndOrganizationId(userId, orgId)
                .map(UserOrganization::getRole)
                .orElse("NOT ASSIGNED");
    }

    @Override
    public void changeUserRole(Long userId, Long orgId, String newRole) {
        UserOrganization userOrg = userOrgRepo.findByUserIdAndOrganizationId(userId, orgId)
                .orElseThrow(() -> new RuntimeException("Mapping not found"));
        userOrg.setRole(newRole.toUpperCase());
        userOrgRepo.save(userOrg);
    }
}`;

const repoCode = `@Repository
public interface UserOrganizationRepository extends JpaRepository<UserOrganization, Long> {

    boolean existsByUserAndOrganization(User user, Organization org);

    Optional<UserOrganization> findByUserIdAndOrganizationId(Long userId, Long orgId);

    @Query("SELECT uo.user FROM UserOrganization uo WHERE uo.organization.id = :orgId")
    List<User> findUsersByOrganizationId(Long orgId);

    @Query("SELECT uo.organization FROM UserOrganization uo WHERE uo.user.id = :userId")
    List<Organization> findOrganizationsByUserId(Long userId);
}`;

const Topic9Subtopic3Content = () => {
  const [copied, setCopied] = useState({
    intf: false,
    impl: false,
    repo: false,
  });
  const [openIdx, setOpenIdx] = useState(null);

  const handleCopy = (which, code) => {
    navigator.clipboard.writeText(code);
    setCopied((prev) => ({ ...prev, [which]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [which]: false })), 2000);
  };

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>⚙️ 9.3 – User-Organization Service</h2>
      <hr />
      <div className="yellow-callout">
        In this section, we’ll:
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Build a service layer for managing user-organization relationships
          </li>
          <li>Handle user assignments to organizations</li>
          <li>Retrieve users by organization (and vice versa)</li>
          <li>Manage roles within organizations</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          Let’s dive in and make our system truly multi-tenant and role-aware!
          🚀
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Why Do We Need This Service?
      </h3>
      <div className="blue-card-section">
        <ul className="custom-bullet-list">
          <li>Add a user to an organization</li>
          <li>List users in an organization</li>
          <li>Fetch roles or change them</li>
          <li>Prevent duplicate assignments</li>
          <li>Enforce business rules (like only admins can invite others)</li>
        </ul>
        <div style={{ marginTop: 12 }}>
          This logic goes into the <strong>UserOrganizationService</strong>,
          keeping controllers clean and your app modular.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Service Interface
      </h3>
      <div
        className="blue-card-section code-block-section"
        style={{ position: "relative" }}
      >
        <button
          className="copy-btn"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          onClick={() => handleCopy("intf", serviceInterface)}
        >
          {copied.intf ? "Copied!" : "Copy"}
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
          {serviceInterface}
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ Implementation: <code>UserOrganizationServiceImpl.java</code>
      </h3>
      <div
        className="blue-card-section code-block-section"
        style={{ position: "relative" }}
      >
        <button
          className="copy-btn"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          onClick={() => handleCopy("impl", serviceImpl)}
        >
          {copied.impl ? "Copied!" : "Copy"}
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
          {serviceImpl}
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧩 Repository Enhancements: <code>UserOrganizationRepository.java</code>
      </h3>
      <div
        className="blue-card-section code-block-section"
        style={{ position: "relative" }}
      >
        <button
          className="copy-btn"
          style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}
          onClick={() => handleCopy("repo", repoCode)}
        >
          {copied.repo ? "Copied!" : "Copy"}
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>{repoCode}</pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4>❓ Short Answers</h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}
            >{`Q${idx + 1}: ${item.q}`}</div>
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
                → {item.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <h4>🧩 Task:</h4>
        <ul style={{ margin: "0.7rem 0 0 1.2rem" }}>
          <li>
            Create the <code>UserOrganizationService</code> interface
          </li>
          <li>
            Implement it with <code>assignUserToOrganization</code>,{" "}
            <code>getUsersByOrganization</code>, etc.
          </li>
          <li>Add custom queries in the repository</li>
          <li>Test by assigning users and retrieving org lists</li>
        </ul>
        <div style={{ marginTop: "1rem" }}>
          <strong>💡 Bonus:</strong>
          <br />
          Add <code>removeUserFromOrganization(...)</code> method
          <br />
          Enforce role checks (e.g., only admins can assign)
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>✅ Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>assignUserToOrganization</td>
            <td>Assign user to org with role</td>
          </tr>
          <tr>
            <td>getUsersByOrganization</td>
            <td>List users in an org</td>
          </tr>
          <tr>
            <td>getOrganizationsByUser</td>
            <td>List orgs a user belongs to</td>
          </tr>
          <tr>
            <td>getUserRoleInOrganization</td>
            <td>Get role of user in a specific org</td>
          </tr>
          <tr>
            <td>changeUserRole</td>
            <td>Update the role of a user in the org</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Topic9Subtopic3Content;

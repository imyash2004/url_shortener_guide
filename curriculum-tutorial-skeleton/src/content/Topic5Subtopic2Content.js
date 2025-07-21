import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  orgRepo: `package com.example.repository;

import com.example.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    // Custom query to find organization by its shortName
    Optional<Organization> findByShortName(String shortName);

    // You can add more queries later like:
    // List<Organization> findByNameContaining(String keyword);
}`,
  findByShortName: `organizationRepository.findByShortName("zomato")`,
  testFetch: `public void testFetchOrganization() {
    Optional<Organization> org = organizationRepository.findByShortName("vit");
    org.ifPresent(o -> System.out.println("Found: " + o.getName()));
}`,
  repoAnnotation: `@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    ...
}`,
};

const discussionPrompts = [
  {
    q: "What if someone sends a shortName that doesn't exist in the DB? How should we handle it?",
    a: (
      <>
        Return a 404 Not Found or a clear error message to the client. Never
        return null or crash the app.
      </>
    ),
  },
  {
    q: "Should shortName be case-sensitive? Should Zomato and zomato be treated the same?",
    a: (
      <>
        It's best to enforce a consistent case (e.g., all lowercase) and treat
        them as the same to avoid confusion and duplicates.
      </>
    ),
  },
  {
    q: "Should shortName be unique in the DB? Why?",
    a: (
      <>
        Yes! Uniqueness ensures no two organizations can claim the same branded
        path. Use{" "}
        <span className="blue-inline-code">@Column(unique = true)</span> in the
        entity.
      </>
    ),
  },
];

const tryItTasks = [
  "Create the OrganizationRepository interface in your repository package.",
  "Add the findByShortName method.",
  "Test fetching an organization by shortName in a service class.",
];

const Topic5Subtopic2Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 5.3 – Organization Repository</h2>
      <hr />
      <div className="yellow-callout">
        In this step, we’ll create a <b>Spring Data JPA repository interface</b>{" "}
        for the <span className="blue-inline-code">Organization</span> entity.
        <br />
        <br />
        This will allow us to:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Perform basic CRUD operations (Create, Read, Update, Delete)</li>
          <li>
            Fetch organizations by their{" "}
            <span className="blue-inline-code">shortName</span> (very important
            for branding URLs)
          </li>
          <li>Easily integrate with the service and controller layers</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Use a Repository?
      </h3>
      <div className="blue-card-section">
        Instead of writing raw SQL, Spring Data JPA gives us{" "}
        <b>ready-to-use database access methods</b> like:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">findById(id)</span>
          </li>
          <li>
            <span className="blue-inline-code">findAll()</span>
          </li>
          <li>
            <span className="blue-inline-code">save(entity)</span>
          </li>
          <li>
            <span className="blue-inline-code">deleteById(id)</span>
          </li>
        </ul>
        And we can define <b>custom query methods</b> using naming conventions.
        <br />
        No boilerplate. No SQL headaches.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Create the Repository Interface
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.orgRepo ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.orgRepo, "orgRepo")}
        >
          {copied.orgRepo ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.orgRepo}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Let’s Understand the Code
      </h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <span className="blue-inline-code">
              JpaRepository&lt;Organization, Long&gt;
            </span>
            : Tells Spring Data to manage{" "}
            <span className="blue-inline-code">Organization</span> entities with{" "}
            <span className="blue-inline-code">Long</span> as the ID type.
          </li>
          <li>
            <span className="blue-inline-code">findByShortName(...)</span>:
            <br />
            Spring will auto-generate this query like:
          </li>
        </ul>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.findByShortName ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.findByShortName, "findByShortName")
            }
          >
            {copied.findByShortName ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.findByShortName}</code>
          </pre>
        </div>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.testFetch ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.testFetch, "testFetch")}
          >
            {copied.testFetch ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.testFetch}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚀 Real-Life Use Case
      </h3>
      <div className="blue-card-section">
        When a user shortens a URL, and they provide:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.findByShortName ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.findByShortName, "findByShortName")
            }
          >
            {copied.findByShortName ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.findByShortName}</code>
          </pre>
        </div>
        to fetch the corresponding organization before saving the URL.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Bonus Tip: Add @Repository?
      </h3>
      <div className="blue-card-section">
        Actually, you <b>don’t need to</b> manually annotate this interface with{" "}
        <span className="blue-inline-code">@Repository</span>.<br />
        Spring Boot auto-detects it because it's a{" "}
        <span className="blue-inline-code">JpaRepository</span>.<br />
        But if you want to make it explicit, it's fine:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.repoAnnotation ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.repoAnnotation, "repoAnnotation")
            }
          >
            {copied.repoAnnotation ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.repoAnnotation}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Hands-On Prompt
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Zone
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
    </div>
  );
};

export default Topic5Subtopic2Content;

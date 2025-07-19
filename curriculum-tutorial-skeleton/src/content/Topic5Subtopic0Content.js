import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  orgEntity: `package com.example.urlshortener.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "organizations", uniqueConstraints = {
    @UniqueConstraint(columnNames = "shortName")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false, unique = true)
    private String shortName;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}`,
};

const bestPractices = [
  ["Use shortName to namespace URLs", "Enables brand-specific short links"],
  [
    "Make shortName unique & URL-safe",
    "Prevents conflict across organizations (like slugs)",
  ],
  ["Add createdAt and updatedAt timestamps", "Helps in analytics and auditing"],
  [
    "Use @EntityListeners(AuditingEntityListener.class)",
    "Automatically manage time fields with Spring Data JPA",
  ],
];

const tryItTasks = [
  "Create the Organization class in your model package.",
  "Add JPA annotations and auditing setup.",
  "Validate that shortName is unique.",
  "Integrate it later with Url entity.",
];

const discussionPrompts = [
  {
    q: "What would be the branded short link for https://zomato.com/veg-biryani if the org shortName is 'zomato'?",
    a: (
      <>
        👉 <b>Answer:</b>{" "}
        <span className="blue-inline-code">short.ly/zomato/veg-biryani</span>
      </>
    ),
  },
];

const Topic5Subtopic0Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 5.1 – Organization Entity Design</h2>
      <hr />
      <div className="yellow-callout">
        In this step, we will design the{" "}
        <span className="blue-inline-code">Organization</span> entity to support{" "}
        <b>multi-tenancy</b> in our URL shortener app — enabling companies,
        brands, or individual users to manage their own branded links.
        <br />
        <br />
        This allows each organization to have:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            A unique <b>shortName</b> for branded URLs
          </li>
          <li>Their own dashboard of created URLs</li>
          <li>Separate API access and analytics</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Why Organization Entity is Needed?
      </h3>
      <div className="blue-card-section">
        Let’s say you’re building a SaaS URL shortener like Bit.ly. Different
        businesses use it:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Flipkart wants{" "}
            <span className="blue-inline-code">
              short.ly/flipkart/diwali-deals
            </span>
          </li>
          <li>
            VIT wants{" "}
            <span className="blue-inline-code">short.ly/vit/results</span>
          </li>
          <li>
            Zomato wants{" "}
            <span className="blue-inline-code">short.ly/zomato/offer123</span>
          </li>
        </ul>
        Each of these brands should <b>own their links</b>.<br />
        That’s where the <span className="blue-inline-code">
          Organization
        </span>{" "}
        entity comes in — it helps in <b>grouping URLs</b> under a brand, and
        enables filtering, branding, and permissions.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🏗️ Fields We’ll Include in Organization Entity
      </h3>
      <div className="blue-card-section">
        We design the entity with important metadata:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>id</b> – Primary key
          </li>
          <li>
            <b>name</b> – Full name of the organization
          </li>
          <li>
            <b>shortName</b> – A unique short code used in URL path
          </li>
          <li>
            <b>createdAt</b> and <b>updatedAt</b> – Timestamps to track
            lifecycle
          </li>
        </ul>
        <i>
          We’ll also relate this to the{" "}
          <span className="blue-inline-code">Url</span> entity (in a future
          step).
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Real-World Example
      </h3>
      <div className="blue-card-section">
        Let’s say an organization called “Netflix” registers:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>Name</b>: <span className="blue-inline-code">Netflix Inc.</span>
          </li>
          <li>
            <b>shortName</b>: <span className="blue-inline-code">netflix</span>
          </li>
        </ul>
        When they shorten{" "}
        <span className="blue-inline-code">
          https://netflix.com/careers/open123
        </span>
        , the final short URL becomes:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.netflix ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard("short.ly/netflix/careers2025", "netflix")
            }
          >
            {copied.netflix ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>short.ly/netflix/careers2025</code>
          </pre>
        </div>
        Much better than a generic link — it's now <b>branded</b> and{" "}
        <b>organizationally scoped</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([practice, why], idx) => (
            <tr key={idx}>
              <td>{practice}</td>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧑‍💻 Code: Organization Entity (Java + Spring JPA)
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.orgEntity ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.orgEntity, "orgEntity")}
        >
          {copied.orgEntity ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.orgEntity}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🛠️ What You Need to Do
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} className="topic-faq">
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            <span style={{ fontWeight: 500, marginLeft: 8 }}>{faq.q}</span>
            {openFAQ[idx] && (
              <div className="yellow-callout" style={{ marginTop: 8 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topic5Subtopic0Content;

import React, { useState } from "react";
import "../App.css";

const Topic2Subtopic3Content = () => {
  const [showAnswer1, setShowAnswer1] = useState(false);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [showAnswer3, setShowAnswer3] = useState(false);
  const [copiedCode, setCopiedCode] = useState({});

  const copyToClipboard = async (text, codeId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode((prev) => ({ ...prev, [codeId]: true }));
      setTimeout(() => {
        setCopiedCode((prev) => ({ ...prev, [codeId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="topic-animated-content">
      <div className="key-idea-box">
        <h3 style={{ marginTop: "0", color: "#1769aa" }}>
          🏗️{" "}
          <span style={{ color: "#1769aa" }}>
            Overview: The Gateway to the Database
          </span>
        </h3>
        <p>
          The <strong>Repository Layer</strong> is responsible for all data
          access logic. It acts as the{" "}
          <strong>bridge between your application and the database</strong>,
          using JPA to automatically generate SQL queries for many common
          operations.
        </p>
        <p>
          You define <strong>Java interfaces</strong>, and Spring Data JPA takes
          care of generating the implementation code behind the scenes — like
          magic ✨.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          <strong>
            "The Repository knows how to find, save, delete, or filter data in
            your database — and you barely write any SQL."
          </strong>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 <span style={{ color: "#1769aa" }}>Learning Outcomes</span>
      </h3>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Create a&nbsp; <code>UrlRepository</code>&nbsp; to access&nbsp;
          <code>url</code>&nbsp; table
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use&nbsp; <code>JpaRepository</code>&nbsp; to auto-generate CRUD operations
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Create&nbsp; <strong>custom query methods</strong>&nbsp; using method naming
          conventions
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Write&nbsp; <strong>custom SQL/HQL</strong>&nbsp; using&nbsp;
          <code>@Query</code>
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Understand best practices for Repository structure and naming
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘 <span style={{ color: "#1769aa" }}>What is a Repository?</span>
      </h3>
      <p>
        A <strong>Repository</strong> in Spring is an interface that manages
        data access. When you extend <code>JpaRepository</code>, you get
        built-in methods like:
      </p>
      <ul className="topic-bullets">
        <li>
          <code>save()</code>
        </li>
        <li>
          <code>findAll()</code>
        </li>
        <li>
          <code>findById()</code>
        </li>
        <li>
          <code>deleteById()</code>
        </li>
      </ul>
      <div className="topic-callout">
        <span role="img" aria-label="checkmark">
          ✅
        </span>
        <strong>You don't need to write SQL for these!</strong>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱{" "}
        <span style={{ color: "#1769aa" }}>Creating `UrlRepository.java`</span>
      </h3>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.repository ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `package com.example.urlshortener.repository;

import com.example.urlshortener.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {

    // Derived query methods
    Optional<Url> findByShortUrl(String shortUrl);

    List<Url> findAllByExpiresAtBefore(LocalDateTime now);

    List<Url> findAllByClickCountGreaterThan(Long count);

    // Custom query using JPQL
    @Query("SELECT u FROM Url u WHERE u.originalUrl LIKE %:keyword%")
    List<Url> searchByOriginalUrl(String keyword);

    // Custom query using native SQL
    @Query(value = "SELECT * FROM url WHERE short_url = :shortUrl", nativeQuery = true)
    Optional<Url> getByShortUrlNative(String shortUrl);
}`,
                "repository"
              )
            }
          >
            {copiedCode.repository ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.repository ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`package com.example.urlshortener.repository;

import com.example.urlshortener.entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UrlRepository extends JpaRepository<Url, Long> {

    // Derived query methods
    Optional<Url> findByShortUrl(String shortUrl);

    List<Url> findAllByExpiresAtBefore(LocalDateTime now);

    List<Url> findAllByClickCountGreaterThan(Long count);

    // Custom query using JPQL
    @Query("SELECT u FROM Url u WHERE u.originalUrl LIKE %:keyword%")
    List<Url> searchByOriginalUrl(String keyword);

    // Custom query using native SQL
    @Query(value = "SELECT * FROM url WHERE short_url = :shortUrl", nativeQuery = true)
    Optional<Url> getByShortUrlNative(String shortUrl);
}`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 <span style={{ color: "#1769aa" }}>How Naming Aligns with DB</span>
      </h3>
      <p>
        Spring Data JPA supports <strong>derived queries</strong> – meaning it
        creates queries <strong>based on method names</strong>:
      </p>

      <div className="topic-funfact example-block">
        <b>🔧 Method Name to SQL Translation</b>
        <div className="topic-funfact-block">
          <div>
            <strong>findByShortUrl(String url):</strong>{" "}
            <code>SELECT * FROM url WHERE short_url = ?</code>
          </div>
          <div>
            <strong>findAllByExpiresAtBefore(LocalDateTime date):</strong>{" "}
            <code>SELECT * FROM url WHERE expires_at &lt; ?</code>
          </div>
          <div>
            <strong>findAllByClickCountGreaterThan(Long count):</strong>{" "}
            <code>SELECT * FROM url WHERE click_count &gt; ?</code>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 <span style={{ color: "#1769aa" }}>Common Naming Keywords</span>
      </h3>

      <div className="topic-funfact example-block">
        <b>📋 Keyword Reference</b>
        <div className="topic-funfact-block">
          <div>
            <strong>findBy...</strong> → <code>SELECT ... WHERE ...</code>
          </div>
          <div>
            <strong>And, Or</strong> → Logical operators
          </div>
          <div>
            <strong>Like, Containing, StartsWith, EndsWith</strong> → String
            matching
          </div>
          <div>
            <strong>GreaterThan, LessThan, Before, After</strong> → Comparison
          </div>
          <div>
            <strong>OrderBy...Desc</strong> → Sorting
          </div>
        </div>
      </div>

      <p>
        <strong>Examples:</strong>
      </p>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.examples ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `List<Url> findAllByClickCountGreaterThanOrderByClickCountDesc(Long minCount);
Optional<Url> findByOriginalUrlAndExpiresAtAfter(String url, LocalDateTime time);`,
                "examples"
              )
            }
          >
            {copiedCode.examples ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.examples ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`List<Url> findAllByClickCountGreaterThanOrderByClickCountDesc(Long minCount);
Optional<Url> findByOriginalUrlAndExpiresAtAfter(String url, LocalDateTime time);`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧{" "}
        <span style={{ color: "#1769aa" }}>Custom Queries with `@Query`</span>
      </h3>
      <p>
        When derived method names aren't enough, use <code>@Query</code>:
      </p>

      <h4 style={{ color: "#1769aa", marginTop: "1rem" }}>
        🟩 JPQL (Entity-based):
      </h4>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.jpql ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `@Query("SELECT u FROM Url u WHERE u.originalUrl LIKE %:keyword%")
List<Url> searchByOriginalUrl(String keyword);`,
                "jpql"
              )
            }
          >
            {copiedCode.jpql ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.jpql ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`@Query("SELECT u FROM Url u WHERE u.originalUrl LIKE %:keyword%")
List<Url> searchByOriginalUrl(String keyword);`}</code>
          </pre>
        </div>
      </div>

      <h4 style={{ color: "#1769aa", marginTop: "1rem" }}>
        🟨 Native SQL (DB-table-based):
      </h4>

      <div className="topic-codeblock">
        <div className="code-with-copy">
          <button
            className={`copy-button ${copiedCode.native ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(
                `@Query(value = "SELECT * FROM url WHERE short_url = :shortUrl", nativeQuery = true)
Optional<Url> getByShortUrlNative(String shortUrl);`,
                "native"
              )
            }
          >
            {copiedCode.native ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
            )}
            {copiedCode.native ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{`@Query(value = "SELECT * FROM url WHERE short_url = :shortUrl", nativeQuery = true)
Optional<Url> getByShortUrlNative(String shortUrl);`}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ❓ <span style={{ color: "#1769aa" }}>Discussion Points</span>
      </h3>

      <div className="topic-funfact example-block">
        <b>
          Q1: Why use method names like `findByShortUrl` instead of writing SQL?
        </b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer1(!showAnswer1)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer1 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer1 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Spring generates SQL for you — it's less
              error-prone, faster to write, and easier to maintain.
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>Q2: When should I use `@Query`?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer2(!showAnswer2)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer2 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer2 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Use it when:
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
                <li>You need joins</li>
                <li>You want more control over the SQL</li>
                <li>You have complex filters or aggregations</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="topic-funfact example-block">
        <b>Q3: Can I update or delete records with custom queries?</b>
        <div className="topic-funfact-block">
          <button
            className="reveal-btn"
            onClick={() => setShowAnswer3(!showAnswer3)}
            style={{ marginBottom: "1rem" }}
          >
            {showAnswer3 ? "Hide Answer" : "Reveal Answer"}
          </button>
          {showAnswer3 && (
            <div
              style={{
                background: "#f8f9fa",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #dee2e6",
              }}
            >
              <strong>A:</strong> Yes. Use <code>@Modifying</code> along with{" "}
              <code>@Query</code>. Example:
              <div className="topic-codeblock" style={{ marginTop: "1rem" }}>
                <pre>
                  <code>{`@Modifying
@Query("DELETE FROM Url u WHERE u.expiresAt < :now")
void deleteExpiredUrls(LocalDateTime now);`}</code>
                </pre>
              </div>
              <p style={{ marginTop: "0.5rem" }}>
                Also add <code>@Transactional</code> on the method or the class.
              </p>
            </div>
          )}
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪{" "}
        <span style={{ color: "#1769aa" }}>
          Try It Yourself: Practice Tasks
        </span>
      </h3>

      <div className="topic-funfact example-block">
        <b>✅ Step-by-step Practice</b>
        <div className="topic-funfact-block">
          <div>1. Add this method to your repository:</div>
          <div style={{ marginLeft: "1rem" }}>
            <code>Optional&lt;Url&gt; findByShortUrl(String shortUrl);</code>
          </div>
          <div>2. Run your app and save a URL with that short code.</div>
          <div>3. In service or controller, try to retrieve it:</div>
          <div style={{ marginLeft: "1rem" }}>
            <code>
              Optional&lt;Url&gt; url = urlRepository.findByShortUrl("abc123");
            </code>
          </div>
          <div>4. Print the result or return it as API response.</div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 <span style={{ color: "#1769aa" }}>Best Practices</span>
      </h3>
      <ul className="topic-checklist">
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Keep method names meaningful and aligned with data fields
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Avoid writing SQL unless necessary
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Use <code>Optional</code> for nullable results
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Don't put business logic in repository – keep it in the service layer
        </li>
        <li>
          <span role="img" aria-label="checkmark">
            ✅
          </span>{" "}
          Keep native queries readable and minimal
        </li>
      </ul>
    </div>
  );
};

export default Topic2Subtopic3Content;

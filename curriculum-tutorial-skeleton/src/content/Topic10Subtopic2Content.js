import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  repository: `@Repository
public interface UrlHitRepository extends JpaRepository<UrlHit, Long> {

    long countByShortCode(String shortCode);

    List<UrlHit> findByShortCodeOrderByTimestampDesc(String shortCode);

    @Query("SELECT COUNT(u) FROM UrlHit u WHERE u.organizationShortName = :org")
    long countHitsByOrganization(@Param("org") String org);

    @Query("SELECT u.shortCode, COUNT(u) FROM UrlHit u WHERE u.organizationShortName = :org GROUP BY u.shortCode")
    List<Object[]> getHitsPerUrlByOrg(@Param("org") String org);
}`,
  dto: `public class UrlStatsDTO {
    private String shortCode;
    private long totalHits;
    private LocalDateTime lastAccessed;

    // Constructor, Getters, Setters
}`,
  service: `@Service
public class UrlAnalyticsService {

    @Autowired
    private UrlHitRepository urlHitRepository;

    public UrlStatsDTO getStats(String shortCode) {
        long totalHits = urlHitRepository.countByShortCode(shortCode);

        List<UrlHit> hits = urlHitRepository.findByShortCodeOrderByTimestampDesc(shortCode);
        LocalDateTime lastAccess = hits.isEmpty() ? null : hits.get(0).getTimestamp();

        return new UrlStatsDTO(shortCode, totalHits, lastAccess);
    }
}`,
  controller: `@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private UrlAnalyticsService analyticsService;

    @GetMapping("/{shortCode}")
    public ResponseEntity<UrlStatsDTO> getStats(@PathVariable String shortCode) {
        return ResponseEntity.ok(analyticsService.getStats(shortCode));
    }
}`,
  bonus: `@GetMapping("/top/{orgShortName}")
public ResponseEntity<List<Object[]>> getTopUrls(@PathVariable String orgShortName) {
    return ResponseEntity.ok(urlHitRepository.getHitsPerUrlByOrg(orgShortName));
}`
};

const metricsTable = [
  ["Total Clicks", "Total times a short URL was accessed"],
  ["Last Accessed", "Timestamp of the most recent hit"],
  ["Hits per URL", "Per-shortCode click breakdown"],
  ["Organization Stats", "Total links and total hits per org"]
];

const summaryTable = [
  ["countByShortCode", "Total number of redirects"],
  ["Last access time", "Helps see recent activity"],
  ["Organization stats", "Helps brands assess campaign performance"],
  ["DTOs + Controller", "Deliver clean, structured results"]
];

const discussionQA = [
  {
    question: "What metric tells you how many times a URL was clicked?",
    answer: "countByShortCode(...) returns total clicks."
  },
  {
    question: "How do we determine the last access time?",
    answer: "Sort hits by timestamp and pick the latest one."
  },
  {
    question: "What data structure do we return to frontend for stats?",
    answer: "UrlStatsDTO with shortCode, totalHits, and lastAccessed."
  },
  {
    question: "Where are URL stats stored?",
    answer: "Derived from the url_hits table."
  }
];

const tryItTasks = [
  "Create UrlStatsDTO",
  "Write service to count total clicks and fetch last access time",
  "Create endpoint: /api/stats/{shortCode}",
  "Bonus: Create /api/stats/top/{org} for top-performing URLs"
];

const bonusTasks = [
  "Return stats in tabular format if building a dashboard."
];

const useCases = [
  "Marketing teams (campaign effectiveness)",
  "Product managers (user engagement)",
  "Admins (abuse detection, reporting)"
];

const Topic10Subtopic2Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>📈 10.3 – URL Statistics</h2>
      <hr />
      <div className="yellow-callout">
        <b>In this section, we'll implement statistics endpoints so brands and admins can see the performance of their short links.</b>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 What Will We Track?
      </h3>
      <div className="blue-card-section">
        <b>We'll generate stats like:</b>
        <table className="custom-table" style={{ marginTop: "0.7rem" }}>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {metricsTable.map(([metric, description], idx) => (
              <tr key={idx}>
                <td><b>{metric}</b></td>
                <td>{description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "1rem" }}>
          <b>These insights are key for:</b>
          <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
            {useCases.map((useCase, idx) => (
              <li key={idx}>{useCase}</li>
            ))}
          </ul>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Extend UrlHitRepository
      </h3>
      <div className="blue-card-section">
        <b>Let's write custom methods to calculate statistics:</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.repository ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.repository, "repository")}
          >
            {copied.repository ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.repository}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Create UrlStatsDTO
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.dto ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.dto, "dto")}
        >
          {copied.dto ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.dto}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Service Layer Logic
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
        📡 Stats Endpoint
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
        📊 Bonus: Top URLs by Organization
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.bonus ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.bonus, "bonus")}
        >
          {copied.bonus ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.bonus}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Discussion Section
      </h3>
      <div className="blue-card-section">
        <h4 style={{ color: "#1976d2", margin: "0 0 0.5rem 0" }}>❓ Short Answers:</h4>
        {discussionQA.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div
              style={{ fontWeight: 500, color: "#222", marginBottom: 4 }}
            >
              Q{idx + 1}: {item.question}
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
                → {item.answer}
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
        <ul style={{ margin: "0.5rem 0 1rem 1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
        <b>💡 Extra:</b>
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
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([feature, purpose], idx) => (
            <tr key={idx}>
              <td><span className="blue-inline-code">{feature}</span></td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic10Subtopic2Content;

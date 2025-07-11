import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Topic1Content from "./content/Topic1Content";
import Topic1Subtopic0Content from "./content/Topic1Subtopic0Content";
import Topic1Subtopic1Content from "./content/Topic1Subtopic1Content";
import Topic1Subtopic3Content from "./content/Topic1Subtopic3Content";
import Topic1Subtopic4Content from "./content/Topic1Subtopic4Content";
import Topic1Subtopic5Content from "./content/Topic1Subtopic5Content";
import Topic1Subtopic6Content from "./content/Topic1Subtopic6Content";
import Topic2Content from "./content/Topic2Content";
import Topic2Subtopic1Content from "./content/Topic2Subtopic1Content";
import Topic2Subtopic2Content from "./content/Topic2Subtopic2Content";

const curriculum = [
  {
    title: "Project Setup & Introduction",
    subtopics: [
      "Spring Boot Project Initialization",
      "Version Control Setup",
      "Project Structure Overview",
      "Maven Dependencies Configuration",
      "IDE Setup and Configuration",
      "Hands-On Assignment & Challenges",
    ],
  },
  {
    title: "First API (List URLs without Pagination)",
    subtopics: [
      "Entity Design - URL Entity",
      "Database Configuration",
      "Repository Layer",
      "DTOs (Data Transfer Objects)",
      "Response DTOs",
      "Service Layer",
      "Controller Layer",
      "Exception Handling Basics",
      "Compile & Build",
      "Deploy & Run Locally",
      "Test with Postman/curl",
    ],
  },
  {
    title: "Create, Update and Delete API",
    subtopics: [
      "Create URL API",
      "Update URL API",
      "Delete URL API",
      "Request DTOs",
      "Validation",
      "Error Handling",
      "Service Layer Enhancements",
      "Repository Custom Methods",
      "Testing CRUD Operations",
    ],
  },
  {
    title: "List with Pagination",
    subtopics: [
      "Pagination Concepts",
      "Spring Data Pagination",
      "Pageable Parameters",
      "Page Response DTOs",
      "Controller Pagination Implementation",
      "Service Layer Pagination",
      "Sorting Implementation",
      "Testing Paginated APIs",
    ],
  },
  {
    title: "Organization API",
    subtopics: [
      "Organization Entity Design",
      "URL-Organization Relationship",
      "Organization Repository",
      "Organization DTOs",
      "Organization Service Layer",
      "Organization Controller",
      "Organization CRUD Operations",
      "URL Filtering by Organization",
      "Testing Organization APIs",
    ],
  },
  {
    title: "Redirect Controller",
    subtopics: [
      "Short Code Generation Logic",
      "Redirect Controller Implementation",
      "Path Variable Handling",
      "HTTP Redirect Response",
      "Analytics Tracking",
      "Error Handling for Invalid URLs",
      "Testing Redirect Functionality",
    ],
  },
  {
    title: "Users and JWT",
    subtopics: [
      "User Entity Design",
      "User Repository",
      "Authentication DTOs",
      "Password Encryption",
      "JWT Token Generation",
      "JWT Token Validation",
      "Auth Service Implementation",
      "Auth Controller (Login/Register)",
      "JWT Configuration",
      "Testing Authentication APIs",
    ],
  },
  {
    title: "Security Configuration & Best Practices",
    subtopics: [
      "Spring Security Configuration",
      "JWT Security Filter",
      "Method Level Security",
      "URL-based Security",
      "Security Utilities",
      "Custom Annotations",
      "CORS Configuration",
      "Security Testing",
    ],
  },
  {
    title: "User-Organization Relationship",
    subtopics: [
      "UserOrganization Entity",
      "Many-to-Many Relationship",
      "User-Organization Service",
      "User-Organization Controller",
      "Role-based Access",
      "Organization Membership Management",
    ],
  },
  {
    title: "Advanced Features",
    subtopics: [
      "URL Expiration",
      "Custom Short Codes",
      "URL Statistics",
      "Bulk Operations (Not Required)",
      "Search and Filtering",
      "Rate Limiting (Not Required)",
    ],
  },
  {
    title: "Testing & Quality",
    subtopics: [
      "Unit Testing",
      "Integration Testing",
      "Repository Testing",
      "Controller Testing",
      "Test Configuration",
      "Test Data Management",
      "Code Coverage",
    ],
  },
  {
    title: "Documentation & API Standards",
    subtopics: [
      "API Documentation (Swagger/OpenAPI)",
      "Code Documentation",
      "README Documentation",
      "API Versioning (Not Required)",
      "Response Standardization",
      "Error Code Standards (Not Required)",
    ],
  },
  {
    title: "Performance & Optimization",
    subtopics: [
      "Database Indexing (Not Required)",
      "Query Optimization (Not Required)",
      "Caching Implementation (Not Required)",
      "Performance Testing (Not Required)",
      "Memory Management (Not Required)",
    ],
  },
  {
    title: "Deployment & Production",
    subtopics: [
      "Production Configuration",
      "Environment Variables",
      "Database Migration (Not Required)",
      "Packaging with Maven",
      "Docker Configuration (Optional)",
      "Cloud Deployment (Not Required)",
      "Monitoring and Logging (Not Required)",
    ],
  },
  {
    title: "Frontend Integration Preparation",
    subtopics: [
      "CORS Configuration",
      "API Contract Definition",
      "Frontend-Backend Communication",
      "API Testing for Frontend",
      "Mock Data Setup",
    ],
  },
];

function TOCModal({ show, onClose, activeIdx, activeSubIdx }) {
  const navigate = useNavigate();
  if (!show) return null;
  return (
    <div className="centered-bg modal-bg">
      <div className="toc-card">
        <div className="toc-header">
          <h2 className="toc-title">Table of Contents</h2>
          <button className="close-btn" onClick={onClose}>
            × Close
          </button>
        </div>
        <div className="toc-list-wrapper">
          <ul className="toc-list">
            {curriculum.map((section, idx) => (
              <li key={section.title}>
                <div
                  className={`toc-item${
                    activeIdx === idx && activeSubIdx == null ? " active" : ""
                  }`}
                  onClick={() => {
                    navigate(`/topic/${idx}`);
                    onClose();
                  }}
                >
                  <span className="toc-number">{idx + 1}</span>
                  <span className="toc-text">{section.title}</span>
                </div>
                <ul className="toc-subtopics">
                  {section.subtopics.map((sub, subIdx) => (
                    <li
                      key={subIdx}
                      className={`toc-subtopic${
                        activeIdx === idx && activeSubIdx === subIdx
                          ? " active"
                          : ""
                      }`}
                      onClick={() => {
                        navigate(`/topic/${idx}/subtopic/${subIdx}`);
                        onClose();
                      }}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TopBar({
  showCard,
  setShowCard,
  heading,
  progress,
  onPrev,
  onNext,
  prevDisabled,
  nextDisabled,
}) {
  return (
    <div className="topbar-stack">
      <div className="toc-btn-row">
        <button
          className="toc-open-btn-centered"
          onClick={() => setShowCard(true)}
        >
          <span role="img" aria-label="toc">
            📋
          </span>{" "}
          Table of Contents
        </button>
      </div>
      <div className="heading-row">
        <button
          className="nav-btn prev"
          onClick={onPrev}
          disabled={prevDisabled}
        >
          &larr; Previous
        </button>
        <div className="heading-center">
          <h1 className="main-heading">{heading}</h1>
          <span className="progress-indicator">{progress}</span>
        </div>
        <button
          className="nav-btn next"
          onClick={onNext}
          disabled={nextDisabled}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

function TopicPage() {
  const { id } = useParams();
  const idx = parseInt(id, 10);
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);
  const validIdx = isNaN(idx) || idx < 0 || idx >= curriculum.length ? 0 : idx;

  // Navigation logic for topics
  const goPrev = () => {
    if (validIdx > 0) {
      const prevTopic = curriculum[validIdx - 1];
      if (prevTopic.subtopics && prevTopic.subtopics.length > 0) {
        // Go to last subtopic of previous topic
        navigate(
          `/topic/${validIdx - 1}/subtopic/${prevTopic.subtopics.length - 1}`
        );
      } else {
        navigate(`/topic/${validIdx - 1}`);
      }
    }
  };
  const goNext = () => {
    if (
      curriculum[validIdx].subtopics &&
      curriculum[validIdx].subtopics.length > 0
    ) {
      // Go to first subtopic of this topic
      navigate(`/topic/${validIdx}/subtopic/0`);
    } else if (validIdx < curriculum.length - 1) {
      navigate(`/topic/${validIdx + 1}`);
    }
  };

  return (
    <div className="main-bg-gradient">
      <TopBar
        showCard={showCard}
        setShowCard={setShowCard}
        heading={curriculum[validIdx].title}
        progress={`${validIdx + 1} / ${curriculum.length}`}
        onPrev={goPrev}
        onNext={goNext}
        prevDisabled={validIdx === 0}
        nextDisabled={
          validIdx === curriculum.length - 1 &&
          (!curriculum[validIdx].subtopics ||
            curriculum[validIdx].subtopics.length === 0)
        }
      />
      <div className="content-card">
        {validIdx === 0 ? (
          <Topic1Content />
        ) : validIdx === 1 ? (
          <Topic2Content />
        ) : (
          <div className="subtopic-scroll-list">
            <ul className="section-bullets">
              {curriculum[validIdx].subtopics.map((sub, i) => (
                <li
                  key={i}
                  className="subtopic-link"
                  onClick={() => navigate(`/topic/${validIdx}/subtopic/${i}`)}
                  style={{
                    cursor: "pointer",
                    color: "#1769aa",
                    textDecoration: "underline",
                  }}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <TOCModal
        show={showCard}
        onClose={() => setShowCard(false)}
        activeIdx={validIdx}
      />
    </div>
  );
}

function SubtopicPage() {
  const { topicId, subId } = useParams();
  const tIdx = parseInt(topicId, 10);
  const sIdx = parseInt(subId, 10);
  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(false);
  const validTIdx =
    isNaN(tIdx) || tIdx < 0 || tIdx >= curriculum.length ? 0 : tIdx;
  const validSIdx =
    isNaN(sIdx) || sIdx < 0 || sIdx >= curriculum[validTIdx].subtopics.length
      ? 0
      : sIdx;

  // Navigation logic for subtopics
  const goPrev = () => {
    if (validSIdx === 0) {
      navigate(`/topic/${validTIdx}`);
    } else if (validSIdx > 0) {
      navigate(`/topic/${validTIdx}/subtopic/${validSIdx - 1}`);
    } else if (validTIdx > 0) {
      const prevTopic = curriculum[validTIdx - 1];
      if (prevTopic.subtopics && prevTopic.subtopics.length > 0) {
        navigate(
          `/topic/${validTIdx - 1}/subtopic/${prevTopic.subtopics.length - 1}`
        );
      } else {
        navigate(`/topic/${validTIdx - 1}`);
      }
    }
  };
  const goNext = () => {
    if (validSIdx < curriculum[validTIdx].subtopics.length - 1) {
      // Go to next subtopic in the same topic
      navigate(`/topic/${validTIdx}/subtopic/${validSIdx + 1}`);
    } else if (
      validSIdx === curriculum[validTIdx].subtopics.length - 1 &&
      validTIdx < curriculum.length - 1
    ) {
      // Go to next topic overview
      navigate(`/topic/${validTIdx + 1}`);
    } else if (validTIdx < curriculum.length - 1) {
      // Go to next topic or its first subtopic
      const nextTopic = curriculum[validTIdx + 1];
      if (nextTopic.subtopics && nextTopic.subtopics.length > 0) {
        navigate(`/topic/${validTIdx + 1}/subtopic/0`);
      } else {
        navigate(`/topic/${validTIdx + 1}`);
      }
    }
  };

  // Disable logic
  const prevDisabled = validTIdx === 0 && validSIdx === 0;
  const nextDisabled =
    validTIdx === curriculum.length - 1 &&
    validSIdx === curriculum[validTIdx].subtopics.length - 1;

  return (
    <div className="main-bg-gradient">
      <TopBar
        showCard={showCard}
        setShowCard={setShowCard}
        heading={curriculum[validTIdx].subtopics[validSIdx]}
        progress={`${validTIdx + 1}.${validSIdx + 1} / ${curriculum.length}.${
          curriculum[validTIdx].subtopics.length
        }`}
        onPrev={goPrev}
        onNext={goNext}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
      />
      <div className="content-card">
        <h2 className="section-title">
          {curriculum[validTIdx].subtopics[validSIdx]}
        </h2>
        <hr className="section-underline" />
        {validTIdx === 0 && validSIdx === 0 ? (
          <Topic1Subtopic0Content />
        ) : validTIdx === 0 && validSIdx === 1 ? (
          <Topic1Subtopic1Content />
        ) : validTIdx === 0 && validSIdx === 2 ? (
          <Topic1Subtopic3Content />
        ) : validTIdx === 0 && validSIdx === 3 ? (
          <Topic1Subtopic4Content />
        ) : validTIdx === 0 && validSIdx === 4 ? (
          <Topic1Subtopic5Content />
        ) : validTIdx === 0 && validSIdx === 5 ? (
          <Topic1Subtopic6Content />
        ) : validTIdx === 1 && validSIdx === 0 ? (
          <Topic2Subtopic1Content />
        ) : validTIdx === 1 && validSIdx === 1 ? (
          <Topic2Subtopic2Content />
        ) : (
          <>
            <div
              style={{ color: "#888", fontSize: "1.1rem", marginTop: "1.5rem" }}
            >
              Placeholder content for{" "}
              <b>{curriculum[validTIdx].subtopics[validSIdx]}</b>.
            </div>
          </>
        )}
      </div>
      <TOCModal
        show={showCard}
        onClose={() => setShowCard(false)}
        activeIdx={validTIdx}
        activeSubIdx={validSIdx}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/topic/0" replace />} />
        <Route path="/topic/:id" element={<TopicPage />} />
        <Route
          path="/topic/:topicId/subtopic/:subId"
          element={<SubtopicPage />}
        />
        <Route path="*" element={<Navigate to="/topic/0" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

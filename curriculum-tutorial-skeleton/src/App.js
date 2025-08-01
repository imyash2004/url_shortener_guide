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
import Topic2Subtopic3Content from "./content/Topic2Subtopic3Content";
import Topic2Subtopic4Content from "./content/Topic2Subtopic4Content";
import Topic2Subtopic5Content from "./content/Topic2Subtopic5Content";
import Topic2Subtopic6Content from "./content/Topic2Subtopic6Content";
import Topic2Subtopic7Content from "./content/Topic2Subtopic7Content";
import Topic2Subtopic8Content from "./content/Topic2Subtopic8Content";
import Topic2Subtopic9Content from "./content/Topic2Subtopic9Content";
import Topic2Subtopic10Content from "./content/Topic2Subtopic10Content";
import Topic2Subtopic11Content from "./content/Topic2Subtopic11Content";
import Topic3Content from "./content/Topic3Content";
import Topic3Subtopic1Content from "./content/Topic3Subtopic1Content";
import Topic3Subtopic2Content from "./content/Topic3Subtopic2Content";
import Topic3Subtopic3Content from "./content/Topic3Subtopic3Content";
import Topic3Subtopic4Content from "./content/Topic3Subtopic4Content";
import Topic3Subtopic5Content from "./content/Topic3Subtopic5Content";
import Topic3Subtopic6Content from "./content/Topic3Subtopic6Content";
import Topic3Subtopic7Content from "./content/Topic3Subtopic7Content";
import Topic3Subtopic8Content from "./content/Topic3Subtopic8Content";
import Topic3Subtopic9Content from "./content/Topic3Subtopic9Content";
import Topic4Content from "./content/Topic4Content";
import Topic4Subtopic0Content from "./content/Topic4Subtopic0Content";
import Topic4Subtopic1Content from "./content/Topic4Subtopic1Content";
import Topic4Subtopic2Content from "./content/Topic4Subtopic2Content";
import Topic4Subtopic3Content from "./content/Topic4Subtopic3Content";
import Topic4Subtopic4Content from "./content/Topic4Subtopic4Content";
import Topic4Subtopic5Content from "./content/Topic4Subtopic5Content";
import Topic4Subtopic6Content from "./content/Topic4Subtopic6Content";
import Topic4Subtopic7Content from "./content/Topic4Subtopic7Content";
import Topic5Content from "./content/Topic5Content";
import Topic5Subtopic0Content from "./content/Topic5Subtopic0Content";
import Topic5Subtopic1Content from "./content/Topic5Subtopic1Content";
import Topic5Subtopic2Content from "./content/Topic5Subtopic2Content";
import Topic5Subtopic3Content from "./content/Topic5Subtopic3Content";
import Topic5Subtopic4Content from "./content/Topic5Subtopic4Content";
import Topic5Subtopic5Content from "./content/Topic5Subtopic5Content";
import Topic5Subtopic6Content from "./content/Topic5Subtopic6Content";
import Topic5Subtopic7Content from "./content/Topic5Subtopic7Content";
import Topic6Content from "./content/Topic6Content";
import Topic6Subtopic0Content from "./content/Topic6Subtopic0Content";
import Topic6Subtopic1Content from "./content/Topic6Subtopic1Content";
import Topic6Subtopic2Content from "./content/Topic6Subtopic2Content";
import Topic6Subtopic3Content from "./content/Topic6Subtopic3Content";
import Topic7Content from "./content/Topic7Content";
import Topic7Subtopic0Content from "./content/Topic7Subtopic0Content";
import Topic7Subtopic1Content from "./content/Topic7Subtopic1Content";
import Topic7Subtopic2Content from "./content/Topic7Subtopic2Content";
import Topic7Subtopic4Content from "./content/Topic7Subtopic4Content";
import Topic7Subtopic3Content from "./content/Topic7Subtopic3Content";
import Topic7Subtopic5Content from "./content/Topic7Subtopic5Content";
import Topic7Subtopic6Content from "./content/Topic7Subtopic6Content";
import Topic7Subtopic7Content from "./content/Topic7Subtopic7Content";
import Topic7Subtopic8Content from "./content/Topic7Subtopic8Content";
import Topic7Subtopic9Content from "./content/Topic7Subtopic9Content";
import Topic7Subtopic10Content from "./content/Topic7Subtopic10Content";
import Topic8Content from "./content/Topic8Content";
import Topic8Subtopic1Content from "./content/Topic8Subtopic1Content";
import Topic8Subtopic2Content from "./content/Topic8Subtopic2Content";
import Topic8Subtopic3Content from "./content/Topic8Subtopic3Content";
import Topic8Subtopic4Content from "./content/Topic8Subtopic4Content";
import Topic8Subtopic5Content from "./content/Topic8Subtopic5Content";
import Topic8Subtopic6Content from "./content/Topic8Subtopic6Content";
import Topic8Subtopic7Content from "./content/Topic8Subtopic7Content";
import Topic8Subtopic8Content from "./content/Topic8Subtopic8Content";
import Topic9Content from "./content/Topic9Content";
import Topic9Subtopic1Content from "./content/Topic9Subtopic1Content";
import Topic9Subtopic2Content from "./content/Topic9Subtopic2Content";
import Topic9Subtopic3Content from "./content/Topic9Subtopic3Content";
import Topic9Subtopic4Content from "./content/Topic9Subtopic4Content";
import Topic9Subtopic5Content from "./content/Topic9Subtopic5Content";
import Topic10Content from "./content/Topic10Content";
import Topic10Subtopic0Content from "./content/Topic10Subtopic0Content";
import Topic10Subtopic1Content from "./content/Topic10Subtopic1Content";
import Topic10Subtopic2Content from "./content/Topic10Subtopic2Content";
import Topic11Content from "./content/Topic11Content";
import Topic11Subtopic0Content from "./content/Topic11Subtopic0Content";
import Topic11Subtopic1Content from "./content/Topic11Subtopic1Content";
import Topic11Subtopic2Content from "./content/Topic11Subtopic2Content";
import Topic11Subtopic3Content from "./content/Topic11Subtopic3Content";
import Topic11Subtopic4Content from "./content/Topic11Subtopic4Content";
import Topic12Content from "./content/Topic12Content";
import Topic12Subtopic1Content from "./content/Topic12Subtopic1Content";
import Topic12Subtopic2Content from "./content/Topic12Subtopic2Content";
import Topic12Subtopic3Content from "./content/Topic12Subtopic3Content";
import Topic12Subtopic4Content from "./content/Topic12Subtopic4Content";
import Topic12Subtopic5Content from "./content/Topic12Subtopic5Content";
import Topic13Content from "./content/Topic13Content";
import Topic13Subtopic1Content from "./content/Topic13Subtopic1Content";
import Topic13Subtopic2Content from "./content/Topic13Subtopic2Content";
import Topic13Subtopic3Content from "./content/Topic13Subtopic3Content";
import Topic13Subtopic4Content from "./content/Topic13Subtopic4Content";
import Topic13Subtopic5Content from "./content/Topic13Subtopic5Content";

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
    ],
  },
  {
    title: "Redirect Controller",
    subtopics: [
      "Short Code Generation Logic",
      "Redirect Controller Implementation",
      "Path Variable Handling",
      "HTTP Redirect Response",
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
    ],
  },
  {
    title: "Advanced Features",
    subtopics: ["URL Expiration", "Custom Short Codes", "URL Statistics"],
  },
  {
    title: "Testing & Quality",
    subtopics: [
      "Unit Testing with JUnit & Mockito",
      "Integration Testing with @SpringBootTest",
      "Controller Layer Testing with MockMvc",
      "Test Configuration & Setup",
      "Test Data Management",
    ],
  },
  {
    title: "Code Coverage & Quality Tools",
    subtopics: [
      "Introduction to Code Quality & SonarQube",
      "Setting Up SonarQube Locally with Docker",
      "Integrating SonarQube with Spring Boot",
      "Understanding SonarQube Metrics",
      "Improving Code Quality & Fixing Issues",
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
        ) : validIdx === 2 ? (
          <Topic3Content />
        ) : validIdx === 3 ? (
          <Topic4Content />
        ) : validIdx === 4 ? (
          <Topic5Content />
        ) : validIdx === 5 ? (
          <Topic6Content />
        ) : validIdx === 6 ? (
          <Topic7Content />
        ) : validIdx === 7 ? (
          <Topic8Content />
        ) : validIdx === 8 ? (
          <Topic9Content />
        ) : validIdx === 9 ? (
          <Topic10Content />
        ) : validIdx === 10 ? (
          <Topic11Content />
        ) : validIdx === 11 ? (
          <Topic12Content />
        ) : validIdx === 12 ? (
          <Topic13Content />
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
        ) : validTIdx === 1 && validSIdx === 2 ? (
          <Topic2Subtopic3Content />
        ) : validTIdx === 1 && validSIdx === 3 ? (
          <Topic2Subtopic4Content />
        ) : validTIdx === 1 && validSIdx === 4 ? (
          <Topic2Subtopic5Content />
        ) : validTIdx === 1 && validSIdx === 5 ? (
          <Topic2Subtopic6Content />
        ) : validTIdx === 1 && validSIdx === 6 ? (
          <Topic2Subtopic7Content />
        ) : validTIdx === 1 && validSIdx === 7 ? (
          <Topic2Subtopic8Content />
        ) : validTIdx === 1 && validSIdx === 8 ? (
          <Topic2Subtopic9Content />
        ) : validTIdx === 1 && validSIdx === 9 ? (
          <Topic2Subtopic10Content />
        ) : validTIdx === 1 && validSIdx === 10 ? (
          <Topic2Subtopic11Content />
        ) : validTIdx === 2 && validSIdx === 0 ? (
          <Topic3Subtopic1Content />
        ) : validTIdx === 2 && validSIdx === 1 ? (
          <Topic3Subtopic2Content />
        ) : validTIdx === 2 && validSIdx === 2 ? (
          <Topic3Subtopic3Content />
        ) : validTIdx === 2 && validSIdx === 3 ? (
          <Topic3Subtopic4Content />
        ) : validTIdx === 2 && validSIdx === 4 ? (
          <Topic3Subtopic5Content />
        ) : validTIdx === 2 && validSIdx === 5 ? (
          <Topic3Subtopic6Content />
        ) : validTIdx === 2 && validSIdx === 6 ? (
          <Topic3Subtopic7Content />
        ) : validTIdx === 2 && validSIdx === 7 ? (
          <Topic3Subtopic8Content />
        ) : validTIdx === 2 && validSIdx === 8 ? (
          <Topic3Subtopic9Content />
        ) : validTIdx === 3 && validSIdx === 0 ? (
          <Topic4Subtopic0Content />
        ) : validTIdx === 3 && validSIdx === 1 ? (
          <Topic4Subtopic1Content />
        ) : validTIdx === 3 && validSIdx === 2 ? (
          <Topic4Subtopic2Content />
        ) : validTIdx === 3 && validSIdx === 3 ? (
          <Topic4Subtopic3Content />
        ) : validTIdx === 3 && validSIdx === 4 ? (
          <Topic4Subtopic4Content />
        ) : validTIdx === 3 && validSIdx === 5 ? (
          <Topic4Subtopic5Content />
        ) : validTIdx === 3 && validSIdx === 6 ? (
          <Topic4Subtopic6Content />
        ) : validTIdx === 3 && validSIdx === 7 ? (
          <Topic4Subtopic7Content />
        ) : validTIdx === 4 && validSIdx === 0 ? (
          <Topic5Subtopic0Content />
        ) : validTIdx === 4 && validSIdx === 1 ? (
          <Topic5Subtopic1Content />
        ) : validTIdx === 4 && validSIdx === 2 ? (
          <Topic5Subtopic2Content />
        ) : validTIdx === 4 && validSIdx === 3 ? (
          <Topic5Subtopic3Content />
        ) : validTIdx === 4 && validSIdx === 4 ? (
          <Topic5Subtopic4Content />
        ) : validTIdx === 4 && validSIdx === 5 ? (
          <Topic5Subtopic5Content />
        ) : validTIdx === 4 && validSIdx === 6 ? (
          <Topic5Subtopic6Content />
        ) : validTIdx === 4 && validSIdx === 7 ? (
          <Topic5Subtopic7Content />
        ) : validTIdx === 5 && validSIdx === 0 ? (
          <Topic6Subtopic0Content />
        ) : validTIdx === 5 && validSIdx === 1 ? (
          <Topic6Subtopic1Content />
        ) : validTIdx === 5 && validSIdx === 2 ? (
          <Topic6Subtopic2Content />
        ) : validTIdx === 5 && validSIdx === 3 ? (
          <Topic6Subtopic3Content />
        ) : validTIdx === 6 && validSIdx === 0 ? (
          <Topic7Subtopic0Content />
        ) : validTIdx === 6 && validSIdx === 1 ? (
          <Topic7Subtopic1Content />
        ) : validTIdx === 6 && validSIdx === 2 ? (
          <Topic7Subtopic2Content />
        ) : validTIdx === 6 && validSIdx === 3 ? (
          <Topic7Subtopic3Content />
        ) : validTIdx === 6 && validSIdx === 4 ? (
          <Topic7Subtopic4Content />
        ) : validTIdx === 6 && validSIdx === 5 ? (
          <Topic7Subtopic5Content />
        ) : validTIdx === 6 && validSIdx === 6 ? (
          <Topic7Subtopic6Content />
        ) : validTIdx === 6 && validSIdx === 7 ? (
          <Topic7Subtopic7Content />
        ) : validTIdx === 6 && validSIdx === 8 ? (
          <Topic7Subtopic8Content />
        ) : validTIdx === 6 && validSIdx === 9 ? (
          <Topic7Subtopic9Content />
        ) : validTIdx === 6 && validSIdx === 10 ? (
          <Topic7Subtopic10Content />
        ) : validTIdx === 7 && validSIdx === 0 ? (
          <Topic8Subtopic1Content />
        ) : validTIdx === 7 && validSIdx === 1 ? (
          <Topic8Subtopic2Content />
        ) : validTIdx === 7 && validSIdx === 2 ? (
          <Topic8Subtopic3Content />
        ) : validTIdx === 7 && validSIdx === 3 ? (
          <Topic8Subtopic4Content />
        ) : validTIdx === 7 && validSIdx === 4 ? (
          <Topic8Subtopic5Content />
        ) : validTIdx === 7 && validSIdx === 5 ? (
          <Topic8Subtopic6Content />
        ) : validTIdx === 7 && validSIdx === 6 ? (
          <Topic8Subtopic7Content />
        ) : validTIdx === 7 && validSIdx === 7 ? (
          <Topic8Subtopic8Content />
        ) : validTIdx === 8 && validSIdx === 0 ? (
          <Topic9Subtopic1Content />
        ) : validTIdx === 8 && validSIdx === 1 ? (
          <Topic9Subtopic2Content />
        ) : validTIdx === 8 && validSIdx === 2 ? (
          <Topic9Subtopic3Content />
        ) : validTIdx === 8 && validSIdx === 3 ? (
          <Topic9Subtopic4Content />
        ) : validTIdx === 8 && validSIdx === 4 ? (
          <Topic9Subtopic5Content />
        ) : validTIdx === 9 && validSIdx === 0 ? (
          <Topic10Subtopic0Content />
        ) : validTIdx === 9 && validSIdx === 1 ? (
          <Topic10Subtopic1Content />
        ) : validTIdx === 9 && validSIdx === 2 ? (
          <Topic10Subtopic2Content />
        ) : validTIdx === 10 && validSIdx === 0 ? (
          <Topic11Subtopic0Content />
        ) : validTIdx === 10 && validSIdx === 1 ? (
          <Topic11Subtopic1Content />
        ) : validTIdx === 10 && validSIdx === 2 ? (
          <Topic11Subtopic2Content />
        ) : validTIdx === 10 && validSIdx === 3 ? (
          <Topic11Subtopic3Content />
        ) : validTIdx === 10 && validSIdx === 4 ? (
          <Topic11Subtopic4Content />
        ) : validTIdx === 11 && validSIdx === 0 ? (
          <Topic12Subtopic1Content />
        ) : validTIdx === 11 && validSIdx === 1 ? (
          <Topic12Subtopic2Content />
        ) : validTIdx === 11 && validSIdx === 2 ? (
          <Topic12Subtopic3Content />
        ) : validTIdx === 11 && validSIdx === 3 ? (
          <Topic12Subtopic4Content />
        ) : validTIdx === 11 && validSIdx === 4 ? (
          <Topic12Subtopic5Content />
        ) : validTIdx === 12 && validSIdx === 0 ? (
          <Topic13Subtopic1Content />
        ) : validTIdx === 12 && validSIdx === 1 ? (
          <Topic13Subtopic2Content />
        ) : validTIdx === 12 && validSIdx === 2 ? (
          <Topic13Subtopic3Content />
        ) : validTIdx === 12 && validSIdx === 3 ? (
          <Topic13Subtopic4Content />
        ) : validTIdx === 12 && validSIdx === 4 ? (
          <Topic13Subtopic5Content />
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

import React from "react";
import "../App.css";

export default function Topic1Content() {
  return (
    <div className="topic-content">
      <h2 className="section-title">1. Project Setup & Introduction</h2>
      <hr className="section-underline" />
      <h3 style={{ marginTop: "1.2rem" }}>
        🎯 <b>What’s This Section About?</b>
      </h3>
      <p>
        Before diving into building APIs or adding security, it’s important to
        start with a solid foundation. In this section, we’ll walk through the{" "}
        <b>essential setup steps</b> that every modern Spring Boot project
        needs.
      </p>
      <p>
        Think of this as setting up your workshop before starting a big project
        — arranging your tools, organizing the space, and ensuring everything
        runs smoothly.
      </p>
      <h3 style={{ marginTop: "1.5rem" }}>
        🧩 <b>What You’ll Learn</b>
      </h3>
      <ul className="topic-checklist">
        <li>
          ✅ Create a new Spring Boot project using&nbsp;
          <b>Spring Initializr</b>
        </li>
        <li>
          ✅ Understand how the&nbsp; <b>project is structured</b>&nbsp; and why that
          matters.
        </li>
        <li>
          ✅ Use &nbsp;<b>Maven</b>&nbsp; to manage dependencies and build your application.
        </li>
        <li>
          ✅ Set up &nbsp;<b>Git & GitHub</b>&nbsp; to track changes and collaborate with
          others.
        </li>
        <li>
          ✅ Configure your &nbsp;<b>IDE (like IntelliJ or Eclipse)</b>&nbsp; for
          productivity and debugging.
        </li>
      </ul>
      <h3 style={{ marginTop: "1.5rem" }}>
        🔧 <b>Why It Matters</b>
      </h3>
      <ul className="topic-bullets">
        <li>Saves you time in the long run.</li>
        <li>Helps your team understand and contribute more easily.</li>
        <li>
          Makes your code scalable and production-ready from the beginning.
        </li>
      </ul>
      <div className="topic-callout">
        <span role="img" aria-label="lightbulb">
          💡
        </span>
        <b>Did You Know?</b>
        <br />
        <span style={{ color: "#555" }}>
          Spring Boot eliminates boilerplate code and configurations — with just
          a few clicks, you’ll have a working app structure ready to run!
        </span>
      </div>
      <h3 style={{ marginTop: "1.5rem" }}>
        📦 <b>Modules Covered in This Section:</b>
      </h3>
      <ol className="topic-modules">
        <li>
          <b>Spring Boot Project Initialization</b> – Creating your first app
          the smart way.
        </li>
        <li>
          <b>Version Control with Git</b> – Track, commit, and collaborate.
        </li>
        <li>
          <b>Understanding Project Structure</b> – Know where your code lives
          and why.
        </li>
        <li>
          <b>Maven Dependency Management</b> – Add features with a single line.
        </li>
        <li>
          <b>IDE Setup & Configuration</b> – Get your tools working for you.
        </li>
      </ol>
    </div>
  );
}

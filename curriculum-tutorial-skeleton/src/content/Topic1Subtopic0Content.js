import React, { useState } from "react";
import "../App.css";

export default function Topic1Subtopic0Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);

  return (
    <div className="topic-content">
      <div className="key-idea-box">
        <h3>🚀 Overview: Let’s Get Your Project Off the Ground!</h3>
        <p>
          Starting a project is like setting the foundation of a house — it
          needs to be strong, clean, and clear. In this lesson, we’ll walk you
          through how to create a Spring Boot application using Maven,
          understand the purpose of each part of the generated project, and get
          it up and running in your IDE.
        </p>
        <p>
          By the end, you won’t just have a running project — you’ll understand
          every part of it and why it matters.
        </p>
      </div>
      <h3>🎯 Learning Outcomes</h3>
      <ul className="topic-checklist">
        <li>
          ✅ Initialize a Spring Boot project using&nbsp; <b>Spring Initializr</b>
        </li>
        <li>✅ Understand the project structure and what goes where</li>
        <li>✅ Learn how Maven manages your dependencies</li>
        <li>✅ Run and test the application locally</li>
      </ul>
      <h3>🧩 Key Concepts</h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Spring Boot</b>
            </td>
            <td>
              A framework that helps build stand-alone Java applications with
              minimal setup. It takes care of configurations and boilerplate.
            </td>
          </tr>
          <tr>
            <td>
              <b>Maven</b>
            </td>
            <td>
              A build tool that manages dependencies and project packaging.
              Think of it as your project’s central manager.
            </td>
          </tr>
          <tr>
            <td>
              <b>Project Structure</b>
            </td>
            <td>
              Spring Boot follows a standard layout (like controller, service,
              entity, etc.) which promotes clean coding practices.
            </td>
          </tr>
          <tr>
            <td>
              <b>Dependencies</b>
            </td>
            <td>
              These are external libraries your app needs (e.g., Web, JPA, H2).
              They’re added via Maven’s <code>pom.xml</code>.
            </td>
          </tr>
        </tbody>
      </table>
      <h3>🛠️ Step-by-Step Guide</h3>
      <ol className="topic-modules">
        <li>
          Visit{" "}
          <a
            href="https://start.spring.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            start.spring.io
          </a>
        </li>
        <li>
          Choose:
          <ul>
            <li>
              Project: <b>Maven</b>
            </li>
            <li>
              Language: <b>Java</b>
            </li>
            <li>
              Spring Boot version: <b>3.x.x</b> (latest stable)
            </li>
          </ul>
        </li>
        <li>
          Fill in Metadata:
          <ul>
            <li>
              Group: <code>com.example</code>
            </li>
            <li>
              Artifact: <code>urlshortener</code>
            </li>
            <li>
              Name: <code>UrlShortener</code>
            </li>
          </ul>
        </li>
        <li>
          Add Dependencies:
          <ul>
            <li>Spring Web</li>
            <li>Spring Data JPA</li>
            <li>H2 Database</li>
          </ul>
        </li>
        <li>
          Generate Project and download the <code>.zip</code> file
        </li>
        <li>
          Import into IDE as a Maven project (IntelliJ, Eclipse, or VS Code)
        </li>
        <li>
          Run the Application – look for <b>Tomcat started</b> in the logs and
          access{" "}
          <a
            href="http://localhost:8080"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://localhost:8080
          </a>
        </li>
      </ol>
      <h3>📘 Hands-On Assignments</h3>
      <ul className="topic-bullets">
        <li>
          Create a project named <b>urlshortener</b>
        </li>
        <li>
          Add extra dependencies: <b>Lombok</b> (to avoid boilerplate code),{" "}
          <b>Validation</b>
        </li>
        <li>
          Explore folders like:
          <ul>
            <li>
              <code>src/main/java</code> → Your application code
            </li>
            <li>
              <code>src/main/resources</code> → Configuration files like{" "}
              <code>application.properties</code>
            </li>
          </ul>
        </li>
        <li>
          Run the app using the IDE or terminal (
          <code>mvn spring-boot:run</code>)
        </li>
      </ul>
      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>Q: Why Spring Boot over traditional Spring?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            A: Spring Boot comes with auto-configuration, embedded servers (like
            Tomcat), and starter dependencies. Unlike traditional Spring, you
            don't have to manually configure every bean or XML. It significantly
            speeds up development by reducing boilerplate and making
            production-ready apps with minimal effort.
          </div>
        )}
        <div className="topic-faq-q">
          <b>Q: What’s the difference between Maven and Gradle?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
            <table className="topic-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Maven</th>
                  <th>Gradle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Syntax</td>
                  <td>
                    XML (<code>pom.xml</code>)
                  </td>
                  <td>Groovy/Kotlin (scripts)</td>
                </tr>
                <tr>
                  <td>Learning curve</td>
                  <td>Easier for beginners</td>
                  <td>Steeper, more powerful</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>Slower due to XML parsing</td>
                  <td>Faster due to incremental builds</td>
                </tr>
                <tr>
                  <td>Community</td>
                  <td>Large, mature, widely used</td>
                  <td>Growing, preferred for Android</td>
                </tr>
              </tbody>
            </table>
            <div style={{ marginTop: "0.5rem" }}>
              👉 <b>Use Maven</b> if you're new or working in a team that
              already uses it. <b>Use Gradle</b> for more customization and
              speed in complex builds.
            </div>
          </div>
        )}
        <div className="topic-faq-q">
          <b>
            Q: What are Spring Boot Starter Dependencies? Why are they useful?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA3((v) => !v)}>
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="topic-faq-a">
            A: Starters are pre-defined dependency bundles. For example, adding{" "}
            <b>spring-boot-starter-web</b> automatically brings in:
            <ul>
              <li>Spring MVC</li>
              <li>Tomcat</li>
              <li>Jackson (for JSON)</li>
            </ul>
            This makes it easy and fast to add features without worrying about
            version conflicts or individual dependencies.
          </div>
        )}
      </div>
      <h3>💡 Bonus Tips</h3>
      <ul className="topic-bullets">
        <li>
          🔄 Rebuild with <code>mvn clean install</code> whenever you change
          dependencies.
        </li>
        <li>
          🔍 Use the <code>pom.xml</code> file to manage versions and scopes.
        </li>
        <li>
          🧰 Use Lombok to reduce clutter (make sure annotation processing is
          enabled in IDE).
        </li>
        <li>
          🧪 Add a simple controller like <code>/hello</code> and test it — it’s
          a great first confidence boost!
        </li>
      </ul>
    </div>
  );
}

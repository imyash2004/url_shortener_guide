import React, { useState } from "react";
import "../App.css";

export default function Topic1Subtopic4Content() {
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);
  const [showA4, setShowA4] = useState(false);
  const [copiedCommands, setCopiedCommands] = useState({});

  const copyToClipboard = async (text, commandId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommands((prev) => ({ ...prev, [commandId]: true }));
      setTimeout(() => {
        setCopiedCommands((prev) => ({ ...prev, [commandId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="topic-animated-content">
      <h3>🧰 Overview: Powering Your Project with the Right Tools</h3>
      <p>
        Imagine building a robot, but you forget the battery. Or worse — you
        accidentally give it two conflicting power sources. ⚡💥
      </p>
      <p>
        In the same way, your Spring Boot application needs the{" "}
        <b>right set of dependencies</b> to function properly — and that's
        exactly what <b>Maven</b> helps you manage!
      </p>
      <p>
        In this section, you'll learn how to{" "}
        <b>add, manage, and troubleshoot project dependencies</b> using Maven's
        magical configuration file: <code>pom.xml</code>.
      </p>

      <h3>🎯 Learning Outcomes</h3>
      <ul className="topic-checklist">
        <li>✅ Understand what dependencies are and how Maven manages them</li>
        <li>
          ✅ Add necessary Spring Boot dependencies like <b>Security</b>,{" "}
          <b>JWT</b>, and <b>MySQL</b>
        </li>
        <li>
          ✅ Learn how Maven resolves <b>conflicts</b> between multiple
          libraries
        </li>
        <li>
          ✅ Run basic Maven commands to build, clean, and verify your project
        </li>
      </ul>

      <h3>📦 What is Maven? Why Should You Care?</h3>
      <div className="topic-funfact example-block">
        <b>🔧 Maven is Your Project's Best Friend</b>
        <div className="topic-funfact-block">
          <div>
            <strong>🔧 Your toolbox</strong> → It fetches the right tools
            (dependencies)
          </div>
          <div>
            <strong>🧱 Your construction crew</strong> → It builds your app
          </div>
          <div>
            <strong>📋 Your planner</strong> → It follows a lifecycle to keep
            everything clean and consistent
          </div>
        </div>
      </div>

      <h3>🔍 Key Terms You'll See in pom.xml</h3>
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
              <code>&lt;dependency&gt;</code>
            </td>
            <td>Adds a new library or feature to your project</td>
          </tr>
          <tr>
            <td>
              <code>&lt;groupId&gt;</code> / <code>&lt;artifactId&gt;</code>
            </td>
            <td>Identifiers for the library you're including</td>
          </tr>
          <tr>
            <td>
              <code>&lt;version&gt;</code>
            </td>
            <td>The specific version of the library</td>
          </tr>
          <tr>
            <td>
              <code>&lt;scope&gt;</code>
            </td>
            <td>
              When the dependency should be used (compile/test/provided/etc.)
            </td>
          </tr>
        </tbody>
      </table>

      <h3>🛠️ Step-by-Step: Add and Manage Dependencies</h3>
      <div className="topic-funfact example-block">
        <b>📄 Open and Configure Your pom.xml</b>
        <div className="topic-funfact-block">
          <div>
            <strong>1.</strong> Open your project's <code>pom.xml</code> file
          </div>
          <div>
            <strong>2.</strong> Add common dependencies:
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>{`<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>`}</code>
            </pre>
            <button
              className={`copy-button ${
                copiedCommands.dependencies ? "copied" : ""
              }`}
              onClick={() =>
                copyToClipboard(
                  `<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>

<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>`,
                  "dependencies"
                )
              }
            >
              {copiedCommands.dependencies ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div>
            <strong>3.</strong> Run this to refresh:
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>mvn clean install</code>
            </pre>
            <button
              className={`copy-button ${
                copiedCommands.mvnClean ? "copied" : ""
              }`}
              onClick={() => copyToClipboard("mvn clean install", "mvnClean")}
            >
              {copiedCommands.mvnClean ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <h3>🧪 Try It Yourself</h3>
      <div className="topic-funfact example-block">
        <b>💻 Hands-On Maven Practice</b>
        <div className="topic-funfact-block">
          <div>
            <strong>Add the following:</strong>
          </div>
          <ul>
            <li>✅ Spring Security</li>
            <li>✅ JWT</li>
            <li>✅ MySQL driver</li>
          </ul>
          <div>
            <strong>Create a new Maven profile for production</strong>
          </div>
          <div>
            <strong>Build the project using:</strong>
          </div>
          <div className="code-with-copy">
            <pre className="topic-codeblock">
              <code>mvn clean compile</code>
            </pre>
            <button
              className={`copy-button ${
                copiedCommands.mvnCompile ? "copied" : ""
              }`}
              onClick={() => copyToClipboard("mvn clean compile", "mvnCompile")}
            >
              {copiedCommands.mvnCompile ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div>
            <strong>
              Open the target/ folder and verify the .jar file was created
            </strong>
          </div>
        </div>
      </div>

      <h3>💬 Discussion Points</h3>
      <div className="topic-faq">
        <div className="topic-faq-q">
          <b>Q: What happens if I forget to add a required dependency?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA1((v) => !v)}>
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="topic-faq-a">
            <strong>A:</strong> You'll likely see errors like:
            <pre className="topic-codeblock">
              <code>
                ClassNotFoundException:
                org.springframework.security.config.annotation...
              </code>
            </pre>
            Maven won't be able to compile or run your app because it's missing
            a needed class/library.
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: Can two dependencies conflict with each other?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA2((v) => !v)}>
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="topic-faq-a">
            <strong>A:</strong> Yes — this is called a <b>version conflict</b>.
            <br />
            For example, if two libraries require different versions of Jackson,
            Maven may pick one that breaks the other.
            <br />
            Use:
            <pre className="topic-codeblock">
              <code>mvn dependency:tree</code>
            </pre>
            To visualize and resolve conflicts.
          </div>
        )}

        <div className="topic-faq-q">
          <b>
            Q: What's the purpose of dependency scopes like compile, runtime,
            test?
          </b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA3((v) => !v)}>
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="topic-faq-a">
            <strong>A:</strong>
            <table className="topic-table">
              <thead>
                <tr>
                  <th>Scope</th>
                  <th>When It's Used</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>compile</code>
                  </td>
                  <td>Available everywhere (default)</td>
                </tr>
                <tr>
                  <td>
                    <code>runtime</code>
                  </td>
                  <td>Needed only when running (e.g., DB drivers)</td>
                </tr>
                <tr>
                  <td>
                    <code>test</code>
                  </td>
                  <td>Used only during tests (e.g., JUnit, Mockito)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="topic-faq-q">
          <b>Q: What's the difference between Maven and Gradle?</b>
        </div>
        <button className="reveal-btn" onClick={() => setShowA4((v) => !v)}>
          {showA4 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA4 && (
          <div className="topic-faq-a">
            <strong>A:</strong>
            <table className="topic-table">
              <thead>
                <tr>
                  <th>Maven</th>
                  <th>Gradle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    XML-based (<code>pom.xml</code>)
                  </td>
                  <td>Uses Groovy/Kotlin DSL</td>
                </tr>
                <tr>
                  <td>Easier for beginners</td>
                  <td>More flexible/customizable</td>
                </tr>
                <tr>
                  <td>Slower build times</td>
                  <td>Faster with incremental builds</td>
                </tr>
                <tr>
                  <td>Large community support</td>
                  <td>Preferred in Android</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <h3>📘 Pro Tips</h3>
      <ul className="topic-checklist">
        <li>
          Always <b>update to the latest compatible version</b> of libraries to
          avoid security risks
        </li>
        <li>
          Use{" "}
          <a
            href="https://mvnrepository.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            mvnrepository.com
          </a>{" "}
          to find and copy-paste any Maven dependency
        </li>
        <li>Avoid bloating your project — only add what you need!</li>
      </ul>

      <h3>🎁 Did You Know?</h3>
      <div
        className="topic-callout"
        style={{ background: "#fff3e0", borderLeft: "5px solid #ff9800" }}
      >
        <span role="img" aria-label="lightbulb">
          💡
        </span>{" "}
        The Spring Boot Starter naming convention (
        <code>spring-boot-starter-*</code>) bundles multiple libraries into one!
        <br />
        For example, <code>spring-boot-starter-web</code> includes:
        <ul>
          <li>Tomcat</li>
          <li>Spring MVC</li>
          <li>Jackson for JSON handling</li>
        </ul>
      </div>

      <h3>🛡️ Maven Commands Cheat Sheet</h3>
      <table className="key-concepts-table">
        <thead>
          <tr>
            <th>Command</th>
            <th>What It Does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>mvn clean</code>
            </td>
            <td>Deletes old build files</td>
          </tr>
          <tr>
            <td>
              <code>mvn compile</code>
            </td>
            <td>Compiles your code</td>
          </tr>
          <tr>
            <td>
              <code>mvn test</code>
            </td>
            <td>Runs all tests</td>
          </tr>
          <tr>
            <td>
              <code>mvn package</code>
            </td>
            <td>
              Creates the <code>.jar</code> or <code>.war</code> file
            </td>
          </tr>
          <tr>
            <td>
              <code>mvn spring-boot:run</code>
            </td>
            <td>Runs the Spring Boot app</td>
          </tr>
        </tbody>
      </table>

      <h3>🚀 Ready to Get Started?</h3>
      <div
        className="topic-callout"
        style={{ background: "#e8f5e8", borderLeft: "5px solid #4caf50" }}
      >
        <span role="img" aria-label="rocket">
          🚀
        </span>{" "}
        Ready to cleanly package your app and install the right building blocks?
        Maven's got your back 💪
      </div>
    </div>
  );
}

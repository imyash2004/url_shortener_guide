import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  maven: `mvn clean install`,
  gradle: `./gradlew build`,
  mavenOutput: `my-first-app-0.0.1-SNAPSHOT.jar`,
  bookJava: `public class Book {
    private String title;
    private String author;
    private double price;
}`,
};

const summaryTable = [
  ["Compile", "Turn source code into bytecode", "Preparing ingredients 🍅"],
  ["Build", "Bundle everything into a JAR", "Boxing the meal 🍱"],
  ["Install", "Save JAR to local repo", "Storing it in your kitchen shelf 🍽️"],
];

const discussionPrompts = [
  {
    q: "What is the difference between mvn install and mvn package?",
    a: (
      <>
        <b>mvn package</b>: Compiles the code and creates the{" "}
        <span className="blue-inline-code">.jar</span> file. Think of it as
        preparing the cake 🍰.
        <br />
        <b>mvn install</b>: Does everything <b>package</b> does, but also{" "}
        <b>adds the .jar into your local Maven repository</b> so other projects
        can reuse it — like putting the cake into your shop’s shelf for sale. 🛒
      </>
    ),
  },
  {
    q: "Why is mvn clean important before building?",
    a: (
      <>
        It clears out old compiled files to avoid conflicts or bugs caused by
        stale classes.
        <br />
        Like cleaning your kitchen before cooking — you don’t want leftover
        ingredients from yesterday in today’s recipe, right? 🍳
      </>
    ),
  },
  {
    q: "Why use Maven or Gradle instead of plain javac?",
    a: (
      <>
        <b>javac</b> only compiles — it doesn’t manage dependencies, testing,
        packaging, or versioning.
        <br />
        Maven/Gradle are <b>project managers</b> for your app. They automate:
        <ul>
          <li>Dependency management</li>
          <li>Building and packaging</li>
          <li>Running tests</li>
          <li>Plugin integration</li>
        </ul>
        Using <b>javac</b> alone is like manually assembling a car from parts.
        Maven gives you a robot that does it for you! 🤖🚗
      </>
    ),
  },
];

const tryItTasks = [
  "Create a new Spring Boot app.",
  "Open a terminal in the root directory.",
  "Run: mvn clean install",
  "Go to the target/ folder. You should see something like: my-first-app-0.0.1-SNAPSHOT.jar",
  "🎉 Boom! You've built your very first Spring Boot JAR!",
];

const challenge = {
  desc: "Create a class named Book.java with fields: title, author, and price. Build your project with Maven. Find the final .jar — try to run it in the next step!",
  code: codeBlocks.bookJava,
};

const Topic2Subtopic9Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>
        ✅ 2.9 – Compile & Build in Spring Boot
      </h2>
      <hr />
      <div className="yellow-callout">
        In any Java project — especially a Spring Boot one — the first step
        after writing your code is to <b>compile</b> it (turn it into
        machine-readable bytecode) and then <b>build</b> it (package the code +
        resources + dependencies into a single executable file like a JAR or
        WAR).
        <br />
        <br />
        Spring Boot makes this process incredibly smooth using{" "}
        <b>build tools</b> like Maven and Gradle.
        <br />
        <br />
        <i>
          Think of it like preparing a burger 🍔.
          <br />
          You first prepare ingredients (compile), then assemble them into a
          burger (build), and finally serve it (run)!
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>
          ✅ Compile and package a Spring Boot application using Maven or
          Gradle.
        </li>
        <li>
          ✅ Understand the role of the{" "}
          <span className="blue-inline-code">target</span> or{" "}
          <span className="blue-inline-code">build/libs</span> folder.
        </li>
        <li>
          ✅ Recognize what happens behind the scenes during compilation and
          packaging.
        </li>
        <li>✅ Explain the difference between compiling and building.</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💡 Real-World Analogy
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            🧑‍🍳 <b>Compiling</b> = Mixing ingredients and preparing the dough.
          </li>
          <li>
            🔥 <b>Building</b> = Baking and packing your cake in a nice box
            (your <span className="blue-inline-code">.jar</span>).
          </li>
          <li>
            🚚 <b>Running</b> = Delivering it to your customer (the
            server/user).
          </li>
        </ul>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Just like no one wants raw dough, no one wants uncompiled code. And
          you wouldn’t deliver a cake without boxing it, would you?
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ How to Compile & Build
      </h3>
      <div className="blue-card-section">
        <b>✅ Using Maven:</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.maven ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.maven, "maven")}
          >
            {copied.maven ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.maven}</code>
          </pre>
        </div>
        <ul>
          <li>
            <b>clean</b>: Deletes previous build files from the{" "}
            <span className="blue-inline-code">target</span> folder.
          </li>
          <li>
            <b>install</b>: Compiles the source code, runs tests, packages your
            app into a <span className="blue-inline-code">.jar</span> file.
          </li>
        </ul>
        <div style={{ marginTop: "0.7rem" }}>
          You’ll find your <span className="blue-inline-code">.jar</span> in:
          <br />
          <span className="blue-inline-code">
            target/your-app-name-version.jar
          </span>
        </div>
      </div>
      <div className="blue-card-section">
        <b>✅ Using Gradle:</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.gradle ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.gradle, "gradle")}
          >
            {copied.gradle ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.gradle}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          You’ll find your <span className="blue-inline-code">.jar</span> in:
          <br />
          <span className="blue-inline-code">
            build/libs/your-app-name-version.jar
          </span>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📂 What’s Happening Under the Hood?
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            Source files from{" "}
            <span className="blue-inline-code">src/main/java</span> are compiled
            to bytecode.
          </li>
          <li>
            Static resources (like{" "}
            <span className="blue-inline-code">application.properties</span>)
            are bundled.
          </li>
          <li>
            Dependencies from <span className="blue-inline-code">pom.xml</span>{" "}
            (or <span className="blue-inline-code">build.gradle</span>) are
            resolved and included.
          </li>
          <li>
            A final <span className="blue-inline-code">.jar</span> or{" "}
            <span className="blue-inline-code">.war</span> is created.
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
        <div
          className="topic-codeblock code-with-copy"
          style={{ marginTop: "1rem" }}
        >
          <button
            className={`copy-button ${copied.mavenOutput ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.mavenOutput, "mavenOutput")
            }
          >
            {copied.mavenOutput ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.mavenOutput}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤔 Discussion Points
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((item, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {item.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{item.a}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔍 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
            <th>Real World Analogy</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([term, meaning, analogy], i) => (
            <tr key={i}>
              <td>{term}</td>
              <td>{meaning}</td>
              <td>{analogy}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎲 Try-It-Yourself Challenge
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "0.7rem" }}>{challenge.desc}</div>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.bookJava ? "copied" : ""}`}
            onClick={() => copyToClipboard(challenge.code, "bookJava")}
          >
            {copied.bookJava ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{challenge.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Topic2Subtopic9Content;

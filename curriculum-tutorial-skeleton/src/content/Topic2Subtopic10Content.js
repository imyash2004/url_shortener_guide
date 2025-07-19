import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  runJar: `java -jar target/myapp-0.0.1-SNAPSHOT.jar`,
  helloController: `@RestController
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "👋 Hello from Spring Boot!";
    }
}`,
  maven: `mvn clean install`,
  runAgain: `java -jar target/your-app.jar`,
  visit: `http://localhost:8080`,
  changePort: `server.port=9090`,
  visit9090: `http://localhost:9090`,
  quirkyReturn: `return "🌮 Welcome to my Taco Server!";`,
};

const summaryTable = [
  ["java -jar", "Command to run the Spring Boot app"],
  ["localhost:8080", "Default address where your app runs"],
  ["application.properties", "Used to configure ports, paths, etc."],
];

const discussionPrompts = [
  {
    q: "What is an embedded server and why is it awesome?",
    a: (
      <>
        Spring Boot includes <b>Tomcat by default</b>, so you don’t need to
        install or configure external servers. It’s like getting a pizza oven{" "}
        <b>built into</b> your food truck! 🍕
        <br />
        <br />
        This makes the app portable — you can just run the{" "}
        <span className="blue-inline-code">.jar</span> file anywhere without
        needing to configure Apache or Tomcat separately.
      </>
    ),
  },
  {
    q: "What if port 8080 is already in use?",
    a: (
      <>
        No worries! Just change the port in{" "}
        <span className="blue-inline-code">application.properties</span>:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button className={`copy-button ${false ? "copied" : ""}`}>
            {"Copy"}
          </button>
          <pre>
            <code>{codeBlocks.changePort}</code>
          </pre>
        </div>
        Now access your app on:
        <br />
        <span className="blue-inline-code">http://localhost:9090</span>
        <br />
        <br />
        It’s like switching your restaurant’s delivery gate when one is jammed.
        🚪
      </>
    ),
  },
  {
    q: "Why do we run apps locally before deployment?",
    a: (
      <>
        <ul>
          <li>
            To test everything <b>safely</b> before going live.
          </li>
          <li>Avoid embarrassing bugs in production.</li>
          <li>Debug logs, behavior, and edge cases.</li>
        </ul>
        Like trying on clothes before buying them. You don’t want surprises
        later, right? 👕👗
      </>
    ),
  },
];

const tryItTask = {
  desc: "Change the message in your controller to something quirky like:",
  code: codeBlocks.quirkyReturn,
  after:
    "Run again. Check if your app says '🌮 Welcome to my Taco Server!' Try changing the port to 9090 too.",
};

const Topic2Subtopic10Content = () => {
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
        ✅ 2.10 – Deploy & Run Locally in Spring Boot
      </h2>
      <hr />
      <div className="yellow-callout">
        Once your Spring Boot app is <b>compiled and built</b>, the next step is
        to <b>deploy and run it locally</b> — like turning the ignition key to
        test drive your car 🏎️.
        <br />
        <br />
        Spring Boot makes this super easy with its built-in{" "}
        <b>embedded Tomcat server</b>. No need to install or configure external
        servers. Just run your <span className="blue-inline-code">.jar</span>{" "}
        file, and BOOM! Your app is live on your local machine.
        <br />
        <br />
        <i>
          Think of it like ordering food from Zomato and then testing it before
          giving a review. You’ve built it — now it’s time to taste it yourself!
        </i>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Deploy your Spring Boot application on your local system.</li>
        <li>✅ Understand how the embedded Tomcat server works.</li>
        <li>
          ✅ Run <span className="blue-inline-code">.jar</span> files directly
          via command line.
        </li>
        <li>
          ✅ Access your app in a web browser (usually on{" "}
          <span className="blue-inline-code">localhost:8080</span>).
        </li>
        <li>
          ✅ Modify application port and settings using{" "}
          <span className="blue-inline-code">application.properties</span>.
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🍕 Real-World Analogy
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            <b>Build a pizza</b> 🍕 = Compile & build your code.
          </li>
          <li>
            <b>Deliver and eat it</b> at home = Deploy and run locally.
          </li>
          <li>
            You can even adjust spice level (like{" "}
            <span className="blue-inline-code">server.port=9090</span>) — your
            local taste!
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ How to Run Your Spring Boot App
      </h3>
      <div className="blue-card-section">
        <b>
          Once you've built the app (
          <span className="blue-inline-code">.jar</span> file created in{" "}
          <span className="blue-inline-code">target/</span>), use this command:
        </b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.runJar ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.runJar, "runJar")}
          >
            {copied.runJar ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.runJar}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          Output should look something like:
          <pre
            style={{
              background: "#f8fbff",
              borderRadius: 6,
              padding: "0.7rem 1rem",
              marginTop: 8,
            }}
          >
            Tomcat started on port(s): 8080 (http) with context path '' Started
            MyAppApplication in 3.456 seconds
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>
          Then open your browser and visit:
          <div
            className="topic-codeblock code-with-copy"
            style={{ marginTop: 8 }}
          >
            <button
              className={`copy-button ${copied.visit ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.visit, "visit")}
            >
              {copied.visit ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.visit}</code>
            </pre>
          </div>
        </div>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          🎉 Congratulations! Your app is running locally.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>Add this to your controller class:</li>
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${
                copied.helloController ? "copied" : ""
              }`}
              onClick={() =>
                copyToClipboard(codeBlocks.helloController, "helloController")
              }
            >
              {copied.helloController ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.helloController}</code>
            </pre>
          </div>
          <li>Build it:</li>
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
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
          <li>Run the jar:</li>
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.runAgain ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.runAgain, "runAgain")}
            >
              {copied.runAgain ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.runAgain}</code>
            </pre>
          </div>
          <li>Visit:</li>
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.visit ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.visit, "visit")}
            >
              {copied.visit ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.visit}</code>
            </pre>
          </div>
          <li>
            You should see:{" "}
            <span className="blue-inline-code">👋 Hello from Spring Boot!</span>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points
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

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧠 Memory Tip</h3>
      <div className="blue-card-section">
        <div style={{ fontSize: "1.12em" }}>
          <b>java -jar yourfile.jar</b> =<br />
          <span style={{ color: "#1769aa", fontWeight: 500 }}>
            "Just Activate and Visit App" 😉
          </span>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try-It-Yourself Task
      </h3>
      <div className="blue-card-section try-tasks">
        <div style={{ marginBottom: "0.7rem" }}>{tryItTask.desc}</div>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.quirkyReturn ? "copied" : ""}`}
            onClick={() => copyToClipboard(tryItTask.code, "quirkyReturn")}
          >
            {copied.quirkyReturn ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{tryItTask.code}</code>
          </pre>
        </div>
        <div style={{ marginTop: "0.7rem" }}>{tryItTask.after}</div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔍 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map(([term, meaning], i) => (
            <tr key={i}>
              <td>{term}</td>
              <td>{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic2Subtopic10Content;
 
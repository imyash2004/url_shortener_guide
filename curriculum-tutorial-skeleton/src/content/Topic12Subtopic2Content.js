import React, { useState } from "react";
import "./CustomSectionStyles.css";

function Topic12Subtopic2Content() {
  const [discussionVisible, setDiscussionVisible] = useState(false);
  const [copied, setCopied] = useState({});

  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied({ ...copied, [key]: true });
      setTimeout(() => setCopied({ ...copied, [key]: false }), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const codeBlocks = {
    dockerPull: `docker pull sonarqube`,
    dockerRun: `docker run -d --name sonarqube -p 9000:9000 sonarqube`,
    windowsStart: `StartSonar.bat`,
    linuxStart: `sonar.sh start`,
  };

  const installationOptions = [
    [
      "Docker",
      "Quick, easy local setup with minimal config",
      "Local development/testing",
    ],
    [
      "Manual Installation",
      "Full control, suitable for production",
      "Server deployments",
    ],
    [
      "Cloud Hosting",
      "Managed, no infra hassle",
      "Teams wanting zero maintenance",
    ],
  ];

  const dockerSteps = [
    [
      "Install Docker",
      "Download and install Docker Desktop from docker.com if not already installed. Ensure Docker is running on your system.",
    ],
    [
      "Pull the SonarQube Image",
      "Open your terminal and run the docker pull command",
    ],
    [
      "Run the Container",
      "Start SonarQube with the docker run command on port 9000",
    ],
    [
      "Access SonarQube Dashboard",
      "Open your browser and visit: http://localhost:9000. Default login is admin/admin.",
    ],
    [
      "Configure your Project",
      "Create projects and generate tokens for authentication in your CI pipeline",
    ],
  ];

  const manualSteps = [
    ["Download SonarQube", "Get the latest version from the official website"],
    [
      "Extract and Configure",
      "Unzip the package and navigate to the conf folder. Edit sonar.properties",
    ],
    [
      "Set Up Database",
      "SonarQube requires a dedicated database. Create one using your preferred RDBMS",
    ],
    ["Start SonarQube", "Run the startup script for your operating system"],
    [
      "Access Dashboard",
      "Visit http://localhost:9000 in your browser. Default credentials: admin/admin",
    ],
    [
      "Configure as Needed",
      "Set up users, projects, and quality gates via the UI",
    ],
  ];

  const cloudBenefits = [
    "No installation or server maintenance",
    "Automatic upgrades",
    "Easy integration with cloud repos and pipelines",
  ];

  const postInstallSteps = [
    "Create a new project in SonarQube",
    "Generate a project token for secure authentication",
    "Add SonarQube Scanner plugin to your build tool (Maven, Gradle, etc.)",
    "Configure scanner with your project key and token",
    "Run analysis to send code metrics to SonarQube server",
  ];

  const summaryTable = [
    [
      "Docker",
      "Quick, easy local setup with minimal config",
      "Local development/testing",
    ],
    [
      "Manual Installation",
      "Full control, suitable for production",
      "Server deployments",
    ],
    [
      "Cloud Hosting",
      "Managed, no infra hassle",
      "Teams wanting zero maintenance",
    ],
  ];

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>
        ⚙️ 12.2 – Setting Up SonarQube: Installation and Configuration
      </h2>
      <hr />

      <div className="yellow-callout">
        In the last section, we learned why code quality matters and how
        SonarQube can help keep your project clean, secure, and maintainable.
        Now, it's time to get your hands dirty and set up SonarQube so you can
        start analyzing your own codebase.
      </div>

      <p>
        This section will guide you through the different ways to install and
        configure SonarQube, from quick local setups to scalable cloud options.
        We'll cover:
      </p>

      <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
        <li>
          Running SonarQube with Docker (fastest and easiest for local testing)
        </li>
        <li>
          Installing SonarQube manually on your machine (for more control)
        </li>
        <li>
          Using cloud-hosted SonarQube services (zero-maintenance, scalable)
        </li>
      </ul>

      <p>
        By the end, you'll know how to get SonarQube running and connected to
        your Spring Boot project for continuous analysis.
      </p>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🐳 Option 1: Running SonarQube Locally with Docker (Recommended for
        Beginners)
      </h3>
      <div className="blue-card-section">
        <p>
          Docker lets you run applications in lightweight containers without
          complex installation steps. It's perfect for quick SonarQube
          evaluation or local development.
        </p>

        <h4>
          <b>Step-by-step:</b>
        </h4>
        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Step</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dockerSteps.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>
                    {index + 1}. {row[0]}
                  </b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "1rem" }}>
          <h4>
            <b>Commands you'll need:</b>
          </h4>
          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.dockerPull ? "copied" : ""}`}
              onClick={() =>
                copyToClipboard(codeBlocks.dockerPull, "dockerPull")
              }
            >
              {copied.dockerPull ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.dockerPull}</code>
            </pre>
          </div>

          <div
            className="topic-codeblock code-with-copy"
            style={{ margin: "0.7rem 0" }}
          >
            <button
              className={`copy-button ${copied.dockerRun ? "copied" : ""}`}
              onClick={() => copyToClipboard(codeBlocks.dockerRun, "dockerRun")}
            >
              {copied.dockerRun ? "Copied!" : "Copy"}
            </button>
            <pre>
              <code>{codeBlocks.dockerRun}</code>
            </pre>
          </div>
        </div>

        <div className="yellow-callout">
          <b>🎯 Quick Access:</b> Once running, visit{" "}
          <span className="blue-inline-code">http://localhost:9000</span> and
          login with <span className="blue-inline-code">admin/admin</span>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🖥️ Option 2: Manual Installation on Your Machine (More Control &
        Production-like Setup)
      </h3>
      <div className="blue-card-section">
        <p>
          If you want to run SonarQube outside Docker or on a server, follow
          these steps:
        </p>

        <table className="custom-table" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Step</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {manualSteps.map((row, index) => (
              <tr key={index}>
                <td>
                  <b>
                    {index + 1}. {row[0]}
                  </b>
                </td>
                <td>{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "1rem" }}>
          <h4>
            <b>Configuration Details:</b>
          </h4>
          <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
            <li>
              <b>Database connection:</b> (MySQL, PostgreSQL, etc.)
            </li>
            <li>
              <b>Server port:</b> Default is 9000
            </li>
            <li>
              <b>Authentication settings</b>
            </li>
          </ul>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <h4>
            <b>Startup Commands:</b>
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            <div>
              <p>
                <b>Windows:</b>
              </p>
              <div
                className="topic-codeblock code-with-copy"
                style={{ margin: "0.7rem 0" }}
              >
                <button
                  className={`copy-button ${
                    copied.windowsStart ? "copied" : ""
                  }`}
                  onClick={() =>
                    copyToClipboard(codeBlocks.windowsStart, "windowsStart")
                  }
                >
                  {copied.windowsStart ? "Copied!" : "Copy"}
                </button>
                <pre>
                  <code>{codeBlocks.windowsStart}</code>
                </pre>
              </div>
            </div>
            <div>
              <p>
                <b>Linux/macOS:</b>
              </p>
              <div
                className="topic-codeblock code-with-copy"
                style={{ margin: "0.7rem 0" }}
              >
                <button
                  className={`copy-button ${copied.linuxStart ? "copied" : ""}`}
                  onClick={() =>
                    copyToClipboard(codeBlocks.linuxStart, "linuxStart")
                  }
                >
                  {copied.linuxStart ? "Copied!" : "Copy"}
                </button>
                <pre>
                  <code>{codeBlocks.linuxStart}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ☁️ Option 3: Cloud-Hosted SonarQube (Zero Maintenance, Scalable)
      </h3>
      <div className="blue-card-section">
        <p>
          If you prefer not to manage SonarQube infrastructure, several cloud
          providers and SaaS platforms offer hosted SonarQube or similar
          services, including:
        </p>

        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            <b>SonarCloud</b> (by SonarSource):{" "}
            <span className="blue-inline-code">https://sonarcloud.io/</span>
          </li>
          <li>
            Seamless integration with GitHub, Azure DevOps, Bitbucket, and more
          </li>
          <li>
            <b>Third-party cloud providers:</b> Various CI/CD platforms have
            SonarQube plugins or add-ons
          </li>
        </ul>

        <h4 style={{ marginTop: "1rem" }}>
          <b>Benefits of Cloud:</b>
        </h4>
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {cloudBenefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Post-Installation Configuration: Connect SonarQube to Your Project
      </h3>
      <div className="blue-card-section">
        <p>Once SonarQube is running (locally or cloud):</p>

        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          {postInstallSteps.map((step, index) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              {step}
            </li>
          ))}
        </ol>

        <div className="yellow-callout">
          <b>🔑 Important:</b> Keep your project token secure! It's used for
          authentication between your build tool and SonarQube server.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section try-tasks">
        <p>
          <b>🚀 Task:</b>
        </p>
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Choose one installation method above based on your setup</li>
          <li>Install and run SonarQube</li>
          <li>Open the dashboard and explore the UI</li>
          <li>Create a new project and generate your authentication token</li>
          <li>
            Prepare your Spring Boot project to connect to SonarQube in the next
            section
          </li>
        </ol>

        <div className="yellow-callout">
          <b>💡 Pro Tip:</b> Start with Docker for quick testing, then move to
          manual/cloud setup for production use.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🤔 Discussion & Q&A
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <button
            style={{
              background: "#2196f3",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => setDiscussionVisible(!discussionVisible)}
          >
            {discussionVisible ? "Hide" : "Show"} Answers
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q1: Why are there multiple ways to install SonarQube, and how do
              you choose the right one?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> SonarQube can be installed via Docker, manual
                setup, or accessed as a cloud service to fit different needs.
                Docker is fast and simple, ideal for local testing or
                development. Manual installation offers fine-grained control for
                production servers. Cloud hosting is hassle-free for teams
                wanting to avoid infrastructure management. Choosing depends on
                your project scale, maintenance capacity, and environment.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q2: What are the key components you must configure during a manual
              SonarQube installation?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> During manual installation, you need to configure
                the database connection for SonarQube's metadata storage, the
                server port for accessibility, and security settings such as
                authentication. Setting up the database correctly (e.g.,
                PostgreSQL, MySQL) is critical for smooth operation. This
                configuration ensures SonarQube runs securely and integrates
                well with your environment.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q3: What advantages do cloud-hosted SonarQube services offer over
              self-hosted options?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Cloud-hosted SonarQube services eliminate the
                need for server maintenance, updates, and backups, allowing
                teams to focus solely on code quality. They typically offer
                seamless integration with cloud repositories and CI/CD
                pipelines, enabling real-time analysis. Scalability and high
                availability are handled by the provider, making it ideal for
                teams that want quick, hassle-free setups.
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <b>
              Q4: After installation, what are the immediate next steps to start
              analyzing your code with SonarQube?
            </b>
            {discussionVisible && (
              <div className="yellow-callout" style={{ marginTop: "0.5rem" }}>
                <b>Answer:</b> Once SonarQube is installed and running, create a
                new project in the dashboard and generate an authentication
                token. Next, add the SonarQube scanner plugin to your build
                tool, configure it with your project key and token, then run the
                analysis command. This will send your project metrics to
                SonarQube for review, providing actionable feedback on code
                quality.
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>📚 Summary</h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Setup Option</th>
            <th>Description</th>
            <th>Best For</th>
          </tr>
        </thead>
        <tbody>
          {summaryTable.map((row, index) => (
            <tr key={index}>
              <td>
                <b>{row[0]}</b>
              </td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Topic12Subtopic2Content;

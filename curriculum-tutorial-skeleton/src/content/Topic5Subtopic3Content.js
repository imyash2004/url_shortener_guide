import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  requestDTO: `package com.example.dto;

import jakarta.validation.constraints.NotBlank;

public class OrganizationRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Short name is required")
    private String shortName;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }
}`,
  responseDTO: `package com.example.dto;

public class OrganizationResponseDTO {

    private Long id;
    private String name;
    private String shortName;

    public OrganizationResponseDTO(Long id, String name, String shortName) {
        this.id = id;
        this.name = name;
        this.shortName = shortName;
    }

    // Getters only (no setters usually in response)
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getShortName() {
        return shortName;
    }
}`,
  updateDTO: `package com.example.dto;

import jakarta.validation.constraints.NotBlank;

public class OrganizationUpdateDTO {

    @NotBlank(message = "Name cannot be empty")
    private String name;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}`,
  mapToDTO: `public OrganizationResponseDTO mapToDTO(Organization org) {
    return new OrganizationResponseDTO(org.getId(), org.getName(), org.getShortName());
}`,
  toEntity: `public Organization toEntity(OrganizationRequestDTO dto) {
    Organization org = new Organization();
    org.setName(dto.getName());
    org.setShortName(dto.getShortName());
    return org;
}`,
};

const discussionPrompts = [
  {
    q: "Should we expose the id in the response DTO? Why or why not?",
    a: (
      <>
        Yes, in most cases we expose the id so the client can refer to the
        resource later (e.g., for updates or navigation). However, we avoid
        exposing internal UUIDs or DB references in public APIs unless
        necessary.
      </>
    ),
  },
  {
    q: "What if we need to return more fields later (like total URLs under the org)? Should we update the same DTO or create another version?",
    a: (
      <>
        If it's a minor addition, update the same DTO. But for major changes or
        different use cases (like analytics), it's better to create a new
        specialized DTO (e.g., OrganizationStatsDTO) to keep responsibilities
        separate.
      </>
    ),
  },
  {
    q: "Can we allow users to change shortName later? Why is it risky?",
    a: (
      <>
        Ideally no – shortName is used as a brand identifier in short URLs
        (e.g., zomato/xYz123). Changing it could break existing links or cause
        identity conflicts, so we treat it as immutable after creation.
      </>
    ),
  },
];

const tryItTasks = [
  "Create OrganizationRequestDTO, OrganizationResponseDTO, and OrganizationUpdateDTO classes in your dto package.",
  "Add validation annotations like @NotBlank.",
  "Write manual conversion methods between entity and DTO in your service layer.",
];

const Topic5Subtopic3Content = () => {
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
        ✅ 5.4 – Organization DTOs (Data Transfer Objects)
      </h2>
      <hr />
      <div className="yellow-callout">
        Our goal here is to <b>create DTOs (Data Transfer Objects)</b> for the{" "}
        <span className="blue-inline-code">Organization</span> entity so we can:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>Control what data is exposed through the API</li>
          <li>Avoid leaking sensitive/internal data</li>
          <li>
            Ensure strong typing and validation in request/response payloads
          </li>
        </ul>
        <div style={{ marginTop: "0.7rem" }}>
          <i>
            🚗 "Entity is your full engine – DTO is the steering wheel you hand
            over to the driver."
          </i>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🚨 Why Not Use Entities Directly in APIs?
      </h3>
      <div className="blue-card-section">
        If we directly expose entities like{" "}
        <span className="blue-inline-code">Organization</span>, problems may
        arise:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Unwanted fields like <span className="blue-inline-code">id</span>,{" "}
            <span className="blue-inline-code">createdAt</span>, or internal
            data get exposed to the client.
          </li>
          <li>
            Bidirectional relationships (like with{" "}
            <span className="blue-inline-code">URL</span>) can cause infinite
            loops during serialization.
          </li>
          <li>
            It's harder to validate incoming data (e.g., ensuring{" "}
            <span className="blue-inline-code">shortName</span> is not blank).
          </li>
        </ul>
        So, <b>DTOs act like a clean filter</b> between your entity and your
        external world (API clients).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📦 Create 3 DTOs
      </h3>
      <div className="blue-card-section">
        We’ll usually need:
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          <li>
            <b>OrganizationRequestDTO</b> – for incoming POST/PUT data
          </li>
          <li>
            <b>OrganizationResponseDTO</b> – for sending data back to the client
          </li>
          <li>
            <b>OrganizationUpdateDTO</b> – optional, for PATCH or PUT operations
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ 1. OrganizationRequestDTO.java
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.requestDTO ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.requestDTO, "requestDTO")}
        >
          {copied.requestDTO ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.requestDTO}</code>
        </pre>
      </div>
      <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
        <b>@NotBlank</b> ensures the fields aren't just empty strings or spaces.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ 2. OrganizationResponseDTO.java
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.responseDTO ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.responseDTO, "responseDTO")}
        >
          {copied.responseDTO ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.responseDTO}</code>
        </pre>
      </div>
      <div className="blue-card-section" style={{ marginTop: "0.7rem" }}>
        This DTO is sent back to the client when someone requests organization
        data (like in GET API).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ✅ 3. OrganizationUpdateDTO.java (Optional but useful)
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.updateDTO ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.updateDTO, "updateDTO")}
        >
          {copied.updateDTO ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.updateDTO}</code>
        </pre>
      </div>
      <div className="blue-card-section" style={{ marginTop: "0.7rem" }}>
        We allow only updating the name here — not{" "}
        <span className="blue-inline-code">shortName</span>, assuming it's fixed
        after creation (like a brand slug).
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Entity ↔ DTO Conversion
      </h3>
      <div className="blue-card-section">
        You can do this manually in the <b>Service layer</b> or use a tool like{" "}
        <b>ModelMapper</b> or <b>MapStruct</b>.<br />
        For now, let’s go manual (cleaner for beginners):
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.mapToDTO ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.mapToDTO, "mapToDTO")}
          >
            {copied.mapToDTO ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.mapToDTO}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🔍 Real Example</h3>
      <div className="blue-card-section">
        Let’s say someone sends this to your POST{" "}
        <span className="blue-inline-code">/api/organizations</span> endpoint:
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.toEntity ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.toEntity, "toEntity")}
          >
            {copied.toEntity ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.toEntity}</code>
          </pre>
        </div>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          <b>
            With DTOs, we receive this cleanly, validate it, and save only valid
            data.
          </b>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Zone
      </h3>
      <div className="blue-card-section">
        {discussionPrompts.map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "1.2rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <b>Q{idx + 1}:</b> {faq.q}
            </div>
            <button
              className="reveal-btn"
              onClick={() => toggleFAQ(idx)}
              style={{ marginBottom: "0.5rem" }}
            >
              {openFAQ[idx] ? "Hide Answer" : "Reveal Answer"}
            </button>
            {openFAQ[idx] && <div className="yellow-callout">{faq.a}</div>}
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧠 Try It Yourself!
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧾 Summary</h3>
      <div className="blue-card-section">
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>DTOs protect our entities and APIs from unnecessary exposure.</li>
          <li>We created 3 DTOs for different API use cases.</li>
          <li>
            Validation is built-in with annotations like{" "}
            <span className="blue-inline-code">@NotBlank</span>.
          </li>
          <li>
            DTOs improve <b>security</b>, <b>clarity</b>, and{" "}
            <b>maintainability</b>.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topic5Subtopic3Content;

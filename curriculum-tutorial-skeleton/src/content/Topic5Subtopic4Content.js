import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  serviceInterface: `public interface OrganizationService {
    OrganizationResponseDTO createOrganization(OrganizationRequestDTO requestDTO);
    List<OrganizationResponseDTO> getAllOrganizations();
    Organization getOrganizationByShortName(String shortName);
}`,
  serviceImpl: `@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final ModelMapper modelMapper;

    @Override
    public OrganizationResponseDTO createOrganization(OrganizationRequestDTO requestDTO) {
        // Check for duplicate shortName
        if (organizationRepository.existsByShortName(requestDTO.getShortName())) {
            throw new IllegalArgumentException("Short name already in use!");
        }

        Organization organization = modelMapper.map(requestDTO, Organization.class);
        Organization saved = organizationRepository.save(organization);
        return modelMapper.map(saved, OrganizationResponseDTO.class);
    }

    @Override
    public List<OrganizationResponseDTO> getAllOrganizations() {
        return organizationRepository.findAll()
                .stream()
                .map(org -> modelMapper.map(org, OrganizationResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Organization getOrganizationByShortName(String shortName) {
        return organizationRepository.findByShortName(shortName)
                .orElseThrow(() -> new EntityNotFoundException("Organization not found"));
    }
}`,
  inputDTO: `{
  "name": "Zomato",
  "shortName": "zomato"
}`,
};

const discussionPrompts = [
  {
    q: "Why check if shortName already exists before saving?",
    a: (
      <>
        To ensure brand uniqueness. Two orgs with the same{" "}
        <span className="blue-inline-code">shortName</span> would create URL
        conflicts.
      </>
    ),
  },
  {
    q: "Why are we returning DTOs instead of Entity directly?",
    a: <>To avoid exposing database structure and maintain abstraction.</>,
  },
  {
    q: "What happens if ModelMapper fails to map?",
    a: (
      <>
        It might silently skip or mis-map fields. Always validate complex
        mappings or use a custom converter if needed.
      </>
    ),
  },
];

const tryItTasks = [
  "Add a method to update the organization name – but make sure shortName is not editable.",
  "Throw a custom exception class (like DuplicateShortNameException) instead of IllegalArgumentException.",
  "Add validation logic to ensure no special characters in shortName.",
];

const Topic5Subtopic4Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>🚀 5.5 – Organization Service Layer</h2>
      <hr />
      <div className="yellow-callout">
        The <b>Service Layer</b> is where we implement the business logic for
        managing organizations. It acts as a bridge between the{" "}
        <b>controller</b> (handling HTTP requests) and the <b>repository</b>{" "}
        (communicating with the database). It's also where we handle conversions
        between <b>Entity ↔ DTO</b>, validations, and error handling.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🎯 Objectives</h3>
      <ul className="topic-checklist">
        <li>
          Implement business logic for creating and fetching organizations
        </li>
        <li>
          Convert between <span className="blue-inline-code">Organization</span>{" "}
          and DTOs
        </li>
        <li>
          Handle <span className="blue-inline-code">shortName</span> uniqueness
          and validation
        </li>
        <li>Prepare for URL filtering by organization</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Step-by-Step: OrganizationService Implementation
      </h3>
      <div className="blue-card-section">
        <b>1. Create the Service Interface</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.serviceInterface ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.serviceInterface, "serviceInterface")
            }
          >
            {copied.serviceInterface ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.serviceInterface}</code>
          </pre>
        </div>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Keep it clean – only expose what the controller needs!
        </div>
      </div>
      <div className="blue-card-section">
        <b>2. Implement the Service Class</b>
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.serviceImpl ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.serviceImpl, "serviceImpl")
            }
          >
            {copied.serviceImpl ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.serviceImpl}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎁 Example in Action
      </h3>
      <div className="blue-card-section">
        Suppose <b>Zomato</b> is signing up and wants a custom branded short
        link.
        <div
          className="topic-codeblock code-with-copy"
          style={{ margin: "0.7rem 0" }}
        >
          <button
            className={`copy-button ${copied.inputDTO ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.inputDTO, "inputDTO")}
          >
            {copied.inputDTO ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.inputDTO}</code>
          </pre>
        </div>
        <div className="yellow-callout" style={{ marginTop: "0.7rem" }}>
          Any short URL will look like this:{" "}
          <span className="blue-inline-code">zomato/abc123</span>, thanks to our
          service storing <span className="blue-inline-code">shortName</span>.
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
        ✍️ Try It Yourself – 3 Fun Tasks!
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Topic5Subtopic4Content;

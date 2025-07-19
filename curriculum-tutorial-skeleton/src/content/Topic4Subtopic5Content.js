import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  serviceCode: `@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<UrlDTO> getAllUrls(Pageable pageable) {
        return urlRepository.findAll(pageable)
                .map(url -> modelMapper.map(url, UrlDTO.class));
    }
}`,
};

const bestPractices = [
  [
    "✅ Always return Page<T> for paginated results",
    "Includes total elements, total pages, and more metadata",
  ],
  [
    "✅ Avoid exposing JPA entities directly",
    "Ensures encapsulation and API safety",
  ],
  [
    "✅ Use DTOs and mapping tools (e.g., ModelMapper, MapStruct)",
    "Clean transformation of domain models into API responses",
  ],
  [
    "✅ Keep business logic inside the service layer",
    "Follows the separation of concerns and improves code maintainability",
  ],
];

const discussionPrompts = [
  {
    q: "Why return Page<DTO> instead of List<DTO>?",
    a: (
      <>
        Page&lt;DTO&gt; includes pagination metadata like <b>totalPages</b>,{" "}
        <b>isFirst</b>, <b>isLast</b>, etc., which helps frontend developers
        show page buttons and progress indicators.
      </>
    ),
  },
  {
    q: "What’s the benefit of using a mapper like ModelMapper?",
    a: (
      <>
        It avoids manual copying of fields and reduces errors, while hiding
        sensitive or unnecessary fields from the user.
      </>
    ),
  },
  {
    q: "Can I combine filtering and pagination?",
    a: (
      <>
        Yes! Use custom repository methods like{" "}
        <span className="blue-inline-code">
          findByUserId(String userId, Pageable pageable)
        </span>{" "}
        for powerful combinations.
      </>
    ),
  },
];

const tryItTasks = [
  "Create a UserService with a method getAllUsers(Pageable pageable)",
  "Use .map() to convert User to UserDTO",
  "Add support for filtering: e.g., getUsersByRole(role, pageable)",
  "Call your endpoint with /users?page=1&size=5&sort=name,asc in Postman",
];

const detailsTable = [
  [
    "Pageable pageable",
    "Automatically injected by Spring (via controller) with page, size, sort",
  ],
  [
    "urlRepository.findAll(pageable)",
    "Fetches only the requested chunk (e.g. page 2 of size 10)",
  ],
  [".map(...) ", "Transforms each Url entity into a lightweight UrlDTO"],
  [
    "Page<UrlDTO>",
    "Includes the list plus metadata like total pages, current page, etc.",
  ],
];

const Topic4Subtopic5Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 4.6 – Service Layer Pagination</h2>
      <hr />
      <div className="yellow-callout">
        Think of the <b>service layer</b> as the central control room of your
        application. When the controller receives a paginated request (like:{" "}
        <i>
          “Give me page 3 of shortened URLs, 5 per page, sorted by creation
          date”
        </i>
        ), it forwards this to the service.
        <br />
        <br />
        The <b>service layer</b> then:
        <ul style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Accepts the <span className="blue-inline-code">Pageable</span>{" "}
            object (which has info like{" "}
            <span className="blue-inline-code">page</span>,{" "}
            <span className="blue-inline-code">size</span>,{" "}
            <span className="blue-inline-code">sort</span>)
          </li>
          <li>
            Delegates the call to the <b>repository layer</b>
          </li>
          <li>
            Optionally <b>transforms entities to DTOs</b> (clean version of
            data)
          </li>
          <li>
            Returns a <span className="blue-inline-code">Page&lt;DTO&gt;</span>{" "}
            object back to the controller
          </li>
        </ul>
        This pattern ensures your logic stays{" "}
        <b>clean, reusable, and modular</b>.
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Implement paginated queries in the service layer</li>
        <li>
          ✅ Understand how <span className="blue-inline-code">Pageable</span>{" "}
          flows through the layers
        </li>
        <li>✅ Map entities to DTOs for safe and clear API responses</li>
        <li>
          ✅ Return a fully-featured{" "}
          <span className="blue-inline-code">Page&lt;T&gt;</span> to controllers
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🍕 Funny Analogy – Pizza Order Dispatcher
      </h3>
      <div className="blue-card-section">
        Let’s say your controller is the customer support agent who takes pizza
        orders.
        <br />
        The service layer is like the <b>dispatcher</b> who:
        <ol style={{ margin: "0.5rem 0 0 1.2rem" }}>
          <li>
            Reads your order:{" "}
            <i>"Give me 2 Margherita slices from the 3rd batch"</i>
          </li>
          <li>Contacts the kitchen (repository) to prepare the exact slices</li>
          <li>Packs them in a fancy box (DTOs) and ships it to you</li>
        </ol>
        Without this dispatcher, the kitchen might get overwhelmed, or you might
        get the whole pizza when you only wanted a couple of slices 😄
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Spring Boot Code – Paginated Service for URL Shortener
      </h3>
      <div
        className="topic-codeblock code-with-copy"
        style={{ margin: "0.7rem 0" }}
      >
        <button
          className={`copy-button ${copied.serviceCode ? "copied" : ""}`}
          onClick={() => copyToClipboard(codeBlocks.serviceCode, "serviceCode")}
        >
          {copied.serviceCode ? "Copied!" : "Copy"}
        </button>
        <pre>
          <code>{codeBlocks.serviceCode}</code>
        </pre>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔍 Detailed Explanation:
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Part</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {detailsTable.map(([part, purpose], idx) => (
            <tr key={idx}>
              <td>
                <span className="blue-inline-code">{part}</span>
              </td>
              <td>{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        💬 Discussion Points
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
        🧪 Try It Yourself Tasks
      </h3>
      <div className="blue-card-section try-tasks">
        <ol style={{ margin: 0, paddingLeft: "1.2rem" }}>
          {tryItTasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Practice</th>
            <th>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          {bestPractices.map(([practice, why], idx) => (
            <tr key={idx}>
              <td>{practice}</td>
              <td>{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic4Subtopic5Content;

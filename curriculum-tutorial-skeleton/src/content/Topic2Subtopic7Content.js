import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  helloController: `package com.example.urlshortener.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, World!";
    }
}`,
  urlController: `package com.example.urlshortener.controller;

import com.example.urlshortener.dto.*;
import com.example.urlshortener.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/urls")
@RequiredArgsConstructor
public class UrlController {

    private final UrlService urlService;

    // POST: Create a short URL
    @PostMapping
    public ResponseEntity<BaseResponse<UrlResponseDto>> createShortUrl(
            @RequestBody UrlRequestDto requestDto) {

        UrlResponseDto responseDto = urlService.createShortUrl(requestDto);

        return ResponseEntity.ok(BaseResponse.<UrlResponseDto>builder()
                .success(true)
                .message("Short URL created successfully")
                .data(responseDto)
                .build());
    }

    // GET: Get original URL by short code
    @GetMapping("/{shortCode}")
    public ResponseEntity<BaseResponse<UrlResponseDto>> getOriginalUrl(
            @PathVariable String shortCode) {

        UrlResponseDto responseDto = urlService.getOriginalUrl(shortCode);

        return ResponseEntity.ok(BaseResponse.<UrlResponseDto>builder()
                .success(true)
                .message("Original URL fetched successfully")
                .data(responseDto)
                .build());
    }
}`,
  postRequest: `{
  "originalUrl": "https://example.com",
  "expiresAt": "2025-12-31T23:59:59"
}`,
  postResponse: `{
  "success": true,
  "message": "Short URL created successfully",
  "data": {
    "shortUrl": "abc123",
    "originalUrl": "https://example.com",
    "createdAt": "...",
    "expiresAt": "...",
    "clickCount": 0
  }
}`,
  getResponse: `{
  "success": true,
  "message": "Original URL fetched successfully",
  "data": {
    "shortUrl": "abc123",
    "originalUrl": "https://example.com",
    "createdAt": "...",
    "expiresAt": "...",
    "clickCount": 0
  }
}`,
};

const Topic2Subtopic7Content = () => {
  const [copied, setCopied] = useState({});
  const [showA1, setShowA1] = useState(false);
  const [showA2, setShowA2] = useState(false);
  const [showA3, setShowA3] = useState(false);

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

  return (
    <div className="topic-animated-content">
      <h2 style={{ color: "#1769aa" }}>✅ 2.7 – Controller Layer</h2>
      <hr />
      <div className="key-idea-box">
        <h3 style={{ marginTop: 0, color: "#1769aa" }}>
          🏗️ Overview: The Entry Point of Your Application
        </h3>
        <p>
          The <strong>Controller Layer</strong> is the{" "}
          <strong>gateway of your application</strong>. It listens for incoming
          HTTP requests, talks to the service layer, and returns HTTP responses.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="reception-desk">
            🛎️
          </span>{" "}
          Think of it as the <strong>reception desk</strong> of your application
          — directing requests to the right department (service), and delivering
          responses to the user.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Understand the purpose of the controller layer</li>
        <li>✅ Write a basic Hello World controller</li>
        <li>
          ✅ Create a <span className="blue-inline-code">UrlController</span>{" "}
          class
        </li>
        <li>✅ Use DTOs in request and response</li>
        <li>
          ✅ Use <span className="blue-inline-code">ResponseEntity</span> and
          return structured JSON
        </li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧁 🍰 Start Simple: Hello World Controller
      </h3>
      <p>
        Let’s warm up by building the{" "}
        <strong>simplest controller possible</strong> — just returns “Hello,
        World!” when you hit <span className="blue-inline-code">/hello</span>.
      </p>
      <div className="blue-card-section">
        <b>
          📄 File:{" "}
          <span className="blue-inline-code">HelloController.java</span>
        </b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.helloController ? "copied" : ""}`}
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
      </div>

      <h4 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ How It Works:
      </h4>
      <ul>
        <li>
          <span className="blue-inline-code">@RestController</span> → Tells
          Spring this is a REST controller.
        </li>
        <li>
          <span className="blue-inline-code">@GetMapping("/hello")</span> → Maps
          GET requests to <span className="blue-inline-code">/hello</span>.
        </li>
        <li>
          <span className="blue-inline-code">sayHello()</span> → Returns plain
          text as the response.
        </li>
      </ul>

      <div className="blue-card-section">
        <b>✅ Try It Out</b>
        <ol
          style={{
            color: "#1769aa",
            fontSize: "1.08rem",
            margin: 0,
            paddingLeft: "1.2rem",
          }}
        >
          <li>Add this controller to your project</li>
          <li>Start your Spring Boot app</li>
          <li>
            Open{" "}
            <a
              href="http://localhost:8080/hello"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://localhost:8080/hello
            </a>
          </li>
          <li>
            You’ll see:
            <br />
            <pre>
              <code>Hello, World!</code>
            </pre>
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "2rem", color: "#1769aa" }}>
        🌐 Now Let’s Build the Real Controller
      </h3>
      <p>
        Once you're comfortable with the basics, move to a full-featured
        controller for your <strong>URL Shortener App</strong>.
      </p>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘 What is a Controller in Spring Boot?
      </h3>
      <div className="blue-card-section">
        <ul>
          <li>
            It maps HTTP endpoints (like{" "}
            <span className="blue-inline-code">/create</span>,{" "}
            <span className="blue-inline-code">/abc123</span>) to Java methods
          </li>
          <li>
            Uses annotations like{" "}
            <span className="blue-inline-code">@PostMapping</span>,{" "}
            <span className="blue-inline-code">@GetMapping</span>,{" "}
            <span className="blue-inline-code">@RequestBody</span>, etc.
          </li>
          <li>
            Talks to the <strong>Service Layer</strong> and returns{" "}
            <strong>DTOs wrapped in BaseResponse</strong>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧱 Create: <span className="blue-inline-code">UrlController.java</span>
      </h3>
      <div className="blue-card-section">
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.urlController ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlController, "urlController")
            }
          >
            {copied.urlController ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlController}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Controller Flow Recap
      </h3>
      <ol
        style={{
          color: "#1769aa",
          fontSize: "1.08rem",
          margin: 0,
          paddingLeft: "1.2rem",
        }}
      >
        <li>Receives HTTP Request (POST or GET)</li>
        <li>
          Extracts data using{" "}
          <span className="blue-inline-code">@RequestBody</span> or{" "}
          <span className="blue-inline-code">@PathVariable</span>
        </li>
        <li>Passes to the service</li>
        <li>Gets DTO from service</li>
        <li>
          Wraps it in <span className="blue-inline-code">BaseResponse</span>
        </li>
        <li>
          Returns via <span className="blue-inline-code">ResponseEntity</span>
        </li>
      </ol>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔁 Expected API Calls
      </h3>
      <div className="blue-card-section">
        <b>
          ✅ POST <span className="blue-inline-code">/api/urls</span>
        </b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.postRequest ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postRequest, "postRequest")
            }
          >
            {copied.postRequest ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postRequest}</code>
          </pre>
        </div>
        <b>Response:</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.postResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.postResponse, "postResponse")
            }
          >
            {copied.postResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.postResponse}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>
          ✅ GET <span className="blue-inline-code">/api/urls/abc123</span>
        </b>
        <b>Response:</b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.getResponse ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.getResponse, "getResponse")
            }
          >
            {copied.getResponse ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.getResponse}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ❓ Discussion Points
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <b>
            Q1: Why use{" "}
            <span className="blue-inline-code">@RestController</span>?
          </b>
        </div>
        <button
          className="reveal-btn"
          onClick={() => setShowA1(!showA1)}
          style={{ marginBottom: "1rem" }}
        >
          {showA1 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA1 && (
          <div className="yellow-callout">
            <b>A:</b> It auto-converts returned objects to JSON, eliminating the
            need for <span className="blue-inline-code">@ResponseBody</span>.
          </div>
        )}
        <div style={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
          <b>
            Q2: Why return{" "}
            <span className="blue-inline-code">BaseResponse&lt;T&gt;</span>{" "}
            instead of raw DTOs?
          </b>
        </div>
        <button
          className="reveal-btn"
          onClick={() => setShowA2(!showA2)}
          style={{ marginBottom: "1rem" }}
        >
          {showA2 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA2 && (
          <div className="yellow-callout">
            <b>A:</b> It provides consistent structure:{" "}
            <span className="blue-inline-code">success</span>,{" "}
            <span className="blue-inline-code">message</span>, and{" "}
            <span className="blue-inline-code">data</span> in every response.
          </div>
        )}
        <div style={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
          <b>Q3: What happens if the short code doesn’t exist?</b>
        </div>
        <button
          className="reveal-btn"
          onClick={() => setShowA3(!showA3)}
          style={{ marginBottom: "1rem" }}
        >
          {showA3 ? "Hide Answer" : "Reveal Answer"}
        </button>
        {showA3 && (
          <div className="yellow-callout">
            <b>A:</b> We’ll handle this in the next section using{" "}
            <span className="blue-inline-code">@ControllerAdvice</span> (see 2.8
            – Exception Handling).
          </div>
        )}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself
      </h3>
      <div className="blue-card-section">
        <ol
          style={{
            color: "#1769aa",
            fontSize: "1.08rem",
            margin: 0,
            paddingLeft: "1.2rem",
          }}
        >
          <li>
            Add both controllers:
            <ul>
              <li>
                <span className="blue-inline-code">HelloController.java</span>
              </li>
              <li>
                <span className="blue-inline-code">UrlController.java</span>
              </li>
            </ul>
          </li>
          <li>
            Start the app and test:
            <ul>
              <li>
                GET <span className="blue-inline-code">/hello</span> → Should
                print "Hello, World!"
              </li>
              <li>
                POST <span className="blue-inline-code">/api/urls</span> →
                Should create a short URL
              </li>
              <li>
                GET{" "}
                <span className="blue-inline-code">
                  /api/urls/{`{shortCode}`}
                </span>{" "}
                → Should fetch the original URL
              </li>
            </ul>
          </li>
          <li>Use Postman, Insomnia, or a browser</li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <ul className="topic-checklist">
        <li>✅ Keep logic out of controller — delegate to service</li>
        <li>
          ✅ Use meaningful paths (
          <span className="blue-inline-code">/api/urls</span>,{" "}
          <span className="blue-inline-code">/api/users</span>, etc.)
        </li>
        <li>
          ✅ Use <span className="blue-inline-code">ResponseEntity</span> for
          full HTTP control
        </li>
        <li>✅ Use DTOs for inputs/outputs</li>
        <li>
          ✅ Maintain consistency with{" "}
          <span className="blue-inline-code">BaseResponse&lt;T&gt;</span>
        </li>
      </ul>
    </div>
  );
};

export default Topic2Subtopic7Content;

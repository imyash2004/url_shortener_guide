import React, { useState } from "react";
import "./CustomSectionStyles.css";

const codeBlocks = {
  urlService: `package com.example.urlshortener.service;

import com.example.urlshortener.dto.UrlRequestDto;
import com.example.urlshortener.dto.UrlResponseDto;

public interface UrlService {
    UrlResponseDto createShortUrl(UrlRequestDto requestDto);
    UrlResponseDto getOriginalUrl(String shortCode);
}`,
  urlServiceImpl: `package com.example.urlshortener.service.impl;

import com.example.urlshortener.dto.*;
import com.example.urlshortener.entity.Url;
import com.example.urlshortener.repository.UrlRepository;
import com.example.urlshortener.service.UrlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UrlServiceImpl implements UrlService {

    private final UrlRepository urlRepository;

    @Override
    public UrlResponseDto createShortUrl(UrlRequestDto requestDto) {

        // Generate short code (e.g., UUID or your own logic)
        String shortCode = UUID.randomUUID().toString().substring(0, 6);

        Url url = Url.builder()
                .originalUrl(requestDto.getOriginalUrl())
                .shortUrl(shortCode)
                .createdAt(LocalDateTime.now())
                .expiresAt(requestDto.getExpiresAt())
                .clickCount(0L)
                .build();

        Url saved = urlRepository.save(url);

        return UrlResponseDto.builder()
                .shortUrl(saved.getShortUrl())
                .originalUrl(saved.getOriginalUrl())
                .createdAt(saved.getCreatedAt())
                .expiresAt(saved.getExpiresAt())
                .clickCount(saved.getClickCount())
                .build();
    }

    @Override
    public UrlResponseDto getOriginalUrl(String shortCode) {
        Optional<Url> optionalUrl = urlRepository.findByShortUrl(shortCode);

        Url url = optionalUrl.orElseThrow(() ->
                new RuntimeException("Short URL not found"));

        return UrlResponseDto.builder()
                .shortUrl(url.getShortUrl())
                .originalUrl(url.getOriginalUrl())
                .createdAt(url.getCreatedAt())
                .expiresAt(url.getExpiresAt())
                .clickCount(url.getClickCount())
                .build();
    }
}`,
  shortCode: `String shortCode = Base62.encode(id); // or random 6-letter alphanumeric string`,
  controllerPreview: `@PostMapping("/create")
public ResponseEntity<BaseResponse<UrlResponseDto>> create(@RequestBody UrlRequestDto requestDto) {
    UrlResponseDto responseDto = urlService.createShortUrl(requestDto);

    return ResponseEntity.ok(BaseResponse.<UrlResponseDto>builder()
            .success(true)
            .message("Short URL created")
            .data(responseDto)
            .build());
}`,
};

const Topic2Subtopic6Content = () => {
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
      <h2 style={{ color: "#1769aa" }}>✅ 2.6 – Service Layer</h2>
      <hr />
      <div className="key-idea-box">
        <h3 style={{ marginTop: 0, color: "#1769aa" }}>
          🏗️ Overview: Business Logic Lives Here
        </h3>
        <p>
          You've created entities, repositories, and DTOs. Now, it's time to{" "}
          <strong>write the actual business logic</strong> — where we{" "}
          <strong>decide what happens</strong> when someone creates or fetches a
          short URL.
          <br />
          That’s the job of the <strong>Service Layer</strong>.
        </p>
        <div className="topic-callout">
          <span role="img" aria-label="brain">
            🧠
          </span>{" "}
          Think of the service layer as the <strong>brain</strong> of your app.
          <br />
          It connects data (repository) and external requests (controller),
          processes them, and returns the result.
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🎯 Learning Outcomes
      </h3>
      <ul className="topic-checklist">
        <li>✅ Understand the purpose of the Service Layer</li>
        <li>
          ✅ Implement a <span className="blue-inline-code">UrlService</span>{" "}
          interface and class
        </li>
        <li>✅ Use repository and DTOs in the service</li>
        <li>✅ Write logic for saving and retrieving short URLs</li>
        <li>✅ Prepare services for the controller to use</li>
      </ul>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        📘 What is a Service Layer?
      </h3>
      <div className="blue-card-section">
        <p>
          A <strong>Service</strong> sits between the{" "}
          <strong>Controller</strong> and the <strong>Repository</strong>.<br />
          It’s where you:
        </p>
        <ul>
          <li>Write logic (e.g., generate a short code)</li>
          <li>Map DTOs to entities</li>
          <li>Use repository methods</li>
          <li>Handle optional cases (like “URL not found”)</li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>🧱 Structure</h3>
      <div className="blue-card-section">
        <p>Create:</p>
        <ul>
          <li>
            Interface: <span className="blue-inline-code">UrlService</span>
          </li>
          <li>
            Implementation:{" "}
            <span className="blue-inline-code">UrlServiceImpl</span>
          </li>
        </ul>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔧 Step-by-Step Implementation
      </h3>
      <div className="blue-card-section">
        <b>
          📄 <span className="blue-inline-code">UrlService.java</span>{" "}
          (Interface)
        </b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.urlService ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.urlService, "urlService")}
          >
            {copied.urlService ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlService}</code>
          </pre>
        </div>
      </div>
      <div className="blue-card-section">
        <b>
          📄 <span className="blue-inline-code">UrlServiceImpl.java</span>
        </b>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.urlServiceImpl ? "copied" : ""}`}
            onClick={() =>
              copyToClipboard(codeBlocks.urlServiceImpl, "urlServiceImpl")
            }
          >
            {copied.urlServiceImpl ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.urlServiceImpl}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ⚙️ Short URL Generation Options
      </h3>
      <div className="blue-card-section">
        <p>
          You can customize the short code logic instead of using{" "}
          <span className="blue-inline-code">UUID</span>:
        </p>
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${copied.shortCode ? "copied" : ""}`}
            onClick={() => copyToClipboard(codeBlocks.shortCode, "shortCode")}
          >
            {copied.shortCode ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.shortCode}</code>
          </pre>
        </div>
        <p style={{ marginTop: "0.7rem" }}>
          We’ll enhance this logic later in{" "}
          <span className="blue-inline-code">
            6.1 – Short Code Generation Logic
          </span>
          .
        </p>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🔄 Wiring with Controller (Preview)
      </h3>
      <div className="blue-card-section">
        <div className="topic-codeblock code-with-copy">
          <button
            className={`copy-button ${
              copied.controllerPreview ? "copied" : ""
            }`}
            onClick={() =>
              copyToClipboard(codeBlocks.controllerPreview, "controllerPreview")
            }
          >
            {copied.controllerPreview ? "Copied!" : "Copy"}
          </button>
          <pre>
            <code>{codeBlocks.controllerPreview}</code>
          </pre>
        </div>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        ❓ Discussion Points
      </h3>
      <div className="blue-card-section">
        <div style={{ marginBottom: "1rem" }}>
          <b>Q1: Why split into interface and implementation?</b>
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
            <b>A:</b> Promotes flexibility, testability, and clean architecture.
            You can swap implementations easily (e.g., mock services in tests).
          </div>
        )}
        <div style={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
          <b>Q2: Why not write logic directly in controller?</b>
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
            <b>A:</b> It breaks separation of concerns. Controllers handle HTTP,
            services handle logic.
          </div>
        )}
        <div style={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
          <b>
            Q3: What’s{" "}
            <span className="blue-inline-code">@RequiredArgsConstructor</span>?
          </b>
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
            <b>A:</b> Lombok annotation that generates a constructor for final
            fields — avoids boilerplate.
          </div>
        )}
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧪 Try It Yourself: Step-by-step
      </h3>
      <div className="blue-card-section">
        <div className="blue-card-header">
          <span
            style={{
              fontSize: "1.6rem",
              color: "#43a047",
              marginRight: "0.7rem",
            }}
          >
            ✅
          </span>
          <span className="blue-card-title">Step-by-step Practice</span>
        </div>
        <ol
          style={{
            color: "#1769aa",
            fontSize: "1.08rem",
            margin: 0,
            paddingLeft: "1.2rem",
          }}
        >
          <li style={{ marginBottom: "1.1rem" }}>
            Create package: <code className="blue-inline-code">service</code>{" "}
            and <code className="blue-inline-code">service.impl</code>
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Add interface and class shown above
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Use <code className="blue-inline-code">@Service</code> and{" "}
            <code className="blue-inline-code">@RequiredArgsConstructor</code>
          </li>
          <li style={{ marginBottom: "1.1rem" }}>
            Autowire in your controller
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            Test the <code className="blue-inline-code">/create</code> endpoint
            in Postman
          </li>
        </ol>
      </div>

      <h3 style={{ marginTop: "1.5rem", color: "#1769aa" }}>
        🧼 Best Practices
      </h3>
      <ul className="topic-checklist">
        <li>✅ Keep business logic in service, not in controller</li>
        <li>✅ Return DTOs, not entities</li>
        <li>
          ✅ Handle <span className="blue-inline-code">Optional</span> safely
        </li>
        <li>
          ✅ Use <span className="blue-inline-code">@Service</span>,{" "}
          <span className="blue-inline-code">@Transactional</span> (when needed)
        </li>
        <li>✅ Keep service methods short and focused</li>
      </ul>
    </div>
  );
};

export default Topic2Subtopic6Content;

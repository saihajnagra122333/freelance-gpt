import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useRef, useEffect, useState as useLocalState } from "react";

export default function NeuroMatch({ token }) {
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post(
        "/neuromatch",
        { skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.match);
    } catch {
      setResult("Error matching skills.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>NeuroMatch AI</h2>
      <textarea
        rows={4}
        placeholder="Enter your skills or project details..."
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={{ width: "100%", borderRadius: "10px", padding: "1rem", marginBottom: "1rem" }}
      />
      <button onClick={handleMatch} disabled={loading || !skills.trim()}>
        {loading ? "Matching..." : "Find Best Clients"}
      </button>
      {result && (
        <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.1)", padding: "1rem", borderRadius: "10px" }}>
          <strong>Match Result:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
NeuroMatch.defaultProps = {
  token: "",
};

// PropTypes for better type checking
NeuroMatch.propTypes = {
  token: PropTypes.string,
};

// Additional features

// 1. Clear button to reset input and result
// 2. Character count for textarea
// 3. Error state for better error handling
// 4. Copy result to clipboard button
// 5. Show example skills button
// 6. Accessibility improvements (aria-labels)
// 7. Keyboard shortcut: Ctrl+Enter to submit
// 8. Loading spinner
// 9. Result fade-in animation
// 10. Tooltip for buttons


// 1. Clear button
// 2. Character count
// 3. Error state
// 4. Copy to clipboard
// 5. Example skills
// 6. Accessibility
// 7. Keyboard shortcut
// 8. Spinner
// 9. Animation
// 10. Tooltip

// Add these hooks and helpers inside the component if needed
// (for demonstration, you can move them inside NeuroMatch if you prefer)

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 18,
        height: 18,
        border: "2px solid #ccc",
        borderTop: "2px solid #333",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
        marginRight: 8,
        verticalAlign: "middle",
      }}
    />
  );
}

// Add keyframes for spinner animation
const style = document.createElement("style");
style.innerHTML = `
@keyframes spin { 0% { transform: rotate(0deg);} 100% {transform: rotate(360deg);} }
.fade-in { animation: fadeIn 0.5s; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(style);

// Example skills
const EXAMPLE_SKILLS = "React, Node.js, REST APIs, MongoDB, UI/UX Design";

export function NeuroMatchExtras({ setSkills, setResult, setError, skills, result, loading }) {
  const [copied, setCopied] = useLocalState(false);

  // Copy to clipboard
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Show example
  const handleExample = () => {
    setSkills(EXAMPLE_SKILLS);
    setResult(null);
    setError(null);
  };

  // Clear all
  const handleClear = () => {
    setSkills("");
    setResult(null);
    setError(null);
  };

  return (
    <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
      <button
        type="button"
        onClick={handleClear}
        aria-label="Clear input and result"
        title="Clear"
        disabled={loading}
      >
        Clear
      </button>
      <button
        type="button"
        onClick={handleExample}
        aria-label="Show example skills"
        title="Show example"
        disabled={loading}
      >
        Example
      </button>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy result"
        title="Copy result"
        disabled={!result}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <span style={{ marginLeft: "auto", color: "#888", fontSize: 12 }}>
        {skills.length} / 500 chars
      </span>
    </div>
  );
}

// To use these extras, update your NeuroMatch component as follows:

// 1. Add error state
// 2. Use NeuroMatchExtras
// 3. Add fade-in to result
// 4. Add spinner to button
// 5. Keyboard shortcut

// Example usage (replace your NeuroMatch export with this):

export function NeuroMatchWithExtras({ token }) {
  const [skills, setSkills] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const textareaRef = useRef();

  const handleMatch = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await axios.post(
        "/neuromatch",
        { skills },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data.match);
    } catch (e) {
      setError("Error matching skills.");
    } finally {
      setLoading(false);
    }
  };

  // Keyboard shortcut: Ctrl+Enter
  useEffect(() => {
    const handler = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key === "Enter" &&
        document.activeElement === textareaRef.current
      ) {
        handleMatch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line
  }, [skills, loading]);

  return (
    <div>
      <h2>NeuroMatch AI</h2>
      <textarea
        ref={textareaRef}
        rows={4}
        maxLength={500}
        placeholder="Enter your skills or project details..."
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={{
          width: "100%",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
        aria-label="Skills or project details"
      />
      <button
        onClick={handleMatch}
        disabled={loading || !skills.trim()}
        aria-label="Find best clients"
        title="Find best clients (Ctrl+Enter)"
        style={{ marginRight: 8 }}
      >
        {loading ? <Spinner /> : null}
        {loading ? "Matching..." : "Find Best Clients"}
      </button>
      <NeuroMatchExtras
        setSkills={setSkills}
        setResult={setResult}
        setError={setError}
        skills={skills}
        result={result}
        loading={loading}
      />
      {error && (
        <div
          style={{
            marginTop: "1rem",
            background: "#ffeaea",
            color: "#b00",
            padding: "1rem",
            borderRadius: "10px",
          }}
          role="alert"
        >
          {error}
        </div>
      )}
      {result && (
        <div
          className="fade-in"
          style={{
            marginTop: "1rem",
            background: "rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "10px",
          }}
        >
          <strong>Match Result:</strong>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
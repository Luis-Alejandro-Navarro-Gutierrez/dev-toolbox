"use client";

import { useState } from "react";
import { Copy, Check, Trash2, KeyRound, ShieldAlert, Clock, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

export default function JwtDecoderPage() {
  const sampleJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZWphbmRybyBOYXZhcnJvIiwiYWRtaW4iOnRydWUsImlhdCI6MTc5MTI4MDQ3MSwiZXhwIjoxNzkxMjg0MDcxfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";

  const [jwtInput, setJwtInput] = useState(sampleJwt);
  const [headerJson, setHeaderJson] = useState("");
  const [payloadJson, setPayloadJson] = useState("");
  const [signature, setSignature] = useState("");
  const [isExpired, setIsExpired] = useState<boolean | null>(null);
  const [expDate, setExpDate] = useState<string | null>(null);
  const [iatDate, setIatDate] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Decodificar Base64URL de forma segura en cliente
  const decodeBase64Url = (str: string) => {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("Illegal base64url string!");
    }
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(output), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  };

  const handleDecode = (tokenToDecode = jwtInput) => {
    const trimmed = tokenToDecode.trim();
    if (!trimmed) {
      setHeaderJson("");
      setPayloadJson("");
      setSignature("");
      setIsExpired(null);
      setExpDate(null);
      setIatDate(null);
      setErrorMessage("Please paste a JWT token to decode.");
      return;
    }

    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      setErrorMessage("Invalid JWT format: A valid JSON Web Token must have exactly three dot-separated parts (Header.Payload.Signature).");
      setHeaderJson("");
      setPayloadJson("");
      setSignature("");
      setIsExpired(null);
      return;
    }

    try {
      const decodedHeader = JSON.parse(decodeBase64Url(parts[0]));
      const decodedPayload = JSON.parse(decodeBase64Url(parts[1]));

      setHeaderJson(JSON.stringify(decodedHeader, null, 2));
      setPayloadJson(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);
      setErrorMessage("");

      // Inspección de timestamps (exp e iat)
      if (decodedPayload.exp && typeof decodedPayload.exp === "number") {
        const expTime = decodedPayload.exp * 1000;
        setExpDate(new Date(expTime).toUTCString());
        setIsExpired(Date.now() > expTime);
      } else {
        setExpDate(null);
        setIsExpired(null);
      }

      if (decodedPayload.iat && typeof decodedPayload.iat === "number") {
        setIatDate(new Date(decodedPayload.iat * 1000).toUTCString());
      } else {
        setIatDate(null);
      }
    } catch (err: any) {
      setErrorMessage(`Decoding error: ${err.message || "Unable to parse token parts as JSON."}`);
      setHeaderJson("");
      setPayloadJson("");
      setSignature("");
      setIsExpired(null);
    }
  };

  const handleCopyPayload = () => {
    if (!payloadJson) return;
    navigator.clipboard.writeText(payloadJson);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleClear = () => {
    setJwtInput("");
    setHeaderJson("");
    setPayloadJson("");
    setSignature("");
    setExpDate(null);
    setIatDate(null);
    setIsExpired(null);
    setErrorMessage("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header SEO */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Online JWT Decoder & Token Inspector
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Decode, inspect, and debug JSON Web Tokens (JWT) in real-time. 
          100% client-side execution ensures your authentication claims and sensitive keys are never transmitted to external servers.
        </p>
      </header>

      {/* Toolbar / Actions */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDecode(jwtInput)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <KeyRound className="w-4 h-4" />
            Decode Token
          </button>
          <button
            onClick={() => {
              setJwtInput(sampleJwt);
              handleDecode(sampleJwt);
            }}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition"
          >
            Load Sample JWT
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopyPayload}
            disabled={!payloadJson}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium transition ${
              payloadJson
                ? "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            }`}
          >
            {copiedPayload ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            {copiedPayload ? "Copied!" : "Copy Payload"}
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-sm font-medium transition border border-rose-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Alerta de Error */}
      {errorMessage && (
        <div className="p-3 mb-4 rounded-lg text-sm font-medium bg-rose-50 text-rose-800 border border-rose-200">
          {errorMessage}
        </div>
      )}

      {/* Timestamp Status Banner */}
      {(expDate || iatDate) && (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
          {expDate && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-slate-500" />
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase">Token Expiration (exp)</div>
                <div className="text-sm font-mono text-slate-800">{expDate}</div>
              </div>
              <div className="ml-auto">
                {isExpired ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                    <XCircle className="w-3.5 h-3.5" /> Expired
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                )}
              </div>
            </div>
          )}
          {iatDate && (
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-slate-500" />
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase">Issued At (iat)</div>
                <div className="text-sm font-mono text-slate-800">{iatDate}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Entrada y Salida */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        {/* Entrada JWT */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Encoded JWT Token
          </label>
          <textarea
            value={jwtInput}
            onChange={(e) => {
              setJwtInput(e.target.value);
              handleDecode(e.target.value);
            }}
            placeholder="Paste your encoded JWT string here (e.g. eyJhbGciOi...)"
            className="w-full h-[450px] p-4 font-mono text-xs md:text-sm bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm leading-relaxed break-all"
          />
        </div>

        {/* Salidas Decodificadas */}
        <div className="space-y-4">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Header (Algorithm & Type)</span>
            </div>
            <textarea
              readOnly
              value={headerJson}
              placeholder="Header JSON will appear here..."
              className="w-full h-32 p-3 font-mono text-xs md:text-sm bg-rose-50/50 text-slate-800 border border-rose-200 rounded-xl focus:outline-none shadow-sm"
            />
          </div>

          {/* Payload */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Payload (Data Claims & Timestamps)</span>
            </div>
            <textarea
              readOnly
              value={payloadJson}
              placeholder="Payload claims will appear here..."
              className="w-full h-48 p-3 font-mono text-xs md:text-sm bg-blue-50/50 text-slate-800 border border-blue-200 rounded-xl focus:outline-none shadow-sm"
            />
          </div>

          {/* Signature */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Signature Verification String</span>
            </div>
            <input
              readOnly
              value={signature}
              placeholder="Cryptographic signature snippet..."
              className="w-full p-2.5 font-mono text-xs text-slate-700 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:outline-none shadow-sm truncate"
            />
          </div>
        </div>
      </div>

      {/* Contenido Editorial SEO & Técnico de Alto Valor */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-10">
        
        {/* Sección 1: Introducción */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            What is a JSON Web Token (JWT) and How Does It Work?
          </h2>
          <p className="leading-relaxed">
            JSON Web Token (JWT) is an open, industry-standard specification (RFC 7519) for securely transmitting information between two parties as a compact, URL-safe JSON object. JWTs are widely utilized in modern web engineering for stateless session authentication, Single Sign-On (SSO), and microservices authorization.
          </p>
          <p className="leading-relaxed">
            Because tokens are cryptographically signed using either a symmetric secret key (such as HMAC SHA-256) or an asymmetric public/private keypair (such as RSA or ECDSA), the receiving backend server can verify that the claims inside the token have not been tampered with by unauthorized third parties.
          </p>
        </section>

        {/* Sección 2: Anatomía de un JWT */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Anatomy of a JSON Web Token: The Three Parts
          </h3>
          <p className="text-sm text-slate-600">
            A standard JWT string is composed of three distinct Base64URL-encoded segments separated by dots (<code>.</code>):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-sm">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700">Part 1</span>
              <h4 className="font-semibold text-slate-900 mt-2 mb-1">Header</h4>
              <p className="text-sm text-slate-600">
                Specifies the token type (<code>JWT</code>) and the cryptographic signing algorithm used, such as <code>HS256</code> or <code>RS256</code>.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">Part 2</span>
              <h4 className="font-semibold text-slate-900 mt-2 mb-1">Payload</h4>
              <p className="text-sm text-slate-600">
                Contains the session claims, user identifiers (<code>sub</code>), role permissions, and token lifecycle timestamps (<code>iat</code>, <code>exp</code>).
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-emerald-200 shadow-sm">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">Part 3</span>
              <h4 className="font-semibold text-slate-900 mt-2 mb-1">Signature</h4>
              <p className="text-sm text-slate-600">
                Calculated by hashing the encoded header, encoded payload, and your application's private secret key together to ensure integrity.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Tabla de Claims Estándar */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Standard Registered Claims Reference (RFC 7519)
          </h3>
          <p className="text-sm text-slate-600">
            While custom claims can store arbitrary user attributes, RFC 7519 defines reserved claims for interoperability:
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-semibold">
                <tr>
                  <th className="p-3">Claim</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-mono text-xs font-bold text-blue-600">iss</td>
                  <td className="p-3">Issuer</td>
                  <td className="p-3 text-slate-500">String / URL</td>
                  <td className="p-3">Identifies the principal that issued the JWT (e.g. <code>https://auth0.com</code>).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-bold text-blue-600">sub</td>
                  <td className="p-3">Subject</td>
                  <td className="p-3 text-slate-500">String</td>
                  <td className="p-3">Identifies the principal subject of the token (commonly the unique User ID).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-bold text-blue-600">aud</td>
                  <td className="p-3">Audience</td>
                  <td className="p-3 text-slate-500">String / Array</td>
                  <td className="p-3">Identifies the target recipients or microservices that accept the token.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-bold text-blue-600">exp</td>
                  <td className="p-3">Expiration Time</td>
                  <td className="p-3 text-slate-500">Numeric (Seconds)</td>
                  <td className="p-3">Unix epoch timestamp on or after which the JWT must NOT be accepted.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono text-xs font-bold text-blue-600">iat</td>
                  <td className="p-3">Issued At</td>
                  <td className="p-3 text-slate-500">Numeric (Seconds)</td>
                  <td className="p-3">Unix timestamp indicating when the token was minted.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección 4: Advertencia de Seguridad */}
        <section className="bg-rose-50 p-6 rounded-2xl border border-rose-200 space-y-3">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-lg">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <span>Critical Security Notice: JWT Payloads Are Readable by Anyone</span>
          </div>
          <p className="text-sm leading-relaxed text-rose-900">
            A common developer pitfall is assuming JWTs conceal or encrypt data. 
            JWT tokens are <strong>signed, not encrypted</strong> (unless using JWE - JSON Web Encryption). 
            Anyone with access to the token string can decode the payload instantly using Base64URL decoders like this tool. 
            <strong>Never store unencrypted passwords, credit card numbers, or proprietary API secrets inside a standard JWT payload.</strong>
          </p>
        </section>

        {/* Sección 5: Privacidad Local */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Client-Side Privacy Guarantee</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Inspecting production tokens on unauthorized third-party websites can expose session identifiers to server access logs or external analytics.
            DevToolbox executes all JWT string splitting, Base64URL parsing, and JSON rendering strictly on your local device. 
            No tokens or authorization headers are ever logged or transmitted across the internet.
          </p>
        </section>

        {/* Sección 6: Preguntas Frecuentes (FAQ) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Frequently Asked Questions (FAQ)
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Does decoding a JWT verify its cryptographic signature?
              </h4>
              <p className="text-sm text-slate-600">
                No. Decoding simply translates the Base64URL-encoded strings into human-readable JSON objects. Signature verification requires calculating the cryptographic hash with the private secret key or public certificate, which should always take place on your secure backend server.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Where is the best place to store JWTs on the client?
              </h4>
              <p className="text-sm text-slate-600">
                For web applications, the most secure storage mechanism is an <code>HttpOnly</code>, <code>Secure</code>, and <code>SameSite</code> cookie. Storing sensitive authentication tokens in <code>localStorage</code> leaves them vulnerable to Cross-Site Scripting (XSS) extraction attacks.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Why does my JWT have three parts instead of two?
              </h4>
              <p className="text-sm text-slate-600">
                The three parts represent the Header, Payload, and Signature. While an unsigned token (algorithm <code>none</code>) can technically exist, secure production JWT implementations always require the third signature component to prevent claim falsification.
              </p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
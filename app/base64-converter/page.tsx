"use client";

import { useState } from "react";
import { Copy, Check, Trash2, ArrowRightLeft, Lock, Unlock } from "lucide-react";

export default function Base64ConverterPage() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });
  const [copied, setCopied] = useState(false);

  // Codificar a Base64 con soporte UTF-8 completo
  const handleEncode = () => {
    if (!inputText) {
      setStatusMessage({ text: "Please enter text to encode.", type: "error" });
      return;
    }
    try {
      const encoded = btoa(
        encodeURIComponent(inputText).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
      setOutputText(encoded);
      setStatusMessage({ text: "Encoded to Base64 successfully!", type: "success" });
    } catch (err: any) {
      setOutputText("");
      setStatusMessage({ text: `Encoding failed: ${err.message}`, type: "error" });
    }
  };

  // Decodificar Base64 a texto plano
  const handleDecode = () => {
    if (!inputText.trim()) {
      setStatusMessage({ text: "Please enter Base64 string to decode.", type: "error" });
      return;
    }
    try {
      const decoded = decodeURIComponent(
        Array.prototype.map
          .call(atob(inputText.trim()), (c: string) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      setOutputText(decoded);
      setStatusMessage({ text: "Decoded from Base64 successfully!", type: "success" });
    } catch (err: any) {
      setOutputText("");
      setStatusMessage({
        text: "Invalid Base64 string. Please verify your input formatting.",
        type: "error",
      });
    }
  };

  // Intercambiar entrada y salida
  const handleSwap = () => {
    setInputText(outputText);
    setOutputText(inputText);
    setStatusMessage({ text: "", type: "" });
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setStatusMessage({ text: "", type: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header SEO */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Online Base64 Encoder & Decoder
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Encode plain text, tokens, and data into Base64 format or decode Base64 strings back to readable text with full UTF-8 support.
        </p>
      </header>

      {/* Toolbar / Botones */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleEncode}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <Lock className="w-4 h-4" />
            Encode to Base64
          </button>
          <button
            onClick={handleDecode}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <Unlock className="w-4 h-4" />
            Decode from Base64
          </button>
          <button
            onClick={handleSwap}
            disabled={!outputText}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition disabled:opacity-50"
          >
            <ArrowRightLeft className="w-4 h-4" />
            Swap
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!outputText}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium transition ${
              outputText
                ? "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            {copied ? "Copied!" : "Copy Output"}
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

      {/* Alerta de estado */}
      {statusMessage.text && (
        <div
          className={`p-3 mb-4 rounded-lg text-sm font-medium border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Cajas de texto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Input Content
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste your text or Base64 string here..."
            className="w-full h-80 p-3 font-mono text-xs md:text-sm bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Output Result
          </label>
          <textarea
            readOnly
            value={outputText}
            placeholder="Encoded or decoded result will appear here..."
            className="w-full h-80 p-3 font-mono text-xs md:text-sm bg-slate-100 text-slate-800 border border-slate-300 rounded-xl focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Contenido Editorial SEO */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Understanding Base64 Encoding
        </h2>
        <p className="leading-relaxed">
          Base64 is a binary-to-text encoding algorithm designed to represent binary data in an ASCII string format. It translates data into a radix-64 representation using 64 safe printable characters: uppercase English letters (A-Z), lowercase letters (a-z), numerals (0-9), and two symbols (+ and /), often padded with equal signs (=).
        </p>
        <p className="leading-relaxed">
          Because certain network transport protocols (like HTTP headers, MIME email, or XML) were historically designed to handle plain text only, raw binary payloads or non-ASCII characters can become corrupted during transit. Base64 ensures that arbitrary bytes travel across systems intact.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Common Use Cases
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>API Authentication:</strong> Basic HTTP Authorization headers require credentials structured as <code>username:password</code> encoded in Base64.</li>
          <li><strong>Data URLs:</strong> Embedding small SVGs or PNG images directly into HTML or CSS stylesheets without additional HTTP requests.</li>
          <li><strong>Web Tokens:</strong> Header and payload sections of JSON Web Tokens (JWT) are serialized using URL-safe Base64.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Is Base64 a form of encryption?</h4>
            <p className="text-sm text-slate-600">
              No. Base64 is strictly an <em>encoding</em> scheme, not encryption. It provides zero cryptographic security because anyone can decode a Base64 string instantly without a secret key. Never store raw passwords or sensitive credentials in Base64 without encrypting them first.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Does this converter support special characters and emojis?</h4>
            <p className="text-sm text-slate-600">
              Yes. Unlike standard JavaScript <code>btoa</code> implementations which fail on multibyte strings, our converter incorporates a full UTF-8 conversion layer, allowing seamless encoding and decoding of accented letters, international characters, and emojis.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
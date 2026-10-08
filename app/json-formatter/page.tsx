"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Code2, Minimize2, FileJson, ShieldCheck, Zap } from "lucide-react";

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });
  const [copied, setCopied] = useState(false);

  // Formatear JSON con espacios
  const handleFormat = (spaces: number = 2) => {
    if (!inputJson.trim()) {
      setStatusMessage({ text: "Please enter JSON data first.", type: "error" });
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutputJson(formatted);
      setStatusMessage({ text: "Valid JSON! Formatted successfully.", type: "success" });
    } catch (err: any) {
      setOutputJson("");
      setStatusMessage({ text: `Invalid JSON syntax: ${err.message}`, type: "error" });
    }
  };

  // Minificar JSON
  const handleMinify = () => {
    if (!inputJson.trim()) {
      setStatusMessage({ text: "Please enter JSON data first.", type: "error" });
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setStatusMessage({ text: "Valid JSON! Minified successfully.", type: "success" });
    } catch (err: any) {
      setOutputJson("");
      setStatusMessage({ text: `Invalid JSON syntax: ${err.message}`, type: "error" });
    }
  };

  // Copiar al portapapeles
  const handleCopy = () => {
    if (!outputJson) return;
    navigator.clipboard.writeText(outputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Limpiar campos
  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setStatusMessage({ text: "", type: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header SEO */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Free Online JSON Formatter, Validator & Minifier
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Beautify, inspect, validate, and minify JSON data instantly in real time. 
          Processed 100% client-side for maximum speed and data confidentiality.
        </p>
      </header>

      {/* Barra de herramientas / Botones */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFormat(2)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition"
          >
            <Code2 className="w-4 h-4" />
            Format (2 Spaces)
          </button>
          <button
            onClick={() => handleFormat(4)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold transition"
          >
            Format (4 Spaces)
          </button>
          <button
            onClick={handleMinify}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition"
          >
            <Minimize2 className="w-4 h-4" />
            Minify / Compact
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!outputJson}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium transition ${
              outputJson
                ? "bg-white hover:bg-slate-100 text-slate-800 border-slate-300"
                : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
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

      {/* Cuadros de entrada y salida */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Input JSON
          </label>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder='Paste your raw JSON code here, e.g. {"name":"DevToolbox","version":1.0}'
            className="w-full h-80 p-3 font-mono text-xs md:text-sm bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Formatted Output
          </label>
          <textarea
            readOnly
            value={outputJson}
            placeholder="Formatted or minified output will appear here..."
            className="w-full h-80 p-3 font-mono text-xs md:text-sm bg-slate-100 text-slate-800 border border-slate-300 rounded-xl focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Contenido Editorial y SEO de Alto Valor */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-10">
        
        {/* Sección 1: Introducción Técnica */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            What is JSON and Why Is Proper Formatting Crucial?
          </h2>
          <p className="leading-relaxed">
            JavaScript Object Notation (JSON) is the universal, language-agnostic standard for data exchange across modern software architecture. From microservices communication and RESTful APIs to mobile backend syncing and database storage (such as PostgreSQL JSONB or MongoDB BSON), JSON powers modern digital interactions.
          </p>
          <p className="leading-relaxed">
            While computer engines and network routers effortlessly consume minified, single-line JSON streams without whitespace, developers need clean indentation to inspect schemas, pinpoint unexpected keys, and diagnose bugs. An unformatted JSON string containing thousands of nested attributes is practically impossible to review manually without a dedicated formatting utility.
          </p>
        </section>

        {/* Sección 2: Guía Paso a Paso */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            How to Use This JSON Formatter & Validator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Paste Your Data</h4>
              <p className="text-sm text-slate-600">
                Paste any raw JSON payload, API response, or configuration file directly into the input text area.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Choose an Action</h4>
              <p className="text-sm text-slate-600">
                Click <strong>Format (2 Spaces)</strong> or <strong>Format (4 Spaces)</strong> for readable code, or <strong>Minify</strong> for compact payloads.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Copy & Deploy</h4>
              <p className="text-sm text-slate-600">
                Check the real-time syntax status badge. Click <strong>Copy</strong> to instantly copy the cleaned output to your clipboard.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Comparativa de Formatos */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Data Serialization Comparison: JSON vs. YAML vs. XML
          </h3>
          <p className="text-sm text-slate-600">
            Depending on your stack, you might work with different serialization standards. Here is how JSON compares to alternatives:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border border-slate-200 rounded-lg overflow-hidden bg-white">
              <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Feature</th>
                  <th className="p-3">JSON</th>
                  <th className="p-3">YAML</th>
                  <th className="p-3">XML</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-slate-900">Primary Purpose</td>
                  <td className="p-3">REST APIs & Web Serialization</td>
                  <td className="p-3">DevOps & CI/CD Config (Docker, K8s)</td>
                  <td className="p-3">Enterprise Legacy & Document Markup</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Parsing Speed</td>
                  <td className="p-3 text-emerald-600 font-medium">Ultra Fast (Native browser support)</td>
                  <td className="p-3 text-amber-600">Moderate</td>
                  <td className="p-3 text-rose-600">Slow (Heavy schema parsing)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Syntax Complexity</td>
                  <td className="p-3">Strict & Minimal (Quotes, Brackets)</td>
                  <td className="p-3">Indentation-sensitive</td>
                  <td className="p-3">Verbose (Opening & closing tags)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Data Types Supported</td>
                  <td className="p-3">String, Number, Object, Array, Boolean, Null</td>
                  <td className="p-3">Scalar, Map, Sequence, Custom Tags</td>
                  <td className="p-3">Strings only (Attributes & Nodes)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección 4: Privacidad y Arquitectura */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Zero-Trust Architecture: 100% Client-Side Privacy</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Many online developer utilities transmit your sensitive data, production payloads, and authentication headers to back-end servers where they risk being saved in server logs or analytics pipelines. 
            DevToolbox operates under a strict client-side guarantee: all parsing, formatting, and validation logic runs entirely within your browser's V8 or JavaScriptCore runtime engine. No input string is ever sent to a database or remote server.
          </p>
        </section>

        {/* Sección 5: Preguntas Frecuentes (FAQ) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Frequently Asked Questions (FAQ)
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Why does my JSON show a syntax error with single quotes?
              </h4>
              <p className="text-sm text-slate-600">
                The official RFC 8259 JSON specification explicitly mandates double quotes (<code>"</code>) for all strings and key names. Single quotes (<code>'</code>) are invalid in standard JSON and will trigger an <code>Unexpected token</code> parsing error.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                What is the difference between JSON formatting and minification?
              </h4>
              <p className="text-sm text-slate-600">
                Formatting (beautifying) injects line breaks and spaces (typically 2 or 4 spaces) to enhance human readability. Minification strips all unneeded whitespace, reducing file size and network latency when delivering payloads over HTTP.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Are trailing commas allowed in JSON?
              </h4>
              <p className="text-sm text-slate-600">
                No. Unlike modern JavaScript arrays or Python dictionaries, the standard JSON grammar strictly forbids trailing commas after the last key-value pair or array element.
              </p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
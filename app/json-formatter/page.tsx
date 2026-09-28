"use client";

import { useState } from "react";
import { Copy, Check, Trash2, Code2, Minimize2 } from "lucide-react";

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
          Free Online JSON Formatter & Validator
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Beautify, validate, fix, and minify JSON data in real time. Completely client-side, ultra-fast, and secure.
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
            placeholder='Paste your JSON code here, e.g. {"project": "DevToolbox", "version": 1.0}'
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

      {/* Contenido SEO y Explicativo (Fundamental para aprobación de AdSense) */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          What is JSON and Why Should You Format It?
        </h2>
        <p className="leading-relaxed">
          JavaScript Object Notation (JSON) is the global standard for data exchange across web applications, RESTful APIs, and cloud services. While machines can effortlessly parse minified JSON without line breaks or indentation, humans need a structured layout to debug, analyze, and comprehend the underlying payload.
        </p>
        <p className="leading-relaxed">
          Using an online JSON formatter ensures that your JSON objects, arrays, and keys follow a clean two-space or four-space hierarchy. This helps identify syntax issues—such as missing quotes, trailing commas, or misplaced brackets—instantly before deploying code to production.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Key Features of this JSON Tool
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Real-time syntax validation:</strong> Detects and highlights parsing errors with informative diagnostic messages.</li>
          <li><strong>Two indentation styles:</strong> Choose between standard 2-space or 4-space tab indentation.</li>
          <li><strong>Minification / Compaction:</strong> Strip all unnecessary whitespace and carriage returns to minimize payload size for network requests.</li>
          <li><strong>100% Client-Side Privacy:</strong> No data is sent to external servers or cloud databases; your JSON is parsed locally inside your browser.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Is it safe to format sensitive credentials or tokens here?</h4>
            <p className="text-sm text-slate-600">
              Yes. All JSON processing executes entirely on your local machine using the client-side JavaScript engine. Neither the input nor the formatted output is transmitted over the internet or logged on any server.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">What are the most common JSON syntax errors?</h4>
            <p className="text-sm text-slate-600">
              The three most frequent errors are: (1) using single quotes instead of standard double quotes, (2) leaving trailing commas after the final element in an object or array, and (3) omitting double quotes around object keys.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
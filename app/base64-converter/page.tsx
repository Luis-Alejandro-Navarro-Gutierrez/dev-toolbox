"use client";

import { useState } from "react";
import { Copy, Check, Trash2, ArrowRightLeft, Lock, Unlock, ShieldAlert, Binary } from "lucide-react";

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
          Online Base64 Encoder & Decoder with UTF-8 Support
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Encode plain text, binary assets, and credentials into Base64 format or decode Base64 strings back to readable UTF-8 text instantly. 
          Client-side execution for strict confidentiality.
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

      {/* Contenido Editorial SEO & Técnico */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-10">
        
        {/* Sección 1: Qué es Base64 */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            What is Base64 Encoding and How Does It Function?
          </h2>
          <p className="leading-relaxed">
            Base64 is a binary-to-text encoding scheme that converts arbitrary sequences of 8-bit bytes into a set of 64 ASCII-printable characters. Developed originally for email systems via MIME (Multipurpose Internet Mail Extensions), Base64 prevents data corruption when binary data travels across networks and protocols designed exclusively for plain text.
          </p>
          <p className="leading-relaxed">
            The Base64 alphabet consists of 64 distinct characters: uppercase letters (<code>A-Z</code>), lowercase letters (<code>a-z</code>), numbers (<code>0-9</code>), plus symbols (<code>+</code> and <code>/</code>), with the equal sign (<code>=</code>) reserved for trailing byte padding.
          </p>
        </section>

        {/* Sección 2: Guía Paso a Paso */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            How to Use This Converter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Enter Raw or Encoded Data</h4>
              <p className="text-sm text-slate-600">
                Paste your UTF-8 plain text, API authorization token, or Base64 string in the input area.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Select Conversion Direction</h4>
              <p className="text-sm text-slate-600">
                Click <strong>Encode to Base64</strong> to serialize text, or <strong>Decode from Base64</strong> to reveal the original string.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Copy or Swap</h4>
              <p className="text-sm text-slate-600">
                Use <strong>Copy Output</strong> to clipboard, or press <strong>Swap</strong> to invert inputs and outputs for quick back-and-forth testing.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Tabla Técnica de Bits */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            How Base64 Mathematical Mapping Works
          </h3>
          <p className="text-sm text-slate-600">
            Base64 groups binary data into chunks of 24 bits (3 bytes) and divides them into 4 groups of 6 bits. Each 6-bit index corresponds to a specific character from the Base64 index table:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border border-slate-200 rounded-lg overflow-hidden bg-white">
              <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Character Group</th>
                  <th className="p-3">Index Range</th>
                  <th className="p-3">Binary Representation</th>
                  <th className="p-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-slate-900">A - Z</td>
                  <td className="p-3">0 to 25</td>
                  <td className="p-3"><code>000000 - 011001</code></td>
                  <td className="p-3">Uppercase Alphabetical mapping</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">a - z</td>
                  <td className="p-3">26 to 51</td>
                  <td className="p-3"><code>011010 - 110011</code></td>
                  <td className="p-3">Lowercase Alphabetical mapping</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">0 - 9</td>
                  <td className="p-3">52 to 61</td>
                  <td className="p-3"><code>110100 - 111101</code></td>
                  <td className="p-3">Numerical values</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">+ and /</td>
                  <td className="p-3">62 and 63</td>
                  <td className="p-3"><code>111110 & 111111</code></td>
                  <td className="p-3">Punctuation symbols (often replaced by - and _ in URL-safe Base64)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">= (Padding)</td>
                  <td className="p-3">N/A</td>
                  <td className="p-3">Zero-padded bits</td>
                  <td className="p-3">Appended when total input bytes are not divisible by 3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección 4: Base64 vs Encryption Warning */}
        <section className="bg-amber-50 p-6 rounded-2xl border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>Important Distinction: Base64 is Encoding, Not Encryption</span>
          </div>
          <p className="text-sm leading-relaxed text-amber-900">
            A common misconception in web development is treating Base64 as a method of securing private passwords or API secrets. 
            Base64 does not use encryption keys or cryptographic hashing algorithms; anyone with access to an encoded string can decode it back to plain text instantly. Never rely on Base64 alone to protect private customer data.
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
                Why does Base64 output increase the original file size?
              </h4>
              <p className="text-sm text-slate-600">
                Because Base64 translates every 3 bytes (24 bits) of raw data into 4 characters (32 bits), it introduces an approximate <strong>33% overhead</strong> in string size. This trade-off is accepted to ensure complete compatibility across text-only protocols.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                How does this tool handle non-English characters and emojis?
              </h4>
              <p className="text-sm text-slate-600">
                Standard browser <code>window.btoa</code> fails when evaluating characters beyond Latin1 (ASCII range). Our tool executes an intermediate UTF-8 encoding pipeline, enabling full compatibility with Spanish accents, Asian scripts, and modern emojis without throwing DOM exceptions.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                What does the equal sign (=) mean at the end of a Base64 string?
              </h4>
              <p className="text-sm text-slate-600">
                The equal sign is padding. Because Base64 requires input bytes to be in multiples of 3, any remainder of 1 or 2 leftover bytes is padded with one or two <code>=</code> characters to align the final payload.
              </p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
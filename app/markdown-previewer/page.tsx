"use client";

import { useState, useMemo } from "react";
import { marked } from "marked";
import { Copy, Check, Trash2, Eye, Code, ShieldCheck, FileText } from "lucide-react";

export default function MarkdownPreviewerPage() {
  const defaultMarkdown = `# Welcome to DevToolbox Markdown Previewer

This is a **real-time client-side previewer**. You can write Markdown on the left and see the rendered HTML output on the right instantly.

## Key Features:
- Real-time instant rendering
- Toggle between **Visual Preview** and **Raw HTML Source**
- Completely client-side and secure

### Code Snippet Example:
\`\`\`javascript
function calculateSum(a, b) {
  return a + b;
}
\`\`\`

> Markdown simplifies web documentation, note-taking, and technical blogging.
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [viewMode, setViewMode] = useState<"preview" | "html">("preview");
  const [copied, setCopied] = useState(false);

  // Convertir Markdown a HTML
  const htmlOutput = useMemo(() => {
    try {
      return marked.parse(markdown) as string;
    } catch {
      return "<p>Error parsing markdown</p>";
    }
  }, [markdown]);

  const handleCopy = () => {
    const textToCopy = viewMode === "html" ? htmlOutput : markdown;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setMarkdown("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header SEO */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Online Markdown to HTML Converter & Live Previewer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Write, format, and preview Markdown in real-time. Export clean, semantic HTML code with one click.
          100% browser-based for speed, simplicity, and document privacy.
        </p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setViewMode("preview")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              viewMode === "preview"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Eye className="w-4 h-4" />
            Live Preview
          </button>
          <button
            onClick={() => setViewMode("html")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              viewMode === "html"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Code className="w-4 h-4" />
            HTML Source
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-lg text-sm font-medium transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
            {copied ? "Copied!" : viewMode === "html" ? "Copy HTML" : "Copy Markdown"}
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

      {/* Split Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Markdown Input
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            className="w-full h-[450px] p-4 font-mono text-xs md:text-sm bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {viewMode === "preview" ? "Live Rendered Preview" : "Generated HTML Code"}
          </label>
          <div className="w-full h-[450px] p-4 bg-white border border-slate-300 rounded-xl overflow-y-auto shadow-sm">
            {viewMode === "preview" ? (
              <div
                className="max-w-none text-slate-800 space-y-3 leading-relaxed [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h2]:font-bold [&>h3]:text-lg [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>pre]:bg-slate-900 [&>pre]:text-slate-100 [&>pre]:p-3 [&>pre]:rounded-lg [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-3 [&>blockquote]:italic [&>blockquote]:text-slate-600"
                dangerouslySetInnerHTML={{ __html: htmlOutput }}
              />
            ) : (
              <pre className="font-mono text-xs md:text-sm text-slate-800 whitespace-pre-wrap">
                {htmlOutput}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Contenido Editorial SEO & Técnico de Alto Valor */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-10">
        
        {/* Sección 1: Introducción Técnica */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why Markdown Is the Standard for Developer Documentation
          </h2>
          <p className="leading-relaxed">
            Created in 2004 by John Gruber with contributions from Aaron Swartz, Markdown was designed to serve as a lightweight syntax that is immediately human-readable in plain text form, yet converts effortlessly into structurally sound, semantic HTML.
          </p>
          <p className="leading-relaxed">
            In modern software engineering, Markdown is ubiquitous: it drives GitHub and GitLab <code>README.md</code> files, static site generators (like Next.js, Hugo, and Docusaurus), technical blogs, API documentation, and collaboration tools like Notion and Slack. Using a real-time markdown previewer eliminates rendering surprises before publishing documentation or committing changes to source control.
          </p>
        </section>

        {/* Sección 2: Guía Paso a Paso */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            How to Use This Markdown Previewer & HTML Generator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Compose or Paste</h4>
              <p className="text-sm text-slate-600">
                Type your draft, paste documentation notes, or insert raw Markdown content into the left editor pane.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Inspect in Real-Time</h4>
              <p className="text-sm text-slate-600">
                Instantly see styled typographic headings, lists, code blocks, and blockquotes in the live preview tab.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Export HTML</h4>
              <p className="text-sm text-slate-600">
                Switch to <strong>HTML Source</strong> mode to inspect compiled tags, then click <strong>Copy HTML</strong> to integrate into your CMS or website.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Tabla de Referencia de Sintaxis Markdown */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Comprehensive Markdown Syntax Cheat Sheet
          </h3>
          <p className="text-sm text-slate-600">
            Reference standard GitHub Flavored Markdown (GFM) and CommonMark syntax rules:
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-semibold">
                <tr>
                  <th className="p-3">Element</th>
                  <th className="p-3">Markdown Syntax</th>
                  <th className="p-3">HTML Output Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-slate-900">Headings (H1 - H3)</td>
                  <td className="p-3 font-mono text-xs text-blue-600"># Title / ## Subtitle / ### Section</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;h1&gt;, &lt;h2&gt;, &lt;h3&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Bold & Strong</td>
                  <td className="p-3 font-mono text-xs text-blue-600">**bold text** or __bold text__</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;strong&gt;bold text&lt;/strong&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Italic & Emphasis</td>
                  <td className="p-3 font-mono text-xs text-blue-600">*italicized* or _italicized_</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;em&gt;italicized&lt;/em&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Hyperlink</td>
                  <td className="p-3 font-mono text-xs text-blue-600">[DevToolbox](https://devtools-web.com)</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;a href="..."&gt;DevToolbox&lt;/a&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Embedded Image</td>
                  <td className="p-3 font-mono text-xs text-blue-600">![Alt text](/logo.png)</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;img src="..." alt="Alt text" /&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Inline Code</td>
                  <td className="p-3 font-mono text-xs text-blue-600">`npm install next`</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;code&gt;npm install next&lt;/code&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Fenced Code Block</td>
                  <td className="p-3 font-mono text-xs text-blue-600">```typescript ... ```</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Blockquote</td>
                  <td className="p-3 font-mono text-xs text-blue-600">&gt; Important architectural rule</td>
                  <td className="p-3 font-mono text-xs text-slate-600">&lt;blockquote&gt;...&lt;/blockquote&gt;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección 4: Privacidad y Rendimiento Local */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Client-Side Compilation & Privacy Guarantee</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Draft articles, internal system designs, and proprietary code comments should remain confidential.
            DevToolbox compiles Markdown into HTML on-the-fly using in-memory JavaScript lexical evaluation directly inside your browser tab.
            Your text is never sent over any network socket or stored on cloud servers.
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
                What Markdown specification does this compiler use?
              </h4>
              <p className="text-sm text-slate-600">
                This utility uses the industry-standard <code>marked</code> lexer, adhering closely to the CommonMark specification and supporting popular GitHub Flavored Markdown (GFM) extensions such as tables, task checklists, and autolinks.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Can I use raw HTML tags inside Markdown?
              </h4>
              <p className="text-sm text-slate-600">
                Yes. Markdown was intentionally built to be a superset of HTML. Whenever pure Markdown lacks a specific styling tag (such as custom <code>&lt;span&gt;</code> colors or embedded <code>&lt;iframe&gt;</code> elements), you can safely write inline HTML directly into the input.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                How do I format tables in Markdown?
              </h4>
              <p className="text-sm text-slate-600">
                Tables use pipes (<code>|</code>) to separate columns and hyphens (<code>-</code>) to define the header row. For example: <code>| Header 1 | Header 2 |</code> followed by <code>| --- | --- |</code>.
              </p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
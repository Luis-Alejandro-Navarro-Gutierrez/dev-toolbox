"use client";

import { useState, useMemo } from "react";
import { marked } from "marked";
import { Copy, Check, Trash2, Eye, Code } from "lucide-react";

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
          Online Markdown to HTML Converter & Previewer
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Write, format, and preview Markdown in real-time. Export clean, formatted HTML code with one click.
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

      {/* Contenido Editorial SEO */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Why Use Markdown for Web Content?
        </h2>
        <p className="leading-relaxed">
          Markdown is a lightweight markup language created in 2004 by John Gruber with substantial contributions from Aaron Swartz. It allows authors to write formatted text using a natural, readable syntax that compiles directly into semantic HTML.
        </p>
        <p className="leading-relaxed">
          Whether you are writing a technical README for GitHub, composing documentation, or authoring blog posts, Markdown eliminates the clutter of HTML tags while drafting, allowing you to focus on the structure and content of your message.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Markdown Quick Syntax Reference
        </h3>
        <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-800">
              <tr>
                <th className="p-3">Element</th>
                <th className="p-3">Markdown Syntax</th>
                <th className="p-3">Rendered Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-medium">Heading 2</td>
                <td className="p-3 font-mono text-xs text-blue-600">## Title</td>
                <td className="p-3 font-bold">Subheading</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Bold text</td>
                <td className="p-3 font-mono text-xs text-blue-600">**Bold Text**</td>
                <td className="p-3 font-bold">Bold Text</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Italic text</td>
                <td className="p-3 font-mono text-xs text-blue-600">*Italic Text*</td>
                <td className="p-3 italic">Italic Text</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Inline Code</td>
                <td className="p-3 font-mono text-xs text-blue-600">`console.log()`</td>
                <td className="p-3"><code className="bg-slate-100 px-1 py-0.5 rounded text-xs">console.log()</code></td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Blockquote</td>
                <td className="p-3 font-mono text-xs text-blue-600">&gt; Quote text</td>
                <td className="p-3 border-l-2 border-slate-400 pl-2 text-slate-500">Quote text</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Is this Markdown tool free and private?</h4>
            <p className="text-sm text-slate-600">
              Yes, it is 100% free with no account or registration required. All parsing is done client-side using JavaScript, ensuring your draft notes or documents never leave your browser.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Can I copy the raw HTML output?</h4>
            <p className="text-sm text-slate-600">
              Yes. Click the <em>HTML Source</em> button above the right panel to switch views, then use the <em>Copy HTML</em> button to export standard HTML markup ready for copy-pasting into your website or CMS.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
"use client";

import { useState } from "react";
import { format } from "sql-formatter";
import { Copy, Check, Trash2, Database, Terminal } from "lucide-react";

export default function SqlFormatterPage() {
  const [inputSql, setInputSql] = useState("");
  const [outputSql, setOutputSql] = useState("");
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });
  const [copied, setCopied] = useState(false);
  const [dialect, setDialect] = useState<"sql" | "postgresql" | "mysql" | "sqlite">("sql");

  const handleFormat = () => {
    if (!inputSql.trim()) {
      setStatusMessage({ text: "Please enter a SQL query to format.", type: "error" });
      return;
    }
    try {
      const formatted = format(inputSql, {
        language: dialect,
        tabWidth: 2,
        keywordCase: "upper",
        linesBetweenQueries: 2,
      });
      setOutputSql(formatted);
      setStatusMessage({ text: "SQL query formatted successfully!", type: "success" });
    } catch (err: any) {
      setOutputSql("");
      setStatusMessage({
        text: `Formatting error: ${err.message || "Unable to parse query."}`,
        type: "error",
      });
    }
  };

  const handleCopy = () => {
    if (!outputSql) return;
    navigator.clipboard.writeText(outputSql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputSql("");
    setOutputSql("");
    setStatusMessage({ text: "", type: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header SEO */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Free Online SQL Query Formatter & Beautifier
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Format, beautify, and indent your SQL queries instantly. Supports standard SQL, PostgreSQL, MySQL, and SQLite dialect conventions.
        </p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleFormat}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <Database className="w-4 h-4" />
            Format SQL
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Dialect:</span>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded-lg text-sm px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sql">Standard SQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            disabled={!outputSql}
            className={`flex items-center gap-1.5 px-4 py-2 border rounded-lg text-sm font-medium transition ${
              outputSql
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

      {/* Editores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Raw SQL Query
          </label>
          <textarea
            value={inputSql}
            onChange={(e) => setInputSql(e.target.value)}
            placeholder="select u.id, u.name, o.total from users u inner join orders o on u.id = o.user_id where o.status = 'completed' order by o.total desc limit 10;"
            className="w-full h-80 p-3 font-mono text-xs md:text-sm bg-white text-slate-900 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Formatted SQL Query
          </label>
          <textarea
            readOnly
            value={outputSql}
            placeholder="Formatted query with uppercase keywords and clean indentation will appear here..."
            className="w-full h-80 p-3 font-mono text-xs md:text-sm bg-slate-100 text-slate-800 border border-slate-300 rounded-xl focus:outline-none shadow-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Contenido Editorial SEO */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Why Should You Format SQL Queries?
        </h2>
        <p className="leading-relaxed">
          Structured Query Language (SQL) statements are often generated automatically by ORMs (like Prisma, Hibernate, or Entity Framework) or written quickly during fast prototyping. Over time, queries that combine multiple JOIN operations, nested subqueries, and window functions become difficult to inspect and optimize without consistent styling.
        </p>
        <p className="leading-relaxed">
          Standardizing SQL with uppercase keywords and structured clause indentation makes code reviews faster, simplifies performance tuning in query execution plans (EXPLAIN ANALYZE), and reduces syntax bugs across development teams.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Key Formatting Rules Applied
        </h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Keyword capitalization:</strong> Reserved keywords such as <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>JOIN</code>, <code>GROUP BY</code>, and <code>ORDER BY</code> are automatically capitalized.</li>
          <li><strong>Clause alignment:</strong> Each major SQL clause begins on a new line with systematic indentation.</li>
          <li><strong>Multiple query separation:</strong> Scripts with multiple statements separated by semicolons are given clean double-line breaks.</li>
          <li><strong>Dialect compatibility:</strong> Tailored support for PostgreSQL, MySQL, and SQLite identifier conventions.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Does this tool connect to my database?</h4>
            <p className="text-sm text-slate-600">
              No. This tool is purely a client-side lexical parser and formatter. It runs entirely inside your web browser and never connects to any database server, ensuring complete confidentiality of your schema and table names.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Can it format large SQL dump files?</h4>
            <p className="text-sm text-slate-600">
              Yes, it can handle large queries and multi-statement batches quickly. For files exceeding hundreds of megabytes, however, dedicated command-line utilities are recommended.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
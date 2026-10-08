"use client";

import { useState } from "react";
import { format } from "sql-formatter";
import { Copy, Check, Trash2, Database, ShieldCheck, Cpu } from "lucide-react";

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
          Format, beautify, and indent your SQL queries instantly. Supports standard ANSI SQL, PostgreSQL, MySQL, and SQLite dialects. 
          Processed 100% locally in your browser for zero database exposure.
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
              <option value="sql">Standard SQL (ANSI)</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL / MariaDB</option>
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

      {/* Contenido Editorial SEO & Técnico de Alto Valor */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-10">
        
        {/* Sección 1: Importancia de la legibilidad */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why Clean SQL Formatting Matters in Database Engineering
          </h2>
          <p className="leading-relaxed">
            Structured Query Language (SQL) is the foundation of relational database management systems (RDBMS). While database query planners parse SQL into Abstract Syntax Trees (AST) regardless of spaces or line breaks, human engineers rely on visual structure to diagnose inefficient table joins, verify indexing conditions, and detect expensive full-table scans.
          </p>
          <p className="leading-relaxed">
            Queries generated dynamically by Object-Relational Mappers (ORMs) such as Prisma, Hibernate, or Drizzle often produce monolithic, unformatted single-line statements. Using an automated SQL formatter transforms obscure database calls into standardized, maintainable statements suitable for code reviews and production migrations.
          </p>
        </section>

        {/* Sección 2: Guía Paso a Paso */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            How to Use This SQL Formatter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Paste Your Query</h4>
              <p className="text-sm text-slate-600">
                Paste any single or multi-statement SQL script, CTE, DDL statement, or ORM output into the editor.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Pick Database Dialect</h4>
              <p className="text-sm text-slate-600">
                Select your target dialect (Standard SQL, PostgreSQL, MySQL, or SQLite) for accurate identifier and function rules.
              </p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-semibold text-slate-900 mb-1">Format & Copy</h4>
              <p className="text-sm text-slate-600">
                Click <strong>Format SQL</strong> to beautify, capitalize reserved keywords, and copy the clean query directly to your clipboard.
              </p>
            </div>
          </div>
        </section>

        {/* Sección 3: Tabla Comparativa de Dialectos SQL */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            SQL Dialect Comparison: Differences and Syntax Nuances
          </h3>
          <p className="text-sm text-slate-600">
            Different database management systems implement their own dialect extensions. Here is how key syntax rules vary:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border border-slate-200 rounded-lg overflow-hidden bg-white">
              <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Dialect</th>
                  <th className="p-3">Identifier Quotes</th>
                  <th className="p-3">String Literals</th>
                  <th className="p-3">Pagination Syntax</th>
                  <th className="p-3">Key Strengths</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-slate-900">PostgreSQL</td>
                  <td className="p-3"><code>"column_name"</code></td>
                  <td className="p-3"><code>'text'</code> or <code>$$dollar$$</code></td>
                  <td className="p-3"><code>LIMIT n OFFSET m</code> or <code>FETCH FIRST</code></td>
                  <td className="p-3">Advanced JSONB indexing, CTEs, custom types</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">MySQL / MariaDB</td>
                  <td className="p-3"><code>`column_name`</code> (Backticks)</td>
                  <td className="p-3"><code>'text'</code> or <code>"text"</code></td>
                  <td className="p-3"><code>LIMIT offset, count</code></td>
                  <td className="p-3">Widespread hosting adoption, fast read workloads</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">SQLite</td>
                  <td className="p-3"><code>`col`</code>, <code>"col"</code>, or <code>[col]</code></td>
                  <td className="p-3"><code>'text'</code></td>
                  <td className="p-3"><code>LIMIT n OFFSET m</code></td>
                  <td className="p-3">Serverless, embedded mobile apps, local testing</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">ANSI Standard</td>
                  <td className="p-3"><code>"column_name"</code></td>
                  <td className="p-3"><code>'text'</code></td>
                  <td className="p-3"><code>OFFSET m ROWS FETCH NEXT n ROWS ONLY</code></td>
                  <td className="p-3">Cross-engine portability across compliant engines</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección 4: Privacidad y Seguridad */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Zero Database Connections & Schema Privacy</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            Database queries often reveal proprietary database schemas, confidential column names, business logic, or customer criteria in <code>WHERE</code> clauses. 
            DevToolbox executes lexical parsing and query reformatting exclusively on the client side using compiled JavaScript algorithms. At no point is any database connection established, nor are queries sent over the network to any third-party server.
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
                Does formatting a SQL query alter its performance or execution plan?
              </h4>
              <p className="text-sm text-slate-600">
                No. SQL engines strip comments, tabs, line breaks, and whitespace during the lexing and parsing phases before constructing the query optimization tree. A formatted query executes identically to its minified single-line equivalent.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Why does this tool automatically capitalize keywords?
              </h4>
              <p className="text-sm text-slate-600">
                Capitalizing keywords (like <code>SELECT</code>, <code>INSERT INTO</code>, <code>LEFT JOIN</code>) is the universal industry standard recommended by the SQL-92 specification. It visually separates SQL syntax commands from database-specific entities like table names and field aliases.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Can I format complex queries with multiple Common Table Expressions (WITH clauses)?
              </h4>
              <p className="text-sm text-slate-600">
                Yes. The underlying parser fully understands CTEs (<code>WITH ... AS (...)</code>), nested subqueries, recursive queries, and window functions (such as <code>ROW_NUMBER() OVER (...)</code>), structuring each block with proper relative indentation.
              </p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
import Link from "next/link";
import {
  Code2,
  Binary,
  FileCode,
  Database,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
} from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "JSON Formatter & Validator",
      description:
        "Beautify, validate syntax, inspect errors, and minify JSON payloads in real time.",
      href: "/json-formatter",
      icon: Code2,
      badge: "Popular",
    },
    {
      title: "Base64 Encoder & Decoder",
      description:
        "Safely encode strings to Base64 or decode binary-safe strings back to plain text with UTF-8 support.",
      href: "/base64-converter",
      icon: Binary,
      badge: "Fast",
    },
    {
      title: "JWT Decoder & Inspector",
      description:
        "Decode, inspect, and debug JSON Web Tokens in real-time. Check expiration timestamps, header algorithms, and payload claims client-side.",
      href: "/jwt-decoder",
      icon: KeyRound,
      badge: "New",
    },
    {
      title: "Markdown to HTML Converter",
      description:
        "Real-time split editor to compose Markdown, preview rendered styling, and export clean HTML source code.",
      href: "/markdown-previewer",
      icon: FileCode,
      badge: "Live Preview",
    },
    {
      title: "SQL Query Formatter",
      description:
        "Indent complex queries, capitalize standard keywords, and beautify PostgreSQL, MySQL, and SQLite statements.",
      href: "/sql-formatter",
      icon: Database,
      badge: "Multi-dialect",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
          <Zap className="w-3.5 h-3.5" /> 100% Free &amp; Client-Side Utilities
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Essential Web Tools for Modern Developers
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          DevToolbox is an open suite of privacy-first, zero-latency developer utilities. Format, validate, and convert your data directly inside your browser without backend transmission.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center justify-between">
          <span>Available Developer Tools</span>
          <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">
            5 Online Tools
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative p-6 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {tool.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {tool.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Launch Tool <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Value Pillars Section (Key for AdSense Evaluation) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 border-y border-slate-200 py-12">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Zero Server Storage</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every operation runs locally in your browser session. No JSON payloads, credentials, or SQL schemas are sent to or stored on external servers.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Instant Execution</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Built on React and Next.js, our tools parse and format your content on the client side with no round-trip network delays.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
            <Globe2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-1">Free for Global Use</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Accessible globally with zero subscriptions, account registrations, or usage caps.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial & FAQ Content Section */}
      <article className="prose max-w-none text-slate-700 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Why We Built DevToolbox
        </h2>
        <p className="leading-relaxed">
          Modern web engineers, data analysts, and IT professionals constantly need lightweight utility scripts to test payloads, reformat database queries, encode authorization tokens, and draft Markdown documentation. Many legacy web tools are cluttered with intrusive pop-ups, slow page loads, or unclear data retention policies.
        </p>
        <p className="leading-relaxed">
          DevToolbox was designed as an uncluttered, modern alternative: clean interfaces, lightning-fast client execution, and guaranteed privacy.
        </p>

        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Do I need an account to use these developer tools?</h4>
            <p className="text-sm text-slate-600">
              No account, email, or API key is required. All utilities on DevToolbox are instantly accessible directly from your browser.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-1">Can I use these tools offline?</h4>
            <p className="text-sm text-slate-600">
              Once the web page loads in your browser, the formatting, encoding, and conversion scripts execute entirely locally via client-side JavaScript.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
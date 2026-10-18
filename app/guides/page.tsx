import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Calendar } from "lucide-react";
import { guides } from "@/lib/guidesData";

export const metadata = {
  title: "Engineering Guides & Technical Documentation | DevToolbox",
  description:
    "In-depth developer guides covering web security, layout architecture, cryptography, and data formats.",
};

export default function GuidesIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
          <BookOpen className="w-3.5 h-3.5" /> Technical Knowledge Base
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Developer Guides &amp; Reference
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
          Practical engineering documentation exploring web standards, token security, modern CSS architectures, and data conversion protocols.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="p-6 bg-white border border-slate-200 hover:border-blue-400 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {guide.readTime}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 hover:text-blue-600 transition mb-3">
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {guide.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {guide.date}
              </span>
              <Link
                href={`/guides/${guide.slug}`}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
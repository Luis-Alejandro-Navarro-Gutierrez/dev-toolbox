import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guidesData";
import { ArrowLeft, Clock, Calendar, Wrench, ShieldCheck } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: `${guide.title} | DevToolbox Guides`,
    description: guide.description,
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="mb-8">
        <Link
          href="/guides"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Guides
        </Link>
      </nav>

      <header className="mb-10 pb-8 border-b border-slate-200">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            {guide.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {guide.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {guide.date}
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {guide.title}
        </h1>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed">
          {guide.description}
        </p>
      </header>

      {/* Enlace directo a la herramienta interactiva */}
      <div className="p-4 mb-8 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600 text-white rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-900 uppercase">Interactive Companion Tool</div>
            <div className="text-sm font-semibold text-blue-700">{guide.relatedTool.name}</div>
          </div>
        </div>
        <Link
          href={guide.relatedTool.href}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
        >
          Open Tool &rarr;
        </Link>
      </div>

      {/* Contenido HTML del artículo */}
      <article
        className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:leading-relaxed prose-pre:bg-slate-900 prose-pre:text-slate-100"
        dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
      />

      <footer className="mt-16 pt-8 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Curated by DevToolbox Editorial Team</span>
        </div>
        <Link
          href="/guides"
          className="text-xs font-bold text-blue-600 hover:text-blue-700"
        >
          View all guides &rarr;
        </Link>
      </footer>
    </div>
  );
}
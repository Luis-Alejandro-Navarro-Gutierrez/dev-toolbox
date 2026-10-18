import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guidesData";
import { ArrowLeft, Clock, Calendar, Wrench, ShieldCheck, ChevronRight } from "lucide-react";

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

const articleStyles = [
  "bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm",
  "text-slate-700 leading-relaxed text-base font-normal",
  "[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-slate-900 [&>h2]:tracking-tight [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:pt-4 [&>h2]:border-t [&>h2]:border-slate-100",
  "[&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 [&>h3]:mt-6 [&>h3]:mb-3",
  "[&>p]:mb-5 [&>p]:leading-7",
  "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2.5",
  "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2.5",
  "[&>li]:leading-7",
  "[&>pre]:bg-slate-900 [&>pre]:text-slate-100 [&>pre]:p-4 [&>pre]:rounded-xl [&>pre]:overflow-x-auto [&>pre]:my-6 [&>pre]:text-sm [&>pre]:font-mono [&>pre]:shadow-inner",
  "[&>p>code]:bg-slate-100 [&>p>code]:text-blue-700 [&>p>code]:px-1.5 [&>p>code]:py-0.5 [&>p>code]:rounded-md [&>p>code]:font-mono [&>p>code]:text-sm",
  "[&>li>code]:bg-slate-100 [&>li>code]:text-blue-700 [&>li>code]:px-1.5 [&>li>code]:py-0.5 [&>li>code]:rounded-md [&>li>code]:font-mono [&>li>code]:text-sm",
  "[&>strong]:text-slate-900 [&>strong]:font-semibold",
].join(" ");

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition">DevToolbox</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/guides" className="hover:text-blue-600 transition">Guides</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs">{guide.category}</span>
        </nav>

        {/* Encabezado */}
        <header className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200/60">
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> {guide.readTime}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {guide.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed border-l-4 border-blue-500 pl-4 py-1">
            {guide.description}
          </p>
        </header>

        {/* Herramienta complementaria */}
        <div className="p-5 mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">
                Companion Interactive Tool
              </div>
              <div className="text-base font-bold text-white">
                {guide.relatedTool.name}
              </div>
            </div>
          </div>
          <Link
            href={guide.relatedTool.href}
            className="w-full sm:w-auto text-center px-4 py-2.5 bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
          >
            Launch Tool &rarr;
          </Link>
        </div>

        {/* Artículo con estilos inyectados de forma segura */}
        <article
          className={articleStyles}
          dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
        />

        {/* Pie de página */}
        <footer className="mt-8 p-6 bg-white border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Peer-reviewed Engineering Documentation • DevToolbox</span>
          </div>
          <Link
            href="/guides"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            &larr; Explore all guides
          </Link>
        </footer>
      </div>
    </main>
  );
}
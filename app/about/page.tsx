import { Terminal, Shield, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        About DevToolbox
      </h1>
      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        We provide fast, secure, and privacy-conscious utilities for developers, data specialists, and web creators worldwide.
      </p>

      <h2 className="text-2xl font-bold text-slate-900 pt-2">Our Mission</h2>
      <p className="leading-relaxed">
        DevToolbox was created to solve a common developer annoyance: finding simple online utilities without having to endure bloated pages, sluggish server response times, or ambiguous data privacy practices. 
      </p>
      <p className="leading-relaxed">
        We believe that developers should have access to reliable tools that run 100% locally in the browser, ensuring your JSON structures, SQL queries, and base64 strings stay strictly on your device.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <div className="p-5 bg-white border border-slate-200 rounded-xl">
          <Shield className="w-6 h-6 text-emerald-600 mb-2" />
          <h3 className="font-bold text-slate-900 mb-1">Privacy Focused</h3>
          <p className="text-xs text-slate-600">No telemetry or server logging of user inputs.</p>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-xl">
          <Zap className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="font-bold text-slate-900 mb-1">Zero Latency</h3>
          <p className="text-xs text-slate-600">Client-side execution for instant feedback.</p>
        </div>
        <div className="p-5 bg-white border border-slate-200 rounded-xl">
          <Globe className="w-6 h-6 text-indigo-600 mb-2" />
          <h3 className="font-bold text-slate-900 mb-1">Always Free</h3>
          <p className="text-xs text-slate-600">No subscriptions, no accounts, no artificial limits.</p>
        </div>
      </div>
    </div>
  );
}
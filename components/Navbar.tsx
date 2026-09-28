import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 hover:text-blue-700">
          <Terminal className="w-6 h-6" />
          <span>DevToolbox</span>
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
          <Link href="/json-formatter" className="hover:text-blue-600 transition">JSON Formatter</Link>
          <Link href="/base64-converter" className="hover:text-blue-600 transition">Base64</Link>
          <Link href="/markdown-previewer" className="hover:text-blue-600 transition">Markdown</Link>
          <Link href="/sql-formatter" className="hover:text-blue-600 transition">SQL Formatter</Link>
        </div>
      </div>
    </nav>
  );
}
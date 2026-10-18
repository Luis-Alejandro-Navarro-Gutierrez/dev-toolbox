"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Binary,
  KeyRound,
  FileCode,
  Database,
  LayoutGrid,
  ChevronDown,
  Menu,
  X,
  Wrench,
} from "lucide-react";

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toolsList = [
    { name: "JSON Formatter", href: "/json-formatter", icon: Code2, desc: "Format & validate JSON" },
    { name: "Base64 Converter", href: "/base64-converter", icon: Binary, desc: "Encode & decode text" },
    { name: "JWT Decoder", href: "/jwt-decoder", icon: KeyRound, desc: "Inspect tokens & claims" },
    { name: "CSS Grid Builder", href: "/grid-generator", icon: LayoutGrid, desc: "Visual 2D layout builder" },
    { name: "Markdown Preview", href: "/markdown-previewer", icon: FileCode, desc: "Live preview to HTML" },
    { name: "SQL Formatter", href: "/sql-formatter", icon: Database, desc: "Format multi-dialect queries" },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-slate-900 tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              D
            </div>
            <span>DevToolbox</span>
          </Link>

          {/* Menú Escritorio */}
          <div className="hidden md:flex items-center gap-6">
            {/* Dropdown Tools */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 200)}
                className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition py-2"
              >
                <Wrench className="w-4 h-4 text-blue-600" />
                <span>Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Contenido Desplegable */}
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 grid grid-cols-1 gap-1 z-50">
                  {toolsList.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                      >
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 group-hover:text-blue-600">
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {tool.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link href="/about" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Botón Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Available Tools
          </div>
          <div className="grid grid-cols-1 gap-2">
            {toolsList.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-800 text-sm font-semibold"
                >
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>
          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-slate-700 hover:text-blue-600"
            >
              Contact
            </Link>
            <Link href="/guides" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition">
              Guides
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
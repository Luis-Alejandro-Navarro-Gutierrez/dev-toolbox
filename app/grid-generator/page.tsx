"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  RotateCcw,
  Plus,
  Trash2,
  LayoutGrid,
  Code2,
  Sparkles,
  ShieldCheck,
  Maximize2,
} from "lucide-react";

interface GridItem {
  id: number;
  colSpan: number;
  rowSpan: number;
  name: string;
}

export default function GridGeneratorPage() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(16);
  const [outputFormat, setOutputFormat] = useState<"css" | "tailwind">("css");
  const [copied, setCopied] = useState(false);

  const [items, setItems] = useState<GridItem[]>([
    { id: 1, colSpan: 3, rowSpan: 1, name: "Header" },
    { id: 2, colSpan: 1, rowSpan: 2, name: "Sidebar" },
    { id: 3, colSpan: 2, rowSpan: 1, name: "Main Content" },
    { id: 4, colSpan: 2, rowSpan: 1, name: "Extra Panel" },
    { id: 5, colSpan: 3, rowSpan: 1, name: "Footer" },
  ]);

  const [selectedItemId, setSelectedItemId] = useState<number | null>(1);

  // Cargar presets de arquitecturas comunes
  const applyPreset = (type: "holy-grail" | "dashboard" | "cards") => {
    if (type === "holy-grail") {
      setColumns(3);
      setRows(3);
      setGap(16);
      setItems([
        { id: 1, colSpan: 3, rowSpan: 1, name: "Header" },
        { id: 2, colSpan: 1, rowSpan: 2, name: "Sidebar" },
        { id: 3, colSpan: 2, rowSpan: 1, name: "Main Section" },
        { id: 4, colSpan: 2, rowSpan: 1, name: "Supporting Article" },
        { id: 5, colSpan: 3, rowSpan: 1, name: "Footer" },
      ]);
      setSelectedItemId(1);
    } else if (type === "dashboard") {
      setColumns(4);
      setRows(3);
      setGap(20);
      setItems([
        { id: 1, colSpan: 1, rowSpan: 3, name: "Nav Drawer" },
        { id: 2, colSpan: 3, rowSpan: 1, name: "KPI Metrics (Top)" },
        { id: 3, colSpan: 2, rowSpan: 2, name: "Analytics Chart" },
        { id: 4, colSpan: 1, rowSpan: 2, name: "Activity Feed" },
      ]);
      setSelectedItemId(1);
    } else if (type === "cards") {
      setColumns(3);
      setRows(2);
      setGap(16);
      setItems([
        { id: 1, colSpan: 1, rowSpan: 1, name: "Feature 1" },
        { id: 2, colSpan: 1, rowSpan: 1, name: "Feature 2" },
        { id: 3, colSpan: 1, rowSpan: 1, name: "Feature 3" },
        { id: 4, colSpan: 1, rowSpan: 1, name: "Feature 4" },
        { id: 5, colSpan: 1, rowSpan: 1, name: "Feature 5" },
        { id: 6, colSpan: 1, rowSpan: 1, name: "Feature 6" },
      ]);
      setSelectedItemId(1);
    }
  };

  const addItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const newItem: GridItem = {
      id: newId,
      colSpan: 1,
      rowSpan: 1,
      name: `Block ${newId}`,
    };
    setItems([...items, newItem]);
    setSelectedItemId(newId);
  };

  const removeItem = (id: number) => {
    const remaining = items.filter((i) => i.id !== id);
    setItems(remaining);
    if (selectedItemId === id) {
      setSelectedItemId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const updateSelectedItem = (key: "colSpan" | "rowSpan" | "name", value: any) => {
    if (selectedItemId === null) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId ? { ...item, [key]: value } : item
      )
    );
  };

  const selectedItem = items.find((i) => i.id === selectedItemId);

  // Generación de código CSS y Tailwind
  const generateCss = () => {
    let css = `.grid-container {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: repeat(${columns}, minmax(0, 1fr));\n`;
    css += `  grid-template-rows: repeat(${rows}, minmax(0, 1fr));\n`;
    css += `  gap: ${gap}px;\n`;
    css += `}\n\n`;

    items.forEach((item, index) => {
      const needsCol = item.colSpan > 1;
      const needsRow = item.rowSpan > 1;
      if (needsCol || needsRow) {
        css += `.item-${index + 1} {\n`;
        if (needsCol) css += `  grid-column: span ${item.colSpan} / span ${item.colSpan};\n`;
        if (needsRow) css += `  grid-row: span ${item.rowSpan} / span ${item.rowSpan};\n`;
        css += `}\n`;
      }
    });

    return css;
  };

  const generateTailwind = () => {
    const gapClass = `gap-[${gap}px]`;
    let code = `<!-- Grid Container -->\n`;
    code += `<div class="grid grid-cols-${columns} grid-rows-${rows} ${gapClass}">\n`;

    items.forEach((item) => {
      let itemClasses = "p-4 bg-white border border-slate-200 rounded-xl";
      if (item.colSpan > 1) itemClasses += ` col-span-${item.colSpan}`;
      if (item.rowSpan > 1) itemClasses += ` row-span-${item.rowSpan}`;
      code += `  <div class="${itemClasses}">\n    ${item.name}\n  </div>\n`;
    });

    code += `</div>`;
    return code;
  };

  const generatedCode = outputFormat === "css" ? generateCss() : generateTailwind();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header SEO */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Interactive CSS Grid & Layout Builder
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
          Visually design and prototype responsive CSS Grid layouts in real time. 
          Configure tracks, adjust gaps, expand cell spans, and export production-ready CSS or Tailwind markup.
        </p>
      </header>

      {/* Preset Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
            Presets:
          </span>
          <button
            onClick={() => applyPreset("holy-grail")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            Holy Grail
          </button>
          <button
            onClick={() => applyPreset("dashboard")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            SaaS Dashboard
          </button>
          <button
            onClick={() => applyPreset("cards")}
            className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold rounded-lg transition"
          >
            Feature Grid
          </button>
        </div>

        <button
          onClick={addItem}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Add Block
        </button>
      </div>

      {/* Main Interactive Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
        
        {/* Panel Izquierdo: Controles de Configuración */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-600" /> Container Dimensions
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Columns:</span>
                <span className="font-mono text-blue-600">{columns}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={columns}
                onChange={(e) => setColumns(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Rows:</span>
                <span className="font-mono text-blue-600">{rows}</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Gap (Spacing):</span>
                <span className="font-mono text-blue-600">{gap}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={48}
                step={4}
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Configuración del Item Seleccionado */}
          <div className="pt-5 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Selected Block Properties
              </h3>
              {selectedItem && (
                <button
                  onClick={() => removeItem(selectedItem.id)}
                  className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              )}
            </div>

            {selectedItem ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Label Name:
                  </label>
                  <input
                    type="text"
                    value={selectedItem.name}
                    onChange={(e) => updateSelectedItem("name", e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Column Span:
                    </label>
                    <select
                      value={selectedItem.colSpan}
                      onChange={(e) => updateSelectedItem("colSpan", Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from({ length: columns }).map((_, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          Span {idx + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Row Span:
                    </label>
                    <select
                      value={selectedItem.rowSpan}
                      onChange={(e) => updateSelectedItem("rowSpan", Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from({ length: rows }).map((_, idx) => (
                        <option key={idx + 1} value={idx + 1}>
                          Span {idx + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                Click any cell in the canvas to inspect its spans.
              </p>
            )}
          </div>
        </div>

        {/* Panel Central/Derecho: Canvas Visual y Exportador de Código */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Canvas Interactivo */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col justify-between min-h-[380px]">
            <div className="flex items-center justify-between mb-4 text-xs font-medium text-slate-400">
              <span>Interactive Grid Sandbox (Click item to select)</span>
              <span className="font-mono text-emerald-400">
                {columns} cols × {rows} rows
              </span>
            </div>

            <div
              className="w-full h-full min-h-[280px]"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${rows}, minmax(60px, 1fr))`,
                gap: `${gap}px`,
              }}
            >
              {items.map((item) => {
                const isSelected = item.id === selectedItemId;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemId(item.id)}
                    style={{
                      gridColumn: `span ${Math.min(item.colSpan, columns)} / span ${Math.min(item.colSpan, columns)}`,
                      gridRow: `span ${Math.min(item.rowSpan, rows)} / span ${Math.min(item.rowSpan, rows)}`,
                    }}
                    className={`cursor-pointer p-3 rounded-xl transition-all flex flex-col justify-between border ${
                      isSelected
                        ? "bg-blue-600/30 border-blue-400 text-white shadow-lg ring-2 ring-blue-500"
                        : "bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold truncate">{item.name}</span>
                      <span className="font-mono text-[10px] opacity-60">
                        {item.colSpan}c × {item.rowSpan}r
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generador de Código */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Generated Output
                </span>
                <div className="flex bg-slate-100 rounded-lg p-0.5 ml-2">
                  <button
                    onClick={() => setOutputFormat("css")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                      outputFormat === "css"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Pure CSS
                  </button>
                  <button
                    onClick={() => setOutputFormat("tailwind")}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                      outputFormat === "tailwind"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Tailwind CSS
                  </button>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white hover:bg-slate-50 text-slate-800 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <pre className="font-mono text-xs bg-slate-950 text-slate-200 p-4 rounded-xl overflow-x-auto max-h-56 leading-relaxed">
              {generatedCode}
            </pre>
          </div>
        </div>

      </div>

      {/* Contenido Editorial SEO & Técnico de Alto Valor */}
      <article className="border-t border-slate-200 pt-10 text-slate-700 space-y-10">
        
        {/* Sección 1: Introducción Técnica */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Why CSS Grid Is Fundamental for Modern Web Engineering
          </h2>
          <p className="leading-relaxed">
            CSS Grid Layout is the most powerful 2-dimensional layout engine native to the web platform. Unlike older floating elements or one-dimensional Flexbox containers, CSS Grid allows engineers to govern rows and columns simultaneously with mathematical precision.
          </p>
          <p className="leading-relaxed">
            By declaring track sizes using responsive fractional units (<code>fr</code>), minimum-maximum bounds (<code>minmax()</code>), and dynamic repeating patterns (<code>repeat()</code>), developers eliminate hundreds of lines of fragile JavaScript layout calculations while delivering fluid UI responsiveness across mobile, tablet, and desktop viewports.
          </p>
        </section>

        {/* Sección 2: CSS Grid vs Flexbox */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Architectural Breakdown: CSS Grid vs. Flexbox
          </h3>
          <p className="text-sm text-slate-600">
            Choosing the right layout module prevents cascading stylesheet bloat. Here is how both systems compare:
          </p>
          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-900 font-semibold">
                <tr>
                  <th className="p-3">Characteristic</th>
                  <th className="p-3">CSS Grid Layout</th>
                  <th className="p-3">CSS Flexbox</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-medium text-slate-900">Dimensional Model</td>
                  <td className="p-3 text-blue-600 font-medium">2-Dimensional (Rows & Columns simultaneously)</td>
                  <td className="p-3">1-Dimensional (Single Row or Single Column at a time)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Primary Focus</td>
                  <td className="p-3">Layout-First (Structure is defined from container downward)</td>
                  <td className="p-3">Content-First (Elements flow and adapt according to inner size)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Element Overlapping</td>
                  <td className="p-3 text-emerald-600 font-medium">Native (via explicit line or area coordinate overlap)</td>
                  <td className="p-3 text-slate-500">Requires absolute positioning hacks</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Ideal Use Case</td>
                  <td className="p-3">Application shell architectures, SaaS dashboards, complex photo mosaics</td>
                  <td className="p-3">Navigation bars, button clusters, form fields, horizontal chip lists</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Sección 3: Privacidad y Rendimiento */}
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Zero-Dependency Client-Side Computation</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-600">
            DevToolbox operates under strict client-side guarantees. All track computations, span recalculations, and Tailwind/CSS code string serialization take place in your browser session. No layout designs, style configurations, or telemetry data are ever stored or sent to remote databases.
          </p>
        </section>

        {/* Sección 4: Preguntas Frecuentes (FAQ) */}
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">
            Frequently Asked Questions (FAQ)
          </h3>
          <div className="space-y-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                What does the <code>fr</code> unit mean in CSS Grid?
              </h4>
              <p className="text-sm text-slate-600">
                The <code>fr</code> (fractional unit) represents a fraction of the available space inside the grid container. A grid defined as <code>1fr 2fr</code> divides the total width into three parts, allocating one-third to the first column and two-thirds to the second.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                Can I combine CSS Grid and Flexbox within the same page?
              </h4>
              <p className="text-sm text-slate-600">
                Yes, this is industry best practice. CSS Grid is typically utilized for major page landmarks (Header, Sidebar, Content, and Footer), while Flexbox handles micro-layouts inside individual components (like aligning icons with text inside buttons).
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-1">
                How does <code>gap</code> prevent margin-collapse issues?
              </h4>
              <p className="text-sm text-slate-600">
                Unlike legacy margin declarations, the CSS <code>gap</code> property applies gutter spacing strictly <em>between</em> adjacent cells without adding awkward trailing margins to the outer edges of the container.
              </p>
            </div>
          </div>
        </section>

      </article>
    </div>
  );
}
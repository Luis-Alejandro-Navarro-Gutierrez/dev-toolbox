export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-2">1. Terms and Acceptance</h2>
      <p className="leading-relaxed">
        By accessing this website, accessible from DevToolbox, you are agreeing to be bound by these website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">2. Use License</h2>
      <p className="leading-relaxed">
        Permission is granted to freely use the online developer tools provided on DevToolbox for personal, educational, or commercial purposes. You may not attempt to reverse engineer, disrupt the hosting infrastructure, or perform denial-of-service attacks against our platform.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">3. Disclaimer</h2>
      <p className="leading-relaxed">
        All the materials and tools on DevToolbox are provided &quot;as is&quot;. DevToolbox makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, DevToolbox does not make any representations concerning the accuracy or reliability of the use of the materials on its website.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">4. Limitations</h2>
      <p className="leading-relaxed">
        DevToolbox or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on DevToolbox’s website, even if DevToolbox or an authorized representative has been notified of the possibility of such damage.
      </p>
    </div>
  );
}
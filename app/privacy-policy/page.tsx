export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-700 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-slate-500 mb-6">
        Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </p>

      <p className="leading-relaxed">
        At DevToolbox, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by DevToolbox and how we use it.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">Client-Side Processing Guarantee</h2>
      <p className="leading-relaxed">
        DevToolbox provides utilities such as JSON formatters, Base64 encoders/decoders, Markdown renderers, and SQL formatters. All data processing occurs directly within your web browser using client-side JavaScript. <strong>We do not store, view, transmit, or log any text, queries, or credentials entered into our tools.</strong>
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">Cookies and Web Beacons</h2>
      <p className="leading-relaxed">
        Like any other website, DevToolbox uses &quot;cookies&quot;. These cookies are used to store information including visitors&apos; preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">Google DoubleClick DART Cookie</h2>
      <p className="leading-relaxed">
        Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://policies.google.com/technologies/ads</a>.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">Third-Party Privacy Policies</h2>
      <p className="leading-relaxed">
        DevToolbox&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
      </p>

      <h2 className="text-xl font-bold text-slate-900 pt-4">Consent</h2>
      <p className="leading-relaxed">
        By using our website, you hereby consent to our Privacy Policy and agree to its terms.
      </p>
    </div>
  );
}
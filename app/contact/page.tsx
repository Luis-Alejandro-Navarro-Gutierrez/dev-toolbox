"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/mbglqjan", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch {
      alert("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-slate-700">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Contact Us
      </h1>
      <p className="text-slate-600 mb-8 leading-relaxed">
        Have feedback, suggestions for new developer tools, or bug reports? Feel free to reach out to our team using the form below.
      </p>

      {submitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <div>
            <h4 className="font-bold">Thank you for your message!</h4>
            <p className="text-sm">We have received your feedback and will review it shortly.</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. contact@example.com"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              required
              placeholder="e.g. Feature request or bug report"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Describe your inquiry or feedback..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition shadow-sm disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 py-10 text-sm text-gray-500 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} DevToolbox. Free developer utilities. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:text-gray-900 transition">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-gray-900 transition">Terms of Service</Link>
          <Link href="/about" className="hover:text-gray-900 transition">About Us</Link>
          <Link href="/contact" className="hover:text-gray-900 transition">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
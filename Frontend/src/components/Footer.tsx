import React from "react";
import Link from "next/link";
import { Compass, Facebook, Instagram, Mail, Globe } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl">
                <Compass size={18} />
              </div>
              <span className="text-2xl font-bold font-outfit text-white tracking-tight">
                TravelSathi
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              The AI-first travel companion designed for the modern era. Experience the world like a local, planned to perfection.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-500 border border-slate-800"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4 text-sm">
              {["AI Trip Planner", "Local Recommendations", "Smart Packing", "Mobile App", "Pricing"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-blue-400 transition-colors inline-flex items-center group">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm">
              {["About Us", "Careers", "Press", "Contact", "Partners"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-blue-400 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Updated */}
          <div className="space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-xs">Stay Updated</h4>
            <p className="text-sm">Get early access to new features and travel guides.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@travelsathi.ai"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-5 text-sm focus:ring-2 focus:ring-blue-600 outline-none pr-14 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-3.5 rounded-xl hover:bg-blue-500 transition-all active:scale-95">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-medium tracking-wide">
          <p>© 2026 TravelSathi AI Inc. Made with ❤️ for world explorers.</p>
          <div className="flex gap-10">
             <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
             <Link href="#" className="hover:text-white transition-colors">Terms Conditions</Link>
             <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

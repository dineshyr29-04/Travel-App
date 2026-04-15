import React from "react";
import Link from "next/link";
import { Compass, Facebook, Instagram, Mail, Globe } from "./Icons";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Compass size={18} />
            </div>
            <span className="text-xl font-bold font-outfit text-white tracking-tight">
              SkyBound
            </span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            Crafting extraordinary travel experiences for the modern explorer. From hidden gems to luxury retreats, we guide you to the world's most breathtaking places.
          </p>
          <div className="flex gap-4">
            {[Facebook, Instagram, Mail, Globe].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm">
            {["Destinations", "Cruises", "Hotels", "Travel Packages", "Guides"].map((link) => (
              <li key={link}>
                <Link href="#" className="hover:text-blue-400 transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            {["Help Center", "Safety Information", "Terms of Service", "Privacy Policy", "Contact Us"].map((link) => (
              <li key={link}>
                <Link href="#" className="hover:text-blue-400 transition-colors">{link}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold mb-6">Newsletter</h4>
          <p className="text-sm mb-4">Get travel tips and exclusive offers delivered to your inbox.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email address"
              className="w-full bg-slate-800 border-none rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none pr-12"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-500 transition-colors">
              <Mail size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-xs">
        <p>© 2026 SkyBound Travel. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="hover:text-white">Cookie Policy</Link>
          <Link href="#" className="hover:text-white">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

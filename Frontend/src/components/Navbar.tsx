"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Compass, User } from "./Icons";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled 
          ? "bg-white/70 backdrop-blur-2xl border-b border-slate-100/50 py-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)]" 
          : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-[60]">
          <div className="w-10 h-10 bg-slate-950 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:rotate-[360deg] transition-all duration-700">
            <Compass size={22} strokeWidth={2.5} />
          </div>
          <span className={`text-2xl font-black font-outfit tracking-tight transition-colors duration-500 ${isScrolled ? "text-slate-950" : "text-white"}`}>
            TravelSathi<span className="text-blue-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
          {["Explore", "AI Planner", "Localites", "Stories"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-500 relative group ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className={`p-3 rounded-2xl hover:bg-slate-100/10 backdrop-blur-3xl transition-all ${isScrolled ? "text-slate-950" : "text-white"}`}>
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button className={`hidden lg:flex items-center gap-2 px-8 py-3.5 rounded-[1.25rem] text-sm font-black uppercase tracking-widest active:scale-95 transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] ${
             isScrolled ? "bg-slate-950 text-white" : "bg-white text-slate-950"
          }`}>
            <span>Get App</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-3 rounded-2xl ${isScrolled ? "text-slate-950 bg-slate-50" : "text-white bg-white/10"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} strokeWidth={3} /> : <Menu size={26} strokeWidth={3} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {["Destinations", "Adventures", "Hotels", "Stories"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-lg font-medium text-slate-800 hover:text-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <button className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-semibold">
                <User size={20} />
                <span>Sign In</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

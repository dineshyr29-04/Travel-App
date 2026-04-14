"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Compass, User } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform duration-300">
            <Compass size={24} />
          </div>
          <span className={`text-2xl font-bold font-outfit ${isScrolled ? "text-slate-900" : "text-slate-900"}`}>
            SkyBound
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["Destinations", "Adventures", "Hotels", "Stories"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isScrolled ? "text-slate-600" : "text-slate-700"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${isScrolled ? "text-slate-600" : "text-slate-700"}`}>
            <Search size={20} />
          </button>
          <button className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md">
            <User size={18} />
            <span>Sign In</span>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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

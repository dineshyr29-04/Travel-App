"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import DestinationCard from "../components/DestinationCard";
import Footer from "../components/Footer";
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Calendar, 
  Star,
  Search
} from "../components/Icons";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const destinations = [
    { title: "Santorini Bloom", location: "Oia, Greece", image: "/images/santorini.png", price: "1200", rating: 4.9, tag: "Romantic" },
    { title: "Swiss Serenity", location: "Zermatt, Alps", image: "/images/swiss_alps.png", price: "2450", rating: 5.0, tag: "Adventure" },
    { title: "Ubud Sanctuaries", location: "Bali, Indonesia", image: "/images/bali.png", price: "850", rating: 4.8, tag: "Wellness" },
    { title: "Azure Coastline", location: "Amalfi, Italy", image: "/images/hero_bg.png", price: "1800", rating: 4.9, tag: "Culture" },
  ];

  const features = [
    { 
      title: "AI Trip Planner", 
      desc: "Get personalized itineraries baked with AI intelligence based on your taste.", 
      icon: <Sparkles className="text-purple-400" size={32} />,
      color: "from-purple-500/20 to-blue-500/20"
    },
    { 
      title: "Localite Insights", 
      desc: "Access hidden gems and secret spots curated by locals in every city.", 
      icon: <Globe className="text-blue-400" size={32} />,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    { 
      title: "Smart Packing", 
      desc: "Never forget a thing with our climate-aware dynamic packing lists.", 
      icon: <Zap className="text-amber-400" size={32} />,
      color: "from-amber-500/20 to-orange-500/20"
    },
    { 
      title: "Secure Bookings", 
      desc: "One-tap insurance and military-grade encryption for all transactions.", 
      icon: <ShieldCheck className="text-emerald-400" size={32} />,
      color: "from-emerald-500/20 to-blue-500/20"
    }
  ];

  return (
    <main className="min-h-screen bg-white selection:bg-blue-600 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section - The Masterpiece */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/hero_bg.png" 
            alt="Hero Background" 
            fill 
            className="object-cover brightness-[0.7] contrast-[1.1]" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
              >
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-100">AI-Powered Travel Era</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-9xl font-black font-outfit text-white leading-[0.9] mb-8"
              >
                Plan Smarter.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300">Travel Better.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed font-medium"
              >
                The ultimate AI companion that drafts your dream itinerary in seconds. Connect with real locals and explore like never before.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-6"
              >
                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 rounded-3xl text-white font-black text-lg shadow-2xl shadow-blue-600/30 hover:bg-blue-500 hover:scale-105 active:scale-95 transition-all">
                  Start Planning
                </button>
                <button className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-white font-black text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  Explore Now
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-20"
        >
          <div className="bg-slate-900 border border-slate-800 p-4 md:p-6 rounded-[2.5rem] shadow-[0_32px_120px_-10px_rgba(0,0,0,0.8)] flex flex-col md:flex-row gap-6 md:items-center">
            <div className="flex-1 flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
              <MapPin className="text-blue-500" size={24} />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Location</span>
                <input type="text" placeholder="Where next?" className="bg-transparent border-none outline-none text-white font-black placeholder:text-slate-600 w-full" />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/5 border border-white/5">
              <Calendar className="text-blue-500" size={24} />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Dates</span>
                <input type="text" placeholder="Add dates" className="bg-transparent border-none outline-none text-white font-black placeholder:text-slate-600 w-full" />
              </div>
            </div>
            <button className="px-10 py-5 bg-white rounded-2xl text-slate-950 font-black flex items-center justify-center gap-3 hover:bg-blue-500 hover:text-white transition-all shadow-xl">
              <Search size={22} />
              Search
            </button>
          </div>
        </motion.div>
      </section>

      {/* AI Features Section */}
      <section className="py-48 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">
            <motion.div {...fadeInUp} className="max-w-2xl">
              <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Next-Gen Travel</span>
              <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-950 leading-tight">
                Designed for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Modern Nomad.</span>
              </h2>
            </motion.div>
            <motion.p {...fadeInUp} className="max-w-md text-slate-500 text-lg font-medium leading-relaxed pb-2">
              Forget manual planning. Let TravelSathi handle the logistics while you focus on the memories.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group transition-all"
              >
                <div className={`w-16 h-16 rounded-3xl mb-8 flex items-center justify-center bg-gradient-to-br ${feat.color} group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <h4 className="text-2xl font-black mb-4 text-slate-950">{feat.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Showcase */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-950 mb-6">Popular Escapes</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["All", "Adventure", "Beach", "Culture", "Hidden"].map((cat, i) => (
                <button key={i} className={`px-6 py-2.5 rounded-full text-sm font-black transition-all ${i === 0 ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {destinations.map((dest, i) => (
              <DestinationCard key={i} {...dest} className={i % 3 === 0 ? "lg:h-[600px] lg:col-span-1" : ""} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Immersive Scroll */}
      <section className="py-48 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[150px] -z-10" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-5xl md:text-7xl font-black font-outfit leading-tight mb-12">
                Your entire trip in <span className="text-blue-500">three steps.</span>
              </h2>
              <div className="space-y-16">
                {[
                  { num: "01", title: "Drop your mood", text: "Tell the AI where you want to go and what vibe you're feeling today." },
                  { num: "02", title: "AI Drafts your plan", text: "Within seconds, get a pixel-perfect itinerary from flight to dinner." },
                  { num: "03", title: "Explore with Locals", text: "Connect with verified localites for on-the-ground support." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-5xl font-black text-transparent stroke-white stroke-2 bg-clip-text group-hover:text-blue-500 transition-all font-outfit opacity-20 group-hover:opacity-100">{step.num}</span>
                    <div>
                      <h4 className="text-2xl font-black mb-2">{step.title}</h4>
                      <p className="text-slate-400 font-medium">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
               initial={{ opacity: 0, x: 50, rotate: 5 }}
               whileInView={{ opacity: 1, x: 0, rotate: -5 }}
               transition={{ duration: 1 }}
               className="relative h-[600px] w-full bg-gradient-to-br from-blue-600 to-purple-800 rounded-[3rem] overflow-hidden shadow-2xl p-4"
            >
               <div className="h-full w-full bg-slate-900 rounded-[2.5rem] border border-white/10 flex items-center justify-center">
                  <span className="text-slate-700 font-black text-2xl uppercase tracking-widest">Mockup Interface</span>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-24">
             <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-950 mb-6">Trusted by 50K Explorers.</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl transition-all group">
                <div className="flex gap-1 text-amber-500 mb-8">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} className="fill-current" />)}
                </div>
                <p className="text-xl font-bold text-slate-950 mb-10 leading-relaxed italic">
                  "TravelSathi completely changed how I explore. The AI suggestions were spot on, and I met the coolest people."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden" />
                  <div>
                    <h5 className="font-black text-slate-950">Sarah Johnson</h5>
                    <span className="text-slate-500 text-sm font-medium">Digital Nomad</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Massive */}
      <section className="py-24 px-6 mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto bg-blue-600 rounded-[4rem] p-12 lg:p-32 text-center text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(37,99,235,0.4)]"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl md:text-8xl font-black font-outfit leading-[0.85]">
              Ready to find<br />your next story?
            </h2>
            <p className="text-blue-100 text-xl font-medium max-w-2xl mx-auto opacity-80">
              Download the TravelSathi app or start planning your first AI trip here for free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-12 py-6 bg-white text-blue-600 rounded-3xl font-black text-xl hover:bg-slate-50 hover:scale-105 transition-all shadow-xl">
                Get App Now
              </button>
              <button className="px-12 py-6 bg-blue-700 border border-blue-500 text-white rounded-3xl font-black text-xl hover:bg-blue-800 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}

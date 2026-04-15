"use client";

import React from "react";
import Image from "next/image";
import { Search, MapPin, Calendar, Map } from "./Icons";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_bg.png"
          alt="Travel Adventure"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-slate-900/80 via-transparent to-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-md rounded-full text-blue-400 font-semibold text-sm mb-6 border border-blue-600/30"
          >
            Explore the Unexplored
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold font-outfit text-white mb-6 leading-tight"
          >
            Journey Beyond Your <span className="text-blue-400">Imagination</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-200 mb-10 leading-relaxed max-w-2xl"
          >
            Discover hand-picked luxury destinations and unique adventure stories across the globe. Your next great story starts here.
          </motion.p>

          {/* Search Bar - Premium Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-2 md:p-3 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-2 md:gap-0 max-w-4xl"
          >
            <div className="flex-1 w-full flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-200/20 py-2">
              <MapPin className="text-blue-500" size={20} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Location</span>
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium w-full"
                />
              </div>
            </div>

            <div className="flex-1 w-full flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-200/20 py-2">
              <Calendar className="text-blue-500" size={20} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Check-in</span>
                <input 
                  type="text" 
                  placeholder="Add dates" 
                  className="bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-sm font-medium w-full"
                />
              </div>
            </div>

            <div className="flex-1 w-full flex items-center px-4 gap-3 py-2">
              <Map className="text-blue-500" size={20} />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Activity</span>
                <select className="bg-transparent border-none outline-none text-slate-800 text-sm font-medium w-full appearance-none">
                  <option>All Activities</option>
                  <option>Adventure</option>
                  <option>Relaxation</option>
                  <option>Cultural</option>
                </select>
              </div>
            </div>

            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl md:rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-blue-600/30">
              <Search size={20} />
              <span>Explore</span>
            </button>
          </motion.div>
          
          <div className="mt-12 flex items-center gap-6">
             <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                    <div className="bg-blue-600 w-full h-full flex items-center justify-center text-[10px] font-bold text-white">USER</div>
                  </div>
                ))}
             </div>
             <p className="text-sm text-slate-300">
                <span className="text-white font-bold">2,500+</span> people booked travel in the last 24 hours
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

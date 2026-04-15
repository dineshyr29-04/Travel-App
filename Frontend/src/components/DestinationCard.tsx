"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin, ArrowUpRight } from "./Icons";
import { motion } from "framer-motion";

interface DestinationCardProps {
  title: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  tag?: string;
  className?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  title,
  location,
  image,
  price,
  rating,
  tag,
  className = "",
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.6 }}
      className={`group relative h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 bg-slate-900 ${className}`}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-90 transition-opacity"
      />
      
      {/* Overlay - Premium Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Top Badge */}
      {tag && (
        <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 z-10">
          <span className="text-[10px] font-black uppercase tracking-[1px] text-white">
            {tag}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4 z-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
               <MapPin size={14} className="text-blue-400" />
               <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{location}</span>
            </div>
            <h3 className="text-3xl font-black font-outfit text-white leading-tight">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
            <Star size={14} className="fill-blue-400 text-blue-400" />
            <span className="text-sm font-black text-white">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-700" />

        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          <p className="text-slate-300 text-sm font-medium">Starting at <span className="text-white font-bold">${price}</span></p>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl group/btn hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
            <ArrowUpRight size={20} className="group-hover/btn:rotate-12 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;

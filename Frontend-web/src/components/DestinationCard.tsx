"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface DestinationCardProps {
  title: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  tag?: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  title,
  location,
  image,
  price,
  rating,
  tag,
}) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
    >
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {tag && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-600 shadow-sm">
            {tag}
          </div>
        )}

        <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-blue-600">
          <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-outfit text-slate-900 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-amber-700">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-500 mb-4">
          <MapPin size={14} />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Starting from</span>
            <span className="text-2xl font-bold text-slate-900 font-outfit">${price}</span>
            <span className="text-xs text-slate-400">/person</span>
          </div>
          <button className="text-sm font-bold text-blue-600 hover:underline">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;

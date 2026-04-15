import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DestinationCard from "../components/DestinationCard";
import Footer from "../components/Footer";
import { ArrowRight, Globe, Shield, Zap } from "../components/Icons";

export default function Home() {
  const featuredDestinations = [
    {
      title: "Santorini Bliss",
      location: "Oia, Greece",
      image: "/images/santorini.png",
      price: "1,200",
      rating: 4.9,
      tag: "Best Seller",
    },
    {
      title: "Alpine Retreat",
      location: "Zermatt, Switzerland",
      image: "/images/swiss_alps.png",
      price: "1,850",
      rating: 4.8,
      tag: "Seasonal",
    },
    {
      title: "Ubud Sanctuaries",
      location: "Bali, Indonesia",
      image: "/images/bali.png",
      price: "950",
      rating: 5.0,
      tag: "Trending",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-center gap-8 opacity-60">
             {/* Simple text logos for demo */}
             {["TRAVELER", "VOGUE", "FORBES", "EXPEDIA", "NATIONAL GEOGRAPHIC"].map(brand => (
               <span key={brand} className="text-sm font-bold tracking-widest text-slate-400">{brand}</span>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold font-outfit text-slate-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-slate-500 max-w-lg">
              Explore our hand-picked selection of the world's most beautiful places, curated for the modern traveler.
            </p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
            <span>View All</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((dest, idx) => (
            <DestinationCard key={idx} {...dest} />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-8 leading-tight">
                Why Travel With <span className="text-blue-400">SkyBound</span>?
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-600/30 flex-shrink-0">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Global Expertise</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Our local experts across 150+ countries provide insights you won't find anywhere else.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-600/30 flex-shrink-0">
                    <Shield size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Secure Booking</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">Fully protected financial transactions and 24/7 dedicated travel support whenever you need it.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-600/30 flex-shrink-0">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Instant Confirmation</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">No more waiting. Get your travel documents and vouchers instantly upon booking.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square bg-blue-600/20 rounded-[40px] border border-blue-600/20 rotate-6 absolute inset-0 -z-10" />
               <div className="aspect-square bg-slate-800 rounded-[40px] overflow-hidden border border-slate-700 flex items-center justify-center">
                  {/* Small UI Mockup or simply a placeholder for demo */}
                  <div className="text-center p-12">
                     <Compass size={80} className="mx-auto text-blue-500 mb-6 animate-pulse" />
                     <h3 className="text-2xl font-bold mb-4">Your Next Adventure Awaits</h3>
                     <p className="text-slate-400 mb-8">Ready to start planning your dream trip? Join 50,000+ travelers today.</p>
                     <button className="bg-blue-600 px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all">
                        Get Started Free
                     </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6">
           <div className="bg-blue-600 rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8 leading-tight">
                  Stop Dreaming, <br />Start Exploring.
                </h2>
                <p className="text-blue-100 text-lg mb-12 max-w-2xl mx-auto opacity-80">
                  Join our community of world travelers and get exclusive access to member-only deals and secret destinations.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                   <button className="bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-xl">
                      Start Planning
                   </button>
                   <button className="bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-blue-800 transition-all border border-blue-500/30">
                      View Packages
                   </button>
                </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const Compass = ({ size, className }: { size: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

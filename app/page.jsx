"use client";
export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Immagini decorative
const heroImage = "/images/hero-wedding.jpg"; // Sfondo hero
const flowerIcon = "/images/flower.svg"; // Fiore decorativo per card

export default function WeddingSite() {
  return (
    <div className="relative min-h-screen bg-[#fff8f2] text-[#4b3f36] font-serif overflow-x-hidden">
      
      {/* 🎀 Sfondo animato petali e cuori */}
      <AnimatedBackground />

      <MusicPlayer />

      {/* Hero Section con immagine */}
      <section 
        className="relative text-center py-32 px-6 bg-cover bg-center z-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-6xl md:text-7xl font-serif font-semibold mb-4 text-white"
        >
          Mara & Gianluigi
        </motion.h1>
        <p className="relative text-xl italic text-white/90 mb-4">18 Giugno 2026</p>
        <Countdown />
      </section>

      {/* Cerimonia e Ricevimento */}
      <SectionCard title="Cerimonia">
        <img src={flowerIcon} className="w-12 mx-auto mb-2" />
        Chiesa Sant'Alessandro in Agros<br/>Villongo<br/>Ore 16:00
        <MapButton query="Chiesa Sant'Alessandro in Agros Villongo" />
      </SectionCard>

      <SectionCard title="Ricevimento">
        <img src={flowerIcon} className="w-12 mx-auto mb-2" />
        Cascina Fiorita<br/>Grumello del Monte
        <MapButton query="Cascina Fiorita Grumello del Monte" />
      </SectionCard>

      {/* Gallery */}
      <Gallery />

      {/* RSVP */}
      <section className="text-center px-6 py-16 z-10 relative">
        <h2 className="text-3xl mb-4 font-serif">RSVP</h2>
        <a href="https://wa.me/39XXXXXXXXXX" target="_blank">
          <button className="px-6 py-3 bg-[#d99c9c] text-white rounded-xl shadow-lg hover:bg-[#c77b7b] transition">
            Conferma su WhatsApp
          </button>
        </a>
      </section>

      {/* Footer decorato */}
      <footer className="text-center py-8 text-sm opacity-70 font-serif flex justify-center items-center gap-2 z-10 relative">
        <span>Mara</span>
        <img src={flowerIcon} className="w-4" />
        <span>Gianluigi</span>
      </footer>
    </div>
  );
}

// 🎵 PLAYER
function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    if (!playing) audioRef.current.play();
    else audioRef.current.pause();
    setPlaying(!playing);
  };
  return (
    <div className="fixed bottom-4 right-4 z-20">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <button onClick={toggle} className="px-4 py-2 bg-black text-white rounded-full shadow-lg">
        {playing ? "🔇" : "🎵"}
      </button>
    </div>
  );
}

// ⏳ COUNTDOWN
function Countdown() {
  const weddingDate = new Date("2026-06-18T16:00:00");
  const now = new Date();
  const diff = weddingDate - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  return <p className="text-2xl mt-4">{days} giorni</p>;
}

// 🧾 CARD
function SectionCard({ title, children }) {
  return (
    <section className="px-6 py-8 max-w-4xl mx-auto z-10 relative">
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
        <h2 className="text-2xl mb-2 font-serif">{title}</h2>
        {children}
      </div>
    </section>
  );
}

// 🗺️ MAPPA
function MapButton({ query }) {
  return (
    <div className="mt-4">
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`} target="_blank">
        <button className="px-4 py-2 border rounded-lg hover:bg-[#f1e3da] transition">
          Apri Mappa
        </button>
      </a>
    </div>
  );
}

// 📷 GALLERY
function Gallery() {
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
    "/images/gallery5.jpg",
    "/images/gallery6.jpg"
  ];
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto z-10 relative">
      <h2 className="text-3xl text-center mb-8 font-serif">I nostri momenti</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <motion.img 
            key={i} 
            src={src} 
            className="h-52 w-full object-cover rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform"
            whileHover={{ scale: 1.1 }}
          />
        ))}
      </div>
    </section>
  );
}

// 🎨 BACKGROUND ANIMATO CUORI/PETALI
function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: Math.random() * dimensions.width }}
          animate={{ y: dimensions.height + 50 }}
          transition={{ repeat: Infinity, duration: 20 + Math.random() * 20, ease: "linear" }}
          className="absolute text-pink-300 text-2xl md:text-4xl select-none"
          style={{ left: `${Math.random() * 100}%` }}
        >
          ❤️🌸
        </motion.div>
      ))}
    </div>
  );
}

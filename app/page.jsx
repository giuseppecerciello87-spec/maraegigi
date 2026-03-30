"use client";
export const dynamic = "force-dynamic";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Immagini decorative
const heroImage = "/images/hero-wedding.jpg";
const flowerIcon = "/images/flower-deco.png";

export default function WeddingSite() {
  return (
    <div className="relative bg-gradient-to-b from-[#fffaf6] to-[#f6f2eb] text-[#4b3f36] font-serif overflow-x-hidden">

      {/* Hero grande come Matrimonio.com */}
      <section
        className="relative text-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col justify-center items-center h-full"
        >
          <h1 className="text-7xl font-serif font-bold text-white">
            Mara & Gianluigi
          </h1>
          <p className="mt-4 text-2xl italic text-white/90">
            18 Giugno 2026
          </p>
        </motion.div>
      </section>

      {/* Sezioni con sfondo alternato simile ai template */}
      <section className="bg-white py-12">
        <InfoSection />
      </section>

      <Gallery />

      <RSVPSection />

      <footer className="bg-[#faf2ed] text-center py-6 text-sm">
        <span className="font-serif">Mara & Gianluigi</span> – Con amore 💕
      </footer>
    </div>
  );
}

function InfoSection() {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-12">
      <CeremonyCard />
      <ReceptionCard />
    </div>
  );
}

function CeremonyCard() {
  return (
    <div className="bg-[#fffaf6] rounded-2xl shadow-lg p-8">
      <img src={flowerIcon} className="w-16 mx-auto mb-4" />
      <h2 className="text-3xl font-serif mb-2">Cerimonia</h2>
      <p>Chiesa Sant'Alessandro in Agros<br/>Villongo – Ore 16:00</p>
    </div>
  );
}

function ReceptionCard() {
  return (
    <div className="bg-[#fffaf6] rounded-2xl shadow-lg p-8">
      <img src={flowerIcon} className="w-16 mx-auto mb-4" />
      <h2 className="text-3xl font-serif mb-2">Ricevimento</h2>
      <p>Cascina Fiorita<br/>Grumello del Monte</p>
    </div>
  );
}

function Gallery() {
  const images = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg"
  ];
  return (
    <section className="py-16 bg-white">
      <h2 className="text-4xl font-serif text-center mb-8">I nostri momenti</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {images.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            className="rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>
    </section>
  );
}

function RSVPSection() {
  return (
    <section className="bg-[#f9ebe7] py-16 text-center">
      <h2 className="text-3xl font-serif mb-6">RSVP</h2>
      <p className="mb-4">Conferma la tua presenza via WhatsApp</p>
      <a href="https://wa.me/39XXXXXXXXXX" target="_blank">
        <button className="px-6 py-3 bg-[#d99c9c] text-white rounded-xl shadow-lg">
          Conferma su WhatsApp
        </button>
      </a>
    </section>
  );
}

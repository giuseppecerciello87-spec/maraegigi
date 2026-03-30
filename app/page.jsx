"use client";
export const dynamic = "force-dynamic";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// Immagini decorative di esempio (puoi sostituirle con le tue)
const heroImage = "/images/wedding-hero.jpg"; // Hero principale
const flowerIcon = "/images/flower-deco.png"; // Icona floreale
const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

export default function WeddingSite() {
  return (
    <div className="relative bg-gradient-to-b from-[#fffaf6] to-[#f6f2eb] text-[#4b3f36] font-serif overflow-x-hidden">

      {/* Hero con immagine grande */}
      <section
        className="relative text-center h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col justify-center items-center h-full"
        >
          <h1 className="text-7xl md:text-8xl font-serif font-bold text-white">
            Mara & Gianluigi
          </h1>
          <p className="mt-4 text-2xl md:text-3xl italic text-white/90">
            18 Giugno 2026
          </p>
        </motion.div>
      </section>

      {/* Cerimonia e Ricevimento */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <EventCard
            title="Cerimonia"
            location="Chiesa Sant'Alessandro in Agros, Villongo"
            time="Ore 16:00"
          />
          <EventCard
            title="Ricevimento"
            location="Cascina Fiorita, Grumello del Monte"
          />
        </div>
      </section>

      {/* Gallery elegante */}
      <Gallery />

      {/* RSVP */}
      <RSVPSection />

      {/* Footer elegante */}
      <footer className="bg-[#faf2ed] text-center py-6 text-sm flex justify-center items-center gap-2">
        <span>Mara</span>
        <img src={flowerIcon} className="w-5" />
        <span>Gianluigi</span>
      </footer>

      {/* Player musicale */}
      <MusicPlayer />
    </div>
  );
}

// 🎵 Player musicale
function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!playing) audioRef.current.play();
    else audioRef.current.pause();
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-6 right-6 z-20">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggle}
        className="px-5 py-2 bg-[#d99c9c] text-white rounded-full shadow-lg hover:bg-[#c77b7b] transition"
      >
        {playing ? "🔇" : "🎵"}
      </button>
    </div>
  );
}

// 🕒 Countdown
function Countdown({ date }) {
  const now = new Date();
  const diff = date - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  return <p className="mt-2 text-xl md:text-2xl text-[#4b3f36]">{days} giorni</p>;
}

// 🎀 Card evento (cerimonia o ricevimento)
function EventCard({ title, location, time }) {
  return (
    <div className="bg-[#fffaf6] rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transition">
      <img src={flowerIcon} className="w-14 mx-auto mb-4" />
      <h2 className="text-3xl font-serif mb-2">{title}</h2>
      <p className="text-lg mb-2">{location}</p>
      {time && <p className="text-lg">{time}</p>}
    </div>
  );
}

// 📷 Gallery elegante
function Gallery() {
  return (
    <section className="py-16 bg-[#f9ebe7]">
      <h2 className="text-4xl font-serif text-center mb-12">I nostri momenti</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {galleryImages.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            className="rounded-2xl shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>
    </section>
  );
}

// 📩 Sezione RSVP elegante
function RSVPSection() {
  return (
    <section className="bg-white py-16 text-center">
      <h2 className="text-3xl font-serif mb-6">RSVP</h2>
      <p className="mb-6 text-lg text-[#4b3f36]">Conferma la tua presenza via WhatsApp</p>
      <a href="https://wa.me/39XXXXXXXXXX" target="_blank">
        <button className="px-8 py-3 bg-[#d99c9c] text-white rounded-xl shadow-lg hover:bg-[#c77b7b] transition">
          Conferma su WhatsApp
        </button>
      </a>
    </section>
  );
}

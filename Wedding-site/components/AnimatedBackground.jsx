// 🎨 BACKGROUND ANIMATO CUORI/PETALI
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Aggiorna le dimensioni solo lato client
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (dimensions.width === 0) return null; // evita render lato server

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

export default AnimatedBackground;
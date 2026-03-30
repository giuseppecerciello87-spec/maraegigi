import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedBackground() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    // Questo codice viene eseguito solo sul client
    setWindowHeight(window.innerHeight);
  }, []);

  if (!windowHeight) return null; // non renderizzare niente finché non abbiamo l'altezza

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: Math.random() * window.innerWidth }}
          animate={{ y: windowHeight + 50 }}
          transition={{
            repeat: Infinity,
            duration: 20 + Math.random() * 20,
            ease: "linear",
          }}
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
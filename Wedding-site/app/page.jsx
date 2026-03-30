import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 🔥 Firebase
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

// 👉 INSERISCI QUI I TUOI DATI FIREBASE
const firebaseConfig = {
  apiKey: "INSERISCI",
  authDomain: "INSERISCI",
  projectId: "INSERISCI",
  storageBucket: "INSERISCI",
  messagingSenderId: "INSERISCI",
  appId: "INSERISCI"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function WeddingSite() {
  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#3e342b] font-serif">

      <MusicPlayer />

      <section className="text-center py-24 px-6">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-7xl font-semibold mb-4">
          Mara & Gianluigi
        </motion.h1>
        <p className="text-xl italic">18 Giugno 2026</p>
        <Countdown />
      </section>

      <SectionCard title="Cerimonia" content={<>
        Chiesa Sant'Alessandro in Agros<br/>Villongo<br/>Ore 16:00
        <MapButton query="Chiesa Sant'Alessandro in Agros Villongo" />
      </>} />

      <SectionCard title="Ricevimento" content={<>
        Cascina Fiorita<br/>Grumello del Monte
        <MapButton query="Cascina Fiorita Grumello del Monte" />
      </>} />

      <Gallery />
      <GuestGallery />

      <section className="text-center px-6 py-16">
        <h2 className="text-3xl mb-4">RSVP</h2>
        <a href="https://wa.me/39XXXXXXXXXX" target="_blank">
          <Button>Conferma su WhatsApp</Button>
        </a>
      </section>

      <footer className="text-center py-8 text-sm opacity-70">
        Mara & Gianluigi
      </footer>
    </div>
  );
}

// 🎵 PLAYER CON ON/OFF
function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>
      <Button onClick={toggle} className="rounded-full">
        {playing ? "🔇" : "🎵"}
      </Button>
    </div>
  );
}

function Gallery() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl text-center mb-8">I nostri momenti</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="h-44 bg-[#e8dfd6] rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

// 📸 GALLERIA CON FIREBASE
function GuestGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const listRef = ref(storage, "uploads/");
      const res = await listAll(listRef);
      const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
      setImages(urls);
    };
    fetchImages();
  }, []);

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `uploads/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImages(prev => [...prev, url]);
  };

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="text-3xl text-center mb-6">Foto degli invitati</h2>
      <input type="file" onChange={upload} className="mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <img key={i} src={src} className="rounded-2xl h-44 w-full object-cover" />
        ))}
      </div>
    </section>
  );
}

function SectionCard({ title, content }) {
  return (
    <section className="px-6 py-8 max-w-4xl mx-auto">
      <Card className="rounded-2xl shadow bg-white">
        <CardContent className="p-6">
          <h2 className="text-2xl mb-2">{title}</h2>
          {content}
        </CardContent>
      </Card>
    </section>
  );
}

function MapButton({ query }) {
  return (
    <div className="mt-4">
      <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`} target="_blank">
        <Button variant="outline">Apri Mappa</Button>
      </a>
    </div>
  );
}

function Countdown() {
  const weddingDate = new Date("2026-06-18T16:00:00");
  const now = new Date();
  const diff = weddingDate - now;
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  return <p className="text-2xl mt-4">{days} giorni</p>;
}

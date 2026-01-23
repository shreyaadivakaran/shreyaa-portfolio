import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Bonjour, je suis Shreya",
  "Hello, I am Shreya",
  "Hola, soy Shreya",
  "Hallo, ich bin Shreya",
  "Ciao, sono Shreya",
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 3500); // 👈 holds the full text before changing

    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <span className="inline-flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={greetings[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-r from-purple-400 to-blue-500
            bg-clip-text text-transparent"
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>

      <span className="ml-1 animate-pulse text-purple-400">|</span>
    </span>
  );
}

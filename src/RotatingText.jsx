import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello, I am Shreya", // English
  "வணக்கம், நான் ஷ்ரேயா", // Tamil
  "Hello, I am Shreya", // English
  "こんにちは、私はシュレヤです", // Japanese
  "Hola, soy Shreya", // Spanish
  "Hello, I am Shreya", // English
  "नमस्ते, मैं श्रेया हूँ", // Hindi
  "Bonjour, je suis Shreya", // French
  "안녕하세요, 저는 슈레야입니다", // Korean
  "Hello, I am Shreya", // English
  "مرحباً، أنا شريا", // Arabic
  "Ciao, sono Shreya", // Italian
  "नമസ്കാരം, ഞാൻ ശ്രേയ", // Malayalam
  "Hello, I am Shreya", // English
  "Hallo, ich bin Shreya", // German
  "Привет, я Шрея", // Russian
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

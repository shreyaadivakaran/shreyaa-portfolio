import { useEffect, useState } from "react";

const texts = [
  "Bonjour, je suis Shreya",
  "Hello, I am Shreya",
  "Hola, soy Shreya",
  "Hallo, ich bin Shreya",
  "Ciao, sono Shreya",
];

export default function TypingText() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout;

    if (!isDeleting) {
      // typing forward
      if (text.length < current.length) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length + 1));
        }, 80);
      } else {
        // 👇 HOLD when fully typed (THIS is what you wanted)
        timeout = setTimeout(() => setIsDeleting(true), 1600);
      }
    } else {
      // deleting
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(current.slice(0, text.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <span className="inline-flex items-center">
      <span
        className="bg-gradient-to-r from-purple-400 to-blue-500
        bg-clip-text text-transparent"
      >
        {text}
      </span>
      <span className="ml-1 animate-pulse text-purple-400">|</span>
    </span>
  );
}

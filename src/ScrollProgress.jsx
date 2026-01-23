import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollPercent = docHeight
        ? (scrollTop / docHeight) * 100
        : 0;

      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
      <div
        className="h-full bg-gradient-to-r from-purple-400 to-blue-500
  shadow-[0_0_10px_rgba(139,92,246,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

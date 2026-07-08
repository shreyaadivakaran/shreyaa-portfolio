import React, { useEffect, useRef, useState } from "react";
import TypingText from "./TypingText";
import ScrollProgress from "./ScrollProgress";
import ProjectCard from "./ProjectCard";
import FloatingLines from "./FloatingLines";
import ScrollVelocity from "./ScrollingVelocity";
import PixelTransition from "./PixelTransition";
import StarBorder from "./StarBorder";

/* ---------- Section Component ---------- */
function Section({ id, title, bg, innerRef, children }) {
  return (
    <section
      ref={innerRef}
      id={id}
      className={`min-h-screen flex flex-col items-center justify-center px-8 ${bg}`}
    >
      {title && (
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
          {title}
        </h1>
      )}
      {children}
    </section>
  );
}

/* ---------- Bottom Navigation ---------- */
function BottomNav({ active, sections }) {
  const items = ["home", "about", "projects", "contact"];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <ul
        className="
          flex items-center gap-2 px-3 py-2 rounded-full
          bg-black/50 backdrop-blur-xl
          border border-white/10
          shadow-[0_0_30px_rgba(139,92,246,0.15)]
        "
      >
        {items.map((item) => {
          const isActive = active === item;

          return (
            <li
              key={item}
              onClick={() => {
                const el = sections[item].current;
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`
                relative cursor-pointer px-4 py-2 rounded-full
                text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-purple-300 bg-purple-500/10"
                    : "text-white/60 hover:text-white"
                }
              `}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-purple-500/10 blur-md -z-10" />
              )}
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ---------- App ---------- */
export default function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const sections = {
    home: homeRef,
    about: aboutRef,
    projects: projectsRef,
    contact: contactRef,
  };

  const [active, setActive] = useState("home");
  const [hasScrolled, setHasScrolled] = useState(false);

  /* Detect first scroll */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Intersection Observer */
  useEffect(() => {
    setActive("home");

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasScrolled) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4, rootMargin: "-20% 0px" },
    );

    Object.values(sections).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [hasScrolled]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            // Array - specify line count per wave; Number - same count for all waves
            lineCount={5}
            // Array - specify line distance per wave; Number - same distance for all waves
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10">
        <ScrollProgress />

        <Section id="home" bg="bg-transparent" innerRef={homeRef}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-center tracking-tight">
            <TypingText />
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-purple-300 text-center">
            Aspiring Full Stack Developer
          </p>

          <p className="mt-8 max-w-2xl text-center text-white/60 text-lg">
            Looking to build intelligent systems and elegant digital experiences
            with a focus on usability and impact.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6">
            {/* Download CV */}
            <a
              href="/projects/Shreya-SDE-Resume.pdf"
              download
              className="
      group relative overflow-hidden
      px-10 py-4 rounded-full
      font-semibold text-white
      bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500
      shadow-[0_0_20px_rgba(139,92,246,0.4)]
      transition-all duration-300
      hover:shadow-[0_0_40px_rgba(139,92,246,0.9)]
      hover:scale-105
    "
            >
              {/* Hover Glow */}
              <span
                className="
      absolute inset-0
      bg-gradient-to-r from-purple-400 to-blue-400
      opacity-0 group-hover:opacity-30
      blur-xl transition
    "
              />

              <span className="relative z-10 flex items-center gap-2">
                📄Download CV
              </span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/shreyaadivakaran"
              target="_blank"
              rel="noopener noreferrer"
              className="
      group relative overflow-hidden
      px-10 py-4 rounded-full
      font-semibold text-white
      border border-purple-400/50
      bg-black/40 backdrop-blur-xl
      shadow-[0_0_15px_rgba(139,92,246,0.25)]
      transition-all duration-300
      hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]
      hover:scale-105
    "
            >
              {/* Inner Glow on Hover */}
              <span
                className="
      absolute inset-0
      bg-purple-500/10
      opacity-0 group-hover:opacity-100
      blur-lg transition
    "
              />

              <span className="relative z-10 flex items-center gap-2">
                🚀 My GitHub
              </span>
            </a>
          </div>
        </Section>
        <Section
          id="about"
          title={null}
          bg="bg-transparent"
          innerRef={aboutRef}
        >
          <div className="max-w-7xl w-full space-y-16">
            {/* Animated Scroll Text Header */}
            <div className="overflow-hidden">
              <ScrollVelocity
                texts={[
                  "ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ABOUT ME • ",
                ]}
                velocity={80}
                className="custom-scroll-text"
              />
            </div>

            {/* ===== Row 1: Text + Image ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left: Text */}
              <div className="space-y-6">
                <p className="text-white/80 text-lg leading-relaxed">
                  Im an{" "}
                  <span className="text-purple-300 font-semibold">
                    Information Technology student
                  </span>{" "}
                  passionate about building modern, user-focused digital
                  experiences. I enjoy working across
                  <span className="text-purple-300 font-semibold">
                    {" "}
                    frontend
                  </span>
                  ,<span className="text-purple-300 font-semibold"> UI/UX</span>
                  , and
                  <span className="text-purple-300 font-semibold">
                    {" "}
                    intelligent systems
                  </span>
                  .
                </p>

                <p className="text-white/70 text-lg leading-relaxed">
                  I love turning ideas into clean, interactive products —
                  whether it’s a sleek web interface, a data-driven system, or a
                  project that solves real-world problems. I’m constantly
                  learning and experimenting with new technologies.
                </p>

                <p className="text-white/60 text-lg leading-relaxed">
                  Currently, I’m focused on strengthening my web development
                  skills and exploring machine learning to build smarter, more
                  impactful applications.
                </p>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center md:justify-start">
                <PixelTransition
                  firstContent={
                    <img
                      src="/projects/shreyaa2.jpeg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  }
                  secondContent={
                    <div className="w-full h-full grid place-items-center bg-black rounded-3xl">
                      <p className="font-extrabold text-4xl text-#4e0852e1">
                        hi there!
                      </p>
                    </div>
                  }
                  gridSize={8}
                  pixelColor="#4e0852e1"
                  once={false}
                  animationStepDuration={0.4}
                  className="custom-pixel-card"
                />
              </div>
            </div>
            {/* Technical Stack Header */}
            <div className="w-full flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Technical Stack
              </h2>

              <div className="flex-1 h-px bg-gradient-to-r from-purple-500/60 via-violet-500/40 to-transparent" />
            </div>

            {/* ===== Row 2: Skill Cards (FULL WIDTH, ONE ROW) ===== */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">

                {[
                  {
                    title: "Frontend",
                    items: ["React", "Tailwind", "HTML", "CSS", "JavaScript"],
                  },
                  {
                    title: "Backend",
                    items: ["Node.js", "Flask", "MySQL", "REST APIs"],
                  },
                  {
                    title: "Tools",
                    items: ["Git", "GitHub", "VS Code", "Figma"],
                  },
                  {
                    title: "Interests",
                    items: ["UI/UX", "ML", "Open Source"],
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="
              h-full flex flex-col
              p-8
              rounded-3xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              shadow-[0_0_25px_rgba(139,92,246,0.15)]
              hover:shadow-[0_0_45px_rgba(139,92,246,0.35)]
              transition-all duration-300
            "
                  >
                    <h3 className="text-purple-300 font-bold text-xl mb-4">
                      {card.title}
                    </h3>

                    <ul className="space-y-2 text-white/80 text-base flex-1">
                      {card.items.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6 mb-32"></div>
        </Section>

        <Section
          id="projects"
          t
          title="Projects"
          bg="bg-transparent"
          innerRef={projectsRef}
        >
          <p className="mt-6 text-xl md:text-2xl text-purple-300 text-center">
            A small selection of my Recent Projects
          </p>
          <br></br>
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              image="/projects/cmrl.png"
              title="Competency Certificate  Generator System "
              description="Aimed at modernizing and streamlining the traditionally manual certification  process for employees.
              Developed during Internship at Chennai Metro Rail Limited (CMRL)."
              tags={["Angular", ".NET Core", "SQL Server"]}
              link="https://github.com/yourusername/dressify"
            />

            <ProjectCard
              image="/projects/portfolio.png"
              title="Personal Portfolio"
              description="Modern interactive developer portfolio with animated background, smooth scrolling, and glass UI."
              tags={["React", "TailwindCSS", "Framer Motion"]}
              link="https://your-portfolio-link.com"
            />
          </div>
        </Section>

        <Section
          id="contact"
          title="Contact"
          bg="bg-transparent"
          innerRef={contactRef}
        >
           <h2 className="text-purple-300 font-bold">
              Open to collaborations, internships & cool conversations :)
            </h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* LinkedIn */}
            <StarBorder
              as="a"
              className="text-purple-300 font-semibold"
              color="magenta"
              speed="3s"
              href="https://www.linkedin.com/in/shreya-shree-divakaran-87311a294/"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 LinkedIn
            </StarBorder>

            {/* GitHub */}
            <StarBorder
              as="a"
              className="text-purple-300 font-semibold"
              color="magenta"
              speed="3s"
              href="https://github.com/shreyaadivakaran"
              target="_blank"
              rel="noopener noreferrer"
            >
              🧑‍💻 GitHub
            </StarBorder>

            {/* Email */}
            <StarBorder
              as="a"
              href="https://mail.google.com/mail/?view=cm&to=shreyashree.27it@licet.ac.in"
              className="text-purple-300 font-semibold cursor-pointer"
              color="magenta"
              speed="3s"
            >
              ✉️ Email Me
            </StarBorder>
           
          </div>
        </Section>

        <ScrollProgress />
      </div>
      <BottomNav active={active} sections={sections} />
    </div>
  );
}

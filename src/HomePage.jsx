import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { Typewriter } from 'react-simple-typewriter';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion, useMotionValue } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";


export default function HomePage() {
  const [galaxyMessage, setGalaxyMessage] = useState("");
  const galaxyThoughts = [
    "🌌 Time bends around gravity.",
    "✨ Every particle was born from a star.",
    "🪐 What if dark matter dreams too?",
    "🚀 The void isn't empty—it's potential.",
    "🌠 The universe listens, even in silence."
  ];
  
  const [showIntro, setShowIntro] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [projectRef, projectInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [resumeRef, resumeInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [finalText, setFinalText] = useState("");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [hideDreamer, setHideDreamer] = useState(false);
  const [showInitTyping, setShowInitTyping] = useState(false);
  const fullAboutText = 'This portfolio is a reflection of my interdisciplinary interests at the intersection of artificial intelligence, quantum computing, and astrophysics. I build intelligent tools and simulations to support my academic journey toward quantum engineering and space exploration. From intelligent automation tools to quantum machine learning models, each project represents my pursuit of leading a team of Quantum engineers and becoming a researcher and a future astronaut. Built using React, TailwindCSS, and Vite, the design is inspired by the visual aesthetics of quantum fields and deep space — minimal, modular, and cosmic.';
  const [typedText, setTypedText] = useState('');
  const audioRef = useRef(null);
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);

  useEffect(() => {
    setTimeout(() => setShowInitTyping(true), 1000);
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/sharvinsoham/repos")
      .then((res) => res.json())
      .then((data) => {
         setProjects(data);
         setFilteredProjects(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.85;
        audioRef.current.play()
          .then(() => {
            console.log("Audio is playing!");
          })
          .catch((err) => {
            console.warn("Audio autoplay blocked, waiting for user interaction...");
          });
      }
    };

    if (showTypewriter) {
      setTimeout(playAudio, 300);
    }

  }, [showTypewriter]);

  useEffect(() => {
    console.log("Typing finished?", isTypingFinished);
  }, [isTypingFinished]);
  
  useEffect(() => {
    if (!showTypewriter || typedText.length >= fullAboutText.length) return;
  
    const currentChar = fullAboutText[typedText.length];
    let delay = 55; // Default delay for typing
    if (currentChar === ' ') delay = 70;
    else if (currentChar === '\n') delay = 110;
    else if (currentChar === ',') delay = 300;
    else if (currentChar === '.') delay = 700;
    else if (currentChar === '-') delay = 1000;
  
    const timeout = setTimeout(() => {
      setTypedText((prev) => prev + currentChar);
      if (typedText.length + 1 === fullAboutText.length) {
        setIsTypingFinished(true);
        setFinalText(fullAboutText);
      }
    }, delay);
  
    return () => clearTimeout(timeout);
  }, [typedText, showTypewriter]);
  
  useEffect(() => {
    if (showTypewriter) return;
 
    let angle = Math.random() * Math.PI * 2;
    let speed = 0.2;
    let animationFrame;
 
    const wander = () => {
      angle += (Math.random() - 0.5) * 0.05; // Slight random turn
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      driftX.set(driftX.get() + dx);
      driftY.set(driftY.get() + dy);
      animationFrame = requestAnimationFrame(wander);
    };
 
    animationFrame = requestAnimationFrame(wander);
    return () => cancelAnimationFrame(animationFrame);
  }, [showTypewriter]);




  return (
    <>
      <audio ref={audioRef} src="/ai-audio.mp3" preload="auto" />
      {showIntro ? (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-cyan-300 text-xl font-mono"
          initial={{ backgroundColor: "#000000" }}
          animate={{ backgroundColor: ["#000000", "#0b0f1a", "#000000"] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Particles
            className="absolute inset-0 z-0"
            init={particlesInit}
            options={{
              background: { color: "#000000" },
              particles: {
                number: { value: 50 },
                color: { value: "#00ffff" },
                shape: { type: "circle" },
                opacity: { value: 0.2 },
                size: { value: 2 },
                move: { enable: true, speed: 0.2 },
              },
            }}
          />
          
          <motion.div
            initial={{ scale: 1.5 }}
            animate={{ scale: 0, x: -300, y: -300 }}
            transition={{ delay: 2.5, duration: 1.5, ease: "easeInOut" }}
            className="z-10 mt-48"
          >
            <img src="/spaceship.svg" alt="Ship" className="w-60 h-auto drop-shadow-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="z-10 mt-9 text-lg"
          >
            {showInitTyping && (
              <Typewriter
                words={["🚀 Initializing Quantum Drive..."]}
                cursor
                cursorStyle=" | "
                typeSpeed={30}
              />
            )}
          </motion.div>
        </motion.div>
      ) : (
        <main className="relative bg-[#0b0f1a] text-white min-h-screen p-6 overflow-hidden">
          <Particles
            className="absolute inset-0 z-0 -z-10"
            init={particlesInit}
            options={{
              background: { color: "#0b0f1a" },
              particles: {
                number: { value: 80 },
                color: { value: "#38bdf8" },
                shape: { type: "circle" },
                opacity: { value: 0.3 },
                size: { value: 2 },
                move: { enable: true, speed: 0.6 },
              },
            }}
          />
 


          <div className="relative z-20">

            <header className="text-center mb-10">
              <motion.h1 className="text-5xl font-extrabold text-cyan-400 shadow-lg">
                Sharvin Soham
              </motion.h1>
              <p className="text-2xl font-extrabold text-cyan-400 shadow-lg">
                AI Developer | Quantum Engineering Enthusiast | Future Astronaut
              </p>
            </header>

            <motion.section
              className="max-w-3xl mx-auto"
              ref={aboutRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold text-cyan-300 mb-4">About Me</h2>
              {!showTypewriter && (
                <p className="text-cyan-400 text-sm mb-4 animate-blink">
                  🤖 Initializing AI Voice Module...
                </p>
              )}
              {showTypewriter && (
                <p className="text-gray-200 leading-relaxed mb-6">
                  {typedText}
                  <span className="text-cyan-300 animate-pulse">|</span>
                </p>
              )}
            </motion.section>
            
            {!showTypewriter && (
              <div className="text-center my-10">
                <motion.div
                  initial={{ scale: 1, opacity: 1 }}
                  animate={hideDreamer ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                <motion.img
                  src="/spacedream.svg"
                  alt="Click to Begin"
                  drag
                  dragElastic={0.2}
                  dragMomentum={false}
                  dragConstraints={false}
                  onDragEnd={(event, info) => {
                    driftX.set(driftX.get() + info.offset.x);
                    driftY.set(driftY.get() + info.offset.y);
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                  className={`cursor-pointer transition duration-300 ${
                    showTypewriter
                      ? "w-32 fixed z-40 animate-spin-slow"
                      : "mx-auto w-72 h-auto motion-safe:animate-[pulse_4s_ease-in-out_infinite] hover:scale-110"
                  }`}
                  style={{
                    x: driftX,
                    y: driftY,
                    top: showTypewriter ? "20px" : undefined,
                    left: showTypewriter ? "20px" : undefined,
                    position: showTypewriter ? "fixed" : "static"
                  }}
                  onAnimationIteration={() => {
                    if (showTypewriter) {
                      const randomThought = galaxyThoughts[Math.floor(Math.random() * galaxyThoughts.length)];
                      setGalaxyMessage(randomThought);
                    }
                  }}
                />
                </motion.div>
                {galaxyMessage && showTypewriter && (
                  <motion.div
                    className="fixed top-24 left-20 z-50 px-4 py-2 bg-cyan-900 text-white text-sm rounded shadow-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {galaxyMessage}
                  </motion.div>
                )}
                
                
                <motion.p
                className="text-cyan-400 mt-4 cursor-pointer hover:text-cyan-200 transition duration-300"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (!showTypewriter) {
                      setHideDreamer(true);
                      setTimeout(() => {
                      setShowTypewriter(true);
                      if (audioRef.current) {
                        audioRef.current.volume = 0.85;
                        audioRef.current.play().catch((err) => {
                        console.warn("Audio autoplay blocked, waiting for user interaction...");
                        });
                      }
                      }, 1500); // Delay so animation completes before triggering main action
                    }
                  }}
                  >SEND ME TO SPACE
                </motion.p>
              </div>
            )}            

            <div className="flex gap-2 mt-4 justify-center">
              <Button variant="ghost" className="border border-cyan-400 text-cyan-300 bg-transparent backdrop-blur-sm hover:bg-cyan-800/10" onClick={() => {
                setFilter("all");
                setFilteredProjects(projects);
              }}>All Projects</Button>

              <Button variant="ghost" className="border border-cyan-400 text-cyan-300 bg-transparent backdrop-blur-sm hover:bg-cyan-800/10" onClick={() => {
                setFilter("AI");
                setFilteredProjects(projects.filter(proj => 
                  proj.name.toLowerCase().includes("ai") || proj.description && proj.description.toLowerCase().includes("ai") || proj.description && proj.description.toLowerCase().includes("automation")
                ));
              }}>AI</Button>

              <Button variant="ghost" className="border border-cyan-400 text-cyan-300 bg-transparent backdrop-blur-sm hover:bg-cyan-800/10" onClick={() => {
                setFilter("Quantum");
                setFilteredProjects(projects.filter(proj => 
                  proj.name.toLowerCase().includes("quantum") || (proj.description && proj.description.toLowerCase().includes("quantum"))
                ));
              }}>Quantum</Button>

              <Button variant="ghost" className="border border-cyan-400 text-cyan-300 bg-transparent backdrop-blur-sm hover:bg-cyan-800/10" onClick={() => {
                setFilter("ML");
                setFilteredProjects(projects.filter(proj => 
                  proj.name.toLowerCase().includes("machine learning","ml") || (proj.description && proj.description.toLowerCase().includes("Machine Learning"))
                ));
              }}>Machine Learning</Button>
              
              <Button variant="ghost" className="border border-cyan-400 text-cyan-300 bg-transparent backdrop-blur-sm hover:bg-cyan-800/10" onClick={() => {
                setFilter("Repository");
                setFilteredProjects(projects.filter(proj => 
                  proj.name.toLowerCase().includes("python","opencv","SQL") || (proj.description && proj.description.toLowerCase().includes("concept"))
                ));
              }}>Repository</Button>
            </div>

            {showTypewriter && (
              <motion.div
                className="grid gap-4 mt-6 max-w-3xl mx-auto"
                ref={projectRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {filteredProjects.map((proj) => (
                  <Card key={proj.id} className="bg-[#1c2331] rounded-lg shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-2">
                        <img src={proj.owner?.avatar_url || "https://via.placeholder.com/48"} alt={proj.owner?.login || "Owner"} className="w-12 h-12 rounded-full" />
                        <h3 className="text-xl font-bold text-cyan-200">{proj.name}</h3>
                      </div>
                      <p className="text-gray-200 mb-2">{proj.description}</p>
                      <a
                        href={proj.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:underline"
                      >
                        View on GitHub
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            )}

            {showTypewriter && (
              <motion.section
                className="max-w-3xl mx-auto mt-10"
                ref={resumeRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Resume</h2>
                <iframe
                  src="/resume.pdf"
                  title="Sharvin Soham Resume"
                  className="w-full h-[600px] bg-white rounded-xl shadow-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.section>
            )}

            <footer className="text-center mt-12 text-sm text-gray-200" style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)' }}>
              Connect: 
              <a href="mailto:sharvinsoham@hotmail.com" className="mx-2 text-cyan-400">Email</a> |
              <a href="https://www.linkedin.com/in/sharvin-soham-853755195/" className="mx-2 text-cyan-400">LinkedIn</a> |
              <a href="https://github.com/sharvinsoham" className="mx-2 text-cyan-400">GitHub</a>
            </footer>
          </div>
        </main>
      )}
    </>
  );
}
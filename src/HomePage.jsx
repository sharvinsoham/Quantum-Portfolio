import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Typewriter } from 'react-simple-typewriter';

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";


export default function HomePage() {
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

  useEffect(() => {
    fetch("https://api.github.com/users/sharvinsoham/repos")
      .then((res) => res.json())
      .then((data) => {
         setProjects(data);
         setFilteredProjects(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const delay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
    const timer = setTimeout(() => {
      setShowTypewriter(true);
    }, delay);
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    if (showTypewriter && !sessionStorage.getItem("voicePlayed")) {
      const playAudio = () => {
        const audio = new Audio("/ai-audio.mp3");
        audio.volume = 0.85;
        audio.play()
          .then(() => {
            sessionStorage.setItem("voicePlayed", "true");
          })
          .catch((err) => {
            console.warn("Voice playback blocked or failed:", err);
          });
      };

      // Delay slightly to mimic post-render interaction
      setTimeout(playAudio, 300);
    }
  }, [showTypewriter]);

  useEffect(() => {
    console.log("Typing finished?", isTypingFinished);
  }, [isTypingFinished]);
  
  return (
    <>

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
    {!isTypingFinished ? (
      <Typewriter
        words={[
          'This portfolio is a reflection of my interdisciplinary interests at the intersection of artificial intelligence, quantum computing, and astrophysics. I build intelligent tools and simulations to support my academic journey toward quantum engineering and space exploration. From intelligent automation tools to quantum machine learning models, each project represents my pursuit of becoming a researcher, lead a team of Quantum engineers, and a future astronaut. Built using React, TailwindCSS, and Vite, the design is inspired by the visual aesthetics of quantum fields and deep space — minimal, modular, and cosmic.'
        ]}
        cursor
        cursorStyle=" | "
        typeSpeed={40}
        delaySpeed={1000}
        onType={() => {}}
        onDone={() => {
          setIsTypingFinished(true);
          setFinalText(
            'This portfolio is a reflection of my interdisciplinary interests at the intersection of artificial intelligence, quantum computing, and astrophysics. I build intelligent tools and simulations to support my academic journey toward quantum engineering and space exploration. From intelligent automation tools to quantum machine learning models, each project represents my pursuit of becoming a researcher, lead a team of Quantum engineers, and a future astronaut. Built using React, TailwindCSS, and Vite, the design is inspired by the visual aesthetics of quantum fields and deep space — minimal, modular, and cosmic.'
          );
        }}
      />
    ) : (
      finalText
    )}
  </p>
)}
  </motion.section>
          

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

        <footer className="text-center mt-12 text-sm text-gray-200" style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)' }}>
          Connect: 
          <a href="mailto:sharvinsoham@hotmail.com" className="mx-2 text-cyan-400">Email</a> |
          <a href="https://www.linkedin.com/in/sharvin-soham-853755195/" className="mx-2 text-cyan-400">LinkedIn</a> |
          <a href="https://github.com/sharvinsoham" className="mx-2 text-cyan-400">GitHub</a>
        </footer>
          </div>
        </main>
    </>
  );
}
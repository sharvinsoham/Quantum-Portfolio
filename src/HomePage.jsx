import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


export default function HomePage() {
  const [showProjects, setShowProjects] = useState(true);
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [projectRef, projectInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [resumeRef, resumeInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const projects = [
    {
      title: "AI Desktop Assistant",
      description:
        "Voice + text-based AI assistant with NLP (DistilBERT), CLI/GUI toggle, PyQt interface, and system control commands.",
      link: "https://github.com/sharvinsoham/ai-desktop-assistant",
    },
    {
      title: "Quantum ML Suite",
      description:
        "Includes QSVM, QGAN, and QNN built with Qiskit. Focused on applying quantum computing to real-world ML problems.",
      link: "https://github.com/sharvinsoham/quantum-ml-suite",
    },
    {
      title: "System Resource Monitor",
      description:
        "Real-time CPU/RAM usage with ML-based anomaly detection, PyQt dashboard, and background tray app.",
      link: "https://github.com/sharvinsoham/system-monitor-ai",
    },
  ];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
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
          <p className="text-6xl font-extrabold text-cyan-400 shadow-lg">
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
  <p className="text-gray-200 leading-relaxed mb-6">
    I'm a Computer Science graduate with deep interests in quantum mechanics,
    astrophysics, and AI. I build intelligent tools and simulations to support
    my academic journey toward quantum engineering and space exploration.
    I’ve cleared AFCAT thrice and aim to pursue a Ph.D. in quantum fields and
    become an astronaut.
  </p>
  <Button onClick={() => setShowProjects(!showProjects)}>
    {showProjects ? "Hide Projects" : "Show Projects"}
  </Button>
</motion.section>

        {showProjects && (
          <motion.div
  className="grid gap-4 mt-6 max-w-3xl mx-auto"
  ref={projectRef}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {projects.map((proj) => (
    <Card key={proj.title} className="bg-[#1c2331] rounded-lg shadow-xl">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-cyan-200">{proj.title}</h3>
        <p className="text-gray-200 mb-2">{proj.description}</p>
        <a
          href={proj.link}
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
  );
}
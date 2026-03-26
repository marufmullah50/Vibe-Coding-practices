"use client";
import { motion, Variants } from "framer-motion";
import { Code, User, Mail, ExternalLink, Cpu, Database, Network, ChevronRight } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center max-w-7xl mx-auto px-6 py-20">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for Research & Engineering Roles
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
            Bridging <span className="text-gradient">Classical Engineering</span> with <span className="text-gradient">Computational Intelligence</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            I'm <span className="text-slate-200 font-semibold">Md. Maruf Mullah</span>, a Mechanical Engineer & Researcher focusing on Advanced Manufacturing, Deep Learning, and Computational Mechanics. 
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
            <a href="mailto:md.marufmullah50@gmail.com" className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-6 py-3 rounded-full transition-all hover:scale-105">
              Contact Me <ChevronRight size={18} />
            </a>
            <a href="https://github.com/marufmullah50" target="_blank" rel="noreferrer" className="flex items-center gap-2 glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 px-6 py-3 rounded-full transition-all">
              <Code size={18} /> GitHub
            </a>
            <a href="#" className="flex items-center gap-2 glass-panel text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 px-6 py-3 rounded-full transition-all">
              <User size={18} /> LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="py-24 bg-slate-900/40 border-y border-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            className="mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2">My Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100">Engineering Meets Data</h3>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Deep Learning & Vision", desc: "Building YOLO-based systems for industrial casting defects with 99.9% accuracy, and medical imaging segmentation." },
              { icon: Network, title: "Autonomous Systems", desc: "Design and numerical modeling of parts. Control frameworks, time-series forecasting with CatBoost and LSTMs." },
              { icon: Database, title: "Smart Manufacturing", desc: "Leveraging FEM (ANSYS/COMSOL) and traditional ML logic for surface roughness prediction and smart analytics." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 rounded-3xl hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-200 mb-3">{item.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Timeline (simplified for style) */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16 md:flex justify-between items-end">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-cyan-500 uppercase mb-2">Featured Work</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-100">Selected Projects</h3>
          </div>
          <a href="https://github.com/marufmullah50" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
            View All on GitHub <ExternalLink size={16} />
          </a>
        </div>

        <div className="space-y-6">
          {[
            { tag: "Deep Learning", title: "Casting Defect Classification", desc: "Compared CNN, MobileNetV3, ViT, and YOLO. Achieved 99.9% accuracy using YOLO.", year: "2026" },
            { tag: "AI/RAG", title: "RAG Research Assistant", desc: "Local Retrieval-Augmented Generation chatbot with Gemini 2.5 Flash Lite for fast literature insights.", year: "2026" },
            { tag: "Classical ML", title: "Time-Series Forecasting", desc: "RNN, LSTM, and CatBoost on meteorological data. Feature engineering and temporal modeling.", year: "2024" }
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-slate-800/40 transition-colors"
            >
              <div>
                <span className="text-xs font-bold text-cyan-500 tracking-wider uppercase mb-2 block">{project.tag}</span>
                <h4 className="text-2xl font-bold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                <p className="text-slate-400 text-sm max-w-2xl">{project.desc}</p>
              </div>
              <div className="flex items-center justify-between md:flex-col md:items-end md:justify-center gap-4 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-8">
                <span className="text-slate-500 font-mono">{project.year}</span>
                <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section mentioning the AI Twin */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10 glass-panel rounded-3xl p-12 mx-6">
          <h3 className="text-3xl md:text-5xl font-bold text-slate-100">Curious to learn more?</h3>
          <p className="text-lg text-slate-400">
            Talk to my <span className="text-cyan-400 font-semibold">AI Digital Twin</span> using the widget in the bottom right corner. It knows practically everything about my background, skills, and research interests!
          </p>
        </div>
      </section>
    </div>
  );
}

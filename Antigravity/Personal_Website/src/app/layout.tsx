import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Md. Maruf Mullah | Digital Twin & Portfolio",
  description: "Mechanical Engineer & Researcher Bridging Classical Engineering with Computational Intelligence. Features an AI Digital Twin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-100">
        
        {/* Background Effects */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[150px]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
        </div>

        {/* Global Nav */}
        <nav className="fixed top-0 left-0 right-0 z-40 border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="font-bold text-xl tracking-tighter cursor-pointer group">
              <span className="text-slate-100">M</span>
              <span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">.Mullah</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
              <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
              <a href="#research" className="hover:text-cyan-400 transition-colors">Research</a>
            </div>
            <a href="mailto:md.marufmullah50@gmail.com" className="text-sm border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-full hover:bg-cyan-500/10 transition-colors">
              Get in Touch
            </a>
          </div>
        </nav>

        <main className="flex-1 mt-20">
          {children}
        </main>

        <footer className="border-t border-slate-800/50 bg-slate-950/80 py-8 relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Md. Maruf Mullah. All rights reserved.</p>
            <div className="flex gap-4 text-slate-500">
              <a href="https://github.com/marufmullah50" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">GitHub</a>
              <a href="https://linkedin.com/in/marufmullah50" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition">LinkedIn</a>
            </div>
          </div>
        </footer>

        {/* The Digital Twin Agent */}
        <ChatWidget />
      </body>
    </html>
  );
}

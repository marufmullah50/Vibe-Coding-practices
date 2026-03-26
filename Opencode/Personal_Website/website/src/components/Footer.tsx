'use client';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo & Copyright */}
          <div className="mb-4 md:mb-0">
            <div className="text-white font-bold text-xl tracking-tight mb-2">
              MM<span className="text-cyan-400">.</span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Md. Maruf Mullah. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="https://github.com/marufmullah50" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/marufmullah50" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:md.marufmullah50@gmail.com" className="text-gray-500 hover:text-white transition-colors">
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center">
            Built with <FaHeart className="text-red-500 mx-1" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
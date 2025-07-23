import "../shiny.css";
import { Link } from 'react-router-dom';
import { Code, Coffee, Terminal } from 'lucide-react';
import demoVideoUrl from '../assets/Demo-JTT.mp4';
import React, { useState } from 'react';

const Hero = () => {
    const [showModal, setShowModal] = useState(false);
    const animationDuration = `5s`;
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                Journal 
              </span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Tweet 
              </span>
              <div className="absolute inset-0 text-cyan-400 opacity-20 animate-pulse" style={{transform: 'translate(2px, 2px)'}}>
                Journal to Tweet
              </div>
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-lg font-mono text-gray-300 mb-8">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">for indie devs</span>
              <span className="text-gray-500">•</span>
              <Code className="w-4 h-4 text-pink-400" />
              <span className="text-pink-400">busy professionals</span>
              <span className="text-gray-500">•</span>
              <Coffee className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">entrepreneurs</span>
            </div>
          </div>
          <div className="text-xl md:text-3xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
            <p>Too busy to create content?</p>
            <p className="mb-4 mt-2">AI transforms your daily logs into engaging tweets that grow your audience.</p>
            <p className="text-cyan-400 font-semibold text-2xl md:text-4xl shiny-text" style={{ animationDuration }}>we built this for you.</p>
          </div>
          {/* Minimal, appealing CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <button
              className="px-7 py-3 border border-cyan-400 text-cyan-300 bg-transparent rounded-lg font-semibold text-lg transition hover:bg-cyan-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              onClick={() => setShowModal(true)}
            >
              Show Demo Video
            </button>
            <Link
              to="/login"
              className="px-7 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-lg font-bold text-lg transition shadow focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Get started
            </Link>
          </div>
          {/* Modal for demo video */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div className="relative bg-gray-900 rounded-lg shadow-lg max-w-2xl w-full p-4">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <video
                  src={demoVideoUrl}
                  controls
                  autoPlay
                  className="w-full rounded-lg"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    )
}

export default Hero;
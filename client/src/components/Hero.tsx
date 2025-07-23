import "../shiny.css";

import { 
    ArrowRight, 
    Code, 
    Coffee, 
    Terminal,
    ChevronDown,
  } from 'lucide-react';

const Hero = ({ handleSubmit, email, setEmail, isLoading, isSubmitted, spotsLeft, showConfetti, inputRef }: {
  handleSubmit: (e: React.FormEvent) => void,
  email: string,
  setEmail: (email: string) => void,
  isLoading: boolean,
  isSubmitted: boolean,
  spotsLeft: number,
  showConfetti: boolean,
  inputRef: React.RefObject<HTMLInputElement>
}) => {
    const animationDuration = `5s`;
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Glitch Effect Header */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
                Journal 
              </span>
              <span className="text-white"> to </span>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Tweet 
              </span>
              {/* Glitch overlay */}
              <div className="absolute inset-0 text-cyan-400 opacity-20 animate-pulse" style={{transform: 'translate(2px, 2px)'}}>
                Journal to Tweet
              </div>
            </h1>
            
            {/* Original subtitle */}
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

          {/* Original tagline */}
          <div className="text-xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            <p>Too busy to create content?</p>
            <p className="mb-4 mt-2">AI transforms your daily logs into engaging tweets that grow your audience.</p>
            <p className="text-cyan-400 font-semibold text-2xl md:text-4xl shiny-text" style={{ animationDuration }}>we built this for you.</p>
          </div>

          {/* CTA */}
          <div className="mb-12 max-w-md mx-auto">
            {/* Email Input */}
            <form className="flex flex-col sm:flex-row gap-3 mb-4" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm font-mono"
                required
                disabled={isLoading || isSubmitted || spotsLeft <= 0}
                ref={inputRef}
              />
              <button
                type="submit"
                className="group relative px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded text-white font-bold hover:scale-105 transition-all duration-300 shadow-lg inline-flex items-center justify-center space-x-2 whitespace-nowrap disabled:opacity-50"
                disabled={isLoading || isSubmitted || spotsLeft <= 0}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>{isLoading ? 'Joining...' : isSubmitted ? 'Joined!' : 'Join Waitlist'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
            {showConfetti && <div className="text-2xl text-cyan-400">🎉</div>}
            {isSubmitted && <p className="text-green-400 font-mono mt-2">You're on the list! Check your inbox soon.</p>}
            {spotsLeft <= 0 && <p className="text-red-400 font-mono mt-2">Sorry, no spots left.</p>}
            {/* <p className="text-sm text-gray-500 mt-3 font-mono">// No credit card, no BS</p> */}
          </div>

          {/* Scroll indicator */}
          {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-gray-500" />
          </div> */}
        </div>
      </section>
    )
}

export default Hero;
import { Link } from "react-router-dom";

const Testimonials = ({ handleSubmit, email, setEmail, isLoading, isSubmitted, spotsLeft, showConfetti }: {
  handleSubmit: (e: React.FormEvent) => void,
  email: string,
  setEmail: (email: string) => void,
  isLoading: boolean,
  isSubmitted: boolean,
  spotsLeft: number,
  showConfetti: boolean
}) => {
    return (
        <section id="testimonials" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12 text-white">
            What Our Users Say
          </h2>
          
          <div className="relative">
            <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-12 min-h-[200px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👻</span>
                </div>
                <p className="text-gray-500 text-lg mb-4">This space intentionally left blank</p>
                <div className="transform -rotate-2 bg-yellow-400 text-black px-4 py-2 rounded font-bold inline-block">
                  You'll be here soon ✨
                </div>
              </div>
            </div>
            
            {/* Scribbled note */}
            <div className="absolute -bottom-4 -right-4 transform rotate-12 bg-pink-400 text-black px-3 py-2 rounded font-mono text-sm">
              // keeping it real
            </div>
          </div>

          <div className="mt-12">
            <form className="flex flex-col sm:flex-row items-center justify-center gap-4" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-gray-900/80 border border-pink-400 rounded-lg text-pink-300 placeholder-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent font-mono transition-all duration-200"
                required
                disabled={isLoading || isSubmitted || spotsLeft <= 0}
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-500 text-white px-8 py-2.5 rounded font-bold text-lg hover:scale-105 transition-transform inline-block whitespace-nowrap disabled:opacity-50"
                disabled={isLoading || isSubmitted || spotsLeft <= 0}
              >
                {isLoading ? 'Joining...' : isSubmitted ? 'Joined!' : 'Be the First to Try It'}
              </button>
            </form>
          </div>
          {showConfetti && <div className="text-2xl text-pink-400 mt-2">🎉</div>}
          {isSubmitted && <p className="text-pink-400 font-mono mt-2">You're on the list! Check your inbox soon.</p>}
          {spotsLeft <= 0 && <p className="text-red-400 font-mono mt-2">Sorry, no spots left.</p>}
        </div>
      </section>
    )
}

export default Testimonials;
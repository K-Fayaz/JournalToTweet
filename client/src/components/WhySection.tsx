
import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";

const WhySection = ({ handleSubmit, email, setEmail, isLoading, isSubmitted, spotsLeft, showConfetti }: {
  handleSubmit: (e: React.FormEvent) => void,
  email: string,
  setEmail: (email: string) => void,
  isLoading: boolean,
  isSubmitted: boolean,
  spotsLeft: number,
  showConfetti: boolean
}) => {
    return(
        <>
            <section id="why" className="py-4 bg-gradient-to-b from-gray-900 to-black">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        <span className="text-white">But wait, </span>
                        <span className="text-pink-400">why does this even </span>
                        <span className="text-cyan-400">exist?</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-mono">
                        // Good question. Let me tell you exactly why we built this thing...
                    </p>
                </div>
                {/* Rant Section */}
            </section>
            <section className="py-10 bg-black">
                    <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-black border border-green-500 rounded-lg p-8 font-mono">
                        <div className="flex items-center space-x-2 mb-6">
                        <Terminal className="w-5 h-5 text-green-500" />
                        <span className="text-green-500">~/why-this-exists</span>
                        <div className="w-2 h-5 bg-green-500 animate-pulse"></div>
                        </div>
                        <div className="space-y-4 text-green-400 text-lg leading-relaxed">
                        <p>I'm deep in a bug at 1AM.</p>
                        <p>The last thing I want to do is write a f***ing tweet.</p>
                        <p className="text-yellow-400">But I do want to grow. Stay relevant. Build in public.</p>
                        <p>So this app does it for me.</p>
                        <p className="text-cyan-400">Journal → AI magic → Tweet drafts in my inbox.</p>
                        <p>No context switching. No creative burnout.</p>
                        <p className="text-pink-400">Just pure, authentic content from my actual work.</p>
                        </div>
                        {/* Email input and button group */}
                        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-3 bg-black/80 border border-green-500 rounded-lg text-green-400 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-mono transition-all duration-200"
                            required
                            disabled={isLoading || isSubmitted || spotsLeft <= 0}
                        />
                        <button
                            type="submit"
                            className="bg-green-500 text-black px-6 py-3 rounded font-bold hover:bg-green-400 transition-colors inline-block whitespace-nowrap disabled:opacity-50"
                            disabled={isLoading || isSubmitted || spotsLeft <= 0}
                        >
                            {isLoading ? 'Joining...' : isSubmitted ? 'Joined!' : 'Yeah, I need this →'}
                        </button>
                        </form>
                        {showConfetti && <div className="text-2xl text-green-400 mt-2">🎉</div>}
                        {isSubmitted && <p className="text-green-400 font-mono mt-2">You're on the list! Check your inbox soon.</p>}
                        {spotsLeft <= 0 && <p className="text-red-400 font-mono mt-2">Sorry, no spots left.</p>}
                    </div>
                    </div>
            </section>
        </>
    )
}

export default WhySection;